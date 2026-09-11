import { describe, expect, it } from 'vitest';
import { sections } from './book';
import { splitByHeight, type LeafMeasure } from './paginate';

const section = sections.find(
  (candidate): candidate is Extract<(typeof sections)[number], { kind: 'entries' }> =>
    candidate.kind === 'entries' && candidate.entries.length >= 4,
);
if (!section) throw new Error('fixture: no section with four or more entries');

/** Every entry the same height unless `tall` overrides it. */
function measure(
  overrides: Partial<LeafMeasure> & { heights?: Record<string, number> } = {},
): LeafMeasure {
  const { heights = {}, ...rest } = overrides;
  return {
    available: 100,
    gap: 0,
    header: () => 0,
    entry: (id) => heights[id] ?? 30,
    ...rest,
  };
}

describe('splitByHeight', () => {
  it('keeps every entry, in order, exactly once', () => {
    const leaves = splitByHeight(measure())(section);
    expect(leaves.flat().map((entry) => entry.id)).toEqual(
      section.entries.map((entry) => entry.id),
    );
  });

  it('puts only as many on a leaf as fit — here three of 30 in 100', () => {
    const leaves = splitByHeight(measure())(section);
    expect(leaves[0]).toHaveLength(3);
  });

  it('moves an entry that does not fit to the next leaf instead of squeezing it', () => {
    const [first, second, third] = section.entries;
    const leaves = splitByHeight(
      measure({ heights: { [first.id]: 40, [second.id]: 40, [third.id]: 40 } }),
    )(section);
    // 40 + 40 fits in 100; a third 40 would need 120, so it starts leaf two.
    expect(leaves[0].map((entry) => entry.id)).toEqual([first.id, second.id]);
    expect(leaves[1][0].id).toBe(third.id);
  });

  it('counts the heading and the gaps against the first leaf', () => {
    const leaves = splitByHeight(measure({ header: () => 40, gap: 5 }))(section);
    // Room is 100 - 5 kept back = 95: heading 40, then 5 + 30 = 75, then 5 + 30 = 110 — too much.
    expect(leaves[0]).toHaveLength(1);
  });

  it('gives an entry taller than a whole leaf a leaf of its own rather than dropping it', () => {
    const [first, second] = section.entries;
    const leaves = splitByHeight(measure({ heights: { [first.id]: 500 } }))(section);
    // It cannot sit under the heading, so the heading keeps the first leaf and
    // the tall entry takes the next one alone; the entry after it moves on.
    const holding = leaves.findIndex((leaf) => leaf.some((entry) => entry.id === first.id));
    expect(leaves[holding].map((entry) => entry.id)).toEqual([first.id]);
    expect(leaves[holding + 1][0].id).toBe(second.id);
  });

  it('leaves the heading alone on its leaf when not even one entry fits under it', () => {
    const leaves = splitByHeight(measure({ header: () => 90 }))(section);
    expect(leaves[0]).toEqual([]);
    expect(leaves[1].length).toBeGreaterThan(0);
  });
});
