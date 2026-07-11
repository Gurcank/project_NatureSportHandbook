const fs = require('fs/promises');
const path = require('path');

const mammalsFile = path.join(__dirname, '..', 'src', 'data', 'mammals.ts');
const mappingFile = path.join(__dirname, 'mammal-image-paths.json');

const titleCandidates = {
  lion: ['Lion'],
  tiger: ['Tiger'],
  leopard: ['Leopard'],
  cheetah: ['Cheetah'],
  jaguar: ['Jaguar'],
  cat: ['Domestic cat', 'Cat'],
  dog: ['Dog', 'Domestic dog'],
  wolf: ['Gray wolf', 'Wolf'],
  fox: ['Red fox', 'Fox'],
  jackal: ['Golden jackal', 'Jackal'],
  hyena: ['Spotted hyena', 'Hyena'],
  'brown-bear': ['Brown bear'],
  'polar-bear': ['Polar bear'],
  panda: ['Giant panda', 'Panda'],
  elephant: ['African bush elephant', 'Elephant'],
  rhinoceros: ['Rhinoceros'],
  hippopotamus: ['Hippopotamus'],
  giraffe: ['Giraffe'],
  zebra: ['Zebra'],
  horse: ['Horse'],
  donkey: ['Donkey'],
  cow: ['Cattle', 'Cow'],
  sheep: ['Sheep'],
  goat: ['Goat'],
  pig: ['Pig'],
  'wild-boar': ['Wild boar'],
  camel: ['Camel'],
  llama: ['Llama'],
  alpaca: ['Alpaca'],
  deer: ['Red deer', 'Deer'],
  'roe-deer': ['Roe deer'],
  reindeer: ['Reindeer'],
  moose: ['Moose'],
  gazelle: ['Gazelle'],
  antelope: ['Antelope'],
  buffalo: ['African buffalo', 'Buffalo'],
  bison: ['American bison', 'Bison'],
  rabbit: ['Rabbit'],
  squirrel: ['Squirrel'],
  beaver: ['Beaver'],
  mouse: ['House mouse', 'Mouse'],
  rat: ['Brown rat', 'Rat'],
  hamster: ['Hamster'],
  hedgehog: ['Hedgehog'],
  mole: ['Mole (animal)', 'Mole'],
  bat: ['Bat'],
  chimpanzee: ['Chimpanzee'],
  gorilla: ['Gorilla'],
  orangutan: ['Orangutan'],
  baboon: ['Baboon'],
  lemur: ['Ring-tailed lemur', 'Lemur'],
  dolphin: ['Common bottlenose dolphin', 'Dolphin'],
  'blue-whale': ['Blue whale'],
  orca: ['Orca'],
  'humpback-whale': ['Humpback whale'],
  seal: ['Harbor seal', 'Harbour seal', 'Seal'],
  'sea-lion': ['Sea lion'],
  walrus: ['Walrus'],
  otter: ['European otter', 'Otter'],
  manatee: ['Manatee'],
  kangaroo: ['Red kangaroo', 'Kangaroo'],
  koala: ['Koala'],
  sloth: ['Sloth'],
  anteater: ['Giant anteater', 'Anteater'],
  armadillo: ['Armadillo'],
  raccoon: ['Raccoon'],
  meerkat: ['Meerkat'],
  ocelot: ['Ocelot'],
  badger: ['European badger', 'Badger'],
  porcupine: ['Porcupine'],
  skunk: ['Striped skunk', 'Skunk'],
  'tasmanian-devil': ['Tasmanian devil'],
};

function chunk(array, size) {
  const result = [];
  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }
  return result;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'project_natureSportHandbook/1.0' },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return response.json();
}

async function fetchThumbnailsForTitles(titles) {
  const api = 'https://en.wikipedia.org/w/api.php';
  const query = `${api}?action=query&titles=${titles.map(encodeURIComponent).join('|')}&prop=pageimages&format=json&pithumbsize=1200&redirects=1`;
  const data = await fetchJson(query);
  const results = {};
  const pages = data?.query?.pages ?? {};

  for (const page of Object.values(pages)) {
    if (page?.title && page?.thumbnail?.source) {
      results[page.title] = page.thumbnail.source;
    }
  }

  return results;
}

async function main() {
  const source = await fs.readFile(mammalsFile, 'utf8');
  const ids = [...source.matchAll(/id: '([^']+)'/g)].map((match) => match[1]);

  const titleToId = {};
  const primaryTitles = [];
  for (const id of ids) {
    const title = titleCandidates[id]?.[0] ?? id.replace(/-/g, ' ');
    titleToId[title] = id;
    primaryTitles.push(title);
  }

  const fetchedByTitle = {};
  for (const group of chunk(primaryTitles, 20)) {
    const batch = await fetchThumbnailsForTitles(group);
    Object.assign(fetchedByTitle, batch);
  }

  const remaining = ids.filter((id) => {
    const candidates = titleCandidates[id] ?? [id.replace(/-/g, ' ')];
    return !candidates.some((title) => fetchedByTitle[title]);
  });

  const fallbackTitles = [];
  for (const id of remaining) {
    const candidates = titleCandidates[id] ?? [id.replace(/-/g, ' ')];
    for (const title of candidates.slice(1)) {
      fallbackTitles.push(title);
    }
  }

  for (const group of chunk(fallbackTitles, 20)) {
    const batch = await fetchThumbnailsForTitles(group);
    Object.assign(fetchedByTitle, batch);
  }

  const imagePaths = {};
  const missing = [];

  for (const id of ids) {
    const candidates = titleCandidates[id] ?? [id.replace(/-/g, ' ')];
    let resolvedUrl = null;

    for (const title of candidates) {
      if (fetchedByTitle[title]) {
        resolvedUrl = fetchedByTitle[title];
        break;
      }
    }

    if (!resolvedUrl) {
      missing.push(id);
      continue;
    }

    imagePaths[id] = resolvedUrl;
  }

  await fs.writeFile(mappingFile, JSON.stringify(imagePaths, null, 2), 'utf8');

  let updated = source;
  for (const [id, imageUrl] of Object.entries(imagePaths)) {
    const pattern = new RegExp(`(id: '${id}'[\\s\\S]*?image: )'[^']*'`);
    updated = updated.replace(pattern, `$1'${imageUrl}'`);
  }

  await fs.writeFile(mammalsFile, updated, 'utf8');

  console.log(`Updated ${Object.keys(imagePaths).length} mammals with Wikipedia thumbnails.`);
  if (missing.length) {
    console.log(`Missing thumbnails for: ${missing.join(', ')}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});