import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Book from '@/components/book/Book';
import Meadow from '@/components/scene/Meadow';
import Stage from '@/components/scene/Stage';
import Tabletop from '@/components/scene/Tabletop';
import { HOME_TITLE, sectionBySlug, sections } from '@/lib/book';

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

function slugPath(slug: string[] | undefined): string {
  return slug?.length ? `/${slug.join('/')}` : '/';
}

export function generateStaticParams() {
  return sections.map((section) => ({
    slug: section.slug === '/' ? [] : section.slug.slice(1).split('/'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const section = sectionBySlug(slugPath((await params).slug));
  if (!section) return {};

  const title = section.kind === 'cover' ? HOME_TITLE.en : `${section.title.en} · ${HOME_TITLE.en}`;

  return {
    title,
    alternates: { canonical: section.slug },
  };
}

export default async function BookPage({ params }: PageProps) {
  const section = sectionBySlug(slugPath((await params).slug));
  if (!section) notFound();

  return (
    <main className="stage-root">
      <Stage>
        <Meadow />
        <Tabletop>
          {/* .book-stage keeps clear the strip either side that the index tabs
              hang into; without it they are pulled off the edge of the table. */}
          <div className="book-stage flex justify-center">
            <Book initialSectionId={section.id} />
          </div>
        </Tabletop>
      </Stage>
    </main>
  );
}
