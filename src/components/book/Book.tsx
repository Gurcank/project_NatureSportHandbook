'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useSettings } from '@/context/SettingsContext';
import { HOME_TITLE, sectionById, sectionBySlug, sectionTitle } from '@/lib/book';
import {
  buildLeaves,
  buildRailTabs,
  findLeafIndex,
  railTabsByLeaf,
  splitByHeight,
  spreadStart,
  type Leaf,
  type LeafAnchor,
  type LeafMeasure,
} from '@/lib/paginate';
import { useIsSpread, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { useStage } from '@/components/scene/Stage';
import BookLeaf from './BookLeaf';
import TabRail from './TabRail';
import { BookNavProvider } from './BookNav';
import LeafMeasurer from './LeafMeasurer';
import { useTurningSheaf } from './useTurningSheaf';
import { useTurningTabs } from './useTurningTabs';
import { NearWindowProvider } from './NearWindow';

/**
 * What the server renders and the first client paint matches: a fixed number
 * of entries to a leaf. As soon as the book has a leaf to measure against it
 * re-deals every section by height (see `splitByHeight`), so a leaf holds only
 * the entries that genuinely fit it at this size and in this language.
 */
const ENTRIES_PER_LEAF = 3;
const INITIAL_LEAVES = buildLeaves(ENTRIES_PER_LEAF);

/** Intrinsic page proportions handed to the library; `size="stretch"` scales them. */
const PAGE_WIDTH = 520;
const PAGE_HEIGHT = 730;
const MIN_PAGE_WIDTH = 260;
const MAX_PAGE_WIDTH = 760;

const FLIP_MS = 780;

/**
 * A jump turns once, exactly like turning a single page. What changes with the
 * distance is the thickness of what turned: the wad hung on the fore edge of the
 * turning sheet grows with the number of spreads crossed, so skipping thirty
 * pages looks like a fistful of paper going over rather than one leaf. The
 * scale is steep on purpose — a wad a few pixels thick reads as a drawn line,
 * not as paper.
 */
const SHEAF_MAX_SHEETS = 18;
const SHEAF_SPREADS_PER_SHEET = 2;
/** How thick one sheet of the wad is drawn. */
const SHEAF_SHEET_PX = 2.4;

/** Which spread a leaf belongs to. The front board is a spread of its own. */
function spreadNumber(leafIndex: number): number {
  return leafIndex <= 0 ? 0 : Math.floor((leafIndex - 1) / 2) + 1;
}

type PageFlipController = {
  flipNext: () => void;
  flipPrev: () => void;
  /** Sets the internal position beside the target and animates one turn onto it. */
  flip: (page: number) => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
  /** The library's live settings object, not a copy. See `turnPage`. */
  getSettings: () => { disableFlipByClick: boolean };
};

/**
 * Turns one page, working around a bug in page-flip.
 *
 * Its `flipPrev` builds a synthetic press at x = 10 in page space and then
 * converts that to book space by subtracting the book's left offset. On a
 * centred book the result is negative, fails the library's own corner test,
 * and — because `disableFlipByClick` is on — the turn is dropped without a
 * word. Backwards paging simply did nothing while the app believed it had
 * happened. Click-to-flip stays off for the reader; the guard is lifted only
 * around a turn this component asked for, and the setting is read
 * synchronously at the top of the call, so the window is one statement wide.
 */
function turnPage(controller: PageFlipController, move: 'next' | 'prev' | number) {
  const settings = controller.getSettings();
  const guarded = settings?.disableFlipByClick === true;
  if (guarded) settings.disableFlipByClick = false;
  try {
    if (move === 'next') controller.flipNext();
    else if (move === 'prev') controller.flipPrev();
    else controller.flip(move);
  } finally {
    if (guarded) settings.disableFlipByClick = true;
  }
}

type FlipBookRef = { pageFlip: () => PageFlipController | undefined };

function anchorFromLocation(): LeafAnchor | null {
  const section = sectionBySlug(window.location.pathname.replace(/\/+$/, '') || '/');
  if (!section) return null;
  const entryId = window.location.hash.slice(1);
  return { sectionId: section.id, entryId: entryId || undefined };
}

/**
 * Where the reader is, in terms that survive the book being re-dealt: the
 * first entry on the leaf when it has one, otherwise the leaf's own key —
 * every leaf that is not a run of entries (the boards, the title, a chapter,
 * a credits page) keeps its key however the entries are dealt.
 */
type ReadingPlace = { entry: LeafAnchor } | { key: string };

function placeOf(leaf: Leaf | undefined): ReadingPlace | null {
  if (!leaf) return null;
  if (leaf.kind === 'entries' && leaf.entries[0]) {
    return { entry: { sectionId: leaf.sectionId, entryId: leaf.entries[0].id } };
  }
  return { key: leaf.key };
}

function findPlace(leaves: Leaf[], place: ReadingPlace): number {
  if ('entry' in place) return findLeafIndex(leaves, place.entry);
  const index = leaves.findIndex((leaf) => leaf.key === place.key);
  return index < 0 ? 0 : index;
}

/** Enough to tell whether a re-deal changed anything the library would redraw. */
function signatureOf(leaves: Leaf[]): string {
  return leaves
    .map((leaf) => (leaf.kind === 'entries' ? `${leaf.key}:${leaf.entries.length}` : leaf.key))
    .join('|');
}

export default function Book({
  initialSectionId,
  initialEntryId,
}: {
  initialSectionId: string;
  initialEntryId?: string;
}) {
  const { language } = useSettings();
  const isSpread = useIsSpread();
  const reducedMotion = usePrefersReducedMotion();
  const stage = useStage();
  const isLeanedIn = stage?.isLeanedIn ?? false;
  const sitBack = stage?.sitBack;

  const bookRef = useRef<FlipBookRef>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overhangRef = useRef<HTMLSpanElement>(null);

  const [leaves, setLeaves] = useState<Leaf[]>(INITIAL_LEAVES);
  const leavesRef = useRef(leaves);
  const lastLeaf = leaves.length - 1;

  const [currentPage, setCurrentPage] = useState(0);
  const currentPageRef = useRef(currentPage);
  const [isReady, setIsReady] = useState(false);
  const isReadyRef = useRef(false);

  // Kept in step for the callbacks page-flip and the measurer call back into,
  // which must see the leaves and the page as they are, not as they were bound.
  useLayoutEffect(() => {
    leavesRef.current = leaves;
    currentPageRef.current = currentPage;
  }, [leaves, currentPage]);

  /** How many sheets thick the wad going over is, or null when none is. */
  const [sheafSheets, setSheafSheets] = useState<number | null>(null);
  /**
   * Where the reader was when a jump started. A jump moves the position at
   * once but the paper takes a turn to follow, so the leaf being left has to
   * keep its contents until that turn lands — otherwise it empties under the
   * reader's eyes while it is still the page on screen.
   */
  const [leavingPage, setLeavingPage] = useState<number | null>(null);
  /**
   * Whether paper is moving. The case only closes around a board once the turn
   * has landed: narrowing it the moment a turn starts pulls the leather out
   * from behind the pages the reader is still looking at.
   */
  const [isTurning, setIsTurning] = useState(false);

  /** The book's own box, reported by its ResizeObserver; the measurer is cut to one page of it. */
  const [fitSize, setFitSize] = useState<{ width: number; height: number } | null>(null);
  /** The page to return the reader to once the library has taken a re-deal. */
  const pendingPlaceRef = useRef<ReadingPlace | null>(null);

  const railTabs = useMemo(() => buildRailTabs(leaves), [leaves]);
  /**
   * On a phone only the two chapters, the categories and the credits are
   * shown, because thirty-two tabs down the edge of a 375px screen are both
   * unreadable and wider than the book they index.
   */
  const compactRailTabs = useMemo(() => railTabs.filter((tab) => tab.tier !== 'sub'), [railTabs]);
  /**
   * The same tabs by leaf, for the copy each page carries itself. Built from
   * the list the rail is actually showing: a page placing its tab by its slot
   * in the full list lands on a different line than the compact rail uses, on
   * top of another tab, and a sub-section tab the phone rail leaves out would
   * still appear on its page.
   */
  const tabsByLeaf = useMemo(
    () => railTabsByLeaf(isSpread ? railTabs : compactRailTabs),
    [isSpread, railTabs, compactRailTabs],
  );

  /** Both boards are shown on their own; everything between them comes in pairs. */
  const isBoard = useCallback(
    (leafIndex: number) => leafIndex === 0 || leafIndex === lastLeaf,
    [lastLeaf],
  );

  const flippingTime = reducedMotion ? 1 : FLIP_MS;

  // Starting a flip before the last one settles leaves StPageFlip with two
  // pages stacked on each other, so input is ignored for the flip's duration.
  const isFlippingRef = useRef(false);
  /**
   * The reading position is tracked here rather than taken from `onFlip`.
   * page-flip reports an index that trails its own rendering by a spread, and
   * `getCurrentPageIndex()` is no better straight after a flip — trusting
   * either leaves the tabs, the URL and the near-window a spread behind what
   * is on the page. Every flip this component starts therefore sets the
   * position itself, and the library's own events are ignored until the
   * animation has finished.
   */
  const suppressFlipEventsUntilRef = useRef(0);
  /** Clears the jump's own lock, so a second jump can cut the first one short. */
  const jumpEndRef = useRef<number | null>(null);

  // ------------------------------------------------------------ pagination

  // The measurer is cut to one page of the book, so it needs the book's size,
  // and it measures again whenever that size changes.
  useEffect(() => {
    const fit = fitRef.current;
    if (!fit) return;
    const observer = new ResizeObserver(() => {
      setFitSize({ width: fit.offsetWidth, height: fit.offsetHeight });
    });
    observer.observe(fit);
    return () => observer.disconnect();
  }, []);

  /**
   * The measurer has read every entry at the current leaf size: deal the book
   * again. Nothing is redrawn when the deal comes out the same. A new deal
   * remounts the library (see `dealKey`), so once it is showing a page the
   * reader's place is kept for `handleReady` to return them to — the page
   * holding what they were reading, not whatever now has the same index.
   */
  const handleMeasure = useCallback((measure: LeafMeasure) => {
    const next = buildLeaves(splitByHeight(measure));
    if (signatureOf(next) === signatureOf(leavesRef.current)) return;
    if (isReadyRef.current) {
      pendingPlaceRef.current = placeOf(leavesRef.current[currentPageRef.current]);
      // The library being replaced drops any turn asked of it from here on.
      isReadyRef.current = false;
    }
    setLeaves(next);
  }, []);

  /**
   * page-flip takes its leaves over into its own DOM, so React cannot add or
   * remove one under it: a deal that changes the leaves mounts a fresh library.
   */
  const dealKey = useMemo(() => signatureOf(leaves), [leaves]);

  // ------------------------------------------------------------ turning

  const runFlip = useCallback(
    (direction: 'next' | 'prev') => {
      if (isFlippingRef.current) return;
      const controller = bookRef.current?.pageFlip();
      if (!controller) return;

      const from = isSpread ? spreadStart(currentPage) : currentPage;
      let target: number;
      if (!isSpread) {
        target = from + (direction === 'next' ? 1 : -1);
      } else if (direction === 'next') {
        // Leaving the front board opens onto a single spread, not two pages on.
        target = from === 0 ? 1 : from + 2;
      } else {
        target = from <= 1 ? 0 : from - 2;
      }
      if (target < 0 || target > lastLeaf) return;

      isFlippingRef.current = true;
      setIsTurning(true);
      suppressFlipEventsUntilRef.current = Date.now() + flippingTime + 150;
      turnPage(controller, direction);
      setCurrentPage(target);

      window.setTimeout(() => {
        isFlippingRef.current = false;
        setIsTurning(false);
      }, flippingTime + 60);
    },
    [currentPage, flippingTime, isSpread, lastLeaf],
  );

  const flipNext = useCallback(() => runFlip('next'), [runFlip]);
  const flipPrev = useCallback(() => runFlip('prev'), [runFlip]);

  /**
   * One address per section. A section runs over as many as twenty leaves and
   * the address stays put across all of them: it names what you are reading,
   * not which sheet of it is face up.
   */
  const urlSectionRef = useRef<string | null>(null);
  const writeUrl = useCallback((sectionId: string, mode: 'push' | 'replace') => {
    if (urlSectionRef.current === sectionId) return;
    urlSectionRef.current = sectionId;
    const slug = sectionById(sectionId)?.slug ?? '/';
    if (mode === 'push') window.history.pushState(null, '', slug);
    else window.history.replaceState(null, '', slug);
  }, []);

  // The library is only genuinely mounted once `onInit` has fired; a
  // `turnToPage` before that is silently dropped, so the deep link — or, after
  // a re-deal, the reader's place — is applied here rather than on mount,
  // against the leaves as they are by then.
  const handleReady = useCallback(() => {
    isReadyRef.current = true;
    setIsReady(true);
    const place = pendingPlaceRef.current;
    pendingPlaceRef.current = null;
    const target = place
      ? findPlace(leavesRef.current, place)
      : findLeafIndex(leavesRef.current, { sectionId: initialSectionId, entryId: initialEntryId });
    suppressFlipEventsUntilRef.current = Date.now() + 150;
    if (target > 0) bookRef.current?.pageFlip()?.turnToPage(target);
    setCurrentPage(target);
  }, [initialSectionId, initialEntryId]);

  const base = isSpread ? spreadStart(currentPage) : currentPage;
  const facingIndex = isSpread && !isBoard(base) ? base + 1 : -1;

  /**
   * What the spread is *about*. When the right-hand leaf opens a new section
   * the left one is only the tail of the last, so the reader has arrived at
   * the new section — naming the old one would put the wrong address and the
   * wrong tab title on screen for the whole spread.
   */
  const opensOnFacingLeaf = railTabs.some((tab) => tab.leafIndex === facingIndex);
  const currentSectionId =
    facingIndex >= 0 && opensOnFacingLeaf
      ? leaves[facingIndex].sectionId
      : (leaves[base]?.sectionId ?? 'home');

  // Both ends of a jump stay filled until the turn lands, so the page being
  // turned away from is still a page while the reader can see it.
  const nearAnchors = useMemo(
    () => (leavingPage === null ? [currentPage] : [leavingPage, currentPage]),
    [currentPage, leavingPage],
  );

  useTurningTabs(frameRef, overhangRef);
  useTurningSheaf(frameRef, sheafSheets !== null);

  /**
   * Shut is a resting state, not a turning one. While a board is still swinging
   * the book is open underneath it; only once the turn lands does the book
   * count as shut, which is what brings the tab rails in against the board.
   */
  const shutTo = !isTurning && isBoard(currentPage) ? (currentPage === 0 ? 'front' : 'back') : null;

  // Replace rather than push: turning pages is reading, not navigating, so it
  // must not fill the back button with one entry per section passed through.
  useEffect(() => {
    if (!isReady) return;
    writeUrl(currentSectionId, 'replace');
  }, [currentSectionId, isReady, writeUrl]);

  // The tab title travels with the reader; without this it would keep whatever
  // the server rendered for the entry URL for the whole visit.
  useEffect(() => {
    const section = sectionById(currentSectionId);
    document.title =
      !section || section.kind === 'cover'
        ? HOME_TITLE[language]
        : `${sectionTitle(section)[language]} · ${HOME_TITLE[language]}`;
  }, [currentSectionId, language]);

  /**
   * A jump turns once, whatever the distance — the same animation as turning a
   * single page. The pages in between are not drawn one by one; what carries
   * the distance instead is the sheaf, whose thickness grows with the number of
   * spreads crossed.
   */
  const goToLeaf = useCallback(
    (target: number) => {
      const controller = bookRef.current?.pageFlip();
      if (!controller) return;

      const from = isSpread ? spreadStart(currentPage) : currentPage;
      const steps = isSpread
        ? Math.abs(spreadNumber(target) - spreadNumber(from))
        : Math.abs(target - from);
      if (steps === 0) return;

      setLeavingPage(from);
      setCurrentPage(target);
      // Turning to somewhere else is done sitting back up.
      sitBack?.();
      writeUrl(leavesRef.current[target]?.sectionId ?? 'home', 'push');

      if (reducedMotion) {
        controller.turnToPage(target);
        setLeavingPage(null);
        return;
      }

      isFlippingRef.current = true;
      setIsTurning(true);
      suppressFlipEventsUntilRef.current = Date.now() + flippingTime + 150;

      if (steps > 1) {
        setSheafSheets(Math.min(SHEAF_MAX_SHEETS, 2 + Math.round(steps / SHEAF_SPREADS_PER_SHEET)));
      }

      // One spread away is an ordinary turn; anything further goes through
      // flip(), which sets the library's position beside the target and then
      // animates that same single turn onto it.
      turnPage(controller, steps === 1 ? (target > from ? 'next' : 'prev') : target);

      window.clearTimeout(jumpEndRef.current ?? undefined);
      jumpEndRef.current = window.setTimeout(() => {
        isFlippingRef.current = false;
        setIsTurning(false);
        setSheafSheets(null);
        setLeavingPage(null);
      }, flippingTime + 60);
    },
    [currentPage, flippingTime, isSpread, reducedMotion, sitBack, writeUrl],
  );

  const goToSection = useCallback(
    (sectionId: string) => goToLeaf(findLeafIndex(leavesRef.current, { sectionId })),
    [goToLeaf],
  );

  // A timer left running past unmount would set state on a dead component.
  useEffect(() => () => window.clearTimeout(jumpEndRef.current ?? undefined), []);

  // Browser back/forward walks the sections the reader jumped to.
  useEffect(() => {
    const onPopState = () => {
      const anchor = anchorFromLocation();
      if (!anchor) return;
      const target = findLeafIndex(leavesRef.current, anchor);
      urlSectionRef.current = leavesRef.current[target]?.sectionId ?? anchor.sectionId;
      suppressFlipEventsUntilRef.current = Date.now() + flippingTime + 150;
      bookRef.current?.pageFlip()?.turnToPage(target);
      setCurrentPage(target);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [flippingTime]);

  // The library ships no keyboard support of its own.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;

      // Leaning in is a look, not a place: anything that moves the book sits
      // the reader back up first rather than turning pages from six inches away.
      if (isLeanedIn) {
        if (event.key === 'Escape' || event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          sitBack?.();
        }
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        flipNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        flipPrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [flipNext, flipPrev, isLeanedIn, sitBack]);

  // react-pageflip rebuilds its whole DOM whenever this array's reference
  // changes, and a rebuild mid-flip swallows the flip. It therefore must not
  // depend on the reading position — leaves pick that up from context instead.
  const pages = useMemo(
    () =>
      leaves.map((leaf, index) => (
        <div
          key={leaf.key}
          className="overflow-hidden"
          data-density={leaf.kind === 'cover' ? 'hard' : 'soft'}
        >
          <BookLeaf leaf={leaf} index={index} language={language} tabs={tabsByLeaf.get(index)} />
        </div>
      )),
    [language, leaves, tabsByLeaf],
  );

  // One page's box, in the pixels the library lays leaves out in.
  const pageBox = fitSize
    ? { width: isSpread ? fitSize.width / 2 : fitSize.width, height: fitSize.height }
    : null;

  return (
    <BookNavProvider value={{ goToSection, goToLeaf, currentSectionId }}>
      <NearWindowProvider value={nearAnchors}>
        <div
          ref={fitRef}
          className={`book-fit relative mx-auto ${
            shutTo ? `is-shut ${isSpread ? `is-shut--${shutTo}` : ''}` : ''
          }`}
          style={
            {
              // Read by the turning sheet's own wad; zero except during a jump.
              '--sheaf-width': `${(sheafSheets ?? 0) * SHEAF_SHEET_PX}px`,
            } as CSSProperties
          }
        >
          {/* Measured rather than parsed: `--tab-overhang` is a calc, and the
              fold has to be re-cut in the same pixels the library works in. */}
          <span ref={overhangRef} aria-hidden="true" className="tab-overhang-probe" />

          {/* Every heading and entry drawn once, invisibly, on a leaf of the real
              size, to learn how tall each is before dealing them onto leaves. */}
          {pageBox ? (
            <LeafMeasurer
              width={pageBox.width}
              height={pageBox.height}
              language={language}
              onMeasure={handleMeasure}
            />
          ) : null}

          <div ref={frameRef} className="book-frame absolute inset-0">
            <HTMLFlipBook
              ref={bookRef}
              key={`${reducedMotion ? 'reduced' : 'full'}|${dealKey}`}
              className=""
              style={{}}
              // The library's types demand the whole settings object; everything
              // not commented below simply restates its own runtime defaults.
              startPage={0}
              startZIndex={0}
              autoSize
              useMouseEvents
              swipeDistance={30}
              // Off: the corner-curl preview lifts the neighbouring sheet as
              // soon as the pointer crosses a leaf's top corner, which is
              // exactly where the top entry's photograph sits, and a press
              // made while it is up can land as a turn. Dragging a corner
              // still turns the page.
              showPageCorners={false}
              // Pages carry links; a click that both follows a link and turns
              // the page is worse than losing click-to-flip. Drag, the tabs
              // and the keyboard remain.
              disableFlipByClick
              clickEventForward
              size="stretch"
              width={PAGE_WIDTH}
              height={PAGE_HEIGHT}
              minWidth={MIN_PAGE_WIDTH}
              maxWidth={MAX_PAGE_WIDTH}
              minHeight={Math.round((MIN_PAGE_WIDTH * PAGE_HEIGHT) / PAGE_WIDTH)}
              maxHeight={Math.round((MAX_PAGE_WIDTH * PAGE_HEIGHT) / PAGE_WIDTH)}
              // The first and last leaves are the leather boards, shown on
              // their own the way a shut book presents its cover.
              showCover
              usePortrait
              mobileScrollSupport
              // With `true` the library never re-reads its children after mount,
              // which freezes the near-window and leaves distant leaves blank.
              renderOnlyPageLengthChange={false}
              maxShadowOpacity={0.28}
              flippingTime={flippingTime}
              drawShadow={!reducedMotion}
              // Only a drag-flip reaches this: everything else sets the
              // position itself and suppresses the event that follows.
              onFlip={(event: { data: number }) => {
                if (Date.now() < suppressFlipEventsUntilRef.current) return;
                setCurrentPage(event.data);
              }}
              onInit={handleReady}
            >
              {pages}
            </HTMLFlipBook>
          </div>

          <TabRail
            language={language}
            isSpread={isSpread}
            tabs={isSpread ? railTabs : compactRailTabs}
            readingIndex={base}
            facingIndex={facingIndex}
            isSingleLeaf={!isSpread}
          />
        </div>
      </NearWindowProvider>
    </BookNavProvider>
  );
}
