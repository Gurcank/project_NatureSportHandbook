import { describe, expect, it } from 'vitest';
import { parseClipPolygon, widenFoldClip, type ForeEdge } from './fold';

/** Page geometry as the flip library reported it in the browser at 1280px. */
const WIDTH = 420.274;
const HEIGHT = 590;
const OVERHANG = 108.797;

const rightPage = {
  width: WIDTH,
  height: HEIGHT,
  overhang: OVERHANG,
  foreEdge: 'right' as ForeEdge,
};
const leftPage = { ...rightPage, foreEdge: 'left' as ForeEdge };

describe('parseClipPolygon', () => {
  it('drops the repeated closing point the library writes', () => {
    expect(
      parseClipPolygon('polygon(255px 0px, 420px 0px, 420px 590px, 113px 590px, 255px 0px)'),
    ).toHaveLength(4);
  });

  it('rejects anything that is not a polygon', () => {
    expect(parseClipPolygon('none')).toBeNull();
    expect(parseClipPolygon('circle(50%)')).toBeNull();
  });
});

describe('widenFoldClip', () => {
  it('carries a fore-edge corner out along the crease', () => {
    // An early fold: the crease has crossed the fore edge at y = 215.
    const clip = `polygon(0px 0px, ${WIDTH}px 0px, ${WIDTH}px 215px, 140px ${HEIGHT}px, 0px ${HEIGHT}px)`;
    const points = parseClipPolygon(widenFoldClip(clip, rightPage)!)!;

    // The square corner moves straight out; the crease corner follows the crease.
    expect(points[1]).toEqual({ x: round(WIDTH + OVERHANG), y: 0 });
    expect(points[2].x).toBeCloseTo(WIDTH + OVERHANG, 3);
    expect(points[2].y).toBeCloseTo(69.433, 2);
    // Nothing on the spine side moves.
    expect(points[0]).toEqual({ x: 0, y: 0 });
    expect(points[3]).toEqual({ x: 140, y: HEIGHT });
  });

  it('widens the page revealed under the fold', () => {
    const clip = 'polygon(255.295px 0px, 420px 0px, 420px 590px, 113.757px 590px, 255.295px 0px)';
    const points = parseClipPolygon(widenFoldClip(clip, rightPage)!)!;

    expect(points.filter((p) => p.x > WIDTH)).toHaveLength(2);
    expect(points.some((p) => p.x === 255.295 && p.y === 0)).toBe(true);
    expect(points.some((p) => p.x === 113.757 && p.y === HEIGHT)).toBe(true);
  });

  it('mirrors onto a left-hand leaf', () => {
    const clip = 'polygon(0px 0px, 0px 215px, 280px 590px, 420px 590px, 420px 0px)';
    const points = parseClipPolygon(widenFoldClip(clip, leftPage)!)!;

    expect(points[0]).toEqual({ x: -round(OVERHANG), y: 0 });
    expect(points[1].x).toBeCloseTo(-OVERHANG, 3);
    expect(points[1].y).toBeCloseTo(69.29, 2);
  });

  it('leaves a fold that has already passed the tab alone', () => {
    // Recorded late in a real flip: the polygon never reaches the fore edge.
    const clip = 'polygon(0px 0px, 165.705px 0px, 307.243px 590px, 0px 590px)';
    expect(widenFoldClip(clip, rightPage)).toBeNull();
  });

  it('leaves the near-empty sliver of a finished flip alone', () => {
    // This shape is not a rectangle cut by one crease; widening it blindly used
    // to open a beige wedge outside the book.
    const clip = 'polygon(0px 0px, 0px 588.191px, 2.09668px 590px, 0px 590px)';
    expect(widenFoldClip(clip, rightPage)).toBeNull();
  });

  it('refuses a polygon it has already widened', () => {
    const clip = `polygon(0px 0px, ${WIDTH}px 0px, ${WIDTH}px 215px, 140px ${HEIGHT}px, 0px ${HEIGHT}px)`;
    const once = widenFoldClip(clip, rightPage)!;
    expect(widenFoldClip(once, rightPage)).toBeNull();
  });
});

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}
