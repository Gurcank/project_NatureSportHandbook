import { PLANK, TITLE_BASELINE } from './geometry';

/**
 * Everything the sign is drawn with: the plank's outline as a clip, the rust
 * bleeding from its screws, the knot displacement, and the four filters that
 * make brushed paint out of text — a broken edge, uneven coverage, and the
 * sag under a stroke that has not set.
 */
export default function SignDefs() {
  return (
    <defs>
      <clipPath id="sign-shape">
        <path d={PLANK} />
      </clipPath>

      <linearGradient id="sign-rust" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a4a1e" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#8a4a1e" stopOpacity="0" />
      </linearGradient>

      <filter id="sign-knot" x="-40%" y="-40%" width="180%" height="180%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.05 0.09"
          numOctaves={2}
          seed={21}
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={7}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      <radialGradient id="screw-head" cx="36%" cy="30%" r="72%">
        <stop offset="0%" stopColor="#8d8377" />
        <stop offset="55%" stopColor="#5d5348" />
        <stop offset="100%" stopColor="#33291d" />
      </radialGradient>

      {/* Wall paint on sawn wood. Turbulence breaks the edge of every
              stroke, a small blur lets the pigment sink into the grain, and the
              alpha ramp pulls the edge back so it reads as paint soaked in
              rather than a shape cut out. */}
      <filter id="sign-paint" x="-12%" y="-30%" width="124%" height="180%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.55 0.3"
          numOctaves={3}
          seed={17}
          result="edge"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="edge"
          scale={2.6}
          xChannelSelector="R"
          yChannelSelector="G"
          result="broken"
        />
        <feGaussianBlur in="broken" stdDeviation="0.6" result="soft" />
        <feComponentTransfer in="soft">
          <feFuncA type="table" tableValues="0 0.1 0.75 1 1" />
        </feComponentTransfer>
      </filter>

      {/* Coverage. A brush loaded by hand never lays the same thickness
              twice, so the wood shows faintly through where the paint went
              thin — this is what stops the lettering looking printed. */}
      <filter id="sign-thin" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.09 0.22"
          numOctaves={2}
          seed={31}
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0.55 0 0 0 0.5  0.55 0 0 0 0.5  0.55 0 0 0 0.5  0 0 0 0 1"
        />
      </filter>

      <mask id="paint-coverage">
        <rect width="800" height="220" filter="url(#sign-thin)" />
      </mask>

      {/* The sag below each stroke fades out as the paint thins. */}
      <linearGradient id="sag-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="40%" stopColor="#fff" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </linearGradient>

      <mask id="sag-mask">
        <rect x="0" y={TITLE_BASELINE - 4} width="800" height="34" fill="url(#sag-fade)" />
      </mask>
    </defs>
  );
}
