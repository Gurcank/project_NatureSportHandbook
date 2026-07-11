const fs = require('fs');
const vm = require('vm');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'data', 'mammals.ts');
let content = fs.readFileSync(file, 'utf8');

const startToken = 'const mammals: MammalEntry[] = [';
const start = content.indexOf(startToken);
if (start === -1) { console.error('start token not found'); process.exit(2); }
const arrStart = start + startToken.length - 1; // position at '['
const end = content.indexOf('\n];', arrStart);
if (end === -1) { console.error('end token not found'); process.exit(2); }
const arrayText = content.slice(arrStart, end+2); // include closing ]

// Evaluate the arrayText in VM to get JS array
const sandbox = {};
try {
  vm.createContext(sandbox);
  const script = new vm.Script('const mammals = ' + arrayText + '; mammals;');
  const mammals = script.runInContext(sandbox);
  if (!Array.isArray(mammals)) throw new Error('parsed value not array');
  mammals.sort((a,b)=> a.scientificName.localeCompare(b.scientificName, 'en', {sensitivity:'base'}));

  // Convert back to TypeScript-like object string with single quotes
  const pretty = mammals.map(obj => {
    const lines = [];
    lines.push('  {');
    lines.push(`    id: '${obj.id}',`);
    if (obj.name && typeof obj.name === 'object') {
      lines.push(`    name: { tr: '${obj.name.tr}', en: '${obj.name.en}' },`);
    } else {
      lines.push(`    name: '${obj.name}',`);
    }
    lines.push(`    scientificName: '${obj.scientificName}',`);
    if (obj.description && typeof obj.description === 'object') {
      lines.push('    description: {');
      lines.push(`      tr: '${(obj.description.tr||'').replace(/'/g, "\\'")}',`);
      lines.push(`      en: '${(obj.description.en||'').replace(/'/g, "\\'")}',`);
      lines.push('    },');
    } else {
      lines.push(`    description: '${(obj.description||'').replace(/'/g, "\\'")}',`);
    }
    lines.push(`    diet: '${(obj.diet||'').replace(/'/g, "\\'")}',`);
    lines.push(`    habitat: '${(obj.habitat||'').replace(/'/g, "\\'")}',`);
    lines.push(`    image: '${obj.image}'`);
    lines.push('  },');
    return lines.join('\n');
  }).join('\n\n');

  const newArray = '[\n' + pretty + '\n];';
  const newContent = content.slice(0, start) + startToken + '\n' + newArray + content.slice(end+3);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('mammals.ts sorted and written.');
} catch (err) {
  console.error('Failed to parse and sort:', err.message);
  process.exit(2);
}
