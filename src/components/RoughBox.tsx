'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

type RoughBoxProps = {
  className?: string;
  color?: string;
  fill?: string;
  roughness?: number;
  strokeWidth?: number;
};

/**
 * Draws a wobbly, pencil-sketched rectangle that hugs its parent's box,
 * redrawing whenever the parent is resized. Meant to sit as an absolutely
 * positioned overlay behind/around content (parent needs position: relative).
 */
export default function RoughBox({
  className,
  color = 'var(--pencil)',
  fill,
  roughness = 1.8,
  strokeWidth = 1.6,
}: RoughBoxProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const resolvedColor = getComputedStyle(svg).getPropertyValue('color') || '#43362d';

    const draw = () => {
      const parent = svg.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      if (width < 1 || height < 1) return;

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      const rc = rough.svg(svg);
      const pad = strokeWidth;
      const node = rc.rectangle(pad, pad, width - pad * 2, height - pad * 2, {
        stroke: resolvedColor.trim(),
        strokeWidth,
        roughness,
        bowing: 1.4,
        fill: fill,
        fillStyle: 'hachure',
        fillWeight: 0.6,
        hachureGap: 4,
        seed: 1,
      });
      svg.appendChild(node);
    };

    draw();

    const parent = svg.parentElement;
    if (!parent) return;
    const observer = new ResizeObserver(() => draw());
    observer.observe(parent);
    return () => observer.disconnect();
  }, [color, fill, roughness, strokeWidth]);

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ''}`}
      style={{ color }}
      aria-hidden="true"
    />
  );
}
