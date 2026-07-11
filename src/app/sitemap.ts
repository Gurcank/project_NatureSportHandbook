import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const staticRoutes = [
  '/',
  '/nature/animals',
  '/nature/animals/amphibians',
  '/nature/animals/birds',
  '/nature/animals/fish',
  '/nature/animals/insects',
  '/nature/animals/mammals',
  '/nature/animals/reptiles',
  '/nature/plants',
  '/nature/mushrooms',
  '/nature/stones',
  '/sport/hiking',
  '/sport/trekking',
  '/sport/air-sports',
  '/sport/water-sports',
  '/sport/water-sports/canoe',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
