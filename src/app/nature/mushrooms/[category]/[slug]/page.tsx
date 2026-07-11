import type { Metadata } from 'next';
import Link from 'next/link';

type PageParams = { category: string; slug: string };

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = titleFromSlug(slug);
  return {
    title: `${title} | Nature & Sport Handbook`,
    description: `Field notes on ${title}.`,
  };
}

export default async function MushroomDetailPage({ params }: { params: Promise<PageParams> }) {
  const { slug, category } = await params;
  const title = titleFromSlug(slug);

  return (
    <div className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
      <section className="rounded-2xl border border-amber-300/40 bg-black/35 p-6 backdrop-blur-sm">
        <h1 className="mb-4 text-3xl font-bold text-amber-100">{title}</h1>
        <p className="mb-4 text-amber-50/85">
          Bu mantar için şu an detay verisi yok. Not eklemek veya içeriği geliştirmek için yönetici
          panelini kullanabilirsiniz.
        </p>
        <div className="flex gap-3">
          <Link
            href={`/nature/mushrooms/${category}`}
            className="rounded-lg border border-amber-200/60 bg-amber-100/10 px-4 py-2 font-medium text-amber-100"
          >
            Kategoriye dön
          </Link>
          <Link
            href="/nature/mushrooms"
            className="rounded-lg border border-amber-200/60 bg-amber-100/10 px-4 py-2 font-medium text-amber-100"
          >
            Tüm mantar kategorileri
          </Link>
        </div>
      </section>
    </div>
  );
}
