/* The scene colours, read once out of the stylesheet — part of the meadow MeadowLife.tsx draws. */

const TOKENS = {
  shadow: '--meadow-shadow',
  gloss: '--meadow-gloss',
  leaf: '--meadow-leaf',
  leafDeep: '--meadow-leaf-deep',
  blade: '--grass-blade',
  bladeDeep: '--grass-blade-deep',
  bladeLit: '--grass-blade-lit',
  daisy: '--meadow-daisy',
  daisyEdge: '--meadow-daisy-edge',
  daisyEye: '--meadow-daisy-eye',
  daisyEyeDeep: '--meadow-daisy-eye-deep',
  buttercup: '--meadow-buttercup',
  buttercupLit: '--meadow-buttercup-lit',
  buttercupDeep: '--meadow-buttercup-deep',
  clover: '--meadow-clover',
  cloverDeep: '--meadow-clover-deep',
  speedwell: '--meadow-speedwell',
  speedwellDeep: '--meadow-speedwell-deep',
  speedwellEye: '--meadow-speedwell-eye',
  orange: '--butterfly-orange',
  orangeDeep: '--butterfly-orange-deep',
  white: '--butterfly-white',
  whiteTip: '--butterfly-white-tip',
  blue: '--butterfly-blue',
  blueDeep: '--butterfly-blue-deep',
  body: '--butterfly-body',
  vein: '--butterfly-vein',
  spot: '--butterfly-spot',
  beeYellow: '--bee-yellow',
  beeDark: '--bee-dark',
  beeFur: '--bee-fur',
  beeWing: '--bee-wing',
  insectShadow: '--insect-shadow',
} as const;

export type Palette = Record<keyof typeof TOKENS, string>;

/** Canvas cannot read custom properties, so the tokens are resolved once. */
export function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement);
  const palette = {} as Palette;
  for (const key of Object.keys(TOKENS) as (keyof typeof TOKENS)[]) {
    palette[key] = style.getPropertyValue(TOKENS[key]).trim();
  }
  return palette;
}
