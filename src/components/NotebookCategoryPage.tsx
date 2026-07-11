import Link from 'next/link';
import NotebookSpread, { type NotebookNote } from '@/components/NotebookSpread';

type NotebookCategoryPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  notes: Array<Pick<NotebookNote, 'key' | 'title' | 'desc' | 'href' | 'tone' | 'pin'>>;
  backHref: string;
  backLabel: string;
  homeHref?: string;
  homeLabel?: string;
  accentClassName: string;
  accentBorderClassName: string;
};

const leftPlacements = [
  { top: '10%', side: '11%', rotate: '-4deg' },
  { top: '39%', side: '14%', rotate: '2deg' },
  { top: '58%', side: '11%', rotate: '-3deg' },
] as const;

const rightPlacements = [
  { top: '10%', side: '11%', rotate: '4deg' },
  { top: '39%', side: '12%', rotate: '-2deg' },
  { top: '58%', side: '11%', rotate: '3deg' },
] as const;

type Placement = {
  top: string;
  side: string;
  rotate: string;
};

function buildNotes(
  notes: NotebookCategoryPageProps['notes'],
  placements: readonly Placement[],
): NotebookNote[] {
  return notes.map((note, index) => {
    const placement = placements[Math.min(index, placements.length - 1)];

    return {
      ...note,
      top: placement.top,
      side: placement.side,
      rotate: placement.rotate,
    };
  });
}

export default function NotebookCategoryPage({
  eyebrow,
  title,
  intro,
  notes,
  backHref,
  backLabel,
  homeHref = '/',
  homeLabel,
  accentClassName,
  accentBorderClassName,
}: NotebookCategoryPageProps) {
  const splitIndex = Math.ceil(notes.length / 2);
  const leftNotes = buildNotes(notes.slice(0, splitIndex), leftPlacements);
  const rightNotes = buildNotes(notes.slice(splitIndex), rightPlacements);

  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-4 sm:py-5">
      <div className="mb-5 rounded-[2rem] border border-white/10 bg-black/20 px-5 py-4 shadow-[0_12px_40px_rgba(18,24,18,0.24)] backdrop-blur-sm sm:px-6">
        <div className={`inline-flex rounded-full border px-4 py-1 text-xs uppercase tracking-[0.35em] ${accentBorderClassName} ${accentClassName}`}>
          {eyebrow}
        </div>
        <h1 className={`mt-4 text-4xl font-serif font-semibold sm:text-5xl ${accentClassName}`}>{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78 sm:text-base">{intro}</p>
      </div>

      <NotebookSpread leftNotes={leftNotes} rightNotes={rightNotes} size="b6" />

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={backHref}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-white/10 ${accentBorderClassName} ${accentClassName}`}
        >
          {backLabel}
        </Link>
        <Link
          href={homeHref}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/78 transition hover:bg-white/10"
        >
          {homeLabel ?? 'Home'}
        </Link>
      </div>
    </div>
  );
}