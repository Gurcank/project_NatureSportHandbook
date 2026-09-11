import type { Localized } from '@/types';

/**
 * Fungi are grouped by division, the way a mycology key does it: the
 * club-fungi that drop spores from gills or pores, the sac-fungi that shoot
 * them from an ascus, and the lichens — a fungus and an alga living as one
 * organism, which is why they sit apart from both.
 */
export type FungusDivision = 'basidiomycota' | 'ascomycota' | 'lichen';

export type FungusEntry = {
  id: string;
  division: FungusDivision;
  name: Localized;
  scientificName: string;
  /** Written plainly because getting this wrong is the one mistake that matters. */
  edibility: Localized;
  habitat: Localized;
  /** When the fruiting body is up and findable, which is half of finding one. */
  season: Localized;
  description: Localized;
};

export const mushrooms: FungusEntry[] = [
  // --- Basidiomycota -------------------------------------------------------
  {
    id: 'button-mushroom',
    division: 'basidiomycota',
    name: { tr: 'Kültür Mantarı', en: 'Button Mushroom' },
    scientificName: 'Agaricus bisporus',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Gübreli topraklar, kültür tesisleri', en: 'Manured soil, cultivated beds' },
    season: { tr: 'Kültürde yıl boyu', en: 'Year-round in cultivation' },
    description: {
      tr: 'Dünyada en çok yetiştirilen mantar. Beyaz hâli de kestane rengi portobello hâli de aynı türdür; fark yalnızca olgunluk ve ırktır.',
      en: 'The most widely cultivated mushroom on earth. The white button and the brown portobello are the same species, differing only in strain and maturity.',
    },
  },
  {
    id: 'porcini',
    division: 'basidiomycota',
    name: { tr: 'Çörek Mantarı', en: 'Porcini' },
    scientificName: 'Boletus edulis',
    edibility: { tr: 'Yenir, çok makbul', en: 'Edible, prized' },
    habitat: { tr: 'Çam ve kayın ormanları', en: 'Pine and beech woodland' },
    season: { tr: 'Ağustos–Ekim', en: 'August–October' },
    description: {
      tr: 'Şapkasının altında lamel değil süngerimsi borucuklar taşır. Ağaç kökleriyle ortak yaşar, bu yüzden kültürü neredeyse imkânsızdır.',
      en: 'Carries a sponge of tubes beneath the cap instead of gills. It lives in partnership with tree roots, which is why it resists cultivation.',
    },
  },
  {
    id: 'chanterelle',
    division: 'basidiomycota',
    name: { tr: 'Horoz Mantarı', en: 'Chanterelle' },
    scientificName: 'Cantharellus cibarius',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Nemli karışık ormanlar', en: 'Damp mixed woodland' },
    season: { tr: 'Temmuz–Ekim', en: 'July–October' },
    description: {
      tr: 'Kayısıyı andıran kokusu ve şapkadan sapa inen kıvrımlı damarlarıyla tanınır. Gerçek lamel taşımaz.',
      en: 'Known by its apricot scent and the blunt, forking ridges that run down the stem. It has no true gills.',
    },
  },
  {
    id: 'fly-agaric',
    division: 'basidiomycota',
    name: { tr: 'Sinek Mantarı', en: 'Fly Agaric' },
    scientificName: 'Amanita muscaria',
    edibility: { tr: 'Zehirli', en: 'Poisonous' },
    habitat: { tr: 'Huş ve çam altları', en: 'Under birch and pine' },
    season: { tr: 'Ağustos–Kasım', en: 'August–November' },
    description: {
      tr: 'Kırmızı şapkası üstündeki beyaz pullar, yırtılan örtünün kalıntısıdır. Yağmurla yıkanıp kaybolabilir; teşhiste tek başına güvenilmez.',
      en: 'The white flecks on the scarlet cap are remnants of a torn veil. Rain can wash them away, so they are never a safe identifier on their own.',
    },
  },
  {
    id: 'death-cap',
    division: 'basidiomycota',
    name: { tr: 'Köygöçüren', en: 'Death Cap' },
    scientificName: 'Amanita phalloides',
    edibility: { tr: 'Öldürücü', en: 'Deadly' },
    habitat: { tr: 'Meşe ve kestane altları', en: 'Under oak and chestnut' },
    season: { tr: 'Ağustos–Kasım', en: 'August–November' },
    description: {
      tr: 'Mantar zehirlenmesinden ölümlerin büyük çoğunluğundan sorumludur. Sapın dibindeki kese ve halka en önemli işaretleridir; pişirmek zehri yok etmez.',
      en: 'Responsible for most fatal mushroom poisonings. The sac at the stem base and the ring are its key marks, and cooking does not destroy the toxin.',
    },
  },
  {
    id: 'oyster-mushroom',
    division: 'basidiomycota',
    name: { tr: 'İstiridye Mantarı', en: 'Oyster Mushroom' },
    scientificName: 'Pleurotus ostreatus',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Ölü ve yaralı yapraklı ağaç gövdeleri', en: 'Dead and dying hardwood trunks' },
    season: { tr: 'Sonbahar–kış', en: 'Autumn–winter' },
    description: {
      tr: 'Gövdelerde raf gibi kümeler kurar. Odunu çürüterek beslenir ve nematodları avlayabilen ender mantarlardandır.',
      en: 'Grows in shelving clusters on trunks. It feeds by rotting wood and is one of the few fungi known to trap and consume nematodes.',
    },
  },
  {
    id: 'shiitake',
    division: 'basidiomycota',
    name: { tr: 'Şitake', en: 'Shiitake' },
    scientificName: 'Lentinula edodes',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Doğu Asya’da ölü yapraklı ağaçlar', en: 'Dead hardwood in East Asia' },
    season: { tr: 'Kültürde yıl boyu', en: 'Year-round in cultivation' },
    description: {
      tr: 'Bin yılı aşkın süredir kütük üzerinde yetiştirilir. Kurutulduğunda umami tadını veren bileşikler yoğunlaşır.',
      en: 'Grown on logs for over a thousand years. Drying concentrates the compounds that give it its savoury, umami depth.',
    },
  },
  {
    id: 'shaggy-ink-cap',
    division: 'basidiomycota',
    name: { tr: 'Ak Mürekkep Mantarı', en: 'Shaggy Ink Cap' },
    scientificName: 'Coprinus comatus',
    edibility: { tr: 'Gençken yenir', en: 'Edible when young' },
    habitat: { tr: 'Çayır, yol kenarı, çiğnenmiş toprak', en: 'Grassland, verges, trodden ground' },
    season: { tr: 'Mayıs–Kasım', en: 'May–November' },
    description: {
      tr: 'Olgunlaşınca kendi kendini sindirip siyah bir mürekkebe dönüşür; sporlarını böyle dağıtır. Toplandıktan saatler sonra erimeye başlar.',
      en: 'On maturing it digests itself into a black ink to release its spores, and begins to liquefy within hours of picking.',
    },
  },
  {
    id: 'common-puffball',
    division: 'basidiomycota',
    name: { tr: 'Puf Mantarı', en: 'Common Puffball' },
    scientificName: 'Lycoperdon perlatum',
    edibility: { tr: 'İçi bembeyazken yenir', en: 'Edible while pure white inside' },
    habitat: { tr: 'Orman tabanı, çayır', en: 'Woodland floor, grassland' },
    season: { tr: 'Temmuz–Kasım', en: 'July–November' },
    description: {
      tr: 'Olgunlaşınca tepesinde bir delik açılır; yağmur damlası ya da dokunuş, spor bulutunu dışarı püskürtür.',
      en: 'A pore opens at the top when ripe, and a raindrop or a touch puffs out a cloud of spores.',
    },
  },
  {
    id: 'parasol-mushroom',
    division: 'basidiomycota',
    name: { tr: 'Şemsiye Mantarı', en: 'Parasol Mushroom' },
    scientificName: 'Macrolepiota procera',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Orman kenarları, otlaklar', en: 'Woodland edges, pasture' },
    season: { tr: 'Ağustos–Ekim', en: 'August–October' },
    description: {
      tr: 'Otuz santime varan şapkasıyla Avrupa’nın en iri mantarlarından. Sapındaki yılan derisi deseni ve oynar halkası ayırt edicidir.',
      en: 'One of Europe’s largest mushrooms, with a cap reaching thirty centimetres. The snakeskin-patterned stem and sliding ring identify it.',
    },
  },
  {
    id: 'honey-fungus',
    division: 'basidiomycota',
    name: { tr: 'Bal Mantarı', en: 'Honey Fungus' },
    scientificName: 'Armillaria mellea',
    edibility: { tr: 'İyi pişirilirse yenir', en: 'Edible only if thoroughly cooked' },
    habitat: { tr: 'Canlı ve ölü ağaç kökleri', en: 'Living and dead tree roots' },
    season: { tr: 'Eylül–Kasım', en: 'September–November' },
    description: {
      tr: 'Ağaçları öldüren bir parazittir. Toprak altında yayılan ayakkabı bağı gibi siyah ipleriyle dünyanın en büyük canlı organizmaları arasında sayılır.',
      en: 'A parasite that kills its host trees. Its black bootlace strands spread underground, forming some of the largest living organisms known.',
    },
  },
  {
    id: 'turkey-tail',
    division: 'basidiomycota',
    name: { tr: 'Kelebek Mantarı', en: 'Turkey Tail' },
    scientificName: 'Trametes versicolor',
    edibility: { tr: 'Yenmez, çay olarak kullanılır', en: 'Inedible; used as a tea' },
    habitat: { tr: 'Ölü yapraklı ağaç kütükleri', en: 'Dead hardwood stumps' },
    season: { tr: 'Yıl boyu, en bol sonbaharda', en: 'Year-round, most of it in autumn' },
    description: {
      tr: 'Kütükleri kaplayan, halka halka renk kuşakları taşıyan ince yelpazeler. Odun çürütücüsü olarak orman döngüsünün önemli parçasıdır.',
      en: 'Thin banded fans that tile over stumps in concentric colours, and a major recycler of dead wood.',
    },
  },
  {
    id: 'tinder-fungus',
    division: 'basidiomycota',
    name: { tr: 'Kav Mantarı', en: 'Tinder Fungus' },
    scientificName: 'Fomes fomentarius',
    edibility: { tr: 'Yenmez', en: 'Inedible' },
    habitat: { tr: 'Huş ve kayın gövdeleri', en: 'Birch and beech trunks' },
    season: { tr: 'Yıl boyu; mantar çok yıllıktır', en: 'Year-round; the bracket is perennial' },
    description: {
      tr: 'At toynağı biçiminde sert bir mantar. İç dokusu binlerce yıldır çakmak kavı olarak kullanılmıştır; Ötzi’nin yanında da bulunmuştur.',
      en: 'A hard, hoof-shaped bracket whose inner layer has been carried as fire tinder for millennia — a piece was found with Ötzi the iceman.',
    },
  },
  {
    id: 'slippery-jack',
    division: 'basidiomycota',
    name: { tr: 'Yağlı Mantar', en: 'Slippery Jack' },
    scientificName: 'Suillus luteus',
    edibility: { tr: 'Kabuğu soyulup yenir', en: 'Edible once the cap skin is peeled' },
    habitat: { tr: 'Çam ormanları', en: 'Pine forest' },
    season: { tr: 'Ağustos–Kasım', en: 'August–November' },
    description: {
      tr: 'Yağlı, yapışkan şapkası ıslakken parlar. Çamla ortak yaşar ve çam dikilen her yere onunla birlikte taşınmıştır.',
      en: 'The greasy cap glistens when wet. It partners with pine and has followed the tree wherever it has been planted.',
    },
  },
  {
    id: 'hedgehog-mushroom',
    division: 'basidiomycota',
    name: { tr: 'Geyik Dili', en: 'Hedgehog Mushroom' },
    scientificName: 'Hydnum repandum',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Karışık ormanlar', en: 'Mixed woodland' },
    season: { tr: 'Eylül–Aralık', en: 'September–December' },
    description: {
      tr: 'Şapkasının altında lamel yerine iğne gibi sarkan dişler taşır; bu yüzden karıştırılması güç, yeni başlayanlar için güvenli bir türdür.',
      en: 'Instead of gills it hangs soft spines beneath the cap — hard to confuse with anything, and a safe beginner’s find.',
    },
  },
  {
    id: 'enoki',
    division: 'basidiomycota',
    name: { tr: 'Kadife Sap', en: 'Enoki' },
    scientificName: 'Flammulina velutipes',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Ölü yapraklı ağaç gövdeleri', en: 'Dead hardwood trunks' },
    season: { tr: 'Kasım–Mart', en: 'November–March' },
    description: {
      tr: 'Doğada kısa saplı turuncu bir mantardır; karanlıkta yetiştirilen ince beyaz hâli markette satılandır. Donmuş havada bile meyve verir.',
      en: 'Orange and short-stemmed in the wild; the pale thread-like form sold in shops is grown in the dark. It fruits even in freezing weather.',
    },
  },
  {
    id: 'lions-mane',
    division: 'basidiomycota',
    name: { tr: 'Aslan Yelesi', en: 'Lion’s Mane' },
    scientificName: 'Hericium erinaceus',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Yaşlı yapraklı ağaç yaraları', en: 'Wounds on old hardwood' },
    season: { tr: 'Ağustos–Kasım', en: 'August–November' },
    description: {
      tr: 'Şapkası yoktur; gövdeden sarkan beyaz püsküllerden oluşur. Pişince dokusu yengeç etini andırır.',
      en: 'It has no cap, only a cascade of white spines hanging from the trunk. Cooked, its texture is often likened to crab meat.',
    },
  },
  {
    id: 'maitake',
    division: 'basidiomycota',
    name: { tr: 'Ormanın Tavuğu', en: 'Maitake' },
    scientificName: 'Grifola frondosa',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Yaşlı meşe dipleri', en: 'The base of old oaks' },
    season: { tr: 'Eylül–Kasım', en: 'September–November' },
    description: {
      tr: 'Aynı ağacın dibinde her yıl aynı yerde biten, üst üste binmiş gri yapraklardan oluşan iri bir küme.',
      en: 'A large rosette of overlapping grey fronds that returns to the same spot at the foot of the same oak year after year.',
    },
  },
  {
    id: 'amethyst-deceiver',
    division: 'basidiomycota',
    name: { tr: 'Ametist Mantarı', en: 'Amethyst Deceiver' },
    scientificName: 'Laccaria amethystina',
    edibility: { tr: 'Yenir', en: 'Edible' },
    habitat: { tr: 'Kayın ve meşe altları', en: 'Under beech and oak' },
    season: { tr: 'Temmuz–Kasım', en: 'July–November' },
    description: {
      tr: 'Canlı mor rengi kuruyunca solup kaybolur; adındaki “aldatıcı” buradan gelir. Topraktaki ağır metalleri biriktirir.',
      en: 'Its vivid violet fades as it dries, which is where the “deceiver” comes from. It accumulates heavy metals from the soil.',
    },
  },
  {
    id: 'sickener',
    division: 'basidiomycota',
    name: { tr: 'Kusturucu Rusula', en: 'The Sickener' },
    scientificName: 'Russula emetica',
    edibility: { tr: 'Zehirli', en: 'Poisonous' },
    habitat: { tr: 'Nemli çam ormanları, yosunlu topraklar', en: 'Damp pine forest and mossy ground' },
    season: { tr: 'Temmuz–Ekim', en: 'July–October' },
    description: {
      tr: 'Parlak kırmızı şapkası kolayca soyulur, eti tebeşir gibi kırılgandır. Yenirse şiddetli mide bulantısı yapar.',
      en: 'The bright red cap peels easily and the flesh snaps like chalk. Eating it brings on violent nausea.',
    },
  },
  {
    id: 'deadly-webcap',
    division: 'basidiomycota',
    name: { tr: 'Ölümcül Örümceksi', en: 'Deadly Webcap' },
    scientificName: 'Cortinarius rubellus',
    edibility: { tr: 'Öldürücü', en: 'Deadly' },
    habitat: { tr: 'İğne yapraklı ormanlar, yosun aralarında', en: 'Conifer forest, among moss' },
    season: { tr: 'Ağustos–Kasım', en: 'August–November' },
    description: {
      tr: 'Zehri böbrekleri hedef alır ve belirtiler günler, bazen haftalar sonra ortaya çıkar; bu gecikme onu özellikle tehlikeli kılar.',
      en: 'Its toxin attacks the kidneys and symptoms can take days or even weeks to appear — a delay that makes it especially dangerous.',
    },
  },
  {
    id: 'funeral-bell',
    division: 'basidiomycota',
    name: { tr: 'Ölümcül Galerina', en: 'Funeral Bell' },
    scientificName: 'Galerina marginata',
    edibility: { tr: 'Öldürücü', en: 'Deadly' },
    habitat: { tr: 'Çürüyen kütükler', en: 'Rotting stumps' },
    season: { tr: 'Yaz–sonbahar', en: 'Summer–autumn' },
    description: {
      tr: 'Köygöçürenle aynı zehri taşır ve yenen kütük mantarlarına benzediği için sık karıştırılır.',
      en: 'Carries the same toxin as the death cap and is easily mistaken for edible stump-dwelling mushrooms.',
    },
  },
  {
    id: 'reishi',
    division: 'basidiomycota',
    name: { tr: 'Reishi', en: 'Reishi' },
    scientificName: 'Ganoderma lucidum',
    edibility: { tr: 'Sert, yenmez; kaynatılır', en: 'Too woody to eat; simmered as a decoction' },
    habitat: { tr: 'Yapraklı ağaç kütükleri', en: 'Hardwood stumps' },
    season: { tr: 'Yaz–sonbahar', en: 'Summer–autumn' },
    description: {
      tr: 'Vernik sürülmüş gibi parlayan kızıl kahve bir raf mantarı. Doğu Asya tıbbında bin yıllardır kullanılır.',
      en: 'A reddish-brown bracket with a surface that looks varnished, used in East Asian medicine for millennia.',
    },
  },

  // --- Ascomycota ----------------------------------------------------------
  {
    id: 'morel',
    division: 'ascomycota',
    name: { tr: 'Kuzugöbeği', en: 'Morel' },
    scientificName: 'Morchella esculenta',
    edibility: { tr: 'Pişirilerek yenir', en: 'Edible only cooked' },
    habitat: { tr: 'Dişbudak ve karaağaç altları, yangın sonrası alanlar', en: 'Under ash and elm, and on burnt ground' },
    season: { tr: 'Mart–Mayıs', en: 'March–May' },
    description: {
      tr: 'Bal peteğini andıran çukurlu şapkasıyla ilkbaharın en aranan mantarı. Çiğ yenirse zehirlidir.',
      en: 'The most sought-after mushroom of spring, with a honeycombed, pitted cap. It is toxic raw.',
    },
  },
  {
    id: 'black-truffle',
    division: 'ascomycota',
    name: { tr: 'Siyah Trüf', en: 'Black Truffle' },
    scientificName: 'Tuber melanosporum',
    edibility: { tr: 'Yenir, çok değerli', en: 'Edible, highly prized' },
    habitat: { tr: 'Meşe ve fındık kökleri, kireçli toprak', en: 'Oak and hazel roots in limestone soil' },
    season: { tr: 'Aralık–Mart', en: 'December–March' },
    description: {
      tr: 'Bütün ömrünü toprak altında geçirir. Sporlarını yayması için kokusuyla hayvanları çeker; bu yüzden köpekle aranır.',
      en: 'It lives its whole life underground and relies on scent to draw animals that spread its spores, which is why dogs are used to find it.',
    },
  },
  {
    id: 'white-truffle',
    division: 'ascomycota',
    name: { tr: 'Beyaz Trüf', en: 'White Truffle' },
    scientificName: 'Tuber magnatum',
    edibility: { tr: 'Yenir, çok değerli', en: 'Edible, highly prized' },
    habitat: { tr: 'Kuzey İtalya ve Balkanlar’da kavak, meşe kökleri', en: 'Poplar and oak roots in northern Italy and the Balkans' },
    season: { tr: 'Eylül–Aralık', en: 'September–December' },
    description: {
      tr: 'Ağırlığına göre dünyanın en pahalı yiyeceklerinden. Isıya dayanmadığı için pişirilmez, çiğ olarak rendelenir.',
      en: 'Among the most expensive foods in the world by weight. Heat destroys its aroma, so it is shaved raw rather than cooked.',
    },
  },
  {
    id: 'false-morel',
    division: 'ascomycota',
    name: { tr: 'Yalancı Kuzugöbeği', en: 'False Morel' },
    scientificName: 'Gyromitra esculenta',
    edibility: { tr: 'Zehirli', en: 'Poisonous' },
    habitat: { tr: 'Kumlu çam ormanları', en: 'Sandy pine forest' },
    season: { tr: 'Mart–Mayıs', en: 'March–May' },
    description: {
      tr: 'Beyin gibi kıvrımlı şapkası kuzugöbeğinin peteğinden farklıdır. Roket yakıtında da bulunan bir bileşik taşır.',
      en: 'Its brain-like folds differ from the true morel’s honeycomb. It contains a compound also found in rocket fuel.',
    },
  },
  {
    id: 'scarlet-elf-cup',
    division: 'ascomycota',
    name: { tr: 'Kırmızı Çanak Mantarı', en: 'Scarlet Elf Cup' },
    scientificName: 'Sarcoscypha coccinea',
    edibility: { tr: 'Yenmez', en: 'Inedible' },
    habitat: { tr: 'Nemli ormanlarda düşmüş dallar', en: 'Fallen branches in damp woodland' },
    season: { tr: 'Aralık–Nisan', en: 'December–April' },
    description: {
      tr: 'Kış sonunda yosun arasından çıkan parlak kırmızı küçük çanaklar. Sporlarını görünür bir duman bulutu hâlinde fırlatır.',
      en: 'Small scarlet cups that appear through moss in late winter, firing their spores out in a visible puff.',
    },
  },
  {
    id: 'dead-mans-fingers',
    division: 'ascomycota',
    name: { tr: 'Ölü Adam Parmakları', en: 'Dead Man’s Fingers' },
    scientificName: 'Xylaria polymorpha',
    edibility: { tr: 'Yenmez', en: 'Inedible' },
    habitat: { tr: 'Çürüyen yapraklı ağaç kütükleri', en: 'Rotting hardwood stumps' },
    season: { tr: 'Yıl boyu', en: 'Year-round' },
    description: {
      tr: 'Kütük diplerinden çıkan, şişkin uçlu siyah çıkıntılar. Odunu yıllar boyunca yavaşça çürütür.',
      en: 'Swollen black fingers pushing out of stump bases, slowly rotting the wood over years.',
    },
  },
  {
    id: 'ergot',
    division: 'ascomycota',
    name: { tr: 'Çavdar Mahmuzu', en: 'Ergot' },
    scientificName: 'Claviceps purpurea',
    edibility: { tr: 'Zehirli', en: 'Toxic' },
    habitat: { tr: 'Çavdar ve yabani buğdaygil başakları', en: 'Rye and wild grass ears' },
    season: { tr: 'Haziran–Ağustos, çiçeklenmeden sonra', en: 'June–August, after flowering' },
    description: {
      tr: 'Tahıl tanesinin yerini alan koyu bir çıkıntı. Bulaşmış undan yapılan ekmek tarih boyunca toplu zehirlenmelere yol açmıştır.',
      en: 'A dark spur that replaces a grain in the ear. Bread from contaminated flour caused mass poisonings through history.',
    },
  },

  // --- Lichens -------------------------------------------------------------
  {
    id: 'reindeer-lichen',
    division: 'lichen',
    name: { tr: 'Ren Geyiği Likeni', en: 'Reindeer Lichen' },
    scientificName: 'Cladonia rangiferina',
    edibility: { tr: 'İnsan için uygun değil', en: 'Not suitable for people' },
    habitat: { tr: 'Tundra, kumlu çam ormanları', en: 'Tundra and sandy pine forest' },
    season: { tr: 'Yıl boyu', en: 'Year-round' },
    description: {
      tr: 'Kışın ren geyiklerinin başlıca yemidir. Yılda birkaç milimetre büyür; çiğnenen bir alanın toparlanması onlarca yıl alır.',
      en: 'The main winter food of reindeer. It grows a few millimetres a year, so trampled ground takes decades to recover.',
    },
  },
  {
    id: 'common-orange-lichen',
    division: 'lichen',
    name: { tr: 'Sarı Duvar Likeni', en: 'Common Orange Lichen' },
    scientificName: 'Xanthoria parietina',
    edibility: { tr: 'İnsan için uygun değil', en: 'Not suitable for people' },
    habitat: { tr: 'Taş duvarlar, çatılar, ağaç kabukları', en: 'Stone walls, roofs, tree bark' },
    season: { tr: 'Yıl boyu', en: 'Year-round' },
    description: {
      tr: 'Azota dayanıklı olduğu için şehirlerde ve gübreli alanlarda yaygındır; hava kirliliği çalışmalarında gösterge tür olarak kullanılır.',
      en: 'Tolerant of nitrogen, so it thrives in towns and on farmland, and is used as an indicator species in air-quality surveys.',
    },
  },
  {
    id: 'beard-lichen',
    division: 'lichen',
    name: { tr: 'Sakal Likeni', en: 'Beard Lichen' },
    scientificName: 'Usnea barbata',
    edibility: { tr: 'İnsan için uygun değil', en: 'Not suitable for people' },
    habitat: { tr: 'Temiz havalı ormanlarda ağaç dalları', en: 'Tree branches in clean-air forest' },
    season: { tr: 'Yıl boyu', en: 'Year-round' },
    description: {
      tr: 'Dallardan sarkan gri yeşil püsküller. Kükürt dioksite çok duyarlıdır; bulunduğu yer havanın temiz olduğunu gösterir.',
      en: 'Grey-green tassels hanging from branches. Highly sensitive to sulphur dioxide, its presence marks clean air.',
    },
  },
  {
    id: 'lungwort-lichen',
    division: 'lichen',
    name: { tr: 'Akciğer Likeni', en: 'Lungwort Lichen' },
    scientificName: 'Lobaria pulmonaria',
    edibility: { tr: 'İnsan için uygun değil', en: 'Not suitable for people' },
    habitat: { tr: 'Yaşlı ormanlarda geniş gövdeler', en: 'Broad trunks in old-growth forest' },
    season: { tr: 'Yıl boyu', en: 'Year-round' },
    description: {
      tr: 'Akciğer dokusunu andıran loblu yaprakları vardır. Yalnızca uzun süredir bozulmamış ormanlarda yaşar, bu yüzden orman yaşının göstergesidir.',
      en: 'Its lobed thallus resembles lung tissue. It survives only in long-undisturbed woodland, making it a marker of forest age.',
    },
  },
];
