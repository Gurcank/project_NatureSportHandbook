'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';

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

const categoryContent = {
  igneous: {
    tr: { title: 'Magmatik', intro: 'Magmanin soguyup katilasmasiyla olusan taslar.', items: ['Bazalt', 'Granit', 'Andezit', 'Obsidyen'] },
    en: { title: 'Igneous', intro: 'Rocks formed by cooling and solidification of magma.', items: ['Basalt', 'Granite', 'Andesite', 'Obsidian'] },
  },
  sedimentary: {
    tr: { title: 'Sedimanter', intro: 'Tabakali birikim sureciyle olusan kaya turleri.', items: ['Kirectasi', 'Kumtasi', 'Seyl', 'Traverten'] },
    en: { title: 'Sedimentary', intro: 'Rock types formed by layered deposition.', items: ['Limestone', 'Sandstone', 'Shale', 'Travertine'] },
  },
  metamorphic: {
    tr: { title: 'Metamorfik', intro: 'Isi ve basincla donusum geciren kaya turleri.', items: ['Mermer', 'Gnays', 'Kuvarsit', 'Sist'] },
    en: { title: 'Metamorphic', intro: 'Rocks transformed by heat and pressure.', items: ['Marble', 'Gneiss', 'Quartzite', 'Schist'] },
  },
  minerals: {
    tr: { title: 'Mineraller', intro: 'Belirli kristal yapisina sahip dogal mineraller.', items: ['Kuvars', 'Ametist', 'Pirit', 'Kalsit'] },
    en: { title: 'Minerals', intro: 'Natural minerals with distinct crystal structures.', items: ['Quartz', 'Amethyst', 'Pyrite', 'Calcite'] },
  },
} as const;

export default function StoneSubCategoryPage() {
  const { language } = useSettings();
  const params = useParams<{ category: string }>();
  const key = params.category as keyof typeof categoryContent;
  const content = categoryContent[key];

  if (!content) {
    return (
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-red-300/40 bg-black/35 p-6 backdrop-blur-sm">
          <h1 className="mb-3 text-3xl font-bold text-red-200">{language === 'tr' ? 'Kategori bulunamadi' : 'Category not found'}</h1>
          <Link href="/nature/stones" className="text-red-100 underline underline-offset-4">
            {language === 'tr' ? 'Tas kategorilerine don' : 'Back to stone categories'}
          </Link>
        </div>
      </div>
    );
  }

  const text = content[language];

  return (
    <div className="flex-1 mx-auto w-full max-w-6xl px-4 py-12">
      <section className="rounded-2xl border border-zinc-300/40 bg-black/35 p-6 backdrop-blur-sm">
        <h1 className="mb-2 text-4xl font-bold text-zinc-100">💎 {text.title}</h1>
        <p className="mb-6 text-zinc-100/80">{text.intro}</p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {text.items.map((item) => {
            const slug = slugify(item);
            return (
              <article key={item} className="rounded-xl border border-zinc-200/35 bg-zinc-900/30 p-4">
                <h2 className="text-2xl font-semibold text-zinc-100">
                  <Link href={`/nature/stones/${key}/${slug}`} className="hover:underline">
                    {item}
                  </Link>
                </h2>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/nature/stones" className="rounded-lg border border-zinc-200/60 bg-zinc-100/15 px-4 py-2 font-medium text-zinc-100 transition hover:bg-zinc-100/25">
            {language === 'tr' ? 'Tas kategorilerine don' : 'Back to stone categories'}
          </Link>
          <Link href="/" className="rounded-lg border border-zinc-200/60 bg-zinc-100/15 px-4 py-2 font-medium text-zinc-100 transition hover:bg-zinc-100/25">
            {language === 'tr' ? 'Ana sayfaya don' : 'Back to home'}
          </Link>
        </div>
      </section>
    </div>
  );
}
