'use client';

import { TONE_VARIABLE, type StickyTone } from '@/lib/tones';
import BookLink from './BookLink';

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
        style={{
          backgroundColor: TONE_VARIABLE[tone],
          // Darkens toward the page side so the glued half reads as pressed
          // down while the overhanging point stays bright.
          backgroundImage: `linear-gradient(${side === 'left' ? 90 : 270}deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 46%, rgba(74,52,26,0.16) 100%)`,
        }}
      >
        <span className="overflow-hidden whitespace-nowrap">{label}</span>
      </span>
    </BookLink>
  );
}
