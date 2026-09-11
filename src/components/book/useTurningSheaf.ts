'use client';

import { useEffect, type RefObject } from 'react';

/** The sheet page-flip is currently swinging, as opposed to the one under it. */
const TURNING = 'data-turning';

/**
 * Marks the sheet in the air during a jump, so the wad of paper a jump turns
 * over can be drawn on it.
 *
 * A jump animates one turn however far it goes, so what has to carry the
 * distance is the thickness of what turned. Drawing that wad beside the book —
 * which is what a separate, fixed strip amounts to — reads as a single leaf
 * turning next to a stack that is going nowhere. Hung on the turning sheet
 * instead, it takes the sheet's own transform and clip and goes over with the
 * paper.
 *
 * Only runs while a jump is in flight: the rest of the time there is no wad,
 * and this is one more observer on a subtree the library rewrites every frame.
 */
export function useTurningSheaf(frameRef: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !active) return;

    let marked: HTMLElement | null = null;

    const read = () => {
      let turning: HTMLElement | null = null;

      for (const item of frame.querySelectorAll<HTMLElement>('.stf__item')) {
        if (item.style.display !== 'block') continue;
        const clip = item.style.clipPath;
        if (!clip || clip === 'none') continue;
        // Both the swinging sheet and the page being uncovered under it are
        // clipped, but the library lays the bottom page flat: an angle is what
        // tells them apart, and only the sheet in the air carries the wad.
        const angle = /rotate\(([-\d.e]+)rad\)/.exec(item.style.transform);
        if (!angle || Math.abs(Number(angle[1])) < 0.01) continue;
        turning = item;
        break;
      }

      if (turning === marked) return;
      marked?.removeAttribute(TURNING);
      turning?.setAttribute(TURNING, '');
      marked = turning;
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(frame, { attributes: true, attributeFilter: ['style'], subtree: true });

    return () => {
      observer.disconnect();
      marked?.removeAttribute(TURNING);
    };
  }, [frameRef, active]);
}
