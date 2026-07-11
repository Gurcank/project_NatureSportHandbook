'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import { animals } from '@/data/animals';
import NotebookSpread from '@/components/NotebookSpread';

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
  mammals: {
    tr: {
      title: 'Memeliler',
      intro: 'Sicak kanli, yavrusunu sutle besleyen hayvanlar.',
      items: ['Boz Ayi', 'Kurt', 'Tilki', 'Yarasa'],
    },
    en: {
      title: 'Mammals',
      intro: 'Warm-blooded animals that feed offspring with milk.',
      items: ['Brown Bear', 'Wolf', 'Fox', 'Bat'],
    },
  },
  birds: {
    tr: {
      title: 'Kuslar',
      intro: 'Kanatli ve tuy yapisina sahip hayvan gruplari.',
      items: ['Kartal', 'Sahin', 'Baykus', 'Leylek'],
    },
    en: {
      title: 'Birds',
      intro: 'Winged animals with feather structures.',
      items: ['Eagle', 'Hawk', 'Owl', 'Stork'],
    },
  },
  reptiles: {
    tr: {
      title: 'Surungenler',
      intro: 'Pullu deriye sahip, soguk kanli hayvanlar.',
      items: ['Engerek', 'Kertenkele', 'Kaplumbaga', 'Bukalemun'],
    },
    en: {
      title: 'Reptiles',
      intro: 'Cold-blooded animals with scaled skin.',
      items: ['Viper', 'Lizard', 'Turtle', 'Chameleon'],
    },
  },
  amphibians: {
    tr: {
      title: 'Amfibiler',
      intro: 'Yasam dongusunu su ve kara arasinda geciren turler.',
      items: ['Agac Kurbagasi', 'Semender', 'Kara Kurbagasi', 'Aksolotl'],
    },
    en: {
      title: 'Amphibians',
      intro: 'Species that live between water and land.',
      items: ['Tree Frog', 'Salamander', 'Toad', 'Axolotl'],
    },
  },
  fish: {
    tr: {
      title: 'Baliklar',
      intro: 'Tatli su ve deniz ortamina uyumlu turler.',
      items: ['Alabalik', 'Levrek', 'Sazan', 'Hamsi'],
    },
    en: {
      title: 'Fish',
      intro: 'Species adapted to freshwater and marine habitats.',
      items: ['Trout', 'Sea Bass', 'Carp', 'Anchovy'],
    },
  },
  insects: {
    tr: {
      title: 'Bocekler',
      intro: 'Tozlasma ve ekosistem dengesinde onemli roller ustlenirler.',
      items: ['Ari', 'Kelebek', 'Karinca', 'Yusufcuk'],
    },
    en: {
      title: 'Insects',
      intro: 'Key contributors to pollination and ecosystem balance.',
      items: ['Bee', 'Butterfly', 'Ant', 'Dragonfly'],
    },
  },
} as const;

export default function AnimalSubCategoryPage() {
  const { language } = useSettings();
  const params = useParams<{ category: string }>();
  const key = params.category as keyof typeof categoryContent;
  const content = categoryContent[key];
  const [isTurningPage, setIsTurningPage] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (!isTurningPage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPageIndex((current) => (current + 1) % 3);
      setIsTurningPage(false);
    }, 420);

    return () => window.clearTimeout(timer);
  }, [isTurningPage, key]);

  if (!content) {
    return (
      <div className="flex-1 mx-auto w-full max-w-5xl px-4 py-12">
        <div className="rounded-2xl border border-red-300/40 bg-black/35 p-6 backdrop-blur-sm">
          <h1 className="mb-3 text-3xl font-bold text-red-200">{language === 'tr' ? 'Kategori bulunamadi' : 'Category not found'}</h1>
          <Link href="/nature/animals" className="text-red-100 underline underline-offset-4">
            {language === 'tr' ? 'Hayvan kategorilerine don' : 'Back to animal categories'}
          </Link>
        </div>
      </div>
    );
  }

  const text = content[language];

  if (key === 'mammals') {
    const mammalAnimals = animals.filter((animal) => animal.type === 'Mammal');
    const firstMammal = mammalAnimals[0];
    const secondMammal = mammalAnimals[1];

    const leafPages = [
      {
        left: (
          <div className="pr-4 md:pr-8">
            <div className="relative mb-6 inline-flex items-baseline gap-3">
              <span className="text-[0.78rem] uppercase tracking-[0.18em] text-[#5a5a5a]/70" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                Chapter
              </span>
              <span className="inline-block text-[1.35rem] leading-none" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive', letterSpacing: '0.08em', color: '#5a5a5a', fontWeight: 'bold' }} aria-hidden="true">
                Ⅰ
              </span>
            </div>

            <h2 className="mb-4 text-5xl font-serif text-[#5a5a5a] sm:text-6xl" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
              {language === 'tr' ? 'Memeliler' : 'Mammals'}
            </h2>

            <p className="mb-6 max-w-xl text-base leading-7 text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
              {language === 'tr'
                ? 'Sıcak kanlı, yavrusunu sütle besleyen hayvanlar.'
                : 'Warm-blooded animals that feed offspring with milk.'}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {mammalAnimals.map((animal, index) => (
                <article key={animal.id} className="rounded-2xl border border-[#8d6c40]/25 bg-[#f5e6bd]/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                  <p className="mb-1 text-xs uppercase tracking-[0.22em] text-[#5a5a5a]/60">0{index + 1}</p>
                  <h3 className="text-xl font-semibold text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                    {animal.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5a5a5a]/85">{animal.description}</p>
                </article>
              ))}
            </div>
          </div>
        ),
        right: (
          <div className="relative h-full min-h-[29rem] sm:min-h-[31rem]">
            <div className="relative mb-6 inline-flex items-baseline gap-3">
              <span className="text-[0.95rem] uppercase tracking-[0.18em] text-[#5a5a5a]/70" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                Chapter
              </span>
              <span className="inline-block text-[1.35rem] leading-none" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive', letterSpacing: '0.08em', color: '#5a5a5a', fontWeight: 'bold' }} aria-hidden="true">
                Ⅱ
              </span>
            </div>

            <h2 className="mb-4 text-5xl font-serif text-[#5a5a5a] sm:text-6xl" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
              {language === 'tr' ? 'İlk yaprak' : 'First leaf'}
            </h2>

            <p className="max-w-xl text-base leading-7 text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
              {language === 'tr'
                ? 'Sağ alttaki ok ile sonraki yaprağa geç.'
                : 'Use the bottom-right arrow to move to the next leaf.'}
            </p>

            <button
              type="button"
              onClick={() => setIsTurningPage(true)}
              aria-label={language === 'tr' ? 'Sonraki yaprağa geç' : 'Go to next leaf'}
              className="absolute bottom-4 right-4 z-30 flex h-8 w-8 items-center justify-center bg-transparent text-[#000000] transition-transform duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256" className="h-8 w-8">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
              </svg>
            </button>
          </div>
        ),
      },
      ...(firstMammal
        ? [
            {
              left: (
                <div className="pr-4 md:pr-8">
                  <div className="relative mb-6 inline-flex items-baseline gap-3">
                    <span className="text-[0.78rem] uppercase tracking-[0.18em] text-[#5a5a5a]/70" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                      Chapter
                    </span>
                    <span className="inline-block text-[1.35rem] leading-none" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive', letterSpacing: '0.08em', color: '#5a5a5a', fontWeight: 'bold' }} aria-hidden="true">
                      Ⅰ
                    </span>
                  </div>

                  <h2 className="mb-4 text-5xl font-serif text-[#5a5a5a] sm:text-6xl" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                    {firstMammal.name}
                  </h2>

                  <p className="mb-2 text-sm italic text-[#5a5a5a]/80">{firstMammal.scientificName}</p>
                  <p className="mb-6 max-w-xl text-base leading-7 text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                    {firstMammal.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <article className="rounded-2xl border border-[#8d6c40]/25 bg-[#f5e6bd]/70 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#5a5a5a]/60">Tip</p>
                      <p className="mt-1 text-[#5a5a5a]">{firstMammal.type}</p>
                    </article>
                    <article className="rounded-2xl border border-[#8d6c40]/25 bg-[#f5e6bd]/70 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#5a5a5a]/60">Habitat</p>
                      <p className="mt-1 text-[#5a5a5a]">{firstMammal.habitat}</p>
                    </article>
                  </div>
                </div>
              ),
              right: (
                <div className="relative h-full min-h-[29rem] sm:min-h-[31rem]">
                  <div className="rounded-3xl border border-[#8d6c40]/20 bg-[#f5e6bd]/65 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#5a5a5a]/55">Preview</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#5a5a5a]">{firstMammal.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5a5a5a]/85">{language === 'tr' ? 'Bu yapraktan sonra diğer memeli yaprağına geçebilirsin.' : 'You can move to the next mammal leaf after this one.'}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsTurningPage(true)}
                    aria-label={language === 'tr' ? 'Sonraki yaprağa geç' : 'Go to next leaf'}
                    className="absolute bottom-4 right-4 z-30 flex h-8 w-8 items-center justify-center bg-transparent text-[#000000] transition-transform duration-300 hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256" className="h-8 w-8">
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>
                  </button>
                </div>
              ),
            },
          ]
        : []),
      ...(secondMammal
        ? [
            {
              left: (
                <div className="pr-4 md:pr-8">
                  <div className="relative mb-6 inline-flex items-baseline gap-3">
                    <span className="text-[0.78rem] uppercase tracking-[0.18em] text-[#5a5a5a]/70" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                      Chapter
                    </span>
                    <span className="inline-block text-[1.35rem] leading-none" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive', letterSpacing: '0.08em', color: '#5a5a5a', fontWeight: 'bold' }} aria-hidden="true">
                      Ⅰ
                    </span>
                  </div>

                  <h2 className="mb-4 text-5xl font-serif text-[#5a5a5a] sm:text-6xl" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                    {secondMammal.name}
                  </h2>

                  <p className="mb-2 text-sm italic text-[#5a5a5a]/80">{secondMammal.scientificName}</p>
                  <p className="mb-6 max-w-xl text-base leading-7 text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                    {secondMammal.description}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <article className="rounded-2xl border border-[#8d6c40]/25 bg-[#f5e6bd]/70 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#5a5a5a]/60">Beslenme</p>
                      <p className="mt-1 text-[#5a5a5a]">{secondMammal.diet}</p>
                    </article>
                    <article className="rounded-2xl border border-[#8d6c40]/25 bg-[#f5e6bd]/70 p-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#5a5a5a]/60">Bölge</p>
                      <p className="mt-1 text-[#5a5a5a]">{secondMammal.region.join(', ')}</p>
                    </article>
                  </div>
                </div>
              ),
              right: (
                <div className="relative h-full min-h-[29rem] sm:min-h-[31rem]">
                  <div className="rounded-3xl border border-[#8d6c40]/20 bg-[#f5e6bd]/65 p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#5a5a5a]/55">Preview</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[#5a5a5a]">{secondMammal.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5a5a5a]/85">{language === 'tr' ? 'Sonraki tıklama ilk yaprağa döner.' : 'The next click returns to the first leaf.'}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsTurningPage(true)}
                    aria-label={language === 'tr' ? 'Sonraki yaprağa geç' : 'Go to next leaf'}
                    className="absolute bottom-4 right-4 z-30 flex h-8 w-8 items-center justify-center bg-transparent text-[#000000] transition-transform duration-300 hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256" className="h-8 w-8">
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>
                  </button>
                </div>
              ),
            },
          ]
        : []),
    ];

    const activeLeaf = leafPages[pageIndex % leafPages.length];

    return (
      <div className={`relative flex-1 mx-auto w-full max-w-[88rem] px-4 py-4 sm:py-5 transition-all duration-500 ${isTurningPage ? 'opacity-0 translate-x-10 scale-[0.985]' : 'opacity-100 translate-x-0 scale-100'}`}>
        <NotebookSpread
          leftNotes={[]}
          rightNotes={[]}
          size="xl"
          stickyMode="page"
          showHomeSticky={false}
          leftContent={activeLeaf.left}
          rightContent={activeLeaf.right}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 mx-auto w-full max-w-6xl px-4 py-12">
      <section className="rounded-2xl border border-teal-300/40 bg-black/35 p-6 backdrop-blur-sm">
        <h1 className="mb-2 text-4xl font-bold text-teal-100">🦌 {text.title}</h1>
        <p className="mb-6 text-teal-50/85">{text.intro}</p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {text.items.map((item) => {
            const slug = slugify(item);
            return (
              <article key={item} className="rounded-xl border border-teal-200/35 bg-teal-900/30 p-4">
                <h2 className="text-2xl font-semibold text-teal-100">
                  <Link href={`/nature/animals/${key}/${slug}`} className="hover:underline">
                    {item}
                  </Link>
                </h2>
              </article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/nature/animals" className="rounded-lg border border-teal-200/60 bg-teal-100/15 px-4 py-2 font-medium text-teal-100 transition hover:bg-teal-100/25">
            {language === 'tr' ? 'Hayvan kategorilerine don' : 'Back to animal categories'}
          </Link>
          <Link href="/" className="rounded-lg border border-teal-200/60 bg-teal-100/15 px-4 py-2 font-medium text-teal-100 transition hover:bg-teal-100/25">
            {language === 'tr' ? 'Ana sayfaya don' : 'Back to home'}
          </Link>
        </div>
      </section>
    </div>
  );
}
