'use client';

import { useId } from 'react';

/**
 * A yellow hexagonal pencil lying on the table, seen from above: pink eraser,
 * crimped ferrule, three painted facets catching the light differently, the
 * sharpened wood cone and the graphite point.
 */
export function Pencil({ className }: { className?: string }) {
  const id = useId();
  const ferrule = `${id}-ferrule`;

  return (
    <svg viewBox="0 0 400 26" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={ferrule} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-ferrule-lit)" />
          <stop offset="0.5" stopColor="var(--prop-ferrule)" />
          <stop offset="1" stopColor="var(--prop-ferrule-deep)" />
        </linearGradient>
      </defs>

      <rect x="4" y="4" width="26" height="18" rx="5" fill="var(--prop-eraser)" />
      <rect x="26" y="3" width="26" height="20" fill={`url(#${ferrule})`} />
      <path
        d="M31 3 V23 M36 3 V23 M42 3 V23 M47 3 V23"
        stroke="var(--prop-ferrule-deep)"
        strokeWidth="0.8"
      />

      {/* Three facets of the hexagon face up: the middle one takes the light. */}
      <rect x="52" y="3" width="268" height="6" fill="var(--prop-paint-lit)" />
      <rect x="52" y="9" width="268" height="8" fill="var(--prop-paint)" />
      <rect x="52" y="17" width="268" height="6" fill="var(--prop-paint-deep)" />

      {/* Where the knife took the paint off, the wood shows in a wavy edge. */}
      <path
        d="M320 3 Q324 6 320 9 Q325 13 320 17 Q324 20 320 23 L372 14.4 L372 11.6 Z"
        fill="var(--prop-wood)"
      />
      <path d="M372 11.6 L396 13 L372 14.4 Z" fill="var(--prop-lead)" />
    </svg>
  );
}

/**
 * A tin of paint with its lid off, seen from above: the rolled rim, the paint
 * inside with a little gloss on it, a drip down the side, and the lid put down
 * beside it. Deliberately unlabelled — the label is the one part of the
 * reference that belongs to someone else.
 */
export function PaintTin({ className }: { className?: string }) {
  const id = useId();
  const metal = `${id}-metal`;
  const lid = `${id}-lid`;

  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={metal} cx="0.38" cy="0.34" r="0.75">
          <stop offset="0" stopColor="var(--prop-ferrule-lit)" />
          <stop offset="0.6" stopColor="var(--prop-ferrule)" />
          <stop offset="1" stopColor="var(--prop-ferrule-deep)" />
        </radialGradient>
        <radialGradient id={lid} cx="0.4" cy="0.36" r="0.7">
          <stop offset="0" stopColor="var(--prop-ferrule-lit)" />
          <stop offset="1" stopColor="var(--prop-ferrule-deep)" />
        </radialGradient>
      </defs>

      {/* The lid, set down on the table beside the tin. */}
      <circle cx="190" cy="144" r="44" fill={`url(#${lid})`} />
      <circle
        cx="190"
        cy="144"
        r="34"
        fill="none"
        stroke="var(--prop-ferrule-deep)"
        strokeWidth="2"
      />
      <circle
        cx="190"
        cy="144"
        r="26"
        fill="none"
        stroke="var(--prop-ferrule-lit)"
        strokeWidth="1.2"
      />

      {/* The tin: rolled rim, the groove the lid seats in, and the paint. */}
      <circle cx="92" cy="96" r="80" fill={`url(#${metal})`} />
      <circle
        cx="92"
        cy="96"
        r="71"
        fill="none"
        stroke="var(--prop-ferrule-deep)"
        strokeWidth="3"
      />
      <circle cx="92" cy="96" r="66" fill="var(--prop-paint-in-tin)" />
      <ellipse
        cx="70"
        cy="74"
        rx="26"
        ry="12"
        fill="var(--prop-gloss)"
        transform="rotate(-24 70 74)"
      />

      {/* Paint run over the rim and down the outside. */}
      <path
        d="M150 70 C160 72 170 78 172 88 C174 98 168 104 164 98 C162 92 160 86 154 82 Z"
        fill="var(--prop-paint-in-tin)"
      />
    </svg>
  );
}
