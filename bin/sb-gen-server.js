#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import { spawnSync } from "child_process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function renderTemplate(srcFile, destFile, data) {
  const template = await fs.readFile(srcFile, "utf-8");
  const content = ejs.render(template, data);
  await fs.outputFile(destFile, content);
  console.log(`✔️  Created ${destFile}`);
}

async function updatePackageJson(projectRoot, pkgTemplateFile, data) {
  const template = await fs.readFile(pkgTemplateFile, "utf-8");
  let pkgNew;
  try {
    pkgNew = JSON.parse(ejs.render(template, data));
  } catch (err) {
    console.error("❌ Failed to parse package.json.ejs. Rendered content:");
    console.error(ejs.render(template, data));
    throw err;
  }

  const pkgPath = path.join(projectRoot, "package.json");

  if (await fs.pathExists(pkgPath)) {
    const pkgOld = JSON.parse(await fs.readFile(pkgPath, "utf-8"));
    const merged = {
      ...pkgOld,
      scripts: { ...pkgOld.scripts, ...pkgNew.scripts },
      dependencies: { ...pkgOld.dependencies, ...pkgNew.dependencies },
      devDependencies: { ...pkgOld.devDependencies, ...pkgNew.devDependencies },
    };
    await fs.writeFile(pkgPath, JSON.stringify(merged, null, 2));
    console.log("🔄 Updated package.json");
  } else {
    await fs.writeFile(pkgPath, JSON.stringify(pkgNew, null, 2));
    console.log("📦 Created package.json");
  }
}

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option("init-config", {
      type: "boolean",
      description: "Copy default config.json to current working directory",
    })
    .argv;

  const serverName = argv._[0] || "server";
  const projectRoot = path.resolve(process.cwd(), serverName);
  const appId = String(Math.floor(Math.random() * 10000)).padStart(4, "0");

  const templatesDir = path.join(__dirname, "../templates");
  const cwdConfigPath = path.join(process.cwd(), "config.json");
  const defaultConfigPath = path.join(templatesDir, "config.json");

  // Handle --init-config
  if (argv["init-config"]) {
    if (await fs.pathExists(cwdConfigPath)) {
      console.log("⚠️  config.json already exists in current directory");
    } else {
      await fs.copy(defaultConfigPath, cwdConfigPath);
      console.log("✅ Default config.json copied to current directory");
    }
    process.exit(0);
  }

  console.log(`📦 Creating project: ${serverName} (id: ${appId})`);

  // Load config.json (cwd first, fallback to default)
  let config;
  if (await fs.pathExists(cwdConfigPath)) {
    console.log("⚙️  Using config.json from current directory");
    config = JSON.parse(await fs.readFile(cwdConfigPath, "utf-8"));
  } else {
    console.log("⚙️  Using default config.json from templates");
    config = JSON.parse(await fs.readFile(defaultConfigPath, "utf-8"));
  }

  const context = { serverName, appId };

  // Render files
  for (const { src, dest } of config.files) {
    await renderTemplate(
      path.join(templatesDir, src),
      path.join(projectRoot, dest),
      context
    );
  }

  // Handle package.json separately
  if (config.packageTemplate) {
    await updatePackageJson(
      projectRoot,
      path.join(templatesDir, config.packageTemplate),
      context
    );
  }

  console.log(`✅ Base project created in ${projectRoot}`);

  // Run sb-crud-gen dynamically
  if (config.runCrudGen && Array.isArray(config.crudList)) {
    for (const entity of config.crudList) {
      const entityName = typeof entity === "string" ? entity : entity.name;
      const entityFields = entity.fields || [];
      console.log(`⚙️  Running sb-crud-gen for: ${entityName}...`);
      const result = spawnSync("npx", ["sb-crud-gen", "create", entityName, ...entityFields], {
        cwd: projectRoot,
        stdio: "inherit",
        shell: true,
      });
      if (result.error) {
        console.error(`❌ sb-crud-gen failed for ${entityName}:`, result.error);
        process.exit(1);
      }
    }
  }

  console.log(`
➡ Navigate to '${serverName}' and run:
   docker compose up --build

- Visit:
  http://localhost:4000/api/health
`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
