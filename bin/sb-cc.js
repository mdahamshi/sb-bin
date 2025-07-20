#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// === Parse CLI Arguments ===
const args = process.argv.slice(2);
const componentNames = args.filter((arg) => !arg.startsWith("--"));

// === Validations ===
if (componentNames.length === 0) {
  console.error("❌ Please provide at least one component name.");
  console.log("Usage: sb-cc Button Card");
  process.exit(1);
}

// === Determine Base Path ===
const baseDir = path.join(process.cwd(), "src", "components");

// === Loop through components ===
componentNames.forEach((componentName) => {
  const componentDir = path.join(baseDir, componentName);

  if (fs.existsSync(componentDir)) {
    console.warn(`⚠️  Skipped: '${componentName}' already exists.`);
    return;
  }

  fs.mkdirSync(componentDir, { recursive: true });

  // Create JSX file
  const jsxContent = `import './${componentName}.css';

export default function ${componentName}({ children }) {
  return (
    <div className="${componentName.toLowerCase()}">
      {children}
    </div>
  );
}
`;

  // Create CSS file
  const cssContent = `.${componentName.toLowerCase()} {
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
`;

  fs.writeFileSync(path.join(componentDir, `${componentName}.jsx`), jsxContent);
  fs.writeFileSync(path.join(componentDir, `${componentName}.css`), cssContent);

  console.log(`✅ Created: ${componentName}`);
});
