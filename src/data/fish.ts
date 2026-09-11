import type { AnimalEntry } from '@/types';

/**
 * The bony and cartilaginous fishes, written to the handbook's entry template:
 * habitat, diet and size as the three facts, then two sentences — how it is
 * told apart in the field, and the one thing about it worth carrying away.
 *
 * The `id` of an entry is what its photograph and its credit are filed under,
 * so ids are fixed. Names, facts and prose can be revised; ids cannot.
 */
export const fish: AnimalEntry[] = [
  {
    id: 'shark',
    name: { tr: 'Köpekbalığı', en: 'Shark' },
    scientificName: 'Selachimorpha',
    habitat: {
      tr: 'Kıyı sığlıklarından açık okyanusa',
      en: 'From coastal shallows to the open ocean',
    },
    diet: { tr: 'Balık, fok ve mürekkepbalığı', en: 'Fish, seals and squid' },
    size: { tr: '1–6 m', en: '1–6 m' },
    description: {
      tr: 'İskeleti kemik değil kıkırdaktır ve solungaç yarıklarının kapağı yoktur; kemikli balıklardan ayıran budur. Burnundaki elektrik alıcıları, kuma gömülmüş bir balığın kas kasılmasını bile sezer.',
      en: 'Its skeleton is cartilage rather than bone and its gill slits have no cover — that is what separates it from a bony fish. Electric receptors in the snout pick up the muscle twitch of a fish buried in sand.',
    },
  },
  {
    id: 'whale-shark',
    name: { tr: 'Balina Köpekbalığı', en: 'Whale Shark' },
    scientificName: 'Rhincodon typus',
    habitat: {
      tr: 'Sıcak açık denizler ve plankton bakımından zengin kıyılar',
      en: 'Warm open seas and plankton-rich coasts',
    },
    diet: { tr: 'Süzerek aldığı plankton ve küçük balık', en: 'Plankton and small fish, filtered' },
    size: { tr: '5–12 m', en: '5–12 m' },
    description: {
      tr: 'Yaşayan en büyük balıktır; koyu sırtındaki açık benek ve çizgi deseni her bireyde farklıdır. Ağzının büyüklüğüne rağmen yalnızca süzerek beslenir, dişleri hiçbir işe yaramaz.',
      en: 'The largest fish alive, its dark back marked with pale spots and lines in a pattern unique to each animal. For all the size of its mouth it only filters, and its teeth do nothing at all.',
    },
  },
  {
    id: 'ray',
    name: { tr: 'Vatoz', en: 'Ray' },
    scientificName: 'Batoidea',
    habitat: {
      tr: 'Kumlu deniz tabanı, resifler ve kıyı suları',
      en: 'Sandy seabed, reefs and coastal water',
    },
    diet: {
      tr: 'Kabuklu, yumuşakça ve dip balıkları',
      en: 'Crustaceans, molluscs and bottom fish',
    },
    size: { tr: '30 cm – 2 m genişlik', en: '30 cm – 2 m across' },
    description: {
      tr: 'Yassı gövdesi ve kanat gibi açılan göğüs yüzgeçleriyle tanınır; ağzı da solungaçları da alt tarafındadır. Kuma gömülüp yalnızca gözlerini dışarıda bırakarak avının geçmesini bekler.',
      en: 'A flattened body with pectoral fins spread like wings, its mouth and gills both underneath. It buries itself in sand with only the eyes showing and waits for prey to pass over.',
    },
  },
  {
    id: 'hammerhead',
    name: { tr: 'Çekiç Başlı Köpekbalığı', en: 'Hammerhead Shark' },
    scientificName: 'Sphyrnidae',
    habitat: {
      tr: 'Ilıman ve tropik kıyı suları ile resifler',
      en: 'Warm temperate and tropical coasts and reefs',
    },
    diet: { tr: 'Vatoz, balık ve mürekkepbalığı', en: 'Rays, fish and squid' },
    size: { tr: '1–6 m', en: '1–6 m' },
    description: {
      tr: 'Yanlara doğru uzayan çekiç biçimli başı ve iki ucundaki gözleriyle hiçbir balıkla karıştırılmaz. O genişlik, elektrik alıcılarını daha büyük bir alana yayarak kuma gömülü vatozu bulmasını sağlar.',
      en: 'The hammer-shaped head with an eye at each end is unmistakable. Spreading its electric receptors across that width is what lets it find rays buried in the sand.',
    },
  },
  {
    id: 'salmon',
    name: { tr: 'Somon', en: 'Atlantic Salmon' },
    scientificName: 'Salmo salar',
    habitat: {
      tr: 'Kuzey Atlantik; üremek için doğduğu nehir',
      en: 'The North Atlantic, and the river it hatched in to spawn',
    },
    diet: { tr: 'Kabuklu ve küçük balık', en: 'Crustaceans and small fish' },
    size: { tr: '70–150 cm', en: '70–150 cm' },
    description: {
      tr: 'Denizde gümüşidir; nehre girdiğinde koyulaşır ve erkeğinin alt çenesi kanca gibi kıvrılır. Doğduğu dereyi kokusundan tanır, binlerce kilometre sonra aynı çakıla döner.',
      en: 'Silver at sea, it darkens on entering fresh water and the male’s lower jaw hooks upward. It knows the stream it hatched in by smell, returning to the same gravel after thousands of kilometres.',
    },
  },
  {
    id: 'trout',
    name: { tr: 'Alabalık', en: 'Rainbow Trout' },
    scientificName: 'Oncorhynchus mykiss',
    habitat: {
      tr: 'Soğuk, oksijeni bol dere ve göller',
      en: 'Cold, well-oxygenated streams and lakes',
    },
    diet: { tr: 'Böcek, kurtçuk ve küçük balık', en: 'Insects, larvae and small fish' },
    size: { tr: '30–60 cm', en: '30–60 cm' },
    description: {
      tr: 'Yanları boyunca uzanan pembe bant ve gövdesini kaplayan siyah beneklerle tanınır. Serin ve temiz su ister; bir derede bulunması o suyun sağlıklı olduğunun işaretidir.',
      en: 'A pink band along each flank and black spots scattered over the body. It needs cool clean water, and finding it in a stream is a sign that the water is in good order.',
    },
  },
  {
    id: 'tuna',
    name: { tr: 'Ton Balığı', en: 'Tuna' },
    scientificName: 'Thunnus',
    habitat: { tr: 'Açık okyanuslar', en: 'The open ocean' },
    diet: { tr: 'Sürü balıkları ve mürekkepbalığı', en: 'Shoaling fish and squid' },
    size: { tr: '1–3 m', en: '1–3 m' },
    description: {
      tr: 'Mekik biçimli gövdesi ve hilal kuyruğuyla saatte yetmiş kilometreye ulaşır. Kas ısısını çevresindeki suyun üstünde tutabilen az sayıdaki balıktan biridir.',
      en: 'A spindle-shaped body and crescent tail carry it to seventy kilometres an hour. It is one of the few fish able to hold its muscle temperature above that of the water around it.',
    },
  },
  {
    id: 'bluefish',
    name: { tr: 'Lüfer', en: 'Bluefish' },
    scientificName: 'Pomatomus saltatrix',
    habitat: {
      tr: 'Ilıman kıyı suları; İstanbul Boğazı’nda mevsimlik',
      en: 'Temperate coastal water; seasonal through the Bosphorus',
    },
    diet: {
      tr: 'Hamsi, sardalya ve diğer sürü balıkları',
      en: 'Anchovy, sardine and other shoaling fish',
    },
    size: { tr: '25–70 cm', en: '25–70 cm' },
    description: {
      tr: 'Mavimsi yeşil sırtı, gümüş yanları ve keskin dişleriyle tanınır. Sürü hâlinde avlanırken yiyebileceğinden fazlasını parçalar; Türkçede her boyunda ayrı bir ad alır.',
      en: 'A blue-green back, silver flanks and a mouth of sharp teeth. Hunting in packs it cuts up more than it can eat, and in Turkish it takes a different name at every size it reaches.',
    },
  },
  {
    id: 'sea-bream',
    name: { tr: 'Çipura', en: 'Gilt-head Bream' },
    scientificName: 'Sparus aurata',
    habitat: {
      tr: 'Akdeniz ve Ege kıyıları, deniz çayırları',
      en: 'Mediterranean and Aegean coasts and seagrass beds',
    },
    diet: {
      tr: 'Yumuşakça, kabuklu ve deniz kestanesi',
      en: 'Molluscs, crustaceans and sea urchins',
    },
    size: { tr: '25–60 cm', en: '25–60 cm' },
    description: {
      tr: 'Gözlerinin arasındaki altın sarısı bant, adını aldığı işaretidir. Öğütücü dişleriyle midye kabuğunu kırar; hepsi erkek doğar, iki üç yaşında bir bölümü dişiye döner.',
      en: 'The gold band between its eyes is the mark it takes its name from. Grinding teeth let it crush mussel shells, and all of them hatch male, some turning female at two or three years old.',
    },
  },
  {
    id: 'sea-bass',
    name: { tr: 'Levrek', en: 'European Sea Bass' },
    scientificName: 'Dicentrarchus labrax',
    habitat: {
      tr: 'Kıyı suları, haliçler ve tuzlu bataklıklar',
      en: 'Coastal water, estuaries and salt marsh',
    },
    diet: { tr: 'Küçük balık, karides ve yengeç', en: 'Small fish, shrimp and crabs' },
    size: { tr: '40–80 cm', en: '40–80 cm' },
    description: {
      tr: 'Gümüş gövdesi, birbirinden ayrı iki sırt yüzgeci ve solungaç kapağındaki dikenle tanınır. Acı suya dayandığı için nehir ağızlarına kadar çıkar ve hem denizde hem haliçte avlanır.',
      en: 'A silver body, two separate dorsal fins and a spine on the gill cover. It tolerates brackish water and runs up into river mouths, so it is fished in the sea and the estuary alike.',
    },
  },
  {
    id: 'anchovy',
    name: { tr: 'Hamsi', en: 'European Anchovy' },
    scientificName: 'Engraulis encrasicolus',
    habitat: {
      tr: 'Karadeniz, Akdeniz ve Doğu Atlantik',
      en: 'The Black Sea, Mediterranean and eastern Atlantic',
    },
    diet: { tr: 'Plankton', en: 'Plankton' },
    size: { tr: '9–20 cm', en: '9–20 cm' },
    description: {
      tr: 'Gümüş yanları boyunca uzanan parlak bant ve alt çenesini aşan sivri burnuyla tanınır. Kışın Karadeniz’de dev sürüler kurar; Türkiye’de karaya çıkarılan balığın ağırlıkça yarısından çoğu budur.',
      en: 'A bright band along silver flanks and a pointed snout overhanging the lower jaw. It forms enormous winter shoals in the Black Sea, and makes up over half of all fish landed in Turkey by weight.',
    },
  },
  {
    id: 'horse-mackerel',
    name: { tr: 'İstavrit', en: 'Atlantic Horse Mackerel' },
    scientificName: 'Trachurus trachurus',
    habitat: {
      tr: 'Kıyı ve açık suda, dibe yakın',
      en: 'Coastal and offshore water, close to the bottom',
    },
    diet: { tr: 'Küçük balık, karides ve plankton', en: 'Small fish, shrimp and plankton' },
    size: { tr: '20–40 cm', en: '20–40 cm' },
    description: {
      tr: 'Yanları boyunca uzanan sert, keskin kemik plaka sırasıyla hemen tanınır; dikkatsiz bir el bu sırada kesilir. Gündüz dipte durur, gece beslenmek için yüzeye çıkar.',
      en: 'A row of hard, keeled bony scutes along each flank makes it instantly recognisable, and will cut a careless hand. It holds near the bottom by day and rises to feed at night.',
    },
  },
  {
    id: 'bonito',
    name: { tr: 'Palamut', en: 'Atlantic Bonito' },
    scientificName: 'Sarda sarda',
    habitat: {
      tr: 'Karadeniz, Marmara, Akdeniz ve Atlantik',
      en: 'The Black Sea, Marmara, Mediterranean and Atlantic',
    },
    diet: {
      tr: 'Hamsi, sardalya ve küçük sürü balıkları',
      en: 'Anchovy, sardine and other small shoaling fish',
    },
    size: { tr: '40–75 cm', en: '40–75 cm' },
    description: {
      tr: 'Sırtı boyunca uzanan eğik koyu çizgiler onu ton balığından ayırt ettirir. Sonbaharda Karadeniz’den Marmara’ya inen sürüleri, İstanbul’da mevsimin başladığının işaretidir.',
      en: 'The slanting dark stripes across its back separate it from a tuna. The autumn shoals running down from the Black Sea into the Marmara mark the opening of the season in Istanbul.',
    },
  },
  {
    id: 'sardine',
    name: { tr: 'Sardalya', en: 'European Pilchard' },
    scientificName: 'Sardina pilchardus',
    habitat: { tr: 'Kıyıya yakın açık sular', en: 'Inshore open water' },
    diet: { tr: 'Plankton', en: 'Plankton' },
    size: { tr: '15–25 cm', en: '15–25 cm' },
    description: {
      tr: 'Mavi-yeşil sırtı, gümüş karnı ve solungaç kapağındaki ışınsal ince çizgilerle tanınır. Sıkı sürüler kurar; sürünün topluca dönmesi ortak bir karar değil, her balığın komşusunu izlemesidir.',
      en: 'A blue-green back, silver belly and fine radiating lines on the gill cover. It shoals tightly, and the shoal turns as one not by decision but because each fish is watching its neighbour.',
    },
  },
  {
    id: 'carp',
    name: { tr: 'Sazan', en: 'Common Carp' },
    scientificName: 'Cyprinus carpio',
    habitat: {
      tr: 'Ilık, yavaş akan göl, gölet ve nehirler',
      en: 'Warm, slow-moving lakes, ponds and rivers',
    },
    diet: {
      tr: 'Dip omurgasızları, tohum ve su bitkileri',
      en: 'Bottom invertebrates, seeds and water plants',
    },
    size: { tr: '40–100 cm', en: '40–100 cm' },
    description: {
      tr: 'Kalın gövdesi, iri pulları ve üst dudağındaki iki çift bıyığıyla tanınır. Dibi karıştırarak beslendiği için bulunduğu suyu bulandırır ve su bitkilerini geriletir.',
      en: 'A thick body, large scales and two pairs of barbels on the upper lip. It feeds by stirring the bottom, which clouds the water it lives in and drives back the water plants.',
    },
  },
  {
    id: 'catfish',
    name: { tr: 'Yayın Balığı', en: 'Catfish' },
    scientificName: 'Siluriformes',
    habitat: {
      tr: 'Derin nehir çukurları, göller ve göletler',
      en: 'Deep river pools, lakes and ponds',
    },
    diet: { tr: 'Balık, kurbağa ve kabuklular', en: 'Fish, frogs and crustaceans' },
    size: { tr: '50 cm – 2.5 m', en: '50 cm – 2.5 m' },
    description: {
      tr: 'Pulsuz, kaygan derisi ve ağzının çevresindeki uzun bıyıklarıyla karıştırılmaz. O bıyıklar tat alma organıdır; bulanık suda avını hiç görmeden bulur.',
      en: 'Scaleless, slippery skin and long barbels around the mouth make it unmistakable. Those barbels carry taste buds, and it finds prey in muddy water without ever seeing it.',
    },
  },
  {
    id: 'goldfish',
    name: { tr: 'Japon Balığı', en: 'Goldfish' },
    scientificName: 'Carassius auratus',
    habitat: {
      tr: 'Süs havuzları ve akvaryumlar; kaçtığında göller',
      en: 'Ornamental ponds and aquaria; lakes where it escapes',
    },
    diet: {
      tr: 'Su bitkileri, kurtçuk ve dip omurgasızları',
      en: 'Water plants, larvae and bottom invertebrates',
    },
    size: { tr: '5–35 cm', en: '5–35 cm' },
    description: {
      tr: 'Bin yılı aşkın süre önce Çin’de gri bir sazandan seçilerek üretilmiş ilk evcil süs balığıdır. Bir havuza bırakıldığında hızla irileşir ve birkaç kuşakta yabani rengine geri döner.',
      en: 'The first ornamental fish ever domesticated, bred in China over a thousand years ago from a grey wild carp. Released into a pond it grows large quickly and reverts to its wild colour within a few generations.',
    },
  },
  {
    id: 'betta',
    name: { tr: 'Beta Balığı', en: 'Siamese Fighting Fish' },
    scientificName: 'Betta splendens',
    habitat: {
      tr: 'Tayland ve Kamboçya’da sığ pirinç tarlaları',
      en: 'Shallow rice paddies in Thailand and Cambodia',
    },
    diet: {
      tr: 'Su yüzeyindeki böcek ve kurtçuklar',
      en: 'Insects and larvae taken at the surface',
    },
    size: { tr: '5–7 cm', en: '5–7 cm' },
    description: {
      tr: 'Erkeğinin yelpaze gibi açılan uzun yüzgeçleri ve yoğun rengi seçilerek üretilmiştir; yabanisi soluk ve kısa yüzgeçlidir. Labirent organı sayesinde oksijeni doğrudan havadan alabilir.',
      en: 'The male’s long fanned fins and heavy colour are the work of selection; the wild fish is dull and short-finned. A labyrinth organ lets it take oxygen straight from the air.',
    },
  },
  {
    id: 'angelfish',
    name: { tr: 'Melek Balığı', en: 'Freshwater Angelfish' },
    scientificName: 'Pterophyllum scalare',
    habitat: {
      tr: 'Amazon havzasında yavaş akan, bitkili sular',
      en: 'Slow, densely planted water of the Amazon basin',
    },
    diet: {
      tr: 'Küçük omurgasızlar ve balık yavrusu',
      en: 'Small invertebrates and fry',
    },
    size: { tr: '15 cm boy, 20 cm yükseklik', en: '15 cm long, 20 cm tall' },
    description: {
      tr: 'Yanlardan basık üçgen gövdesi ve uzun sırt-anal yüzgeçleriyle su bitkilerinin arasında dik durur. Bu biçim hız için değil, saz aralarında görünmez kalmak içindir.',
      en: 'A tall triangular body flattened side to side, with long dorsal and anal fins, held upright among water plants. The shape is not built for speed but for going unseen between stems.',
    },
  },
  {
    id: 'clownfish',
    name: { tr: 'Palyaço Balığı', en: 'Clownfish' },
    scientificName: 'Amphiprioninae',
    habitat: {
      tr: 'Sığ tropik resiflerdeki deniz şakayıkları',
      en: 'Sea anemones on shallow tropical reefs',
    },
    diet: {
      tr: 'Plankton, alg ve şakayıktan artan besin',
      en: 'Plankton, algae and scraps left by the anemone',
    },
    size: { tr: '7–15 cm', en: '7–15 cm' },
    description: {
      tr: 'Turuncu gövdesindeki beyaz bantlarla tanınır ve ömrünü tek bir deniz şakayığında geçirir. Vücudunu kaplayan mukus, şakayığın yakıcı hücrelerinin onu kendinden saymasını sağlar.',
      en: 'White bands on an orange body, and a life spent inside a single sea anemone. A coat of mucus makes the anemone’s stinging cells treat it as part of themselves.',
    },
  },
  {
    id: 'moray-eel',
    name: { tr: 'Müren', en: 'Moray Eel' },
    scientificName: 'Muraenidae',
    habitat: {
      tr: 'Resif ve kayalık kıyılardaki oyuklar',
      en: 'Crevices in reefs and rocky coasts',
    },
    diet: { tr: 'Balık, ahtapot ve kabuklular', en: 'Fish, octopus and crustaceans' },
    size: { tr: '0.5–3 m', en: '0.5–3 m' },
    description: {
      tr: 'Deliğinden yalnızca başını çıkarır; ağzını sürekli açıp kapaması tehdit değil, solunumdur. Boğazında ikinci bir çene taşır ve yakaladığı avı içeri çekmek için onu öne uzatır.',
      en: 'Only the head shows from its hole, and the constant opening of the mouth is breathing, not threat. A second set of jaws in its throat comes forward to drag caught prey inward.',
    },
  },
  {
    id: 'anglerfish',
    name: { tr: 'Fener Balığı', en: 'Anglerfish' },
    scientificName: 'Lophiiformes',
    habitat: {
      tr: 'Derin okyanusun ışık almayan katmanları',
      en: 'The deep ocean, below the reach of light',
    },
    diet: {
      tr: 'Yeterince yaklaşan her balık',
      en: 'Whatever fish comes close enough',
    },
    size: { tr: '5–120 cm', en: '5–120 cm' },
    description: {
      tr: 'Başından öne uzanan çubuğun ucunda bir ışık taşır; bu ışığı balık değil, orada yaşayan bakteriler üretir. Bazı türlerinde cüce erkek dişiye yapışır ve dokuları kalıcı olarak kaynaşır.',
      en: 'A rod extends from its head with a light at the tip, made not by the fish but by bacteria living in it. In some species the dwarf male attaches to the female and their tissues fuse for good.',
    },
  },
  {
    id: 'flying-fish',
    name: { tr: 'Uçan Balık', en: 'Flying Fish' },
    scientificName: 'Exocoetidae',
    habitat: {
      tr: 'Tropik ve ılıman okyanusların yüzeyi',
      en: 'The surface of tropical and warm oceans',
    },
    diet: { tr: 'Plankton ve küçük kabuklular', en: 'Plankton and small crustaceans' },
    size: { tr: '15–45 cm', en: '15–45 cm' },
    description: {
      tr: 'Kanat gibi genişlemiş göğüs yüzgeçleriyle sudan çıkıp elli metreye kadar süzülür. Kanat çırpmaz; kuyruğunun alt lobunu yüzeye vurarak hızını korur.',
      en: 'Pectoral fins spread like wings carry it clear of the water for glides of up to fifty metres. It does not flap: it beats the lower lobe of its tail against the surface to keep going.',
    },
  },
  {
    id: 'seahorse',
    name: { tr: 'Deniz Atı', en: 'Seahorse' },
    scientificName: 'Hippocampus',
    habitat: {
      tr: 'Deniz çayırları, mercanlar ve sığ kıyı otları',
      en: 'Seagrass beds, coral and shallow inshore weed',
    },
    diet: { tr: 'Kopepod ve minik kabuklular', en: 'Copepods and tiny crustaceans' },
    size: { tr: '2–35 cm', en: '2–35 cm' },
    description: {
      tr: 'Dik duran gövdesi, at başını andıran uzun burnu ve sarılmaya yarayan kuyruğuyla karıştırılmaz. Yumurtalar erkeğin karnındaki kesede gelişir; doğuran erkektir.',
      en: 'An upright body, a long horse-like snout and a tail made for gripping. The eggs develop in a pouch on the male’s belly, and it is the male that gives birth.',
    },
  },
  {
    id: 'piranha',
    name: { tr: 'Pirana', en: 'Red-bellied Piranha' },
    scientificName: 'Pygocentrus nattereri',
    habitat: {
      tr: 'Amazon havzasının nehirleri ve taşkın ovaları',
      en: 'Rivers and floodplains of the Amazon basin',
    },
    diet: { tr: 'Balık, böcek, meyve ve leş', en: 'Fish, insects, fruit and carrion' },
    size: { tr: '15–35 cm', en: '15–35 cm' },
    description: {
      tr: 'Kırmızı karnı ve üçgen, ustura keskinliğindeki dişleriyle tanınır. Ününün aksine çoğunlukla balık ve leşle beslenir; sürü kurması saldırı için değil, savunma içindir.',
      en: 'A red belly and triangular, razor-edged teeth. Despite its reputation it feeds mostly on fish and carrion, and it gathers in shoals for defence rather than for attack.',
    },
  },
  {
    id: 'swordfish',
    name: { tr: 'Kılıç Balığı', en: 'Swordfish' },
    scientificName: 'Xiphias gladius',
    habitat: {
      tr: 'Açık okyanus; gündüz derinde, gece yüzeyde',
      en: 'The open ocean, deep by day and at the surface at night',
    },
    diet: { tr: 'Mürekkepbalığı ve sürü balıkları', en: 'Squid and shoaling fish' },
    size: { tr: '2–4.5 m', en: '2–4.5 m' },
    description: {
      tr: 'Üst çenesi uzayarak yassı, kılıç biçimli bir uzantıya dönüşür; erişkininde ne pul ne diş kalır. Gözlerini ve beynini ısıtabildiği için soğuk derinlikte de keskin görür.',
      en: 'The upper jaw extends into a flat sword, and the adult keeps neither scales nor teeth. It can warm its eyes and brain, so it still sees sharply in the cold at depth.',
    },
  },
  {
    id: 'sturgeon',
    name: { tr: 'Mersin Balığı', en: 'Sturgeon' },
    scientificName: 'Acipenser',
    habitat: { tr: 'Nehir, haliç ve iç denizler', en: 'Rivers, estuaries and inland seas' },
    diet: {
      tr: 'Dip omurgasızları ve küçük balık',
      en: 'Bottom invertebrates and small fish',
    },
    size: { tr: '1–5 m', en: '1–5 m' },
    description: {
      tr: 'Pul yerine sırtı boyunca kemik plaka sıraları taşır ve ağzı burnunun altındadır. İki yüz milyon yıldır neredeyse hiç değişmemiştir; havyar talebi türlerinin çoğunu tükenmenin eşiğine getirmiştir.',
      en: 'Rows of bony plates instead of scales, and a mouth set underneath the snout. It has barely changed in two hundred million years, and demand for its roe has brought most species to the edge.',
    },
  },
  {
    id: 'eel',
    name: { tr: 'Yılan Balığı', en: 'Eel' },
    scientificName: 'Anguilliformes',
    habitat: {
      tr: 'Nehir ve haliçler; üremek için açık okyanus',
      en: 'Rivers and estuaries; the open ocean to spawn',
    },
    diet: { tr: 'Balık, kabuklu ve solucan', en: 'Fish, crustaceans and worms' },
    size: { tr: '40–150 cm', en: '40–150 cm' },
    description: {
      tr: 'Yılan gibi uzun gövdesi ve sırttan kuyruğa kesintisiz uzanan tek yüzgeciyle tanınır. Avrupa yılan balığı üremek için Atlantik’i geçip Sargasso Denizi’ne gider ve bir daha dönmez.',
      en: 'A snake-like body and a single fin running unbroken from back to tail. The European eel crosses the Atlantic to spawn in the Sargasso Sea, and never comes back.',
    },
  },
  {
    id: 'sole',
    name: { tr: 'Dil Balığı', en: 'Sole' },
    scientificName: 'Soleidae',
    habitat: {
      tr: 'Kıyıya yakın sığ, kumlu deniz tabanı',
      en: 'Shallow sandy seabed close to the coast',
    },
    diet: { tr: 'Solucan, kabuklu ve yumuşakça', en: 'Worms, crustaceans and molluscs' },
    size: { tr: '25–50 cm', en: '25–50 cm' },
    description: {
      tr: 'Yavruyken simetrik ve dik yüzer; büyürken bir gözü kafasının öbür yanına göç eder ve balık yan yatar. Üstünde durduğu kumun rengine göre desenini değiştirerek dibe karışır.',
      en: 'The young fish swims upright and symmetrical; as it grows one eye migrates across the head and the fish lies down on its side. It changes its pattern to match the sand it settles on.',
    },
  },
  {
    id: 'red-mullet',
    name: { tr: 'Barbun', en: 'Red Mullet' },
    scientificName: 'Mullus barbatus',
    habitat: {
      tr: 'Akdeniz ve Karadeniz’de çamurlu, kumlu dip',
      en: 'Muddy and sandy bottoms of the Mediterranean and Black Sea',
    },
    diet: {
      tr: 'Solucan, kabuklu ve küçük yumuşakçalar',
      en: 'Worms, crustaceans and small molluscs',
    },
    size: { tr: '15–30 cm', en: '15–30 cm' },
    description: {
      tr: 'Pembemsi kırmızı gövdesi ve çenesinin altındaki bir çift uzun bıyığıyla tanınır. Bu bıyıkları çamura sokup avını yoklayarak arar; rengi tazeyken canlı, bekledikçe soluktur.',
      en: 'A pinkish red body and a pair of long barbels beneath the chin. It probes the mud with them to find prey, and its colour is vivid when fresh and fades as it sits.',
    },
  },
];
