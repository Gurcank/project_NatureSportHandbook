'use client';

import { LEATHER } from './CoverLeaf';

/**
 * The inside of a board.
 *
 * A case binding is built the other way round from how it reads: stiff boards
 * first, then the hide wrapped around them and turned over their edges, then a
 * sheet of paper pasted down over the turn-ins to hide them. So the inside of a
 * board is plain paper with a band of the cover's own leather all the way
 * round — not a page, and it never carries writing.
 */
export default function EndpaperLeaf({ face }: { face: 'front' | 'back' }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `linear-gradient(${face === 'front' ? 150 : 210}deg, #6a4527 0%, #573620 46%, #3d2415 100%)`,
      }}
      aria-hidden="true"
    >
      {/* The leather showing round the pasted sheet. */}
      <div
        className="absolute inset-0 opacity-45 mix-blend-overlay"
        style={{ backgroundImage: LEATHER, backgroundSize: '220px 220px' }}
      />

      {/* The pasted sheet itself. Slightly cooler and flatter than a text leaf:
          it is glued down, so it takes no raking light and shows no tooth.

          Three sides only: the leather is turned over the board's head, tail
          and fore edge, but the spine edge is where the board meets the block,
          so there is no edge there to turn anything over. */}
      <div
        className={`absolute inset-y-[0.9rem] ${
          face === 'front' ? 'left-[0.9rem] right-0' : 'left-0 right-[0.9rem]'
        }`}
        style={{
          background: `linear-gradient(${face === 'front' ? 165 : 195}deg, #eadfc0 0%, #ddcda4 100%)`,
          boxShadow:
            'inset 0 0 0 1px rgba(84,56,24,0.28), 0 0 0.7rem rgba(30,16,6,0.35), inset 0 0.4rem 0.9rem rgba(96,68,32,0.14)',
        }}
      />
    </div>
  );
}
