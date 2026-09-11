import { tabSectionFor } from './book';

/**
 * The paper colours the handbook sticks to a page: post-it notes and the tabs
 * down the book's edges draw from the same set, so a section's tab and its
 * note are the same piece of stationery.
 */
export type StickyTone = 'sky' | 'tangerine' | 'moss' | 'rose' | 'clay' | 'sun';

export const TONE_VARIABLE: Record<StickyTone, string> = {
  sky: 'var(--postit-sky)',
  tangerine: 'var(--postit-tangerine)',
  moss: 'var(--postit-moss)',
  rose: 'var(--postit-rose)',
  clay: 'var(--postit-clay)',
  sun: 'var(--postit-sun)',
};

/**
 * Colour carries the hierarchy rather than decorating it. The blue tabs are the
 * top level — the book's own divisions — and every group inside one takes its
 * family's colour, so a glance down the edge tells you which kingdom you are in
 * before you have read a word.
 */
const FAMILY_TONE: Record<string, StickyTone> = {
  animals: 'tangerine',
  plants: 'moss',
  mushrooms: 'rose',
  stones: 'clay',
  sport: 'sun',
};

export function sectionTone(sectionId: string): StickyTone {
  const family = tabSectionFor(sectionId);
  return family === sectionId ? 'sky' : (FAMILY_TONE[family] ?? 'sky');
}
