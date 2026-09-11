'use client';

import type { ReactNode } from 'react';
import { TONE_VARIABLE, type StickyTone } from '@/lib/tones';

/**
 * A post-it pressed onto the page: flat colour, and a shadow that is heavier
 * along the bottom edge where the paper lifts away.
 */
export default function StickyNote({
  tone = 'sun',
  tilt = -1.6,
  className,
  children,
}: {
  tone?: StickyTone;
  /** Degrees. Keep it small — a real note is pressed down, not thrown. */
  tilt?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${className ?? ''}`} style={{ transform: `rotate(${tilt}deg)` }}>
      <div
        className="relative px-[0.9em] py-[0.75em] text-[var(--postit-ink)]"
        style={{
          backgroundColor: TONE_VARIABLE[tone],
          boxShadow: '0 0.15em 0.3em rgba(52,34,16,0.14), 0 0.6em 1em -0.35em rgba(52,34,16,0.32)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
