#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Please provide a component name.");
  process.exit(1);
}

const componentDir = path.join(process.cwd(), componentName);

if (fs.existsSync(componentDir)) {
  console.error("❌ Component folder already exists.");
  process.exit(1);
}

fs.mkdirSync(componentDir);

const jsxContent = `import './${componentName}.css';

export default function ${componentName}({ children }) {
  return (
    <div className="${componentName.toLowerCase()}">
      {children}
    </div>
  );
}
`;

const cssContent = `.${componentName.toLowerCase()} {
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
`;

fs.writeFileSync(path.join(componentDir, `${componentName}.jsx`), jsxContent);
fs.writeFileSync(path.join(componentDir, `${componentName}.css`), cssContent);

console.log(`✅ Component '${componentName}' created!`);
