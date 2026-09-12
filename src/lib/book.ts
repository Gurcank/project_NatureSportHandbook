import type { Localized, SpeciesEntry } from '@/types';
import { mammals } from '@/data/mammals';
import { birds } from '@/data/birds';
import { reptiles } from '@/data/reptiles';
import { amphibians } from '@/data/amphibians';
import { fish } from '@/data/fish';
import { insects } from '@/data/insects';
import { invertebrates } from '@/data/invertebrates';
import { plants } from '@/data/plants';
import { ferns } from '@/data/ferns';
import { mushrooms } from '@/data/mushrooms';
import { sports } from '@/data/sports';
import { stones } from '@/data/stones';
import { fromAnimalEntry, fromFungus, fromPlantEntry, fromSport, fromStone } from './species';

type ChapterId = 'nature' | 'sport';

export type SectionLink = {
  sectionId: string;
  label: Localized;
  /** Printed beside the label, so a contents list names the group in both registers. */
  taxon?: string;
};

type SectionBase = {
  id: string;
  /**
   * What the edge tab is allowed to say. A tab is barely wider than the part
   * that overhangs the book, and a name cut off with an ellipsis is worse than
   * a name written short on purpose.
   */
  shortTitle?: Localized;
  slug: string;
  chapter: ChapterId;
  title: Localized;
  /** The scientific name of the group, printed under the heading. */
  taxon?: string;
};

export type Section =
  | { kind: 'cover'; id: 'home'; slug: '/' }
  | (SectionBase & { kind: 'opener'; intro: Localized; links: SectionLink[] })
  | (SectionBase & { kind: 'entries'; intro: Localized; entries: SpeciesEntry[] })
  | {
      kind: 'credits';
      id: 'credits';
      slug: '/credits';
      title: Localized;
      shortTitle?: Localized;
    };

export type EntriesSection = Extract<Section, { kind: 'entries' }>;

export type Chapter = {
  id: ChapterId;
  numeral: string;
  title: Localized;
  intro: Localized;
  links: SectionLink[];
};

function entriesSection(init: Omit<Extract<Section, { kind: 'entries' }>, 'kind'>): EntriesSection {
  return { kind: 'entries', ...init };
}

/* --- Animals: classes in evolutionary order ------------------------------ */

const animalSections: EntriesSection[] = [
  entriesSection({
    id: 'cnidarians',
    slug: '/nature/animals/cnidarians',
    chapter: 'nature',
    title: { tr: 'Knidliler', en: 'Cnidarians' },
    taxon: 'Cnidaria',
    intro: {
      tr: 'Denizanaları, mercanlar ve şakayıklar. Beyinleri, kanları ve iki yanlı simetrileri yoktur; hepsi yakıcı hücreyle avlanır.',
      en: 'Jellyfish, corals and anemones — no brain, no blood, no two-sided symmetry, and all of them hunting with stinging cells.',
    },
    entries: invertebrates
      .filter((entry) => entry.group === 'cnidaria')
      .map((entry) => fromAnimalEntry(entry, 'cnidarians')),
  }),
  entriesSection({
    id: 'molluscs',
    slug: '/nature/animals/molluscs',
    chapter: 'nature',
    title: { tr: 'Yumuşakçalar', en: 'Molluscs' },
    taxon: 'Mollusca',
    intro: {
      tr: 'Salyangozdan ahtapota uzanan yumuşak gövdeli şube. Çoğu kabuk salgılar, en zekileri onu bırakmıştır.',
      en: 'The soft-bodied phylum running from snail to octopus. Most secrete a shell; the cleverest gave theirs up.',
    },
    entries: invertebrates
      .filter((entry) => entry.group === 'mollusca')
      .map((entry) => fromAnimalEntry(entry, 'molluscs')),
  }),
  entriesSection({
    id: 'crustaceans',
    slug: '/nature/animals/crustaceans',
    chapter: 'nature',
    title: { tr: 'Kabuklular', en: 'Crustaceans' },
    taxon: 'Crustacea',
    intro: {
      tr: 'Eklembacaklıların suya bağlı kolu: yengeçler, ıstakozlar, karidesler. Solungaçla nefes alır, kabuk değiştirerek büyürler.',
      en: 'The water-bound branch of the arthropods — crabs, lobsters, shrimp — breathing through gills and growing by moult.',
    },
    entries: invertebrates
      .filter((entry) => entry.group === 'crustacea')
      .map((entry) => fromAnimalEntry(entry, 'crustaceans')),
  }),
  entriesSection({
    id: 'arachnids',
    slug: '/nature/animals/arachnids',
    chapter: 'nature',
    title: { tr: 'Örümceğimsiler', en: 'Arachnids' },
    taxon: 'Arachnida',
    intro: {
      tr: 'Sekiz bacaklı eklembacaklılar: örümcekler, akrepler, keneler. Böcek değildirler; anteni ve kanadı yoktur.',
      en: 'Eight-legged arthropods — spiders, scorpions, ticks. They are not insects: no antennae and no wings.',
    },
    entries: invertebrates
      .filter((entry) => entry.group === 'arachnida')
      .map((entry) => fromAnimalEntry(entry, 'arachnids')),
  }),
  entriesSection({
    id: 'insects',
    slug: '/nature/animals/insects',
    chapter: 'nature',
    title: { tr: 'Böcekler', en: 'Insects' },
    taxon: 'Insecta',
    intro: {
      tr: 'Altı bacaklı, dış iskeletli omurgasızlar. Bilinen hayvan türlerinin yarısından çoğu bu sınıfa girer.',
      en: 'Six-legged invertebrates with an external skeleton — more than half of all described animal species.',
    },
    entries: insects.map((insect) => fromAnimalEntry(insect, 'insects')),
  }),
  entriesSection({
    id: 'fish',
    slug: '/nature/animals/fish',
    chapter: 'nature',
    title: { tr: 'Balıklar', en: 'Fish' },
    taxon: 'Actinopterygii · Chondrichthyes',
    intro: {
      tr: 'Solungaçla nefes alan ilk omurgalılar. Kemikli ve kıkırdaklı olmak üzere iki büyük kola ayrılırlar.',
      en: 'The first gill-breathing vertebrates, splitting into two great lines: the bony and the cartilaginous.',
    },
    entries: fish.map((entry) => fromAnimalEntry(entry, 'fish')),
  }),
  entriesSection({
    id: 'amphibians',
    slug: '/nature/animals/amphibians',
    chapter: 'nature',
    title: { tr: 'Amfibiler', en: 'Amphibians' },
    taxon: 'Amphibia',
    intro: {
      tr: 'Karaya çıkan ilk dört ayaklılar. Yaşamlarını suyla kara arasında böler, derileriyle de nefes alırlar.',
      en: 'The first four-limbed animals ashore, splitting life between water and land and breathing through the skin.',
    },
    entries: amphibians.map((amphibian) => fromAnimalEntry(amphibian, 'amphibians')),
  }),
  entriesSection({
    id: 'reptiles',
    slug: '/nature/animals/reptiles',
    chapter: 'nature',
    title: { tr: 'Sürüngenler', en: 'Reptiles' },
    taxon: 'Reptilia',
    intro: {
      tr: 'Pullu derili, kabuklu yumurta bırakan omurgalılar. Yumurtanın kabuğu, suya bağımlılığı bitiren buluştu.',
      en: 'Scaled vertebrates that lay a shelled egg — the invention that finally broke the tie to water.',
    },
    entries: reptiles.map((reptile) => fromAnimalEntry(reptile, 'reptiles')),
  }),
  entriesSection({
    id: 'birds',
    slug: '/nature/animals/birds',
    chapter: 'nature',
    title: { tr: 'Kuşlar', en: 'Birds' },
    taxon: 'Aves',
    intro: {
      tr: 'Tüylü, sıcakkanlı omurgalılar. Bugün yaşayan tek dinozor koludur.',
      en: 'Feathered, warm-blooded vertebrates — and the only branch of the dinosaurs still living.',
    },
    entries: birds.map((bird) => fromAnimalEntry(bird, 'birds')),
  }),
  entriesSection({
    id: 'mammals',
    slug: '/nature/animals/mammals',
    chapter: 'nature',
    title: { tr: 'Memeliler', en: 'Mammals' },
    taxon: 'Mammalia',
    intro: {
      tr: 'Kıllı, sıcakkanlı ve yavrusunu sütle besleyen omurgalılar. Kutup buzundan çöle kadar her yerdeler.',
      en: 'Haired, warm-blooded vertebrates that nurse their young, at home from polar ice to open desert.',
    },
    entries: mammals.map((mammal) => fromAnimalEntry(mammal, 'mammals')),
  }),
];

/* --- Plants: divisions, not growth habit --------------------------------- */

const plantSections: EntriesSection[] = [
  entriesSection({
    id: 'plants-bryophytes',
    slug: '/nature/plants/bryophytes',
    chapter: 'nature',
    title: { tr: 'Kara Yosunları ve Ciğerotları', en: 'Mosses & Liverworts' },
    shortTitle: { tr: 'Yosunlar', en: 'Mosses' },
    taxon: 'Bryophyta · Marchantiophyta · Anthocerotophyta',
    intro: {
      tr: 'Damarsız, köksüz ilk kara bitkileri. Su ve besini doğrudan yüzeyleriyle emerler.',
      en: 'The first land plants — without vessels or true roots, taking water straight through their surface.',
    },
    entries: plants
      .filter((plant) => plant.division === 'bryophyte')
      .map((plant) => fromPlantEntry(plant, 'plants-bryophytes')),
  }),
  entriesSection({
    id: 'plants-ferns',
    slug: '/nature/plants/ferns',
    chapter: 'nature',
    title: { tr: 'Eğreltiler ve Atkuyrukları', en: 'Ferns & Horsetails' },
    shortTitle: { tr: 'Eğreltiler', en: 'Ferns' },
    taxon: 'Pteridophyta',
    intro: {
      tr: 'Damarlı ama tohumsuz bitkiler. Sporla çoğalırlar ve kömür ormanlarının kurucularıdır.',
      en: 'Vascular plants without seeds. They spread by spore, and they built the coal forests.',
    },
    entries: [
      ...ferns.map((fern) => fromPlantEntry(fern, 'plants-ferns')),
      ...plants
        .filter((plant) => plant.division === 'fern')
        .map((plant) => fromPlantEntry(plant, 'plants-ferns')),
    ],
  }),
  entriesSection({
    id: 'plants-conifers',
    slug: '/nature/plants/conifers',
    chapter: 'nature',
    title: { tr: 'Kozalaklılar', en: 'Conifers' },
    taxon: 'Pinophyta',
    intro: {
      tr: 'Tohumlarını kozalak pullarının üzerinde açıkta taşıyan ağaçlar. Meyveleri yoktur.',
      en: 'Trees that carry their seeds bare on cone scales. They bear no fruit.',
    },
    entries: plants
      .filter((plant) => plant.division === 'conifer')
      .map((plant) => fromPlantEntry(plant, 'plants-conifers')),
  }),
  entriesSection({
    id: 'plants-flowering',
    slug: '/nature/plants/flowering',
    chapter: 'nature',
    title: { tr: 'Çiçekli Bitkiler', en: 'Flowering Plants' },
    shortTitle: { tr: 'Çiçekliler', en: 'Flowering' },
    taxon: 'Magnoliophyta',
    intro: {
      tr: 'Çiçek açan ve tohumunu meyve içinde saklayan bitkiler. Bugün kara bitkilerinin büyük çoğunluğu bunlardır.',
      en: 'Plants that flower and enclose the seed in fruit — the overwhelming majority of land plants today.',
    },
    entries: plants
      .filter((plant) => plant.division === 'flowering')
      .map((plant) => fromPlantEntry(plant, 'plants-flowering')),
  }),
];

/* --- Fungi: divisions ----------------------------------------------------- */

const fungusSections: EntriesSection[] = [
  entriesSection({
    id: 'fungi-basidiomycota',
    slug: '/nature/fungi/basidiomycota',
    chapter: 'nature',
    title: { tr: 'Bazidiyomisetler', en: 'Club Fungi' },
    shortTitle: { tr: 'Şapkalılar', en: 'Club Fungi' },
    taxon: 'Basidiomycota',
    intro: {
      tr: 'Sporlarını şapkanın altındaki lamel ya da borucuklardan bırakan mantarlar. Şapkalı mantarların çoğu buradadır.',
      en: 'Fungi that drop their spores from gills or tubes beneath a cap — most of the mushrooms people know.',
    },
    entries: mushrooms
      .filter((fungus) => fungus.division === 'basidiomycota')
      .map((fungus) => fromFungus(fungus, 'fungi-basidiomycota')),
  }),
  entriesSection({
    id: 'fungi-ascomycota',
    slug: '/nature/fungi/ascomycota',
    chapter: 'nature',
    title: { tr: 'Askomisetler', en: 'Sac Fungi' },
    taxon: 'Ascomycota',
    intro: {
      tr: 'Sporlarını kese biçimli hücrelerin içinde olgunlaştırıp dışarı fırlatan mantarlar. Kuzugöbeği ve trüf bu koldandır.',
      en: 'Fungi that ripen their spores inside a sac and shoot them out. Morels and truffles belong here.',
    },
    entries: mushrooms
      .filter((fungus) => fungus.division === 'ascomycota')
      .map((fungus) => fromFungus(fungus, 'fungi-ascomycota')),
  }),
  entriesSection({
    id: 'fungi-lichens',
    slug: '/nature/fungi/lichens',
    chapter: 'nature',
    title: { tr: 'Likenler', en: 'Lichens' },
    taxon: 'Lichenes',
    intro: {
      tr: 'Bir mantarla bir yosunun tek bir organizma gibi yaşamasıyla oluşur. Kayaya ilk yerleşen canlılardır.',
      en: 'A fungus and an alga living as one organism — the first colonists of bare rock.',
    },
    entries: mushrooms
      .filter((fungus) => fungus.division === 'lichen')
      .map((fungus) => fromFungus(fungus, 'fungi-lichens')),
  }),
];

/* --- Stones: by how they formed ------------------------------------------ */

const stoneSections: EntriesSection[] = [
  entriesSection({
    id: 'stones-igneous',
    slug: '/nature/geology/igneous',
    chapter: 'nature',
    title: { tr: 'Magmatik Kayaçlar', en: 'Igneous Rocks' },
    shortTitle: { tr: 'Magmatik', en: 'Igneous' },
    taxon: 'Igneous',
    intro: {
      tr: 'Erimiş kayanın soğuyup katılaşmasıyla oluşur. Soğuma hızı kristallerin ne kadar irileşeceğini belirler.',
      en: 'Formed as molten rock cools and sets. How fast it cools decides how large the crystals grow.',
    },
    entries: stones
      .filter((stone) => stone.group === 'igneous')
      .map((stone) => fromStone(stone, 'stones-igneous')),
  }),
  entriesSection({
    id: 'stones-sedimentary',
    slug: '/nature/geology/sedimentary',
    chapter: 'nature',
    title: { tr: 'Tortul Kayaçlar', en: 'Sedimentary Rocks' },
    shortTitle: { tr: 'Tortul', en: 'Sedimentary' },
    taxon: 'Sedimentary',
    intro: {
      tr: 'Taşınan tanelerin ve canlı kalıntılarının katman katman birikip sıkışmasıyla oluşur. Fosiller yalnızca burada bulunur.',
      en: 'Built from grains and remains settling in layers and compacting. Fossils are found only here.',
    },
    entries: stones
      .filter((stone) => stone.group === 'sedimentary')
      .map((stone) => fromStone(stone, 'stones-sedimentary')),
  }),
  entriesSection({
    id: 'stones-metamorphic',
    slug: '/nature/geology/metamorphic',
    chapter: 'nature',
    title: { tr: 'Başkalaşım Kayaçları', en: 'Metamorphic Rocks' },
    shortTitle: { tr: 'Başkalaşım', en: 'Metamorphic' },
    taxon: 'Metamorphic',
    intro: {
      tr: 'Var olan bir kayacın erimeden, ısı ve basınç altında yeniden düzenlenmesiyle oluşur.',
      en: 'An existing rock rearranged by heat and pressure without ever melting.',
    },
    entries: stones
      .filter((stone) => stone.group === 'metamorphic')
      .map((stone) => fromStone(stone, 'stones-metamorphic')),
  }),
  entriesSection({
    id: 'stones-minerals',
    slug: '/nature/geology/minerals',
    chapter: 'nature',
    title: { tr: 'Mineraller', en: 'Minerals' },
    taxon: 'Mineralia',
    intro: {
      tr: 'Belirli bir kimyasal bileşimi ve düzenli kristal yapısı olan doğal katılar. Kayaçlar bunların bir araya gelmesidir.',
      en: 'Natural solids with a set chemistry and an ordered crystal structure. Rocks are aggregates of them.',
    },
    entries: stones
      .filter((stone) => stone.group === 'mineral')
      .map((stone) => fromStone(stone, 'stones-minerals')),
  }),
];

/* --- Sport ---------------------------------------------------------------- */

const sportSections: EntriesSection[] = [
  entriesSection({
    id: 'land-sports',
    slug: '/sport/land',
    chapter: 'sport',
    title: { tr: 'Kara Sporları', en: 'Land Sports' },
    intro: {
      tr: 'Yürüyerek, tırmanarak ve pedal çevirerek yapılanlar. Hepsinin ortak noktası kendi gücünle ilerlemektir.',
      en: 'What is done on foot, on rock and on wheels — all of it moving under your own power.',
    },
    entries: sports
      .filter((sport) => sport.element === 'land')
      .map((sport) => fromSport(sport, 'land-sports')),
  }),
  entriesSection({
    id: 'water-sports',
    slug: '/sport/water',
    chapter: 'sport',
    title: { tr: 'Su Sporları', en: 'Water Sports' },
    intro: {
      tr: 'Akıntı, dalga ve derinlikle yapılanlar. Suyun kendisi hem araç hem engeldir.',
      en: 'Done with current, wave and depth, where the water is both the vehicle and the obstacle.',
    },
    entries: sports
      .filter((sport) => sport.element === 'water')
      .map((sport) => fromSport(sport, 'water-sports')),
  }),
  entriesSection({
    id: 'air-sports',
    slug: '/sport/air',
    chapter: 'sport',
    title: { tr: 'Hava Sporları', en: 'Air Sports' },
    intro: {
      tr: 'Yükselen havayı ve düşüşü kullananlar. Hepsinde iniş, kalkıştan daha çok hazırlık ister.',
      en: 'Using rising air and falling weight. In all of them the landing takes more preparation than the launch.',
    },
    entries: sports
      .filter((sport) => sport.element === 'air')
      .map((sport) => fromSport(sport, 'air-sports')),
  }),
];

function linksFor(entrySections: EntriesSection[]): SectionLink[] {
  return entrySections.map((section) => ({
    sectionId: section.id,
    label: section.title,
    taxon: section.taxon,
  }));
}

export const sections: Section[] = [
  { kind: 'cover', id: 'home', slug: '/' },

  {
    kind: 'opener',
    id: 'animals',
    slug: '/nature/animals',
    chapter: 'nature',
    title: { tr: 'Hayvanlar', en: 'Animals' },
    taxon: 'Animalia',
    intro: {
      tr: 'Şubeler ve sınıflar, ortaya çıkış sıralarına göre dizildi: knidlilerden memelilere.',
      en: 'The phyla and classes are set out in the order they appeared, from the cnidarians to the mammals.',
    },
    links: linksFor(animalSections),
  },
  ...animalSections,

  {
    kind: 'opener',
    id: 'plants',
    slug: '/nature/plants',
    chapter: 'nature',
    title: { tr: 'Bitkiler', en: 'Plants' },
    taxon: 'Plantae',
    intro: {
      tr: 'Bölümler, karaya çıkıştan çiçeğe uzanan sırayla: yosunlar, eğreltiler, açık ve kapalı tohumlular.',
      en: 'The divisions run from the move ashore to the flower: mosses, ferns, then the seed plants.',
    },
    links: linksFor(plantSections),
  },
  ...plantSections,

  {
    kind: 'opener',
    id: 'mushrooms',
    slug: '/nature/fungi',
    chapter: 'nature',
    title: { tr: 'Mantarlar', en: 'Mushrooms' },
    taxon: 'Fungi',
    intro: {
      tr: 'Ne bitki ne hayvan; kendi âlemleri. Sporlarını nasıl ürettiklerine göre ayrılırlar.',
      en: 'Neither plant nor animal but a kingdom of their own, divided by how they make their spores.',
    },
    links: linksFor(fungusSections),
  },
  ...fungusSections,

  {
    kind: 'opener',
    id: 'stones',
    slug: '/nature/geology',
    chapter: 'nature',
    title: { tr: 'Taşlar ve Mineraller', en: 'Stones & Minerals' },
    shortTitle: { tr: 'Taşlar', en: 'Stones' },
    taxon: 'Petrologia · Mineralogia',
    intro: {
      tr: 'Kayaçlar nasıl oluştuklarına göre üçe ayrılır; mineraller ise kayaçları kuran yapı taşlarıdır.',
      en: 'Rocks fall into three groups by how they formed, and minerals are the building blocks they are made of.',
    },
    links: linksFor(stoneSections),
  },
  ...stoneSections,

  {
    kind: 'opener',
    id: 'sport',
    slug: '/sport',
    chapter: 'sport',
    title: { tr: 'Spor', en: 'Sport' },
    intro: {
      tr: 'Kara, su ve hava sporları hakkında notlar.',
      en: 'Notes about land, water, and air sports.',
    },
    links: linksFor(sportSections),
  },
  ...sportSections,

  {
    kind: 'credits',
    id: 'credits',
    slug: '/credits',
    title: { tr: 'Fotoğraf Künyesi', en: 'Photo Credits' },
    shortTitle: { tr: 'Künye', en: 'Credits' },
  },
];

export const chapters: Chapter[] = [
  {
    id: 'nature',
    numeral: 'Ⅰ',
    title: { tr: 'Doğa', en: 'Nature' },
    intro: {
      tr: 'Hayvanlar, bitkiler, mantarlar ve taşlar hakkında notlar.',
      en: 'Notes about animals, plants, mushrooms, and stones.',
    },
    links: [
      { sectionId: 'animals', label: { tr: 'Hayvanlar', en: 'Animals' }, taxon: 'Animalia' },
      { sectionId: 'plants', label: { tr: 'Bitkiler', en: 'Plants' }, taxon: 'Plantae' },
      { sectionId: 'mushrooms', label: { tr: 'Mantarlar', en: 'Mushrooms' }, taxon: 'Fungi' },
      {
        sectionId: 'stones',
        label: { tr: 'Taşlar ve Mineraller', en: 'Stones & Minerals' },
        taxon: 'Petrologia · Mineralogia',
      },
    ],
  },
  {
    id: 'sport',
    numeral: 'Ⅱ',
    title: { tr: 'Spor', en: 'Sport' },
    intro: {
      tr: 'Kara, su ve hava sporları hakkında notlar.',
      en: 'Notes about land, water, and air sports.',
    },
    links: linksFor(sportSections),
  },
];

const sectionsById = new Map(sections.map((section) => [section.id, section]));
const sectionsBySlug = new Map(sections.map((section) => [section.slug, section]));

export function sectionById(id: string): Section | undefined {
  return sectionsById.get(id);
}

export function sectionBySlug(slug: string): Section | undefined {
  return sectionsBySlug.get(slug);
}

export function sectionSlugs(): string[] {
  return sections.map((section) => section.slug);
}

/**
 * Which edge tab should read as current. Sub-sections light up their opener's
 * tab — reading about mammals still means you are in Animals.
 */
const TAB_PARENT: Record<string, string> = {
  ...Object.fromEntries(animalSections.map((section) => [section.id, 'animals'])),
  ...Object.fromEntries(plantSections.map((section) => [section.id, 'plants'])),
  ...Object.fromEntries(fungusSections.map((section) => [section.id, 'mushrooms'])),
  ...Object.fromEntries(stoneSections.map((section) => [section.id, 'stones'])),
  ...Object.fromEntries(sportSections.map((section) => [section.id, 'sport'])),
};

export function tabSectionFor(sectionId: string): string {
  return TAB_PARENT[sectionId] ?? sectionId;
}

export const HOME_TITLE: Localized = {
  tr: 'Doğa ve Spor El Kitabı',
  en: 'Nature & Sport Handbook',
};

export function sectionTitle(section: Section): Localized {
  return section.kind === 'cover' ? HOME_TITLE : section.title;
}

/** Entry lookup for the photo credits leaves, which only hold ids. */
const entriesById = new Map(
  sections.flatMap((section) =>
    section.kind === 'entries' ? section.entries.map((entry) => [entry.id, entry] as const) : [],
  ),
);

export function entryById(id: string): SpeciesEntry | undefined {
  return entriesById.get(id);
}
