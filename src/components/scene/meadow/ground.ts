/* What lies on the ground: the flowers and the clumps of grass — part of the meadow MeadowLife.tsx draws. */

import type { Flower, FlowerKind, Rect, Sprite, Tuft, TuftSprites } from './types';
import type { Palette } from './palette';
import { TAU, inside, seeded, wind } from './wind';

/** Petal radius of each flower, three sizes a kind, in CSS pixels. */
const FLOWER_SIZES: Record<FlowerKind, number[]> = {
  daisy: [6.5, 8, 9.5],
  buttercup: [4.5, 5.5, 6.5],
  clover: [4.5, 5.2, 6],
  speedwell: [3, 3.6, 4.2],
};

/** How common each kind is: daisies and buttercups most, speedwell least. */
const KIND_WEIGHTS: FlowerKind[] = [
  'daisy',
  'daisy',
  'daisy',
  'buttercup',
  'buttercup',
  'buttercup',
  'clover',
  'clover',
  'speedwell',
  'speedwell',
];

/** Wild flowers grow in patches, with strays between them. */
export function layFlowers(width: number, height: number): Flower[] {
  const random = seeded(7);
  const flowers: Flower[] = [];
  const pick = () => KIND_WEIGHTS[Math.floor(random() * KIND_WEIGHTS.length)];
  const add = (x: number, y: number, kind: FlowerKind) =>
    flowers.push({
      x,
      y,
      kind,
      variant: Math.floor(random() * 3),
      turn: random() * TAU,
      phase: random() * TAU,
    });

  const patches = Math.round(Math.min(140, Math.max(10, (width * height) / 22000)));
  for (let patch = 0; patch < patches; patch++) {
    const centre = { x: random() * width, y: random() * height };
    const kind = pick();
    const count = 3 + Math.floor(random() * 7);
    const spread = 16 + random() * 40;
    for (let i = 0; i < count; i++) {
      const angle = random() * TAU;
      const distance = Math.sqrt(random()) * spread;
      add(centre.x + Math.cos(angle) * distance, centre.y + Math.sin(angle) * distance, kind);
    }
    add(random() * width, random() * height, pick());
    add(random() * width, random() * height, pick());
  }
  return flowers;
}

// ------------------------------------------------------------------- grass

const TUFT_VARIANTS = 6;
/** Steps between leaning back against a lull and bowed flat by a gust. */
const LEAN_LEVELS = 7;
/** How far a blade tip is pushed, as a share of its length, at full gust. */
const MAX_LEAN = 0.34;

export function layTufts(width: number, height: number): Tuft[] {
  const random = seeded(19);
  const count = Math.round(Math.min(1000, Math.max(60, (width * height) / 2200)));
  return Array.from({ length: count }, () => ({
    x: random() * width,
    y: random() * height,
    variant: Math.floor(random() * TUFT_VARIANTS),
    front: random() < 0.3,
    phase: random() * TAU,
  }));
}

/** The longest blade a clump grows, in CSS pixels. */
const BLADE_REACH = 30;

/**
 * A few long blades seen from above, the way grass lies in a meadow: sprung
 * from a common root, arching over and lying mostly the way the wind has
 * combed them, each tapering to a paler tip with a line of sheen down its
 * middle. Painted once per lean, the same blades every time, so a clump
 * leans rather than reshuffles.
 */
function paintTuft(ctx: CanvasRenderingContext2D, variant: number, lean: number, p: Palette) {
  const random = seeded(100 + variant);
  const blades = 4 + Math.floor(random() * 4);
  const downwind = lean * Math.SQRT1_2;
  for (let i = 0; i < blades; i++) {
    // Combed by the prevailing wind: most blades lie down and to the right.
    const angle = Math.PI / 4 + (random() - 0.5) * 2.4;
    const length = 14 + random() * (BLADE_REACH - 14);
    const width = 0.45 + random() * 0.35;
    const arch = (random() - 0.5) * 0.7;
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);
    const tipX = ux * length - uy * arch * length * 0.4 + downwind * length;
    const tipY = uy * length + ux * arch * length * 0.4 + downwind * length;
    const bendX = ux * length * 0.55 - uy * arch * length + downwind * length * 0.35;
    const bendY = uy * length * 0.55 + ux * arch * length + downwind * length * 0.35;
    const nx = -uy * width;
    const ny = ux * width;
    const shade = ctx.createLinearGradient(0, 0, tipX, tipY);
    shade.addColorStop(0, p.bladeDeep);
    shade.addColorStop(0.5, p.blade);
    shade.addColorStop(1, p.bladeLit);
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(nx, ny);
    ctx.quadraticCurveTo(bendX + nx, bendY + ny, tipX, tipY);
    ctx.quadraticCurveTo(bendX - nx, bendY - ny, -nx, -ny);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = p.bladeLit;
    ctx.lineWidth = 0.3;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(bendX, bendY, tipX, tipY);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

export function buildTuftSprites(p: Palette, dpr: number): TuftSprites {
  const span = 2 * (BLADE_REACH * (1 + MAX_LEAN) + 4);
  return Array.from({ length: TUFT_VARIANTS }, (_, variant) => ({
    span,
    leans: Array.from({ length: LEAN_LEVELS }, (_, level) => {
      const [canvas, ctx] = blankCanvas(span, dpr);
      const lean = ((level / (LEAN_LEVELS - 1)) * 2 - 1) * MAX_LEAN;
      if (ctx) paintTuft(ctx, variant, lean, p);
      return canvas;
    }),
  }));
}

// ----------------------------------------------------------------- flowers

/** Low leaves round the stem, flat on the ground under the flower. */
function paintLeaves(ctx: CanvasRenderingContext2D, r: number, p: Palette, seed: number) {
  const random = seeded(seed);
  const count = 2 + Math.floor(random() * 3);
  for (let i = 0; i < count; i++) {
    const length = r * (1.1 + random() * 0.5);
    ctx.save();
    ctx.rotate((i / count) * TAU + random() * 0.8);
    const shade = ctx.createLinearGradient(0, 0, 0, -length);
    shade.addColorStop(0, p.leafDeep);
    shade.addColorStop(1, p.leaf);
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(length * 0.32, -length * 0.5, 0, -length);
    ctx.quadraticCurveTo(-length * 0.32, -length * 0.5, 0, 0);
    ctx.fill();
    ctx.strokeStyle = p.leafDeep;
    ctx.lineWidth = 0.35;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length * 0.9);
    ctx.stroke();
    ctx.restore();
  }
}

function paintDaisy(ctx: CanvasRenderingContext2D, r: number, p: Palette) {
  const petals = 18;
  ctx.strokeStyle = p.daisyEdge;
  ctx.lineWidth = 0.35;
  for (let i = 0; i < petals; i++) {
    // No two petals quite the same length.
    const reach = 0.9 + 0.2 * Math.abs(Math.sin(i * 12.9898));
    ctx.save();
    ctx.rotate((i / petals) * TAU);
    const petal = ctx.createLinearGradient(0, -r * 0.2, 0, -r * reach);
    petal.addColorStop(0, p.daisyEdge);
    petal.addColorStop(0.35, p.daisy);
    petal.addColorStop(1, p.daisy);
    ctx.fillStyle = petal;
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.56 * reach, r * 0.14, r * 0.44 * reach, 0, 0, TAU);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  const eye = ctx.createRadialGradient(-r * 0.1, -r * 0.1, 0, 0, 0, r * 0.32);
  eye.addColorStop(0, p.daisyEye);
  eye.addColorStop(1, p.daisyEyeDeep);
  ctx.fillStyle = eye;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.3, 0, TAU);
  ctx.fill();
  // The disc is hundreds of tiny florets, packed in the sunflower spiral.
  ctx.fillStyle = p.daisyEyeDeep;
  ctx.globalAlpha = 0.6;
  for (let k = 1; k < 24; k++) {
    const angle = k * 2.39996;
    const distance = r * 0.27 * Math.sqrt(k / 24);
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * distance, Math.sin(angle) * distance, r * 0.035, 0, TAU);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function paintButtercup(ctx: CanvasRenderingContext2D, r: number, p: Palette) {
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i / 5) * TAU);
    const petal = ctx.createRadialGradient(-r * 0.12, -r * 0.6, r * 0.04, 0, -r * 0.45, r * 0.6);
    petal.addColorStop(0, p.buttercupLit);
    petal.addColorStop(0.55, p.buttercup);
    petal.addColorStop(1, p.buttercupDeep);
    ctx.fillStyle = petal;
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.47, r * 0.42, r * 0.5, 0, 0, TAU);
    ctx.fill();
    // Buttercups are lacquered: each petal holds a bright highlight.
    ctx.fillStyle = p.gloss;
    ctx.beginPath();
    ctx.ellipse(-r * 0.08, -r * 0.55, r * 0.1, r * 0.18, -0.3, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = p.buttercupDeep;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.2, 0, TAU);
  ctx.fill();
  ctx.fillStyle = p.buttercupLit;
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * TAU;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * r * 0.13, Math.sin(angle) * r * 0.13, r * 0.045, 0, TAU);
    ctx.fill();
  }
}

function paintClover(ctx: CanvasRenderingContext2D, r: number, p: Palette) {
  ctx.fillStyle = p.cloverDeep;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.95, 0, TAU);
  ctx.fill();
  const rings: [number, number][] = [
    [0.8, 16],
    [0.55, 11],
    [0.3, 6],
  ];
  for (const [ring, count] of rings) {
    for (let i = 0; i < count; i++) {
      ctx.save();
      ctx.rotate((i / count) * TAU + ring * 3);
      ctx.beginPath();
      ctx.ellipse(0, -ring * r, r * 0.13, r * 0.24, 0, 0, TAU);
      ctx.fillStyle = i % 3 === 0 ? p.cloverDeep : p.clover;
      ctx.fill();
      ctx.restore();
    }
  }
  // Lit on the side facing the sun.
  const light = ctx.createRadialGradient(-r * 0.35, -r * 0.35, 0, -r * 0.35, -r * 0.35, r);
  light.addColorStop(0, p.gloss);
  light.addColorStop(1, 'transparent');
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = light;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.95, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function paintSpeedwell(ctx: CanvasRenderingContext2D, r: number, p: Palette) {
  for (let i = 0; i < 4; i++) {
    // Speedwell's lowest petal is the narrow one.
    const size = i === 2 ? 0.36 : 0.5;
    ctx.save();
    ctx.rotate((i / 4) * TAU);
    ctx.fillStyle = p.speedwell;
    ctx.beginPath();
    ctx.arc(0, -r * 0.48, r * size, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = p.speedwellDeep;
    ctx.lineWidth = 0.35;
    ctx.beginPath();
    for (const spread of [-0.25, 0, 0.25]) {
      ctx.moveTo(0, -r * 0.15);
      ctx.lineTo(spread * r, -r * 0.8);
    }
    ctx.stroke();
    ctx.restore();
  }
  ctx.fillStyle = p.speedwellEye;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.2, 0, TAU);
  ctx.fill();
}

const PAINTERS: Record<FlowerKind, (ctx: CanvasRenderingContext2D, r: number, p: Palette) => void> =
  {
    daisy: paintDaisy,
    buttercup: paintButtercup,
    clover: paintClover,
    speedwell: paintSpeedwell,
  };

function blankCanvas(
  span: number,
  dpr: number,
): [HTMLCanvasElement, CanvasRenderingContext2D | null] {
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(span * dpr);
  canvas.height = Math.ceil(span * dpr);
  const ctx = canvas.getContext('2d');
  ctx?.scale(dpr, dpr);
  ctx?.translate(span / 2, span / 2);
  return [canvas, ctx];
}

/**
 * Every flower is painted once, at each size, and stamped from then on. The
 * shadow is a separate stamp: the flower turns, but its shadow has to stay on
 * the side away from the sun.
 */
export function buildSprites(p: Palette, dpr: number): Map<string, Sprite> {
  const sprites = new Map<string, Sprite>();
  (Object.keys(FLOWER_SIZES) as FlowerKind[]).forEach((kind, kindIndex) => {
    FLOWER_SIZES[kind].forEach((radius, variant) => {
      const span = Math.ceil(radius * 3.8 + 6);
      const [flower, flowerContext] = blankCanvas(span, dpr);
      if (flowerContext) {
        paintLeaves(flowerContext, radius, p, kindIndex * 10 + variant);
        PAINTERS[kind](flowerContext, radius, p);
      }
      const [shadow, shadowContext] = blankCanvas(span, dpr);
      if (shadowContext) {
        shadowContext.filter = `blur(${Math.max(1, radius * 0.22)}px)`;
        shadowContext.fillStyle = p.shadow;
        shadowContext.beginPath();
        shadowContext.arc(0, 0, radius * 0.92, 0, TAU);
        shadowContext.fill();
      }
      sprites.set(`${kind}-${variant}`, { flower, shadow, span, radius });
    });
  });
  return sprites;
}

function drawTufts(
  ctx: CanvasRenderingContext2D,
  dpr: number,
  tufts: Tuft[],
  sprites: TuftSprites,
  table: Rect | null,
  t: number,
  front: boolean,
) {
  for (const tuft of tufts) {
    if (tuft.front !== front || inside(table, tuft, -14)) continue;
    const gust = wind(tuft, t, tuft.phase * 0.3);
    const level = Math.round(((gust + 1) / 2) * (LEAN_LEVELS - 1));
    const set = sprites[tuft.variant];
    const half = set.span / 2;
    ctx.setTransform(dpr, 0, 0, dpr, tuft.x * dpr, tuft.y * dpr);
    ctx.drawImage(set.leans[level], -half, -half, set.span, set.span);
  }
}

export function drawGround(
  ctx: CanvasRenderingContext2D,
  dpr: number,
  flowers: Flower[],
  sprites: Map<string, Sprite>,
  tufts: Tuft[],
  tuftSprites: TuftSprites,
  table: Rect | null,
  t: number,
) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawTufts(ctx, dpr, tufts, tuftSprites, table, t, false);
  for (const flower of flowers) {
    // Wholly under the table: nobody will see it.
    if (inside(table, flower, -12)) continue;
    const sprite = sprites.get(`${flower.kind}-${flower.variant}`);
    if (!sprite) continue;
    const gust = wind(flower, t, flower.phase);
    // Bowed downwind, which is down and to the right, the way the bands run.
    const x = flower.x + gust * 1.5;
    const y = flower.y + gust * 1.5;
    const half = sprite.span / 2;
    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      (x + sprite.radius * 0.28) * dpr,
      (y + sprite.radius * 0.4) * dpr,
    );
    ctx.drawImage(sprite.shadow, -half, -half, sprite.span, sprite.span);
    const angle = flower.turn + gust * 0.16;
    const cos = Math.cos(angle) * dpr;
    const sin = Math.sin(angle) * dpr;
    ctx.setTransform(cos, sin, -sin, cos, x * dpr, y * dpr);
    ctx.drawImage(sprite.flower, -half, -half, sprite.span, sprite.span);
  }
  // A few clumps grow up through and in front of the flowers.
  drawTufts(ctx, dpr, tufts, tuftSprites, table, t, true);
}
