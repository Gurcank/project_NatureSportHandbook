/* The wind, the seeded randomness, and two bits of geometry — part of the meadow MeadowLife.tsx draws. */

import type { Point, Rect } from './types';

export const TAU = Math.PI * 2;

/** Deterministic, so the meadow is laid out the same way on every visit. */
export function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The wind's sheen bands in `.meadow-gust`: one period along the 135deg bands,
 * and how fast they travel. The grass and flowers bow with the same wave, so
 * they lean as the bright band passes over them.
 */
const GUST_PERIOD = 353.55;
const GUST_SPEED = GUST_PERIOD / 9;

export function wind(point: Point, t: number, phase: number): number {
  const along = (point.x + point.y) * Math.SQRT1_2;
  const k = TAU / GUST_PERIOD;
  return (
    0.7 * Math.sin(k * (along - GUST_SPEED * t)) + 0.3 * Math.sin(k * 3.1 * along - t * 2.3 + phase)
  );
}

export function inside(rect: Rect | null, point: Point, margin = 0): boolean {
  return (
    rect !== null &&
    point.x > rect.left - margin &&
    point.x < rect.right + margin &&
    point.y > rect.top - margin &&
    point.y < rect.bottom + margin
  );
}

export function turnToward(from: number, to: number): number {
  let delta = (to - from) % TAU;
  if (delta > Math.PI) delta -= TAU;
  if (delta < -Math.PI) delta += TAU;
  return delta;
}
