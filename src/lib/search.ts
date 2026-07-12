export type SearchRoute = {
  href: string;
  keywords: readonly string[];
};

export const searchableRoutes: readonly SearchRoute[] = [
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

const COMBINING_DIACRITICS = new RegExp('[\\u0300-\\u036f]', 'g');

export function normalizeText(value: string, language: 'en' | 'tr') {
  return value
    .toLocaleLowerCase(language === 'tr' ? 'tr-TR' : 'en-US')
    .normalize('NFD')
    .replace(COMBINING_DIACRITICS, '')
    .trim();
}

export function findSearchMatch(query: string, language: 'en' | 'tr') {
  return searchableRoutes.find((route) =>
    route.keywords.some((keyword) => {
      const normalizedKeyword = normalizeText(keyword, language);
      return normalizedKeyword.includes(query) || query.includes(normalizedKeyword);
    }),
  );
}
