'use client';

import type { NotebookNote } from './NotebookSpread';
import NotebookSpread from './NotebookSpread';
import { useSettings, type Language } from '@/context/SettingsContext';

const animalNotesByLanguage: Record<Language, NotebookNote[]> = {
  tr: [
    {
      key: 'mammals',
      title: 'Memeliler',
      desc: 'Büyük ve küçük memeli hayvanlar, orman sakinleri.',
      href: '/nature/animals/mammals',
      tone: 'bg-[#dfc98d] border-[#8a6f31]/40',
      pin: '#7a4b35',
      top: '4%',
      side: '30%',
      rotate: '-3deg',
    },
    {
      key: 'birds',
      title: 'Kuşlar',
      desc: 'Yırtıcı, otçul ve göçmen kuş türleri.',
      href: '/nature/animals/birds',
      tone: 'bg-[#d9c39f] border-[#8a5d2f]/40',
      pin: '#476a4f',
      top: '10%',
      side: '30%',
      rotate: '2deg',
    },
    {
      key: 'reptiles',
      title: 'Sürüngenler',
      desc: 'Endemik ve yaygın sürüngen türleri.',
      href: '/nature/animals/reptiles',
      tone: 'bg-[#ddc7ab] border-[#88643f]/40',
      pin: '#6a543b',
      top: '15%',
      side: '10%',
      rotate: '-2deg',
    },
    {
      key: 'amphibians',
      title: 'Amfibiler',
      desc: 'Su ve karada yaşayan iki yaşamlı hayvanlar.',
      href: '/nature/animals/amphibians',
      tone: 'bg-[#cad3b7] border-[#56753a]/40',
      pin: '#5b6f4a',
      top: '5%',
      side: '-10%',
      rotate: '3deg',
    },
    {
      key: 'fish',
      title: 'Balıklar',
      desc: 'Tatlı su ve deniz ekosistemlerinin balıkları.',
      href: '/nature/animals/fish',
      tone: 'bg-[#cfc6b4] border-[#3f6282]/40',
      pin: '#4f5f67',
      top: '10%',
      side: '-27%',
      rotate: '-2deg',
    },
    {
      key: 'insects',
      title: 'Böcekler',
      desc: 'Tozlayıcı böcekler ve omurgasız çeşitliliği.',
      href: '/nature/animals/insects',
      tone: 'bg-[#dcc8bf] border-[#8f4a58]/40',
      pin: '#7a5a53',
      top: '20%',
      side: '-40%',
      rotate: '2deg',
    },
  ],
  en: [
    {
      key: 'mammals',
      title: 'Mammals',
      desc: 'Large and small mammal species, forest inhabitants.',
      href: '/nature/animals/mammals',
      tone: 'bg-[#dfc98d] border-[#8a6f31]/40',
      pin: '#7a4b35',
      top: '4%',
      side: '30%',
      rotate: '-3deg',
    },
    {
      key: 'birds',
      title: 'Birds',
      desc: 'Predatory, herbivorous, and migratory bird species.',
      href: '/nature/animals/birds',
      tone: 'bg-[#d9c39f] border-[#8a5d2f]/40',
      pin: '#476a4f',
      top: '10%',
      side: '30%',
      rotate: '2deg',
    },
    {
      key: 'reptiles',
      title: 'Reptiles',
      desc: 'Endemic and common reptile species.',
      href: '/nature/animals/reptiles',
      tone: 'bg-[#ddc7ab] border-[#88643f]/40',
      pin: '#6a543b',
      top: '15%',
      side: '10%',
      rotate: '-2deg',
    },
    {
      key: 'amphibians',
      title: 'Amphibians',
      desc: 'Species living both in water and on land.',
      href: '/nature/animals/amphibians',
      tone: 'bg-[#cad3b7] border-[#56753a]/40',
      pin: '#5b6f4a',
      top: '5%',
      side: '-10%',
      rotate: '3deg',
    },
    {
      key: 'fish',
      title: 'Fish',
      desc: 'Fish from freshwater and marine ecosystems.',
      href: '/nature/animals/fish',
      tone: 'bg-[#cfc6b4] border-[#3f6282]/40',
      pin: '#4f5f67',
      top: '10%',
      side: '-27%',
      rotate: '-2deg',
    },
    {
      key: 'insects',
      title: 'Insects',
      desc: 'Pollinator insects and invertebrate diversity.',
      href: '/nature/animals/insects',
      tone: 'bg-[#dcc8bf] border-[#8f4a58]/40',
      pin: '#7a5a53',
      top: '20%',
      side: '-40%',
      rotate: '2deg',
    },
  ],
};

export default function AnimalsHandbook() {
  const { language } = useSettings();
  const animalNotes = animalNotesByLanguage[language];
  const leftNotes = animalNotes.slice(0, 3);
  const rightNotes = animalNotes.slice(3);

  return (
    <div className="flex-1 mx-auto w-full max-w-[88rem] px-4 py-4 sm:py-5">
      <NotebookSpread leftNotes={leftNotes} rightNotes={rightNotes} size="xl" />
    </div>
  );
}