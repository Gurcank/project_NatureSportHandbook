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
  edible: {
    tr: { title: 'Yenilebilir Mantarlar', intro: 'Mutfak kullaniminda yer alan turler.', items: ['Kultur Mantari', 'Istiridye Mantari', 'Kuzugobegi', 'Kanlica'] },
    en: { title: 'Edible Mushrooms', intro: 'Species commonly used in cooking.', items: ['Button Mushroom', 'Oyster Mushroom', 'Morel', 'Saffron Milk Cap'] },
  },
  toxic: {
    tr: { title: 'Zehirli Mantarlar', intro: 'Tuketimi tehlikeli olan turler.', items: ['Amanita Phalloides', 'Amanita Muscaria', 'Galerina', 'Inocybe'] },
    en: { title: 'Toxic Mushrooms', intro: 'Species dangerous for human consumption.', items: ['Amanita Phalloides', 'Amanita Muscaria', 'Galerina', 'Inocybe'] },
  },
  medicinal: {
    tr: { title: 'Tibbi Mantarlar', intro: 'Geleneksel ve modern calismalarda incelenen turler.', items: ['Reishi', 'Shiitake', 'Coriolus', 'Cordyceps'] },
    en: { title: 'Medicinal Mushrooms', intro: 'Species studied in traditional and modern medicine.', items: ['Reishi', 'Shiitake', 'Coriolus', 'Cordyceps'] },
  },
  forest: {
    tr: { title: 'Orman Turleri', intro: 'Orman tabani ve curuk odunlarda görülen mantarlar.', items: ['Coprinus', 'Laccaria', 'Mycena', 'Boletus'] },
    en: { title: 'Forest Species', intro: 'Mushrooms found on forest floors and decaying wood.', items: ['Coprinus', 'Laccaria', 'Mycena', 'Boletus'] },
  },
} as const;

export default function MushroomSubCategoryPage() {
  const { language } = useSettings();
  const params = useParams<{ category: string }>();
  const key = params.category as keyof typeof categoryContent;
  const content = categoryContent[key];

  if (!content) {
    return (
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-red-300/40 bg-black/35 p-6 backdrop-blur-sm">
          <h1 className="mb-3 text-3xl font-bold text-red-200">{language === 'tr' ? 'Kategori bulunamadi' : 'Category not found'}</h1>
          <Link href="/nature/mushrooms" className="text-red-100 underline underline-offset-4">
            {language === 'tr' ? 'Mantar kategorilerine don' : 'Back to mushroom categories'}
          </Link>
        </div>
      </div>
    );
  }

  const text = content[language];

  return (
    <div className="flex-1 mx-auto w-full max-w-6xl px-4 py-12">
      <section className="rounded-2xl border border-amber-300/40 bg-black/35 p-6 backdrop-blur-sm">
        <h1 className="mb-2 text-4xl font-bold text-amber-100">🍄 {text.title}</h1>
        <p className="mb-6 text-amber-50/85">{text.intro}</p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {text.items.map((item) => {
            const slug = slugify(item);
            return (
              <article key={item} className="rounded-xl border border-amber-200/35 bg-amber-900/30 p-4">
                <h2 className="text-2xl font-semibold text-amber-100">
                  <Link href={`/nature/mushrooms/${key}/${slug}`} className="hover:underline">
                    {item}
                  </Link>
                </h2>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/nature/mushrooms" className="rounded-lg border border-amber-200/60 bg-amber-100/15 px-4 py-2 font-medium text-amber-100 transition hover:bg-amber-100/25">
            {language === 'tr' ? 'Mantar kategorilerine don' : 'Back to mushroom categories'}
          </Link>
          <Link href="/" className="rounded-lg border border-amber-200/60 bg-amber-100/15 px-4 py-2 font-medium text-amber-100 transition hover:bg-amber-100/25">
            {language === 'tr' ? 'Ana sayfaya don' : 'Back to home'}
          </Link>
        </div>
      </section>
    </div>
  );
}
