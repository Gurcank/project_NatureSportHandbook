#!/usr/bin/env node

/**
 * Unsplash API kullanarak tüm memeliler için uygun fotoğraf URL'leri üretelim
 * Bu script, her memeli hayvanı için Unsplash'ten en iyi fotoğrafı seçer
 */

const fs = require('fs');
const path = require('path');

// Hayvanlar ve Unsplash'te arama terimleri
const animalMapping = {
  'lion': 'lion wildlife',
  'tiger': 'tiger animal',
  'leopard': 'leopard big cat',
  'cheetah': 'cheetah running',
  'jaguar': 'jaguar animal',
  'cat': 'domestic cat',
  'dog': 'dog pet',
  'wolf': 'gray wolf pack',
  'fox': 'red fox',
  'jackal': 'jackal wild',
  'hyena': 'hyena africa',
  'brown-bear': 'brown bear forest',
  'polar-bear': 'polar bear arctic',
  'panda': 'giant panda bamboo',
  'elephant': 'african elephant',
  'rhinoceros': 'rhinoceros animal',
  'hippopotamus': 'hippopotamus water',
  'giraffe': 'giraffe neck',
  'zebra': 'zebra stripes',
  'horse': 'horse running',
  'donkey': 'donkey farm',
  'cow': 'dairy cow',
  'sheep': 'sheep farm',
  'goat': 'goat animal',
  'pig': 'pig farm',
  'wild-boar': 'wild boar tusks',
  'camel': 'camel desert',
  'llama': 'llama animal',
  'alpaca': 'alpaca wool',
  'deer': 'red deer forest',
  'roe-deer': 'roe deer small',
  'reindeer': 'reindeer arctic',
  'moose': 'moose antlers',
  'gazelle': 'gazelle africa',
  'antelope': 'antelope running',
  'buffalo': 'buffalo africa',
  'bison': 'bison prairie',
  'rabbit': 'rabbit wild',
  'squirrel': 'squirrel tree',
  'beaver': 'beaver dam',
  'mouse': 'house mouse',
  'rat': 'brown rat',
  'hamster': 'hamster pet',
  'hedgehog': 'hedgehog animal',
  'mole': 'mole digging',
  'bat': 'bat night flight',
  'chimpanzee': 'chimpanzee primate',
  'gorilla': 'gorilla silverback',
  'orangutan': 'orangutan rainforest',
  'baboon': 'baboon troop',
  'lemur': 'lemur madagascar',
  'dolphin': 'dolphin ocean',
  'blue-whale': 'blue whale ocean',
  'orca': 'orca whale',
  'humpback-whale': 'humpback whale',
  'seal': 'seal marine',
  'sea-lion': 'sea lion beach',
  'walrus': 'walrus arctic',
  'otter': 'river otter swimming',
  'manatee': 'manatee marine',
  'kangaroo': 'kangaroo hopping',
  'koala': 'koala eucalyptus',
  'sloth': 'sloth tree hanging',
  'anteater': 'anteater insect',
  'armadillo': 'armadillo animal',
  'raccoon': 'raccoon mask',
  'meerkat': 'meerkat standing',
  'ocelot': 'ocelot wild cat',
  'badger': 'badger burrow',
  'porcupine': 'porcupine quills',
  'skunk': 'skunk animal',
  'tasmanian-devil': 'tasmanian devil'
};

// Unsplash API'sini kullanarak image URL'si üretelim
function generateUnsplashUrl(animalId, searchQuery) {
  // Unsplash'ten doğrudan URL endpoint'i kullanıyoruz (API key gerektirmez, temel kullanım için)
  // Format: https://source.unsplash.com/900x600/?query
  
  // Daha iyi bir seçenek: Unsplash API'nin public JSON endpoint'i
  // const encodedQuery = encodeURIComponent(searchQuery);
  // return `https://api.unsplash.com/search/photos?query=${encodedQuery}&count=1&client_id=YOUR_CLIENT_ID`
  
  // Alternativ: Unsplash Source API (no authentication needed)
  const encodedQuery = encodeURIComponent(searchQuery);
  return `https://source.unsplash.com/900x600/?${encodedQuery}`;
}

// Mapping dosyasını oluşturalım
function createMapping() {
  const mapping = {};
  
  for (const [animalId, searchQuery] of Object.entries(animalMapping)) {
    mapping[animalId] = generateUnsplashUrl(animalId, searchQuery);
  }
  
  return mapping;
}

// Yazalım
const mapping = createMapping();
const outputPath = path.join(__dirname, 'mapping.mammals-unsplash.json');

fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2), 'utf-8');
console.log(`✅ Unsplash mapping oluşturuldu: ${outputPath}`);
console.log(`📊 Toplam: ${Object.keys(mapping).length} hayvan`);
console.log('\n🔗 Örnek URL:');
console.log(mapping.lion);
