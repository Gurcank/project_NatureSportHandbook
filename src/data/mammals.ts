import type { Language } from '@/context/SettingsContext';

export type MammalEntry = {
  id: string;
  name: Record<Language, string>;
  scientificName: string;
  description: Record<Language, string>;
  diet: string;
  habitat: string;
  image: string;
};

const mammals: MammalEntry[] = [
  {
    id: 'cheetah',
    name: { tr: 'Çita', en: 'Cheetah' },
    scientificName: 'Acinonyx jubatus',
    description: {
      tr: 'Dünyanın en hızlı karasal hayvanı, 120 km/s hıza kadar ulaşabilir.',
      en: 'The fastest land animal on Earth, capable of speeds exceeding 70 mph.',
    },
    diet: 'Carnivore',
    habitat: 'Savannas, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Male_cheetah_facing_left_in_South_Africa.jpg/1280px-Male_cheetah_facing_left_in_South_Africa.jpg'
  },

  {
    id: 'panda',
    name: { tr: 'Panda', en: 'Giant Panda' },
    scientificName: 'Ailuropoda melanoleuca',
    description: {
      tr: 'Bambunun %99\'unu yiyen, dünyada yalnızca 1000 kadarı yaşayan nesli tehlike altında bir ayı.',
      en: 'An endangered bear species that feeds almost exclusively on bamboo.',
    },
    diet: 'Herbivore',
    habitat: 'Bamboo forests, mountains',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1280px-Grosser_Panda.JPG'
  },

  {
    id: 'moose',
    name: { tr: 'Sığın', en: 'Moose' },
    scientificName: 'Alces alces',
    description: {
      tr: 'Uzun bacakları ve geniş boynuzlarıyla kuzey ormanlarının dev otçulu.',
      en: 'A towering herbivore of northern forests with broad antlers and long legs.',
    },
    diet: 'Herbivore',
    habitat: 'Boreal forests, wetlands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Alaska_moose.jpg/1280px-Alaska_moose.jpg'
  },

  {
    id: 'antelope',
    name: { tr: 'Antilop', en: 'Antelope' },
    scientificName: 'Antilopinae',
    description: {
      tr: 'Çeşitli türleri olan, Afrika ve Asya\'da yaşayan, hızlı otçullar.',
      en: 'A diverse group of fast, graceful herbivores found across Africa and Asia.',
    },
    diet: 'Herbivore',
    habitat: 'Savannas, grasslands, forests',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Blackbuck_male_female.jpg'
  },

  {
    id: 'blue-whale',
    name: { tr: 'Mavi Balina', en: 'Blue Whale' },
    scientificName: 'Balaenoptera musculus',
    description: {
      tr: 'Dünyanın en büyük memelisi ve insanlar tarafından bilinen en büyük hayvan.',
      en: 'The largest animal ever known to have existed on Earth.',
    },
    diet: 'Herbivore',
    habitat: 'Oceans',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg/1280px-Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg'
  },

  {
    id: 'bison',
    name: { tr: 'Bizon', en: 'Bison' },
    scientificName: 'Bison bison',
    description: {
      tr: 'Kuzey Amerika\'nın en büyük hayvanı, kalın kürküyle kış soğuklarına dayanıklı.',
      en: 'North America\'s largest land animal, built for harsh winters.',
    },
    diet: 'Herbivore',
    habitat: 'Grasslands, prairies',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/American_bison_k5680-1.jpg/1280px-American_bison_k5680-1.jpg'
  },

  {
    id: 'cow',
    name: { tr: 'İnek', en: 'Cow' },
    scientificName: 'Bos taurus',
    description: {
      tr: 'İnsanlar tarafından evcilleştirilen, süt ve et üretiminde önemli hayvan.',
      en: 'A domesticated bovine essential for dairy and meat production worldwide.',
    },
    diet: 'Herbivore',
    habitat: 'Pastures, farmland',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg/1280px-Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg'
  },

  {
    id: 'sloth',
    name: { tr: 'Tembel Hayvan', en: 'Sloth' },
    scientificName: 'Bradypus tridactylus',
    description: {
      tr: 'Ağaçlarda yavaş hareket eden, enerji tasarrufu yapan Güney Amerika\'nın memelisi.',
      en: 'A slow-moving South American mammal that conserves energy through inactivity.',
    },
    diet: 'Herbivore',
    habitat: 'Tropical rainforests',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bicho-pregui%C3%A7a_3.jpg/1280px-Bicho-pregui%C3%A7a_3.jpg'
  },

  {
    id: 'camel',
    name: { tr: 'Deve', en: 'Camel' },
    scientificName: 'Camelus dromedarius',
    description: {
      tr: 'Çöl ortamına mükemmel şekilde uyarlanmış, sırtında yağ depolayan hayvan.',
      en: 'A desert-adapted mammal capable of surviving weeks without water.',
    },
    diet: 'Herbivore',
    habitat: 'Deserts, arid regions',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg/1280px-07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg'
  },

  {
    id: 'jackal',
    name: { tr: 'Çakal', en: 'Jackal' },
    scientificName: 'Canis aureus',
    description: {
      tr: 'Afrika ve Asya\'nın çoğu bölgesinde yaşayan, çok uyarlanabilir bir hayvan.',
      en: 'An adaptable scavenger and hunter found across Africa and Asia.',
    },
    diet: 'Omnivore',
    habitat: 'Savannas, grasslands, scrublands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/033_Golden_jackal_in_Keoladeo_National_Park_Photo_by_Giles_Laurent.jpg/1280px-033_Golden_jackal_in_Keoladeo_National_Park_Photo_by_Giles_Laurent.jpg'
  },

  {
    id: 'wolf',
    name: { tr: 'Kurt', en: 'Gray Wolf' },
    scientificName: 'Canis lupus',
    description: {
      tr: 'Sürü halinde yaşayan, zeki ve dayanıklı bir yırtıcı tür.',
      en: 'A highly social predator that lives and hunts in packs.',
    },
    diet: 'Carnivore',
    habitat: 'Forests, tundra, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Eurasian_wolf_2.jpg/1280px-Eurasian_wolf_2.jpg'
  },

  {
    id: 'dog',
    name: { tr: 'Köpek', en: 'Dog' },
    scientificName: 'Canis lupus familiaris',
    description: {
      tr: 'İnsanların en sadık arkadaşı, evcil hayvan olarak sevilen bir memeli.',
      en: 'Man\'s best friend, a loyal domesticated mammal valued worldwide.',
    },
    diet: 'Omnivore',
    habitat: 'Urban, rural areas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/1280px-Huskiesatrest.jpg'
  },

  {
    id: 'goat',
    name: { tr: 'Keçi', en: 'Goat' },
    scientificName: 'Capra hircus',
    description: {
      tr: 'Çevre dostu, kolay bakılan ve yetenekli tırmanıcı bir evcil hayvan.',
      en: 'An adaptable domesticated animal known for climbing and agility.',
    },
    diet: 'Herbivore',
    habitat: 'Grasslands, mountains, farms',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hausziege_04.jpg/1280px-Hausziege_04.jpg'
  },

  {
    id: 'roe-deer',
    name: { tr: 'Karaca', en: 'Roe Deer' },
    scientificName: 'Capreolus capreolus',
    description: {
      tr: 'Orta Avrupa\'da yaşayan, geyikten daha küçük zarif bir hayvan.',
      en: 'A smaller, delicate deer species found across Europe.',
    },
    diet: 'Herbivore',
    habitat: 'Forests, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Roe_deer_%28Capreolus_capreolus%29_young_male_Cumnor.jpg/1280px-Roe_deer_%28Capreolus_capreolus%29_young_male_Cumnor.jpg'
  },

  {
    id: 'beaver',
    name: { tr: 'Kunduz', en: 'Beaver' },
    scientificName: 'Castor fiber',
    description: {
      tr: 'Su kenarlarında baraj kuran ve ekosistemi dönüştüren çalışkan memeli.',
      en: 'A hardworking dam-building mammal that reshapes waterways.',
    },
    diet: 'Herbivore',
    habitat: 'Rivers, wetlands, lakes',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/American_Beaver.jpg'
  },

  {
    id: 'deer',
    name: { tr: 'Geyik', en: 'Deer' },
    scientificName: 'Cervus elaphus',
    description: {
      tr: 'Geniş ormanlarda ve açık arazilerde görülen, zarif ve hızlı bir otçul.',
      en: 'An elegant herbivore with impressive antlers, seen in forests and meadows.',
    },
    diet: 'Herbivore',
    habitat: 'Forests, grasslands, meadows',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cervus_elaphus_Luc_Viatour_6.jpg/1280px-Cervus_elaphus_Luc_Viatour_6.jpg'
  },

  {
    id: 'bat',
    name: { tr: 'Yarasa', en: 'Bat' },
    scientificName: 'Chiroptera',
    description: {
      tr: 'Ekolokasyonla yön bulan, gece uçuşuna uyum sağlamış tek memeli grubu.',
      en: 'The only mammal group capable of true flight, using echolocation at night.',
    },
    diet: 'Insectivore/Frugivore',
    habitat: 'Caves, forests, urban areas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Big-eared-townsend-fledermaus.jpg'
  },

  {
    id: 'hyena',
    name: { tr: 'Sırtlan', en: 'Hyena' },
    scientificName: 'Crocuta crocuta',
    description: {
      tr: 'Güçlü çeneleriyle bilinen, iş birliğiyle avlayan sosyal bir yırtıcı.',
      en: 'A powerful predator with the strongest bite of any land carnivore.',
    },
    diet: 'Carnivore',
    habitat: 'Savannas, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Spotted_hyena_%28Crocuta_crocuta%29.jpg/1280px-Spotted_hyena_%28Crocuta_crocuta%29.jpg'
  },

  {
    id: 'armadillo',
    name: { tr: 'Armadillo', en: 'Armadillo' },
    scientificName: 'Dasypus novemcinctus',
    description: {
      tr: 'Zırh gibi plakalarla örtülü, toprak kazıcı Güney Amerika memelisi.',
      en: 'A South American mammal covered in protective bony plates.',
    },
    diet: 'Insectivore',
    habitat: 'Grasslands, forests, deserts',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Nine-banded_Armadillo.jpg/1280px-Nine-banded_Armadillo.jpg'
  },

  {
    id: 'dolphin',
    name: { tr: 'Yunus', en: 'Dolphin' },
    scientificName: 'Delphinus delphis',
    description: {
      tr: 'Zekası yüksek, sosyal yaşayan ve sesten konuşan deniz memelisi.',
      en: 'An intelligent and social marine mammal known for its communication skills.',
    },
    diet: 'Carnivore',
    habitat: 'Oceans, coastal waters',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Tursiops_truncatus_01-cropped.jpg/1280px-Tursiops_truncatus_01-cropped.jpg'
  },

  {
    id: 'donkey',
    name: { tr: 'Eşek', en: 'Donkey' },
    scientificName: 'Equus africanus asinus',
    description: {
      tr: 'Atın yakın akrabası, daha küçük ve dayanıklı, taşımacılıkta kullanılan hayvan.',
      en: 'A hardy cousin of the horse, valued for its strength and resilience.',
    },
    diet: 'Herbivore',
    habitat: 'Grasslands, semi-arid regions',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg'
  },

  {
    id: 'horse',
    name: { tr: 'At', en: 'Horse' },
    scientificName: 'Equus caballus',
    description: {
      tr: 'İnsanlar tarafından evcilleştirilen, hızlı ve dayanıklı bir hayvan.',
      en: 'A domesticated equine valued for riding, farming, and racing.',
    },
    diet: 'Herbivore',
    habitat: 'Grasslands, meadows, farms',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Horse_007.jpg/1280px-Horse_007.jpg'
  },

  {
    id: 'zebra',
    name: { tr: 'Zebra', en: 'Zebra' },
    scientificName: 'Equus quagga',
    description: {
      tr: 'Benzersiz siyah-beyaz çizgileriyle tanınan, sürü halinde yaşayan otçul.',
      en: 'A striped herbivore living in herds across African savannas.',
    },
    diet: 'Herbivore',
    habitat: 'Savannas, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Plains_Zebra_Equus_quagga_cropped.jpg'
  },

  {
    id: 'hedgehog',
    name: { tr: 'Kirpi', en: 'Hedgehog' },
    scientificName: 'Erinaceus europaeus',
    description: {
      tr: 'Gece aktif olan, küçük böceklerle beslenen, vücudu dikenli bir memeli.',
      en: 'A small nocturnal mammal covered in protective spines.',
    },
    diet: 'Insectivore',
    habitat: 'Forests, grasslands, gardens',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Igel.JPG'
  },

  {
    id: 'cat',
    name: { tr: 'Kedi', en: 'Cat' },
    scientificName: 'Felis catus',
    description: {
      tr: 'İnsanlar tarafından evcilleştirilen, bağımsız ve zekası yüksek bir hayvan.',
      en: 'A domesticated companion known for its independence and agility.',
    },
    diet: 'Carnivore',
    habitat: 'Urban, rural areas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1280px-Cat_August_2010-4.jpg'
  },

  {
    id: 'giraffe',
    name: { tr: 'Zürafa', en: 'Giraffe' },
    scientificName: 'Giraffa camelopardalis',
    description: {
      tr: 'Dünyanın en uzun memelisi, yüksek ağaçların yapraklarını yemek için uyarlanmış.',
      en: 'The world\'s tallest mammal, adapted to reach leaves high in trees.',
    },
    diet: 'Herbivore',
    habitat: 'Savannas, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/1280px-Giraffe_Mikumi_National_Park.jpg'
  },

  {
    id: 'gorilla',
    name: { tr: 'Goril', en: 'Gorilla' },
    scientificName: 'Gorilla gorilla',
    description: {
      tr: 'Dünyanın en büyük maymunu, göz korkutucu görünüşüne rağmen barışçıl bir hayvan.',
      en: 'The world\'s largest primate, surprisingly gentle despite its size.',
    },
    diet: 'Herbivore',
    habitat: 'Tropical rainforests, mountains',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg/1280px-Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg'
  },

  {
    id: 'hippopotamus',
    name: { tr: 'Hipopotam', en: 'Hippopotamus' },
    scientificName: 'Hippopotamus amphibius',
    description: {
      tr: 'Suya çok uyarlanmış, sürü halinde yaşayan büyük bir otçul.',
      en: 'A massive water-loving herbivore that spends most of its time in rivers.',
    },
    diet: 'Herbivore',
    habitat: 'Rivers, lakes, wetlands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Portrait_Hippopotamus_in_the_water.jpg/1280px-Portrait_Hippopotamus_in_the_water.jpg'
  },

  {
    id: 'porcupine',
    name: { tr: 'Gelincik', en: 'Porcupine' },
    scientificName: 'Hystrix cristata',
    description: {
      tr: 'Keskin dikenli bir kemici, kendini savunmada başarılı olan hayvan.',
      en: 'A spiky rodent covered in sharp quills used for defense.',
    },
    diet: 'Herbivore',
    habitat: 'Forests, grasslands, semi-arid regions',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Erethizon_dorsatum_-_Prince_Rupert.jpg/1280px-Erethizon_dorsatum_-_Prince_Rupert.jpg'
  },

  {
    id: 'llama',
    name: { tr: 'Lama', en: 'Llama' },
    scientificName: 'Lama glama',
    description: {
      tr: 'Andes Dağları\'ndan gelen, taşıyıcı hayvan olarak evcilleştirilen süre hayvanı.',
      en: 'An Andean camelid domesticated for centuries as a beast of burden.',
    },
    diet: 'Herbivore',
    habitat: 'Grasslands, mountains',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Llamas%2C_Vernagt-Stausee%2C_Italy.jpg/1280px-Llamas%2C_Vernagt-Stausee%2C_Italy.jpg'
  },

  {
    id: 'lemur',
    name: { tr: 'Lemur', en: 'Lemur' },
    scientificName: 'Lemur catta',
    description: {
      tr: 'Madagascar\'nın özgü maymunu, çizgili kuyrağı ve sosyal yapısıyla bilinen hayvan.',
      en: 'A Madagascar endemic primate known for its striped tail and social behavior.',
    },
    diet: 'Omnivore',
    habitat: 'Tropical and subtropical forests',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ring-tailed_lemur_%28Lemur_catta%29.jpg/1280px-Ring-tailed_lemur_%28Lemur_catta%29.jpg'
  },

  {
    id: 'ocelot',
    name: { tr: 'Vaşak', en: 'Ocelot' },
    scientificName: 'Leopardus pardalis',
    description: {
      tr: 'Benekli deseni ve çevik hareketleri ile Orta ve Güney Amerika\'nın kedisi.',
      en: 'A small spotted wild cat found in Central and South America.',
    },
    diet: 'Carnivore',
    habitat: 'Tropical forests, savannas, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/016_Ocelot_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg/1280px-016_Ocelot_in_Encontro_das_%C3%81guas_State_Park_Photo_by_Giles_Laurent.jpg'
  },

  {
    id: 'elephant',
    name: { tr: 'Fil', en: 'Elephant' },
    scientificName: 'Loxodonta africana',
    description: {
      tr: 'Dünyanın en büyük kara hayvanı, sosyal ve zeki yapısıyla bilinir.',
      en: 'The largest land animal on Earth, known for its intelligence and social bonds.',
    },
    diet: 'Herbivore',
    habitat: 'Savannas, forests, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/178_Male_African_bush_elephant_in_Etosha_National_Park_Photo_by_Giles_Laurent.jpg/1280px-178_Male_African_bush_elephant_in_Etosha_National_Park_Photo_by_Giles_Laurent.jpg'
  },

  {
    id: 'otter',
    name: { tr: 'Su Samuru', en: 'Otter' },
    scientificName: 'Lutra lutra',
    description: {
      tr: 'Su hayatına uyarlanmış, çok yaramaz ve sosyal davranışlı bir hayvan.',
      en: 'A playful and social mammal highly adapted to aquatic life.',
    },
    diet: 'Carnivore',
    habitat: 'Rivers, coastal waters, wetlands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Fischotter%2C_Lutra_Lutra.JPG'
  },

  {
    id: 'kangaroo',
    name: { tr: 'Kanguru', en: 'Kangaroo' },
    scientificName: 'Macropus rufus',
    description: {
      tr: 'Avustralya\'nın simgesi, güçlü arka bacakları ile çok hızlı ve verimli seği koşan hayvan.',
      en: 'Australia\'s iconic marsupial, capable of hopping at high speeds.',
    },
    diet: 'Herbivore',
    habitat: 'Grasslands, scrublands, savannas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Red_kangaroo_-_melbourne_zoo.jpg/1280px-Red_kangaroo_-_melbourne_zoo.jpg'
  },

  {
    id: 'humpback-whale',
    name: { tr: 'Kambur Balina', en: 'Humpback Whale' },
    scientificName: 'Megaptera novaeangliae',
    description: {
      tr: 'Uzun yüzgeçleri ve karmaşık şarkıları ile ünlü göçmen balina türü.',
      en: 'A migratory whale known for its long pectoral fins and complex songs.',
    },
    diet: 'Herbivore',
    habitat: 'Oceans worldwide',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Humpback_Whale_underwater_shot.jpg'
  },

  {
    id: 'badger',
    name: { tr: 'Porsuk', en: 'Badger' },
    scientificName: 'Meles meles',
    description: {
      tr: 'Toprak kazıp sıralarında yaşayan, gece aktif bir şiddetli hayvan.',
      en: 'A nocturnal burrowing mammal with a stocky build and fierce nature.',
    },
    diet: 'Omnivore',
    habitat: 'Forests, grasslands, gardens',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/M%C3%A4yr%C3%A4_%C3%84ht%C3%A4ri_4.jpg/1280px-M%C3%A4yr%C3%A4_%C3%84ht%C3%A4ri_4.jpg'
  },

  {
    id: 'skunk',
    name: { tr: 'Kokarca', en: 'Skunk' },
    scientificName: 'Mephitis mephitis',
    description: {
      tr: 'İşkin kokulu sıvı sıçratan, çevre dostu ve ince ayrıntıda cüretli hayvan.',
      en: 'A mammal famous for spraying a foul-smelling defensive liquid.',
    },
    diet: 'Omnivore',
    habitat: 'Forests, grasslands, urban areas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Skunk_about_to_spray.jpg/1280px-Skunk_about_to_spray.jpg'
  },

  {
    id: 'hamster',
    name: { tr: 'Hamster', en: 'Hamster' },
    scientificName: 'Mesocricetus auratus',
    description: {
      tr: 'Beslenme keselerinde yiyeceğini depolayan, yaygın olarak evcilleştirilen kemici.',
      en: 'A popular pet rodent known for storing food in its cheek pouches.',
    },
    diet: 'Omnivore',
    habitat: 'Grasslands, semi-deserts, homes',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/European_hamster_%28Cricetus_cricetus%29_Meidling.jpg/1280px-European_hamster_%28Cricetus_cricetus%29_Meidling.jpg'
  },

  {
    id: 'mouse',
    name: { tr: 'Fare', en: 'Mouse' },
    scientificName: 'Mus musculus',
    description: {
      tr: 'Küçük ve oldukça uyarlanabilir kemi hayvanı, bilimsel araştırmalarda da kullanılır.',
      en: 'A small, highly adaptable rodent used extensively in scientific research.',
    },
    diet: 'Omnivore',
    habitat: 'Urban areas, fields, homes',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Mouse_white_background.jpg'
  },

  {
    id: 'anteater',
    name: { tr: 'Karıncayiyen', en: 'Anteater' },
    scientificName: 'Myrmecophaga tridactyla',
    description: {
      tr: 'Uzun dili ile karınca ve termitleri besleyen, Güney Amerika\'nın ilginç memelisi.',
      en: 'A unique South American mammal that feeds on ants with its extremely long tongue.',
    },
    diet: 'Insectivore',
    habitat: 'Tropical forests, grasslands, wetlands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Myresluger2.jpg'
  },

  {
    id: 'gazelle',
    name: { tr: 'Ceylan', en: 'Gazelle' },
    scientificName: 'Nanger dorcas',
    description: {
      tr: 'Afrika\'nın büyük otçuları, zarif yapıları ve hızlarıyla bilinen hayvan.',
      en: 'An elegant and swift African herbivore living in large herds.',
    },
    diet: 'Herbivore',
    habitat: 'Savannas, semi-arid grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Chinkara_-_Shreeram_M_V_-_Bikaner.jpg/1280px-Chinkara_-_Shreeram_M_V_-_Bikaner.jpg'
  },

  {
    id: 'walrus',
    name: { tr: 'Mors', en: 'Walrus' },
    scientificName: 'Odobenus rosmarus',
    description: {
      tr: 'Uzun dişleriyle ve masif gövdesiyle ünlü Kuzey kutup deniz memelisi.',
      en: 'An Arctic marine mammal distinguished by its impressive tusks.',
    },
    diet: 'Carnivore',
    habitat: 'Arctic seas, ice floes',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Walrus_in_the_Russian_Arctic_National_Park%2C_Novaya_Zemlya_2015-2.jpg/1280px-Walrus_in_the_Russian_Arctic_National_Park%2C_Novaya_Zemlya_2015-2.jpg'
  },

  {
    id: 'orca',
    name: { tr: 'Katil Balina', en: 'Orca' },
    scientificName: 'Orcinus orca',
    description: {
      tr: 'Denizin en gücü yırtıcısı, sosyal yapısı ve akıllılığıyla bilinen hayvan.',
      en: 'The ocean\'s apex predator, known for its intelligence and social structure.',
    },
    diet: 'Carnivore',
    habitat: 'Oceans worldwide',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Killerwhales_jumping.jpg/1280px-Killerwhales_jumping.jpg'
  },

  {
    id: 'rabbit',
    name: { tr: 'Tavşan', en: 'Rabbit' },
    scientificName: 'Oryctolagus cuniculus',
    description: {
      tr: 'Hızlı koşuşu, uzun kulakları ve düş endüstrisine verilen emek ile bilinen hayvan.',
      en: 'A swift-running herbivore known for its long ears and prolific reproduction.',
    },
    diet: 'Herbivore',
    habitat: 'Grasslands, meadows, farms, warrens',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rcdo.jpg/1280px-Oryctolagus_cuniculus_Rcdo.jpg'
  },

  {
    id: 'sheep',
    name: { tr: 'Koyun', en: 'Sheep' },
    scientificName: 'Ovis aries',
    description: {
      tr: 'Yünü ve eti için yetiştirilirken sosyal ve uyumlu bir hayvan.',
      en: 'A domesticated herbivore valued for its wool, meat, and milk.',
    },
    diet: 'Herbivore',
    habitat: 'Pastures, hillsides, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flock_of_sheep.jpg/1280px-Flock_of_sheep.jpg'
  },

  {
    id: 'chimpanzee',
    name: { tr: 'Şempanze', en: 'Chimpanzee' },
    scientificName: 'Pan troglodytes',
    description: {
      tr: 'İnsanlarla %99 DNA\'sı aynı olan, sosyal ve zeki bir maymun türü.',
      en: 'Our closest living relative, sharing 99% of our DNA.',
    },
    diet: 'Omnivore',
    habitat: 'Tropical rainforests, woodlands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/015_Chimpanzee_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg/1280px-015_Chimpanzee_at_Kibale_forest_National_Park_Photo_by_Giles_Laurent.jpg'
  },

  {
    id: 'lion',
    name: { tr: 'Aslan', en: 'Lion' },
    scientificName: 'Panthera leo',
    description: {
      tr: 'Afrika savannalarının en güçlü yırtıcılarından biri, kral unvanıyla bilinen hayvan.',
      en: 'The king of beasts, a powerful African predator known for its majestic mane.',
    },
    diet: 'Carnivore',
    habitat: 'Savannas, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/1280px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg'
  },

  {
    id: 'jaguar',
    name: { tr: 'Jaguar', en: 'Jaguar' },
    scientificName: 'Panthera onca',
    description: {
      tr: 'Amerika\'nın en büyük kedisi, güçlü ve su yüzmede usta bir avıcı.',
      en: 'The Americas\' largest cat, an excellent swimmer and skilled hunter.',
    },
    diet: 'Carnivore',
    habitat: 'Tropical rainforests, wetlands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Standing_jaguar.jpg'
  },

  {
    id: 'leopard',
    name: { tr: 'Leopar', en: 'Leopard' },
    scientificName: 'Panthera pardus',
    description: {
      tr: 'Benzersiz benekli deseni ve ağaçlara tırmanma yetenekleriyle ünlü bir yırtıcı.',
      en: 'A spotted predator renowned for its climbing ability and agility in trees.',
    },
    diet: 'Carnivore',
    habitat: 'Tropical and subtropical forests, savannas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/African_leopard_male_%28cropped%29.jpg/1280px-African_leopard_male_%28cropped%29.jpg'
  },

  {
    id: 'tiger',
    name: { tr: 'Kaplan', en: 'Tiger' },
    scientificName: 'Panthera tigris',
    description: {
      tr: 'Dünyanın en büyük kedilerinden biri, çizgili desenleriyle kolayca tanınır.',
      en: 'The largest of all cats, recognizable by its striking orange and black stripes.',
    },
    diet: 'Carnivore',
    habitat: 'Tropical forests, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg/1280px-Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg'
  },

  {
    id: 'baboon',
    name: { tr: 'Babun', en: 'Baboon' },
    scientificName: 'Papio anubis',
    description: {
      tr: 'Sosyal yaşayan, güçlü ve agresif davranışlı Afrika maymunu.',
      en: 'A large, social African primate known for its intelligence and strength.',
    },
    diet: 'Omnivore',
    habitat: 'Savannas, grasslands, rocky areas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Olive_baboon_Ngorongoro.jpg/1280px-Olive_baboon_Ngorongoro.jpg'
  },

  {
    id: 'koala',
    name: { tr: 'Koala', en: 'Koala' },
    scientificName: 'Phascolarctos cinereus',
    description: {
      tr: 'Avustralya\'nın uyumlu marsupiyali, yalnızca özel bir bitki besler.',
      en: 'An Australian marsupial that feeds almost exclusively on eucalyptus leaves.',
    },
    diet: 'Herbivore',
    habitat: 'Eucalyptus forests',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Koala_climbing_tree.jpg'
  },

  {
    id: 'seal',
    name: { tr: 'Fok', en: 'Seal' },
    scientificName: 'Phoca vitulina',
    description: {
      tr: 'Suya uyarlanmış, ön ayakları yüzgeç haline gelmiş bir deniz memelisi.',
      en: 'A marine mammal with flippers, highly adapted to ocean life.',
    },
    diet: 'Carnivore',
    habitat: 'Coastal waters, ice floes',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Common_seal_%28Phoca_vitulina%29_2.jpg/1280px-Common_seal_%28Phoca_vitulina%29_2.jpg'
  },

  {
    id: 'orangutan',
    name: { tr: 'Orangutan', en: 'Orangutan' },
    scientificName: 'Pongo pygmaeus',
    description: {
      tr: 'Güney Doğu Asya\'nın sadece bu bölgesinde yaşayan, ağaçlarda yaşamaya uyarlanmış maymun.',
      en: 'An intelligent tree-dwelling ape found only in Southeast Asian rainforests.',
    },
    diet: 'Omnivore',
    habitat: 'Tropical rainforests',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG/1280px-Orang_Utan%2C_Semenggok_Forest_Reserve%2C_Sarawak%2C_Borneo%2C_Malaysia.JPG'
  },

  {
    id: 'raccoon',
    name: { tr: 'Rakun', en: 'Raccoon' },
    scientificName: 'Procyon lotor',
    description: {
      tr: 'Siyah maskeli yüzü ve ince manevra yapan ön ayaklarıyla bilinen hayvan.',
      en: 'An intelligent and adaptable mammal with distinctive black "mask" markings.',
    },
    diet: 'Omnivore',
    habitat: 'Forests, wetlands, urban areas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Raccoon_in_Central_Park_%2835264%29.jpg/1280px-Raccoon_in_Central_Park_%2835264%29.jpg'
  },

  {
    id: 'reindeer',
    name: { tr: 'Ren Geyiği', en: 'Reindeer' },
    scientificName: 'Rangifer tarandus',
    description: {
      tr: 'Kutup bölgelerinde yaşayan, boynuzları sayesinde karın içinde yol bulabilen hayvan.',
      en: 'An Arctic herbivore adapted to extreme cold and snow.',
    },
    diet: 'Herbivore',
    habitat: 'Tundra, boreal forests, grasslands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Reinbukken_p%C3%A5_frisk_gr%C3%B8nt_beite._-_panoramio.jpg/1280px-Reinbukken_p%C3%A5_frisk_gr%C3%B8nt_beite._-_panoramio.jpg'
  },

  {
    id: 'rat',
    name: { tr: 'Sıçan', en: 'Rat' },
    scientificName: 'Rattus norvegicus',
    description: {
      tr: 'Fareden daha büyük, zeki ve sosyal yapısıyla bilinen kemi hayvanı.',
      en: 'A larger, intelligent rodent known for its social behavior.',
    },
    diet: 'Omnivore',
    habitat: 'Urban areas, sewers, fields',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Rattus_norvegicus_-_Brown_rat_02.jpg/1280px-Rattus_norvegicus_-_Brown_rat_02.jpg'
  },

  {
    id: 'rhinoceros',
    name: { tr: 'Gergedan', en: 'Rhinoceros' },
    scientificName: 'Rhinoceros unicornis',
    description: {
      tr: 'Karakteristik boynuzuyla bilinen, nesli ciddi şekilde tehlike altında olan hayvan.',
      en: 'A massive herbivore recognizable by its distinctive horn.',
    },
    diet: 'Herbivore',
    habitat: 'Savannas, grasslands, forests',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Rhino_collage.png'
  },

  {
    id: 'tasmanian-devil',
    name: { tr: 'Tazmanya Canavarı', en: 'Tasmanian Devil' },
    scientificName: 'Sarcophilus harrisii',
    description: {
      tr: 'Tazmanya\'nın endemik marsupiyali, güçlü çeneleri ve kırmızı kulakları ile ünlü.',
      en: 'An iconic Tasmanian marsupial known for its powerful bite and loud calls.',
    },
    diet: 'Carnivore',
    habitat: 'Eucalyptus forests, coastal scrublands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Sarcophilus_harrisii_taranna.jpg/1280px-Sarcophilus_harrisii_taranna.jpg'
  },

  {
    id: 'squirrel',
    name: { tr: 'Sincap', en: 'Squirrel' },
    scientificName: 'Sciurus vulgaris',
    description: {
      tr: 'Ağaçlara tırmanan, ön ayakları ile ince manipülasyon yapabilen hafif hayvan.',
      en: 'An agile tree-climber known for storing nuts for winter.',
    },
    diet: 'Herbivore',
    habitat: 'Forests, parks, gardens',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Sciuridae.jpg'
  },

  {
    id: 'meerkat',
    name: { tr: 'Mirket', en: 'Meerkat' },
    scientificName: 'Suricata suricata',
    description: {
      tr: 'Ayakta durarak nöbet tutan, sosyal yapısı ile ünlü Afrika hayvanı.',
      en: 'An African mammal famous for standing upright as sentries.',
    },
    diet: 'Omnivore',
    habitat: 'Deserts, grasslands, savannas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Meerkat_%28Suricata_suricatta%29_Tswalu.jpg/1280px-Meerkat_%28Suricata_suricatta%29_Tswalu.jpg'
  },

  {
    id: 'wild-boar',
    name: { tr: 'Yaban Domuzu', en: 'Wild Boar' },
    scientificName: 'Sus scrofa',
    description: {
      tr: 'Evcil domuzun yabanı akrabası, ormanlarda ve ot tarlalarında yaşayan güçlü hayvan.',
      en: 'The wild ancestor of domestic pigs, known for its strength and toughness.',
    },
    diet: 'Omnivore',
    habitat: 'Forests, grasslands, wetlands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Wildschwein%2C_N%C3%A4he_Pulverstampftor_%28cropped%29.jpg/1280px-Wildschwein%2C_N%C3%A4he_Pulverstampftor_%28cropped%29.jpg'
  },

  {
    id: 'pig',
    name: { tr: 'Domuz', en: 'Pig' },
    scientificName: 'Sus scrofa domesticus',
    description: {
      tr: 'Zekası yüksek, evcilleştirilen, pek çok kültürde beslenilen hayvan.',
      en: 'An intelligent domesticated animal farmed for meat and other products.',
    },
    diet: 'Omnivore',
    habitat: 'Farms, pastures',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pig_farm_Vampula_1.jpg/1280px-Pig_farm_Vampula_1.jpg'
  },

  {
    id: 'buffalo',
    name: { tr: 'Bufalo', en: 'Buffalo' },
    scientificName: 'Syncerus caffer',
    description: {
      tr: 'Afrika savannalarının güçlü otçusu, boynuzlarıyla ünlü hayvan.',
      en: 'A powerful African herbivore known for its formidable horns.',
    },
    diet: 'Herbivore',
    habitat: 'Savannas, grasslands, wetlands',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/African_buffalo_%28Syncerus_caffer_caffer%29_male_with_cattle_egret.jpg/1280px-African_buffalo_%28Syncerus_caffer_caffer%29_male_with_cattle_egret.jpg'
  },

  {
    id: 'mole',
    name: { tr: 'Köstebek', en: 'Mole' },
    scientificName: 'Talpa europaea',
    description: {
      tr: 'Yeraltında tünel açan, gözleri zayıf ama dokunma duyusu çok güçlü olan hayvan.',
      en: 'A burrowing mammal with powerful limbs and highly developed touch.',
    },
    diet: 'Insectivore',
    habitat: 'Grasslands, forests, gardens',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Kret_mole.jpg/1280px-Kret_mole.jpg'
  },

  {
    id: 'manatee',
    name: { tr: 'Deniz Fili', en: 'Manatee' },
    scientificName: 'Trichechus manatus',
    description: {
      tr: 'Sakin ve yaşlı görüntüsü ile beraber, yavaş temposu ve uyumlu hareketi olan suda yaşayan memeli.',
      en: 'A slow-moving, gentle marine mammal with surprising grace in water.',
    },
    diet: 'Herbivore',
    habitat: 'Shallow coastal waters, rivers, lagoons',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Underwater_photography_on_endangered_mammal_manatee.jpg/1280px-Underwater_photography_on_endangered_mammal_manatee.jpg'
  },

  {
    id: 'brown-bear',
    name: { tr: 'Boz Ayı', en: 'Brown Bear' },
    scientificName: 'Ursus arctos',
    description: {
      tr: 'Kuzey yarımkürenin en yaygın ayısı, adaptif ve güçlü bir hayvan.',
      en: 'A massive omnivore found across the Northern Hemisphere.',
    },
    diet: 'Omnivore',
    habitat: 'Forests, mountains, tundra',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1280px-2010-kodiak-bear-1.jpg'
  },

  {
    id: 'polar-bear',
    name: { tr: 'Kutup Ayısı', en: 'Polar Bear' },
    scientificName: 'Ursus maritimus',
    description: {
      tr: 'Kutup bölgelerinin en büyük yırtıcısı, buzda yaşamaya mükemmel şekilde uyarlanmış.',
      en: 'The Arctic\'s apex predator, perfectly adapted to life on ice.',
    },
    diet: 'Carnivore',
    habitat: 'Arctic ice, coastal areas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg'
  },

  {
    id: 'alpaca',
    name: { tr: 'Alpaka', en: 'Alpaca' },
    scientificName: 'Vicugna pacos',
    description: {
      tr: 'Lamadan daha küçük, yumuşak ve değerli yünüyle bilinen hayvan.',
      en: 'A smaller cousin of the llama, valued for its soft fleece.',
    },
    diet: 'Herbivore',
    habitat: 'Grasslands, mountains, farms',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Alpaca_in_Higashiyama_Zoo_-_1.jpg/1280px-Alpaca_in_Higashiyama_Zoo_-_1.jpg'
  },

  {
    id: 'fox',
    name: { tr: 'Tilki', en: 'Fox' },
    scientificName: 'Vulpes vulpes',
    description: {
      tr: 'Kırmızı renginin yanı sıra zekası ve kurnazlığıyla bilinir.',
      en: 'A cunning and intelligent predator known for its reddish-orange fur.',
    },
    diet: 'Omnivore',
    habitat: 'Forests, grasslands, urban areas',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Portrait_of_a_red_fox_in_Rautas_fj%C3%A4llurskog_%28cropped%29.jpg/1280px-Portrait_of_a_red_fox_in_Rautas_fj%C3%A4llurskog_%28cropped%29.jpg'
  },

  {
    id: 'sea-lion',
    name: { tr: 'Deniz Aslanı', en: 'Sea Lion' },
    scientificName: 'Zalophus californianus',
    description: {
      tr: 'Foktan daha yüksek hayvanlı, kara üzerinde daha iyi hareketi olan deniz memelisi.',
      en: 'A marine mammal more agile on land than seals, known for its acrobatics.',
    },
    diet: 'Carnivore',
    habitat: 'Coastal waters, rocky shores',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/South_American_bull_sea_lion_%28Otaria_flavescens%29.jpg/1280px-South_American_bull_sea_lion_%28Otaria_flavescens%29.jpg'
  },
];

// Function to organize mammals into spreads (pages with 6 items each)
function organizeSpreads(animalList: MammalEntry[]): MammalEntry[][] {
  const spreads: MammalEntry[][] = [];
  for (let i = 0; i < animalList.length; i += 6) {
    spreads.push(animalList.slice(i, i + 6));
  }
  return spreads;
}

// Export spreads organized by language
export const mammalSpreads: Record<string, MammalEntry[][]> = {
  tr: organizeSpreads(mammals),
  en: organizeSpreads(mammals),
};

export default mammals;



