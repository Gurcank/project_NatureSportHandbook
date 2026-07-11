const fs = require('fs/promises');
const path = require('path');

const outputFile = path.join(__dirname, '..', 'src', 'data', 'birds.ts');

function b(id, name, scientificName, description, diet, habitat, titles) {
  return { id, name, scientificName, description, diet, habitat, titles };
}

const birdSpecs = [
  b('pigeon', 'Güvercin', 'Columba livia', 'Şehirlerde ve kırsalda sık görülen, yön bulma yeteneği güçlü bir kuş.', 'Omnivore', 'Cities, farms, cliffs', ['Pigeon', 'Rock dove']),
  b('sparrow', 'Serçe', 'Passer domesticus', 'İnsan yerleşimlerine uyum sağlamış küçük ve çevik bir ötücü.', 'Omnivore', 'Cities, gardens, farms', ['House sparrow']),
  b('crow', 'Karga', 'Corvus corone', 'Zekası ve problem çözme becerileriyle tanınan sosyal bir kuş.', 'Omnivore', 'Forests, cities, fields', ['Crow', 'Carrion crow']),
  b('seagull', 'Martı', 'Larus argentatus', 'Kıyı şeritlerinde ve limanlarda yaşayan fırsatçı bir deniz kuşu.', 'Omnivore', 'Coasts, harbors, beaches', ['Seagull', 'Herring gull']),
  b('eagle', 'Kartal', 'Aquila chrysaetos', 'Geniş kanat açıklığıyla yüksekten avlanan güçlü bir yırtıcı.', 'Carnivore', 'Mountains, forests, cliffs', ['Eagle', 'Golden eagle']),
  b('hawk', 'Şahin', 'Buteo buteo', 'Keskin görüşü ve hızlı manevralarıyla bilinen avcı kuş.', 'Carnivore', 'Open woodlands, fields', ['Hawk', 'Common buzzard']),
  b('owl', 'Baykuş', 'Strigiformes', 'Gece avlanan, sessiz uçuşu ve büyük gözleriyle tanınan yırtıcı.', 'Carnivore', 'Forests, parks, rural areas', ['Owl']),
  b('swallow', 'Kırlangıç', 'Hirundo rustica', 'Uçuşta son derece çevik, yaz aylarında böcek avlayan göçmen kuş.', 'Insectivore', 'Fields, villages, wetlands', ['Swallow', 'Barn swallow']),
  b('stork', 'Leylek', 'Ciconia ciconia', 'Uzun bacaklı, sulak alanlarda beslenen ve göç eden zarif bir kuş.', 'Carnivore', 'Wetlands, meadows, farmlands', ['Stork', 'White stork']),
  b('flamingo', 'Flamingo', 'Phoenicopterus roseus', 'Sığ sularda filtre beslenen pembe renkli zarif kuş.', 'Omnivore', 'Salt lakes, lagoons, wetlands', ['Flamingo', 'Greater flamingo']),
  b('swan', 'Kuğu', 'Cygnus olor', 'Uzun boynu ve sakin görünüşüyle tanınan su kuşu.', 'Herbivore', 'Lakes, ponds, rivers', ['Swan', 'Mute swan']),
  b('duck', 'Ördek', 'Anas platyrhynchos', 'Göl ve sulak alanlarda yaşayan, yüzmeye uyumlu bir su kuşu.', 'Omnivore', 'Lakes, ponds, wetlands', ['Duck', 'Mallard']),
  b('goose', 'Kaz', 'Anser anser', 'Sürü halinde yaşayan, güçlü sesli ve dayanıklı su kuşu.', 'Herbivore', 'Wetlands, lakes, grasslands', ['Goose', 'Greylag goose']),
  b('chicken', 'Tavuk', 'Gallus gallus domesticus', 'Evcilleştirilmiş, yumurta ve et üretiminde yaygın bir kümes hayvanı.', 'Omnivore', 'Farms, backyards, coops', ['Chicken']),
  b('rooster', 'Horoz', 'Gallus gallus domesticus', 'Kümesin koruyucusu olarak bilinen, sabah ötüşüyle tanınan erkek tavuk.', 'Omnivore', 'Farms, backyards, coops', ['Rooster']),
  b('turkey', 'Hindi', 'Meleagris gallopavo', 'Büyük gövdeli, evcilleştirilmiş bir yer kuşu.', 'Omnivore', 'Farms, woodlands', ['Turkey', 'Wild turkey']),
  b('parrot', 'Papağan', 'Psittaciformes', 'Taklit yeteneği yüksek, renkli ve zeki bir kuş.', 'Herbivore', 'Tropical forests', ['Parrot']),
  b('budgerigar', 'Muhabbet Kuşu', 'Melopsittacus undulatus', 'Küçük, sosyal ve insan seslerini taklit edebilen popüler kafes kuşu.', 'Herbivore', 'Grasslands, open woodlands, homes', ['Budgerigar', 'Parakeet']),
  b('canary', 'Kanarya', 'Serinus canaria', 'Güzel ötüşüyle bilinen küçük ve canlı renkli bir ötücü.', 'Herbivore', 'Forests, gardens, cages', ['Canary']),
  b('nightingale', 'Bülbül', 'Luscinia megarhynchos', 'Özellikle ötüşüyle ün kazanmış zarif bir kuş.', 'Omnivore', 'Shrublands, woodlands, gardens', ['Nightingale']),
  b('goldfinch', 'Saka Kuşu', 'Carduelis carduelis', 'Renkli tüyleri ve tohumlarla beslenmesiyle bilinen ötücü.', 'Herbivore', 'Fields, orchards, gardens', ['European goldfinch']),
  b('finch', 'İspinoz', 'Fringilla coelebs', 'Tohum ağırlıklı beslenen küçük bir ötücü kuş.', 'Herbivore', 'Forests, gardens, parks', ['Chaffinch']),
  b('great-tit', 'Baştankara', 'Parus major', 'Ağaçlık alanlarda yaşayan, çevik ve meraklı küçük kuş.', 'Omnivore', 'Forests, gardens, parks', ['Great tit']),
  b('starling', 'Sığırcık', 'Sturnus vulgaris', 'Sürü halinde hareket eden, parlak tüyleriyle bilinen sosyal bir kuş.', 'Omnivore', 'Fields, cities, farms', ['Starling', 'Common starling']),
  b('blackbird', 'Karatavuk', 'Turdus merula', 'Koyu renkli, şehir ve ormanlarda yaşayan ötücü.', 'Omnivore', 'Forests, gardens, parks', ['Common blackbird']),
  b('woodpecker', 'Ağaçkakan', 'Dendrocopos major', 'Ağaç gövdelerini gagasıyla oyarak böcek arayan kuş.', 'Insectivore', 'Forests, parks, orchards', ['Great spotted woodpecker']),
  b('cuckoo', 'Guguk Kuşu', 'Cuculus canorus', 'Yumurtasını başka kuşların yuvalarına bırakmasıyla bilinir.', 'Insectivore', 'Forests, meadows, woodland edges', ['Common cuckoo']),
  b('dove', 'Kumru', 'Streptopelia decaocto', 'Yumuşak ötüşlü, insan yerleşimlerine uyumlu bir güvercin akrabası.', 'Herbivore', 'Cities, parks, farms', ['Eurasian collared dove']),
  b('turtle-dove', 'Üveyik', 'Streptopelia turtur', 'Açık alanlarda yaşayan, ince yapılı göçmen bir kumru türü.', 'Herbivore', 'Woodlands, farmlands, scrublands', ['European turtle dove']),
  b('falcon', 'Doğan', 'Falco peregrinus', 'Yüksekten dalış yaparak avlanan son derece hızlı bir yırtıcı.', 'Carnivore', 'Cliffs, coasts, cities', ['Peregrine falcon']),
  b('goshawk', 'Atmaca', 'Accipiter gentilis', 'Ormanlık alanlarda küçük kuşları avlayan çevik bir yırtıcı.', 'Carnivore', 'Forests, woodlands', ['Northern goshawk']),
  b('vulture', 'Akbaba', 'Gyps fulvus', 'Leşçil beslenen, geniş kanatlı büyük bir yırtıcı.', 'Carnivore', 'Mountains, open plains, cliffs', ['Vulture', 'Griffon vulture']),
  b('eagle-owl', 'Puhu', 'Bubo bubo', 'Geceleri avlanan büyük bir baykuş türü.', 'Carnivore', 'Cliffs, forests, rocky areas', ['Eurasian eagle-owl']),
  b('peacock', 'Tavus Kuşu', 'Pavo cristatus', 'Erkeğinin gösterişli kuyruk tüyleriyle ünlü kuş.', 'Omnivore', 'Forests, gardens, farms', ['Peacock', 'Indian peafowl']),
  b('pheasant', 'Sülün', 'Phasianus colchicus', 'Renkli tüyleriyle bilinen yer kuşu.', 'Omnivore', 'Fields, farmlands, woodland edges', ['Pheasant']),
  b('partridge', 'Keklik', 'Perdix perdix', 'Açık arazilerde yaşayan, yere yakın uçan bir av kuşu.', 'Omnivore', 'Fields, scrublands, hills', ['Partridge', 'Grey partridge']),
  b('quail', 'Bıldırcın', 'Coturnix coturnix', 'Küçük gövdeli, yerde saklanmayı seven bir kuş.', 'Omnivore', 'Grasslands, fields, farmland', ['Quail', 'Common quail']),
  b('crane', 'Turna', 'Grus grus', 'Uzun bacaklı, zarif yürüyüşü ve göçüyle bilinen kuş.', 'Omnivore', 'Wetlands, marshes, meadows', ['Crane', 'Common crane']),
  b('pelican', 'Pelikan', 'Pelecanus onocrotalus', 'Büyük gaga kesesiyle balık yakalayan su kuşu.', 'Carnivore', 'Coasts, lakes, wetlands', ['Pelican', 'Great white pelican']),
  b('heron', 'Balıkçıl', 'Ardea cinerea', 'Sığ sularda sabırla avlanan uzun bacaklı kuş.', 'Carnivore', 'Wetlands, lakes, rivers', ['Heron', 'Grey heron']),
  b('cormorant', 'Karabatak', 'Phalacrocorax carbo', 'Balık avlamak için derin dalış yapan su kuşu.', 'Carnivore', 'Coasts, lakes, rivers', ['Cormorant', 'Great cormorant']),
  b('albatross', 'Albatros', 'Diomedea exulans', 'Okyanus üzerinde uzun süre süzülebilen deniz kuşu.', 'Carnivore', 'Open oceans, islands', ['Albatross', 'Wandering albatross']),
  b('penguin', 'Penguen', 'Aptenodytes forsteri', 'Uçamayan ama mükemmel yüzen kutup kuşu.', 'Carnivore', 'Antarctic coasts, cold seas', ['Penguin', 'Emperor penguin']),
  b('ostrich', 'Deve Kuşu', 'Struthio camelus', 'Dünyanın en büyük ve en hızlı koşan kuşu.', 'Omnivore', 'Savannas, deserts, grasslands', ['Ostrich']),
  b('hummingbird', 'Sinek Kuşu', 'Trochilidae', 'Kanatlarını çok hızlı çırpan, havada asılı kalabilen küçük kuş.', 'Nectarivore', 'Gardens, forests, tropical areas', ['Hummingbird']),
  b('kingfisher', 'Yalıçapkını', 'Alcedo atthis', 'Parlak renkli, su kenarında dalarak avlanan kuş.', 'Carnivore', 'Rivers, lakes, wetlands', ['Kingfisher', 'Common kingfisher']),
  b('hoopoe', 'İbibik', 'Upupa epops', 'Tepesindeki ibik ve uzun gagasıyla dikkat çeken kuş.', 'Insectivore', 'Open woodlands, orchards, grasslands', ['Hoopoe']),
  b('magpie', 'Saksağan', 'Pica pica', 'Siyah-beyaz tüyleri ve parlak nesnelere ilgisiyle bilinir.', 'Omnivore', 'Fields, cities, gardens', ['Magpie', 'Eurasian magpie']),
  b('raven', 'Kuzgun', 'Corvus corax', 'Büyük yapılı, zeki ve siyah renkli bir kargagil.', 'Omnivore', 'Mountains, forests, coasts', ['Raven', 'Common raven']),
  b('swift', 'Ebabil', 'Apus apus', 'Havadaki ustalığıyla neredeyse hiç yere inmeyen kuş.', 'Insectivore', 'Cities, cliffs, open skies', ['Swift', 'Common swift']),
  b('northern-bald-ibis', 'Kelaynak', 'Geronticus eremita', 'Nesli tehlike altında olan, tüysüz başlı uzun gagalı bir ibis.', 'Carnivore', 'Cliffs, steppes, wetlands', ['Northern bald ibis']),
  b('toucan', 'Tukan', 'Ramphastos toco', 'Devasa renkli gagasıyla tropik ormanların ikonik kuşu.', 'Omnivore', 'Tropical rainforests', ['Toucan', 'Toco toucan']),
  b('cockatoo', 'Kakadu', 'Cacatuidae', 'Tepeli, sosyal ve zeki papağan türü.', 'Herbivore', 'Forests, woodlands, savannas', ['Cockatoo']),
  b('macaw', 'Makav', 'Ara macao', 'Parlak renkleri ve güçlü gagasıyla bilinen büyük papağan.', 'Herbivore', 'Tropical rainforests', ['Macaw', 'Scarlet macaw']),
  b('bee-eater', 'Arı Kuşu', 'Merops apiaster', 'Renkli tüyleriyle arı ve böcek avlayan zarif kuş.', 'Insectivore', 'Open fields, riverbanks, steppes', ['Bee-eater', 'European bee-eater']),
  b('lovebird', 'Cennet Papağanı', 'Agapornis roseicollis', 'Sıcak bölgelerde yaşayan, çiftler halinde yaşayan küçük papağan.', 'Herbivore', 'Savannas, woodlands, scrublands', ['Lovebird']),
  b('kiwi', 'Kivi', 'Apteryx australis', 'Uçamayan, gece aktif ve Yeni Zelanda’ya özgü kuş.', 'Omnivore', 'Forests, scrublands', ['Kiwi']),
  b('emu', 'Emü', 'Dromaius novaehollandiae', 'Avustralya’ya özgü, uçamayan büyük koşucu kuş.', 'Omnivore', 'Grasslands, open woodlands', ['Emu']),
  b('kite', 'Çaylak', 'Milvus milvus', 'Termiklerde süzülerek uçan, fırsatçı bir yırtıcı.', 'Carnivore', 'Open fields, woodlands, wetlands', ['Kite', 'Red kite']),
  b('little-owl', 'Kukumav', 'Athene noctua', 'Küçük boyutlu, gece avlanan bir baykuş.', 'Carnivore', 'Farmlands, ruins, open woodlands', ['Little owl']),
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

async function resolveImages() {
  const allTitles = [...new Set(birdSpecs.flatMap((bird) => bird.titles))];
  const wikiByTitle = await fetchWikipediaThumbnails(allTitles);

  const resolved = {};
  for (const bird of birdSpecs) {
    let image = null;
    for (const title of bird.titles) {
      if (wikiByTitle[title]) {
        image = wikiByTitle[title];
        break;
      }
    }

    if (!image) {
      const fallbackQuery = encodeURIComponent(bird.name);
      image = `https://source.unsplash.com/900x600/?${fallbackQuery}`;
    }

    resolved[bird.id] = image;
  }

  return resolved;
}

async function main() {
  const resolvedImages = await resolveImages();

  const entries = birdSpecs.map((bird) => ({
    id: bird.id,
    name: bird.name,
    scientificName: bird.scientificName,
    description: bird.description,
    image: resolvedImages[bird.id],
    climate: [],
    region: [],
    type: 'Bird',
    diet: bird.diet,
    habitat: bird.habitat,
  }));

  const lines = [];
  lines.push("import type { Animal } from '@/types';");
  lines.push('');
  lines.push('export const birds: Animal[] = [');

  for (const entry of entries) {
    lines.push('  {');
    lines.push(`    id: '${escapeTs(entry.id)}',`);
    lines.push(`    name: '${escapeTs(entry.name)}',`);
    lines.push(`    scientificName: '${escapeTs(entry.scientificName)}',`);
    lines.push(`    description: '${escapeTs(entry.description)}',`);
    lines.push(`    image: '${escapeTs(entry.image)}',`);
    lines.push('    climate: [],');
    lines.push('    region: [],');
    lines.push("    type: 'Bird',");
    lines.push(`    diet: '${escapeTs(entry.diet)}',`);
    lines.push(`    habitat: '${escapeTs(entry.habitat)}'`);
    lines.push('  },');
  }

  lines.push('];');
  lines.push('');
  lines.push('export default birds;');
  lines.push('');

  await fs.writeFile(outputFile, lines.join('\n'), 'utf8');
  console.log(`Wrote ${entries.length} birds to ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});