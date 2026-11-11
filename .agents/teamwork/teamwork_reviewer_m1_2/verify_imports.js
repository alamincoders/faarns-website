const fs = require('fs');
const path = require('path');

function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = getAllFiles('src');
console.log('Total files under src:', allFiles.length);

const importRegex = /(?:import|export)\s+(?:[\s\S]*?from\s+)?['"]([^'"]+)['"]/g;
let brokenImports = [];
let totalImports = 0;
let aliasImports = 0;
let relativeImports = 0;

for (const file of allFiles) {
  if (file.endsWith('.woff2') || file.endsWith('.css')) continue;
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    totalImports++;
    const importPath = match[1];
    
    // Ignore external packages
    if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      continue;
    }
    
    let resolved = null;
    let candidates = [];
    if (importPath.startsWith('@/')) {
      aliasImports++;
      const subPath = importPath.slice(2);
      const basePath = path.join('src', subPath);
      candidates = [
        basePath,
        basePath + '.ts',
        basePath + '.tsx',
        basePath + '.js',
        basePath + '.jsx',
        path.join(basePath, 'index.ts'),
        path.join(basePath, 'index.tsx')
      ];
    } else if (importPath.startsWith('.')) {
      relativeImports++;
      const dir = path.dirname(file);
      const basePath = path.resolve(dir, importPath);
      candidates = [
        basePath,
        basePath + '.ts',
        basePath + '.tsx',
        basePath + '.js',
        basePath + '.jsx',
        path.join(basePath, 'index.ts'),
        path.join(basePath, 'index.tsx')
      ];
    }
    
    resolved = candidates.find(c => fs.existsSync(c));
    if (!resolved) {
      brokenImports.push({ file, importPath, candidates });
    }
  }
}

console.log('Total import statements:', totalImports);
console.log('Alias (@/*) imports:', aliasImports);
console.log('Relative (./ or ../) imports:', relativeImports);
console.log('Broken imports count:', brokenImports.length);
if (brokenImports.length > 0) {
  console.log('Broken imports details:');
  console.log(JSON.stringify(brokenImports, null, 2));
} else {
  console.log('SUCCESS: All local and alias imports resolve cleanly!');
}
