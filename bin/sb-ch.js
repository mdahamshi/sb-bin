#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// === Parse CLI Arguments ===
const args = process.argv.slice(2);
const hookNames = args.filter((arg) => !arg.startsWith("--"));

// === Validations ===
if (hookNames.length === 0) {
  console.error("❌ Please provide at least one hook name.");
  console.log("Usage: sb-ch useCounter useToggle");
  process.exit(1);
}

// === Determine Base Path ===
const baseDir = path.join(process.cwd(), "src", "hooks");

// === Ensure base hook directory exists ===
fs.mkdirSync(baseDir, { recursive: true });

// === Loop through hook names ===
hookNames.forEach((hookName) => {
  const hookFile = path.join(baseDir, `${hookName}.js`);

  if (fs.existsSync(hookFile)) {
    console.warn(`⚠️  Skipped: '${hookName}' already exists.`);
    return;
  }

  const jsContent = `import { useEffect, useState } from "react";

export function ${hookName}() {
  // TODO: implement ${hookName}
}
`;

  fs.writeFileSync(hookFile, jsContent);

  console.log(`✅ Created: ${hookName}`);
});
