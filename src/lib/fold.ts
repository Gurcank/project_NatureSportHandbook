/**
 * Geometry for the crease of a turning page.
 *
 * StPageFlip draws a soft flip by clipping the page element with a `clip-path`
 * polygon cut to the page rectangle. Anything a leaf hangs past its own edge —
 * an edge tab — is therefore erased the instant the page starts to move, which
 * is why a tab that is plainly part of the paper standing still looks detached
 * the moment it turns.
 *
 * The fix is deliberately local: take the polygon the library wrote and push
 * only the corners sitting on the *fore edge* out by the overhang, following
 * the crease where the crease is what meets that edge. Everything else — the
 * crease itself, the spine side, the shape near a corner — is left exactly as
 * the library drew it, so no state the library can produce grows a region the
 * library did not intend.
 */

export type Point = { x: number; y: number };

/** Which edge of the page the leaf's tab hangs off. */
export type ForeEdge = 'left' | 'right';

/** How far off an edge a point may sit and still count as lying on it. */
const EDGE_TOLERANCE = 1.5;

/** Points nearer than this are the same corner written twice. */
const MERGE_TOLERANCE = 0.01;

export function parseClipPolygon(value: string): Point[] | null {
  const body = /^polygon\(\s*(.+?)\s*\)$/.exec(value.trim());
  if (!body) return null;

  const points: Point[] = [];
  for (const pair of body[1].split(',')) {
    const parts = pair.trim().split(/\s+/);
    if (parts.length !== 2) return null;
    const x = Number.parseFloat(parts[0]);
    const y = Number.parseFloat(parts[1]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
    points.push({ x, y });
  }

  const merged: Point[] = [];
  for (const point of points) {
    const last = merged[merged.length - 1];
    if (last && Math.hypot(point.x - last.x, point.y - last.y) < MERGE_TOLERANCE) continue;
    merged.push(point);
  }
  const first = merged[0];
  const last = merged[merged.length - 1];
  if (merged.length > 1 && Math.hypot(first.x - last.x, first.y - last.y) < MERGE_TOLERANCE) {
    merged.pop();
  }

  return merged.length >= 3 ? merged : null;
}

function formatClipPolygon(points: Point[]): string {
  return `polygon(${points.map((p) => `${round(p.x)}px ${round(p.y)}px`).join(', ')})`;
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

/** A box in the page's own, untransformed coordinates. */
export type LocalRect = { left: number; top: number; right: number; bottom: number };

/** How far inside its own edge a corner is tested, so a box that only touches
 *  the boundary is not decided by floating-point noise. */
const CONTAINMENT_INSET = 0.5;

/** How finely a tab is sampled across its length, and how much of it the fold
 *  has to show before the turning face takes the tab over. A single revealed
 *  sliver is not a tab; it reads as the tab having broken off. */
const REVEAL_SAMPLES = 5;
const REVEAL_SAMPLES_NEEDED = 4;

function polygonContainsPoint(polygon: Point[], point: Point): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i];
    const b = polygon[j];
    const straddles = a.y > point.y !== b.y > point.y;
    if (straddles && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * True when the fold's clip region shows any of the box.
 *
 * This is what decides which face of a turning sheet draws the sheet's tab.
 * The two faces hold the tab in different places once the paper moves, so the
 * hand-over has to happen at the first frame the turning face actually shows
 * the tab — any later and the tab jumps further; any earlier, as when the
 * hand-over was tied to the start of the turn, and the fore edge is bare while
 * the fold is still a sliver in the corner.
 */
export function polygonRevealsRect(polygon: Point[], rect: LocalRect): boolean {
  const left = rect.left + CONTAINMENT_INSET;
  const right = rect.right - CONTAINMENT_INSET;
  const middle = (rect.top + rect.bottom) / 2;
  if (right <= left) return false;

  const top = rect.top + CONTAINMENT_INSET;
  const bottom = rect.bottom - CONTAINMENT_INSET;
  let shown = 0;
  for (let i = 0; i < REVEAL_SAMPLES; i++) {
    const x = left + ((right - left) * (i + 0.5)) / REVEAL_SAMPLES;
    const covered =
      polygonContainsPoint(polygon, { x, y: middle }) &&
      polygonContainsPoint(polygon, { x, y: top }) &&
      polygonContainsPoint(polygon, { x, y: bottom });
    if (covered) shown++;
    if (shown >= REVEAL_SAMPLES_NEEDED) return true;
  }
  return false;
}

/** True when the segment runs along one of the four sides of the page. */
function liesOnPageEdge(a: Point, b: Point, width: number, height: number): boolean {
  const vertical = Math.abs(a.x - b.x) < EDGE_TOLERANCE;
  if (vertical && (Math.abs(a.x) < EDGE_TOLERANCE || Math.abs(a.x - width) < EDGE_TOLERANCE)) {
    return true;
  }
  const horizontal = Math.abs(a.y - b.y) < EDGE_TOLERANCE;
  return horizontal && (Math.abs(a.y) < EDGE_TOLERANCE || Math.abs(a.y - height) < EDGE_TOLERANCE);
}

/**
 * Pushes the fore-edge corners of the library's fold polygon out by `overhang`,
 * so the strip of leaf that carries the tab is clipped with the page instead of
 * being cut off at the paper's edge. Returns `null` when the polygon does not
 * reach the fore edge — the fold has already passed the tab and there is
 * nothing to show — or when it is not a shape this can safely widen.
 */
export function widenFoldClip(
  clipPath: string,
  page: { width: number; height: number; overhang: number; foreEdge: ForeEdge },
): string | null {
  const { width, height, overhang, foreEdge } = page;
  if (!(width > 0) || !(height > 0) || !(overhang > 0)) return null;

  const points = parseClipPolygon(clipPath);
  if (!points) return null;

  // A polygon already reaching past the paper is one of ours; widening it twice
  // would walk the fore edge further out on every frame.
  for (const point of points) {
    if (point.x < -EDGE_TOLERANCE || point.x > width + EDGE_TOLERANCE) return null;
  }

  const fore = foreEdge === 'right' ? width : 0;
  const target = foreEdge === 'right' ? width + overhang : -overhang;

  let widenedAny = false;
  const widened = points.map((point, index) => {
    if (Math.abs(point.x - fore) > EDGE_TOLERANCE) return point;
    widenedAny = true;

    const previous = points[(index + points.length - 1) % points.length];
    const next = points[(index + 1) % points.length];
    // Where the crease is what meets the fore edge, the corner travels along
    // it; where two page edges meet, the corner just moves straight out.
    const alongCrease = !liesOnPageEdge(previous, point, width, height)
      ? previous
      : !liesOnPageEdge(point, next, width, height)
        ? next
        : null;

    const run = alongCrease ? point.x - alongCrease.x : 0;
    if (!alongCrease || Math.abs(run) < MERGE_TOLERANCE) return { x: target, y: point.y };

    const scale = (target - alongCrease.x) / run;
    return { x: target, y: alongCrease.y + (point.y - alongCrease.y) * scale };
  });

  return widenedAny ? formatClipPolygon(widened) : null;
}
