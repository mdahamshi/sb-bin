#!/usr/bin/env node

import { spawn } from "child_process";

const child = spawn("npx", ["sb-crud-gen", ...process.argv.slice(2)], {
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code));
