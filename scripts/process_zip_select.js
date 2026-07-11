const fs = require('fs');
const path = require('path');
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const repoRoot = path.resolve(__dirname, '..');
const srcArg = process.argv[2] ? path.resolve(process.argv[2]) : path.join(repoRoot, 'data', 'archive_raw');
const outDir = path.join(repoRoot, 'public', 'images');
const maxPerCategory = parseInt(process.argv[3], 10) || 100;

const categories = {
  mammals: ['dog','cat','cow','horse','sheep','goat','pig','rabbit','hare','squirrel','mouse','rat','deer','bear','wolf','fox','lion','tiger','elephant','giraffe','zebra','kangaroo','panda','otter','beaver','badger','hedgehog','moose','boar','raccoon','porcupine','seal','walrus','monkey','ape','chimp','bear'],
  birds: ['bird','eagle','owl','duck','goose','chicken','turkey','sparrow','penguin','parrot','hawk','falcon','swallow','robin','flamingo','stork','pelican','swan','crow'],
  reptiles: ['snake','lizard','crocodile','alligator','turtle','tortoise','gecko','boa','python'],
  amphibians: ['frog','toad','salamander','newt'],
  fish: ['fish','shark','salmon','trout','tuna','cod','mackerel','dolphin','whale','seal'],
  insects: ['butterfly','bee','ant','spider','fly','mosquito','beetle','moth','grasshopper','cricket']
};

function walk(dir) {
  let items = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) items = items.concat(walk(full));
    else items.push(full);
  }
  return items;
}

if (!fs.existsSync(srcArg)) {
  console.error('Source folder not found:', srcArg);
  process.exit(2);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = walk(srcArg).filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f));

const results = {};
for (const cat of Object.keys(categories)) {
  results[cat] = [];
  const catDir = path.join(outDir, cat);
  if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
}

for (const f of files) {
  const filename = path.basename(f).toLowerCase();
  let matched = null;
  for (const [cat, toks] of Object.entries(categories)) {
    for (const tok of toks) {
      if (filename.includes(tok)) {
        matched = cat;
        break;
      }
    }
    if (matched) break;
  }
  if (!matched) continue;
  if (results[matched].length >= maxPerCategory) continue;
  const ext = path.extname(f).toLowerCase();
  const base = slugify(path.basename(f, ext));
  const destName = `${base}${ext}`;
  const destPath = path.join(outDir, matched, destName);
  try {
    fs.copyFileSync(f, destPath);
    results[matched].push(destName);
  } catch (err) {
    console.warn('Failed to copy', f, '->', destPath, err.message);
  }
}

const mappingPath = path.join(repoRoot, 'scripts', 'mapping.auto.json');
fs.writeFileSync(mappingPath, JSON.stringify(results, null, 2), 'utf8');
console.log('Processing complete. Summary:');
for (const k of Object.keys(results)) console.log(`- ${k}: ${results[k].length} files`);
console.log('Mapping written to', mappingPath);
console.log('Now you can run node scripts/update_mammals_images.js with the mapping for mammals, or extend update script to cover other categories.');
