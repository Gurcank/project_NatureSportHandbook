import type { Localized } from '@/types';

/**
 * Rocks are grouped the way geology groups them — by how they formed, not by
 * how they look. Minerals are kept apart because a rock is an aggregate of
 * minerals, not a bigger one.
 */
export type StoneGroup = 'igneous' | 'sedimentary' | 'metamorphic' | 'mineral';

export type StoneEntry = {
  id: string;
  group: StoneGroup;
  name: Localized;
  /** Mineral formula, or the rock's defining composition. */
  formula: string;
  composition: Localized;
  /** Mohs scale, where it is meaningful. */
  hardness?: Localized;
  /** What it looks like where a walker would actually come across it. */
  whereFound: Localized;
  description: Localized;
};

export const stones: StoneEntry[] = [
  // --- Igneous -------------------------------------------------------------
  {
    id: 'granite',
    group: 'igneous',
    name: { tr: 'Granit', en: 'Granite' },
    formula: 'SiO₂ · KAlSi₃O₈ · NaAlSi₃O₈',
    composition: { tr: 'Kuvars, feldispat, mika', en: 'Quartz, feldspar, mica' },
    hardness: { tr: '6–7 Mohs', en: '6–7 Mohs' },
    whereFound: { tr: 'Dere yataklarında ve dağ eteklerinde, iri kristalli benekli çakıllar', en: 'In stream beds and along mountain paths, as speckled coarse-crystalled cobbles' },
    description: {
      tr: 'Magmanın yer altında yavaşça soğumasıyla oluşur; yavaş soğuma kristallerin çıplak gözle görülecek kadar irileşmesini sağlar. Kıtasal kabuğun temelidir.',
      en: 'Formed as magma cools slowly underground, which lets the crystals grow large enough to see. It is the bedrock of continental crust.',
    },
  },
  {
    id: 'basalt',
    group: 'igneous',
    name: { tr: 'Bazalt', en: 'Basalt' },
    formula: 'Plajiyoklas · piroksen',
    composition: { tr: 'Plajiyoklas feldispat, piroksen', en: 'Plagioclase feldspar, pyroxene' },
    hardness: { tr: '6 Mohs', en: '6 Mohs' },
    whereFound: { tr: 'Volkanik platolarda, köşeleri keskin siyah ve ağır bloklar', en: 'On volcanic plateaus, as heavy black blocks with sharp edges' },
    description: {
      tr: 'Lavın yüzeyde hızla soğumasıyla oluşan koyu, ince taneli kayaç. Okyanus tabanının neredeyse tamamı bazalttır; soğurken altıgen sütunlar oluşturabilir.',
      en: 'Dark, fine-grained rock from lava cooling fast at the surface. Almost the entire ocean floor is basalt, and it can cool into hexagonal columns.',
    },
  },
  {
    id: 'obsidian',
    group: 'igneous',
    name: { tr: 'Obsidiyen', en: 'Obsidian' },
    formula: 'SiO₂ (amorf)',
    composition: { tr: 'Volkanik cam', en: 'Volcanic glass' },
    hardness: { tr: '5–6 Mohs', en: '5–6 Mohs' },
    whereFound: { tr: 'Volkanik arazide, cam gibi parlayan siyah keskin parçalar', en: 'On volcanic ground, as black glassy flakes with cutting edges' },
    description: {
      tr: 'O kadar hızlı soğur ki kristal oluşamaz; sonuç doğal camdır. Kırıldığında usturadan keskin kenar verir, tarih boyunca kesici alet yapımında kullanılmıştır.',
      en: 'It cools too fast for crystals to form, leaving natural glass. It fractures to an edge sharper than a razor, and was worked into blades for millennia.',
    },
  },
  {
    id: 'pumice',
    group: 'igneous',
    name: { tr: 'Sünger Taşı', en: 'Pumice' },
    formula: 'SiO₂ ağırlıklı',
    composition: { tr: 'Gözenekli volkanik cam', en: 'Frothy volcanic glass' },
    hardness: { tr: '6 Mohs', en: '6 Mohs' },
    whereFound: { tr: 'Ege ve Akdeniz kıyılarında, suda yüzerek karaya vuran gri taşlar', en: 'Washed up on Aegean and Mediterranean shores, grey and light enough to float' },
    description: {
      tr: 'Gaz kabarcıklarıyla dolu lavın ani soğumasıyla oluşur. İçindeki boşluklar sayesinde suda yüzen tek yaygın kayaçtır.',
      en: 'Formed when gas-charged lava freezes instantly. The trapped bubbles make it the one common rock that floats.',
    },
  },
  {
    id: 'andesite',
    group: 'igneous',
    name: { tr: 'Andezit', en: 'Andesite' },
    formula: 'Plajiyoklas · amfibol',
    composition: { tr: 'Plajiyoklas, amfibol, biyotit', en: 'Plagioclase, amphibole, biotite' },
    hardness: { tr: '6 Mohs', en: '6 Mohs' },
    whereFound: { tr: 'Volkanik tepelerin eteğinde, gri-mor ince taneli taşlar', en: 'At the foot of volcanic hills, as grey-purple fine-grained stones' },
    description: {
      tr: 'Adını And Dağları’ndan alır. Kıta kenarındaki volkanların tipik kayacıdır; Anadolu’da yapı taşı olarak yaygın kullanılır.',
      en: 'Named after the Andes, it is the typical rock of volcanoes along continental margins and a common building stone in Anatolia.',
    },
  },
  {
    id: 'rhyolite',
    group: 'igneous',
    name: { tr: 'Riyolit', en: 'Rhyolite' },
    formula: 'SiO₂ ağırlıklı',
    composition: { tr: 'Kuvars, sanidin, plajiyoklas', en: 'Quartz, sanidine, plagioclase' },
    hardness: { tr: '6–7 Mohs', en: '6–7 Mohs' },
    whereFound: { tr: 'Volkanik arazide, akma çizgileri taşıyan açık renkli parçalar', en: 'On volcanic ground, as pale pieces carrying flow bands' },
    description: {
      tr: 'Granitin yüzeye çıkmış hâli: aynı bileşim, çok daha ince tane. Yoğun silis içerdiği için lavı koyudur ve patlamalı püskürmelere yol açar.',
      en: 'Granite that reached the surface — the same chemistry, far finer grain. Its silica-rich lava is stiff, which makes eruptions explosive.',
    },
  },
  {
    id: 'tuff',
    group: 'igneous',
    name: { tr: 'Tüf', en: 'Tuff' },
    formula: 'Volkanik kül · SiO₂ ağırlıklı',
    composition: { tr: 'Kaynaşmış volkanik kül ve cam', en: 'Welded volcanic ash and glass' },
    hardness: { tr: '2–4 Mohs', en: '2–4 Mohs' },
    whereFound: { tr: 'Kapadokya gibi volkanik bölgelerde, tırnakla çizilebilen açık renkli taş', en: 'In volcanic country such as Cappadocia, pale and soft enough to scratch with a nail' },
    description: {
      tr: 'Patlamalı bir püskürmede havaya savrulan külün yere çöküp kaynaşmasıyla oluşur. Yumuşaklığı yüzünden Kapadokya’da içine oda, kilise ve güvercinlik oyulmuştur.',
      en: 'Ash thrown up by an explosive eruption, settled and welded where it fell. Being soft, it is the rock rooms, churches and dovecotes were cut into in Cappadocia.',
    },
  },

  // --- Sedimentary ---------------------------------------------------------
  {
    id: 'limestone',
    group: 'sedimentary',
    name: { tr: 'Kireçtaşı', en: 'Limestone' },
    formula: 'CaCO₃',
    composition: { tr: 'Kalsit', en: 'Calcite' },
    hardness: { tr: '3 Mohs', en: '3 Mohs' },
    whereFound: { tr: 'Karst arazide her yerde; yağmurun oyduğu kanallı gri yüzeyler', en: 'Everywhere in karst country, as grey surfaces grooved by rain' },
    description: {
      tr: 'Çoğu, deniz canlılarının kabuk ve iskeletlerinin birikmesiyle oluşur. Asitli suda çözündüğü için mağaraları ve karst arazilerini yaratan kayaçtır.',
      en: 'Mostly built from the shells and skeletons of sea creatures. Because acidic water dissolves it, it is the rock that makes caves and karst.',
    },
  },
  {
    id: 'sandstone',
    group: 'sedimentary',
    name: { tr: 'Kumtaşı', en: 'Sandstone' },
    formula: 'SiO₂ taneleri',
    composition: { tr: 'Çimentolanmış kum taneleri', en: 'Cemented sand grains' },
    hardness: { tr: '6–7 Mohs', en: '6–7 Mohs' },
    whereFound: { tr: 'Yol yarmalarında ve dere kenarlarında, elde ufalanan taneli katmanlar', en: 'In road cuttings and along streams, as grainy beds that crumble in the hand' },
    description: {
      tr: 'Kum tanelerinin doğal çimentoyla birleşmesiyle oluşur. Gözenekli olduğu için yeraltı sularını ve petrolü depolayan başlıca kayaçlardandır.',
      en: 'Sand grains bound by natural cement. Its porosity makes it one of the main rocks that stores groundwater and oil.',
    },
  },
  {
    id: 'shale',
    group: 'sedimentary',
    name: { tr: 'Şeyl', en: 'Shale' },
    formula: 'Kil mineralleri',
    composition: { tr: 'Kil ve silt boyu taneler', en: 'Clay and silt-sized particles' },
    hardness: { tr: '2–3 Mohs', en: '2–3 Mohs' },
    whereFound: { tr: 'Yamaç yarmalarında, ince yapraklar hâlinde ayrılan koyu gri levhalar', en: 'In hillside cuts, as dark grey slabs that split into leaves' },
    description: {
      tr: 'Durgun suda çöken en ince taneli çamurdan oluşur, ince yapraklar hâlinde ayrılır. Yerkabuğundaki en yaygın tortul kayaçtır.',
      en: 'Formed from the finest mud settling in still water, and splitting into thin sheets. It is the most abundant sedimentary rock in the crust.',
    },
  },
  {
    id: 'conglomerate',
    group: 'sedimentary',
    name: { tr: 'Konglomera', en: 'Conglomerate' },
    formula: 'Karışık çakıl',
    composition: { tr: 'Yuvarlak çakıllar ve bağlayıcı hamur', en: 'Rounded pebbles in a finer matrix' },
    hardness: { tr: 'Değişken', en: 'Variable' },
    whereFound: { tr: 'Eski dere teraslarında, içine çakıl gömülü kaba bloklar', en: 'On old river terraces, as coarse blocks with pebbles set into them' },
    description: {
      tr: 'Yuvarlanmış çakılların çimentolanmasıyla oluşur. Çakılların yuvarlaklığı, taşındıkları mesafeyi anlatır.',
      en: 'Rounded pebbles cemented together, where the roundness of each pebble records how far it travelled.',
    },
  },
  {
    id: 'chalk',
    group: 'sedimentary',
    name: { tr: 'Tebeşir', en: 'Chalk' },
    formula: 'CaCO₃',
    composition: { tr: 'Mikroskobik alg kabukları', en: 'Microscopic algal plates' },
    hardness: { tr: '1–2 Mohs', en: '1–2 Mohs' },
    whereFound: { tr: 'Beyaz tortul yamaçlarda; parmağa iz bırakacak kadar yumuşak', en: 'On white sedimentary slopes, soft enough to mark a finger' },
    description: {
      tr: 'Milyonlarca yıl boyunca dibe çöken mikroskobik deniz canlılarının kalıntısı. Bir avuç tebeşir, sayılamayacak kadar çok kabuk içerir.',
      en: 'The remains of microscopic sea life settling over millions of years — a handful holds more shells than can be counted.',
    },
  },
  {
    id: 'travertine',
    group: 'sedimentary',
    name: { tr: 'Traverten', en: 'Travertine' },
    formula: 'CaCO₃',
    composition: { tr: 'Kaynak sularından çöken kalsit', en: 'Calcite precipitated from spring water' },
    hardness: { tr: '3–4 Mohs', en: '3–4 Mohs' },
    whereFound: { tr: 'Sıcak su kaynaklarının çevresinde, gözenekli krem rengi katmanlar', en: 'Around hot springs, as porous cream-coloured layers' },
    description: {
      tr: 'Kalsiyum yüklü kaynak suyu yüzeye çıkıp gaz kaybedince kalsit çökelir. Pamukkale’nin beyaz teraslarını bu süreç kurmuştur.',
      en: 'Calcium-rich spring water loses gas at the surface and drops its calcite. This is the process that built the white terraces of Pamukkale.',
    },
  },
  {
    id: 'coal',
    group: 'sedimentary',
    name: { tr: 'Kömür', en: 'Coal' },
    formula: 'C (+ H, O, S)',
    composition: { tr: 'Sıkışmış bitki artıkları', en: 'Compressed plant remains' },
    hardness: { tr: '1–2 Mohs', en: '1–2 Mohs' },
    whereFound: { tr: 'Kömür havzalarında, pas rengi toprakta siyah ve şaşırtıcı hafif parçalar', en: 'In coal basins, as black and surprisingly light pieces in rust-coloured soil' },
    description: {
      tr: 'Bataklıklarda çürümeden gömülen bitkilerin ısı ve basınç altında karbonlaşmasıyla oluşur. Bir kayaçtan çok, saklanmış bir ormandır.',
      en: 'Plants buried in swamps before they could rot, carbonised by heat and pressure — less a rock than a forest kept.',
    },
  },
  {
    id: 'flint',
    group: 'sedimentary',
    name: { tr: 'Çakmaktaşı', en: 'Flint' },
    formula: 'SiO₂',
    composition: { tr: 'Mikrokristalin kuvars', en: 'Microcrystalline quartz' },
    hardness: { tr: '7 Mohs', en: '7 Mohs' },
    whereFound: { tr: 'Kireçtaşı yamaçlarında, tebeşir beyazı kabuk altında koyu yumrular', en: 'On limestone slopes, as dark nodules under a chalky white rind' },
    description: {
      tr: 'Kireçtaşı içinde yumrular hâlinde bulunur. Kırıldığında keskin kenar verdiği için taş devrinin en önemli hammaddesiydi.',
      en: 'Found as nodules inside limestone. Its sharp conchoidal fracture made it the defining raw material of the Stone Age.',
    },
  },
  {
    id: 'fossiliferous-limestone',
    group: 'sedimentary',
    name: { tr: 'Fosilli Kireçtaşı', en: 'Fossiliferous Limestone' },
    formula: 'CaCO₃',
    composition: { tr: 'Kalsit ve kabuk kalıntıları', en: 'Calcite and shell debris' },
    hardness: { tr: '3 Mohs', en: '3 Mohs' },
    whereFound: { tr: 'Kireçtaşı yarmalarında, yüzeyinde kabuk ve mercan kesitleri görünen bloklar', en: 'In limestone cuttings, as blocks with shells and coral sliced open across the face' },
    description: {
      tr: 'Kabuklar ve mercanlar kireç çamuruna gömülüp taşlaştığında oluşur; kırık yüzeyde kesitleri çıplak gözle seçilir. Bir yürüyüşçünün kendi başına fosil bulabileceği en olası kayaçtır.',
      en: 'Shells and corals buried in lime mud and turned to stone, their sections plain to the naked eye on a broken face. It is the likeliest rock for a walker to find a fossil in.',
    },
  },

  // --- Metamorphic ---------------------------------------------------------
  {
    id: 'marble',
    group: 'metamorphic',
    name: { tr: 'Mermer', en: 'Marble' },
    formula: 'CaCO₃',
    composition: { tr: 'Yeniden kristalleşmiş kalsit', en: 'Recrystallised calcite' },
    hardness: { tr: '3–4 Mohs', en: '3–4 Mohs' },
    whereFound: { tr: 'Mermer yataklarının yakınında, şeker gibi parlayan beyaz kırıklar', en: 'Near marble country, as white fragments that glitter like sugar' },
    description: {
      tr: 'Kireçtaşının ısı ve basınç altında yeniden kristalleşmiş hâli. Fosilleri silinir, yerine birbirine kenetlenmiş parlak kristaller gelir.',
      en: 'Limestone recrystallised under heat and pressure. Its fossils are erased and replaced by interlocking, light-catching crystals.',
    },
  },
  {
    id: 'slate',
    group: 'metamorphic',
    name: { tr: 'Arduvaz', en: 'Slate' },
    formula: 'Kil mineralleri · mika',
    composition: { tr: 'Mika ve klorit', en: 'Mica and chlorite' },
    hardness: { tr: '3–4 Mohs', en: '3–4 Mohs' },
    whereFound: { tr: 'Metamorfik yamaçlarda, düzgün ve ince koyu levhalar', en: 'On metamorphic slopes, as flat, thin, dark plates' },
    description: {
      tr: 'Şeylin basınç altında dönüşmesiyle oluşur; mineraller aynı yöne dizildiği için düzgün ince levhalar hâlinde ayrılır. Çatı örtüsü olarak kullanılır.',
      en: 'Shale altered under pressure, its minerals aligned so it splits into flat sheets — the reason it became a roofing stone.',
    },
  },
  {
    id: 'gneiss',
    group: 'metamorphic',
    name: { tr: 'Gnays', en: 'Gneiss' },
    formula: 'Kuvars · feldispat · mika',
    composition: { tr: 'Kuvars, feldispat, mika', en: 'Quartz, feldspar, mica' },
    hardness: { tr: '6–7 Mohs', en: '6–7 Mohs' },
    whereFound: { tr: 'Dere çakıllarında, açık ve koyu bantlı iri taneli taşlar', en: 'Among river cobbles, as coarse stones banded pale and dark' },
    description: {
      tr: 'Yüksek sıcaklık ve basınçta mineraller açık ve koyu bantlara ayrılır. Bu şeritli desen, kayacın derinlerde ne kadar zorlandığının kaydıdır.',
      en: 'At high temperature and pressure the minerals separate into pale and dark bands — a record of how hard the rock was worked at depth.',
    },
  },
  {
    id: 'schist',
    group: 'metamorphic',
    name: { tr: 'Şist', en: 'Schist' },
    formula: 'Mika ağırlıklı',
    composition: { tr: 'Mika, kuvars, granat', en: 'Mica, quartz, garnet' },
    hardness: { tr: '4–5 Mohs', en: '4–5 Mohs' },
    whereFound: { tr: 'Yol yarmalarında, ışıkta pul pul parıldayan levhalı taşlar', en: 'In road cuttings, as leafy stones that flash with flakes in the light' },
    description: {
      tr: 'Pullu mika kristalleri paralel dizilir; kayaç ışıkta parıldar ve levhalar hâlinde ayrılır. İçinde sıkça granat kristalleri bulunur.',
      en: 'Flaky mica crystals line up in parallel, so the rock glitters and splits into leaves, often with garnets set inside it.',
    },
  },
  {
    id: 'quartzite',
    group: 'metamorphic',
    name: { tr: 'Kuvarsit', en: 'Quartzite' },
    formula: 'SiO₂',
    composition: { tr: 'Kaynaşmış kuvars taneleri', en: 'Fused quartz grains' },
    hardness: { tr: '7 Mohs', en: '7 Mohs' },
    whereFound: { tr: 'Dere yataklarında, camsı kırılan çok sert beyaz-pembe çakıllar', en: 'In stream beds, as very hard white-pink cobbles with a glassy break' },
    description: {
      tr: 'Kumtaşının başkalaşmasıyla oluşur; taneler birbirine kaynadığı için kırık tanelerin arasından değil, içinden geçer. Aşınmaya çok dayanıklıdır.',
      en: 'Metamorphosed sandstone whose grains have fused, so a break passes through them rather than around them. It resists erosion strongly.',
    },
  },
  {
    id: 'phyllite',
    group: 'metamorphic',
    name: { tr: 'Fillit', en: 'Phyllite' },
    formula: 'Mika · klorit',
    composition: { tr: 'İnce mika pulları', en: 'Fine mica flakes' },
    hardness: { tr: '3–4 Mohs', en: '3–4 Mohs' },
    whereFound: { tr: 'Metamorfik arazide, ipeksi parlaklığı olan gümüşi gri levhalar', en: 'On metamorphic ground, as silver-grey sheets with a silky sheen' },
    description: {
      tr: 'Arduvazla şist arasındaki basamak. Yüzeyi ipeksi bir parlaklık taşır; bu parıltı henüz gözle seçilemeyen mika pullarından gelir.',
      en: 'The step between slate and schist, with a silky sheen that comes from mica flakes still too small to pick out by eye.',
    },
  },
  {
    id: 'serpentinite',
    group: 'metamorphic',
    name: { tr: 'Serpantinit', en: 'Serpentinite' },
    formula: 'Mg₃Si₂O₅(OH)₄',
    composition: { tr: 'Serpantin grubu mineraller', en: 'Serpentine-group minerals' },
    hardness: { tr: '3–4 Mohs', en: '3–4 Mohs' },
    whereFound: { tr: 'Ofiyolitik arazide ve dere yataklarında, sabunumsu dokunuşlu yeşil taşlar', en: 'On ophiolite ground and in stream beds, as green stones that feel soapy' },
    description: {
      tr: 'Okyanus kabuğunun manto kayaçlarının suyla tepkimesiyle oluşur. Üzerinde yetişen bitkiler ağır metallere dayanıklı, özgün topluluklar kurar.',
      en: 'Formed where mantle rock of the ocean floor reacts with water. The plants that grow on it form distinctive, metal-tolerant communities.',
    },
  },

  // --- Minerals ------------------------------------------------------------
  {
    id: 'quartz',
    group: 'mineral',
    name: { tr: 'Kuvars', en: 'Quartz' },
    formula: 'SiO₂',
    composition: { tr: 'Silisyum dioksit', en: 'Silicon dioxide' },
    hardness: { tr: '7 Mohs', en: '7 Mohs' },
    whereFound: { tr: 'Hemen her dere çakılında; süt beyazı ya da saydam, camı çizen taneler', en: 'In almost any stream gravel, as milky or clear grains that scratch glass' },
    description: {
      tr: 'Yerkabuğunun en bol ikinci mineralidir. Basınç altında elektrik üretir; saatlerdeki zaman ölçümü bu özelliğe dayanır.',
      en: 'The second most abundant mineral in the crust. It generates a current under pressure, which is how quartz watches keep time.',
    },
  },
  {
    id: 'amethyst',
    group: 'mineral',
    name: { tr: 'Ametist', en: 'Amethyst' },
    formula: 'SiO₂ (Fe izli)',
    composition: { tr: 'Demir izli kuvars', en: 'Quartz with iron traces' },
    hardness: { tr: '7 Mohs', en: '7 Mohs' },
    whereFound: { tr: 'Volkanik kayaç boşluklarında ve jeot içlerinde, mor uçlu billurlar', en: 'In cavities in volcanic rock and inside geodes, as violet-tipped crystals' },
    description: {
      tr: 'Moru, kristal yapısındaki demir izlerinin doğal ışınımla değişmesinden gelir. Isıtılırsa sarıya döner ve sitrine dönüşür.',
      en: 'Its violet comes from iron traces altered by natural radiation. Heated, it turns yellow and becomes citrine.',
    },
  },
  {
    id: 'feldspar',
    group: 'mineral',
    name: { tr: 'Feldispat', en: 'Feldspar' },
    formula: 'KAlSi₃O₈ – NaAlSi₃O₈ – CaAl₂Si₂O₈',
    composition: { tr: 'Alüminyum silikatlar', en: 'Aluminium silicates' },
    hardness: { tr: '6 Mohs', en: '6 Mohs' },
    whereFound: { tr: 'Granit çakıllarının içinde, pembe ya da beyaz düz yüzlü taneler', en: 'Inside granite pebbles, as pink or white grains with flat faces' },
    description: {
      tr: 'Yerkabuğunun yarısından fazlasını oluşturan mineral ailesi. Ayrışınca kile dönüşür; seramik ve cam sanayisinin temel hammaddesidir.',
      en: 'The mineral family that makes up over half the crust. Weathering turns it to clay, and it is the base material of ceramics and glass.',
    },
  },
  {
    id: 'muscovite',
    group: 'mineral',
    name: { tr: 'Mika (Muskovit)', en: 'Mica (Muscovite)' },
    formula: 'KAl₂(AlSi₃O₁₀)(OH)₂',
    composition: { tr: 'Tabakalı alüminyum silikat', en: 'Sheet aluminium silicate' },
    hardness: { tr: '2–3 Mohs', en: '2–3 Mohs' },
    whereFound: { tr: 'Şist ve granit parçalarında, tırnakla kalkan parlak pullar', en: 'In schist and granite, as bright flakes that lift with a fingernail' },
    description: {
      tr: 'Kâğıt inceliğinde, esnek ve saydam levhalar hâlinde ayrılır. Isıya dayanıklı olduğu için eskiden soba camı olarak kullanılırdı.',
      en: 'Splits into flexible, transparent sheets as thin as paper. Its heat resistance once made it the glass in stove doors.',
    },
  },
  {
    id: 'calcite',
    group: 'mineral',
    name: { tr: 'Kalsit', en: 'Calcite' },
    formula: 'CaCO₃',
    composition: { tr: 'Kalsiyum karbonat', en: 'Calcium carbonate' },
    hardness: { tr: '3 Mohs', en: '3 Mohs' },
    whereFound: { tr: 'Kireçtaşı çatlaklarında beyaz billurlar; sirke damlatınca köpürür', en: 'In cracks in limestone, as white crystals that fizz when vinegar is dropped on them' },
    description: {
      tr: 'Seyreltik asitle köpürerek tepkir; arazide kireçtaşını ayırt etmenin en hızlı yoludur. Saydam billurları görüntüyü ikiye ayırır.',
      en: 'Fizzes in dilute acid, the quickest field test for limestone. Its clear crystals split an image in two.',
    },
  },
  {
    id: 'pyrite',
    group: 'mineral',
    name: { tr: 'Pirit', en: 'Pyrite' },
    formula: 'FeS₂',
    composition: { tr: 'Demir sülfür', en: 'Iron sulphide' },
    hardness: { tr: '6–6.5 Mohs', en: '6–6.5 Mohs' },
    whereFound: { tr: 'Şeyl ve kömür katmanlarında, pirinç sarısı küpler', en: 'In shale and coal beds, as brassy cubes' },
    description: {
      tr: 'Pirinç sarısı parıltısı yüzünden “aptal altını” denir. Altından farkı, kübik kristal biçimi ve çizgi renginin siyah olmasıdır.',
      en: 'Called fool’s gold for its brassy shine. It is told from gold by its cubic crystals and its black streak.',
    },
  },
  {
    id: 'hematite',
    group: 'mineral',
    name: { tr: 'Hematit', en: 'Hematite' },
    formula: 'Fe₂O₃',
    composition: { tr: 'Demir oksit', en: 'Iron oxide' },
    hardness: { tr: '5–6 Mohs', en: '5–6 Mohs' },
    whereFound: { tr: 'Demirli topraklarda; çelik grisi, sürtünce kırmızı iz bırakan taşlar', en: 'In iron-rich ground, as steel-grey stones that leave a red mark when rubbed' },
    description: {
      tr: 'Dünyanın başlıca demir cevheridir. Kendisi çelik grisi olsa da bıraktığı iz kan kırmızısıdır; adı da buradan gelir.',
      en: 'The world’s chief iron ore. Steel-grey in the hand, it leaves a blood-red streak, which is where its name comes from.',
    },
  },
  {
    id: 'magnetite',
    group: 'mineral',
    name: { tr: 'Manyetit', en: 'Magnetite' },
    formula: 'Fe₃O₄',
    composition: { tr: 'Demir oksit', en: 'Iron oxide' },
    hardness: { tr: '5.5–6.5 Mohs', en: '5.5–6.5 Mohs' },
    whereFound: { tr: 'Kara kumlu plajlarda; mıknatıs kumun içinden doğrudan çeker', en: 'On black-sand beaches, where a magnet lifts it straight out of the sand' },
    description: {
      tr: 'Doğal olarak mıknatıslanabilen ender minerallerden. İlk pusulalar bu taşın yönlenme özelliğinden doğmuştur.',
      en: 'One of the few minerals that is naturally magnetic. The first compasses grew out of its habit of pointing north.',
    },
  },
  {
    id: 'gypsum',
    group: 'mineral',
    name: { tr: 'Jips (Alçıtaşı)', en: 'Gypsum' },
    formula: 'CaSO₄·2H₂O',
    composition: { tr: 'Sulu kalsiyum sülfat', en: 'Hydrated calcium sulphate' },
    hardness: { tr: '2 Mohs', en: '2 Mohs' },
    whereFound: { tr: 'Kurak havzalarda, saydam levhalar ya da çöl gülü topakları hâlinde', en: 'In arid basins, as clear plates or desert-rose clusters' },
    description: {
      tr: 'Tırnakla çizilebilecek kadar yumuşaktır. Isıtılıp suyu alınınca alçıya dönüşür; Meksika’da metrelerce uzunlukta kristalleri bulunmuştur.',
      en: 'Soft enough to scratch with a fingernail. Heated to drive off its water it becomes plaster, and in Mexico it has grown crystals metres long.',
    },
  },
  {
    id: 'halite',
    group: 'mineral',
    name: { tr: 'Kaya Tuzu', en: 'Halite' },
    formula: 'NaCl',
    composition: { tr: 'Sodyum klorür', en: 'Sodium chloride' },
    hardness: { tr: '2–2.5 Mohs', en: '2–2.5 Mohs' },
    whereFound: { tr: 'Tuz göllerinin kıyısında, kuruyan çamurda küp billurlar', en: 'At the edge of salt lakes, as cubic crystals in drying mud' },
    description: {
      tr: 'Kuruyan denizlerden çöken sofra tuzunun mineral hâli. Kübik kristaller verir ve yeraltında plastik gibi akarak tuz domları oluşturur.',
      en: 'Table salt as a mineral, left behind by drying seas. It grows in cubes and flows like putty underground to raise salt domes.',
    },
  },
  {
    id: 'fluorite',
    group: 'mineral',
    name: { tr: 'Florit', en: 'Fluorite' },
    formula: 'CaF₂',
    composition: { tr: 'Kalsiyum florür', en: 'Calcium fluoride' },
    hardness: { tr: '4 Mohs', en: '4 Mohs' },
    whereFound: { tr: 'Kireçtaşındaki damarlarda mor, yeşil ya da renksiz küpler', en: 'In veins through limestone, as purple, green or colourless cubes' },
    description: {
      tr: 'Mohs ölçeğinin dördüncü basamağıdır. Mor ötesi ışıkta parlar; “floresans” sözcüğü bu mineralin adından türemiştir.',
      en: 'The fourth step of the Mohs scale. It glows under ultraviolet light, and the word fluorescence is taken from its name.',
    },
  },
  {
    id: 'olivine',
    group: 'mineral',
    name: { tr: 'Olivin (Peridot)', en: 'Olivine (Peridot)' },
    formula: '(Mg,Fe)₂SiO₄',
    composition: { tr: 'Magnezyum demir silikat', en: 'Magnesium iron silicate' },
    hardness: { tr: '6.5–7 Mohs', en: '6.5–7 Mohs' },
    whereFound: { tr: 'Bazalt bloklarının içinde zeytin yeşili taneler; ofiyolit çakıllarında bol', en: 'As olive-green grains inside basalt, and common in ophiolite gravel' },
    description: {
      tr: 'Üst mantonun başlıca mineralidir; yani gezegenin hacimce en bol minerallerinden biri. Zeytin yeşili berrak taneleri peridot olarak kesilir.',
      en: 'The main mineral of the upper mantle, and so one of the most abundant on the planet by volume. Its clear olive grains are cut as peridot.',
    },
  },
  {
    id: 'agate',
    group: 'mineral',
    name: { tr: 'Akik', en: 'Agate' },
    formula: 'SiO₂',
    composition: { tr: 'Bantlı kalsedon', en: 'Banded chalcedony' },
    hardness: { tr: '6.5–7 Mohs', en: '6.5–7 Mohs' },
    whereFound: { tr: 'Dere yataklarında ve volkanik arazide; kırıldığında halka halka bantlı', en: 'In stream beds and on volcanic ground, banded in rings where it breaks' },
    description: {
      tr: 'Kayaç boşluğuna silis yüklü suyun katman katman çökelmesiyle oluşur; her bant ayrı bir dolum evresidir. Kuvarstan farkı, kristallerinin gözle seçilemeyecek kadar ince olmasıdır.',
      en: 'Silica-rich water settling into a cavity layer by layer, each band a separate filling. What sets it apart from quartz is that its crystals are too fine to pick out by eye.',
    },
  },
  {
    id: 'jasper',
    group: 'mineral',
    name: { tr: 'Jasp', en: 'Jasper' },
    formula: 'SiO₂ · Fe oksitleri',
    composition: { tr: 'Demir oksitle boyanmış kalsedon', en: 'Chalcedony stained by iron oxides' },
    hardness: { tr: '6.5–7 Mohs', en: '6.5–7 Mohs' },
    whereFound: { tr: 'Çakıl yataklarında; kırmızı, sarı ya da yeşil, mat ve çok sert parçalar', en: 'In gravel beds, as red, yellow or green pieces, dull-surfaced and very hard' },
    description: {
      tr: 'Kalsedonun kil ve demir oksitle bulanmış hâli; bu yüzden akiğin aksine saydam değil, mattır. Rengini hangi demir bileşiğinin baskın olduğu belirler.',
      en: 'Chalcedony clouded with clay and iron oxide, which is why it is opaque where agate is translucent. Which iron compound dominates decides its colour.',
    },
  },
  {
    id: 'geode',
    group: 'mineral',
    name: { tr: 'Jeot', en: 'Geode' },
    formula: 'SiO₂ · CaCO₃',
    composition: { tr: 'Kuvars ya da kalsit billurlu boşluk', en: 'A cavity lined with quartz or calcite' },
    hardness: { tr: 'Kabuğunda 7 Mohs', en: '7 Mohs at the rind' },
    whereFound: { tr: 'Volkanik ve kireçli arazide; dışı sıradan, içi billur dolu yuvarlak yumrular', en: 'On volcanic and limy ground, as plain round nodules with a crystal-lined hollow' },
    description: {
      tr: 'Kayaç içindeki bir gaz ya da çözünme boşluğuna sızan suyun billur bırakmasıyla oluşur. Dışarıdan sıradan bir yumrudur; içinin ne olduğu ancak kırılınca görünür.',
      en: 'A gas or solution cavity in rock where seeping water left its crystals behind. From outside it is a plain nodule, and only breaking it shows what is inside.',
    },
  },
];
