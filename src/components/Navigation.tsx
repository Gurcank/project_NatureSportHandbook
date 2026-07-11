'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import SettingsModal from './SettingsModal';
import { t, translations } from '@/lib/translations';
import { Icons, IconWrapper } from '@/lib/icons';

type SearchRoute = {
  href: string;
  keywords: readonly string[];
};

type MenuItem = {
  href: string;
  icon: React.ReactNode;
  labelKey: keyof typeof translations.en;
};

const searchableRoutes: readonly SearchRoute[] = [
  {
    href: '/',
    keywords: ['home', 'homepage', 'ana sayfa', 'doğa', 'nature', 'sport', 'spor', 'handbook'],
  },
  {
    href: '/nature/plants',
    keywords: ['plants', 'plant', 'bitki', 'bitkiler', 'flora', 'nature plants'],
  },
  {
    href: '/nature/animals',
    keywords: ['animals', 'animal', 'hayvan', 'hayvanlar', 'fauna'],
  },
  {
    href: '/nature/mushrooms',
    keywords: ['mushrooms', 'mushroom', 'mantar', 'mantarlar', 'fungi'],
  },
  {
    href: '/nature/stones',
    keywords: ['stones', 'stone', 'rock', 'rocks', 'taş', 'taşlar', 'minerals', 'mineral'],
  },
  {
    href: '/sport/hiking',
    keywords: ['land sports', 'kara sporları', 'hiking', 'hike', 'yürüyüş', 'trek'],
  },
  {
    href: '/sport/water-sports',
    keywords: ['water sports', 'su sporları', 'canoe', 'kano', 'kayak', 'rafting'],
  },
  {
    href: '/sport/air-sports',
    keywords: ['air sports', 'hava sporları', 'paragliding', 'flight', 'uçuş', 'yamaç paraşütü'],
  },
] as const;

const natureMenuItems: readonly MenuItem[] = [
  { href: '/nature/animals', icon: Icons.deer, labelKey: 'animals' },
  { href: '/nature/plants', icon: Icons.leaf, labelKey: 'plants' },
  { href: '/nature/mushrooms', icon: Icons.mushroom, labelKey: 'mushrooms' },
  { href: '/nature/stones', icon: Icons.rock, labelKey: 'stones' },
] as const;

const sportMenuItems: readonly MenuItem[] = [
  { href: '/sport/hiking', icon: Icons.hikingBoot, labelKey: 'landSports' },
  { href: '/sport/water-sports', icon: Icons.waves, labelKey: 'waterSports' },
  { href: '/sport/air-sports', icon: Icons.parachute, labelKey: 'airSports' },
] as const;

function normalizeText(value: string, language: 'en' | 'tr') {
  return value
    .toLocaleLowerCase(language === 'tr' ? 'tr-TR' : 'en-US')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function findSearchMatch(query: string, language: 'en' | 'tr') {
  return searchableRoutes.find((route) =>
    route.keywords.some((keyword) => {
      const normalizedKeyword = normalizeText(keyword, language);
      return normalizedKeyword.includes(query) || query.includes(normalizedKeyword);
    }),
  );
}

function MenuLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex h-12 min-w-full items-center justify-center overflow-hidden rounded-xl border-2 border-[#4ca97f]/35 bg-gradient-to-br from-[#3d9d6f]/60 to-[#2a6f4a]/50 px-3 text-[#e8f7f1] transition-all duration-300 hover:scale-105 hover:border-[#5eb87f]/60 hover:to-[#3d9d6f]/70 hover:text-white hover:shadow-lg hover:shadow-[#3d9d6f]/30 group"
    >
      <span className="flex w-full min-w-0 items-center justify-center gap-2">
        <IconWrapper icon={icon} size={22} color="#a8d5ba" className="group-hover:scale-110 transition-transform duration-300" />
        <span className="whitespace-nowrap text-sm font-semibold leading-none">{label}</span>
      </span>
    </Link>
  );
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [brandTitle, setBrandTitle] = useState('Nature & Sport Handbook');
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search plants, animals, sports...');
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { language } = useSettings();
  const router = useRouter();
  const translate = (key: keyof typeof translations.en) => t(key, language);

  useEffect(() => {
    setBrandTitle(language === 'tr' ? 'Doğa ve Spor El Kitabı' : 'Nature & Sport Handbook');
    setSearchPlaceholder(language === 'tr' ? 'Bitki, hayvan, spor ara...' : 'Search plants, animals, sports...');
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, [language]);

  // Keep as constant for fallback
  const defaultSearchPlaceholder =
    language === 'tr' ? 'Bitki, hayvan, spor ara...' : 'Search plants, animals, sports...';

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = normalizeText(searchQuery, language);
    if (!query) return;

    const match = findSearchMatch(query, language);

    if (match) {
      router.push(match.href);
      setSearchQuery('');
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  const openDropdown = (dropdown: 'nature' | 'sport') => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const scheduleDropdownClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimerRef.current = null;
    }, 180);
  };

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 w-full">
        {/* Background with nature-inspired gradient */}
        <div className="absolute inset-0 border-b bg-gradient-to-r from-[#1a5f3f]/98 via-[#2d7a52]/96 to-[#1a5f3f]/98 border-[#3d9d6f]/30 backdrop-blur-md" />
        
        {/* Nature-inspired overlay pattern */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#4ca97f]/5 via-transparent to-[#1a5f3f]/8" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand - Enhanced */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-br from-[#5eb87f]/50 to-[#2d7a52]/40 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative rounded-xl border-2 border-[#4ca97f]/60 bg-gradient-to-br from-[#3d9d6f] to-[#2d7a52] px-2.5 py-2 shadow-lg">
                  <IconWrapper icon={Icons.leaf} size={32} color="#a8d5ba" />
                </div>
              </div>
              <span className="hidden sm:block text-base font-bold tracking-wide text-[#e8f7f1] group-hover:text-white transition-colors duration-300">
                {brandTitle}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {/* Home Link */}
              <Link
                href="/"
                className="px-4 py-2 text-[#c9f0e0] hover:text-white font-semibold transition-all duration-300 relative group"
              >
                <span>{translate('home')}</span>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#5eb87f] to-[#3d9d6f] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>

              {/* Nature Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => openDropdown('nature')}
                onMouseLeave={scheduleDropdownClose}
              >
                <button className="px-4 py-2 text-[#c9f0e0] hover:text-white font-semibold transition-all duration-300 flex items-center gap-2 relative group/btn rounded-lg hover:bg-[#3d9d6f]/20">
                  <IconWrapper icon={Icons.nature} size={18} color="#a8d5ba" className="transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:rotate-12" />
                  <span>{translate('nature')}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#5eb87f] to-[#3d9d6f] group-hover/btn:w-full transition-all duration-300 rounded-full" />
                </button>

                {/* Nature Dropdown Menu */}
                <div
                  className={`absolute left-1/2 mt-2 w-[28rem] -translate-x-1/2 pt-3 transition-all duration-300 origin-top ${
                    activeDropdown === 'nature'
                      ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto'
                      : 'opacity-0 invisible -translate-y-2 scale-95 pointer-events-none'
                  }`}
                  onMouseEnter={() => openDropdown('nature')}
                  onMouseLeave={scheduleDropdownClose}
                >
                  <div className="relative rounded-2xl border-2 border-[#4ca97f]/40 bg-gradient-to-b from-[#2a6f4a]/95 to-[#1a5f3f]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5eb87f]/5 via-transparent to-[#1a5f3f]/10 pointer-events-none" />
                    <div className="pointer-events-none absolute -right-4 -top-4 opacity-60 animate-pulse">
                      <IconWrapper icon={Icons.clover} size={28} color="#5eb87f" />
                    </div>
                    <div className="relative grid grid-cols-2 gap-3 p-4">
                      {natureMenuItems.map((item) => (
                        <MenuLink key={item.href} href={item.href} icon={item.icon} label={translate(item.labelKey)} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sport Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => openDropdown('sport')}
                onMouseLeave={scheduleDropdownClose}
              >
                <button className="px-4 py-2 text-[#c9f0e0] hover:text-white font-semibold transition-all duration-300 flex items-center gap-2 relative group/btn rounded-lg hover:bg-[#3d9d6f]/20">
                  <IconWrapper icon={Icons.person} size={18} color="#a8d5ba" className="transition-transform duration-500 group-hover/btn:rotate-90" />
                  <span>{translate('sport')}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#5eb87f] to-[#3d9d6f] group-hover/btn:w-full transition-all duration-300 rounded-full" />
                </button>

                {/* Sport Dropdown Menu */}
                <div
                  className={`absolute left-1/2 mt-2 w-[20rem] -translate-x-1/2 pt-3 transition-all duration-300 origin-top ${
                    activeDropdown === 'sport'
                      ? 'opacity-100 visible translate-y-0 scale-100 pointer-events-auto'
                      : 'opacity-0 invisible -translate-y-2 scale-95 pointer-events-none'
                  }`}
                  onMouseEnter={() => openDropdown('sport')}
                  onMouseLeave={scheduleDropdownClose}
                >
                  <div className="relative rounded-2xl border-2 border-[#4ca97f]/40 bg-gradient-to-b from-[#2a6f4a]/95 to-[#1a5f3f]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5eb87f]/5 via-transparent to-[#1a5f3f]/10 pointer-events-none" />
                    <div className="relative p-4 grid grid-cols-1 gap-3">
                      {sportMenuItems.map((item) => (
                        <MenuLink key={item.href} href={item.href} icon={item.icon} label={translate(item.labelKey)} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <form
                onSubmit={handleSearchSubmit}
                className="hidden md:flex items-center gap-2 rounded-lg border-2 border-[#4ca97f]/40 bg-[#2a6f4a]/50 px-3 py-1.5 backdrop-blur-sm hover:border-[#5eb87f]/60 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 text-[#a8d5ba]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-36 lg:w-48 bg-transparent text-sm text-[#e8f7f1] placeholder:text-[#7ab59a]/70 focus:outline-none"
                />
              </form>

              {/* Settings Button */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2.5 rounded-lg text-[#c9f0e0] hover:text-white border-2 border-[#4ca97f]/40 hover:border-[#5eb87f]/70 hover:bg-[#3d9d6f]/30 transition-all duration-300 group"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 rounded-lg text-[#c9f0e0] hover:text-white border-2 border-[#4ca97f]/40 hover:border-[#5eb87f]/70 hover:bg-[#3d9d6f]/30 transition-all duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t-2 border-[#4ca97f]/30 mt-3 animate-in fade-in slide-in-from-top-2 duration-300 bg-gradient-to-b from-[#2a6f4a]/60 to-[#1a5f3f]/60 rounded-b-2xl">
              <form onSubmit={handleSearchSubmit} className="px-4 pt-3 pb-2">
                <div className="flex items-center gap-2 rounded-lg border-2 border-[#4ca97f]/40 bg-[#2a6f4a]/50 px-3 py-2 hover:border-[#5eb87f]/60 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-[#a8d5ba]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.5 5.5a7.5 7.5 0 0011.15 11.15z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#e8f7f1] placeholder:text-[#7ab59a]/70 focus:outline-none"
                  />
                </div>
              </form>

              <Link
                href="/"
                className="block px-4 py-3 text-[#c9f0e0] hover:text-white hover:bg-[#3d9d6f]/20 rounded-lg transition-all font-semibold mx-2 my-1"
              >
                {translate('home')}
              </Link>

              {/* Mobile Nature Menu */}
              <div className="px-4 py-3 mt-2 border-t border-[#4ca97f]/20">
                <p className="text-[#5eb87f] font-bold mb-3 text-xs uppercase tracking-widest">
                  {translate('nature')}
                </p>
                <div className="pl-2 space-y-2">
                  <Link
                    href="/nature/plants"
                    className="flex items-center gap-2 text-[#c9f0e0] hover:text-white text-sm transition-colors py-2 px-2 rounded-lg hover:bg-[#3d9d6f]/15"
                  >
                    <IconWrapper icon={Icons.leaf} size={18} color="#a8d5ba" />
                    {language === 'tr' ? 'Bitkiler' : 'Plants'}
                  </Link>
                  <Link
                    href="/nature/animals"
                    className="flex items-center gap-2 text-[#c9f0e0] hover:text-white text-sm transition-colors py-2 px-2 rounded-lg hover:bg-[#3d9d6f]/15"
                  >
                    <IconWrapper icon={Icons.deer} size={18} color="#a8d5ba" />
                    {language === 'tr' ? 'Hayvanlar' : 'Animals'}
                  </Link>
                  <Link
                    href="/nature/mushrooms"
                    className="flex items-center gap-2 text-[#c9f0e0] hover:text-white text-sm transition-colors py-2 px-2 rounded-lg hover:bg-[#3d9d6f]/15"
                  >
                    <IconWrapper icon={Icons.mushroom} size={18} color="#a8d5ba" />
                    {language === 'tr' ? 'Mantarlar' : 'Mushrooms'}
                  </Link>
                  <Link
                    href="/nature/stones"
                    className="flex items-center gap-2 text-[#c9f0e0] hover:text-white text-sm transition-colors py-2 px-2 rounded-lg hover:bg-[#3d9d6f]/15"
                  >
                    <IconWrapper icon={Icons.rock} size={18} color="#a8d5ba" />
                    {language === 'tr' ? 'Taşlar' : 'Stones'}
                  </Link>
                </div>
              </div>

              {/* Mobile Sport Menu */}
              <div className="px-4 py-3 border-t border-[#4ca97f]/20">
                <p className="text-[#5eb87f] font-bold mb-3 text-xs uppercase tracking-widest">
                  {translate('sport')}
                </p>
                <div className="pl-2 space-y-2">
                  <Link
                    href="/sport/hiking"
                    className="flex items-center gap-2 text-[#c9f0e0] hover:text-white text-sm transition-colors py-2 px-2 rounded-lg hover:bg-[#3d9d6f]/15"
                  >
                    <IconWrapper icon={Icons.hikingBoot} size={18} color="#a8d5ba" />
                    {translate('landSports')}
                  </Link>
                  <Link
                    href="/sport/water-sports"
                    className="flex items-center gap-2 text-[#c9f0e0] hover:text-white text-sm transition-colors py-2 px-2 rounded-lg hover:bg-[#3d9d6f]/15"
                  >
                    <IconWrapper icon={Icons.waves} size={18} color="#a8d5ba" />
                    {translate('waterSports')}
                  </Link>
                  <Link
                    href="/sport/air-sports"
                    className="flex items-center gap-2 text-[#c9f0e0] hover:text-white text-sm transition-colors py-2 px-2 rounded-lg hover:bg-[#3d9d6f]/15"
                  >
                    <IconWrapper icon={Icons.parachute} size={18} color="#a8d5ba" />
                    {language === 'tr' ? 'Hava Sporları' : 'Air Sports'}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div aria-hidden="true" className="h-16" />

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
