const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const mappingFile = path.join(repoRoot, 'scripts', 'mapping.bycategory.json');
const outData = path.join(repoRoot, 'src', 'data', 'animals.ts');

if (!fs.existsSync(mappingFile)) {
  console.error('mapping.bycategory.json not found.');
  process.exit(2);
}

const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
const entries = [];

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

for (const [category, files] of Object.entries(mapping)) {
  const type = category === 'mammals' ? 'Mammal' : category === 'birds' ? 'Bird' : category === 'reptiles' ? 'Reptile' : category === 'amphibians' ? 'Amphibian' : category === 'fish' ? 'Fish' : 'Insect';
  files.forEach((f, idx) => {
    const ext = path.extname(f);
    const base = path.basename(f, ext).replace(/^oip-/, '').replace(/[^a-z0-9]+/gi, ' ').trim();
    const common = base ? base.split(/\s+/).map(w=> capitalize(w)).join(' ') : `${capitalize(category)} ${idx+1}`;
    const id = `${category}-${slugify(common)}-${idx+1}`;
    entries.push({
      id,
      name: common,
      scientificName: common,
      description: '',
      image: `/images/${category}/${f}`,
      climate: [],
      region: [],
      type,
      diet: '',
      habitat: ''
    });
  });
}

// sort by scientificName
entries.sort((a,b)=> a.scientificName.localeCompare(b.scientificName, 'en', {sensitivity:'base'}));

const fileContent = `import { Animal } from '@/types';

export const animals: Animal[] = ${JSON.stringify(entries, null, 2)};
`;

fs.writeFileSync(outData, fileContent, 'utf8');
console.log('Wrote', outData, 'with', entries.length, 'entries.');
