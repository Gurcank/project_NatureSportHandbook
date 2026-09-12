import type { Localized, SpeciesEntry } from '@/types';
import type { Chapter, Section } from './book';
import { chapters, sectionById, sections } from './book';
import { creditCount } from './images';

/**
 * Attribution is a licence condition, not decoration, so the credits run over
 * as many leaves as they need rather than being clipped to one — but they are
 * set two columns to a page and packed tight, because a credit list that
 * wanders over dozens of half-empty leaves is a worse read than a dense one.
 * The opening leaf gives up room to the heading.
 */
const CREDITS_PER_LEAF = 28;
const CREDITS_FIRST_LEAF = 26;

export type Leaf =
  /** The leather boards. They carry a section id so `/` and Home open the book shut. */
  | { kind: 'cover'; key: string; sectionId: string; face: 'front' | 'back' }
  | { kind: 'chapter'; key: string; sectionId: 'home'; chapter: Chapter }
  | {
      kind: 'opener';
      key: string;
      sectionId: string;
      section: Extract<Section, { kind: 'opener' }>;
    }
  | {
      kind: 'entries';
      key: string;
      sectionId: string;
      section: Extract<Section, { kind: 'entries' }>;
      /** Only the section's first leaf carries the title and intro. */
      showHeader: boolean;
      entries: SpeciesEntry[];
    }
  | {
      kind: 'credits';
      key: string;
      sectionId: 'credits';
      page: number;
      /** The slice of the sorted list this leaf sets. */
      start: number;
      count: number;
    }
  /**
   * The paste-down glued to the inside of a board. A case binding is made by
   * covering stiff boards in leather and turning the leather over their edges,
   * so the inside of a board is plain paper with a border of the same hide.
   */
  | { kind: 'endpaper'; key: string; sectionId: string; face: 'front' | 'back' }
  /** The half-title: the book's name on its own, facing the front paste-down. */
  | { kind: 'title'; key: string; sectionId: 'home' }
  | { kind: 'blank'; key: string; sectionId: string };

/** Where a leaf lives in the URL: the section path, plus a hash when it is mid-section. */
export type LeafAnchor = { sectionId: string; entryId?: string };

type EntriesSection = Extract<Section, { kind: 'entries' }>;

/** How a section's entries are dealt out over leaves: one array per leaf. */
type EntrySplit = (section: EntriesSection) => SpeciesEntry[][];

/**
 * A fixed number to a leaf, the opening leaf one fewer for its heading. This is
 * what the server renders, before any leaf can be measured, and what the tests
 * pin; the book replaces it with `splitByHeight` as soon as it has a leaf to
 * measure against.
 */
function splitEvenly(perLeaf: number): EntrySplit {
  return (section) => {
    const leaves: SpeciesEntry[][] = [];
    let cursor = 0;
    while (cursor < section.entries.length) {
      const capacity = leaves.length === 0 ? Math.max(1, perLeaf - 1) : perLeaf;
      leaves.push(section.entries.slice(cursor, cursor + capacity));
      cursor += capacity;
    }
    // A section with no entries still needs a leaf, or its tab links nowhere.
    return leaves.length === 0 ? [[]] : leaves;
  };
}

/** Heights of what goes on an entries leaf, in pixels of the leaf they were measured in. */
export type LeafMeasure = {
  /** The height a leaf has for its contents. */
  available: number;
  /** The space between two blocks on a leaf. */
  gap: number;
  /** A section's heading and intro note, which open its first leaf. */
  header: (sectionId: string) => number;
  entry: (entryId: string) => number;
};

/**
 * Deals entries onto leaves by height. A leaf takes entries while the next one
 * still fits; one that does not starts the next leaf rather than being squeezed
 * or cut, so leaves hold as many entries as their contents allow — one, two,
 * four — and whatever is left over is bare paper. An entry taller than a whole
 * leaf still gets a leaf of its own: it cannot be split.
 *
 * The room before the leaf's closing sketch is kept back, so a leaf that is
 * exactly full does not push its last line under the bottom edge.
 */
export function splitByHeight(measure: LeafMeasure): EntrySplit {
  return (section) => {
    const available = measure.available - measure.gap;
    const leaves: SpeciesEntry[][] = [];
    let current: SpeciesEntry[] = [];
    let used = measure.header(section.id);
    let leafHasContent = true;

    for (const entry of section.entries) {
      const height = measure.entry(entry.id);
      if (leafHasContent && used + measure.gap + height > available) {
        leaves.push(current);
        current = [];
        used = 0;
        leafHasContent = false;
      }
      used += (leafHasContent ? measure.gap : 0) + height;
      current.push(entry);
      leafHasContent = true;
    }

    leaves.push(current);
    return leaves;
  };
}

/**
 * Leaf capacity depends on the leaf's size and on the language, so leaf
 * indices are not stable and must never appear in a URL. `leafAnchor` /
 * `findLeafIndex` translate between an index and the stable (section, entry)
 * pair instead.
 */
export function buildLeaves(layout: number | EntrySplit): Leaf[] {
  const split = typeof layout === 'number' ? splitEvenly(layout) : layout;
  const pages: Leaf[] = [];

  for (const section of sections) {
    switch (section.kind) {
      case 'cover':
        for (const chapter of chapters) {
          pages.push({ kind: 'chapter', key: `home-${chapter.id}`, sectionId: 'home', chapter });
        }
        break;

      case 'opener':
        pages.push({ kind: 'opener', key: section.id, sectionId: section.id, section });
        break;

      case 'entries':
        split(section).forEach((entries, leafNumber) => {
          pages.push({
            kind: 'entries',
            key: `${section.id}-${leafNumber}`,
            sectionId: section.id,
            section,
            showHeader: leafNumber === 0,
            entries,
          });
        });
        break;

      case 'credits': {
        const total = creditCount();
        let cursor = 0;
        let page = 0;

        do {
          const count = Math.min(
            page === 0 ? CREDITS_FIRST_LEAF : CREDITS_PER_LEAF,
            total - cursor,
          );
          pages.push({
            kind: 'credits',
            key: `credits-${page}`,
            sectionId: 'credits',
            page,
            start: cursor,
            count: Math.max(0, count),
          });
          cursor += count;
          page += 1;
          // An empty run still needs one leaf, or the credits tab links nowhere.
        } while (cursor < total);
        break;
      }
    }
  }

  // Between the two boards the leaves run in spreads. The two paste-downs and
  // the title leaf are three of them, so the run is even only when the content
  // count is odd — a blank makes up the difference, and lands where a blank
  // belongs in a book: after the last credit, facing the back paste-down.
  if (pages.length % 2 === 0) {
    pages.push({ kind: 'blank', key: 'blank-end', sectionId: 'credits' });
  }

  return [
    { kind: 'cover', key: 'cover-front', sectionId: 'home', face: 'front' },
    { kind: 'endpaper', key: 'endpaper-front', sectionId: 'home', face: 'front' },
    { kind: 'title', key: 'title', sectionId: 'home' },
    ...pages,
    { kind: 'endpaper', key: 'endpaper-back', sectionId: 'credits', face: 'back' },
    { kind: 'cover', key: 'cover-back', sectionId: 'credits', face: 'back' },
  ];
}

/**
 * Tiers, outermost first: the book's two halves, the categories inside them,
 * and the groups inside those. A tab's tier is its width and its colour.
 */
type RailTier = 'chapter' | 'category' | 'sub';

const HOME_LABEL: Localized = { tr: 'Ana Sayfa', en: 'Home' };

/**
 * One tab, stuck to one leaf.
 *
 * A tab belongs to a page, not to a run of pages: the Cnidarians tab is on the
 * leaf the Cnidarians heading is written on, and turning past that leaf buries
 * it with its page. That is why this is keyed by leaf index rather than by
 * section — a section can run over twenty leaves, and a tab stuck to twenty
 * leaves at once is not a tab.
 */
export type RailTab = {
  leafIndex: number;
  sectionId: string;
  label: Localized;
  tier: RailTier;
  /**
   * The leaves that draw this tab. A tab is stuck to a *sheet*, so both faces
   * of that sheet carry it — the page it opens and the back of that page — and
   * whichever is face up shows it in the same place. A board draws no tab, so a
   * sheet backed by one has a single face.
   */
  faces: number[];
};

export function buildRailTabs(leaves: Leaf[]): RailTab[] {
  const tabs: Omit<RailTab, 'faces'>[] = [];

  leaves.forEach((leaf, leafIndex) => {
    switch (leaf.kind) {
      case 'chapter':
        // Both chapter leaves are the same opening spread, so one tab covers
        // them, stuck to the first and named for what it opens: the front of
        // the book.
        if (leaf.chapter.id === 'nature') {
          tabs.push({ leafIndex, sectionId: leaf.sectionId, label: HOME_LABEL, tier: 'chapter' });
        }
        break;
      case 'opener':
        tabs.push({
          leafIndex,
          sectionId: leaf.sectionId,
          label: leaf.section.shortTitle ?? leaf.section.title,
          tier: 'category',
        });
        break;
      case 'entries':
        if (leaf.showHeader) {
          tabs.push({
            leafIndex,
            sectionId: leaf.sectionId,
            label: leaf.section.shortTitle ?? leaf.section.title,
            tier: 'sub',
          });
        }
        break;
      case 'credits': {
        const section = leaf.page === 0 ? sectionById('credits') : undefined;
        if (section && section.kind === 'credits') {
          tabs.push({
            leafIndex,
            sectionId: leaf.sectionId,
            label: section.shortTitle ?? section.title,
            tier: 'category',
          });
        }
        break;
      }
    }
  });

  return tabs.map((tab) => {
    const back = leaves[sheetPartner(tab.leafIndex)];
    return {
      ...tab,
      faces:
        back && back.kind !== 'cover'
          ? [tab.leafIndex, sheetPartner(tab.leafIndex)]
          : [tab.leafIndex],
    };
  });
}

/**
 * The other face of the same sheet. The front board stands alone, so the leaves
 * behind it pair up front-then-back: leaf 2 is the front of a sheet and leaf 3
 * its back.
 */
export function sheetPartner(leafIndex: number): number {
  return leafIndex % 2 === 0 ? leafIndex + 1 : leafIndex - 1;
}

/**
 * Which face of the sheet is drawing the tab. The front is the page the tab
 * opens, and it shows the whole tab — the body glued to the paper and the point
 * hanging off the edge. The back shows only the point, because that is all
 * there is to see of a tab from the other side of the sheet.
 */
type TabFace = 'front' | 'back';

export type PlacedRailTab = RailTab & { slot: number; total: number; face: TabFace };

/**
 * Tabs by the leaf that draws them. Every face of a tab's sheet gets a copy, so
 * whichever one is up — including the one the flip library swings across during
 * a turn — shows the tab in the same place, and it travels with the paper
 * instead of jumping from one edge to the other.
 */
export function railTabsByLeaf(tabs: RailTab[]): Map<number, PlacedRailTab[]> {
  const byLeaf = new Map<number, PlacedRailTab[]>();

  tabs.forEach((tab, slot) => {
    for (const leafIndex of tab.faces) {
      const placed: PlacedRailTab = {
        ...tab,
        slot,
        total: tabs.length,
        face: leafIndex === tab.leafIndex ? 'front' : 'back',
      };
      const drawn = byLeaf.get(leafIndex);
      if (drawn) drawn.push(placed);
      else byLeaf.set(leafIndex, [placed]);
    }
  });

  return byLeaf;
}

export function leafAnchor(leaf: Leaf): LeafAnchor {
  if (leaf.kind === 'entries' && !leaf.showHeader) {
    return { sectionId: leaf.sectionId, entryId: leaf.entries[0]?.id };
  }
  return { sectionId: leaf.sectionId };
}

export function findLeafIndex(leaves: Leaf[], anchor: LeafAnchor): number {
  if (anchor.entryId) {
    const withEntry = leaves.findIndex(
      (leaf) =>
        leaf.kind === 'entries' && leaf.entries.some((entry) => entry.id === anchor.entryId),
    );
    if (withEntry !== -1) return withEntry;
  }

  const bySection = leaves.findIndex((leaf) => leaf.sectionId === anchor.sectionId);
  return bySection === -1 ? 0 : bySection;
}

/**
 * Where each section starts, which is both where a thumb tab jumps to and how
 * the rail decides whether a section is behind the reader or still ahead.
 */
export function sectionLeafIndexes(leaves: Leaf[]): Map<string, number> {
  const starts = new Map<string, number>();
  leaves.forEach((leaf, index) => {
    if (!starts.has(leaf.sectionId)) starts.set(leaf.sectionId, index);
  });
  return starts;
}

/**
 * The leaf pair shown together on wide screens. The front board is displayed on
 * its own, so the pages behind it pair up odd-first: 0 alone, then (1,2),
 * (3,4), and — because the page count between the boards is even — the back
 * board ends up alone as well.
 */
export function spreadStart(leafIndex: number): number {
  if (leafIndex <= 0) return 0;
  return leafIndex - ((leafIndex - 1) % 2);
}
