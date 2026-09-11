import type { Language } from '@/context/SettingsContext';

/** A string that exists in every language the handbook is written in. */
export type Localized = Record<Language, string>;

/**
 * The authoring shape for a plant. `division` is stated rather than inferred:
 * a growth form like "aquatic fern" or "shrub-like conifer" describes habit,
 * not ancestry, and reading ancestry out of it misfiled entries.
 */
export interface PlantEntry {
  id: string;
  division: 'bryophyte' | 'fern' | 'conifer' | 'flowering';
  name: Localized;
  scientificName: string;
  /** Growth form: the first of the three facts a plant card prints. */
  form: Localized;
  height: Localized;
  blooming: Localized;
  description: Localized;
}
/**
 * The authoring shape for an animal, written in both languages from the start
 * and carrying the three facts every animal card prints: where it lives, what
 * it eats, how big it is.
 */
export interface AnimalEntry {
  id: string;
  name: Localized;
  scientificName: string;
  habitat: Localized;
  diet: Localized;
  /** Body length, or wingspan where that is how the animal is measured. */
  size: Localized;
  description: Localized;
}

/** One pencil-bulleted line beside a species polaroid. */
export type SpeciesFact = {
  label: Localized;
  value: Localized;
};

/**
 * The single shape every handbook page renders. The per-domain interfaces
 * above stay as the authoring format for the data files; `toSpeciesEntry`
 * adapters in `lib/species.ts` fold them into this one.
 */
export interface SpeciesEntry {
  /** Unique across the whole book — it doubles as the deep-link hash. */
  id: string;
  categoryId: string;
  name: Localized;
  scientificName: string;
  description: Localized;
  facts: SpeciesFact[];
}
