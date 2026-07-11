const fs = require('fs/promises');
const path = require('path');

const outputFile = path.join(__dirname, '..', 'src', 'data', 'reptiles.ts');

function r(id, name, scientificName, description, diet, habitat, titles) {
  return { id, name, scientificName, description, diet, habitat, titles };
}

const reptileSpecs = [
  r('chameleon', 'Bukalemun', 'Chamaeleonidae', 'Renk değiştirme yeteneği ve bağımsız hareket eden gözleriyle tanınan bir sürüngen.', 'Insectivore', 'Tropical forests, savannas', ['Chameleon']),
  r('iguana', 'İguana', 'Iguana iguana', 'Ağaçlarda yaşayan, iri yapılı ve bitkilerle beslenen bir kertenkele.', 'Herbivore', 'Rainforests, coastal forests', ['Green iguana']),
  r('komodo-dragon', 'Komodo Ejderi', 'Varanus komodoensis', 'Dünyanın en büyük yaşayan kertenkelesi, güçlü bir etçil avcı.', 'Carnivore', 'Tropical savannas, islands', ['Komodo dragon']),
  r('green-sea-turtle', 'Yeşil Deniz Kaplumbağası', 'Chelonia mydas', 'Sıcak denizlerde yaşayan, otçul deniz kaplumbağası.', 'Herbivore', 'Tropical oceans, coral reefs', ['Green sea turtle']),
  r('nile-crocodile', 'Nil Timsahı', 'Crocodylus niloticus', 'Afrika nehirlerinin güçlü ve saldırgan yırtıcısı.', 'Carnivore', 'Rivers, lakes, wetlands', ['Nile crocodile']),
  r('american-alligator', 'Amerikan Aligatoru', 'Alligator mississippiensis', 'Amerika’nın güneyindeki bataklıklarda yaşayan büyük sürüngen.', 'Carnivore', 'Swamps, marshes, rivers', ['American alligator']),
  r('king-cobra', 'Kral Kobra', 'Ophiophagus hannah', 'Dünyanın en uzun zehirli yılanlarından biri.', 'Carnivore', 'Forests, bamboo thickets', ['King cobra']),
  r('anaconda', 'Anakonda', 'Eunectes murinus', 'Güney Amerika’nın dev, suda yaşayan boğucu yılanı.', 'Carnivore', 'Rivers, swamps, wetlands', ['Green anaconda']),
  r('python', 'Piton', 'Python bivittatus', 'Güçlü vücuduyla avını sararak öldüren iri bir yılan.', 'Carnivore', 'Rainforests, wetlands', ['Python', 'Burmese python']),
  r('rattlesnake', 'Çıngıraklı Yılan', 'Crotalus', 'Kuyruğundaki çıngırakla uyarı veren zehirli yılan.', 'Carnivore', 'Deserts, grasslands, scrublands', ['Rattlesnake']),
  r('black-mamba', 'Kara Mamba', 'Dendroaspis polylepis', 'Son derece hızlı ve güçlü zehirli Afrika yılanı.', 'Carnivore', 'Savannas, rocky hills, woodlands', ['Black mamba']),
  r('boa-constrictor', 'Boğa Yılanı', 'Boa constrictor', 'Avını sıkarak etkisiz hale getiren iri bir yılan.', 'Carnivore', 'Rainforests, dry forests', ['Boa constrictor']),
  r('gecko', 'Geko', 'Gekkonidae', 'Duvarlara tırmanabilen küçük ve çevik kertenkeleler.', 'Insectivore', 'Deserts, forests, homes', ['Gecko']),
  r('tortoise', 'Kara Kaplumbağası', 'Testudinidae', 'Kara yaşamına uyarlanmış, ağır zırhlı kaplumbağa.', 'Herbivore', 'Dry forests, grasslands, deserts', ['Tortoise']),
  r('freshwater-turtle', 'Su Kaplumbağası', 'Emydidae', 'Tatlı su ortamlarında yaşayan sucul kaplumbağa.', 'Omnivore', 'Lakes, ponds, rivers', ['Freshwater turtle']),
  r('galapagos-tortoise', 'Dev Galapagos Kaplumbağası', 'Chelonoidis niger', 'Dünyanın en uzun ömürlü ve en büyük kara kaplumbağalarından biri.', 'Herbivore', 'Galápagos islands, dry forests', ['Galapagos tortoise']),
  r('agama', 'Agama', 'Agamidae', 'Çoğu türü renk değiştirebilen ve güneşlenen kertenkele ailesi.', 'Insectivore', 'Rocky areas, savannas, deserts', ['Agama lizard']),
  r('lacerta', 'Keler', 'Lacerta', 'Hızlı hareket eden, uzun gövdeli bir kertenkele grubu.', 'Insectivore', 'Forests, meadows, rocky areas', ['Lizard']),
  r('monitor', 'Varan', 'Varanus', 'Güçlü pençeleri ve uzun diliyle bilinen büyük kertenkele.', 'Carnivore', 'Forests, savannas, wetlands', ['Monitor lizard']),
  r('viper', 'Engerek', 'Viperidae', 'Zehirli dişleriyle bilinen, çoğu türü çukur kafalı yılan.', 'Carnivore', 'Forests, grasslands, rocky areas', ['Viper']),
  r('coral-snake', 'Mercan Yılanı', 'Micrurus', 'Parlak desenleriyle dikkat çeken zehirli yılan.', 'Carnivore', 'Forests, woodlands, scrublands', ['Coral snake']),
  r('caiman', 'Kayman', 'Caiman', 'Amerika’nın sulak alanlarında yaşayan küçük timsah akrabası.', 'Carnivore', 'Rivers, swamps, wetlands', ['Caiman']),
  r('gharial', 'Gavyal', 'Gavialis gangeticus', 'Uzun ve ince çenesiyle balık avlamaya uyarlanmış timsah türü.', 'Carnivore', 'Rivers, wetlands', ['Gharial']),
  r('tuatara', 'Tuatara', 'Sphenodon punctatus', 'Sürüngenler arasında yaşayan en eski soy hatlarından birini temsil eder.', 'Carnivore', 'Coastal forests, islands', ['Tuatara']),
  r('blue-tongued-skink', 'Mavi Dilli Skink', 'Tiliqua scincoides', 'Mavimsi diliyle savunma yapan iri bir skink türü.', 'Omnivore', 'Woodlands, grasslands, gardens', ['Blue-tongued skink']),
  r('horned-lizard', 'Boynuzlu Kertenkele', 'Phrynosoma', 'Düz gövdeli ve boynuz benzeri çıkıntıları olan çöl kertenkelesi.', 'Insectivore', 'Deserts, scrublands', ['Horned lizard']),
  r('draco', 'Uçan Ejder', 'Draco volans', 'Kaburga zarlarıyla ağaçlar arasında süzülebilen kertenkele.', 'Insectivore', 'Tropical forests', ['Flying dragon', 'Draco lizard']),
  r('sea-snake', 'Deniz Yılanı', 'Hydrophiinae', 'Tuzlu suya uyarlanmış, çoğu türü son derece zehirli yılan.', 'Carnivore', 'Oceans, coastal waters', ['Sea snake']),
  r('blind-snake', 'Kör Yılan', 'Typhlopidae', 'Yer altında yaşayan, gözleri çok körelmiş küçük yılan.', 'Insectivore', 'Soil, leaf litter, underground', ['Blind snake']),
  r('wall-lizard', 'Kertenkele', 'Podarcis muralis', 'Duvar ve kaya yüzeylerinde sık görülen çevik kertenkele.', 'Insectivore', 'Walls, rocks, gardens', ['Wall lizard']),
  r('spitting-cobra', 'Çöl Kobrası', 'Naja', 'Savunmada zehir fışkırtabilen zehirli kobra türleri.', 'Carnivore', 'Deserts, grasslands, scrublands', ['Cobra', 'Spitting cobra']),
  r('leatherback-turtle', 'Deri Sırtlı Deniz Kaplumbağası', 'Dermochelys coriacea', 'Kabuk yerine deri benzeri sırtı olan dev deniz kaplumbağası.', 'Carnivore', 'Open oceans, tropical seas', ['Leatherback sea turtle']),
  r('beaded-lizard', 'Boncuklu Kertenkele', 'Heloderma horridum', 'Boncuklu derisi ve zehirli ısırığıyla bilinen sürüngen.', 'Carnivore', 'Dry forests, scrublands', ['Beaded lizard']),
  r('gila-monster', 'Gila Canavarı', 'Heloderma suspectum', 'Kuzey Amerika’nın zehirli ve iri kertenkelelerinden biri.', 'Carnivore', 'Deserts, scrublands', ['Gila monster']),
  r('green-lizard', 'Yeşil Kertenkele', 'Lacerta viridis', 'Canlı yeşil rengiyle dikkat çeken yaygın bir kertenkele.', 'Insectivore', 'Meadows, woodlands, gardens', ['Green lizard']),
  r('sand-snake', 'Oluklu Kertenkele', 'Psammophis', 'Hızlı hareket eden, avını kumlu alanlarda izleyen sürüngen.', 'Carnivore', 'Deserts, sandy areas, scrublands', ['Sand snake', 'Striped snake']),
  r('sand-boa', 'Kum Yılanı', 'Eryx', 'Kumda gizlenen, küçük avları pusuya düşüren yılan.', 'Carnivore', 'Deserts, dunes, scrublands', ['Sand boa']),
  r('adder', 'Şeritli Engerek', 'Vipera', 'Vücut desenleriyle tanınan zehirli engerek türü.', 'Carnivore', 'Forests, grasslands, rocky areas', ['Adder', 'Vipera']),
  r('basilisk', 'Basilisk', 'Basiliscus', 'Su üzerinde koşabiliyormuş gibi görünen çevik kertenkele.', 'Insectivore', 'Tropical forests, rivers', ['Basilisk', 'Jesus Christ lizard']),
  r('monitor-lizard', 'Monitor Kertenkelesi', 'Varanus', 'Güçlü yapılı, uzun kuyruklu ve çevik büyük kertenkele.', 'Carnivore', 'Forests, savannas, wetlands', ['Monitor lizard']),
];

function chunk(array, size) {
  const result = [];
  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }
  return result;
}

function escapeTs(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, ' ');
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

async function fetchWikipediaThumbnails(titles) {
  const byTitle = {};
  for (const batch of chunk(titles, 20)) {
    const query = batch.map(encodeURIComponent).join('|');
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${query}&prop=pageimages&format=json&pithumbsize=1200&redirects=1`;
    const data = await fetchJson(url);
    const pages = data?.query?.pages ?? {};

    for (const page of Object.values(pages)) {
      if (page?.title && page?.thumbnail?.source) {
        byTitle[page.title] = page.thumbnail.source;
      }
    }
  }

  return byTitle;
}

async function main() {
  const allTitles = [...new Set(reptileSpecs.flatMap((reptile) => reptile.titles))];
  const wikiByTitle = await fetchWikipediaThumbnails(allTitles);

  const entries = reptileSpecs.map((reptile) => {
    let image = null;
    for (const title of reptile.titles) {
      if (wikiByTitle[title]) {
        image = wikiByTitle[title];
        break;
      }
    }

    if (!image) {
      image = `https://source.unsplash.com/900x600/?${encodeURIComponent(reptile.name)}`;
    }

    return {
      id: reptile.id,
      name: reptile.name,
      scientificName: reptile.scientificName,
      description: reptile.description,
      image,
      climate: [],
      region: [],
      type: 'Reptile',
      diet: reptile.diet,
      habitat: reptile.habitat,
    };
  });

  const lines = [];
  lines.push("import type { Animal } from '@/types';");
  lines.push('');
  lines.push('export const reptiles: Animal[] = [');

  for (const entry of entries) {
    lines.push('  {');
    lines.push(`    id: '${escapeTs(entry.id)}',`);
    lines.push(`    name: '${escapeTs(entry.name)}',`);
    lines.push(`    scientificName: '${escapeTs(entry.scientificName)}',`);
    lines.push(`    description: '${escapeTs(entry.description)}',`);
    lines.push(`    image: '${escapeTs(entry.image)}',`);
    lines.push('    climate: [],');
    lines.push('    region: [],');
    lines.push("    type: 'Reptile',");
    lines.push(`    diet: '${escapeTs(entry.diet)}',`);
    lines.push(`    habitat: '${escapeTs(entry.habitat)}'`);
    lines.push('  },');
  }

  lines.push('];');
  lines.push('');
  lines.push('export default reptiles;');
  lines.push('');

  await fs.writeFile(outputFile, lines.join('\n'), 'utf8');
  console.log(`Wrote ${entries.length} reptiles to ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});