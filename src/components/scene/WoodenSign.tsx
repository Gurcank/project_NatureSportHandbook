'use client';

import { useEffect, useRef, useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { HOME_TITLE } from '@/lib/book';
import SignDefs from './sign/SignDefs';
import {
  DRIP_STOPS,
  PAINT_COLOUR,
  PAINT_FONT,
  PLANK,
  SUBTITLE,
  SUBTITLE_BASELINE,
  TEXT_CENTRE,
  TITLE_BASELINE,
  TITLE_SIZE,
  dripPath,
} from './sign/geometry';

/**
 * A trail sign that has been out in the weather for a while. The plank is the
 * same weathered hardwood as the table it lies on (`.sign-wood`), so the two
 * read as one material under one sun. Over it, what is the sign's own: splits
 * opened along the grain, knots, rust bleeding from the screws, and the edge
 * of the plank.
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
      {/* The plank itself is the table's wood (see `.sign-wood`), cut to the
          sign's outline; the SVG over it adds what is the sign's own. */}
      <div aria-hidden="true" className="sign-wood" />
      <svg
        viewBox="0 0 800 220"
        className="relative block h-full w-full"
        role="img"
        aria-label={`${HOME_TITLE[language]} — ${SUBTITLE[language]}`}
      >
        <SignDefs />
        <g clipPath="url(#sign-shape)">
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
            instead of floating it above. Freshly sanded wood drinks more of
            it, and the pale board needs it to keep the lettering reading, so
            it is deeper than on weathered wood and runs round the subtitle
            too. */}
        <g filter="url(#sign-paint)" aria-hidden="true" opacity="0.5">
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
          <text
            x={TEXT_CENTRE}
            y={SUBTITLE_BASELINE + 0.6}
            textAnchor="middle"
            fontSize={19}
            fill="#2b1a0a"
            stroke="#2b1a0a"
            strokeWidth="1.6"
            style={{ fontFamily: PAINT_FONT }}
          >
            {SUBTITLE[language]}
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
