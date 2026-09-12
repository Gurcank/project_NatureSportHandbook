export default function PencilDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="graphite" x="-8%" y="-30%" width="116%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.9"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0"
            result="grain"
          />
          {/* Clipped to the letters, not composited over the filter region: the
              noise is stretched horizontally, so painting it across the whole
              box drew black bands behind the heading. */}
          <feComposite in="grain" in2="displaced" operator="in" result="grain-in-text" />
          <feMerge>
            <feMergeNode in="displaced" />
            <feMergeNode in="grain-in-text" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
