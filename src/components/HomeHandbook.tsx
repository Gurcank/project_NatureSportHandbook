'use client';

import Handbook from './Handbook';
import { useSettings, type Language } from '@/context/SettingsContext';
import type { NotebookNote } from './NotebookSpread';

const homeNotesByLanguage: Record<Language, { left: NotebookNote[]; right: NotebookNote[] }> = {
  tr: {
    left: [
      {
        key: 'animals',
        title: 'Hayvanlar',
        desc: 'Hayvanlar hakkında notlar.',
        href: '/nature/animals',
        tone: 'bg-[#dfc98d] border-[#8a6f31]/40',
        pin: '#7a4b35',
        top: '6%',
        side: '30%',
        rotate: '-3deg',
      },
    ],
    right: [
      {
        key: 'hiking',
        title: 'Kara Sporları',
        desc: 'Yürüyüş notları.',
        href: '/sport/hiking',
        tone: 'bg-[#dfc98d] border-[#8a6f31]/40',
        pin: '#7a4b35',
        top: '10%',
        side: '30%',
        rotate: '-2deg',
      },
    ],
  },
  en: {
    left: [
      {
        key: 'animals',
        title: 'Animals',
        desc: 'Notes about animals.',
        href: '/nature/animals',
        tone: 'bg-[#dfc98d] border-[#8a6f31]/40',
        pin: '#7a4b35',
        top: '6%',
        side: '30%',
        rotate: '-3deg',
      },
    ],
    right: [
      {
        key: 'hiking',
        title: 'Land Sports',
        desc: 'Hiking notes.',
        href: '/sport/hiking',
        tone: 'bg-[#dfc98d] border-[#8a6f31]/40',
        pin: '#7a4b35',
        top: '10%',
        side: '30%',
        rotate: '-2deg',
      },
    ],
  },
};

export default function HomeHandbook({ className }: { className?: string }) {
  const { language } = useSettings();
  const lang = language as Language;
  const notes = homeNotesByLanguage[lang] || homeNotesByLanguage.en;

  return <Handbook leftNotes={notes.left} rightNotes={notes.right} size="xl" className={className} />;
}
