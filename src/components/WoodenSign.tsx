'use client';

import { useEffect, useRef, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { HOME_TITLE } from '@/lib/book';

const SUBTITLE = {
  tr: 'Doğa ve spor kâşifleri için araziye hazır notlar',
  en: 'Field-ready notes for nature and sport explorers',
};

/** A plainly sawn plank: the age is on its face, not bitten out of its edge. */
const PLANK =
  'M8 16 C 160 10, 380 15, 600 11 L 664 13 L 790 110 L 664 207 L 600 209 C 380 206, 160 211, 10 204 Z';

const TITLE_BASELINE = 102;
const SUBTITLE_BASELINE = 146;
const TEXT_CENTRE = 344;

/**
 * Where the paint gathered and ran, as fractions across the lettering's own
 * width. Mostly short: a wall painted quickly gives a couple of long runs and a
 * lot of small ones, not an even row of them.
 */
const DRIP_STOPS = [
  { at: 0.08, length: 7, width: 1.5, opacity: 0.5 },
  { at: 0.19, length: 24, width: 2.2, opacity: 0.72 },
  { at: 0.31, length: 6, width: 1.3, opacity: 0.44 },
  { at: 0.42, length: 12, width: 1.8, opacity: 0.58 },
  { at: 0.55, length: 32, width: 2.5, opacity: 0.78 },
  { at: 0.66, length: 9, width: 1.5, opacity: 0.5 },
  { at: 0.79, length: 17, width: 2, opacity: 0.62 },
  { at: 0.91, length: 6, width: 1.4, opacity: 0.46 },
];

/**
 * One run of paint: a band as wide as the stroke it left, pinched in the middle
 * where gravity stretched it, ending in the bead that stopped moving when the
 * paint went tacky.
 */
function dripPath(x: number, top: number, length: number, width: number): string {
  const bead = width * 1.3;
  const waist = width * 0.42;
  const beadY = top + length - bead;
  return [
    `M${x - width} ${top}`,
    `C ${x - width} ${top + length * 0.4}, ${x - waist} ${top + length * 0.55}, ${x - bead} ${beadY}`,
    `A ${bead} ${bead} 0 1 0 ${x + bead} ${beadY}`,
    `C ${x + waist} ${top + length * 0.55}, ${x + width} ${top + length * 0.4}, ${x + width} ${top}`,
    'Z',
  ].join(' ');
}

const PAINT_FONT = "var(--font-kalam), 'Segoe Print', 'Bradley Hand', cursive";

/** Chalky and slightly warm — a lime wash, not printer's white. */
const PAINT_COLOUR = '#ece3cf';

const TITLE_SIZE = 50;

/**
 * A trail sign that has been out in the weather for a while. The plank is drawn
 * in SVG so the grain can come from anisotropic turbulence pushed through a
 * displacement map — stretched noise is what reads as wood, where stripes read
 * as paint. On top of that it is aged: the upper face bleached by sun, the
 * lower edge darkened by damp, splits opened along the grain, rust bleeding
 * from the screws, and bites out of the corners.
 *
 * The lettering is lime wash brushed on, not carved, and it has run: a sagged
 * copy of the text bleeds below the strokes and a handful of drips hang off
 * them. The drips are placed against the lettering's measured width so they
 * start inside the paint rather than in mid air.
 */
export default function WoodenSign() {
  const { language } = useSettings();
  const titleRef = useRef<SVGTextElement>(null);
  const [titleBox, setTitleBox] = useState<{ x: number; width: number } | null>(null);

  // Measured rather than assumed: the two titles are different lengths, and a
  // drip hanging where there is no letter above it gives the whole thing away.
  useEffect(() => {
    const node = titleRef.current;
    if (!node) return;
    const box = node.getBBox();
    setTitleBox({ x: box.x, width: box.width });
  }, [language]);

  return (
    <div className="sign-fit relative mx-auto rotate-[-2.4deg]">
      <svg
        viewBox="0 0 800 220"
        className="block h-full w-full drop-shadow-[0_0.7rem_1rem_rgba(30,18,8,0.42)]"
        role="img"
        aria-label={`${HOME_TITLE[language]} — ${SUBTITLE[language]}`}
      >
        <defs>
          <clipPath id="sign-shape">
            <path d={PLANK} />
          </clipPath>

          <linearGradient id="sign-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b8946a" />
            <stop offset="42%" stopColor="#9a7149" />
            <stop offset="100%" stopColor="#734d2e" />
          </linearGradient>

          {/* Years of sun on the upper face, damp along the lower edge. */}
          <linearGradient id="sign-weather" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ded0bb" stopOpacity="0.62" />
            <stop offset="34%" stopColor="#c4b49c" stopOpacity="0.26" />
            <stop offset="60%" stopColor="#4a3018" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#2b1a0a" stopOpacity="0.52" />
          </linearGradient>

          {/* Where the finish has weathered off, bare wood goes silver-grey. */}
          <filter id="sign-worn" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.11"
              numOctaves={3}
              seed={29}
              result="n"
            />
            <feColorMatrix
              in="n"
              type="matrix"
              values="0 0 0 0 0.72 0 0 0 0 0.70 0 0 0 0 0.65 0 0 0 0.9 -0.28"
            />
          </filter>

          <linearGradient id="sign-rust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a4a1e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8a4a1e" stopOpacity="0" />
          </linearGradient>

          {/* Long-grain: noise stretched hard along the plank, then used to
              push straight lines into flowing grain. */}
          <filter id="sign-grain" x="-6%" y="-24%" width="112%" height="148%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0055 0.36"
              numOctaves={4}
              seed={12}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={17}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Surface relief: the same stretched noise lit from the upper left,
              which gives the plank its slightly rough, undulating face. */}
          <filter id="sign-relief" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.5"
              numOctaves={3}
              seed={5}
              result="noise"
            />
            <feDiffuseLighting in="noise" lightingColor="#d0a473" surfaceScale={2.4} result="lit">
              <feDistantLight azimuth={235} elevation={56} />
            </feDiffuseLighting>
          </filter>

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

        <g clipPath="url(#sign-shape)">
          <rect width="800" height="220" fill="url(#sign-base)" />

          <g filter="url(#sign-relief)" opacity="0.34" style={{ mixBlendMode: 'multiply' }}>
            <rect width="800" height="220" />
          </g>

          <g filter="url(#sign-grain)" opacity="0.42">
            {Array.from({ length: 15 }, (_, row) => (
              <rect
                key={row}
                x="-40"
                y={row * 15 + (row % 3) * 2}
                width="880"
                height={row % 4 === 0 ? 3.2 : 1.5}
                fill={row % 4 === 0 ? '#5e3c20' : '#7d5533'}
                opacity={row % 3 === 0 ? 0.85 : 0.5}
              />
            ))}
          </g>

          {/* Splits: wood always opens along the grain, never across it. */}
          <g filter="url(#sign-grain)" opacity="0.55">
            <path
              d="M96 40 C 190 38, 280 42, 372 39"
              stroke="#3d2410"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M430 176 C 500 178, 560 174, 618 177"
              stroke="#3d2410"
              strokeWidth="2.1"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M180 118 C 236 120, 268 116, 300 118"
              stroke="#3d2410"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M392 24 C 470 27, 540 22, 596 25"
              stroke="#3d2410"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M74 196 C 150 199, 220 194, 286 197"
              stroke="#33200e"
              strokeWidth="1.7"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Knots: rings pulled out of round by the same displacement idea. */}
          <g filter="url(#sign-knot)" opacity="0.62">
            {[
              { cx: 168, cy: 148, rx: 17, ry: 11 },
              { cx: 470, cy: 62, rx: 13, ry: 9 },
            ].map((knot) => (
              <g key={`${knot.cx}-${knot.cy}`}>
                {[1, 0.72, 0.46, 0.24].map((scale) => (
                  <ellipse
                    key={scale}
                    cx={knot.cx}
                    cy={knot.cy}
                    rx={knot.rx * scale}
                    ry={knot.ry * scale}
                    fill="none"
                    stroke="#4c2f16"
                    strokeWidth={1.5}
                    opacity={0.55}
                  />
                ))}
                <ellipse
                  cx={knot.cx}
                  cy={knot.cy}
                  rx={knot.rx * 0.24}
                  ry={knot.ry * 0.24}
                  fill="#42280f"
                />
              </g>
            ))}
          </g>

          <rect width="800" height="220" filter="url(#sign-worn)" opacity="0.5" />
          <rect width="800" height="220" fill="url(#sign-weather)" />
          <path d="M628 0 H800 V220 H628 Z" fill="rgba(38,22,9,0.16)" />

          {/* Rust bleeding downhill from each fixing. */}
          {[
            { x: 52, y: 46 },
            { x: 52, y: 174 },
            { x: 604, y: 44 },
            { x: 604, y: 176 },
          ].map((screw) => (
            <rect
              key={`rust-${screw.x}-${screw.y}`}
              x={screw.x - 5}
              y={screw.y + 4}
              width="10"
              height="34"
              fill="url(#sign-rust)"
              filter="url(#sign-knot)"
            />
          ))}
        </g>

        <path d={PLANK} fill="none" stroke="rgba(46,27,11,0.6)" strokeWidth="2.4" />

        {[
          { cx: 52, cy: 46 },
          { cx: 52, cy: 174 },
          { cx: 604, cy: 44 },
          { cx: 604, cy: 176 },
        ].map((screw) => (
          <g key={`${screw.cx}-${screw.cy}`}>
            <ellipse cx={screw.cx} cy={screw.cy + 1.6} rx="8" ry="7.4" fill="rgba(30,17,6,0.42)" />
            <circle cx={screw.cx} cy={screw.cy} r="7.4" fill="url(#screw-head)" />
            <path
              d={`M${screw.cx - 4.6} ${screw.cy - 2.6} L${screw.cx + 4.6} ${screw.cy + 2.6}`}
              stroke="rgba(20,13,6,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d={`M${screw.cx - 5} ${screw.cy - 4.4} A 7 7 0 0 1 ${screw.cx + 1} ${screw.cy - 6.6}`}
              stroke="rgba(226,214,196,0.4)"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* The damp halo. Paint on bare wood wets the fibres just past its own
            edge, and that darker ring is what seats the lettering on the plank
            instead of floating it above. */}
        <g filter="url(#sign-paint)" aria-hidden="true" opacity="0.3">
          <text
            x={TEXT_CENTRE}
            y={TITLE_BASELINE + 1.2}
            textAnchor="middle"
            fontSize={TITLE_SIZE}
            fontWeight={700}
            fill="#2b1a0a"
            stroke="#2b1a0a"
            strokeWidth="2.6"
            style={{ fontFamily: PAINT_FONT }}
          >
            {HOME_TITLE[language]}
          </text>
        </g>

        <g filter="url(#sign-paint)" mask="url(#paint-coverage)" aria-hidden="true">
          {/* The sag: the same letters pulled down off the baseline and faded
              out, which is what wet paint does before it sets. */}
          <g mask="url(#sag-mask)">
            <text
              x={TEXT_CENTRE}
              y={TITLE_BASELINE}
              textAnchor="middle"
              fontSize={TITLE_SIZE}
              fontWeight={700}
              fill={PAINT_COLOUR}
              style={{ fontFamily: PAINT_FONT }}
              transform={`translate(0 ${TITLE_BASELINE}) scale(1 1.24) translate(0 ${-TITLE_BASELINE})`}
            >
              {HOME_TITLE[language]}
            </text>
          </g>

          {/* Runs start above the baseline so they leave the letters rather
              than hang under them, and they are placed against the measured
              width of the lettering so none of them begins in mid air. */}
          {titleBox
            ? DRIP_STOPS.map((drip) => (
                <path
                  key={drip.at}
                  d={dripPath(
                    titleBox.x + titleBox.width * drip.at,
                    TITLE_BASELINE - 9,
                    drip.length + 9,
                    drip.width,
                  )}
                  fill={PAINT_COLOUR}
                  opacity={drip.opacity}
                />
              ))
            : null}

          <text
            ref={titleRef}
            x={TEXT_CENTRE}
            y={TITLE_BASELINE}
            textAnchor="middle"
            fontSize={TITLE_SIZE}
            fontWeight={700}
            fill={PAINT_COLOUR}
            style={{ fontFamily: PAINT_FONT }}
          >
            {HOME_TITLE[language]}
          </text>

          <text
            x={TEXT_CENTRE}
            y={SUBTITLE_BASELINE}
            textAnchor="middle"
            fontSize={19}
            fill={PAINT_COLOUR}
            opacity={0.8}
            style={{ fontFamily: PAINT_FONT }}
          >
            {SUBTITLE[language]}
          </text>
        </g>
      </svg>
    </div>
  );
}
