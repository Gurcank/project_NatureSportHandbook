'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useSettings } from '@/context/SettingsContext';

export type NotebookNote = {
  key: string;
  title: string;
  desc: string;
  href: string;
  tone: string;
  pin: string;
  top: string;
  side: string;
  rotate: string;
};

type NotebookSpreadProps = {
  leftNotes: NotebookNote[];
  rightNotes: NotebookNote[];
  size?: 'b6' | 'regular' | 'xl';
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  leftOverlay?: React.ReactNode;
  rightOverlay?: React.ReactNode;
  stickyMode?: 'home' | 'page';
  showHomeSticky?: boolean;
  className?: string;
};

const handwritingFont = 'var(--font-kalam), "Segoe Print", "Bradley Hand", "Comic Sans MS", cursive';

const leftPlacements = [
  { top: '11%', side: '14%', rotate: '-4deg' },
  { top: '37%', side: '20%', rotate: '2deg' },
  { top: '61%', side: '16%', rotate: '-3deg' },
  { top: '22%', side: '28%', rotate: '4deg' },
] as const;

const rightPlacements = [
  { top: '13%', side: '14%', rotate: '4deg' },
  { top: '39%', side: '20%', rotate: '-2deg' },
  { top: '63%', side: '16%', rotate: '3deg' },
  { top: '25%', side: '28%', rotate: '-4deg' },
] as const;

function getPlacement(side: 'left' | 'right', index: number, total: number) {
  if (total === 1) {
    return {
      top: '34%',
      side: '22%',
      rotate: side === 'left' ? '-2deg' : '2deg',
    };
  }

  if (total === 2) {
    const placements = side === 'left'
      ? [
          { top: '16%', side: '14%', rotate: '-4deg' },
          { top: '55%', side: '22%', rotate: '3deg' },
        ]
      : [
          { top: '18%', side: '14%', rotate: '4deg' },
          { top: '57%', side: '22%', rotate: '-3deg' },
        ];

    return placements[index] ?? placements[placements.length - 1];
  }

  const placements = side === 'left' ? leftPlacements : rightPlacements;
  return placements[Math.min(index, placements.length - 1)];
}

function getBgColor(toneClass: string): string {
  const colorMatch = toneClass.match(/#[0-9a-f]{6}/i);
  return colorMatch ? colorMatch[0] : '#fdf5e0';
}

function getNoteWidth(total: number): string {
  if (total <= 1) {
    return 'min(52%, 15rem)';
  }

  if (total === 2) {
    return 'min(44%, 13.5rem)';
  }

  return 'min(40%, 12.5rem)';
}

function StickyNote({
  note,
  side,
  index,
  total,
}: {
  note: NotebookNote;
  side: 'left' | 'right';
  index: number;
  total: number;
}) {
  const placement = getPlacement(side, index, total);
  const bgColor = getBgColor(note.tone);
  const width = getNoteWidth(total);

  const desktopStyle: CSSProperties = {
    top: placement.top,
    [side]: placement.side,
    width,
    minHeight: total <= 1 ? '11.5rem' : '10.75rem',
    transform: `rotate(${placement.rotate})`,
  };

  return (
    <Link
      href={note.href}
      className={`group absolute block overflow-hidden rounded-[0.15rem] transition-shadow duration-300 hover:shadow-[0_16px_24px_rgba(32,20,10,0.2)] ${note.tone}`}
      style={{
        ...desktopStyle,
        boxShadow: '0 8px 18px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[0.15rem] px-4 py-4"
        style={{
          backgroundColor: bgColor,
          fontFamily: handwritingFont,
        }}
      >
        <h2
          className="text-center leading-tight"
          style={{
            fontFamily: handwritingFont,
            fontSize: '1.2rem',
            fontWeight: 700,
            letterSpacing: '0.3px',
            color: 'var(--pencil)',
            textShadow: '0.5px 0.5px 0 rgba(255,255,255,0.35)',
          }}
        >
          {note.title}
        </h2>
        <p
          className="mt-3 flex flex-1 items-center justify-center text-center"
          style={{
            fontFamily: handwritingFont,
            fontSize: '0.92rem',
            fontStyle: 'italic',
            fontWeight: 500,
            color: 'var(--pencil)',
            opacity: 0.88,
            lineHeight: 1.32,
          }}
        >
          {note.desc}
        </p>
      </div>
    </Link>
  );
}

export default function NotebookSpread({
  leftNotes,
  rightNotes,
  size = 'b6',
  leftContent,
  rightContent,
  leftOverlay,
  rightOverlay,
  stickyMode = 'page',
  showHomeSticky = true,
  className,
}: NotebookSpreadProps) {
  const { language } = useSettings();
  const homeText = language === 'tr' ? 'Ana\nSayfa' : 'HOME';
  const isHomeSticky = stickyMode === 'home';
  const desktopContainerMax = size === 'xl' ? 'max-w-[76rem]' : size === 'b6' ? 'max-w-[64rem]' : 'max-w-[56rem]';
  const notebookMaxWidth =
    size === 'xl'
      ? 'min(76rem, calc((100vh - 6rem) * 1.72))'
      : size === 'b6'
      ? 'min(64rem, calc((100vh - 7rem) * 1.52))'
      : 'min(56rem, calc((100vh - 7rem) * 1.34))';

  return (
    <section
      className={`relative mx-auto w-full overflow-x-auto pb-4 ${desktopContainerMax} ${className ?? ''}`}
      style={{ minWidth: notebookMaxWidth }}
    >
      <div
        className="relative mx-auto"
        style={{
          width: notebookMaxWidth,
          minWidth: notebookMaxWidth,
        }}
      >
        <div className="pointer-events-none absolute -inset-x-4 top-[18px] h-[calc(100%-18px)] rounded-[2.7rem] border border-[#7a5c37]/24 bg-[linear-gradient(180deg,#e8d8aa_0%,#d8bd88_100%)] opacity-90 shadow-[0_14px_34px_rgba(60,38,17,0.2)]">
          <div className="absolute inset-y-0 left-1/2 w-[34px] -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(155,120,77,0.1)_34%,rgba(102,72,40,0.22)_46%,rgba(66,40,19,0.5)_50%,rgba(102,72,40,0.22)_54%,rgba(155,120,77,0.1)_66%,transparent_100%)]" />
        </div>
        <div className="pointer-events-none absolute -inset-x-3 top-[12px] h-[calc(100%-12px)] rounded-[2.72rem] border border-[#7a5c37]/28 bg-[linear-gradient(180deg,#eadbb0_0%,#dbc190_100%)] opacity-92 shadow-[0_18px_42px_rgba(60,38,17,0.22)]">
          <div className="absolute inset-y-0 left-1/2 w-[38px] -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(160,124,81,0.12)_30%,rgba(106,76,43,0.28)_45%,rgba(68,42,20,0.58)_50%,rgba(106,76,43,0.28)_55%,rgba(160,124,81,0.12)_70%,transparent_100%)]" />
        </div>
        <div className="pointer-events-none absolute -inset-x-2 top-[6px] h-[calc(100%-6px)] rounded-[2.75rem] border border-[#7a5c37]/32 bg-[linear-gradient(180deg,#ecdeb4_0%,#ddc595_100%)] opacity-94 shadow-[0_24px_50px_rgba(60,38,17,0.24)]">
          <div className="absolute inset-y-0 left-1/2 w-[44px] -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(168,132,88,0.14)_28%,rgba(112,80,46,0.34)_44%,rgba(71,43,21,0.68)_50%,rgba(112,80,46,0.34)_56%,rgba(168,132,88,0.14)_72%,transparent_100%)]" />
        </div>

        {showHomeSticky ? (
          <Link
            href="/"
            aria-label="Go to home"
            className={`absolute left-0 top-[20%] -translate-y-1/2 -translate-x-[52%] ${isHomeSticky ? 'z-30' : 'z-10 transition-transform duration-300 hover:-translate-x-[62%]'}`}
          >
            <span className="relative inline-flex items-center h-16">
              {/* triangle protrusion on the left */}
              <span
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: language === 'tr' ? '3.6rem' : '3rem',
                  height: '100%',
                  background: 'linear-gradient(160deg,#f0c9d1 0%,#e8b4c0 100%)',
                  clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
                  boxShadow: '0 8px 14px rgba(57,36,15,0.18)',
                  fontFamily: handwritingFont,
                  fontSize: language === 'tr' ? '0.62rem' : '0.75rem',
                  fontWeight: 700,
                  color: '#5a3740',
                  textShadow: '0.5px 0.5px 0 rgba(255,255,255,0.35)',
                  lineHeight: 1,
                  whiteSpace: 'pre-line',
                  textAlign: 'center',
                }}
              >
                {homeText}
              </span>

              {/* rectangular body */}
              <span
                className="rounded-r-sm"
                style={{ height: '100%', background: 'linear-gradient(160deg,#f0c9d1_0%,#e8b4c0_100%)', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
              />
            </span>
          </Link>
        ) : null}

        <div className="relative z-20 overflow-hidden rounded-[2.75rem] border border-[#6f542f]/60 bg-[linear-gradient(180deg,#ecdcb0_0%,#dcc08d_100%)] shadow-[0_34px_90px_rgba(51,33,14,0.38),inset_0_2px_0_rgba(255,248,229,0.45),inset_0_-12px_24px_rgba(75,52,24,0.14)] md:aspect-[250/176]">

          <div className="pointer-events-none absolute inset-y-5 left-4 w-3 rounded-full bg-[linear-gradient(90deg,rgba(143,108,63,0.35),rgba(255,255,255,0.0))]" />
          <div className="pointer-events-none absolute inset-y-5 right-4 w-3 rounded-full bg-[linear-gradient(270deg,rgba(143,108,63,0.35),rgba(255,255,255,0.0))]" />
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-[48px] -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(173,136,88,0.14)_24%,rgba(127,92,50,0.4)_40%,rgba(78,48,24,0.82)_48%,rgba(58,33,13,0.98)_50%,rgba(78,48,24,0.82)_52%,rgba(127,92,50,0.4)_60%,rgba(173,136,88,0.14)_76%,transparent_100%)]" />

          <div className="grid gap-0 md:h-full md:grid-cols-2">
            <div className="relative min-h-[29rem] rounded-tl-[2.75rem] rounded-bl-[2.75rem] border-b border-[#7a5c37]/26 bg-[linear-gradient(165deg,#f0dfb1_0%,#e0c590_100%)] px-5 py-6 shadow-[inset_-22px_0_26px_rgba(63,43,19,0.12)] sm:min-h-[31rem] md:h-full md:min-h-0 md:border-b-0 md:border-r md:border-[#7a5c37]/24">
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-[linear-gradient(270deg,rgba(108,79,44,0.18),transparent)]" />
                  <div className="relative h-full min-h-[29rem] overflow-hidden sm:min-h-[31rem]">
                    <div className="relative pl-14 z-20">{leftContent}</div>
                    {leftNotes.map((note, index) => (
                      <StickyNote key={note.key} note={note} side="left" index={index} total={leftNotes.length} />
                    ))}
                    {leftOverlay}
                  </div>
            </div>

            <div className="relative rounded-tr-[2.75rem] rounded-br-[2.75rem] bg-[linear-gradient(195deg,#f0dfb1_0%,#e0c590_100%)] px-5 py-6 shadow-[inset_22px_0_26px_rgba(63,43,19,0.12)] md:h-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-[linear-gradient(90deg,rgba(108,79,44,0.18),transparent)]" />
              <div className="relative h-full min-h-[29rem] overflow-hidden sm:min-h-[31rem]">
                {rightContent}
                {rightNotes.map((note, index) => (
                  <StickyNote key={note.key} note={note} side="right" index={index} total={rightNotes.length} />
                ))}
                {rightOverlay}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}