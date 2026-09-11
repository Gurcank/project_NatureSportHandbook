import type { PlantEntry } from '@/types';

/**
 * Pteridophytes — the vascular plants that reproduce by spore rather than
 * seed. They carry the same three facts as every other plant in the book, with
 * the flowering slot given over to when the spores ripen, because that is the
 * season a fern is actually identified in.
 */
export const ferns: PlantEntry[] = [
  {
    id: 'bracken',
    division: 'fern',
    name: { tr: 'Kartal Eğreltisi', en: 'Bracken' },
    scientificName: 'Pteridium aquilinum',
    form: { tr: 'Yayılan yer eğreltisi', en: 'Spreading ground fern' },
    height: { tr: '0.5–2 m', en: '0.5–2 m' },
    blooming: { tr: 'Çiçeksiz; sporlar Temmuz–Eylül', en: 'No flowers; spores July–September' },
    description: {
      tr: 'Açık yamaçlarda ve seyrek ormanda tek başına duran, üçe bölünmüş iri yapraklarıyla tanınır. Dünyanın en yaygın eğreltisidir; yer altı gövdesiyle yayılıp başka hiçbir bitkiye yer bırakmayan örtüler kurar.',
      en: 'Big triple-divided fronds standing singly on open hillsides and in thin woodland. It is the commonest fern on earth, spreading by underground stems into mats that leave room for nothing else.',
    },
  },
  {
    id: 'male-fern',
    division: 'fern',
    name: { tr: 'Erkek Eğrelti', en: 'Male Fern' },
    scientificName: 'Dryopteris filix-mas',
    form: { tr: 'Rozet oluşturan orman eğreltisi', en: 'Shuttlecock woodland fern' },
    height: { tr: '0.6–1.2 m', en: '0.6–1.2 m' },
    blooming: { tr: 'Çiçeksiz; sporlar Temmuz–Ağustos', en: 'No flowers; spores July–August' },
    description: {
      tr: 'Nemli orman tabanında yaprakları taç biçiminde bir rozet kurar; tek bir kökten huni gibi açılır. Yaprak altındaki kahverengi spor kümeleri böbrek biçimli bir zarla örtülüdür.',
      en: 'On damp woodland floor its fronds rise from one crown in a funnel like a shuttlecock. The brown spore clusters beneath the frond are each capped by a kidney-shaped flap.',
    },
  },
  {
    id: 'hart-tongue-fern',
    division: 'fern',
    name: { tr: 'Geyik Dili Eğreltisi', en: 'Hart’s-tongue Fern' },
    scientificName: 'Asplenium scolopendrium',
    form: { tr: 'Kaya çatlağı eğreltisi', en: 'Crevice fern' },
    height: { tr: '20–60 cm', en: '20–60 cm' },
    blooming: { tr: 'Çiçeksiz; sporlar Temmuz–Ekim', en: 'No flowers; spores July–October' },
    description: {
      tr: 'Kireçli kaya çatlaklarında ve gölgeli duvarlarda yetişir; bölünmemiş, kayış gibi parlak yaprakları eğreltiler arasında sıra dışıdır. Sporları yaprağın altında paralel çizgiler hâlinde dizilir.',
      en: 'It grows in limestone crevices and on shaded walls, and its undivided, strap-like glossy fronds are unusual among ferns. The spores lie beneath in neat parallel lines.',
    },
  },
  {
    id: 'maidenhair-fern',
    division: 'fern',
    name: { tr: 'Baldırıkara', en: 'Maidenhair Fern' },
    scientificName: 'Adiantum capillus-veneris',
    form: { tr: 'Su kenarı eğreltisi', en: 'Waterside fern' },
    height: { tr: '15–40 cm', en: '15–40 cm' },
    blooming: { tr: 'Çiçeksiz; sporlar Mayıs–Ekim', en: 'No flowers; spores May–October' },
    description: {
      tr: 'Damlayan kaynak kenarlarında ve mağara ağızlarında, saç inceliğinde siyah sapları ve yelpaze yaprakçıklarıyla tanınır. Yaprakları su tutmaz; damlalar üzerinden hiç ıslatmadan kayıp gider.',
      en: 'At dripping springs and cave mouths, known by hair-fine black stalks and fan-shaped leaflets. Its fronds shed water completely — a drop runs off without wetting them.',
    },
  },
  {
    id: 'royal-fern',
    division: 'fern',
    name: { tr: 'Kral Eğreltisi', en: 'Royal Fern' },
    scientificName: 'Osmunda regalis',
    form: { tr: 'Bataklık kenarı eğreltisi', en: 'Bog-margin fern' },
    height: { tr: '1–2 m', en: '1–2 m' },
    blooming: { tr: 'Çiçeksiz; sporlar Haziran–Ağustos', en: 'No flowers; spores June–August' },
    description: {
      tr: 'Bataklık kenarlarında ve dere boylarında yetişen, Avrupa’nın en iri eğreltilerindendir. Sporlarını yaprak altında değil, yaprağın ucundaki ayrı bir kahverengi salkımda taşır.',
      en: 'One of the largest ferns in Europe, growing at bog margins and along stream banks. It carries its spores not beneath the frond but in a separate brown plume at the frond’s tip.',
    },
  },
  {
    id: 'ostrich-fern',
    division: 'fern',
    name: { tr: 'Devekuşu Eğreltisi', en: 'Ostrich Fern' },
    scientificName: 'Matteuccia struthiopteris',
    form: { tr: 'Rozet oluşturan taşkın ovası eğreltisi', en: 'Shuttlecock floodplain fern' },
    height: { tr: '1–1.7 m', en: '1–1.7 m' },
    blooming: { tr: 'Çiçeksiz; sporlar Ağustos–Eylül', en: 'No flowers; spores August–September' },
    description: {
      tr: 'Nemli taşkın ovalarında yayılır; yaprak rozeti devekuşu tüyüne benzediği için bu adı almıştır. Baharda açılan kıvrık sürgünleri Kuzey Amerika’da toplanıp sebze olarak yenir.',
      en: 'It spreads across moist floodplains, and the ring of fronds is named for its likeness to an ostrich plume. The coiled shoots that open in spring are gathered and eaten as a vegetable in North America.',
    },
  },
  {
    id: 'polypody',
    division: 'fern',
    name: { tr: 'Kaya Eğreltisi', en: 'Common Polypody' },
    scientificName: 'Polypodium vulgare',
    form: { tr: 'Kaya ve ağaç üstü eğreltisi', en: 'Rock and epiphytic fern' },
    height: { tr: '10–40 cm', en: '10–40 cm' },
    blooming: { tr: 'Çiçeksiz; sporlar Ağustos–Kasım', en: 'No flowers; spores August–November' },
    description: {
      tr: 'Kayalarda, taş duvarlarda ve ağaç gövdelerinde toprağa hiç değmeden yetişebilir. Yaprak altındaki yuvarlak turuncu spor kümeleri örtüsüzdür ve uzaktan bile seçilir.',
      en: 'It grows on rock, stone walls and tree trunks without ever touching soil. The round orange spore clusters beneath the frond have no covering flap and show from a distance.',
    },
  },
  {
    id: 'horsetail',
    division: 'fern',
    name: { tr: 'Atkuyruğu', en: 'Field Horsetail' },
    scientificName: 'Equisetum arvense',
    form: { tr: 'Boğumlu sürgünlü otsu', en: 'Jointed-stemmed herb' },
    height: { tr: '20–60 cm', en: '20–60 cm' },
    blooming: { tr: 'Çiçeksiz; sporlar Mart–Mayıs', en: 'No flowers; spores March–May' },
    description: {
      tr: 'Nemli tarla kenarlarında ve hendeklerde, boğumlu ve içi boş gövdeleriyle tanınır; yaprakları halka hâlinde küçük pullardır. Dokusunda silis biriktirir, bu yüzden gövdesi kalay parlatmakta kullanılırdı.',
      en: 'At damp field edges and in ditches, known by its jointed hollow stems, its leaves reduced to a ring of scales. It lays down silica in its tissue, which is why the stems were once used to polish pewter.',
    },
  },
  {
    id: 'hard-fern',
    division: 'fern',
    name: { tr: 'Sert Eğrelti', en: 'Hard Fern' },
    scientificName: 'Blechnum spicant',
    form: { tr: 'Asidik orman eğreltisi', en: 'Acid woodland fern' },
    height: { tr: '20–50 cm', en: '20–50 cm' },
    blooming: { tr: 'Çiçeksiz; sporlar Haziran–Eylül', en: 'No flowers; spores June–September' },
    description: {
      tr: 'Asidik orman topraklarında yetişir ve iki tip yaprak taşır: yere yayılan kısır yapraklar, dik duran daha dar üreme yaprakları. İki yaprağı görmek onu tanımak için yeterlidir.',
      en: 'It grows on acid woodland soils and carries two kinds of frond: sterile ones spread flat, and narrower fertile ones standing upright. Seeing both is enough to name it.',
    },
  },
  {
    id: 'water-clover',
    division: 'fern',
    name: { tr: 'Su Yoncası', en: 'Water Clover' },
    scientificName: 'Marsilea quadrifolia',
    form: { tr: 'Sucul eğrelti', en: 'Aquatic fern' },
    height: { tr: '5–20 cm', en: '5–20 cm' },
    blooming: { tr: 'Çiçeksiz; spor kapsülü yaz sonunda', en: 'No flowers; spore capsules in late summer' },
    description: {
      tr: 'Sığ göllerde ve çeltik tarlalarında yüzer; dört yapraklı yonca gibi görünse de bir eğreltidir. Sporları, kuruyup on yıllarca canlı kalabilen sert kapsüllerde saklanır.',
      en: 'Floating in shallow lakes and rice paddies, it looks like a four-leaved clover but is a fern. Its spores are held in hard capsules that can dry out and stay viable for decades.',
    },
  },
];
