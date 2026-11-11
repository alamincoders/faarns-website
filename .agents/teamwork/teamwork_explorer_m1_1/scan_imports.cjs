const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === '.agents') continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full));
    } else if (/\.(tsx?|mjs|js|css)$/.test(file)) {
      results.push(full);
    }
  }
  return results;
}

const files = getFiles('.');
const report = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const m = line.match(/(?:import|export)\s+.*?\s+from\s+['"]([^'"]+)['"]/) ||
              line.match(/import\s*\(?['"]([^'"]+)['"]\)?/);
    if (m) {
      report.push({ file: f.replace(/\\/g, '/'), line: idx + 1, importPath: m[1], raw: line.trim() });
    }
  });
}

fs.writeFileSync(
  path.join(__dirname, 'imports_report.json'),
  JSON.stringify(report, null, 2)
);
console.log(`Scanned ${files.length} files, found ${report.length} imports.`);
