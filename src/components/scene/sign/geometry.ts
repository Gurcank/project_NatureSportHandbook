/* The sign's measurements and the shape of a run of paint. */

export const SUBTITLE = {
  tr: 'Doğa ve spor kâşifleri için araziye hazır notlar',
  en: 'Field-ready notes for nature and sport explorers',
};

/** A plainly sawn plank: the age is on its face, not bitten out of its edge. */
export const PLANK =
  'M8 16 C 160 10, 380 15, 600 11 L 664 13 L 790 110 L 664 207 L 600 209 C 380 206, 160 211, 10 204 Z';

export const TITLE_BASELINE = 102;
export const SUBTITLE_BASELINE = 146;
export const TEXT_CENTRE = 344;

/**
 * Where the paint gathered and ran, as fractions across the lettering's own
 * width. Mostly short: a wall painted quickly gives a couple of long runs and a
 * lot of small ones, not an even row of them.
 */
export const DRIP_STOPS = [
  { at: 0.08, length: 7, width: 1.5, opacity: 0.5 },
  { at: 0.19, length: 24, width: 2.2, opacity: 0.72 },
  { at: 0.31, length: 6, width: 1.3, opacity: 0.44 },
  { at: 0.42, length: 12, width: 1.8, opacity: 0.58 },
  { at: 0.55, length: 32, width: 2.5, opacity: 0.78 },
  { at: 0.66, length: 9, width: 1.5, opacity: 0.5 },
  { at: 0.79, length: 17, width: 2, opacity: 0.62 },
  { at: 0.91, length: 6, width: 1.4, opacity: 0.46 },
];

/**
 * One run of paint: a band as wide as the stroke it left, pinched in the middle
 * where gravity stretched it, ending in the bead that stopped moving when the
 * paint went tacky.
 */
export function dripPath(x: number, top: number, length: number, width: number): string {
  const bead = width * 1.3;
  const waist = width * 0.42;
  const beadY = top + length - bead;
  return [
    `M${x - width} ${top}`,
    `C ${x - width} ${top + length * 0.4}, ${x - waist} ${top + length * 0.55}, ${x - bead} ${beadY}`,
    `A ${bead} ${bead} 0 1 0 ${x + bead} ${beadY}`,
    `C ${x + waist} ${top + length * 0.55}, ${x + width} ${top + length * 0.4}, ${x + width} ${top}`,
    'Z',
  ].join(' ');
}

export const PAINT_FONT = "var(--font-kalam), 'Segoe Print', 'Bradley Hand', cursive";

/** The same paint as is left in the tin on the table (`--sign-paint`). */
export const PAINT_COLOUR = 'var(--sign-paint)';

export const TITLE_SIZE = 50;
