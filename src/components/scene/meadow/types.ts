/* The shapes the meadow is described in — part of the meadow MeadowLife.tsx draws. */

export type Rect = { left: number; top: number; right: number; bottom: number };
export type Point = { x: number; y: number };
export type FlowerKind = 'daisy' | 'buttercup' | 'clover' | 'speedwell';
export type Flower = Point & { kind: FlowerKind; variant: number; turn: number; phase: number };
/** A clump of grass blades; some stand in front of the flowers, most behind. */
export type Tuft = Point & { variant: number; front: boolean; phase: number };
export type Sprite = {
  flower: HTMLCanvasElement;
  shadow: HTMLCanvasElement;
  span: number;
  radius: number;
};
export type TuftSprites = { span: number; leans: HTMLCanvasElement[] }[];
export type Insect = Point & {
  kind: 'butterfly' | 'bee';
  look: 'orange' | 'white' | 'blue';
  heading: number;
  speed: number;
  size: number;
  /** Height above the ground, in pixels of shadow offset. */
  alt: number;
  flap: number;
  resting: boolean;
  restUntil: number;
  target: Point;
  wander: number;
};
export type Field = {
  width: number;
  height: number;
  flowers: Flower[];
  table: Rect | null;
  book: Rect | null;
  random: () => number;
};
