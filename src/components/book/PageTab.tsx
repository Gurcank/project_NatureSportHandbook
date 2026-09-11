'use client';

import type { Language } from '@/context/SettingsContext';
import type { PlacedRailTab } from '@/lib/paginate';
import { sectionTone } from '@/lib/tones';
import EdgeTab from './EdgeTab';

/**
 * The tab as part of the sheet it is stuck to.
 *
 * A tab drawn here moves with the paper: drag the corner and it folds over
 * with the page, because the library clips a turning page with a clip-path and
 * this sits inside that shape. Both faces of the sheet draw it — the front
 * whole, the back reduced to the point that hangs off the edge, which is all a
 * tab shows from behind. The rail draws it only while the sheet is buried, and
 * every copy lands on the same line down the edge, so nothing jumps as one
 * hands over to the next.
 */
export default function PageTab({
  tab,
  side,
  language,
}: {
  tab: PlacedRailTab;
  /** Which half the leaf occupies; a page's tab hangs from its own fore-edge. */
  side: 'left' | 'right';
  language: Language;
}) {
  const span = `calc(100% - var(--rail-inset) * 2)`;

  return (
    <div
      className={`page-tab page-tab--${side} page-tab--${tab.face} tab-slot--${tab.tier}`}
      style={{
        top: `calc(var(--rail-inset) + ${span} * ${tab.slot / tab.total})`,
        height: `calc(${span} / ${tab.total})`,
      }}
    >
      <EdgeTab
        sectionId={tab.sectionId}
        leafIndex={tab.leafIndex}
        label={tab.label[language]}
        tone={sectionTone(tab.sectionId)}
        side={side}
        isCurrent={tab.face === 'front'}
      />
    </div>
  );
}
