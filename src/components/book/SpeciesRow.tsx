'use client';

import { Fragment } from 'react';
import type { Language } from '@/context/SettingsContext';
import type { SpeciesEntry } from '@/types';
import PolaroidCard from './PolaroidCard';

/**
 * One species as it would sit on a handbook page: the photo stuck down on the
 * left, the notes beside it in the same order every time — common name, the
 * binomial, the labelled facts, then the description.
 *
 * The facts are a two-column definition list with a fixed label column, so the
 * values line up down the whole page rather than starting wherever the label
 * happens to end. That alignment is what makes a page of entries read as one
 * record repeated, instead of a stack of loose notes.
 */
export default function SpeciesRow({
  entry,
  language,
  measureOnly = false,
}: {
  entry: SpeciesEntry;
  language: Language;
  /** Drawn without its photograph, for measuring how tall the entry is. */
  measureOnly?: boolean;
}) {
  return (
    <article className="flex items-start gap-[0.7em]">
      <PolaroidCard entry={entry} language={language} measureOnly={measureOnly} />

      <div className="min-w-0 flex-1 pt-[0.15em] text-[var(--pencil)]">
        <h3 className="text-[1em] font-bold leading-tight">{entry.name[language]}</h3>
        <p className="text-[0.78em] italic leading-snug text-[var(--pencil-soft)]">
          {entry.scientificName}
        </p>

        <dl className="mt-[0.35em] grid grid-cols-[7.2em_minmax(0,1fr)] gap-x-[0.45em] text-[0.76em] leading-snug">
          {entry.facts.map((fact) => (
            <Fragment key={fact.label.en}>
              <dt className="text-[var(--pencil-soft)]">{fact.label[language]}</dt>
              <dd className="min-w-0">{fact.value[language]}</dd>
            </Fragment>
          ))}
        </dl>

        {/* Shown in full. An entry takes as much of the leaf as it needs, and
            one that does not fit moves to the next leaf instead of being cut. */}
        <p className="mt-[0.4em] text-[0.78em] leading-[1.34] text-[var(--pencil)]">
          {entry.description[language]}
        </p>
      </div>
    </article>
  );
}
