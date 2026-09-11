/**
 * Hand-made things are never perfectly aligned, but a random tilt would differ
 * between the server render and the client one and trip hydration. Everything
 * that wobbles derives its offset from a stable string seed instead.
 */
function hash(seed: string): number {
  let value = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return (value >>> 0) / 4294967295;
}

/** A stable value in [min, max] for the given seed. */
export function jitter(seed: string, min: number, max: number): number {
  return min + hash(seed) * (max - min);
}
