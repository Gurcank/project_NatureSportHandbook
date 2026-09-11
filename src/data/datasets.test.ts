import { describe, expect, it } from 'vitest';
import type { Localized } from '@/types';
import { amphibians } from './amphibians';
import { birds } from './birds';
import { ferns } from './ferns';
import { fish } from './fish';
import { insects } from './insects';
import { invertebrates } from './invertebrates';
import { mammals } from './mammals';
import { mushrooms } from './mushrooms';
import { plants } from './plants';
import { reptiles } from './reptiles';
import { sports } from './sports';
import { stones } from './stones';

/**
 * Every dataset is hand-authored and fills the same entry template. Three
 * things are worth guarding mechanically: a duplicate id would silently break
 * both the photograph lookup and React's list keys; an empty half of a
 * `Localized` pair would print one language into the other, which is exactly
 * the fault this rewrite set out to remove; and a missing fact would leave a
 * hole in a template that promises three labelled lines on every card.
 */
type Entry = { id: string };

const ANIMAL_FACTS = ['habitat', 'diet', 'size'];
const PLANT_FACTS = ['form', 'height', 'blooming'];

const datasets: [string, Entry[], string[]][] = [
  ['insects', insects, ANIMAL_FACTS],
  ['amphibians', amphibians, ANIMAL_FACTS],
  ['fish', fish, ANIMAL_FACTS],
  ['reptiles', reptiles, ANIMAL_FACTS],
  ['birds', birds, ANIMAL_FACTS],
  ['mammals', mammals, ANIMAL_FACTS],
  ['invertebrates', invertebrates, ANIMAL_FACTS],
  ['plants', plants, PLANT_FACTS],
  ['ferns', ferns, PLANT_FACTS],
  ['mushrooms', mushrooms, ['edibility', 'habitat', 'season']],
  ['sports', sports, ['terrain', 'gear', 'season']],
  ['stones', stones, ['composition', 'hardness', 'whereFound']],
];

function isFilledLocalized(value: unknown): boolean {
  const localized = value as Localized | undefined;
  return Boolean(localized?.tr?.trim() && localized?.en?.trim());
}

describe.each(datasets)('%s', (name, entries, facts) => {
  it('has entries', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('has no duplicate ids', () => {
    const ids = entries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('fills both languages of the name and description', () => {
    for (const entry of entries) {
      for (const field of ['name', 'description']) {
        expect(isFilledLocalized((entry as Record<string, unknown>)[field]), `${name}/${entry.id}.${field}`).toBe(true);
      }
    }
  });

  it('fills all three facts in both languages', () => {
    for (const entry of entries) {
      for (const field of facts) {
        expect(isFilledLocalized((entry as Record<string, unknown>)[field]), `${name}/${entry.id}.${field}`).toBe(true);
      }
    }
  });
});
