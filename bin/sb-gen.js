#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

const options = {
  component: [],
  hook: [],
  test: [],
  page: [],
  context: [],
};

// Parse CLI arguments
let currentFlag = null;
for (const arg of args) {
  if (arg.startsWith("-")) {
    switch (arg) {
      case "--component":
      case "-c":
        currentFlag = "component";
        break;
      case "--hook":
      case "-h":
        currentFlag = "hook";
        break;
      case "--test":
      case "-t":
        currentFlag = "test";
        break;
      case "--page":
      case "-p":
        currentFlag = "page";
        break;
      case "--context":
      case "-x":
        currentFlag = "context";
        break;
      default:
        currentFlag = null;
    }
  } else if (currentFlag) {
    options[currentFlag].push(arg);
  }
}

// Templates
const templates = {
  component: (name) => `import React from 'react';

export default function ${name}() {
  return <div>${name} component</div>;
}
`,

  hook: (name) => `import { useState, useEffect } from 'react';

export function ${name}() {
  // Custom hook logic here
}
`,

  test: (name) => `import { render, screen } from '@testing-library/react';
import ${name} from '../components/${name}';

test('renders ${name}', () => {
  render(<${name} />);
  // Add your assertions here
});
`,

  page: (name) => `import React from 'react';

export default function ${name}() {
  return <div>${name} Page</div>;
}
`,

  context: (
    name,
  ) => `import React, { createContext, useContext, useState } from 'react';

const ${name}Context = createContext();

export function ${name}Provider({ children }) {
  const [state, setState] = useState(null);
  return (
    <${name}Context.Provider value={{ state, setState }}>
      {children}
    </${name}Context.Provider>
  );
}

export function use${name}() {
  return useContext(${name}Context);
}
`,
};

// Write File
function writeFile(dir, name, content, ext = "jsx") {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${name}.${ext}`);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Created: ${filePath}`);
}

// Capitalize
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Generate files
for (const name of options.component) {
  const compName = capitalize(name);
  writeFile("src/components", compName, templates.component(compName));
}

for (const name of options.hook) {
  const hookName = name.startsWith("use") ? name : `use${capitalize(name)}`;
  writeFile("src/hooks", hookName, templates.hook(hookName));
}

for (const name of options.test) {
  const testName = capitalize(name);
  writeFile("src/tests", `${testName}.test`, templates.test(testName));
}

for (const name of options.page) {
  const pageName = capitalize(name);
  writeFile("src/pages", pageName, templates.page(pageName));
}

for (const name of options.context) {
  const ctxName = capitalize(name);
  writeFile("src/context", `${ctxName}Context`, templates.context(ctxName));
}
