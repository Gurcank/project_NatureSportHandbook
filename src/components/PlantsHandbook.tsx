'use client';

import Handbook from './Handbook';
import type { NotebookNote } from './NotebookSpread';
import { useSettings, type Language } from '@/context/SettingsContext';

const plantNotesByLanguage: Record<Language, NotebookNote[]> = {
  tr: [
    {
      key: 'trees',
      title: 'Ağaçlar',
      desc: 'Meşe, çınar, meyve ağaçları ve iğne yapraklıların tam listesi.',
      href: '/nature/plants/trees',
      tone: 'bg-[#ced2b0] border-[#4f6d36]/40',
      pin: '#5c6b47',
      top: '5%',
      side: '10%',
      rotate: '-3deg',
    },
    {
      key: 'herbs',
      title: 'Otlar',
      desc: 'Nane, kekik, safran ve diğer aromatik otsu türler.',
      href: '/nature/plants/herbs',
      tone: 'bg-[#ddd1b7] border-[#8a7355]/40',
      pin: '#6d5a42',
      top: '10%',
      side: '26%',
      rotate: '2deg',
    },
    {
      key: 'shrubs',
      title: 'Çalılar',
      desc: 'Zakkumdan lavantaya uzanan çalı ve bodur türler.',
      href: '/nature/plants/shrubs',
      tone: 'bg-[#d7c0a5] border-[#7a5c37]/40',
      pin: '#7a5a35',
      top: '15%',
      side: '12%',
      rotate: '-2deg',
    },
    {
      key: 'flowers',
      title: 'Çiçekli Bitkiler',
      desc: 'Gül, lale, orkide ve bahçe çiçeklerinin geniş seçkisi.',
      href: '/nature/plants/flowers',
      tone: 'bg-[#dfcfb4] border-[#8a6f31]/40',
      pin: '#8a673f',
      top: '8%',
      side: '24%',
      rotate: '3deg',
    },
    {
      key: 'mosses',
      title: 'Yosunlar',
      desc: 'Kara yosunu, ciğer otu ve turba yosunu gibi sporlu türler.',
      href: '/nature/plants/mosses',
      tone: 'bg-[#c9d1b9] border-[#5a7a4a]/40',
      pin: '#5f7250',
      top: '60%',
      side: '12%',
      rotate: '-2deg',
    },
    {
      key: 'aquatic',
      title: 'Su Bitkileri',
      desc: 'Nilüfer, saz ve diğer sulak alan bitkileri.',
      href: '/nature/plants/aquatic',
      tone: 'bg-[#cfd0bd] border-[#4a6b7a]/40',
      pin: '#5f6f67',
      top: '58%',
      side: '26%',
      rotate: '2deg',
    },
  ],
  en: [
    {
      key: 'trees',
      title: 'Trees',
      desc: 'A complete set of trees, fruit trees, and conifers.',
      href: '/nature/plants/trees',
      tone: 'bg-[#ced2b0] border-[#4f6d36]/40',
      pin: '#5c6b47',
      top: '5%',
      side: '10%',
      rotate: '-3deg',
    },
    {
      key: 'herbs',
      title: 'Herbs',
      desc: 'Aromatic soft-stemmed species such as mint and thyme.',
      href: '/nature/plants/herbs',
      tone: 'bg-[#ddd1b7] border-[#8a7355]/40',
      pin: '#6d5a42',
      top: '10%',
      side: '26%',
      rotate: '2deg',
    },
    {
      key: 'shrubs',
      title: 'Shrubs',
      desc: 'Shrubs and compact woody forms from oleander to lavender.',
      href: '/nature/plants/shrubs',
      tone: 'bg-[#d7c0a5] border-[#7a5c37]/40',
      pin: '#7a5a35',
      top: '15%',
      side: '12%',
      rotate: '-2deg',
    },
    {
      key: 'flowers',
      title: 'Flowering Plants',
      desc: 'A wide selection of roses, tulips, orchids, and garden flowers.',
      href: '/nature/plants/flowers',
      tone: 'bg-[#dfcfb4] border-[#8a6f31]/40',
      pin: '#8a673f',
      top: '8%',
      side: '24%',
      rotate: '3deg',
    },
    {
      key: 'mosses',
      title: 'Mosses',
      desc: 'Spore-based species such as mosses, liverworts, and sphagnum.',
      href: '/nature/plants/mosses',
      tone: 'bg-[#c9d1b9] border-[#5a7a4a]/40',
      pin: '#5f7250',
      top: '60%',
      side: '12%',
      rotate: '-2deg',
    },
    {
      key: 'aquatic',
      title: 'Aquatic Plants',
      desc: 'Water lilies, reeds, and other wetland species.',
      href: '/nature/plants/aquatic',
      tone: 'bg-[#cfd0bd] border-[#4a6b7a]/40',
      pin: '#5f6f67',
      top: '58%',
      side: '26%',
      rotate: '2deg',
    },
  ],
};

export default function PlantsHandbook() {
  const { language } = useSettings();
  const plantNotes = plantNotesByLanguage[language];
  const leftNotes = plantNotes.slice(0, 3);
  const rightNotes = plantNotes.slice(3);

  return <Handbook leftNotes={leftNotes} rightNotes={rightNotes} size="xl" />;
}
