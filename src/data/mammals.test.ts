import { describe, expect, it } from 'vitest';
import { mammalSpreads } from './mammals';

// Smoke test for the hand-authored 72-mammal dataset: with this many
// manually copy-pasted entries, a duplicate id is an easy mistake to make
// and would silently break lookups (AnimalDetailPage matches by id) and
// React list keys.
describe('mammals data', () => {
  const allMammals = mammalSpreads.en.flat();

  it('has entries', () => {
    expect(allMammals.length).toBeGreaterThan(0);
  });

  it('has no duplicate ids', () => {
    const ids = allMammals.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every entry a non-empty bilingual name and description', () => {
    for (const mammal of allMammals) {
      expect(mammal.name.tr.trim()).not.toBe('');
      expect(mammal.name.en.trim()).not.toBe('');
      expect(mammal.description.tr.trim()).not.toBe('');
      expect(mammal.description.en.trim()).not.toBe('');
    }
  });
});
