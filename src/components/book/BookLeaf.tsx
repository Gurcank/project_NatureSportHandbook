'use client';

import type { Language } from '@/context/SettingsContext';
import type { Leaf, PlacedRailTab } from '@/lib/paginate';
import CoverLeaf from './CoverLeaf';
import EndpaperLeaf from './EndpaperLeaf';
import PageTab from './PageTab';
import LeafContent from './LeafContent';
import { useIsNear } from './NearWindow';

/**
 * One page surface. A leaf far from the reader renders as bare paper — see
 * NearWindow for why it stays mounted regardless.
 */
export default function BookLeaf({
  leaf,
  index,
  language,
  tabs,
}: {
  leaf: Leaf;
  index: number;
  language: Language;
  /** The tabs stuck to this leaf's sheet, front face and back. */
  tabs?: PlacedRailTab[];
}) {
  const isNear = useIsNear(index);

  // The boards and their paste-downs are the binding, not the text block: they
  // take no paper, no gutter and no tabs.
  if (leaf.kind === 'cover') {
    return <CoverLeaf face={leaf.face} />;
  }

  if (leaf.kind === 'endpaper') {
    return <EndpaperLeaf face={leaf.face} />;
  }

  // The front board is shown on its own, so the pages behind it pair up
  // odd-first: leaf 1 is a left-hand page, leaf 2 its right-hand facing page.
  const side = index % 2 === 1 ? 'left' : 'right';

  return (
    <div
      // Read by the fold hook, which opens the clip on this side for whatever
      // the leaf hangs past its edge.
      data-fore-edge={side}
      className={`leaf-scope relative h-full w-full ${
        side === 'left' ? 'leaf-paper' : 'leaf-paper--right'
      }`}
    >
      {/* The gutter: paper does not stop at the spine, it curves down into it
          and back up, so the shading runs dark at the fold, through a lit ridge
          where the sheet lifts again, and out to nothing. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 w-[7.5%] ${side === 'left' ? 'right-0' : 'left-0'}`}
        style={{
          background: `linear-gradient(${side === 'left' ? 270 : 90}deg,
            rgba(70,46,20,0.4) 0%,
            rgba(92,64,32,0.26) 16%,
            rgba(120,90,52,0.1) 38%,
            rgba(255,246,222,0.22) 62%,
            rgba(140,108,66,0.05) 82%,
            rgba(140,108,66,0) 100%)`,
        }}
      />
      {/* The fold itself, where the two halves of the sheet meet. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 w-px bg-[rgba(56,34,12,0.5)] ${
          side === 'left' ? 'right-0' : 'left-0'
        }`}
      />
      {/* The outer edge, where the block of pages below shows through. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 w-[1.6%] ${side === 'left' ? 'left-0' : 'right-0'}`}
        style={{
          background: `linear-gradient(${side === 'left' ? 90 : 270}deg, rgba(88,60,26,0.22), rgba(88,60,26,0))`,
        }}
      />

      {/* The wad a jump turns over: the cut edges of the sheaf of paper going
          across with this sheet, standing out past its fore edge the way a
          thick fistful of pages does. Zero-width until a jump asks for it, and
          only on the sheet actually in the air — see useTurningSheaf. */}
      <div
        aria-hidden="true"
        className={`leaf-sheaf leaf-sheaf--${side} pointer-events-none absolute inset-y-0`}
      />

      {tabs?.map((tab) => (
        <PageTab key={tab.leafIndex} tab={tab} side={side} language={language} />
      ))}

      <div
        className={`leaf-type leaf-padding relative h-full ${
          side === 'right' ? 'leaf-padding--right' : ''
        }`}
      >
        <div className="relative z-10 h-full">
          {isNear ? <LeafContent leaf={leaf} language={language} /> : null}
        </div>
      </div>
    </div>
  );
}
