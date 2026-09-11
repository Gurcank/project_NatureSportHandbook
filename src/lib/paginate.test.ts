import { describe, expect, it } from 'vitest';
import { sections } from './book';
import {
  buildLeaves,
  findLeafIndex,
  leafAnchor,
  sectionLeafIndexes,
  spreadStart,
} from './paginate';

const entrySections = sections.filter((section) => section.kind === 'entries');

describe('buildLeaves', () => {
  it('gives every section at least one leaf', () => {
    const leaves = buildLeaves(3);
    for (const section of sections) {
      const expected = section.kind === 'cover' ? 2 : 1;
      const found = leaves.filter((leaf) => leaf.sectionId === section.id);
      expect(found.length, `section ${section.id}`).toBeGreaterThanOrEqual(expected);
    }
  });

  it('places every entry on exactly one leaf', () => {
    for (const perLeaf of [2, 3]) {
      const leaves = buildLeaves(perLeaf);
      for (const section of entrySections) {
        const paged = leaves
          .filter((leaf) => leaf.kind === 'entries' && leaf.sectionId === section.id)
          .flatMap((leaf) => (leaf.kind === 'entries' ? leaf.entries : []));
        expect(paged.map((entry) => entry.id)).toEqual(section.entries.map((entry) => entry.id));
      }
    }
  });

  it('reserves a slot on the opening leaf for the section header', () => {
    const leaves = buildLeaves(3);
    const mammalLeaves = leaves.filter(
      (leaf) => leaf.kind === 'entries' && leaf.sectionId === 'mammals',
    );

    expect(mammalLeaves[0]).toMatchObject({ showHeader: true });
    expect(mammalLeaves[0].kind === 'entries' && mammalLeaves[0].entries).toHaveLength(2);
    expect(mammalLeaves[1]).toMatchObject({ showHeader: false });
    expect(mammalLeaves[1].kind === 'entries' && mammalLeaves[1].entries).toHaveLength(3);
  });

  it('always produces an even leaf count so no spread is half empty', () => {
    for (const perLeaf of [1, 2, 3, 4]) {
      expect(buildLeaves(perLeaf).length % 2).toBe(0);
    }
  });

  it('keeps a single-entry-per-leaf layout from losing entries', () => {
    const leaves = buildLeaves(1);
    const mammalEntries = leaves
      .filter((leaf) => leaf.kind === 'entries' && leaf.sectionId === 'mammals')
      .flatMap((leaf) => (leaf.kind === 'entries' ? leaf.entries : []));
    const section = entrySections.find((candidate) => candidate.id === 'mammals');
    expect(mammalEntries).toHaveLength(section?.entries.length ?? 0);
  });
});

describe('findLeafIndex', () => {
  it('resolves every leaf anchor back into the same section', () => {
    for (const perLeaf of [2, 3]) {
      const leaves = buildLeaves(perLeaf);
      for (const leaf of leaves) {
        if (leaf.kind === 'blank') continue;
        const resolved = leaves[findLeafIndex(leaves, leafAnchor(leaf))];
        expect(resolved.sectionId, `${leaf.key} @${perLeaf}`).toBe(leaf.sectionId);
      }
    }
  });

  // The two cover leaves share the `/` URL by design, so only mid-section
  // leaves — the ones that carry an entry hash — resolve to themselves exactly.
  it('resolves a mid-section leaf to that exact leaf', () => {
    for (const perLeaf of [2, 3]) {
      const leaves = buildLeaves(perLeaf);
      leaves.forEach((leaf, index) => {
        if (leaf.kind !== 'entries' || leaf.showHeader) return;
        expect(findLeafIndex(leaves, leafAnchor(leaf)), `${leaf.key} @${perLeaf}`).toBe(index);
      });
    }
  });

  it('finds the same entry regardless of how leaves were paginated', () => {
    const wide = buildLeaves(3);
    const narrow = buildLeaves(2);
    const anchor = { sectionId: 'mammals', entryId: 'mammals-panda' };

    const wideLeaf = wide[findLeafIndex(wide, anchor)];
    const narrowLeaf = narrow[findLeafIndex(narrow, anchor)];

    expect(wideLeaf.kind === 'entries' && wideLeaf.entries.some((e) => e.id === anchor.entryId));
    expect(
      narrowLeaf.kind === 'entries' && narrowLeaf.entries.some((e) => e.id === anchor.entryId),
    );
  });

  it('falls back to the section opener for an unknown entry id', () => {
    const leaves = buildLeaves(3);
    const index = findLeafIndex(leaves, { sectionId: 'birds', entryId: 'not-a-real-id' });
    expect(leaves[index].sectionId).toBe('birds');
  });

  it('falls back to the first leaf for an unknown section', () => {
    const leaves = buildLeaves(3);
    expect(findLeafIndex(leaves, { sectionId: 'nope' })).toBe(0);
  });
});

describe('spreadStart', () => {
  // The front board is shown alone, so the pages behind it pair up odd-first.
  it('snaps to the odd leaf that opens the spread', () => {
    expect(spreadStart(0)).toBe(0);
    expect(spreadStart(1)).toBe(1);
    expect(spreadStart(2)).toBe(1);
    expect(spreadStart(3)).toBe(3);
    expect(spreadStart(8)).toBe(7);
  });
});

describe('the binding', () => {
  it('puts a board at each end', () => {
    const leaves = buildLeaves(3);
    expect(leaves[0]).toMatchObject({ kind: 'cover', face: 'front' });
    expect(leaves[leaves.length - 1]).toMatchObject({ kind: 'cover', face: 'back' });
  });

  it('leaves an even number of pages between the boards, so neither is paired', () => {
    for (const perLeaf of [1, 2, 3, 4]) {
      expect((buildLeaves(perLeaf).length - 2) % 2).toBe(0);
    }
  });

  it('opens the book shut: / resolves to the front board', () => {
    const leaves = buildLeaves(3);
    expect(findLeafIndex(leaves, { sectionId: 'home' })).toBe(0);
  });
});

describe('sectionLeafIndexes', () => {
  it('points every section at the first leaf that carries it', () => {
    const leaves = buildLeaves(3);
    const starts = sectionLeafIndexes(leaves);

    for (const [sectionId, index] of starts) {
      expect(leaves[index].sectionId, sectionId).toBe(sectionId);
      expect(leaves.findIndex((leaf) => leaf.sectionId === sectionId)).toBe(index);
    }
  });
});
