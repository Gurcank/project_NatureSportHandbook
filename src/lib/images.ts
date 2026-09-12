import credits from '@/data/generated/image-credits.json';

type PhotoCredit = {
  file: string;
  artist: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

const photoCredits = credits as Record<string, PhotoCredit>;

/**
 * Photos are resolved by convention from the entry id rather than stored on
 * each record, so the fetch script can add or replace files without touching
 * the hand-authored data. A missing credit means a missing file, and the card
 * falls back to its hand-drawn empty state.
 */
export function speciesImage(entryId: string): string | null {
  const credit = photoCredits[entryId];
  return credit ? `/images/species/${credit.file}` : null;
}

type CreditRow = { id: string; credit: PhotoCredit };

/** How many photographs the book credits, whatever order they are read in. */
export function creditCount(): number {
  return Object.keys(photoCredits).length;
}

const sortedByName = new Map<string, CreditRow[]>();

/**
 * The credits in the order a reader would look something up in them: by the
 * name of the species, which is the word the line leads with. Turkish and
 * English sort differently — `ç` after `c`, `ı` before `i` — so the order is
 * per language, and cached because the list is long and every credits leaf
 * asks for the whole of it.
 */
export function allCredits(language: string, nameOf: (id: string) => string): CreditRow[] {
  const cached = sortedByName.get(language);
  if (cached) return cached;

  const rows = Object.entries(photoCredits)
    .map(([id, credit]) => ({ id, credit }))
    .sort((a, b) => nameOf(a.id).localeCompare(nameOf(b.id), language));

  sortedByName.set(language, rows);
  return rows;
}
