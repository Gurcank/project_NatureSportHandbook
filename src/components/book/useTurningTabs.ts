'use client';

import { useEffect, type RefObject } from 'react';
import { parseClipPolygon, polygonRevealsRect, widenFoldClip, type LocalRect } from '@/lib/fold';
import { sheetPartner } from '@/lib/paginate';

/** Marks the face of a sheet that is not the one drawing the sheet's tab. */
const ECLIPSED = 'is-eclipsed';

/**
 * Keeps a sheet's edge tab behaving like paper through a page turn.
 *
 * Two things go wrong on their own, and both are fixed by watching the styles
 * the flip library writes:
 *
 * 1. The library re-cuts the turning page's `clip-path` every frame and cuts it
 *    to the page rectangle, so a tab hanging past the fore edge is erased the
 *    moment the sheet moves. Each write is pushed back out over the overhang,
 *    which leaves the crease where the library drew it and lets the tab fold
 *    away only when the crease arrives.
 * 2. Both faces of a turning sheet are laid out at once, and each of them
 *    carries the sheet's tab. Only one may draw it, or the other leaves a
 *    second tab standing at the fore edge.
 *
 * The observer runs before paint — mutation callbacks are microtasks and the
 * library writes inside its animation frame — so the tab is never a frame
 * behind the page it is stuck to.
 */
export function useTurningTabs(
  frameRef: RefObject<HTMLElement | null>,
  /** Any element sized to `--tab-overhang`; measured rather than parsed. */
  overhangRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const ourClip = new WeakMap<HTMLElement, string>();
    const eclipsed = new Set<HTMLElement>();
    let leaves: HTMLElement[] = [];

    const leafElements = () => {
      const found = frame.querySelectorAll<HTMLElement>('.stf__item');
      if (found.length !== leaves.length) leaves = Array.from(found);
      return leaves;
    };

    const recut = (element: HTMLElement, overhang: number) => {
      const clip = element.style.clipPath;
      if (!clip || clip === 'none' || ourClip.get(element) === clip) return;

      // Whatever a leaf hangs past its fore edge — a tab, or the wad a jump
      // turns over — lives in the strip this opens up. The paper itself never
      // does, so widening a leaf that has nothing out there changes nothing.
      const foreEdge = element.querySelector('[data-fore-edge]')?.getAttribute('data-fore-edge');
      if (foreEdge !== 'left' && foreEdge !== 'right') return;

      const widened = widenFoldClip(clip, {
        width: Number.parseFloat(element.style.width),
        height: Number.parseFloat(element.style.height),
        overhang,
        foreEdge,
      });
      if (!widened) return;

      element.style.clipPath = widened;
      ourClip.set(element, widened);
    };

    /** The tab's box in its page's own coordinates — the space the clip is cut in. */
    const localRect = (tab: HTMLElement, leaf: HTMLElement): LocalRect => {
      let left = 0;
      let top = 0;
      for (let node: HTMLElement | null = tab; node && node !== leaf;) {
        left += node.offsetLeft;
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return { left, top, right: left + tab.offsetWidth, bottom: top + tab.offsetHeight };
    };

    const setEclipsed = (tab: HTMLElement, on: boolean) => {
      if (on === eclipsed.has(tab)) return;
      tab.classList.toggle(ECLIPSED, on);
      if (on) eclipsed.add(tab);
      else eclipsed.delete(tab);
    };

    /**
     * Hands the sheet's tab from one of its faces to the other.
     *
     * A tab is a rigid piece of paper, so exactly one face may draw it, and the
     * moment to swap is when the crease crosses it — not when the turn begins.
     * Switching at the start of the turn is what left the fore edge bare: the
     * face lying flat had already stood down while the turning face's fold was
     * still a sliver at the corner, clipping its copy away to nothing.
     */
    const handOverTabs = () => {
      const items = leafElements();
      /** Per lifted face, whether its fold has uncovered each tab it carries. */
      const uncovered = new Map<number, Map<HTMLElement, boolean>>();

      items.forEach((leaf, index) => {
        const clip = leaf.style.clipPath;
        if (leaf.style.display !== 'block' || !clip || clip === 'none') return;

        const polygon = parseClipPolygon(clip);
        const faces = new Map<HTMLElement, boolean>();
        for (const tab of leaf.querySelectorAll<HTMLElement>('.page-tab')) {
          faces.set(tab, polygon !== null && polygonRevealsRect(polygon, localRect(tab, leaf)));
        }
        uncovered.set(index, faces);
      });

      items.forEach((leaf, index) => {
        const tabs = leaf.querySelectorAll<HTMLElement>('.page-tab');
        if (tabs.length === 0) return;

        // Only a sheet with both faces on screen has a tab to hand over. A leaf
        // whose other face is nowhere — the page being uncovered under the turn,
        // or either half of a spread at rest — is the only one drawing its tab
        // and must keep it whatever its own fold is doing.
        const other = items[sheetPartner(index)];
        const paired =
          other?.style.display === 'block' && other.querySelector('.page-tab') !== null;
        const own = uncovered.get(index);
        // Tabs are placed in the same running order on both faces of a sheet.
        const twins = paired ? [...(uncovered.get(sheetPartner(index))?.values() ?? [])] : [];

        tabs.forEach((tab, order) => {
          if (!paired) setEclipsed(tab, false);
          // The turning face draws the tab once its fold shows it; until then the
          // face still lying flat keeps it.
          else if (own) setEclipsed(tab, own.get(tab) === false);
          else setEclipsed(tab, twins[order] === true);
        });
      });
    };

    const observer = new MutationObserver((records) => {
      const overhang = overhangRef.current?.getBoundingClientRect().width ?? 0;
      if (overhang <= 0) return;

      for (const record of records) {
        const element = record.target;
        if (element instanceof HTMLElement && element.classList.contains('stf__item')) {
          recut(element, overhang);
        }
      }
      handOverTabs();
    });

    observer.observe(frame, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: true,
    });
    return () => observer.disconnect();
  }, [frameRef, overhangRef]);
}
