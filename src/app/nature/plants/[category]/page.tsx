"use client";

import Link from 'next/link';
import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import { plants } from '@/data/plants';

type PlantCategoryKey = 'trees' | 'herbs' | 'shrubs' | 'flowers' | 'mosses' | 'aquatic';

type CategoryText = {
  title: string;
  intro: string;
};

type PlantCardItem = {
  slug: string;
  name: string;
  scientificName: string;
  description: string;
  image?: string;
  type: string;
  height?: string;
};

const categoryContent: Record<PlantCategoryKey, Record<'tr' | 'en', CategoryText>> = {
  trees: {
    tr: { title: 'Agaclar', intro: 'Yaprak doken, herdem yesil ve meyve agaclari dahil genis koleksiyon.' },
    en: { title: 'Trees', intro: 'A broad collection including deciduous, evergreen, and fruit trees.' },
  },
  herbs: {
    tr: { title: 'Otsu Bitkiler', intro: 'Bahce, mutfak ve dogada karsilastiginiz yumusak govdeli turler.' },
    en: { title: 'Herbs', intro: 'Soft-stemmed species commonly used in gardens, kitchens, and nature.' },
  },
  shrubs: {
    tr: { title: 'Cali lar', intro: 'Sinir bitkileri, sus calilari ve kokulu cali gruplari.' },
    en: { title: 'Shrubs', intro: 'Border plants, ornamental shrubs, and fragrant shrub groups.' },
  },
  flowers: {
    tr: { title: 'Cicekler', intro: 'Renkli taç yaprakli bahce ve yabani cicekler.' },
    en: { title: 'Flowers', intro: 'Garden and wild flowers with colorful petals.' },
  },
  mosses: {
    tr: { title: 'Yosunlar', intro: 'Nemli yuzeylerde ve orman tabaninda yasayan kucuk bitkiler.' },
    en: { title: 'Mosses', intro: 'Small plants that live on damp surfaces and forest floors.' },
  },
  aquatic: {
    tr: { title: 'Su Bitkileri', intro: 'Golel, sulak alan ve su yuzeylerinde yasayan turler.' },
    en: { title: 'Aquatic Plants', intro: 'Species that live in ponds, wetlands, and on water surfaces.' },
  },
};

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function matchesCategory(type: string, category: PlantCategoryKey) {
  const normalized = type.toLowerCase();
  switch (category) {
    case 'trees':
      return normalized.includes('tree') || normalized.includes('palm') || normalized.includes('conifer');
    case 'herbs':
      return normalized.includes('herb') || normalized.includes('subshrub');
    case 'shrubs':
      return normalized.includes('shrub');
    case 'flowers':
      return normalized.includes('flower') || normalized.includes('vine') || normalized.includes('ornamental plant');
    case 'mosses':
      return normalized.includes('moss') || normalized.includes('liverwort') || normalized.includes('hornwort');
    case 'aquatic':
      return normalized.includes('aquatic') || normalized.includes('wetland') || normalized.includes('marine');
    default:
      return false;
  }
}

function buildItems(category: PlantCategoryKey): PlantCardItem[] {
  return plants
    .filter((plant) => matchesCategory(plant.type, category))
    .map((plant) => ({
      slug: slugify(plant.id),
      name: plant.name,
      scientificName: plant.scientificName,
      description: plant.description,
      image: plant.image,
      type: plant.type,
      height: plant.height,
    }));
}

function PlantCard({ category, item, index }: { category: PlantCategoryKey; item: PlantCardItem; index: number }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[#d9cdb5] bg-[#fcfaf3] shadow-[0_16px_30px_rgba(57,36,15,0.08)]">
      <Link href={`/nature/plants/${category}/${item.slug}`} className="block p-4 transition-transform duration-300 hover:-translate-y-0.5">
        <div className="flex gap-4">
          <div className="w-[7.25rem] shrink-0">
            <div className="overflow-hidden rounded-[1.1rem] border border-[#e5dcc7] bg-white shadow-[0_8px_18px_rgba(57,36,15,0.08)]">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-[8.6rem] w-full object-cover" />
              ) : (
                <div className="flex h-[8.6rem] items-center justify-center bg-[#f1eadb] text-sm text-[#7b6a52]">
                  {item.name}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#8c7a5c]">0{index + 1}</p>
            <h3 className="mt-1 truncate text-[1.14rem] font-semibold leading-tight text-[#4f4f4f]">{item.name}</h3>
            <p className="mt-1 text-[0.86rem] italic text-[#7d7162]">{item.scientificName}</p>
            <p className="mt-2 line-clamp-4 text-[0.92rem] leading-6 text-[#5f5f5f]">{item.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[0.72rem] text-[#6d604b]">
              <span className="rounded-full bg-[#f1eadb] px-2.5 py-1">{item.type}</span>
              {item.height ? <span className="rounded-full bg-[#f1eadb] px-2.5 py-1">{item.height}</span> : null}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function PlantSubCategoryPage() {
  const { language } = useSettings();
  const params = useParams<{ category: string }>();
  const key = params.category as PlantCategoryKey;
  const content = categoryContent[key];
  const items = useMemo(() => buildItems(key), [key]);

  if (!content || items.length === 0) {
    return (
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-red-300/40 bg-black/35 p-6 backdrop-blur-sm">
          <h1 className="mb-3 text-3xl font-bold text-red-200">{language === 'tr' ? 'Kategori bulunamadi' : 'Category not found'}</h1>
          <Link href="/nature/plants" className="text-red-100 underline underline-offset-4">
            {language === 'tr' ? 'Bitki kategorilerine don' : 'Back to plant categories'}
          </Link>
        </div>
      </div>
    );
  }

  const text = content[language];

  return (
    <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-12">
      <section className="rounded-[2rem] border border-[#d7c6a6] bg-[linear-gradient(180deg,#f8f1df_0%,#efe4c8_100%)] p-5 shadow-[0_24px_60px_rgba(57,36,15,0.16)] sm:p-6">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-[#4f4f4f]">{text.title}</h1>
          <p className="max-w-3xl text-[#6a5d4d]">{text.intro}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <PlantCard key={item.slug} category={key} item={item} index={index} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/nature/plants" className="rounded-full border border-[#cbb58b] bg-[#fffaf0] px-4 py-2 font-medium text-[#5c503f] transition hover:bg-[#f4ead5]">
            {language === 'tr' ? 'Bitki handbook sayfasina don' : 'Back to plant handbook'}
          </Link>
          <Link href="/" className="rounded-full border border-[#cbb58b] bg-[#fffaf0] px-4 py-2 font-medium text-[#5c503f] transition hover:bg-[#f4ead5]">
            {language === 'tr' ? 'Ana sayfaya don' : 'Back to home'}
          </Link>
        </div>
      </section>
    </div>
  );
}
