'use client';

import type { ReactElement } from 'react';
import { tabSectionFor } from '@/lib/book';
import { jitter } from '@/lib/jitter';

/**
 * Small pencil sketches for the room a leaf has left over.
 *
 * A field notebook's owner draws in a margin now and then, not on every page,
 * so only every third leaf carries one; the rest keep their bare paper. The
 * sketch is drawn from the same part of the book as the page and cycles
 * through that part's drawings in order, so two sketches in a row are never
 * the same. It is sized to the space it gets and left out entirely when the
 * space is too small to hold a drawing (see `.leaf-doodle` in globals.css).
 * Line only, in the soft pencil, so it reads as a margin note and never
 * competes with the entries.
 */

/** One leaf in this many carries a sketch. */
const EVERY = 3;

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

function OakLeaf() {
  return (
    <>
      <path d="M60 96 C50 96 40 92 42 84 C32 86 26 78 32 72 C24 70 22 60 30 56 C24 50 28 40 38 42 C36 32 44 24 52 30 C54 20 66 20 68 30 C76 24 84 32 82 42 C92 40 96 50 90 56 C98 60 96 70 88 72 C94 78 88 86 78 84 C80 92 70 96 60 96 Z" />
      <path d="M60 112 L60 28" />
      <path d="M60 80 L45 70 M60 80 L75 70 M60 62 L42 52 M60 62 L78 52 M60 46 L50 38 M60 46 L70 38" />
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

function Acorn() {
  return (
    <>
      <path d="M60 40 C60 32 64 28 69 24" />
      <path d="M34 52 C34 36 86 36 86 52 C74 58 46 58 34 52 Z" />
      <path d="M44 46 l6 6 M56 44 l6 7 M68 45 l6 6" />
      <path d="M40 55 C40 82 52 100 60 104 C68 100 80 82 80 55" />
    </>
  );
}

function Daisy() {
  return (
    <>
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse key={i} cx="60" cy="36" rx="5" ry="12" transform={`rotate(${i * 30} 60 54)`} />
      ))}
      <circle cx="60" cy="54" r="7" />
      <path d="M60 72 C58 88 62 100 60 114" />
      <path d="M60 98 C48 92 40 94 36 100 C44 104 54 102 60 98" />
    </>
  );
}

function Clover() {
  return (
    <>
      {[0, 120, 240].map((turn) => (
        <path
          key={turn}
          d="M60 58 C50 50 40 40 48 34 C54 30 60 36 60 42 C60 36 66 30 72 34 C80 40 70 50 60 58 Z"
          transform={`rotate(${turn} 60 58)`}
        />
      ))}
      <path d="M60 58 C62 80 66 96 72 112" />
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

function Snail() {
  return (
    <>
      <path d="M62 84 C42 84 34 62 46 50 C58 38 80 44 80 62 C80 74 68 80 60 74 C54 68 58 60 64 60" />
      <path d="M20 92 C40 94 80 94 98 90 C104 88 106 82 100 78" />
      <path d="M100 78 L108 64 M96 79 L99 64" />
      <circle cx="108" cy="63" r="1.6" />
      <circle cx="99" cy="63" r="1.6" />
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

function Butterfly() {
  return (
    <>
      <path d="M60 30 L60 92" />
      <path d="M60 44 C44 20 14 22 16 42 C18 58 40 60 60 52" />
      <path d="M60 44 C76 20 106 22 104 42 C102 58 80 60 60 52" />
      <path d="M60 56 C44 60 28 76 36 88 C44 96 56 80 60 64" />
      <path d="M60 56 C76 60 92 76 84 88 C76 96 64 80 60 64" />
      <path d="M60 30 C56 22 52 18 48 16 M60 30 C64 22 68 18 72 16" />
      <circle cx="34" cy="40" r="4" />
      <circle cx="86" cy="40" r="4" />
    </>
  );
}

function Bee() {
  return (
    <>
      <path d="M58 54 C40 40 26 48 34 58 C40 64 52 60 58 56" />
      <path d="M62 54 C80 40 94 48 86 58 C80 64 68 60 62 56" />
      <circle cx="60" cy="44" r="7" />
      <ellipse cx="60" cy="70" rx="13" ry="20" />
      <path d="M48 64 L72 64 M47 74 L73 74 M51 84 L69 84" />
      <path d="M60 90 L60 97" />
      <path d="M57 38 C54 32 50 30 47 30 M63 38 C66 32 70 30 73 30" />
    </>
  );
}

function Beetle() {
  return (
    <>
      <ellipse cx="60" cy="66" rx="22" ry="28" />
      <path d="M60 40 L60 94" />
      <path d="M48 42 C50 32 70 32 72 42" />
      <circle cx="50" cy="58" r="3.4" />
      <circle cx="70" cy="58" r="3.4" />
      <circle cx="52" cy="76" r="3" />
      <circle cx="68" cy="76" r="3" />
      <path d="M40 56 L28 50 M38 68 L26 68 M40 80 L28 88 M80 56 L92 50 M82 68 L94 68 M80 80 L92 88" />
      <path d="M54 34 L48 24 M66 34 L72 24" />
    </>
  );
}

function SpiderWeb() {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4 + 0.2);
  const point = (angle: number, radius: number) =>
    `${(60 + Math.cos(angle) * radius).toFixed(1)} ${(60 + Math.sin(angle) * radius).toFixed(1)}`;
  const rings = [12, 22, 33, 44].map((radius) => {
    const sag = spokes
      .map(
        (angle, i) =>
          `Q ${point(angle + Math.PI / 8, radius * 0.86)} ${point(spokes[(i + 1) % spokes.length], radius)}`,
      )
      .join(' ');
    return <path key={radius} d={`M${point(spokes[0], radius)} ${sag}`} />;
  });
  return (
    <>
      {spokes.map((angle) => (
        <path key={angle} d={`M60 60 L${point(angle, 50)}`} />
      ))}
      {rings}
      <circle cx="75" cy="40" r="3" />
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

function Compass() {
  return (
    <>
      <circle cx="60" cy="60" r="40" />
      <circle cx="60" cy="60" r="34" />
      <path d="M60 30 L67 60 L53 60 Z" />
      <path d="M53 60 L60 90 L67 60" />
      <circle cx="60" cy="60" r="3" />
      <path d="M60 20 L60 25 M100 60 L95 60 M60 100 L60 95 M20 60 L25 60" />
    </>
  );
}

function Footprints() {
  const print = (
    <>
      <path d="M40 78 C31 77 29 60 33 50 C37 40 49 41 50 53 C51 65 49 79 40 78 Z" />
      <path d="M35 94 C34 86 47 86 47 94 C47 100 35 100 35 94 Z" />
    </>
  );
  return (
    <>
      <g>{print}</g>
      <g transform="translate(34 -30)">{print}</g>
    </>
  );
}

function Tent() {
  return (
    <>
      <path d="M16 100 L60 30 L104 100" />
      <path d="M60 30 L60 100 M48 100 L60 70 L72 100" />
      <path d="M16 100 L6 106 M104 100 L114 106" />
      <path d="M4 106 L116 106" />
      <path d="M60 30 L60 18 L70 22 L60 26" />
    </>
  );
}

function Waves() {
  return (
    <>
      <path d="M44 62 L84 62 L76 72 L52 72 Z" />
      <path d="M64 62 L64 38 L80 58 Z" />
      <path d="M8 84 q12 -10 24 0 t24 0 t24 0 t24 0 t24 0" />
      <path d="M20 100 q12 -10 24 0 t24 0 t24 0 t24 0" />
    </>
  );
}

/** Drawn from the same part of the book as the page they sit on. */
const BY_FAMILY: Record<string, Sketch[]> = {
  animals: [Feather, Snail, Butterfly, Dragonfly, Bee, Beetle, SpiderWeb, Birds],
  plants: [Fern, Daisy, OakLeaf, Clover, Pine, Acorn, Leaf],
  mushrooms: [Mushroom, Acorn, Snail, Fern, Clover],
  stones: [Pebbles, Compass, Mountain, Beetle, Footprints],
  sport: [Mountain, Tent, Compass, Waves, Footprints, Birds, Pine],
};
const ANYWHERE: Sketch[] = [Leaf, Butterfly, Daisy, Mountain, Compass, Feather, Waves, Tent];

export default function LeafDoodle({
  seed,
  sectionId,
  index,
}: {
  seed: string;
  sectionId: string;
  /** The leaf's place in the book: picks both whether it gets a sketch and which. */
  index: number;
}) {
  if (index % EVERY !== 0) return null;

  const family = tabSectionFor(sectionId);
  const sketches = BY_FAMILY[family] ?? ANYWHERE;
  // Each family starts its cycle somewhere of its own, so two parts of the
  // book do not open on the same drawing.
  const start = Math.floor(jitter(`${family}-doodles`, 0, sketches.length));
  const Sketch = sketches[(start + Math.floor(index / EVERY)) % sketches.length];

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
