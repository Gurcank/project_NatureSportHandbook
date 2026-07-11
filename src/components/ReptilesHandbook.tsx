'use client';

import { useEffect, useState } from 'react';
import { useSettings, type Language } from '@/context/SettingsContext';
import NotebookSpread from '@/components/NotebookSpread';
import { reptiles as allReptiles } from '@/data/reptiles';
import type { Animal } from '@/types';

type TurnDirection = 'next' | 'prev';

function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <article className="flex gap-3.5 rounded-[1.4rem] px-1 py-1">
      <figure className="flex h-[13.2rem] w-[8.7rem] shrink-0 flex-col overflow-hidden rounded-[1.15rem] border border-[#dcdcdc] bg-white p-1.5 shadow-[0_10px_24px_rgba(57,36,15,0.12),0_0_0_1px_rgba(255,255,255,0.72),inset_0_1px_0_rgba(255,255,255,0.7)]">
        <img src={animal.image} alt={animal.name} className="h-[10rem] w-full rounded-[0.8rem] object-cover" />
        <figcaption className="mt-1.5 truncate text-center text-[0.84rem] font-semibold leading-tight text-[#4f4f4f]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
          {animal.name}
        </figcaption>
      </figure>

      <div className="min-w-0 flex-1 pt-1.5" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive', color: '#4f4f4f' }}>
        <p className="text-[0.96rem] font-semibold leading-6.5 text-inherit">{animal.scientificName}</p>
        <p className="mt-0.5 text-[0.9rem] leading-6.5 text-inherit">• Diet : {animal.diet}</p>
        <p className="mt-0.5 text-[0.9rem] leading-6.5 text-inherit">• Habitat : {animal.habitat}</p>
        <p className="mt-2.5 text-[0.9rem] leading-6.5 text-inherit opacity-90">• {animal.description}</p>
      </div>
    </article>
  );
}

function PageArrow({
  direction,
  onClick,
  label,
  bottomClassName = 'bottom-4',
}: {
  direction: TurnDirection;
  onClick: () => void;
  label: string;
  bottomClassName?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute ${bottomClassName} z-30 flex h-9 w-9 items-center justify-center bg-transparent text-[#000000] transition-transform duration-300 hover:scale-110 ${direction === 'next' ? 'right-4' : 'left-4 rotate-180'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256" className="h-8 w-8">
        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
      </svg>
    </button>
  );
}

export default function ReptilesHandbook() {
  const { language } = useSettings();
  const items = allReptiles;
  const spreads: Animal[][] = [];
  for (let i = 0; i < items.length; i += 6) spreads.push(items.slice(i, i + 6));

  const [pageIndex, setPageIndex] = useState(0);
  const [turning, setTurning] = useState(false);
  const [direction, setDirection] = useState<TurnDirection>('next');

  useEffect(() => {
    if (!turning) return;
    const t = window.setTimeout(() => {
      setPageIndex((c) => (direction === 'next' ? (c + 1) % spreads.length : (c - 1 + spreads.length) % spreads.length));
      setTurning(false);
    }, 420);
    return () => clearTimeout(t);
  }, [direction, spreads.length, turning]);

  const currentSpread = spreads[pageIndex] || [];
  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex < spreads.length - 1;

  return (
    <div className={`relative flex-1 mx-auto w-full max-w-[88rem] px-4 py-4 sm:py-5 transition-all duration-500 ${turning ? (direction === 'next' ? '-translate-x-8 opacity-0 scale-[0.985]' : 'translate-x-8 opacity-0 scale-[0.985]') : 'translate-x-0 opacity-100 scale-100'}`}>
      <NotebookSpread
        leftNotes={[]}
        rightNotes={[]}
        size="xl"
        stickyMode="page"
        showHomeSticky={false}
        leftContent={(
          <div className="space-y-3 pr-4 md:pr-8">
            {currentSpread.slice(0, 3).map((a) => <AnimalCard key={a.id} animal={a} />)}
          </div>
        )}
        rightContent={(
          <div className="space-y-3 pl-4 md:pl-8">
            {currentSpread.slice(3).map((a) => <AnimalCard key={a.id} animal={a} />)}
          </div>
        )}
        leftOverlay={(
          canGoPrev ? (
            <PageArrow
              direction="prev"
              bottomClassName="bottom-2"
              onClick={() => {
                if (turning) return;
                setDirection('prev');
                setTurning(true);
              }}
              label={language === 'tr' ? 'Önceki yaprağa geç' : 'Go to previous leaf'}
            />
          ) : null
        )}
        rightOverlay={(
          canGoNext ? (
            <PageArrow
              direction="next"
              bottomClassName="bottom-2"
              onClick={() => {
                if (turning) return;
                setDirection('next');
                setTurning(true);
              }}
              label={language === 'tr' ? 'Sonraki yaprağa geç' : 'Go to next leaf'}
            />
          ) : null
        )}
      />
    </div>
  );
}
