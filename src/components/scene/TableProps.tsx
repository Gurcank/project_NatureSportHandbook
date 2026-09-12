'use client';

import { useId } from 'react';

/**
 * A yellow hexagonal pencil lying on the table, seen from above, lit like
 * everything else on the table from the upper left: pink eraser, crimped
 * ferrule, three painted facets — the one facing the sun brightest, the far
 * one in shade — a line of sheen along the top edge, the maker's grade
 * stamped in dark foil, the knife-cut wood cone and the graphite point.
 */
export function Pencil({ className }: { className?: string }) {
  const id = useId();
  const ref = (name: string) => `${id}-${name}`;
  const fill = (name: string) => `url(#${ref(name)})`;

  return (
    <svg viewBox="0 0 420 30" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={ref('eraser')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-eraser-lit)" />
          <stop offset="0.45" stopColor="var(--prop-eraser)" />
          <stop offset="1" stopColor="var(--prop-eraser-deep)" />
        </linearGradient>
        <linearGradient id={ref('ferrule')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-ferrule-lit)" />
          <stop offset="0.35" stopColor="var(--prop-ferrule)" />
          <stop offset="0.75" stopColor="var(--prop-ferrule-deep)" />
          <stop offset="1" stopColor="var(--prop-ferrule)" />
        </linearGradient>
        <linearGradient id={ref('facet-top')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-paint-lit)" />
          <stop offset="1" stopColor="var(--prop-paint)" />
        </linearGradient>
        <linearGradient id={ref('facet-mid')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-paint)" />
          <stop offset="1" stopColor="var(--prop-paint-deep)" />
        </linearGradient>
        <linearGradient id={ref('facet-low')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-paint-deep)" />
          <stop offset="1" stopColor="var(--prop-paint-shadow)" />
        </linearGradient>
        <linearGradient id={ref('wood')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-wood-lit)" />
          <stop offset="0.5" stopColor="var(--prop-wood)" />
          <stop offset="1" stopColor="var(--prop-wood-deep)" />
        </linearGradient>
        <linearGradient id={ref('lead')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-lead-lit)" />
          <stop offset="0.55" stopColor="var(--prop-lead)" />
          <stop offset="1" stopColor="var(--prop-lead)" />
        </linearGradient>
      </defs>

      {/* Eraser: a rubber plug, rounded where it has been used. */}
      <rect x="4" y="5" width="30" height="20" rx="7" fill={fill('eraser')} />
      <path d="M10 9 H26" stroke="var(--prop-highlight)" strokeWidth="1.2" opacity="0.45" />

      {/* Ferrule: rolled metal, two crimped bands holding each end. */}
      <rect x="28" y="4" width="30" height="22" fill={fill('ferrule')} />
      {[32, 35, 51, 54].map((x) => (
        <rect
          key={x}
          x={x}
          y="4"
          width="1.3"
          height="22"
          fill="var(--prop-ferrule-deep)"
          opacity="0.75"
        />
      ))}
      <path d="M28 7.5 H58" stroke="var(--prop-highlight)" strokeWidth="1" opacity="0.7" />

      {/* Three of the six painted facets face up. */}
      <rect x="58" y="4" width="270" height="7" fill={fill('facet-top')} />
      <rect x="58" y="11" width="270" height="8" fill={fill('facet-mid')} />
      <rect x="58" y="19" width="270" height="7" fill={fill('facet-low')} />
      <path
        d="M58 11 H328 M58 19 H328"
        stroke="var(--prop-paint-shadow)"
        strokeWidth="0.6"
        opacity="0.6"
      />
      <path d="M62 6.2 H322" stroke="var(--prop-highlight)" strokeWidth="1.1" opacity="0.55" />
      <text
        x="100"
        y="17.4"
        fontSize="6.4"
        letterSpacing="1.4"
        fill="var(--prop-foil)"
        opacity="0.8"
        style={{ fontFamily: 'var(--font-kalam), sans-serif' }}
      >
        HB
      </text>

      {/* Where the knife took the paint off, the wood shows in a scalloped
          edge and runs down to the point in shaved facets. */}
      <path
        d="M328 4 Q334 7.5 329 11 Q335 15 329 19 Q334 22.5 328 26 L384 16.8 L384 13.2 Z"
        fill={fill('wood')}
      />
      <path
        d="M333 8 L384 14 M334 22 L384 16"
        stroke="var(--prop-wood-deep)"
        strokeWidth="0.7"
        opacity="0.45"
      />
      <path d="M384 13.2 L410 15 L384 16.8 Z" fill={fill('lead')} />
      <path
        d="M386 14.3 L403 14.9"
        stroke="var(--prop-highlight)"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * A tin of paint with its lid off, seen from above: the rolled rim, the paint
 * inside with a little gloss on it, a drip down the side, and the lid put down
 * beside it with paint dried round its rim where it was prised off. The paint
 * is the sign's lettering white — this is the tin the sign was painted from.
 * The tin stands taller than the lid lying flat, so it throws its own shadow
 * across it, down and to the right like everything else under this sun.
 * Deliberately unlabelled — the label is the one part of the reference that
 * belongs to someone else.
 */
export function PaintTin({ className }: { className?: string }) {
  const id = useId();
  const metal = `${id}-metal`;
  const lid = `${id}-lid`;
  const paint = `${id}-paint`;
  const soften = `${id}-soften`;

  return (
    <svg viewBox="0 0 272 218" className={className} aria-hidden="true">
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
        {/* White paint has no colour of its own to give it depth, so the rim
            shades it: the surface dips to the side of the tin where it meets
            the metal. */}
        <radialGradient id={paint} cx="0.44" cy="0.4" r="0.62">
          <stop offset="0.7" stopColor="var(--prop-paint-in-tin)" />
          <stop offset="1" stopColor="var(--prop-paint-in-tin-shade)" />
        </radialGradient>
        <filter id={soften} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {/* The lid, set down on the table beside the tin, paint dried round the
          edge it was levered off by. */}
      <circle cx="208" cy="156" r="56" fill={`url(#${lid})`} />
      <circle
        cx="208"
        cy="156"
        r="45"
        fill="none"
        stroke="var(--prop-ferrule-deep)"
        strokeWidth="2.4"
      />
      <circle
        cx="208"
        cy="156"
        r="35"
        fill="none"
        stroke="var(--prop-ferrule-lit)"
        strokeWidth="1.4"
      />
      <path
        d="M161 139 A50 50 0 0 1 246.3 123.9"
        fill="none"
        stroke="var(--prop-paint-in-tin)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.92"
      />

      {/* The standing tin's own shadow, falling over the lid. */}
      <circle cx="106" cy="114" r="80" fill="var(--prop-cast-shadow)" filter={`url(#${soften})`} />

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
      <circle cx="92" cy="96" r="66" fill={`url(#${paint})`} />
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

/**
 * The flat brush the sign was lettered with, put down beside the tin with the
 * paint still on it: a varnished handle with its hanging hole, the crimped
 * ferrule, and bristles that go from their own brown at the root to the
 * sign's white at the tip — plus the dab of paint it left on the table where
 * it was laid down. Lit from the upper left like everything else.
 */
export function PaintBrush({ className }: { className?: string }) {
  const id = useId();
  const ref = (name: string) => `${id}-${name}`;
  const fill = (name: string) => `url(#${ref(name)})`;

  return (
    <svg viewBox="0 0 320 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={ref('handle')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-handle-lit)" />
          <stop offset="0.45" stopColor="var(--prop-handle)" />
          <stop offset="1" stopColor="var(--prop-handle-deep)" />
        </linearGradient>
        <linearGradient id={ref('ferrule')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--prop-ferrule-lit)" />
          <stop offset="0.35" stopColor="var(--prop-ferrule)" />
          <stop offset="0.75" stopColor="var(--prop-ferrule-deep)" />
          <stop offset="1" stopColor="var(--prop-ferrule)" />
        </linearGradient>
        <linearGradient id={ref('bristles')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--prop-bristle-deep)" />
          <stop offset="0.3" stopColor="var(--prop-bristle)" />
          <stop offset="0.52" stopColor="var(--prop-paint-in-tin-shade)" />
          <stop offset="0.7" stopColor="var(--prop-paint-in-tin)" />
          <stop offset="1" stopColor="var(--prop-paint-in-tin)" />
        </linearGradient>
      </defs>

      {/* The dab it left on the table, just past the tip. */}
      <ellipse cx="311" cy="31" rx="6" ry="4" fill="var(--prop-paint-in-tin)" opacity="0.95" />
      <circle cx="302" cy="38" r="1.6" fill="var(--prop-paint-in-tin)" />

      {/* Handle: fat at the ferrule, tapering to a rounded end. */}
      <path
        d="M4 20 Q4 14 12 14 L150 11 Q196 10 196 16 L196 32 Q196 38 150 37 L12 34 Q4 34 4 28 Z"
        fill={fill('handle')}
      />
      <circle cx="18" cy="24" r="3" fill="var(--prop-cast-shadow)" />
      <path d="M16 17 H186" stroke="var(--prop-highlight)" strokeWidth="1.2" opacity="0.45" />

      {/* Ferrule, crimped twice onto the handle. */}
      <rect x="196" y="10" width="44" height="28" rx="2" fill={fill('ferrule')} />
      {[204, 208].map((x) => (
        <rect
          key={x}
          x={x}
          y="10"
          width="1.3"
          height="28"
          fill="var(--prop-ferrule-deep)"
          opacity="0.7"
        />
      ))}
      <path d="M196 14 H240" stroke="var(--prop-highlight)" strokeWidth="1" opacity="0.6" />

      {/* Bristles, fanned a little and clotted with paint towards the tip. */}
      <path
        d="M240 11 C262 10 286 14 306 22 Q310 24 306 26 C286 34 262 38 240 37 Z"
        fill={fill('bristles')}
      />
      <path
        d="M242 15 Q272 16 300 22 M242 21 Q274 22 304 24 M242 27 Q274 27 303 26 M242 33 Q272 32 300 27"
        fill="none"
        stroke="var(--prop-bristle-deep)"
        strokeWidth="0.5"
        opacity="0.45"
      />
      <path
        d="M270 16 Q288 18 302 22"
        stroke="var(--prop-highlight)"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
