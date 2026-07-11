'use client';

import type { NotebookNote } from './NotebookSpread';
import NotebookSpread from './NotebookSpread';
import { useSettings, type Language } from '@/context/SettingsContext';

const stoneNotesByLanguage: Record<Language, NotebookNote[]> = {
  tr: [
    {
      key: 'igneous',
      title: 'Magmatik',
      desc: 'Erimiş kayadan oluşan taş grupları.',
      href: '/nature/stones/igneous',
      tone: 'bg-[#e3d5bb] border-[#8a7a5a]/40',
      pin: '#71583f',
      top: '6%',
      side: '11%',
      rotate: '-3deg',
    },
    {
      key: 'sedimentary',
      title: 'Sedimanter',
      desc: 'Tabakalı birikimle oluşan taşlar.',
      href: '/nature/stones/sedimentary',
      tone: 'bg-[#d6cfbf] border-[#7a7a7a]/40',
      pin: '#68605a',
      top: '42%',
      side: '16%',
      rotate: '1deg',
    },
    {
      key: 'metamorphic',
      title: 'Metamorfik',
      desc: 'Isı ve basınçla dönüşen kayaçlar.',
      href: '/nature/stones/metamorphic',
      tone: 'bg-[#d3d0c2] border-[#6a6a8a]/40',
      pin: '#5b5b6a',
      top: '6%',
      side: '-12%',
      rotate: '-2deg',
    },
    {
      key: 'minerals',
      title: 'Mineraller',
      desc: 'Tek kristal ve mineral türleri.',
      href: '/nature/stones/minerals',
      tone: 'bg-[#cfddd3] border-[#5a7a8a]/40',
      pin: '#58706a',
      top: '44%',
      side: '-16%',
      rotate: '2deg',
    },
  ],
  en: [
    {
      key: 'igneous',
      title: 'Igneous',
      desc: 'Stone groups formed from molten rock.',
      href: '/nature/stones/igneous',
      tone: 'bg-[#e3d5bb] border-[#8a7a5a]/40',
      pin: '#71583f',
      top: '6%',
      side: '11%',
      rotate: '-3deg',
    },
    {
      key: 'sedimentary',
      title: 'Sedimentary',
      desc: 'Stones formed by layered sediment accumulation.',
      href: '/nature/stones/sedimentary',
      tone: 'bg-[#d6cfbf] border-[#7a7a7a]/40',
      pin: '#68605a',
      top: '42%',
      side: '16%',
      rotate: '1deg',
    },
    {
      key: 'metamorphic',
      title: 'Metamorphic',
      desc: 'Rocks transformed by heat and pressure.',
      href: '/nature/stones/metamorphic',
      tone: 'bg-[#d3d0c2] border-[#6a6a8a]/40',
      pin: '#5b5b6a',
      top: '6%',
      side: '-12%',
      rotate: '-2deg',
    },
    {
      key: 'minerals',
      title: 'Minerals',
      desc: 'Single-crystal and mineral types.',
      href: '/nature/stones/minerals',
      tone: 'bg-[#cfddd3] border-[#5a7a8a]/40',
      pin: '#58706a',
      top: '44%',
      side: '-16%',
      rotate: '2deg',
    },
  ],
};

export default function StonesHandbook() {
  const { language } = useSettings();
  const stoneNotes = stoneNotesByLanguage[language];
  const leftNotes = stoneNotes.slice(0, 2);
  const rightNotes = stoneNotes.slice(2);

  return (
    <div className="flex-1 mx-auto w-full max-w-[88rem] px-4 py-4 sm:py-5">
      <NotebookSpread leftNotes={leftNotes} rightNotes={rightNotes} size="xl" />
    </div>
  );
}
