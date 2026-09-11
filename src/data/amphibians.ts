import type { AnimalEntry } from '@/types';

/**
 * Amphibia, written to the handbook's entry template: habitat, diet and size as
 * the three facts, then two sentences — how it is told apart in the field, and
 * the one thing about it worth carrying away.
 *
 * The `id` of an entry is what its photograph and its credit are filed under,
 * so ids are fixed. Names, facts and prose can be revised; ids cannot.
 */
export const amphibians: AnimalEntry[] = [
  {
    id: 'green-frog',
    name: { tr: 'Yeşil Kurbağa', en: 'Marsh Frog' },
    scientificName: 'Pelophylax',
    habitat: {
      tr: 'Göl, gölet ve sazlık kıyıları',
      en: 'Lake, pond and reedbed margins',
    },
    diet: {
      tr: 'Böcek, solucan ve kendinden küçük kurbağalar',
      en: 'Insects, worms and smaller frogs',
    },
    size: { tr: '7–12 cm', en: '7–12 cm' },
    description: {
      tr: 'Sırtından geçen açık yeşil bant ve suya sıçrayıp hemen dibe dalması onu kara kurbağasından ayırır. Erkeğinin ağız kenarındaki iki kese, sesini sazlığın öbür ucundan duyulacak kadar büyütür.',
      en: 'A pale green stripe down the back, and the habit of leaping into water and going straight under, separate it from a toad. Two sacs at the corners of the male’s mouth carry his call to the far side of the reeds.',
    },
  },
  {
    id: 'toad',
    name: { tr: 'Kara Kurbağası', en: 'Common Toad' },
    scientificName: 'Bufo bufo',
    habitat: {
      tr: 'Orman tabanı, bahçeler ve taş altları',
      en: 'Forest floor, gardens and under stones',
    },
    diet: { tr: 'Solucan, sümüklüböcek ve böcek', en: 'Worms, slugs and insects' },
    size: { tr: '6–13 cm', en: '6–13 cm' },
    description: {
      tr: 'Kuru, siğilli derisi ve sıçramak yerine yürümesiyle kurbağadan ayrılır; suya yalnızca üremek için girer. Gözlerinin arkasındaki bezler, tehdit altında acı bir salgı bırakır.',
      en: 'Dry, warty skin and a walk rather than a hop separate it from a frog; it enters water only to breed. Glands behind the eyes release a bitter secretion when it is threatened.',
    },
  },
  {
    id: 'tree-frog',
    name: { tr: 'Ağaç Kurbağası', en: 'European Tree Frog' },
    scientificName: 'Hyla arborea',
    habitat: {
      tr: 'Sazlık, çalı ve su kenarındaki ağaçlar',
      en: 'Reeds, scrub and trees beside water',
    },
    diet: { tr: 'Sinek, örümcek ve küçük böcekler', en: 'Flies, spiders and small insects' },
    size: { tr: '3–5 cm', en: '3–5 cm' },
    description: {
      tr: 'Parlak yeşil sırtı, yanlarından geçen koyu çizgi ve parmak uçlarındaki yuvarlak vantuzlarla tanınır. O vantuzlar sayesinde düz bir yaprağın altında baş aşağı durabilir.',
      en: 'Bright green above, with a dark line along each flank and round discs on the toe tips. Those discs let it sit upside down under a flat leaf without slipping.',
    },
  },
  {
    id: 'salamander',
    name: { tr: 'Semender', en: 'Salamander' },
    scientificName: 'Salamandra',
    habitat: {
      tr: 'Nemli orman tabanı, dere kenarı ve taş altları',
      en: 'Damp forest floor, streamsides and under stones',
    },
    diet: { tr: 'Solucan, sümüklüböcek ve böcek', en: 'Worms, slugs and insects' },
    size: { tr: '10–25 cm', en: '10–25 cm' },
    description: {
      tr: 'Kertenkeleye benzer ama derisi pullu değil, nemli ve çıplaktır; pençesi de yoktur. Kopan bir bacağını, kuyruğunu, hatta gözünün bir bölümünü yeniden büyütebilir.',
      en: 'It looks like a lizard, but its skin is moist and bare rather than scaled and it has no claws. It can regrow a lost leg, a tail, even part of an eye.',
    },
  },
  {
    id: 'axolotl',
    name: { tr: 'Aksolotl', en: 'Axolotl' },
    scientificName: 'Ambystoma mexicanum',
    habitat: {
      tr: 'Meksika’da Xochimilco kanalları',
      en: 'The Xochimilco canals of Mexico',
    },
    diet: { tr: 'Solucan, kurtçuk ve küçük balık', en: 'Worms, larvae and small fish' },
    size: { tr: '20–30 cm', en: '20–30 cm' },
    description: {
      tr: 'Başının iki yanındaki tüylü dış solungaçlarıyla tanınır; ömrü boyunca larva biçiminde kalır ve karaya hiç çıkmaz. Doğada neredeyse tükenmiştir, laboratuvarlarda ise on binlercesi yaşar.',
      en: 'Told by the feathery external gills either side of its head: it keeps its larval form for life and never comes ashore. It is all but gone in the wild, while tens of thousands live in laboratories.',
    },
  },
  {
    id: 'poison-dart-frog',
    name: { tr: 'Zehirli Ok Kurbağası', en: 'Poison Dart Frog' },
    scientificName: 'Dendrobatidae',
    habitat: {
      tr: 'Orta ve Güney Amerika yağmur ormanları',
      en: 'Central and South American rainforest',
    },
    diet: { tr: 'Karınca ve akar', en: 'Ants and mites' },
    size: { tr: '1.5–6 cm', en: '15–60 mm' },
    description: {
      tr: 'Kırmızı, sarı ya da mavi parlak rengi saklanmak için değil, uzaktan uyarmak içindir. Zehri kendi üretmez; yediği karıncalardan alır, bu yüzden tutsaklıkta doğan bireyler zehirsizdir.',
      en: 'Its red, yellow or blue is not camouflage but a warning meant to be read from a distance. The poison is not its own — it comes from the ants it eats, so captive-bred animals are harmless.',
    },
  },
  {
    id: 'bullfrog',
    name: { tr: 'Boğa Kurbağası', en: 'American Bullfrog' },
    scientificName: 'Lithobates catesbeianus',
    habitat: {
      tr: 'Durgun göl, gölet ve bataklıklar',
      en: 'Still lakes, ponds and marshes',
    },
    diet: {
      tr: 'Böcek, balık, kuş ve başka kurbağalar',
      en: 'Insects, fish, birds and other frogs',
    },
    size: { tr: '9–20 cm', en: '9–20 cm' },
    description: {
      tr: 'Kuzey Amerika’nın en iri kurbağasıdır; kulak zarı gözünden büyükse elinizdeki erkektir. Ağzına sığan her şeyi yediğinden, taşındığı ülkelerde yerli kurbağaları silip süpürür.',
      en: 'The largest frog in North America; if the eardrum is wider than the eye, the animal is a male. It eats anything that fits in its mouth, which is why it clears out native frogs wherever it is introduced.',
    },
  },
  {
    id: 'newt',
    name: { tr: 'Su Semenderi', en: 'Newt' },
    scientificName: 'Triturus',
    habitat: {
      tr: 'Gölet ve yavaş dereler; mevsim dışında orman tabanı',
      en: 'Ponds and slow streams; the forest floor out of season',
    },
    diet: {
      tr: 'Kurtçuk, kurbağa yumurtası ve küçük omurgasızlar',
      en: 'Larvae, frog spawn and small invertebrates',
    },
    size: { tr: '8–16 cm', en: '8–16 cm' },
    description: {
      tr: 'Üreme mevsiminde erkeğin sırtında testere dişli bir ibik çıkar; sudan çıkınca ibik erir ve deri matlaşır. Yılın yarısını suda, yarısını karada geçirir.',
      en: 'In the breeding season the male grows a jagged crest along his back; out of water the crest shrinks and the skin goes dull. It spends half the year in water and half on land.',
    },
  },
  {
    id: 'giant-chinese-salamander',
    name: { tr: 'Dev Çin Semenderi', en: 'Chinese Giant Salamander' },
    scientificName: 'Andrias davidianus',
    habitat: { tr: 'Çin’de soğuk dağ dereleri', en: 'Cold mountain streams in China' },
    diet: { tr: 'Balık, kurbağa ve kabuklular', en: 'Fish, frogs and crustaceans' },
    size: { tr: '1–1.8 m', en: '1–1.8 m' },
    description: {
      tr: 'Yaşayan en büyük amfibidir; yassı başı ve gövdesi boyunca uzanan deri kıvrımlarıyla tanınır. Akciğeri neredeyse işlevsizdir, oksijeni tümüyle o kıvrımlı deriden alır.',
      en: 'The largest amphibian alive, known by its flattened head and the folds of skin running the length of its body. Its lungs barely work; it takes its oxygen through that folded skin.',
    },
  },
  {
    id: 'caecilian',
    name: { tr: 'Sesilya', en: 'Caecilian' },
    scientificName: 'Gymnophiona',
    habitat: {
      tr: 'Tropik ormanların nemli toprağı',
      en: 'The damp soil of tropical forest',
    },
    diet: {
      tr: 'Solucan ve toprak omurgasızları',
      en: 'Earthworms and soil invertebrates',
    },
    size: { tr: '10–150 cm', en: '10–150 cm' },
    description: {
      tr: 'Bacaksız, halka halka gövdesiyle solucana benzer ama çenesi ve omurgası vardır. Gözleri deriyle örtülüdür; yolunu başındaki kısa bir dokunaçla yoklayarak bulur.',
      en: 'Legless and ringed like an earthworm, but with jaws and a backbone. Its eyes are covered over with skin, and it finds its way with a short tentacle on the head.',
    },
  },
  {
    id: 'spotted-salamander',
    name: { tr: 'Benekli Semender', en: 'Spotted Salamander' },
    scientificName: 'Ambystoma maculatum',
    habitat: {
      tr: 'Nemli yaprak döken ormanlar ve mevsimlik göletler',
      en: 'Damp deciduous woodland and seasonal pools',
    },
    diet: { tr: 'Solucan, sümüklüböcek ve böcek', en: 'Worms, slugs and insects' },
    size: { tr: '15–25 cm', en: '15–25 cm' },
    description: {
      tr: 'Siyah zemin üzerinde iki sıra hâlinde dizilmiş sarı benekleriyle tanınır. Yılın neredeyse tamamını toprak altında geçirir; ilk ılık bahar yağmurunda hep birlikte göletlere iner.',
      en: 'Two rows of yellow spots on a black ground. It spends nearly the whole year underground and comes down to the pools all at once on the first warm rain of spring.',
    },
  },
  {
    id: 'fire-salamander',
    name: { tr: 'Ateş Semenderi', en: 'Fire Salamander' },
    scientificName: 'Salamandra salamandra',
    habitat: {
      tr: 'Nemli yaprak döken ormanlar ve dere kenarları',
      en: 'Damp deciduous woodland and streamsides',
    },
    diet: { tr: 'Solucan, sümüklüböcek ve örümcek', en: 'Worms, slugs and spiders' },
    size: { tr: '15–25 cm', en: '15–25 cm' },
    description: {
      tr: 'Parlak siyah derisi üzerindeki sarı leke deseni her bireyde farklıdır ve parmak izi gibi iş görür. Rahatsız edildiğinde derisinden acı, tahriş edici bir salgı bırakır.',
      en: 'The yellow blotches on its glossy black skin differ from animal to animal, and serve as a fingerprint would. Disturbed, it releases a bitter, irritating secretion from the skin.',
    },
  },
  {
    id: 'glass-frog',
    name: { tr: 'Cam Kurbağası', en: 'Glass Frog' },
    scientificName: 'Centrolenidae',
    habitat: {
      tr: 'Orta Amerika bulut ormanlarında dere üstündeki yapraklar',
      en: 'Leaves overhanging streams in Central American cloud forest',
    },
    diet: { tr: 'Küçük böcek ve örümcekler', en: 'Small insects and spiders' },
    size: { tr: '2–3 cm', en: '20–30 mm' },
    description: {
      tr: 'Karın derisi saydamdır; alttan bakıldığında kalbi, karaciğeri ve bağırsakları görülür. Yumurtalarını derenin üstündeki yaprağa bırakır, larvalar çıktığında doğrudan suya düşer.',
      en: 'The skin of its belly is clear, so from below the heart, liver and gut can be seen. It lays its eggs on a leaf above a stream, and the larvae drop straight into the water as they hatch.',
    },
  },
  {
    id: 'african-clawed-frog',
    name: { tr: 'Afrika Pençeli Kurbağası', en: 'African Clawed Frog' },
    scientificName: 'Xenopus laevis',
    habitat: {
      tr: 'Afrika’da durgun gölet ve yavaş nehirler',
      en: 'Still ponds and slow rivers in Africa',
    },
    diet: {
      tr: 'Leş, küçük balık ve omurgasızlar',
      en: 'Carrion, small fish and invertebrates',
    },
    size: { tr: '6–13 cm', en: '6–13 cm' },
    description: {
      tr: 'Dili ve kulak zarı yoktur; arka ayaklarının üç parmağında siyah tırnak taşır. Yirminci yüzyılda gebelik testi olarak kullanılmış, ardından laboratuvarların standart amfibisi olmuştur.',
      en: 'It has neither tongue nor eardrum, and three toes of each hind foot carry black claws. In the twentieth century it served as a pregnancy test, and then became the standard laboratory amphibian.',
    },
  },
  {
    id: 'mudpuppy',
    name: { tr: 'Çamur Semenderi', en: 'Mudpuppy' },
    scientificName: 'Necturus maculosus',
    habitat: {
      tr: 'Kuzey Amerika’da göl, nehir ve dere tabanları',
      en: 'Lake, river and stream beds in North America',
    },
    diet: {
      tr: 'Kabuklu, balık yumurtası ve kurtçuk',
      en: 'Crustaceans, fish eggs and larvae',
    },
    size: { tr: '20–33 cm', en: '20–33 cm' },
    description: {
      tr: 'Ömrü boyunca suda kalır ve başının iki yanındaki kırmızı püsküllü dış solungaçlarını korur. Suyun oksijeni azaldıkça bu solungaçlar irileşir, berrak soğuk suda küçük kalır.',
      en: 'It stays in the water for life and keeps the red, feathery external gills either side of its head. Those gills grow larger in poorly oxygenated water and stay small in clear cold streams.',
    },
  },
];
