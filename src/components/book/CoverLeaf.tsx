'use client';

/**
 * Brown leather, drawn rather than photographed: the pebbling is turbulence lit
 * from the upper left, so it stays sharp at any size and costs nothing to
 * download. No lettering and no device on it yet.
 */
export const LEATHER =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='l'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='4' seed='6' stitchTiles='stitch' result='n'/%3E%3CfeDiffuseLighting in='n' lighting-color='%23a8794b' surfaceScale='1.7'%3E%3CfeDistantLight azimuth='225' elevation='58'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23l)'/%3E%3C/svg%3E\")";

/** The doubled hide where the covering is turned over the board's edge. */
export const TURN_IN =
  'inset 0 0 0 0.55rem rgba(255,222,184,0.05), inset 0 0 0 0.6rem rgba(38,20,9,0.3), inset 0 0.1rem 0 rgba(255,226,190,0.16), inset 0 -0.15rem 0.6rem rgba(28,15,6,0.45)';

/**
 * One face of the binding.
 *
 * The reader is above the book looking down, so a shut board is one flat piece
 * of hide — no spine rolls into view from this angle. The only thing that
 * separates the two boards is which way the light runs across them: the back
 * board is the same piece of leather seen from the other end of the book.
 */
export function LeatherFace({ face = 'front' }: { face?: 'front' | 'back' }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `linear-gradient(${face === 'front' ? 150 : 210}deg, #6a4527 0%, #573620 46%, #3d2415 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45 mix-blend-overlay"
        style={{ backgroundImage: LEATHER, backgroundSize: '220px 220px' }}
      />

      {/* Where the leather is turned over the board's edge it doubles up, so
          the border sits slightly proud of the field it encloses. */}
      <div aria-hidden="true" className="absolute inset-0" style={{ boxShadow: TURN_IN }} />
    </div>
  );
}

export default function CoverLeaf({ face }: { face: 'front' | 'back' }) {
  return <LeatherFace face={face} />;
}
