'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Reads a media query without tripping hydration: the server snapshot is
 * always `false`, so the first client paint matches the markup and the real
 * value lands on the following commit.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * Whether the book opens into a spread.
 *
 * This has to agree exactly with page-flip, which drops to a single page
 * whenever the book is narrower than twice its minimum page width (2 × 260px).
 * If the CSS draws a two-page box while the library lays out one page, the page
 * spills out of the board. The book's width is derived from the viewport (see
 * `--book-width` in globals.css), so that one condition becomes two viewport
 * bounds:
 *
 *   width:  2 × 1.25rem gutter + 520 × 1.62 table width             ≥ 882.4px
 *   height: 2.5rem of grass + 520 × 1.62 table height / 1.42       ≥ 633.2px
 *
 * The same query is written into globals.css; change the table's proportions,
 * the grass margin, the gutter or the minimum page width and both must be
 * recalculated.
 */
export const SPREAD_QUERY = '(min-width: 883px) and (min-height: 634px)';

export function useIsSpread(): boolean {
  return useMediaQuery(SPREAD_QUERY);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
