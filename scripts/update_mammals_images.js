const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node update_mammals_images.js <mapping.json>');
  process.exit(2);
}

const mappingPath = process.argv[2];
const repoRoot = path.resolve(__dirname, '..');
const dataFile = path.join(repoRoot, 'src', 'data', 'mammals.ts');
const backupFile = dataFile + '.bak';

if (!fs.existsSync(mappingPath)) {
  console.error('Mapping file not found:', mappingPath);
  process.exit(2);
}

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
let content = fs.readFileSync(dataFile, 'utf8');
fs.writeFileSync(backupFile, content, 'utf8');

for (const [id, filename] of Object.entries(mapping)) {
  const localPath = `/images/mammals/${filename}`;
  // Find the object with id: 'the-id' and replace the next image: '...' occurrence
  const idPattern = new RegExp("(id:\\s*'" + id.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&') + "'[\\s\\S]*?image:\\s*)'[^']*'", 'm');
  if (!idPattern.test(content)) {
    console.warn(`Could not find id ${id} in ${dataFile}`);
    continue;
  }
  content = content.replace(idPattern, `$1'${localPath}'`);
  console.log(`Updated ${id} -> ${localPath}`);
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Update complete. Original backed up at', backupFile);
