import { describe, expect, it } from 'vitest';
import { findSearchMatch, normalizeText } from './search';

describe('normalizeText', () => {
  it('lowercases using the given locale', () => {
    expect(normalizeText('HIKING', 'en')).toBe('hiking');
  });

  it('strips Turkish accents so ascii and accented queries both match', () => {
    expect(normalizeText('Yürüyüş', 'tr')).toBe('yuruyus');
    expect(normalizeText('Doğa', 'tr')).toBe('doga');
  });

  it('trims surrounding whitespace', () => {
    expect(normalizeText('  plants  ', 'en')).toBe('plants');
  });
});

// findSearchMatch expects an already-normalized query (Navigation.tsx calls
// normalizeText on the raw input before passing it in) — these tests mirror
// that call site rather than passing raw strings straight in.
describe('findSearchMatch', () => {
  it('matches an English keyword to its route', () => {
    expect(findSearchMatch(normalizeText('animals', 'en'), 'en')?.href).toBe('/nature/animals');
  });

  it('matches an accented Turkish query to its route', () => {
    expect(findSearchMatch(normalizeText('taşlar', 'tr'), 'tr')?.href).toBe('/nature/stones');
  });

  it('matches on a partial/substring query', () => {
    expect(findSearchMatch(normalizeText('kano', 'tr'), 'tr')?.href).toBe('/sport/water-sports');
  });

  it('returns undefined when nothing matches', () => {
    expect(
      findSearchMatch(normalizeText('this query matches nothing at all', 'en'), 'en'),
    ).toBeUndefined();
  });
});
