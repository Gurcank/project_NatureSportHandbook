'use client';

import type { Language } from '@/context/SettingsContext';
import type { Leaf } from '@/lib/paginate';
import { allCredits } from '@/lib/images';
import { entryById, type Section, type SectionLink } from '@/lib/book';
import { jitter } from '@/lib/jitter';
import { sectionTone } from '@/lib/tones';
import RoughBox from '@/components/RoughBox';
import SpeciesRow from './SpeciesRow';
import LeafDoodle from './LeafDoodle';
import StickyNote from './StickyNote';
import TitleLeaf from './TitleLeaf';

const CHAPTER_WORD: Record<Language, string> = { tr: 'Bölüm', en: 'Chapter' };

const CREDITS_INTRO: Record<Language, string> = {
  tr: 'Fotoğraflar Wikimedia Commons’tan; her biri fotoğrafçısı ve lisansıyla birlikte.',
  en: 'Photographs come from Wikimedia Commons, each with its photographer and licence.',
};

const CREDITS_EMPTY: Record<Language, string> = {
  tr: 'Henüz yerel fotoğraf yok.',
  en: 'No local photographs yet.',
};

const SECTION_EMPTY: Record<Language, string> = {
  tr: 'Bu bölüme henüz kayıt girilmedi.',
  en: 'No entries have been written for this section yet.',
};

/**
 * The sections a chapter contains, written out as a list. Deliberately not
 * links: a paper handbook lists what is inside and you turn to it, and jumping
 * there in one tap is the thing a book cannot do. Each line carries the group's
 * scientific name after the common one, which is the pairing the headings use.
 */
function SectionList({
  items,
  size,
  language,
}: {
  items: SectionLink[];
  size: string;
  language: Language;
}) {
  return (
    <ul
      className="mt-[1.2em] flex flex-col items-start gap-[0.42em] text-[var(--pencil)]"
      style={{ fontSize: size }}
    >
      {items.map((item) => (
        <li key={item.sectionId} className="flex items-baseline gap-[0.5em]">
          <span aria-hidden="true" className="text-[0.8em] text-[var(--pencil-soft)]">
            —
          </span>
          <span>
            {item.label[language]}
            {item.taxon ? (
              <span className="text-[0.82em] italic text-[var(--pencil-soft)]">
                {' · '}
                {item.taxon}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({
  eyebrow,
  title,
  taxon,
  size = '2.3em',
}: {
  eyebrow?: { word: string; numeral: string };
  title: string;
  /** The scientific name of the group, written under the heading in italic. */
  taxon?: string;
  /** Entry leaves share their top line with a post-it, so they set it smaller. */
  size?: string;
}) {
  return (
    <header>
      {eyebrow ? (
        <p className="mb-[0.3em] flex items-baseline gap-[0.55em] text-[0.8em] uppercase tracking-[0.18em] text-[var(--pencil-soft)]">
          {eyebrow.word}
          <span className="text-[1.5em] font-bold not-italic tracking-normal" aria-hidden="true">
            {eyebrow.numeral}
          </span>
        </p>
      ) : null}
      <h2
        className="pencil-text font-bold leading-[1.05] hyphens-auto text-[var(--pencil)]"
        style={{ fontSize: size }}
      >
        {title}
      </h2>
      {taxon ? (
        <p className="mt-[0.15em] text-[0.9em] italic leading-snug text-[var(--pencil-soft)]">
          {taxon}
        </p>
      ) : null}
    </header>
  );
}

/**
 * The heading and intro note a section's first leaf opens with. The book's
 * measurer renders this same component, so a leaf is paginated against exactly
 * what it will draw.
 */
export function EntriesHeader({
  section,
  language,
}: {
  section: Extract<Section, { kind: 'entries' }>;
  language: Language;
}) {
  return (
    <div className="flex items-start justify-between gap-[0.7em]">
      <div className="min-w-0 flex-1">
        <SectionHeading title={section.title[language]} taxon={section.taxon} size="1.85em" />
      </div>
      <StickyNote
        tone={sectionTone(section.id)}
        tilt={jitter(`${section.id}-tilt`, -2.6, 2.2)}
        className="w-[8.6em] shrink-0"
      >
        <p className="text-[0.82em] leading-snug">{section.intro[language]}</p>
      </StickyNote>
    </div>
  );
}

export default function LeafContent({ leaf, language }: { leaf: Leaf; language: Language }) {
  switch (leaf.kind) {
    case 'chapter': {
      const { chapter } = leaf;
      return (
        <div className="flex h-full flex-col">
          <SectionHeading
            eyebrow={{ word: CHAPTER_WORD[language], numeral: chapter.numeral }}
            title={chapter.title[language]}
          />
          <p className="mt-[0.7em] max-w-[18em] text-[1.02em] leading-relaxed text-[var(--pencil)]">
            {chapter.intro[language]}
          </p>
          <SectionList items={chapter.links} size="1.15em" language={language} />
          <LeafDoodle seed={leaf.key} sectionId={leaf.sectionId} />
        </div>
      );
    }

    case 'opener': {
      const { section } = leaf;
      return (
        <div className="flex h-full flex-col">
          <SectionHeading title={section.title[language]} taxon={section.taxon} />
          <StickyNote
            tone={sectionTone(section.id)}
            tilt={jitter(`${section.id}-tilt`, -2.4, 1.6)}
            className="mt-[1em] max-w-[16em] self-start"
          >
            <p className="text-[0.95em] leading-snug">{section.intro[language]}</p>
          </StickyNote>
          <SectionList items={section.links} size="1.05em" language={language} />
          <LeafDoodle seed={leaf.key} sectionId={section.id} />
        </div>
      );
    }

    case 'entries': {
      const { section, showHeader, entries } = leaf;
      return (
        <div className="flex h-full flex-col gap-[0.75em]">
          {showHeader ? <EntriesHeader section={section} language={language} /> : null}

          {section.entries.length === 0 ? (
            <p className="relative self-start px-[1em] py-[0.8em] text-[0.95em] text-[var(--pencil-soft)]">
              <RoughBox roughness={2.4} strokeWidth={1.2} color="var(--pencil-soft)" />
              {SECTION_EMPTY[language]}
            </p>
          ) : (
            // Each entry takes the height it needs; the leaf holds only those
            // that fit, and the room they leave is the sketch's.
            entries.map((entry) => <SpeciesRow key={entry.id} entry={entry} language={language} />)
          )}

          <LeafDoodle seed={leaf.key} sectionId={section.id} />
        </div>
      );
    }

    case 'credits': {
      const speciesName = (id: string) => entryById(id)?.name[language] ?? id;
      const page = allCredits(language, speciesName).slice(leaf.start, leaf.start + leaf.count);

      return (
        <div className="flex h-full flex-col">
          {leaf.page === 0 ? (
            <>
              <SectionHeading title={language === 'tr' ? 'Fotoğraf Künyesi' : 'Photo Credits'} />
              <p className="mt-[0.5em] max-w-[22em] text-[0.9em] leading-snug text-[var(--pencil-soft)]">
                {CREDITS_INTRO[language]}
              </p>
            </>
          ) : null}

          {/* Two columns to a page, set tight: this is a reference list read by
              looking a name up, not prose read line after line. Nothing is
              clamped — a credit is a licence condition and must be legible in
              full. */}
          <ul className="mt-[0.8em] columns-2 gap-[1.1em] text-[0.72em] leading-[1.28] text-[var(--pencil)]">
            {page.length === 0 ? (
              <li className="text-[var(--pencil-soft)]">{CREDITS_EMPTY[language]}</li>
            ) : (
              page.map(({ id, credit }) => (
                <li key={id} className="mb-[0.28em] break-inside-avoid">
                  <span className="font-bold">{speciesName(id)}</span>
                  {' — '}
                  {credit.artist}, {credit.license}
                </li>
              ))
            )}
          </ul>
          <LeafDoodle seed={leaf.key} sectionId="credits" />
        </div>
      );
    }

    case 'title':
      return <TitleLeaf />;

    // A blank leaf at the back is the most room a sketch gets.
    case 'blank':
      return (
        <div className="flex h-full flex-col">
          <LeafDoodle seed={leaf.key} sectionId={leaf.sectionId} />
        </div>
      );

    // The boards and their paste-downs paint themselves.
    case 'cover':
    case 'endpaper':
      return <div className="h-full" aria-hidden="true" />;
  }
}
