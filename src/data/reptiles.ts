import type { AnimalEntry } from '@/types';

/**
 * Reptilia, written to the handbook's entry template: habitat, diet and size as
 * the three facts, then two sentences — how it is told apart in the field, and
 * the one thing about it worth carrying away.
 *
 * The `id` of an entry is what its photograph and its credit are filed under,
 * so ids are fixed. Names, facts and prose can be revised; ids cannot.
 */
export const reptiles: AnimalEntry[] = [
  {
    id: 'chameleon',
    name: { tr: 'Bukalemun', en: 'Chameleon' },
    scientificName: 'Chamaeleonidae',
    habitat: {
      tr: 'Afrika ve Madagaskar’da ağaçlık ve çalılık',
      en: 'Trees and scrub in Africa and Madagascar',
    },
    diet: { tr: 'Böcek ve örümcek', en: 'Insects and spiders' },
    size: { tr: '3–70 cm', en: '3–70 cm' },
    description: {
      tr: 'Birbirinden bağımsız dönen gözleri, sarılan kuyruğu ve kıskaç gibi ayaklarıyla karıştırılmaz. Renk değiştirmesi çevreye uymak için değil; ısısını ayarlamak ve ruh hâlini bildirmek içindir.',
      en: 'Eyes that turn independently, a gripping tail and pincer-like feet make it unmistakable. It changes colour not to match its background but to control its temperature and signal its mood.',
    },
  },
  {
    id: 'iguana',
    name: { tr: 'Yeşil İguana', en: 'Green Iguana' },
    scientificName: 'Iguana iguana',
    habitat: {
      tr: 'Orta ve Güney Amerika’da nehir kenarı ağaçları',
      en: 'Riverside trees in Central and South America',
    },
    diet: { tr: 'Yaprak, çiçek ve meyve', en: 'Leaves, flowers and fruit' },
    size: { tr: '1.5–2 m', en: '1.5–2 m' },
    description: {
      tr: 'Sırtı boyunca uzanan diken sırası ve çenesinin altındaki geniş gerdanıyla tanınır. Tehdit altında daldan doğrudan suya atlar; on metrelik bir düşüşü yaralanmadan kaldırır.',
      en: 'A row of spines down the back and a broad flap of skin under the chin. Threatened, it drops from the branch straight into the water, taking a ten-metre fall without harm.',
    },
  },
  {
    id: 'komodo-dragon',
    name: { tr: 'Komodo Ejderi', en: 'Komodo Dragon' },
    scientificName: 'Varanus komodoensis',
    habitat: {
      tr: 'Endonezya’da birkaç adanın kuru ormanları',
      en: 'Dry forest on a handful of Indonesian islands',
    },
    diet: { tr: 'Geyik, yaban domuzu ve leş', en: 'Deer, wild boar and carrion' },
    size: { tr: '2–3 m', en: '2–3 m' },
    description: {
      tr: 'Yaşayan en büyük kertenkeledir; ağır gövdesi ve havayı sürekli yoklayan çatal diliyle tanınır. Isırığı zehirlidir: alt çenesindeki bezler kanın pıhtılaşmasını engelleyen bir salgı bırakır.',
      en: 'The largest lizard alive, heavy-bodied with a forked tongue constantly testing the air. Its bite is venomous — glands in the lower jaw deliver a secretion that stops the blood clotting.',
    },
  },
  {
    id: 'green-sea-turtle',
    name: { tr: 'Yeşil Deniz Kaplumbağası', en: 'Green Sea Turtle' },
    scientificName: 'Chelonia mydas',
    habitat: {
      tr: 'Tropik denizler; Akdeniz kumsallarında yuvalar',
      en: 'Tropical seas, nesting on Mediterranean beaches',
    },
    diet: { tr: 'Deniz çayırı ve alg', en: 'Seagrass and algae' },
    size: { tr: '1–1.2 m kabuk', en: '1–1.2 m shell' },
    description: {
      tr: 'Erişkini otçul olan tek deniz kaplumbağasıdır ve adını kabuğundan değil, yağının yeşilliğinden alır. Türkiye’nin Akdeniz kumsallarına yumurtlar; her dişi doğduğu kuma geri döner.',
      en: 'The only sea turtle that is herbivorous as an adult, named for the green of its fat rather than its shell. It nests on Turkey’s Mediterranean beaches, each female returning to the sand she hatched on.',
    },
  },
  {
    id: 'nile-crocodile',
    name: { tr: 'Nil Timsahı', en: 'Nile Crocodile' },
    scientificName: 'Crocodylus niloticus',
    habitat: {
      tr: 'Afrika’da nehir, göl ve sulak alanlar',
      en: 'Rivers, lakes and wetlands across Africa',
    },
    diet: {
      tr: 'Balık, antilop, suya inen her şey',
      en: 'Fish, antelope, whatever comes down to drink',
    },
    size: { tr: '3.5–5 m', en: '3.5–5 m' },
    description: {
      tr: 'Ağzı kapalıyken alt çenesinin dördüncü dişi dışarıda kalır; aligatorda kalmaz, ikisini ayırmanın yolu budur. Yumurtaların erkek mi dişi mi olacağını kumun sıcaklığı belirler.',
      en: 'With the mouth shut the fourth tooth of the lower jaw stays visible, where an alligator’s does not — this is how the two are told apart. The temperature of the sand decides the sex of the eggs.',
    },
  },
  {
    id: 'american-alligator',
    name: { tr: 'Amerikan Aligatoru', en: 'American Alligator' },
    scientificName: 'Alligator mississippiensis',
    habitat: {
      tr: 'Güneydoğu ABD’de bataklık, sazlık ve nehirler',
      en: 'Swamps, marshes and rivers of the southeastern US',
    },
    diet: {
      tr: 'Balık, kaplumbağa, kuş ve memeli',
      en: 'Fish, turtles, birds and mammals',
    },
    size: { tr: '3–4.5 m', en: '3–4.5 m' },
    description: {
      tr: 'Geniş, küt burnu ve ağzı kapalıyken görünmeyen alt dişleriyle timsahtan ayrılır. Kazdığı çukurlar kuraklıkta su tutar ve bataklığın bütün öteki hayvanlarını ayakta tutar.',
      en: 'A broad, blunt snout and lower teeth hidden when the mouth is closed separate it from a crocodile. The holes it digs hold water through drought and keep the rest of the swamp alive.',
    },
  },
  {
    id: 'king-cobra',
    name: { tr: 'Kral Kobra', en: 'King Cobra' },
    scientificName: 'Ophiophagus hannah',
    habitat: {
      tr: 'Güney ve Güneydoğu Asya’da orman ve bambuluk',
      en: 'Forest and bamboo thicket in south and southeast Asia',
    },
    diet: { tr: 'Neredeyse yalnızca başka yılanlar', en: 'Almost entirely other snakes' },
    size: { tr: '3–5.5 m', en: '3–5.5 m' },
    description: {
      tr: 'Dünyanın en uzun zehirli yılanıdır; tehdit altında gövdesinin üçte birini dikip başlığını açar. Yumurtaları için yaprak yığınından yuva yapan tek yılandır.',
      en: 'The longest venomous snake in the world; threatened, it raises a third of its body and spreads its hood. It is the only snake that builds a nest of leaves for its eggs.',
    },
  },
  {
    id: 'anaconda',
    name: { tr: 'Yeşil Anakonda', en: 'Green Anaconda' },
    scientificName: 'Eunectes murinus',
    habitat: {
      tr: 'Amazon havzasında yavaş nehir ve bataklıklar',
      en: 'Slow rivers and swamps of the Amazon basin',
    },
    diet: { tr: 'Kapibara, kayman ve balık', en: 'Capybara, caiman and fish' },
    size: { tr: '4–6 m', en: '4–6 m' },
    description: {
      tr: 'Ağırlıkça yaşayan en iri yılandır; gözleri ve burun delikleri başının üstündedir, böylece gövdesi su altındayken çevreyi gözler. Zehirsizdir, avını gövdesiyle sararak öldürür.',
      en: 'The heaviest snake alive, with eyes and nostrils set on top of the head so it can watch while its body stays submerged. It has no venom and kills by constriction.',
    },
  },
  {
    id: 'python',
    name: { tr: 'Burma Pitonu', en: 'Burmese Python' },
    scientificName: 'Python bivittatus',
    habitat: {
      tr: 'Güneydoğu Asya’da yağmur ormanı ve sulak alan',
      en: 'Rainforest and wetland in southeast Asia',
    },
    diet: { tr: 'Kuş ve memeli', en: 'Birds and mammals' },
    size: { tr: '3–5 m', en: '3–5 m' },
    description: {
      tr: 'Sırtındaki koyu kenarlı düzensiz lekeler ve üst dudağı boyunca dizili ısı çukurlarıyla tanınır. O çukurlar sıcakkanlı bir avın ısısını zifiri karanlıkta bile algılar.',
      en: 'Irregular dark-edged blotches down the back, and heat pits set along the upper lip. Those pits read the warmth of a warm-blooded animal in complete darkness.',
    },
  },
  {
    id: 'rattlesnake',
    name: { tr: 'Çıngıraklı Yılan', en: 'Rattlesnake' },
    scientificName: 'Crotalus',
    habitat: {
      tr: 'Amerika’da çöl, bozkır ve çalılık',
      en: 'Desert, prairie and scrub across the Americas',
    },
    diet: { tr: 'Kemirgen, kertenkele ve kuş', en: 'Rodents, lizards and birds' },
    size: { tr: '0.6–2.4 m', en: '0.6–2.4 m' },
    description: {
      tr: 'Kuyruğunun ucundaki boynuzsu halkalar birbirine çarparak uyarı sesini çıkarır; her deri değişiminde bir halka eklenir. Isırmak son çaresidir, önce sesle uyarır.',
      en: 'Horny rings at the tail tip knock together to make the warning, and a new ring is added at every moult. Biting is a last resort; the sound comes first.',
    },
  },
  {
    id: 'black-mamba',
    name: { tr: 'Kara Mamba', en: 'Black Mamba' },
    scientificName: 'Dendroaspis polylepis',
    habitat: {
      tr: 'Doğu ve Güney Afrika’da savan ve kayalık tepeler',
      en: 'Savanna and rocky hills of east and southern Africa',
    },
    diet: { tr: 'Kemirgen, kuş ve küçük memeli', en: 'Rodents, birds and small mammals' },
    size: { tr: '2–3 m', en: '2–3 m' },
    description: {
      tr: 'Derisi kara değil, zeytin grisidir; adı ağzının içindeki mürekkep karası renkten gelir. Afrika’nın en hızlı yılanıdır ve kısa mesafede saatte yirmi kilometreye ulaşır.',
      en: 'Its skin is olive-grey, not black; the name comes from the ink-black inside of its mouth. It is the fastest snake in Africa, reaching twenty kilometres an hour over a short run.',
    },
  },
  {
    id: 'boa-constrictor',
    name: { tr: 'Boa Yılanı', en: 'Boa Constrictor' },
    scientificName: 'Boa constrictor',
    habitat: {
      tr: 'Orta ve Güney Amerika’da yağmur ve kuru ormanlar',
      en: 'Rainforest and dry forest in Central and South America',
    },
    diet: { tr: 'Kuş, kemirgen ve yarasa', en: 'Birds, rodents and bats' },
    size: { tr: '2–3 m', en: '2–3 m' },
    description: {
      tr: 'Kuyruğa doğru koyulaşan eyer biçimli sırt lekeleriyle tanınır. Avını sıkarken kemik kırmaz; her nefes verişte halkasını biraz daha daraltarak kan dolaşımını durdurur.',
      en: 'Saddle-shaped blotches down the back that darken toward the tail. It does not crush bones: with every breath its prey lets out, the coil tightens, until the blood stops moving.',
    },
  },
  {
    id: 'gecko',
    name: { tr: 'Geko', en: 'Gecko' },
    scientificName: 'Gekkonidae',
    habitat: {
      tr: 'Sıcak bölgelerde kaya, ağaç gövdesi ve ev duvarları',
      en: 'Rock, tree trunks and house walls in warm regions',
    },
    diet: { tr: 'Böcek ve örümcek', en: 'Insects and spiders' },
    size: { tr: '3–35 cm', en: '3–35 cm' },
    description: {
      tr: 'Ayak tabanındaki milyonlarca mikroskobik kıl, camda bile baş aşağı durmasını sağlar; ne yapıştırıcı ne vantuz kullanır. Çoğu türünde göz kapağı yoktur, gözünü diliyle temizler.',
      en: 'Millions of microscopic hairs on the toe pads hold it upside down even on glass, with no glue and no suction. Most species have no eyelids and clean the eye with the tongue.',
    },
  },
  {
    id: 'tortoise',
    name: { tr: 'Kara Kaplumbağası', en: 'Tortoise' },
    scientificName: 'Testudinidae',
    habitat: { tr: 'Kuru orman, makilik ve bozkır', en: 'Dry woodland, maquis and steppe' },
    diet: { tr: 'Ot, yaprak ve yabani meyve', en: 'Grasses, leaves and wild fruit' },
    size: { tr: '15–120 cm', en: '15–120 cm' },
    description: {
      tr: 'Kubbeli kabuğu ve fil ayağını andıran sütun bacaklarıyla su kaplumbağasından ayrılır; yüzemez. Türkiye’nin makiliklerinde ilkbaharda erkeklerin kabuk tokuşturma sesi sık duyulur.',
      en: 'A domed shell and stumpy, elephantine legs separate it from a water turtle, and it cannot swim. In Turkish maquis the knock of males butting shells is a common sound in spring.',
    },
  },
  {
    id: 'freshwater-turtle',
    name: { tr: 'Tatlısu Kaplumbağası', en: 'Pond Turtle' },
    scientificName: 'Emydidae',
    habitat: { tr: 'Göl, gölet ve yavaş dereler', en: 'Lakes, ponds and slow streams' },
    diet: { tr: 'Balık, kurbağa ve su bitkisi', en: 'Fish, frogs and water plants' },
    size: { tr: '12–30 cm kabuk', en: '12–30 cm shell' },
    description: {
      tr: 'Yassı kabuğu ve perdeli ayaklarıyla kara kaplumbağasından ayrılır. Güneşli günlerde bir kütüğe üst üste dizilmesi tembellik değil; ısısını ve D vitaminini böyle ayarlar.',
      en: 'A flattened shell and webbed feet separate it from a tortoise. Stacking up on a log in the sun is not idleness — it is how the animal manages its temperature and its vitamin D.',
    },
  },
  {
    id: 'galapagos-tortoise',
    name: { tr: 'Galapagos Dev Kaplumbağası', en: 'Galápagos Giant Tortoise' },
    scientificName: 'Chelonoidis niger',
    habitat: {
      tr: 'Galápagos Adaları’nın kurak yaylaları',
      en: 'The arid highlands of the Galápagos Islands',
    },
    diet: { tr: 'Kaktüs, ot ve yaprak', en: 'Cactus, grasses and leaves' },
    size: { tr: '1.2–1.8 m', en: '1.2–1.8 m' },
    description: {
      tr: 'Kara kaplumbağalarının en irisidir ve yüz yılı aşan ömrüyle bilinir. Kabuk biçimi adadan adaya değişir; bu fark, Darwin’i türlerin ayrışması üzerine düşündüren gözlemlerden biridir.',
      en: 'The largest tortoise alive, and known for living past a hundred years. Shell shape differs from island to island, one of the observations that set Darwin thinking about how species diverge.',
    },
  },
  {
    id: 'agama',
    name: { tr: 'Agama', en: 'Agama' },
    scientificName: 'Agamidae',
    habitat: {
      tr: 'Afrika ve Asya’da kayalık, taşlık ve duvar dipleri',
      en: 'Rock, stony ground and wall footings in Africa and Asia',
    },
    diet: { tr: 'Böcek, çiçek ve tohum', en: 'Insects, flowers and seeds' },
    size: { tr: '15–40 cm', en: '15–40 cm' },
    description: {
      tr: 'Erkeğinin üreme mevsimindeki turuncu başı ve mavi gövdesi uzaktan seçilir; dişi donuk kahverengi kalır. Kayanın üstünde hızlı hızlı baş sallaması bir sınır bildirisidir.',
      en: 'In the breeding season the male’s orange head and blue body carry a long way, while the female stays dull brown. The rapid head-bobbing on a rock is a statement about territory.',
    },
  },
  {
    id: 'lacerta',
    name: { tr: 'Çayır Kertenkelesi', en: 'Sand Lizard' },
    scientificName: 'Lacerta agilis',
    habitat: {
      tr: 'Çayır, orman kenarı ve kumlu banklar',
      en: 'Meadows, woodland edges and sandy banks',
    },
    diet: { tr: 'Böcek ve örümcek', en: 'Insects and spiders' },
    size: { tr: '18–25 cm', en: '18–25 cm' },
    description: {
      tr: 'Sırtında sıralı beyaz lekeler taşır; üreme mevsiminde erkeğinin yanları parlak yeşile döner. Yakalandığında kuyruğunu bırakır ve kopan kuyruk kıvranarak avcının dikkatini üstüne çeker.',
      en: 'Rows of white ocelli down the back, and flanks that turn bright green on the male in the breeding season. Caught, it sheds its tail, and the writhing tail holds the predator’s attention.',
    },
  },
  {
    id: 'monitor',
    name: { tr: 'Varan', en: 'Monitor Lizard' },
    scientificName: 'Varanus',
    habitat: {
      tr: 'Afrika, Asya ve Avustralya’da orman, savan ve su kenarı',
      en: 'Forest, savanna and waterside in Africa, Asia and Australia',
    },
    diet: {
      tr: 'Yumurta, kemirgen, balık ve leş',
      en: 'Eggs, rodents, fish and carrion',
    },
    size: { tr: '20 cm – 3 m', en: '20 cm – 3 m' },
    description: {
      tr: 'Uzun boynu, ağır pençeleri ve havayı sürekli yoklayan çatal diliyle tanınır. Kertenkeleler arasında dayanıklılığı en yüksek olandır; çoğu türü koşarken bile nefes almayı sürdürür.',
      en: 'A long neck, heavy claws and a forked tongue constantly flicking out. It has more stamina than any other lizard: most species can keep breathing while they run.',
    },
  },
  {
    id: 'viper',
    name: { tr: 'Engerek', en: 'Viper' },
    scientificName: 'Viperidae',
    habitat: {
      tr: 'Taşlık yamaç, çalılık ve orman kenarı',
      en: 'Stony slopes, scrub and woodland edges',
    },
    diet: { tr: 'Kemirgen, kertenkele ve kuş', en: 'Rodents, lizards and birds' },
    size: { tr: '40–150 cm', en: '40–150 cm' },
    description: {
      tr: 'Üçgen başı, dikey göz bebeği ve kısa kalın gövdesiyle zehirsiz yılanlardan ayrılır. Zehir dişleri ağzı kapalıyken damağa katlanır, ısırırken öne devrilir.',
      en: 'A triangular head, a vertical pupil and a short thick body separate it from the harmless snakes. Its fangs fold back against the roof of the mouth and swing forward as it strikes.',
    },
  },
  {
    id: 'coral-snake',
    name: { tr: 'Mercan Yılanı', en: 'Coral Snake' },
    scientificName: 'Micrurus',
    habitat: {
      tr: 'Amerika’da orman tabanı ve yaprak çürüntüsü',
      en: 'Forest floor and leaf litter across the Americas',
    },
    diet: { tr: 'Başka yılanlar ve kertenkeleler', en: 'Other snakes and lizards' },
    size: { tr: '50–100 cm', en: '50–100 cm' },
    description: {
      tr: 'Kırmızı, sarı ve siyah halkalarla kaplıdır; kırmızının sarıya değmesi onu zararsız taklitçilerinden ayırır. Zehiri güçlüdür ama dişleri kısadır, bu yüzden ısırmak yerine kaçmayı yeğler.',
      en: 'Ringed in red, yellow and black, with red touching yellow — the detail that separates it from its harmless mimics. Its venom is powerful but its fangs are short, so it would rather flee than bite.',
    },
  },
  {
    id: 'caiman',
    name: { tr: 'Kayman', en: 'Caiman' },
    scientificName: 'Caiman',
    habitat: {
      tr: 'Orta ve Güney Amerika’da nehir ve bataklıklar',
      en: 'Rivers and swamps of Central and South America',
    },
    diet: { tr: 'Balık, kuş ve kabuklular', en: 'Fish, birds and crustaceans' },
    size: { tr: '1.5–2.5 m', en: '1.5–2.5 m' },
    description: {
      tr: 'Timsahların en küçük koludur; göz kapaklarının üstünden geçen kemik köprüyle aligatordan ayrılır. Geceleyin gözlerine tutulan ışık kırmızı yansır, sazlıkta sayımı böyle yapılır.',
      en: 'The smallest branch of the crocodilians, told from an alligator by a bony ridge across the eyelids. At night its eyes throw back a red shine, which is how they are counted in the reeds.',
    },
  },
  {
    id: 'gharial',
    name: { tr: 'Gavyal', en: 'Gharial' },
    scientificName: 'Gavialis gangeticus',
    habitat: {
      tr: 'Hint yarımadasında derin, akıntılı nehirler',
      en: 'Deep, flowing rivers of the Indian subcontinent',
    },
    diet: { tr: 'Neredeyse yalnızca balık', en: 'Almost entirely fish' },
    size: { tr: '3.5–6 m', en: '3.5–6 m' },
    description: {
      tr: 'İnce, uzun ve dişlerle dolu burnu onu her timsahtan ayırır; bu burun suda yandan savrularak balık yakalamak için biçimlenmiştir. Erkeğinin burun ucundaki topak sesini büyütür.',
      en: 'A long, needle-thin snout crowded with teeth, shaped for sweeping sideways through water after fish. The knob on the tip of the male’s snout amplifies his call.',
    },
  },
  {
    id: 'tuatara',
    name: { tr: 'Tuatara', en: 'Tuatara' },
    scientificName: 'Sphenodon punctatus',
    habitat: {
      tr: 'Yeni Zelanda’da birkaç açık deniz adası',
      en: 'A handful of offshore islands in New Zealand',
    },
    diet: {
      tr: 'Böcek, kertenkele ve kuş yumurtası',
      en: 'Insects, lizards and birds’ eggs',
    },
    size: { tr: '50–80 cm', en: '50–80 cm' },
    description: {
      tr: 'Kertenkeleye benzer ama kertenkele değildir: kendi takımından yaşayan tek türdür, en yakın akrabaları iki yüz milyon yıl önce tükenmiştir. Yavrusunun alnında ışığa duyarlı üçüncü bir göz bulunur.',
      en: 'It looks like a lizard but is not one: it is the only living member of its own order, whose nearest relatives died out two hundred million years ago. The young carry a light-sensitive third eye on the forehead.',
    },
  },
  {
    id: 'blue-tongued-skink',
    name: { tr: 'Mavi Dilli Skink', en: 'Blue-tongued Skink' },
    scientificName: 'Tiliqua scincoides',
    habitat: {
      tr: 'Avustralya’da açık orman, çayır ve bahçeler',
      en: 'Open woodland, grassland and gardens in Australia',
    },
    diet: { tr: 'Sümüklüböcek, böcek ve meyve', en: 'Snails, insects and fruit' },
    size: { tr: '45–60 cm', en: '45–60 cm' },
    description: {
      tr: 'Silindirik gövdesini zar zor kaldıran kısa bacaklarıyla neredeyse yılan gibi ilerler. Tehdit altında ağzını açıp parlak mavi dilini çıkarır; bu blöf çoğu avcıyı geri döndürür.',
      en: 'A cylindrical body on legs so short they barely lift it, so it moves almost as a snake does. Threatened, it opens its mouth and shows a startling blue tongue, and the bluff turns most predators back.',
    },
  },
  {
    id: 'horned-lizard',
    name: { tr: 'Boynuzlu Kertenkele', en: 'Horned Lizard' },
    scientificName: 'Phrynosoma',
    habitat: {
      tr: 'Kuzey Amerika’da çöl ve kurak çalılık',
      en: 'Desert and dry scrub in North America',
    },
    diet: { tr: 'Neredeyse yalnızca karınca', en: 'Almost entirely ants' },
    size: { tr: '7–13 cm', en: '7–13 cm' },
    description: {
      tr: 'Yassı, yuvarlak gövdesi ve başının arkasındaki diken tacıyla tanınır. Sıkıştığında göz çevresindeki damarları yırtarak bir metre öteye kan püskürtebilir.',
      en: 'A flat, round body and a crown of spines at the back of the head. Cornered, it can rupture the vessels around its eyes and squirt blood a metre.',
    },
  },
  {
    id: 'draco',
    name: { tr: 'Uçan Ejder', en: 'Flying Dragon' },
    scientificName: 'Draco volans',
    habitat: {
      tr: 'Güneydoğu Asya ormanlarında ağaç gövdeleri',
      en: 'Tree trunks in southeast Asian forest',
    },
    diet: { tr: 'Karınca ve termit', en: 'Ants and termites' },
    size: { tr: '20–23 cm', en: '20–23 cm' },
    description: {
      tr: 'Uzayan kaburgalarının gerdiği deri kanatlarla ağaçtan ağaca otuz metre süzülür. Kanatlar yalnızca süzülürken açılır; yürürken gövdeye yatık durur ve görünmez olur.',
      en: 'Skin stretched over elongated ribs lets it glide thirty metres from trunk to trunk. The wings open only in the glide; walking, they fold flat against the body and disappear.',
    },
  },
  {
    id: 'sea-snake',
    name: { tr: 'Deniz Yılanı', en: 'Sea Snake' },
    scientificName: 'Hydrophiinae',
    habitat: {
      tr: 'Hint ve Pasifik okyanuslarında sığ kıyı suları',
      en: 'Shallow coastal water of the Indian and Pacific oceans',
    },
    diet: { tr: 'Balık ve balık yumurtası', en: 'Fish and fish eggs' },
    size: { tr: '1–1.5 m', en: '1–1.5 m' },
    description: {
      tr: 'Kürek gibi yassılaşmış kuyruğuyla her kara yılanından ayrılır. Tek nefesle iki saate kadar dalabilir ve ihtiyacı olan oksijenin bir bölümünü doğrudan derisinden alır.',
      en: 'A tail flattened into a paddle separates it from any land snake. It can stay down for up to two hours on one breath, taking part of its oxygen straight through the skin.',
    },
  },
  {
    id: 'blind-snake',
    name: { tr: 'Kör Yılan', en: 'Blind Snake' },
    scientificName: 'Typhlopidae',
    habitat: {
      tr: 'Toprak altı, yaprak çürüntüsü ve karınca yuvaları',
      en: 'Underground, in leaf litter and ant nests',
    },
    diet: { tr: 'Karınca ve termit larvaları', en: 'Ant and termite larvae' },
    size: { tr: '10–30 cm', en: '10–30 cm' },
    description: {
      tr: 'Solucana benzeyecek kadar ince ve parlaktır; gözleri deri altında birer koyu noktaya inmiştir. Kuyruğunun ucundaki minik diken, dar bir tünelde ilerlerken tutunmasını sağlar.',
      en: 'Slender and glossy enough to be taken for an earthworm, its eyes reduced to dark spots beneath the skin. A tiny spine at the tail tip gives it purchase as it pushes along a tunnel.',
    },
  },
  {
    id: 'wall-lizard',
    name: { tr: 'Duvar Kertenkelesi', en: 'Common Wall Lizard' },
    scientificName: 'Podarcis muralis',
    habitat: {
      tr: 'Taş duvar, kaya yüzü, harabe ve bahçeler',
      en: 'Stone walls, rock faces, ruins and gardens',
    },
    diet: { tr: 'Böcek ve örümcek', en: 'Insects and spiders' },
    size: { tr: '15–20 cm', en: '15–20 cm' },
    description: {
      tr: 'İnce gövdesi, uzun kuyruğu ve güneşli bir duvarda kımıldamadan durup en küçük gölgede yok olmasıyla tanınır. Türkiye’de bir yürüyüşçünün en sık karşılaştığı sürüngen budur.',
      en: 'A slim body, a long tail, and the habit of lying still on a sunlit wall then vanishing at the first shadow. In Turkey it is the reptile a walker meets more often than any other.',
    },
  },
  {
    id: 'spitting-cobra',
    name: { tr: 'Tüküren Kobra', en: 'Spitting Cobra' },
    scientificName: 'Naja',
    habitat: {
      tr: 'Afrika ve Asya’da savan, çalılık ve tarım alanları',
      en: 'Savanna, scrub and farmland in Africa and Asia',
    },
    diet: { tr: 'Kemirgen, kurbağa ve kuş', en: 'Rodents, frogs and birds' },
    size: { tr: '1–2.5 m', en: '1–2.5 m' },
    description: {
      tr: 'Başlığını açmasıyla tanınır; zehir dişlerinin ucundaki delik öne baktığı için zehrini iki metre öteye püskürtebilir. Hedefi gözlerdir ve isabet ederse geçici körlük yapar.',
      en: 'Known for spreading its hood; the opening at the fang tip faces forward, so it can spray venom two metres. It aims for the eyes, and a hit causes temporary blindness.',
    },
  },
  {
    id: 'leatherback-turtle',
    name: { tr: 'Deri Sırtlı Deniz Kaplumbağası', en: 'Leatherback Turtle' },
    scientificName: 'Dermochelys coriacea',
    habitat: {
      tr: 'Açık okyanuslar; tropik kumsallarda yuvalar',
      en: 'The open ocean, nesting on tropical beaches',
    },
    diet: { tr: 'Neredeyse yalnızca denizanası', en: 'Almost entirely jellyfish' },
    size: { tr: '1.5–2 m kabuk', en: '1.5–2 m shell' },
    description: {
      tr: 'Kabuğu boynuzsu levhalarla değil, deri gibi esnek bir tabakayla kaplıdır ve sırtında yedi çıkıntı uzanır. Bin iki yüz metreye dalar; soğuk sularda vücut ısısını suyun üstünde tutabilir.',
      en: 'Its shell is covered in leathery skin rather than horny plates, with seven ridges running down the back. It dives to twelve hundred metres and holds its body above the temperature of the water.',
    },
  },
  {
    id: 'beaded-lizard',
    name: { tr: 'Boncuklu Kertenkele', en: 'Beaded Lizard' },
    scientificName: 'Heloderma horridum',
    habitat: { tr: 'Meksika’da kuru orman ve çalılık', en: 'Dry forest and scrub in Mexico' },
    diet: {
      tr: 'Kuş ve sürüngen yumurtaları',
      en: 'The eggs of birds and reptiles',
    },
    size: { tr: '60–90 cm', en: '60–90 cm' },
    description: {
      tr: 'Derisi kemikten boncuklarla kaplı gibi pütürlüdür; siyah zemin üzerinde soluk sarı bir desen taşır. Gila canavarıyla birlikte, uzun süre bilinen tek iki zehirli kertenkeleden biridir.',
      en: 'Its skin is beaded with bony granules, patterned pale yellow on black. With the Gila monster it is one of the only two lizards long known to be venomous.',
    },
  },
  {
    id: 'gila-monster',
    name: { tr: 'Gila Canavarı', en: 'Gila Monster' },
    scientificName: 'Heloderma suspectum',
    habitat: {
      tr: 'Güneybatı ABD ve Meksika’da çöl ve çalılık',
      en: 'Desert and scrub in the southwestern US and Mexico',
    },
    diet: { tr: 'Yumurta ve yuvadaki yavru kemirgenler', en: 'Eggs and nestling rodents' },
    size: { tr: '35–55 cm', en: '35–55 cm' },
    description: {
      tr: 'Pembe-turuncu ve siyah alacalı derisiyle, yağ depoladığı kalın kuyruğuyla tanınır. Yılın çoğunu yer altında geçirir; zehri tek bir ısırıkla değil, çiğnedikçe diş oluklarından akar.',
      en: 'Mottled pink-orange and black, with a thick tail that stores fat. It spends most of the year underground, and its venom runs along grooves in the teeth as it chews rather than in one bite.',
    },
  },
  {
    id: 'green-lizard',
    name: { tr: 'Yeşil Kertenkele', en: 'European Green Lizard' },
    scientificName: 'Lacerta viridis',
    habitat: {
      tr: 'Güneşli çalılık, orman kenarı ve bağ kenarları',
      en: 'Sunny scrub, woodland edges and vineyard margins',
    },
    diet: {
      tr: 'Böcek, örümcek ve ara sıra meyve',
      en: 'Insects, spiders and occasional fruit',
    },
    size: { tr: '30–40 cm', en: '30–40 cm' },
    description: {
      tr: 'Parlak yeşil sırtıyla ve üreme mevsiminde erkeğinin turkuaza dönen boğazıyla tanınır. Kuyruğu gövdesinin iki katı uzunluktadır ve dallar arasında dengesini kurmasını sağlar.',
      en: 'A brilliant green back, and a throat that turns turquoise on the male in the breeding season. Its tail is twice the length of its body, and keeps it balanced among stems.',
    },
  },
  {
    id: 'sand-snake',
    name: { tr: 'Kırbaç Yılanı', en: 'Sand Racer' },
    scientificName: 'Psammophis',
    habitat: {
      tr: 'Kuzey Afrika ve Ortadoğu’da kumlu bozkır',
      en: 'Sandy steppe in North Africa and the Middle East',
    },
    diet: { tr: 'Kertenkele, kemirgen ve kuş', en: 'Lizards, rodents and birds' },
    size: { tr: '1–1.5 m', en: '1–1.5 m' },
    description: {
      tr: 'İnce uzun gövdesi ve iri gözleriyle hızlı avcılığa uyarlanmıştır; kızgın kumda gündüz avlanan az sayıdaki yılandan biridir. Burnundaki bezin salgısını derisine sürerek su kaybını azaltır.',
      en: 'Slender and long-bodied with large eyes, built for fast hunting, and one of the few snakes that works hot sand by day. It rubs a secretion from a nasal gland over its skin to cut water loss.',
    },
  },
  {
    id: 'sand-boa',
    name: { tr: 'Kum Boası', en: 'Sand Boa' },
    scientificName: 'Eryx',
    habitat: {
      tr: 'Bozkır ve kumlu topraklarda yer altı',
      en: 'Underground in steppe and sandy soil',
    },
    diet: { tr: 'Kemirgen ve kertenkele', en: 'Rodents and lizards' },
    size: { tr: '50–90 cm', en: '50–90 cm' },
    description: {
      tr: 'Kısa kalın gövdesi ve küt kuyruğu yüzünden başı kuyruğundan zor ayırt edilir; bu benzerlik avcıyı yanıltır. Kumun altında ilerler ve yalnızca gözleri dışarıdayken avını bekler.',
      en: 'Short and thick, with a blunt tail so like the head that a predator hesitates over which end to take. It moves beneath the sand and waits with only its eyes above the surface.',
    },
  },
  {
    id: 'adder',
    name: { tr: 'Adi Engerek', en: 'Common Adder' },
    scientificName: 'Vipera berus',
    habitat: {
      tr: 'Avrupa’da fundalık, orman açıklığı ve dağ çayırları',
      en: 'Heath, forest clearings and mountain meadows across Europe',
    },
    diet: { tr: 'Kemirgen, kertenkele ve kurbağa', en: 'Rodents, lizards and frogs' },
    size: { tr: '50–70 cm', en: '50–70 cm' },
    description: {
      tr: 'Sırtı boyunca uzanan koyu zikzak bant onu Avrupa’nın en kolay tanınan yılanı yapar. Kutup dairesinin kuzeyine çıkabilen tek yılandır ve kışı toplu hâlde tek bir kovukta geçirir.',
      en: 'A dark zigzag band down the back makes it the most easily recognised snake in Europe. It is the only snake to range north of the Arctic Circle, and it winters in company in a single hollow.',
    },
  },
  {
    id: 'basilisk',
    name: { tr: 'Basilisk Kertenkelesi', en: 'Basilisk Lizard' },
    scientificName: 'Basiliscus',
    habitat: {
      tr: 'Orta Amerika’da nehir kenarı ormanları',
      en: 'Riverside forest in Central America',
    },
    diet: {
      tr: 'Böcek, küçük kertenkele ve meyve',
      en: 'Insects, small lizards and fruit',
    },
    size: { tr: '60–80 cm', en: '60–80 cm' },
    description: {
      tr: 'Başında ve sırtında yelken gibi duran ibikleriyle tanınır. Arka ayaklarındaki deri saçaklar suya çarptığında bir hava cebi tutar; hayvan böylece yirmi metre su üstünde koşabilir.',
      en: 'Sail-like crests on the head and back. Fringes of skin on the hind toes trap a pocket of air as the foot strikes the water, which lets it run twenty metres across the surface.',
    },
  },
];
