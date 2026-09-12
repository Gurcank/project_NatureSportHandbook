/* The butterflies and bees, and how they fly — part of the meadow MeadowLife.tsx draws. */

import type { Field, Insect, Point } from './types';
import type { Palette } from './palette';
import { TAU, inside, turnToward } from './wind';

// ---------------------------------------------------------------- insects

/** Somewhere to land: a flower out on the grass, clear of the table and the book. */
function pickLanding(field: Field): Point {
  const { flowers, table, book, width, height, random } = field;
  for (let i = 0; i < 16; i++) {
    const flower = flowers[Math.floor(random() * flowers.length)];
    if (
      flower &&
      !inside(table, flower, 6) &&
      !inside(book, flower, 24) &&
      flower.x > 8 &&
      flower.x < width - 8 &&
      flower.y > 8 &&
      flower.y < height - 8
    ) {
      return { x: flower.x, y: flower.y };
    }
  }
  for (let i = 0; i < 16; i++) {
    const spot = { x: random() * width, y: random() * height };
    if (!inside(book, spot, 24)) return spot;
  }
  return { x: width * 0.05, y: height * 0.05 };
}

export function spawnInsects(field: Field): Insect[] {
  const area = field.width * field.height;
  const clamp = (n: number) => Math.min(5, Math.max(2, n));
  const looks = ['orange', 'white', 'blue'] as const;
  const make = (kind: Insect['kind'], index: number): Insect => {
    const start = pickLanding(field);
    const bee = kind === 'bee';
    return {
      kind,
      look: looks[index % looks.length],
      x: start.x,
      y: start.y,
      heading: field.random() * TAU,
      speed: bee ? 105 + field.random() * 40 : 50 + field.random() * 25,
      size: bee ? 3.4 + field.random() * 0.8 : 9 + field.random() * 3,
      alt: 1.5,
      flap: field.random() * TAU,
      resting: true,
      restUntil: field.random() * 3,
      target: start,
      wander: 0,
    };
  };
  return [
    ...Array.from({ length: clamp(Math.round(area / 320000)) }, (_, i) => make('butterfly', i)),
    ...Array.from({ length: clamp(Math.round(area / 260000)) }, (_, i) => make('bee', i)),
  ];
}

/**
 * One step of flight. Butterflies loaf and wander; bees go straight and
 * quick. Both land on a flower, stay a while, then pick another — and both
 * turn away from the book rather than cross it.
 */
export function step(insect: Insect, dt: number, t: number, field: Field) {
  const bee = insect.kind === 'bee';
  if (insect.resting) {
    insect.alt += (1.5 - insect.alt) * Math.min(1, dt * 5);
    insect.flap += dt * (bee ? 40 : 1.8);
    if (t > insect.restUntil) {
      insect.resting = false;
      insect.target = pickLanding(field);
    }
    return;
  }

  const dx = insect.target.x - insect.x;
  const dy = insect.target.y - insect.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 6) {
    insect.resting = true;
    insect.x = insect.target.x;
    insect.y = insect.target.y;
    insect.restUntil = t + (bee ? 0.8 + field.random() * 1.8 : 2.5 + field.random() * 5);
    return;
  }

  insect.wander += (field.random() - 0.5) * dt * (bee ? 16 : 6);
  insect.wander *= 1 - Math.min(1, dt * 1.2);
  let desired = Math.atan2(dy, dx) + insect.wander * Math.min(1, distance / 80);

  const { book } = field;
  const ahead = {
    x: insect.x + Math.cos(insect.heading) * 36,
    y: insect.y + Math.sin(insect.heading) * 36,
  };
  if (book && (inside(book, ahead, 18) || inside(book, insect, 10))) {
    desired = Math.atan2(
      insect.y - (book.top + book.bottom) / 2,
      insect.x - (book.left + book.right) / 2,
    );
    // Kept from its flower by the book long enough, it goes elsewhere.
    if (field.random() < dt * 0.7) insect.target = pickLanding(field);
  }
  if (insect.x < 0 || insect.x > field.width || insect.y < 0 || insect.y > field.height) {
    desired = Math.atan2(field.height / 2 - insect.y, field.width / 2 - insect.x);
  }

  const maxTurn = (bee ? 7 : 3.4) * (distance < 30 ? 2.5 : 1) * dt;
  insect.heading += Math.max(-maxTurn, Math.min(maxTurn, turnToward(insect.heading, desired)));
  const pace = bee
    ? 0.85 + 0.3 * Math.sin(t * 9 + insect.size * 5)
    : 0.75 + 0.4 * Math.sin(t * 3.1 + insect.size * 3);
  const speed = insect.speed * pace * Math.min(1, 0.35 + distance / 60);
  insect.x += Math.cos(insect.heading) * speed * dt;
  insect.y += Math.sin(insect.heading) * speed * dt;
  const cruising = bee ? 9 : 15 + 5 * Math.sin(t * 2.2 + insect.size);
  insect.alt += (cruising - insect.alt) * Math.min(1, dt * 2);
  insect.flap += dt * (bee ? 60 : 12);
}

/** Rotates the drawing to the insect's heading, optionally squeezed across. */
function place(
  ctx: CanvasRenderingContext2D,
  dpr: number,
  x: number,
  y: number,
  angle: number,
  across = 1,
) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  ctx.setTransform(cos * across * dpr, sin * across * dpr, -sin * dpr, cos * dpr, x * dpr, y * dpr);
}

/** One side's fore and hind wing, pointing forward along -y. */
function wingPath(ctx: CanvasRenderingContext2D, s: number) {
  ctx.moveTo(0, -s * 0.15);
  ctx.bezierCurveTo(s * 0.35, -s * 1.05, s * 1.2, -s * 0.95, s * 1.05, -s * 0.15);
  ctx.bezierCurveTo(s * 0.95, s * 0.1, s * 0.4, s * 0.12, 0, s * 0.05);
  ctx.moveTo(0, s * 0.05);
  ctx.bezierCurveTo(s * 0.6, s * 0.1, s * 0.95, s * 0.55, s * 0.62, s * 0.95);
  ctx.bezierCurveTo(s * 0.4, s * 1.12, s * 0.12, s * 0.7, 0, s * 0.4);
}

function wingFill(ctx: CanvasRenderingContext2D, insect: Insect, p: Palette): CanvasGradient {
  const s = insect.size;
  const fill = ctx.createRadialGradient(0, 0, s * 0.1, 0, 0, s * 1.25);
  if (insect.look === 'orange') {
    fill.addColorStop(0, p.orangeDeep);
    fill.addColorStop(0.28, p.orange);
    fill.addColorStop(0.86, p.orange);
    fill.addColorStop(1, p.orangeDeep);
  } else if (insect.look === 'white') {
    fill.addColorStop(0, p.white);
    fill.addColorStop(0.8, p.white);
    fill.addColorStop(1, p.whiteTip);
  } else {
    fill.addColorStop(0, p.blueDeep);
    fill.addColorStop(0.35, p.blue);
    fill.addColorStop(0.9, p.blue);
    fill.addColorStop(1, p.white);
  }
  return fill;
}

/**
 * The markings, painted inside the wing's own outline: a dark band round the
 * outer edge, the veins running out from the body, and the spots each kind is
 * known by — white spots in the orange's border, a black spot on the white's
 * forewing, orange spots along the blue's hind edge.
 */
function paintMarkings(ctx: CanvasRenderingContext2D, insect: Insect, p: Palette) {
  const s = insect.size;
  ctx.save();
  ctx.beginPath();
  wingPath(ctx, s);
  ctx.clip();

  ctx.strokeStyle =
    insect.look === 'orange' ? p.orangeDeep : insect.look === 'white' ? p.whiteTip : p.blueDeep;
  ctx.lineWidth = s * (insect.look === 'white' ? 0.12 : 0.24);
  ctx.globalAlpha = insect.look === 'white' ? 0.55 : 0.85;
  ctx.beginPath();
  wingPath(ctx, s);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = p.vein;
  ctx.lineWidth = 0.35;
  ctx.beginPath();
  for (const [x, y] of [
    [s * 0.95, -s * 0.75],
    [s * 1.05, -s * 0.4],
    [s * 0.9, -s * 0.1],
    [s * 0.85, s * 0.45],
    [s * 0.55, s * 0.9],
  ]) {
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(x * 0.5, y * 0.35, x, y);
  }
  ctx.stroke();

  const dot = (x: number, y: number, radius: number, colour: string) => {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, TAU);
    ctx.fill();
  };
  if (insect.look === 'orange') {
    dot(s * 0.88, -s * 0.62, s * 0.06, p.spot);
    dot(s * 0.72, -s * 0.8, s * 0.05, p.spot);
    dot(s * 1.0, -s * 0.36, s * 0.05, p.spot);
    dot(s * 0.62, -s * 0.45, s * 0.1, p.body);
  } else if (insect.look === 'white') {
    dot(s * 0.62, -s * 0.42, s * 0.09, p.whiteTip);
  } else {
    dot(s * 0.62, s * 0.78, s * 0.05, p.orange);
    dot(s * 0.45, s * 0.86, s * 0.05, p.orange);
  }
  ctx.restore();
}

function drawButterfly(ctx: CanvasRenderingContext2D, insect: Insect, p: Palette, dpr: number) {
  const s = insect.size;
  // Seen from above, a wingbeat is the wings folding up towards each other:
  // they narrow to the body and open out again. At rest they open and close
  // slowly in the sun.
  const open = insect.resting ? 0.6 + 0.4 * Math.sin(insect.flap) : Math.abs(Math.cos(insect.flap));
  const spread = 0.14 + 0.86 * open;
  const angle = insect.heading + Math.PI / 2;

  ctx.fillStyle = p.insectShadow;
  for (const side of [1, -1]) {
    place(
      ctx,
      dpr,
      insect.x + insect.alt * 0.5,
      insect.y + insect.alt * 0.75,
      angle,
      side * spread,
    );
    ctx.beginPath();
    wingPath(ctx, s);
    ctx.fill();
  }

  for (const side of [1, -1]) {
    place(ctx, dpr, insect.x, insect.y, angle, side * spread);
    ctx.fillStyle = wingFill(ctx, insect, p);
    ctx.beginPath();
    wingPath(ctx, s);
    ctx.fill();
    paintMarkings(ctx, insect, p);
  }

  // A furred body: thorax, then the long abdomen, lit on the sun's side.
  place(ctx, dpr, insect.x, insect.y, angle);
  const body = ctx.createLinearGradient(-s * 0.12, 0, s * 0.12, 0);
  body.addColorStop(0, p.beeFur);
  body.addColorStop(0.45, p.body);
  body.addColorStop(1, p.body);
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.18, s * 0.13, s * 0.26, 0, 0, TAU);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(0, s * 0.35, s * 0.09, s * 0.45, 0, 0, TAU);
  ctx.fill();
  ctx.fillStyle = p.body;
  ctx.beginPath();
  ctx.arc(0, -s * 0.52, s * 0.11, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = p.body;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-s * 0.04, -s * 0.6);
  ctx.lineTo(-s * 0.3, -s * 1.05);
  ctx.moveTo(s * 0.04, -s * 0.6);
  ctx.lineTo(s * 0.3, -s * 1.05);
  ctx.stroke();
  // Clubbed tips.
  ctx.fillStyle = p.body;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(side * s * 0.3, -s * 1.05, s * 0.045, 0, TAU);
    ctx.fill();
  }
}

function drawBee(ctx: CanvasRenderingContext2D, insect: Insect, p: Palette, dpr: number) {
  const s = insect.size;
  const angle = insect.heading + Math.PI / 2;

  place(ctx, dpr, insect.x + insect.alt * 0.5, insect.y + insect.alt * 0.75, angle);
  ctx.fillStyle = p.insectShadow;
  ctx.beginPath();
  ctx.ellipse(0, 0, s * 0.5, s * 0.95, 0, 0, TAU);
  ctx.fill();

  place(ctx, dpr, insect.x, insect.y, angle);
  // Wings a blur in flight, folded back along the body at rest; veined and
  // glassy either way.
  const tilt = insect.resting ? 0.9 : 0.4;
  ctx.globalAlpha = insect.resting ? 0.9 : 0.45 + 0.35 * Math.abs(Math.sin(insect.flap));
  for (const side of [1, -1]) {
    ctx.fillStyle = p.beeWing;
    ctx.beginPath();
    ctx.ellipse(side * s * 0.55, -s * 0.1, s * 0.55, s * 0.3, side * tilt, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = p.vein;
    ctx.lineWidth = 0.25;
    ctx.beginPath();
    ctx.moveTo(side * s * 0.1, -s * 0.12);
    ctx.lineTo(side * s * 0.95, -s * 0.1 + side * tilt * s * 0.2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.save();
  ctx.beginPath();
  ctx.ellipse(0, s * 0.3, s * 0.4, s * 0.6, 0, 0, TAU);
  ctx.fillStyle = p.beeYellow;
  ctx.fill();
  ctx.clip();
  ctx.fillStyle = p.beeDark;
  for (let band = 0; band < 3; band++) {
    ctx.fillRect(-s, s * (0.12 + band * 0.24), s * 2, s * 0.11);
  }
  ctx.restore();

  // Thorax: a ball of fur, brightest where the sun is on it.
  const fur = ctx.createRadialGradient(-s * 0.1, -s * 0.28, 0, 0, -s * 0.2, s * 0.34);
  fur.addColorStop(0, p.beeYellow);
  fur.addColorStop(0.6, p.beeFur);
  fur.addColorStop(1, p.beeDark);
  ctx.fillStyle = fur;
  ctx.beginPath();
  ctx.arc(0, -s * 0.2, s * 0.34, 0, TAU);
  ctx.fill();

  ctx.fillStyle = p.beeDark;
  ctx.beginPath();
  ctx.arc(0, -s * 0.62, s * 0.22, 0, TAU);
  ctx.fill();
}

export function drawAir(ctx: CanvasRenderingContext2D, dpr: number, insects: Insect[], p: Palette) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (const insect of insects) {
    if (insect.kind === 'bee') drawBee(ctx, insect, p, dpr);
    else drawButterfly(ctx, insect, p, dpr);
  }
}
