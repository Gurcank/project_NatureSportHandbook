const fs = require('fs/promises');
const path = require('path');

const mammalsFile = path.join(__dirname, '..', 'src', 'data', 'mammals.ts');
const outputDir = path.join(__dirname, '..', 'public', 'images', 'mammals');
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
  cow: ['Cow'],
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
  seal: ['Harbour seal', 'Seal'],
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

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

async function getWikipediaThumbnail(title) {
  const api = 'https://en.wikipedia.org/w/api.php';
  const url = `${api}?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1200`;
  const data = await fetchJson(url);
  const pages = data?.query?.pages ?? {};

  for (const page of Object.values(pages)) {
    if (page?.thumbnail?.source) {
      return page.thumbnail.source;
    }
  }

  return null;
}

async function downloadFile(url, destination) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'project_natureSportHandbook/1.0' },
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      await fs.writeFile(destination, Buffer.from(arrayBuffer));
      return;
    }

    if (response.status !== 429 || attempt === 3) {
      throw new Error(`Download failed: HTTP ${response.status}`);
    }

    await delay((attempt + 1) * 1500);
  }
}

async function main() {
  await ensureDir(outputDir);

  const mammalSource = await fs.readFile(mammalsFile, 'utf8');
  const animalIds = [...mammalSource.matchAll(/id: '([^']+)'/g)].map((match) => match[1]);

  const imagePaths = {};
  const failures = [];

  for (const id of animalIds) {
    const candidates = titleCandidates[id] ?? [id.replace(/-/g, ' ')];
    let thumbnailUrl = null;

    for (const title of candidates) {
      try {
        thumbnailUrl = await getWikipediaThumbnail(title);
        if (thumbnailUrl) {
          break;
        }
      } catch {
        // Try the next candidate.
      }
    }

    if (!thumbnailUrl) {
      failures.push(id);
      continue;
    }

    const extension = path.extname(new URL(thumbnailUrl).pathname) || '.jpg';
    const fileName = `${id}${extension}`;
    const destination = path.join(outputDir, fileName);

    await downloadFile(thumbnailUrl, destination);
    imagePaths[id] = `/images/mammals/${fileName}`;
    console.log(`Downloaded ${id} -> ${fileName}`);

    await delay(700);
  }

  await fs.writeFile(mappingFile, JSON.stringify(imagePaths, null, 2), 'utf8');

  let updatedSource = mammalSource;
  for (const [id, imagePath] of Object.entries(imagePaths)) {
    const pattern = new RegExp(`(id: '${id}'[\\s\\S]*?image: )'[^']*'`);
    updatedSource = updatedSource.replace(pattern, `$1'${imagePath}'`);
  }

  await fs.writeFile(mammalsFile, updatedSource, 'utf8');

  console.log(`\nDone. Downloaded ${Object.keys(imagePaths).length} images.`);
  if (failures.length) {
    console.log(`Skipped ${failures.length} entries: ${failures.join(', ')}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});