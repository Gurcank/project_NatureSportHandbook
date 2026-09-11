'use client';

import { Fragment, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Language } from '@/context/SettingsContext';
import { sections } from '@/lib/book';
import type { LeafMeasure } from '@/lib/paginate';
import { EntriesHeader } from './LeafContent';
import SpeciesRow from './SpeciesRow';

const ENTRY_SECTIONS = sections.filter(
  (section): section is Extract<(typeof sections)[number], { kind: 'entries' }> =>
    section.kind === 'entries',
);

/**
 * Every heading and entry in the book, drawn invisibly on a leaf of the real
 * size, so the book can deal entries onto leaves by how tall they actually are.
 *
 * It uses the same components the leaves draw (without photographs, which do
 * not change a frame's size), inside the same `.leaf-type` box, so what it
 * measures is what will be on the page. It measures again whenever a leaf's
 * size or the language changes, and once more when the handwriting face has
 * finished loading — the fallback face sets the same words shorter or longer.
 *
 * Memoised: the book re-renders on every page turn, and none of those change
 * anything this draws.
 */
function LeafMeasurer({
  width,
  height,
  language,
  onMeasure,
}: {
  /** One page's box, in the pixels page-flip lays leaves out in. */
  width: number;
  height: number;
  language: Language;
  onMeasure: (measure: LeafMeasure) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [fontsSettled, setFontsSettled] = useState(0);

  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) setFontsSettled((n) => n + 1);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const type = root?.querySelector<HTMLElement>('[data-measure-type]');
    if (!root || !type) return;

    const style = getComputedStyle(type);
    const available =
      type.clientHeight -
      Number.parseFloat(style.paddingTop) -
      Number.parseFloat(style.paddingBottom);
    if (!(available > 0)) return;

    const headers = new Map<string, number>();
    const entries = new Map<string, number>();
    root.querySelectorAll<HTMLElement>('[data-measure-header]').forEach((el) => {
      headers.set(el.dataset.measureHeader ?? '', el.getBoundingClientRect().height);
    });
    root.querySelectorAll<HTMLElement>('[data-measure-entry]').forEach((el) => {
      entries.set(el.dataset.measureEntry ?? '', el.getBoundingClientRect().height);
    });

    onMeasure({
      available,
      // The entries column's own gap: 0.75em of the leaf's type size.
      gap: Number.parseFloat(style.fontSize) * 0.75,
      header: (sectionId) => headers.get(sectionId) ?? 0,
      entry: (entryId) => entries.get(entryId) ?? 0,
    });
  }, [width, height, language, onMeasure, fontsSettled]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        visibility: 'hidden',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div className="leaf-scope relative h-full w-full">
        <div data-measure-type className="leaf-type leaf-padding relative h-full">
          <div className="relative z-10">
            {ENTRY_SECTIONS.map((section) => (
              <Fragment key={section.id}>
                <div data-measure-header={section.id}>
                  <EntriesHeader section={section} language={language} />
                </div>
                {section.entries.map((entry) => (
                  <div key={entry.id} data-measure-entry={entry.id}>
                    <SpeciesRow entry={entry} language={language} measureOnly />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LeafMeasurer);
