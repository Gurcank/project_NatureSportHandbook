'use client';

import type { ReactElement } from 'react';
import { tabSectionFor } from '@/lib/book';
import { jitter } from '@/lib/jitter';

/**
 * Small pencil sketches for the room a leaf has left over.
 *
 * Entries go onto a leaf only while they fit, so most leaves end with a strip
 * of bare paper. A field notebook's owner fills that with whatever they were
 * looking at; the sketch is drawn from the same chapter as the page, sized to
 * the space it gets, and left out entirely when the space is too small to hold
 * a drawing (see `.leaf-doodle` in globals.css). Line only, in the soft pencil,
 * so it reads as a margin note and never competes with the entries.
 */

type Sketch = () => ReactElement;

function Fern() {
  const leaflets = Array.from({ length: 9 }, (_, i) => {
    const y = 100 - i * 9.5;
    const reach = 30 - i * 2.9;
    const lift = 8 + i * 0.4;
    return (
      <g key={i}>
        <path d={`M60 ${y} q ${-reach * 0.55} ${-lift * 0.2} ${-reach} ${-lift}`} />
        <path d={`M60 ${y - 2} q ${reach * 0.55} ${-lift * 0.2} ${reach} ${-lift}`} />
      </g>
    );
  });
  return (
    <>
      <path d="M60 112 C59 86 61 44 60 10" />
      {leaflets}
    </>
  );
}

function Leaf() {
  return (
    <>
      <path d="M60 108 C28 90 24 50 60 14 C96 50 92 90 60 108 Z" />
      <path d="M60 114 L60 22" />
      {[34, 50, 66, 82].map((y) => (
        <g key={y}>
          <path d={`M60 ${y + 10} Q 50 ${y + 5} ${40 + (y - 34) * 0.06} ${y}`} />
          <path d={`M60 ${y + 10} Q 70 ${y + 5} ${80 - (y - 34) * 0.06} ${y}`} />
        </g>
      ))}
    </>
  );
}

function Pine() {
  return (
    <>
      <path d="M60 12 L42 44 L52 44 L34 72 L47 72 L28 100 L92 100 L73 72 L86 72 L68 44 L78 44 Z" />
      <path d="M55 100 L55 112 L65 112 L65 100" />
      <path d="M18 112 L102 112" />
    </>
  );
}

function Mushroom() {
  return (
    <>
      <path d="M26 64 C26 32 94 32 94 64 C80 70 40 70 26 64 Z" />
      <path d="M48 68 C47 84 45 96 42 104 C54 108 66 108 78 104 C75 96 73 84 72 68" />
      <circle cx="46" cy="50" r="4" />
      <circle cx="64" cy="43" r="3.2" />
      <circle cx="79" cy="54" r="3.6" />
      <path d="M28 108 l4 -9 m4 9 l-1 -11 M86 108 l3 -9 m4 9 l0 -11" />
    </>
  );
}

function Feather() {
  const barbs = [30, 42, 54, 66, 78, 90].map((t) => {
    const x = 36 + (88 - 36) * (1 - t / 108);
    return (
      <path key={t} d={`M${x} ${t} q ${-10 - (108 - t) * 0.08} 2 ${-16 - (108 - t) * 0.12} 10`} />
    );
  });
  return (
    <>
      <path d="M34 112 C48 86 66 52 88 12" />
      <path d="M86 16 C66 20 48 44 42 76 C40 88 38 98 36 106" />
      <path d="M88 14 C96 34 86 60 68 82 C60 92 50 100 40 106" />
      {barbs}
    </>
  );
}

function Dragonfly() {
  return (
    <>
      <circle cx="60" cy="18" r="5" />
      <path d="M60 24 L60 104" />
      <path d="M60 36 C40 24 16 28 18 38 C20 46 44 44 60 40" />
      <path d="M60 36 C80 24 104 28 102 38 C100 46 76 44 60 40" />
      <path d="M60 46 C42 44 22 52 26 60 C30 66 48 58 60 50" />
      <path d="M60 46 C78 44 98 52 94 60 C90 66 72 58 60 50" />
      <path d="M57 64 L63 64 M57 74 L63 74 M57 84 L63 84 M58 94 L62 94" />
    </>
  );
}

function Pebbles() {
  return (
    <>
      <path d="M40 70 C38 58 50 52 62 56 C72 60 70 72 58 74" />
      <path d="M22 92 C20 78 36 70 52 74 C64 78 64 94 50 98 C36 102 24 100 22 92 Z" />
      <path d="M58 96 C56 82 72 76 88 80 C100 84 100 98 86 102 C74 105 60 104 58 96 Z" />
      <path d="M12 104 l3 -10 m3 10 l0 -12 m3 12 l3 -9 M100 104 l2 -9 m3 9 l1 -11" />
    </>
  );
}

function Mountain() {
  return (
    <>
      <path d="M8 100 L44 44 L58 64 L76 34 L112 100" />
      <path d="M68 46 L76 34 L84 46 L79 43 L76 48 L73 43 Z" />
      <circle cx="96" cy="24" r="8" />
      <path d="M22 100 C34 94 46 96 60 100" />
    </>
  );
}

function Birds() {
  return (
    <>
      <path d="M22 54 q10 -10 18 0 q8 -10 18 0" />
      <path d="M64 34 q7 -7 13 0 q6 -7 13 0" />
      <path d="M58 76 q6 -6 11 0 q5 -6 11 0" />
    </>
  );
}

/** Drawn from the same part of the book as the page they sit on. */
const BY_FAMILY: Record<string, Sketch[]> = {
  animals: [Feather, Dragonfly, Birds],
  plants: [Fern, Leaf, Pine],
  mushrooms: [Mushroom, Fern],
  stones: [Pebbles, Mountain],
  sport: [Mountain, Birds, Pine],
};
const ANYWHERE: Sketch[] = [Leaf, Fern, Mountain, Birds, Pebbles];

export default function LeafDoodle({ seed, sectionId }: { seed: string; sectionId: string }) {
  const sketches = BY_FAMILY[tabSectionFor(sectionId)] ?? ANYWHERE;
  const Sketch =
    sketches[
      Math.min(sketches.length - 1, Math.floor(jitter(`${seed}-doodle`, 0, sketches.length)))
    ];

  return (
    <div aria-hidden="true" className="leaf-doodle">
      <svg
        viewBox="0 0 120 120"
        className="leaf-doodle-sketch pencil-text"
        style={{ rotate: `${jitter(`${seed}-doodle-tilt`, -7, 7)}deg` }}
        fill="none"
        stroke="var(--pencil-soft)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Sketch />
      </svg>
    </div>
  );
}
