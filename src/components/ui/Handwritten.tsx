/**
 * Text written out by hand rather than typed.
 *
 * Adapted from the Framer community component "Bad handwriting"
 * (framer.com/m/Bad-handwriting-7RLRfb.js). Its idea is kept exactly: every
 * character is dealt one of five handwriting faces from a seeded shuffle, so
 * the same letter is never written the same way twice running and the line
 * reads as one hand rather than a font.
 *
 * Changed from the original: the faces come from `next/font` instead of an
 * `@import`, size and colour are left to the caller's classes so they can come
 * from the type scale, and the spans are rendered rather than assembled with
 * `innerHTML` after mount — the shuffle is seeded, so the server and the client
 * deal the same hand and the words are in the markup from the first paint.
 */

/** The five faces, in the order the original deals them. */
const HANDS = [
  'var(--font-caveat)',
  'var(--font-indie-flower)',
  'var(--font-nothing-you-could-do)',
  'var(--font-reenie-beanie)',
  'var(--font-shadows-into-light)',
] as const;

/** Faces that write a given letter badly enough to be worth skipping. */
const UNSUITED: Record<string, readonly string[]> = {
  l: ['var(--font-nothing-you-could-do)'],
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

type Letter = { char: string; hand: string | null };

/** Deals a face to each character. Pure, so it runs the same on both sides. */
function deal(text: string, seed: number): Letter[] {
  const lastUsed: Record<string, string> = {};
  const letters: Letter[] = [];

  text.split('').forEach((char, index) => {
    if (char === ' ') {
      letters.push({ char, hand: null });
      return;
    }

    const key = char.toLowerCase();
    const unsuited = UNSUITED[key];
    let available: readonly string[] = unsuited
      ? HANDS.filter((hand) => !unsuited.includes(hand))
      : HANDS;
    // The same letter twice running in the same face reads as type, not a hand.
    if (lastUsed[key]) available = available.filter((hand) => hand !== lastUsed[key]);

    const hand = available[Math.floor(seededRandom(seed + index) * available.length)] ?? HANDS[0];
    lastUsed[key] = hand;
    letters.push({ char, hand });
  });

  return letters;
}

export default function Handwritten({
  children,
  /** Change it for a different hand writing the same words. Means nothing else. */
  seed = 12,
  className,
}: {
  children: string;
  seed?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {deal(children, seed).map((letter, index) =>
        letter.hand === null ? (
          <span key={index} className="inline-block whitespace-pre">
            {letter.char}
          </span>
        ) : (
          <span key={index} style={{ fontFamily: `${letter.hand}, cursive` }}>
            {letter.char}
          </span>
        ),
      )}
    </span>
  );
}
