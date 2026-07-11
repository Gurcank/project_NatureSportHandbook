const fs = require('fs/promises');
const path = require('path');

const root = path.join(__dirname, '..');
const outputFiles = {
  fish: path.join(root, 'src', 'data', 'fish.ts'),
  amphibians: path.join(root, 'src', 'data', 'amphibians.ts'),
  insects: path.join(root, 'src', 'data', 'insects.ts'),
};

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

async function resolveImages(specs) {
  const allTitles = [...new Set(specs.flatMap((entry) => [...entry.titles, entry.scientificName]))];
  const wikiByTitle = await fetchWikipediaThumbnails(allTitles);

  return specs.map((entry) => {
    if (entry.image) {
      return {
        id: entry.id,
        name: entry.name,
        scientificName: entry.scientificName,
        description: entry.description,
        image: entry.image,
        climate: [],
        region: [],
        type: entry.type,
        diet: entry.diet,
        habitat: entry.habitat,
      };
    }

    let image = null;
    for (const title of [...entry.titles, entry.scientificName]) {
      if (wikiByTitle[title]) {
        image = wikiByTitle[title];
        break;
      }
    }

    if (!image) {
      image = `https://source.unsplash.com/900x600/?${encodeURIComponent(entry.name)}`;
    }

    return {
      id: entry.id,
      name: entry.name,
      scientificName: entry.scientificName,
      description: entry.description,
      image,
      climate: [],
      region: [],
      type: entry.type,
      diet: entry.diet,
      habitat: entry.habitat,
    };
  });
}

function renderAnimalFile(exportName, items) {
  const lines = [];
  lines.push("import type { Animal } from '@/types';");
  lines.push('');
  lines.push(`export const ${exportName}: Animal[] = [`);

  for (const item of items) {
    lines.push('  {');
    lines.push(`    id: '${escapeTs(item.id)}',`);
    lines.push(`    name: '${escapeTs(item.name)}',`);
    lines.push(`    scientificName: '${escapeTs(item.scientificName)}',`);
    lines.push(`    description: '${escapeTs(item.description)}',`);
    lines.push(`    image: '${escapeTs(item.image)}',`);
    lines.push('    climate: [],');
    lines.push('    region: [],');
    lines.push(`    type: '${escapeTs(item.type)}',`);
    lines.push(`    diet: '${escapeTs(item.diet)}',`);
    lines.push(`    habitat: '${escapeTs(item.habitat)}'`);
    lines.push('  },');
  }

  lines.push('];');
  lines.push('');
  lines.push(`export default ${exportName};`);
  lines.push('');
  return lines.join('\n');
}

const fishSpecs = [
  { id: 'shark', name: 'Köpekbalığı', scientificName: 'Selachimorpha', description: 'Okyanusların en ünlü yırtıcı balık grubu.', type: 'Fish', diet: 'Carnivore', habitat: 'Oceans, coastal waters', titles: ['Shark'] },
  { id: 'whale-shark', name: 'Balina Köpekbalığı', scientificName: 'Rhincodon typus', description: 'Dünyanın en büyük balığı, süzerek beslenen yumuşak dev.', type: 'Fish', diet: 'Filter feeder', habitat: 'Warm oceans', titles: ['Whale shark'] },
  { id: 'ray', name: 'Vatoz', scientificName: 'Batoidea', description: 'Yassı gövdesiyle dipte süzülen zarif bir kıkırdaklı balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Seafloors, reefs, coastal waters', titles: ['Stingray', 'Ray'] },
  { id: 'hammerhead', name: 'Çekiç Başlı Köpekbalığı', scientificName: 'Sphyrnidae', description: 'Çekiç biçimli baş yapısıyla tanınan köpekbalığı.', type: 'Fish', diet: 'Carnivore', habitat: 'Warm oceans', titles: ['Hammerhead shark'] },
  { id: 'salmon', name: 'Somon', scientificName: 'Salmo salar', description: 'Deniz ve tatlı su arasında göç eden değerli bir balık.', type: 'Fish', diet: 'Omnivore', habitat: 'Rivers, oceans', titles: ['Salmon'] },
  { id: 'trout', name: 'Alabalık', scientificName: 'Oncorhynchus mykiss', description: 'Soğuk ve temiz sularda yaşayan popüler tatlı su balığı.', type: 'Fish', diet: 'Omnivore', habitat: 'Cold rivers, lakes', titles: ['Trout'] },
  { id: 'tuna', name: 'Ton Balığı', scientificName: 'Thunnus', description: 'Hızlı yüzmesi ve uzun göçleriyle bilinen büyük pelajik balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Open oceans', titles: ['Tuna'] },
  { id: 'bluefish', name: 'Lüfer', scientificName: 'Pomatomus saltatrix', description: 'Güçlü çeneli, avcı karakterli kıyı balığı.', type: 'Fish', diet: 'Carnivore', habitat: 'Coastal waters', titles: ['Bluefish'] },
  { id: 'sea-bream', name: 'Çipura', scientificName: 'Sparus aurata', description: 'Akdeniz mutfağında çok tanınan lezzetli bir balık.', type: 'Fish', diet: 'Omnivore', habitat: 'Mediterranean seas, coasts', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sparus_aurata.jpg', titles: ['Gilthead seabream', 'Gilthead sea bream', 'Sparus aurata'] },
  { id: 'sea-bass', name: 'Levrek', scientificName: 'Dicentrarchus labrax', description: 'Hem tatlı hem tuzlu sulara uyum sağlayabilen avcı balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Coastal waters, estuaries', titles: ['Sea bass', 'European seabass', 'Dicentrarchus labrax'] },
  { id: 'anchovy', name: 'Hamsi', scientificName: 'Engraulis encrasicolus', description: 'Sürü halinde dolaşan küçük ama ekonomik açıdan önemli balık.', type: 'Fish', diet: 'Planktivore', habitat: 'Black Sea, Mediterranean, Atlantic', titles: ['Anchovy'] },
  { id: 'horse-mackerel', name: 'İstavrit', scientificName: 'Trachurus trachurus', description: 'Sürü halinde yüzen, kıyı sularında sık görülen hızlı balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Coastal waters', titles: ['Horse mackerel', 'Atlantic horse mackerel'] },
  { id: 'bonito', name: 'Palamut', scientificName: 'Sarda sarda', description: 'Hızlı avcı yapısıyla bilinen, Akdeniz ve Karadeniz balığı.', type: 'Fish', diet: 'Carnivore', habitat: 'Mediterranean, Black Sea, Atlantic', titles: ['Atlantic bonito', 'Bonito'] },
  { id: 'sardine', name: 'Sardalya', scientificName: 'Sardina pilchardus', description: 'Küçük sürüler halinde yaşayan, yağlı ve önemli bir kıyı balığı.', type: 'Fish', diet: 'Planktivore', habitat: 'Coastal waters', titles: ['Sardine'] },
  { id: 'carp', name: 'Sazan', scientificName: 'Cyprinus carpio', description: 'Tatlı sularda çok yaygın, dayanıklı bir balık türü.', type: 'Fish', diet: 'Omnivore', habitat: 'Lakes, rivers, ponds', titles: ['Carp'] },
  { id: 'catfish', name: 'Yayın Balığı', scientificName: 'Siluriformes', description: 'Bıyıklarıyla tanınan, dipte yaşayan büyük tatlı su balığı.', type: 'Fish', diet: 'Carnivore', habitat: 'Rivers, lakes, ponds', titles: ['Catfish'] },
  { id: 'goldfish', name: 'Japon Balığı', scientificName: 'Carassius auratus', description: 'Süs akvaryumlarının en tanınmış balıklarından biri.', type: 'Fish', diet: 'Omnivore', habitat: 'Ponds, aquariums', titles: ['Goldfish'] },
  { id: 'betta', name: 'Beta Balığı', scientificName: 'Betta splendens', description: 'Renkli yüzgeçleri ve agresif yapısıyla bilinen akvaryum balığı.', type: 'Fish', diet: 'Carnivore', habitat: 'Ponds, slow streams, aquariums', titles: ['Betta fish', 'Siamese fighting fish'] },
  { id: 'angelfish', name: 'Melek Balığı', scientificName: 'Pterophyllum scalare', description: 'Akvaryumlarda çok sevilen, uzun yüzgeçli süs balığı.', type: 'Fish', diet: 'Omnivore', habitat: 'Amazon river basin, aquariums', titles: ['Angelfish'] },
  { id: 'clownfish', name: 'Palyaço Balığı', scientificName: 'Amphiprioninae', description: 'Mercan resiflerinde yaşayan, Nemo ile ünlü renkli balık.', type: 'Fish', diet: 'Omnivore', habitat: 'Coral reefs', titles: ['Clownfish'] },
  { id: 'moray-eel', name: 'Müren', scientificName: 'Muraenidae', description: 'Resiflerde saklanan, uzun ve yılanımsı görünüşte avcı balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Coral reefs, rocky coasts', titles: ['Moray eel'] },
  { id: 'anglerfish', name: 'Fener Balığı', scientificName: 'Lophiiformes', description: 'Işıltılı yem organıyla karanlık sularda avlanan balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Deep oceans', titles: ['Anglerfish'] },
  { id: 'flying-fish', name: 'Uçan Balık', scientificName: 'Exocoetidae', description: 'Su yüzeyinden kısa mesafeler süzülebilen olağanüstü balık.', type: 'Fish', diet: 'Planktivore', habitat: 'Tropical and subtropical oceans', titles: ['Flying fish'] },
  { id: 'seahorse', name: 'Deniz Atı', scientificName: 'Hippocampus', description: 'Erkeğin yavru taşıdığı, atı andıran sevimli deniz canlısı.', type: 'Fish', diet: 'Carnivore', habitat: 'Seagrass beds, reefs', titles: ['Seahorse'] },
  { id: 'piranha', name: 'Pirana', scientificName: 'Pygocentrus nattereri', description: 'Keskin dişleriyle ün yapmış Güney Amerika balığı.', type: 'Fish', diet: 'Carnivore', habitat: 'Amazon basin rivers', titles: ['Piranha'] },
  { id: 'swordfish', name: 'Kılıç Balığı', scientificName: 'Xiphias gladius', description: 'Uzun kılıç benzeri gagasıyla güçlü bir açık deniz balığı.', type: 'Fish', diet: 'Carnivore', habitat: 'Open oceans', titles: ['Swordfish'] },
  { id: 'sturgeon', name: 'Mersin Balığı', scientificName: 'Acipenser', description: 'Havyarıyla da bilinen kadim balık grubu.', type: 'Fish', diet: 'Omnivore', habitat: 'Rivers, estuaries, seas', titles: ['Sturgeon'] },
  { id: 'eel', name: 'Yılan Balığı', scientificName: 'Anguilliformes', description: 'Yılanımsı vücuduyla kolay tanınan uzun balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Rivers, oceans, estuaries', titles: ['Eel'] },
  { id: 'sole', name: 'Dil Balığı', scientificName: 'Soleidae', description: 'Deniz tabanında yaşayan yassı balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Sandy seafloors', titles: ['Sole'] },
  { id: 'red-mullet', name: 'Barbun', scientificName: 'Mullus barbatus', description: 'Kırmızımsı renkli, Akdeniz mutfağında sevilen balık.', type: 'Fish', diet: 'Carnivore', habitat: 'Mediterranean and coastal waters', titles: ['Red mullet'] },
];

const amphibianSpecs = [
  { id: 'green-frog', name: 'Yeşil Kurbağa', scientificName: 'Pelophylax', description: 'Göller ve sulak alanlarda yaşayan yaygın kurbağa grubu.', type: 'Amphibian', diet: 'Insectivore', habitat: 'Ponds, lakes, wetlands', titles: ['Green frog', 'Common frog'] },
  { id: 'toad', name: 'Kara Kurbağası', scientificName: 'Bufo bufo', description: 'Kuru derili ve daha tıknaz yapılı kara amfibisi.', type: 'Amphibian', diet: 'Insectivore', habitat: 'Forests, gardens, wetlands', titles: ['Common toad'] },
  { id: 'tree-frog', name: 'Ağaç Kurbağası', scientificName: 'Hyla arborea', description: 'Ağaçlarda yaşamaya uyarlanmış, güçlü parmaklı kurbağa.', type: 'Amphibian', diet: 'Insectivore', habitat: 'Forests, reeds, wetlands', titles: ['Tree frog', 'European tree frog'] },
  { id: 'salamander', name: 'Semender', scientificName: 'Salamandra', description: 'Islak ortamlarda yaşayan, uzun gövdeli amfibi.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Forests, streams, damp places', titles: ['Salamander'] },
  { id: 'axolotl', name: 'Aksolotl', scientificName: 'Ambystoma mexicanum', description: 'Yetişkinliğini larva görünümünde koruyan ünlü amfibi.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Lakes, canals, aquariums', titles: ['Axolotl'] },
  { id: 'poison-dart-frog', name: 'Zehirli Ok Kurbağası', scientificName: 'Dendrobatidae', description: 'Canlı renkleriyle uyarı veren küçük zehirli kurbağa.', type: 'Amphibian', diet: 'Insectivore', habitat: 'Rainforests', titles: ['Poison dart frog'] },
  { id: 'bullfrog', name: 'Boğa Kurbağası', scientificName: 'Lithobates catesbeianus', description: 'Büyük boyutu ve gür sesiyle tanınan kurbağa.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Ponds, lakes, marshes', titles: ['Bullfrog', 'American bullfrog'] },
  { id: 'newt', name: 'Su Semenderi', scientificName: 'Triturus', description: 'Yaşamının bir kısmını suda geçiren semender türü.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Ponds, slow streams, forests', titles: ['Newt'] },
  { id: 'giant-chinese-salamander', name: 'Dev Çin Semenderi', scientificName: 'Andrias davidianus', description: 'Dünyanın en büyük amfibilerinden biri.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Cold rivers, mountain streams', titles: ['Chinese giant salamander'] },
  { id: 'caecilian', name: 'Sesilya', scientificName: 'Gymnophiona', description: 'Bacakları olmayan, yer altında yaşayan ilginç amfibi grubu.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Soil, tropical forests', titles: ['Caecilian'] },
  { id: 'spotted-salamander', name: 'Benekli Semender', scientificName: 'Ambystoma maculatum', description: 'Benekli vücuduyla dikkat çeken gece aktif amfibi.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Forests, wetlands', titles: ['Spotted salamander'] },
  { id: 'fire-salamander', name: 'Ateş Semenderi', scientificName: 'Salamandra salamandra', description: 'Siyah üstüne sarı desenleriyle bilinen zehirli semender.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Forests, damp woodlands', titles: ['Fire salamander'] },
  { id: 'glass-frog', name: 'Cam Kurbağası', scientificName: 'Centrolenidae', description: 'Yarı saydam karın bölgesiyle bilinen tropik kurbağa.', type: 'Amphibian', diet: 'Insectivore', habitat: 'Tropical forests, streams', titles: ['Glass frog'] },
  { id: 'african-clawed-frog', name: 'Afrika Pençeli Kurbağası', scientificName: 'Xenopus laevis', description: 'Laboratuvarlarda da çok bilinen pençeli su kurbağası.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Ponds, slow rivers', titles: ['African clawed frog'] },
  { id: 'mudpuppy', name: 'Çamur Semenderi', scientificName: 'Necturus maculosus', description: 'Hayat boyu solungaç taşıyabilen sucul semender.', type: 'Amphibian', diet: 'Carnivore', habitat: 'Lakes, rivers, streams', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mudpuppy.jpg', titles: ['Mudpuppy', 'Necturus maculosus'] },
];

const insectSpecs = [
  { id: 'honey-bee', name: 'Bal Arısı', scientificName: 'Apis mellifera', description: 'Bal üretimi ve tozlaşmadaki rolüyle ünlü sosyal böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Gardens, meadows, forests', titles: ['Honey bee'] },
  { id: 'ant', name: 'Karınca', scientificName: 'Formicidae', description: 'Koloni halinde yaşayan, güçlü ve organize sosyal böcek.', type: 'Insect', diet: 'Omnivore', habitat: 'Soil, forests, cities', titles: ['Ant'] },
  { id: 'butterfly', name: 'Kelebek', scientificName: 'Lepidoptera', description: 'Renkli kanatlarıyla bahar ve yazın simgesi olan böcek.', type: 'Insect', diet: 'Nectarivore', habitat: 'Gardens, meadows, forests', titles: ['Butterfly'] },
  { id: 'dragonfly', name: 'Yusufçuk', scientificName: 'Odonata', description: 'Havadaki manevra yeteneği çok yüksek, su kenarı böceği.', type: 'Insect', diet: 'Carnivore', habitat: 'Wetlands, rivers, ponds', titles: ['Dragonfly'] },
  { id: 'ladybug', name: 'Uğur Böceği', scientificName: 'Coccinellidae', description: 'Afidleri yiyerek bitkilere yardım eden sevimli böcek.', type: 'Insect', diet: 'Carnivore', habitat: 'Gardens, fields, forests', titles: ['Ladybird', 'Ladybug'] },
  { id: 'grasshopper', name: 'Çekirge', scientificName: 'Caelifera', description: 'Güçlü arka bacaklarıyla sıçrayan otçul böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Grasslands, fields', titles: ['Grasshopper'] },
  { id: 'cockroach', name: 'Hamam Böceği', scientificName: 'Blattodea', description: 'Dayanıklılığıyla ünlü, gece aktif bir şehir böceği.', type: 'Insect', diet: 'Omnivore', habitat: 'Urban areas, kitchens, sewers', titles: ['Cockroach'] },
  { id: 'praying-mantis', name: 'Peygamber Devesi', scientificName: 'Mantodea', description: 'Yırtıcı ön bacaklarıyla dikkat çeken avcı böcek.', type: 'Insect', diet: 'Carnivore', habitat: 'Gardens, grasslands, shrubs', titles: ['Praying mantis', 'Mantis', 'Mantis religiosa'] },
  { id: 'housefly', name: 'Karasinek', scientificName: 'Musca domestica', description: 'İnsan çevresinde sık görülen, hızlı çoğalan sinek.', type: 'Insect', diet: 'Omnivore', habitat: 'Urban areas, farms', titles: ['Housefly'] },
  { id: 'mosquito', name: 'Sivrisinek', scientificName: 'Culicidae', description: 'Isırıklarıyla bilinen, kan emen küçük uçucu böcek.', type: 'Insect', diet: 'Nectar/ blood', habitat: 'Wetlands, cities, forests', titles: ['Mosquito'] },
  { id: 'firefly', name: 'Ateş Böceği', scientificName: 'Lampyridae', description: 'Gece parlayan biyolüminesans böcek.', type: 'Insect', diet: 'Omnivore', habitat: 'Fields, forests, gardens', titles: ['Firefly'] },
  { id: 'cicada', name: 'Ağustos Böceği', scientificName: 'Cicadidae', description: 'Yazın yüksek sesle öten, ağaçlarda yaşayan böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Forests, parks, orchards', titles: ['Cicada'] },
  { id: 'termite', name: 'Termit', scientificName: 'Isoptera', description: 'Odun tüketen ve büyük koloniler kuran böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Soil, wood, tropical forests', titles: ['Termite'] },
  { id: 'stag-beetle', name: 'Geyik Böceği', scientificName: 'Lucanidae', description: 'Büyük çeneleriyle tanınan dikkat çekici böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Forests, old wood, gardens', titles: ['Stag beetle'] },
  { id: 'dung-beetle', name: 'Bok Böceği', scientificName: 'Scarabaeinae', description: 'Hayvan gübresini kullanarak yaşam döngüsünü sürdüren böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Fields, savannas, farms', titles: ['Dung beetle', 'Scarab beetle'] },
  { id: 'wasp', name: 'Eşek Arısı', scientificName: 'Vespidae', description: 'Çoğu türü savunmacı olan ince yapılı sokucu böcek.', type: 'Insect', diet: 'Carnivore', habitat: 'Gardens, forests, urban areas', titles: ['Wasp'] },
  { id: 'moth', name: 'Güve', scientificName: 'Lepidoptera', description: 'Gece aktif olan, kelebek akrabası kanatlı böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Forests, gardens, homes', titles: ['Moth'] },
  { id: 'louse', name: 'Bit', scientificName: 'Phthiraptera', description: 'Konak üzerinde yaşayan, küçük parazit böcek.', type: 'Insect', diet: 'Parasitic', habitat: 'Hair, feathers, clothing', titles: ['Louse'] },
  { id: 'flea', name: 'Pire', scientificName: 'Siphonaptera', description: 'Sıçramada çok başarılı, kan emen küçük parazit.', type: 'Insect', diet: 'Parasitic', habitat: 'Animals, bedding, homes', titles: ['Flea'] },
  { id: 'bed-bug', name: 'Tahtakurusu', scientificName: 'Cimex lectularius', description: 'İnsan yaşam alanlarında görülen küçük kan emici böcek.', type: 'Insect', diet: 'Parasitic', habitat: 'Beds, furniture, homes', titles: ['Bed bug'] },
  { id: 'earwig', name: 'Kulağakaçan', scientificName: 'Dermaptera', description: 'Arka kısmındaki kıskaçlarla tanınan gece aktif böcek.', type: 'Insect', diet: 'Omnivore', habitat: 'Gardens, under stones, leaf litter', titles: ['Earwig'] },
  { id: 'water-beetle', name: 'Su Böceği', scientificName: 'Dytiscidae', description: 'Su altında avlanan, güçlü yüzücü böcek.', type: 'Insect', diet: 'Carnivore', habitat: 'Ponds, lakes, streams', titles: ['Water beetle'] },
  { id: 'silkworm', name: 'İpek Böceği', scientificName: 'Bombyx mori', description: 'İpek üretiminde kullanılan ünlü tırtıl.', type: 'Insect', diet: 'Herbivore', habitat: 'Mulberry farms, cultivation areas', titles: ['Silkworm'] },
  { id: 'bumblebee', name: 'Bambus Arısı', scientificName: 'Bombus', description: 'Kabarık gövdeli, güçlü tozlaştırıcı arı türü.', type: 'Insect', diet: 'Herbivore', habitat: 'Meadows, gardens, forests', titles: ['Bumblebee'] },
  { id: 'stick-insect', name: 'Yürüyen Dal', scientificName: 'Phasmatodea', description: 'Dalları taklit ederek kamufle olan böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Forests, shrubs', titles: ['Stick insect'] },
  { id: 'leaf-beetle', name: 'Yaprak Böceği', scientificName: 'Chrysomelidae', description: 'Bitkilerin yapraklarıyla beslenen renkli böcek grubu.', type: 'Insect', diet: 'Herbivore', habitat: 'Gardens, fields, forests', titles: ['Leaf beetle'] },
  { id: 'horsefly', name: 'At Sineği', scientificName: 'Tabanidae', description: 'Isırabilen iri bir sinek grubu.', type: 'Insect', diet: 'Blood-feeding', habitat: 'Fields, wetlands, forests', titles: ['Horsefly'] },
  { id: 'whitefly', name: 'Beyaz Sinek', scientificName: 'Aleyrodidae', description: 'Bitkilerde zarara yol açan küçük beyaz böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Gardens, greenhouses, fields', titles: ['Whitefly'] },
  { id: 'mealybug', name: 'Unbiti', scientificName: 'Pseudococcidae', description: 'Bitkilerde özsuyu emen küçük zararlı böcek.', type: 'Insect', diet: 'Herbivore', habitat: 'Plants, gardens, greenhouses', titles: ['Mealybug'] },
  { id: 'carpet-beetle', name: 'Çarşaf Böceği', scientificName: 'Dermestidae', description: 'Ev içinde kumaş ve liflerle ilişkilendirilen böcek grubu.', type: 'Insect', diet: 'Herbivore', habitat: 'Homes, fabrics, storage areas', titles: ['Carpet beetle'] },
];

async function writeCategory(exportName, specs, outFile) {
  const resolved = await resolveImages(specs);
  const content = renderAnimalFile(exportName, resolved);
  await fs.writeFile(outFile, content, 'utf8');
  console.log(`Wrote ${resolved.length} entries to ${outFile}`);
}

async function main() {
  await writeCategory('fish', fishSpecs, outputFiles.fish);
  await writeCategory('amphibians', amphibianSpecs, outputFiles.amphibians);
  await writeCategory('insects', insectSpecs, outputFiles.insects);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
