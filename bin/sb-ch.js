#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// === Parse CLI Arguments ===
const args = process.argv.slice(2);
const hookNames = args.filter((arg) => !arg.startsWith("--"));

// === Validations ===
if (hookNames.length === 0) {
  console.error("❌ Please provide at least one hook name.");
  console.log("Usage: sb-cc Button Card");
  process.exit(1);
}

// === Determine Base Path ===
const baseDir = path.join(process.cwd(), "src", "hooks");

// === Loop through hooks ===
hookNames.forEach((hookName) => {
  const hookDir = baseDir;

  if (fs.existsSync(hookDir)) {
    console.warn(`⚠️  Skipped: '${hookName}' already exists.`);
    return;
  }

  fs.mkdirSync(hookDir, { recursive: true });

  const jsContent = `import { useEffect, useState } from "react";
export function ${hookName}() {
  
}
`;

  fs.writeFileSync(path.join(hookDir, `${hookName}.js`), jsContent);

  console.log(`✅ Created: ${hookName}`);
});
