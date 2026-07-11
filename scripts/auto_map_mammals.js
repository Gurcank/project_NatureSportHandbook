const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const dataFile = path.join(repoRoot, 'src', 'data', 'mammals.ts');
const imagesSourceDir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(repoRoot, 'public', 'images', 'animals10');
const imagesDestDir = path.join(repoRoot, 'public', 'images', 'mammals');
const outMapping = path.join(repoRoot, 'scripts', 'mapping.auto.json');

if (!fs.existsSync(dataFile)) {
  console.error('Could not find', dataFile);
  process.exit(2);
}

if (!fs.existsSync(imagesSourceDir)) {
  console.error('Source images folder not found:', imagesSourceDir);
  console.error('Pass the path to the downloaded dataset folder as the first argument.');
  process.exit(2);
}

if (!fs.existsSync(imagesDestDir)) fs.mkdirSync(imagesDestDir, { recursive: true });

const content = fs.readFileSync(dataFile, 'utf8');

// Regex to capture id and english name inside the MammalEntry objects
const entryRe = /id:\s*'([^']+)'[\s\S]*?name:\s*\{\s*tr:\s*'([^']*)'\s*,\s*en:\s*'([^']*)'\s*\}/g;

const entries = [];
let m;
while ((m = entryRe.exec(content)) !== null) {
  entries.push({ id: m[1], tr: m[2], en: m[3] });
}

if (!entries.length) {
  console.error('No mammal entries parsed from', dataFile);
  process.exit(2);
}

const files = fs.readdirSync(imagesSourceDir).filter((f) => fs.statSync(path.join(imagesSourceDir, f)).isFile());

const mapping = {};

for (const e of entries) {
  const tokens = new Set();
  e.id.split(/[-_]/).forEach((t) => tokens.add(t.toLowerCase()));
  e.en.split(/[^a-zA-Z0-9]+/).forEach((t) => t && tokens.add(t.toLowerCase()));
  e.tr.split(/[^a-zA-Z0-9ığüşöçİĞÜŞÖÇ]+/).forEach((t) => t && tokens.add(t.toLowerCase()));

  let matched = null;
  for (const f of files) {
    const name = f.toLowerCase();
    for (const tok of tokens) {
      if (tok.length < 3) continue; // skip tiny tokens
      if (name.includes(tok)) {
        matched = f;
        break;
      }
    }
    if (matched) break;
  }

  if (matched) {
    const ext = path.extname(matched);
    const destName = `${e.id}${ext}`;
    fs.copyFileSync(path.join(imagesSourceDir, matched), path.join(imagesDestDir, destName));
    mapping[e.id] = destName;
    console.log(`Mapped ${e.id} -> ${matched} (copied as ${destName})`);
  } else {
    console.warn(`No match found for ${e.id} (${e.en})`);
  }
}

fs.writeFileSync(outMapping, JSON.stringify(mapping, null, 2), 'utf8');
console.log('Auto-mapping written to', outMapping);
console.log('Next: run node scripts/update_mammals_images.js', outMapping);
