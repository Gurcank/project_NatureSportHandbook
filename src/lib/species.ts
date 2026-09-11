import type { AnimalEntry, Localized, PlantEntry, SpeciesEntry, SpeciesFact } from '@/types';
import type { FungusEntry } from '@/data/mushrooms';
import type { SportEntry } from '@/data/sports';
import type { StoneEntry } from '@/data/stones';
import { slugify } from './slug';

const FACT_LABELS = {
  diet: { tr: 'Beslenme', en: 'Diet' },
  habitat: { tr: 'Yaşam alanı', en: 'Habitat' },
  form: { tr: 'Yaşam formu', en: 'Growth form' },
  region: { tr: 'Bölge', en: 'Region' },
  height: { tr: 'Boy', en: 'Height' },
  blooming: { tr: 'Çiçeklenme', en: 'Blooming' },
  hardness: { tr: 'Sertlik', en: 'Hardness' },
  size: { tr: 'Boyut', en: 'Size' },
  color: { tr: 'Renk', en: 'Color' },
  edibility: { tr: 'Yenirlik', en: 'Edibility' },
  season: { tr: 'Mevsim', en: 'Season' },
  composition: { tr: 'Bileşim', en: 'Composition' },
  whereFound: { tr: 'Nerede bulunur', en: 'Where to find' },
  terrain: { tr: 'Arazi', en: 'Terrain' },
  gear: { tr: 'Ekipman', en: 'Gear' },
} satisfies Record<string, Localized>;

/** Drops a fact whose value is missing in either language rather than printing half of it. */
function fact(label: Localized, value: Localized | undefined): SpeciesFact | null {
  if (!value) return null;
  return value.tr.trim() && value.en.trim() ? { label, value } : null;
}

function compact(facts: (SpeciesFact | null)[]): SpeciesFact[] {
  return facts.filter((entry): entry is SpeciesFact => entry !== null);
}

/** Namespaced so ids stay unique across the whole book, which the deep-link hash relies on. */
export function speciesId(categoryId: string, rawId: string): string {
  return `${categoryId}-${slugify(rawId)}`;
}

/**
 * The bilingual animal shape: habitat, diet and size, in the order the entry
 * template prints them.
 */
export function fromAnimalEntry(entry: AnimalEntry, categoryId: string): SpeciesEntry {
  return {
    id: speciesId(categoryId, entry.id),
    categoryId,
    name: entry.name,
    scientificName: entry.scientificName,
    description: entry.description,
    facts: compact([
      fact(FACT_LABELS.habitat, entry.habitat),
      fact(FACT_LABELS.diet, entry.diet),
      fact(FACT_LABELS.size, entry.size),
    ]),
  };
}

export function fromPlantEntry(plant: PlantEntry, categoryId: string): SpeciesEntry {
  return {
    id: speciesId(categoryId, plant.id),
    categoryId,
    name: plant.name,
    scientificName: plant.scientificName,
    description: plant.description,
    facts: compact([
      fact(FACT_LABELS.form, plant.form),
      fact(FACT_LABELS.height, plant.height),
      fact(FACT_LABELS.blooming, plant.blooming),
    ]),
  };
}

export function fromFungus(fungus: FungusEntry, categoryId: string): SpeciesEntry {
  return {
    id: speciesId(categoryId, fungus.id),
    categoryId,
    name: fungus.name,
    scientificName: fungus.scientificName,
    description: fungus.description,
    facts: compact([
      fact(FACT_LABELS.edibility, fungus.edibility),
      fact(FACT_LABELS.habitat, fungus.habitat),
      fact(FACT_LABELS.season, fungus.season),
    ]),
  };
}

export function fromSport(sport: SportEntry, categoryId: string): SpeciesEntry {
  return {
    id: speciesId(categoryId, sport.id),
    categoryId,
    name: sport.name,
    scientificName: sport.formalName,
    description: sport.description,
    facts: compact([
      fact(FACT_LABELS.terrain, sport.terrain),
      fact(FACT_LABELS.gear, sport.gear),
      fact(FACT_LABELS.season, sport.season),
    ]),
  };
}

export function fromStone(stone: StoneEntry, categoryId: string): SpeciesEntry {
  return {
    id: speciesId(categoryId, stone.id),
    categoryId,
    name: stone.name,
    scientificName: stone.formula,
    description: stone.description,
    facts: compact([
      fact(FACT_LABELS.composition, stone.composition),
      fact(FACT_LABELS.hardness, stone.hardness),
      fact(FACT_LABELS.whereFound, stone.whereFound),
    ]),
  };
}
