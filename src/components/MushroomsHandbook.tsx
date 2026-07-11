'use client';

import type { NotebookNote } from './NotebookSpread';
import NotebookSpread from './NotebookSpread';
import { useSettings, type Language } from '@/context/SettingsContext';

const mushroomNotesByLanguage: Record<Language, NotebookNote[]> = {
  tr: [
    {
      key: 'edible',
      title: 'Yenilebilir',
      desc: 'Mutfakta kullanılan yenilebilir türler.',
      href: '/nature/mushrooms/edible',
      tone: 'bg-[#ded0ab] border-[#8a6f31]/40',
      pin: '#8a673f',
      top: '5%',
      side: '14%',
      rotate: '-3deg',
    },
    {
      key: 'toxic',
      title: 'Zehirli',
      desc: 'Tüketimi riskli veya zehirli türler.',
      href: '/nature/mushrooms/toxic',
      tone: 'bg-[#d9c0ba] border-[#8a4a4a]/40',
      pin: '#7b5450',
      top: '6%',
      side: '-16%',
      rotate: '2deg',
    },
  ],
  en: [
    {
      key: 'edible',
      title: 'Edible',
      desc: 'Edible species used in cooking.',
      href: '/nature/mushrooms/edible',
      tone: 'bg-[#ded0ab] border-[#8a6f31]/40',
      pin: '#8a673f',
      top: '5%',
      side: '14%',
      rotate: '-3deg',
    },
    {
      key: 'toxic',
      title: 'Toxic',
      desc: 'Risky or poisonous species for consumption.',
      href: '/nature/mushrooms/toxic',
      tone: 'bg-[#d9c0ba] border-[#8a4a4a]/40',
      pin: '#7b5450',
      top: '6%',
      side: '-16%',
      rotate: '2deg',
    },
  ],
};

export default function MushroomsHandbook() {
  const { language } = useSettings();
  const mushroomNotes = mushroomNotesByLanguage[language];
  const leftNotes = [mushroomNotes[0]];
  const rightNotes = [mushroomNotes[1]];

  return (
    <div className="flex-1 mx-auto w-full max-w-[88rem] px-4 py-4 sm:py-5">
      <NotebookSpread leftNotes={leftNotes} rightNotes={rightNotes} size="xl" />
    </div>
  );
}
