import type { AnimalEntry } from '@/types';

/**
 * Insecta, written to the handbook's entry template: habitat, diet and size as
 * the three facts, then two sentences — how it is told apart in the field, and
 * the one thing about it worth carrying away.
 *
 * The `id` of an entry is what its photograph and its credit are filed under,
 * so ids are fixed. Names, facts and prose can be revised; ids cannot.
 */
export const insects: AnimalEntry[] = [
  {
    id: 'honey-bee',
    name: { tr: 'Bal Arısı', en: 'Honey Bee' },
    scientificName: 'Apis mellifera',
    habitat: {
      tr: 'Çiçekli çayır, bahçe ve orman açıklıkları',
      en: 'Flowering meadows, gardens and forest clearings',
    },
    diet: { tr: 'Nektar ve polen', en: 'Nectar and pollen' },
    size: { tr: '12–15 mm', en: '12–15 mm' },
    description: {
      tr: 'Tüylü, mat kahverengi-sarı bantlı gövdesi ve arka bacaklarındaki polen sepetiyle tanınır; eşek arısı ise parlak ve tüysüzdür. Bulduğu çiçeğin yönünü ve uzaklığını, petek üzerinde sekiz çizerek anlatır.',
      en: 'Told by its furry, matt amber-and-brown banding and the pollen baskets on its hind legs; a wasp is smooth and shiny. A forager gives the bearing and distance of a find by dancing a figure of eight on the comb.',
    },
  },
  {
    id: 'ant',
    name: { tr: 'Karınca', en: 'Ant' },
    scientificName: 'Formicidae',
    habitat: {
      tr: 'Toprak, ölü odun, kaldırım aralıkları',
      en: 'Soil, dead wood and cracks in paving',
    },
    diet: {
      tr: 'Tohum, yaprakbiti salgısı, ölü böcek',
      en: 'Seeds, aphid honeydew and dead insects',
    },
    size: { tr: '2–15 mm', en: '2–15 mm' },
    description: {
      tr: 'Dirsekli anteni ve gövdesini ikiye ayıran ince beli, onu termitten ayıran iki işarettir. Yol boyunca bıraktığı koku izi, koloninin yiyeceğe giden en kısa yolu birlikte bulmasını sağlar.',
      en: 'Elbowed antennae and a waist pinched to a narrow stalk are the two marks that separate it from a termite. The scent trail it lays lets a colony settle on the shortest route to food between them.',
    },
  },
  {
    id: 'butterfly',
    name: { tr: 'Kelebek', en: 'Butterfly' },
    scientificName: 'Papilionoidea',
    habitat: {
      tr: 'Çayır, bahçe ve orman kenarları',
      en: 'Meadows, gardens and woodland edges',
    },
    diet: {
      tr: 'Çiçek nektarı; tırtılken yaprak',
      en: 'Flower nectar; leaves as a caterpillar',
    },
    size: { tr: '2–10 cm kanat açıklığı', en: '2–10 cm wingspan' },
    description: {
      tr: 'Uçları topuzlu anteni ve dinlenirken kanatlarını sırtında dik tutması, güveden ayrıldığı iki noktadır. Gündüz uçar; renklerinin çoğu boyadan değil, pulların ışığı kırmasından gelir.',
      en: 'Clubbed antennae and wings held upright over the back at rest are what separate it from a moth. It flies by day, and most of its colour comes not from pigment but from light breaking on its scales.',
    },
  },
  {
    id: 'dragonfly',
    name: { tr: 'Yusufçuk', en: 'Dragonfly' },
    scientificName: 'Anisoptera',
    habitat: {
      tr: 'Göl, gölet ve akarsu kıyıları',
      en: 'Lake, pond and river margins',
    },
    diet: {
      tr: 'Uçarken yakaladığı sinek ve sivrisinek',
      en: 'Flies and mosquitoes taken on the wing',
    },
    size: { tr: '5–9 cm kanat açıklığı', en: '5–9 cm wingspan' },
    description: {
      tr: 'Dinlenirken kanatlarını yana açık tutar; ona çok benzeyen kızböceği ise kapatır. Dört kanadını birbirinden bağımsız çırpabildiği için havada asılı durabilir, hatta geri geri uçabilir.',
      en: 'At rest it holds its wings out flat to the sides, where the similar damselfly folds them shut. Because it beats all four wings independently it can hang still in the air, and even fly backwards.',
    },
  },
  {
    id: 'ladybug',
    name: { tr: 'Uğur Böceği', en: 'Ladybird' },
    scientificName: 'Coccinellidae',
    habitat: {
      tr: 'Yaprakbiti bulunan bahçe, tarla ve çalılar',
      en: 'Gardens, fields and shrubs that carry aphids',
    },
    diet: { tr: 'Yaprakbiti ve koşnil', en: 'Aphids and scale insects' },
    size: { tr: '5–8 mm', en: '5–8 mm' },
    description: {
      tr: 'Kubbeli, cilalı sırtı ve kanat kapaklarındaki benekleriyle tanınır; benek sayısı yaşını değil türünü gösterir. Rahatsız edildiğinde bacak eklemlerinden acı, sarı bir sıvı sızdırır.',
      en: 'Known by its domed, lacquered back and the spots on its wing cases — the count gives the species, not the age. Disturbed, it seeps a bitter yellow fluid from its leg joints.',
    },
  },
  {
    id: 'grasshopper',
    name: { tr: 'Çekirge', en: 'Grasshopper' },
    scientificName: 'Caelifera',
    habitat: {
      tr: 'Kuru çayır, otlak ve tarla kenarları',
      en: 'Dry grassland, pasture and field margins',
    },
    diet: { tr: 'Ot ve yaprak', en: 'Grasses and leaves' },
    size: { tr: '2–5 cm', en: '2–5 cm' },
    description: {
      tr: 'Kısa anteni ve arkaya katlanmış iri sıçrama bacakları vardır; gövdesinden uzun antenli cırcır böceği başka bir hayvandır. Sesini arka bacağını kanat kenarına sürterek çıkarır.',
      en: 'Short antennae and heavy hind legs folded back for the jump; the long-horned cricket is a different animal. It sings by drawing a hind leg across the edge of a wing.',
    },
  },
  {
    id: 'cockroach',
    name: { tr: 'Hamam Böceği', en: 'Cockroach' },
    scientificName: 'Blattodea',
    habitat: {
      tr: 'Kanalizasyon, bodrum, mutfak ve çöp alanları',
      en: 'Drains, cellars, kitchens and refuse',
    },
    diet: { tr: 'Her türlü organik artık', en: 'Almost any organic waste' },
    size: { tr: '1–4 cm', en: '1–4 cm' },
    description: {
      tr: 'Yassı kahverengi gövdesi, başını örten kalkanımsı plaka ve gövdesi kadar uzun anteniyle tanınır. Işık yandığında saniyeler içinde dağılması ışığa değil, hava akımına verdiği tepkidir.',
      en: 'A flat brown body, a shield over the head that hides it, and antennae as long as itself. It scatters the instant a light comes on — a response not to the light but to the moving air.',
    },
  },
  {
    id: 'praying-mantis',
    name: { tr: 'Peygamber Devesi', en: 'Praying Mantis' },
    scientificName: 'Mantodea',
    habitat: { tr: 'Çalılık, kuru ot ve bahçeler', en: 'Scrub, dry grass and gardens' },
    diet: {
      tr: 'Canlı böcek; zaman zaman kendinden büyük av',
      en: 'Live insects, occasionally prey larger than itself',
    },
    size: { tr: '4–9 cm', en: '4–9 cm' },
    description: {
      tr: 'Katlanmış ön bacakları ve başını 180 derece çevirebilen tek böcek oluşu onu tereddütsüz ayırt ettirir. Avını beklerken hiç kımıldamaz; saldırısı gözle izlenemeyecek kadar hızlıdır.',
      en: 'Folded forelegs and the only insect head that turns through a full 180 degrees make it unmistakable. It waits without moving, and the strike itself is too fast for the eye to follow.',
    },
  },
  {
    id: 'housefly',
    name: { tr: 'Karasinek', en: 'Housefly' },
    scientificName: 'Musca domestica',
    habitat: {
      tr: 'Ev, ahır, çöp ve gübre çevresi',
      en: 'Houses, byres, refuse and dung',
    },
    diet: {
      tr: 'Sıvılaştırdığı çürük madde ve şeker',
      en: 'Decaying matter and sugars, liquefied first',
    },
    size: { tr: '6–7 mm', en: '6–7 mm' },
    description: {
      tr: 'Gri göğsündeki dört koyu şerit ve iri kırmızı gözleriyle tanınır; tek çift kanadı vardır, ikinci çift denge organına dönüşmüştür. Katı yiyeceği önce tükürüğüyle çözer, sonra emer.',
      en: 'Four dark stripes on a grey thorax and large red eyes; it has one pair of wings, the second pair reduced to balance organs. Solid food is dissolved with saliva before it is drunk.',
    },
  },
  {
    id: 'mosquito',
    name: { tr: 'Sivrisinek', en: 'Mosquito' },
    scientificName: 'Culicidae',
    habitat: {
      tr: 'Durgun su kenarı; su tutan her kap',
      en: 'Standing water, down to any container that holds it',
    },
    diet: {
      tr: 'Nektar; yalnızca dişisi kan emer',
      en: 'Nectar; only the female takes blood',
    },
    size: { tr: '3–6 mm', en: '3–6 mm' },
    description: {
      tr: 'İnce uzun bacakları, dar kanatları ve öne uzanan iğne biçimli hortumuyla tanınır. Kan yalnızca yumurtayı olgunlaştırmak için gerekir; o ses ise saniyede yüzlerce kanat vuruşundan çıkar.',
      en: 'Long thin legs, narrow wings and a needle-like proboscis held out in front. Blood is needed only to ripen the eggs, and the whine comes from hundreds of wingbeats a second.',
    },
  },
  {
    id: 'firefly',
    name: { tr: 'Ateş Böceği', en: 'Firefly' },
    scientificName: 'Lampyridae',
    habitat: {
      tr: 'Nemli çayır, dere kenarı ve orman açıklıkları',
      en: 'Damp meadows, streamsides and forest clearings',
    },
    diet: {
      tr: 'Larvası salyangoz; erişkini çoğu kez hiç beslenmez',
      en: 'Snails as a larva; many adults never feed at all',
    },
    size: { tr: '1–2 cm', en: '1–2 cm' },
    description: {
      tr: 'Yumuşak kanat kapakları ve karnının ucundaki soluk ışık organıyla tanınır. Işığını neredeyse hiç ısı üretmeden çıkarır; yanıp sönme aralığı türe özgü bir çağrıdır.',
      en: 'Soft wing cases and a pale light organ at the tip of the abdomen. It makes its light with almost no heat, and the rhythm of the flashes is a call particular to the species.',
    },
  },
  {
    id: 'cicada',
    name: { tr: 'Ağustos Böceği', en: 'Cicada' },
    scientificName: 'Cicadidae',
    habitat: {
      tr: 'Sıcak orman, park ve meyve bahçeleri',
      en: 'Warm woodland, parks and orchards',
    },
    diet: { tr: 'Ağaç özsuyu', en: 'Tree sap' },
    size: { tr: '2–5 cm', en: '2–5 cm' },
    description: {
      tr: 'Aralıklı iri gözleri, saydam damarlı kanatları ve geniş gövdesiyle tanınır. Larvası yıllarca toprak altında kök emerek yaşar; yazın duyulan ses karnındaki zarların titreşmesinden gelir.',
      en: 'Wide-set eyes, clear veined wings and a broad body. The nymph spends years underground on tree roots, and the summer noise comes from drum-like membranes in the abdomen.',
    },
  },
  {
    id: 'termite',
    name: { tr: 'Termit', en: 'Termite' },
    scientificName: 'Termitoidae',
    habitat: {
      tr: 'Toprak, ölü ağaç ve ahşap yapılar',
      en: 'Soil, dead trees and timber in buildings',
    },
    diet: { tr: 'Odundaki selüloz', en: 'Cellulose from wood' },
    size: { tr: '4–15 mm', en: '4–15 mm' },
    description: {
      tr: 'Karıncaya benzer ama beli ince değildir ve anteni düz, boncukludur. Odunu kendi başına sindiremez; bağırsağındaki mikroorganizmalar selülozu onun yerine parçalar.',
      en: 'It looks like an ant but has no pinched waist, and its antennae are straight and beaded. It cannot digest wood alone: microbes in its gut break the cellulose down for it.',
    },
  },
  {
    id: 'stag-beetle',
    name: { tr: 'Geyik Böceği', en: 'Stag Beetle' },
    scientificName: 'Lucanidae',
    habitat: {
      tr: 'Yaşlı meşe ormanları ve çürüyen kütükler',
      en: 'Old oak woodland and rotting stumps',
    },
    diet: {
      tr: 'Larvası çürük odun, erişkini ağaç özsuyu',
      en: 'Rotting wood as a larva, tree sap as an adult',
    },
    size: { tr: '3–8 cm', en: '3–8 cm' },
    description: {
      tr: 'Erkeğin geyik boynuzunu andıran iri çeneleri onu Avrupa’nın en büyük böceği yapar. Bu çeneler ısırmak için değil, rakip erkekleri kütükten kaldırıp devirmek için kullanılır.',
      en: 'The male’s antler-like jaws make it unmistakable, and the largest beetle in Europe. Those jaws are not for biting but for levering rival males off a log.',
    },
  },
  {
    id: 'dung-beetle',
    name: { tr: 'Gübre Böceği', en: 'Dung Beetle' },
    scientificName: 'Scarabaeinae',
    habitat: {
      tr: 'Otlak, mera ve hayvan barınağı çevresi',
      en: 'Pasture, grazing land and around livestock',
    },
    diet: { tr: 'Otçul hayvan dışkısı', en: 'The dung of grazing animals' },
    size: { tr: '5–30 mm', en: '5–30 mm' },
    description: {
      tr: 'Kürek biçimli başı ve dişli ön bacaklarıyla, çoğu kez bir topağı yuvarlarken görülür. Topağını düz bir hatta götürmek için Samanyolu’nun ışığıyla yön bulduğu gösterilmiştir.',
      en: 'A shovel-shaped head and toothed forelegs, usually met while rolling a ball. To keep that ball on a straight line it has been shown to steer by the light of the Milky Way.',
    },
  },
  {
    id: 'wasp',
    name: { tr: 'Eşek Arısı', en: 'Wasp' },
    scientificName: 'Vespidae',
    habitat: {
      tr: 'Bahçe, orman kenarı ve saçak altları',
      en: 'Gardens, woodland edges and under eaves',
    },
    diet: {
      tr: 'Larvasına böcek, kendine nektar ve meyve',
      en: 'Insects for the grubs, nectar and fruit for itself',
    },
    size: { tr: '1–3 cm', en: '1–3 cm' },
    description: {
      tr: 'Parlak, tüysüz gövdesi, keskin sarı-siyah bantları ve belirgin ince beliyle bal arısından ayrılır. Yuvasını, ağaçtan kazıdığı odunu çiğneyip kâğıda dönüştürerek örer.',
      en: 'Smooth and hairless with hard yellow-and-black banding and a markedly pinched waist — this is what separates it from a honey bee. It builds by chewing scraped wood into paper.',
    },
  },
  {
    id: 'moth',
    name: { tr: 'Güve', en: 'Moth' },
    scientificName: 'Heterocera',
    habitat: {
      tr: 'Orman, bahçe, dolap ve kilerler',
      en: 'Woodland, gardens, wardrobes and larders',
    },
    diet: {
      tr: 'Nektar; tırtılı yaprak, tahıl ya da yün',
      en: 'Nectar; the caterpillar takes leaves, grain or wool',
    },
    size: { tr: '1–15 cm kanat açıklığı', en: '1–15 cm wingspan' },
    description: {
      tr: 'Tüylü ya da taraklı anteni ve dinlenirken kanatlarını gövdesine yatık tutması onu kelebekten ayırır. Çoğu gece uçar; yönünü aya göre bulduğu için yapay ışığın çevresinde döner durur.',
      en: 'Feathered or comb-like antennae, and wings laid flat over the body at rest, separate it from a butterfly. Most fly at night, and because they steer by the moon they circle any artificial light.',
    },
  },
  {
    id: 'louse',
    name: { tr: 'Bit', en: 'Louse' },
    scientificName: 'Phthiraptera',
    habitat: {
      tr: 'Memeli kılı, kuş tüyü, giysi dikişleri',
      en: 'Mammal hair, bird feathers and the seams of clothing',
    },
    diet: {
      tr: 'Kan ya da deri ve tüy döküntüsü',
      en: 'Blood, or shed skin and feather debris',
    },
    size: { tr: '1–3 mm', en: '1–3 mm' },
    description: {
      tr: 'Kanatsız, yassı gövdesi ve kıla tutunmak için kancaya dönüşmüş bacaklarıyla tanınır. Konağından ayrıldığında birkaç günden fazla yaşayamaz; yumurtasını kıl diplerine yapıştırır.',
      en: 'Wingless and flattened, with legs hooked for gripping a hair. Away from its host it lasts only a day or two, and it glues its eggs to the base of the hairs.',
    },
  },
  {
    id: 'flea',
    name: { tr: 'Pire', en: 'Flea' },
    scientificName: 'Siphonaptera',
    habitat: {
      tr: 'Kedi, köpek ve kemirgen tüyü; yatak ve halı',
      en: 'The fur of cats, dogs and rodents; bedding and carpet',
    },
    diet: { tr: 'Memeli ve kuş kanı', en: 'The blood of mammals and birds' },
    size: { tr: '1–4 mm', en: '1–4 mm' },
    description: {
      tr: 'Yanlardan basık gövdesi tüylerin arasından süzülmesini sağlar; kanadı yoktur. Bacağındaki elastik protein sayesinde boyunun yüz katına yakın mesafeye sıçrayabilir.',
      en: 'A body flattened side to side so it can slip between hairs; it has no wings at all. An elastic protein in its legs lets it jump close to a hundred times its own length.',
    },
  },
  {
    id: 'bed-bug',
    name: { tr: 'Tahtakurusu', en: 'Bed Bug' },
    scientificName: 'Cimex lectularius',
    habitat: {
      tr: 'Yatak dikişleri, baza ve mobilya aralıkları',
      en: 'Mattress seams, bed frames and gaps in furniture',
    },
    diet: { tr: 'İnsan kanı', en: 'Human blood' },
    size: { tr: '4–5 mm', en: '4–5 mm' },
    description: {
      tr: 'Elma çekirdeği büyüklüğünde, yassı ve kızıl kahverengidir; kan emdikçe şişer ve koyulaşır. Gündüz saklanır, gece karbondioksit ve vücut ısısını izleyerek yaklaşır.',
      en: 'Flat, reddish-brown and about the size of an apple pip, swelling and darkening as it feeds. It hides by day and comes in at night, following carbon dioxide and body heat.',
    },
  },
  {
    id: 'earwig',
    name: { tr: 'Kulağakaçan', en: 'Earwig' },
    scientificName: 'Dermaptera',
    habitat: {
      tr: 'Taş altı, yaprak çürüntüsü ve saksı altları',
      en: 'Under stones, in leaf litter and beneath flowerpots',
    },
    diet: {
      tr: 'Yaprakbiti, ölü bitki ve çürüyen meyve',
      en: 'Aphids, dead plant matter and rotting fruit',
    },
    size: { tr: '1–2 cm', en: '1–2 cm' },
    description: {
      tr: 'Karnının ucundaki kıskaçla hemen tanınır; erkeğinki kıvrık, dişininki düzdür. Adının aksine kulağa girmez — kıskacını savunmada ve kanatlarını katlarken kullanır.',
      en: 'The pincers at the tail end give it away: curved on the male, straight on the female. Despite the name it does not go into ears; the pincers are for defence and for folding its wings away.',
    },
  },
  {
    id: 'water-beetle',
    name: { tr: 'Dalgıç Böceği', en: 'Diving Beetle' },
    scientificName: 'Dytiscidae',
    habitat: {
      tr: 'Bitkili gölet, durgun dere ve göl kenarları',
      en: 'Weedy ponds, slow streams and lake margins',
    },
    diet: {
      tr: 'Kurbağa yavrusu, kurtçuk ve küçük balık',
      en: 'Tadpoles, larvae and small fish',
    },
    size: { tr: '1–4 cm', en: '1–4 cm' },
    description: {
      tr: 'Suya uygun oval gövdesi ve kürek gibi kıllanmış arka bacaklarıyla hızla ilerler. Kanat kapaklarının altına sıkıştırdığı hava kabarcığı sayesinde dakikalarca su altında kalabilir.',
      en: 'A streamlined oval body and hind legs fringed like oars drive it fast through the water. It carries an air bubble under its wing cases, which keeps it under for minutes at a time.',
    },
  },
  {
    id: 'silkworm',
    name: { tr: 'İpek Böceği', en: 'Silkworm Moth' },
    scientificName: 'Bombyx mori',
    habitat: {
      tr: 'Dut bahçeleri ve ipekböcekçiliği tesisleri',
      en: 'Mulberry groves and silk-rearing sheds',
    },
    diet: { tr: 'Yalnızca dut yaprağı', en: 'Mulberry leaves and nothing else' },
    size: { tr: '4–5 cm kanat açıklığı', en: '4–5 cm wingspan' },
    description: {
      tr: 'Erişkini krem beyazı, ağır gövdeli bir güvedir ve binlerce yıllık evcilleştirme sonucu uçamaz. Kozasını tek ve kesintisiz bir ipek telinden örer; bu tel bin metreyi aşabilir.',
      en: 'The adult is a heavy, cream-white moth that thousands of years of domestication have left unable to fly. Its cocoon is spun from one unbroken thread of silk, which can run past a kilometre.',
    },
  },
  {
    id: 'bumblebee',
    name: { tr: 'Bombus Arısı', en: 'Bumblebee' },
    scientificName: 'Bombus',
    habitat: {
      tr: 'Serin çayır, dağ yamaçları ve bahçeler',
      en: 'Cool meadows, mountain slopes and gardens',
    },
    diet: { tr: 'Nektar ve polen', en: 'Nectar and pollen' },
    size: { tr: '15–25 mm', en: '15–25 mm' },
    description: {
      tr: 'Bal arısından iri, yuvarlak ve çok daha tüylüdür; kolonisi birkaç yüz bireyi geçmez. Göğüs kaslarını titreterek ısınabildiği için soğukta ve çiseleyen yağmurda da çalışmayı sürdürür.',
      en: 'Rounder, larger and far furrier than a honey bee, with colonies of only a few hundred. It warms itself by shivering its flight muscles, so it keeps working in cold and drizzle.',
    },
  },
  {
    id: 'stick-insect',
    name: { tr: 'Çöp Çekirgesi', en: 'Stick Insect' },
    scientificName: 'Phasmatodea',
    habitat: { tr: 'Çalı, funda ve ağaç dalları', en: 'Shrubs, heath and tree branches' },
    diet: { tr: 'Yaprak', en: 'Leaves' },
    size: { tr: '5–30 cm', en: '5–30 cm' },
    description: {
      tr: 'Gövdesi bir dal parçasına o kadar benzer ki ancak kımıldadığında fark edilir; rüzgârdaki bir dalı taklit ederek sallanır bile. Birçok türünde erkek yoktur, dişi tek başına ürer.',
      en: 'So like a twig that it is usually seen only once it moves, and it even sways as a branch does in wind. In many species there are no males at all: the female breeds alone.',
    },
  },
  {
    id: 'leaf-beetle',
    name: { tr: 'Yaprak Böceği', en: 'Leaf Beetle' },
    scientificName: 'Chrysomelidae',
    habitat: {
      tr: 'Bahçe, tarla ve orman altı bitkileri',
      en: 'Garden, field and woodland understorey plants',
    },
    diet: { tr: 'Yaprak', en: 'Leaves' },
    size: { tr: '2–12 mm', en: '2–12 mm' },
    description: {
      tr: 'Kısa, tıknaz ve çoğu kez madeni parlaklıkta bir gövdesi vardır; yaprağın üst yüzünde kolayca görülür. Larvası da erişkini de aynı bitkiyle beslendiği için tek bir konağa sıkı sıkıya bağlıdır.',
      en: 'Short, stout and often metallic, and easy to spot on the upper side of a leaf. Larva and adult feed on the same plant, which ties most species tightly to a single host.',
    },
  },
  {
    id: 'horsefly',
    name: { tr: 'At Sineği', en: 'Horsefly' },
    scientificName: 'Tabanidae',
    habitat: {
      tr: 'Otlak, sulak alan kenarı ve orman açıklıkları',
      en: 'Pasture, wetland edges and forest clearings',
    },
    diet: {
      tr: 'Nektar; dişisi memeli kanı emer',
      en: 'Nectar; the female takes mammal blood',
    },
    size: { tr: '10–25 mm', en: '10–25 mm' },
    description: {
      tr: 'Karasinekten iri, tıknaz gövdeli ve gökkuşağı renkli iri gözlüdür. Sivrisinek gibi delmez; bıçak biçimli ağız parçalarıyla deriyi keser, ısırığının acıtmasının nedeni budur.',
      en: 'Bigger than a housefly, stout-bodied and with large iridescent eyes. It does not pierce like a mosquito but cuts the skin with blade-like mouthparts, which is why the bite hurts.',
    },
  },
  {
    id: 'whitefly',
    name: { tr: 'Beyaz Sinek', en: 'Whitefly' },
    scientificName: 'Aleyrodidae',
    habitat: {
      tr: 'Sera, bahçe ve sebze yaprakları',
      en: 'Greenhouses, gardens and vegetable foliage',
    },
    diet: { tr: 'Bitki özsuyu', en: 'Plant sap' },
    size: { tr: '1–2 mm', en: '1–2 mm' },
    description: {
      tr: 'Mumsu beyaz tozla kaplı minik kanatları vardır; yaprak sallandığında bulut hâlinde havalanır. Emdiği özsuyun fazlasını tatlı bir salgı olarak bırakır ve yaprakta siyah küf üretir.',
      en: 'Tiny wings dusted with waxy white powder; shake the leaf and they rise in a cloud. Surplus sap is voided as honeydew, and black mould grows on the leaf beneath.',
    },
  },
  {
    id: 'mealybug',
    name: { tr: 'Unlu Bit', en: 'Mealybug' },
    scientificName: 'Pseudococcidae',
    habitat: {
      tr: 'Saksı bitkileri, seralar ve meyve ağacı gövdeleri',
      en: 'Houseplants, greenhouses and fruit-tree bark',
    },
    diet: { tr: 'Bitki özsuyu', en: 'Plant sap' },
    size: { tr: '2–5 mm', en: '2–5 mm' },
    description: {
      tr: 'Yaprak diplerinde ve gövde çatallarında, un serpilmiş beyaz pamukçuklar hâlinde görülür. Bu mumsu örtü hem suyu hem ilacı geçirmediği için kolonisi kolay kolay temizlenmez.',
      en: 'Seen as white, floury tufts in leaf axils and the forks of stems. The waxy coat sheds both water and spray, which is what makes a colony so hard to clear.',
    },
  },
  {
    id: 'carpet-beetle',
    name: { tr: 'Halı Böceği', en: 'Carpet Beetle' },
    scientificName: 'Dermestidae',
    habitat: {
      tr: 'Halı altı, dolap, kuş yuvası ve müze koleksiyonları',
      en: 'Under carpets, in wardrobes, birds’ nests and museum collections',
    },
    diet: {
      tr: 'Larvası yün, tüy ve kuru hayvansal artık yer',
      en: 'Wool, feathers and dried animal matter, eaten by the larva',
    },
    size: { tr: '2–4 mm', en: '2–4 mm' },
    description: {
      tr: 'Erişkini yuvarlak, benekli ve zararsızdır; asıl zararı kıllı kahverengi larvası verir. Keratini sindirebildiği için yünlü kumaşta ve doldurulmuş hayvan koleksiyonlarında beslenebilir.',
      en: 'The adult is round, mottled and harmless; the damage is done by the bristly brown larva. It can digest keratin, which lets it feed on woollen cloth and on mounted specimens.',
    },
  },
];
