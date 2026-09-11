'use client';

import { createContext, useContext } from 'react';

/**
 * How far from the reader a leaf still renders its contents.
 *
 * StPageFlip measures every page, so leaves can never be unmounted. The DOM
 * node stays and only nearby leaves fill it, which keeps a 180-leaf book from
 * mounting 400 photographs at once.
 */
export const NEAR_WINDOW = 10;

/**
 * The reading positions a leaf can be near: normally just where the reader is,
 * and during a jump both ends of it, so the leaf being left keeps its contents
 * for as long as it is still the paper on screen.
 *
 * They are published through context rather than passed down as props, because
 * react-pageflip rebuilds its entire DOM whenever the children *array
 * reference* changes — and rebuilding mid-flip swallows the flip. Context lets
 * each leaf re-render its contents in place while the array handed to the
 * library stays identical.
 */
const NearWindowContext = createContext<readonly number[]>([0]);

export const NearWindowProvider = NearWindowContext.Provider;

export function useIsNear(index: number): boolean {
  const anchors = useContext(NearWindowContext);
  return anchors.some((anchor) => Math.abs(index - anchor) <= NEAR_WINDOW);
}
