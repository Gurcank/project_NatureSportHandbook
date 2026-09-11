'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Language } from '@/context/SettingsContext';
import type { SpeciesEntry } from '@/types';
import { speciesImage } from '@/lib/images';
import RoughBox from '@/components/RoughBox';
import { useStage } from '@/components/scene/Stage';

const EMPTY_STATE_TEXT: Record<Language, string> = {
  tr: 'fotoğraf notu eksik',
  en: 'photo note missing',
};

const LEAN_IN_LABEL: Record<Language, (name: string) => string> = {
  tr: (name) => `${name} fotoğrafına yakından bak`,
  en: (name) => `Look closer at the photograph of ${name}`,
};

/**
 * A photo the way it would be stuck into a paper handbook: a polaroid with a
 * handwritten caption. It sits square on the page — the notes live beside it,
 * so the card has nothing to hide and never turns over.
 */
export default function PolaroidCard({
  entry,
  language,
  measureOnly = false,
}: {
  entry: SpeciesEntry;
  language: Language;
  /** The frame alone, same size, no photograph loaded — see SpeciesRow. */
  measureOnly?: boolean;
}) {
  const source = speciesImage(entry.id);
  const [imageBroken, setImageBroken] = useState(false);
  const leanIn = useStage()?.leanIn ?? null;
  const hasPhoto = !measureOnly && source !== null && !imageBroken;

  return (
    <figure className="flex w-[5.5em] shrink-0 flex-col rounded-[0.2em] bg-[#fdfcf7] p-[0.42em] pb-[0.28em] shadow-[0_0.4em_0.8em_rgba(57,36,15,0.2),0_0_0_1px_rgba(90,70,45,0.12)]">
      {/* object-contain, not cover: the whole photograph has to be visible.
          Whatever shape it is, it is letterboxed on the photo paper rather
          than having its edges cut off. */}
      <button
        type="button"
        // A press on a photograph is for leaning in, never for turning. The
        // photos near a leaf's top corners sit inside page-flip's corner zone,
        // where a click turns the page even with click-to-flip off; stopping
        // the press at capture keeps it from ever reaching the library.
        onMouseDownCapture={(event) => event.stopPropagation()}
        onTouchStartCapture={(event) => event.stopPropagation()}
        // A photograph is the one thing on the page worth putting your head
        // closer to, so it — and not the whole leaf — is what invites the move.
        onClick={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          leanIn?.({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
        }}
        disabled={!hasPhoto || leanIn === null}
        aria-label={LEAN_IN_LABEL[language](entry.name[language])}
        className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-[#f3f0e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pencil)] disabled:cursor-default"
      >
        {hasPhoto ? (
          <Image
            src={source}
            alt={entry.name[language]}
            fill
            sizes="(max-width: 767px) 40vw, 20vw"
            className="object-contain"
            onError={() => setImageBroken(true)}
          />
        ) : measureOnly ? null : (
          <span className="relative flex h-full w-full items-center justify-center px-[0.4em] text-center text-[0.66em] leading-tight text-[var(--pencil-soft)]">
            <RoughBox roughness={2.4} strokeWidth={1.1} color="var(--pencil-soft)" />
            {EMPTY_STATE_TEXT[language]}
          </span>
        )}
      </button>
      {/* The common name is written beside the card, so the caption carries the
          binomial instead — the label a field photograph would actually get. */}
      <figcaption className="mt-[0.3em] text-center text-[0.72em] italic leading-tight break-words text-[var(--pencil-soft)]">
        {entry.scientificName}
      </figcaption>
    </figure>
  );
}
