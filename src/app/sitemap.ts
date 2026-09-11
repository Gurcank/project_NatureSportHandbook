import type { MetadataRoute } from 'next';
import { sectionSlugs } from '@/lib/book';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return sectionSlugs().map((slug) => ({
    url: `${siteUrl}${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: slug === '/' ? 1 : 0.7,
  }));
}
