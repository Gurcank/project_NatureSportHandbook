'use client';

import type { Language } from '@/context/SettingsContext';
import type { RailTab } from '@/lib/paginate';
import { sectionTone } from '@/lib/tones';
import EdgeTab from './EdgeTab';

const RAIL_LABEL: Record<Language, string> = { tr: 'Bölümler', en: 'Sections' };

type PlacedTab = RailTab & { slot: number; side: 'left' | 'right'; isCurrent: boolean };

/**
 * The book's thumb index. Each tab is stuck to one leaf and behaves the way a
 * tab stuck to paper does: it hangs from the edge that leaf is on, and it is
 * seen whole only while that leaf is open. Turn past it and the page above
 * covers its body, leaving nothing but the part overhanging the fore-edge.
 *
 * Vertical position is fixed for the life of the book — a tab's slot is its
 * place in the running order — so the index reads as one object rather than a
 * list that reshuffles every time a page turns.
 */
export default function TabRail({
  language,
  isSpread,
  tabs,
  readingIndex,
  facingIndex,
  isSingleLeaf,
}: {
  language: Language;
  isSpread: boolean;
  tabs: RailTab[];
  /** A phone shows one leaf, so only that leaf's tab is carried by the page. */
  isSingleLeaf: boolean;
  /** The leaf that opens whatever is on screen. */
  readingIndex: number;
  /** Its facing leaf, or -1 when a board is up or the screen shows one leaf. */
  facingIndex: number;
}) {
  const onScreen = (leafIndex: number) =>
    isSingleLeaf
      ? leafIndex === readingIndex
      : leafIndex === readingIndex || leafIndex === facingIndex;

  const placed: PlacedTab[] = tabs.map((tab, slot) => ({
    ...tab,
    slot,
    // A leaf at or before the one on the left is in the left-hand block; one
    // after it is still in the right-hand block. A phone shows a single leaf,
    // so there is no block to divide and every tab hangs from one edge.
    side: !isSpread || tab.leafIndex <= readingIndex ? 'left' : 'right',
    // A face of the tab's own sheet being up means the page is drawing the
    // tab itself, and the rail stands down.
    isCurrent: tab.faces.some(onScreen),
  }));

  const slotHeight = 100 / Math.max(placed.length, 1);

  return (
    <nav aria-label={RAIL_LABEL[language]} className="pointer-events-none absolute inset-0 z-30">
      {(['left', 'right'] as const).map((side) => (
        <div key={side} className={`tab-rail tab-rail--${side}`}>
          {placed
            // The open pages draw their own tabs, so the rail leaves them out
            // rather than putting a second copy over the top of them.
            .filter((tab) => tab.side === side && !tab.isCurrent)
            .map((tab) => (
              <div
                key={tab.leafIndex}
                className={`tab-slot tab-slot--${tab.tier} pointer-events-auto ${
                  tab.isCurrent ? 'tab-slot--current' : ''
                }`}
                style={{ top: `${tab.slot * slotHeight}%`, height: `${slotHeight}%` }}
              >
                <EdgeTab
                  sectionId={tab.sectionId}
                  leafIndex={tab.leafIndex}
                  label={tab.label[language]}
                  tone={sectionTone(tab.sectionId)}
                  side={side}
                  isCurrent={tab.isCurrent}
                />
              </div>
            ))}
        </div>
      ))}
    </nav>
  );
}
