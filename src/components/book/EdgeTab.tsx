'use client';

import type { CSSProperties } from 'react';
import { TONE_VARIABLE, type StickyTone } from '@/lib/tones';
import BookLink from './BookLink';

/**
 * About as many letters as fit on the strip of a tab that shows past the
 * pages. A longer name is set that much tighter, but never below a size that
 * stays legible — names too long even for that have a short title instead
 * (`shortTitle` in lib/book).
 */
const LETTERS_THAT_FIT = 10.5;
const TIGHTEST = 0.74;

/**
 * An index tab stuck to the page it marks: a rectangle drawn to a point on its
 * outer side, so the point hangs off the book's edge while the body stays on
 * the paper. Pressing one turns to the page it is stuck to.
 */
export default function EdgeTab({
  sectionId,
  leafIndex,
  label,
  tone,
  side,
  isCurrent,
}: {
  sectionId: string;
  /** The leaf this tab is stuck to, which is where pressing it turns to. */
  leafIndex: number;
  label: string;
  tone: StickyTone;
  /** Which edge the tab hangs from; it decides the point and the light. */
  side: 'left' | 'right';
  isCurrent: boolean;
}) {
  return (
    <BookLink
      sectionId={sectionId}
      leafIndex={leafIndex}
      className="block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pencil)]"
      aria-current={isCurrent ? 'page' : undefined}
    >
      <span
        className="edge-tab font-bold text-[var(--postit-ink)]"
        style={
          {
            backgroundColor: TONE_VARIABLE[tone],
            // Darkens toward the page side so the glued half reads as pressed
            // down while the overhanging point stays bright.
            backgroundImage: `linear-gradient(${side === 'left' ? 90 : 270}deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 46%, rgba(74,52,26,0.16) 100%)`,
            '--tab-fit': Math.max(TIGHTEST, Math.min(1, LETTERS_THAT_FIT / label.length)),
          } as CSSProperties
        }
      >
        {/* Not clipped: Kalam's ascenders and the dots over Ö and ü rise past
            a one-line box, and clipping it shaved the tops off. The tab's own
            outline still trims anything that strays past the tab. */}
        <span className="whitespace-nowrap leading-[1.3]">{label}</span>
      </span>
    </BookLink>
  );
}
