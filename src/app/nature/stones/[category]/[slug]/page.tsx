import Link from 'next/link';
import { stones } from '@/data/stones';
import { Stone } from '@/types';

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

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

export default function StoneDetailPage({ params }: { params: { category: string; slug: string } }) {
  const { slug } = params;
  const byId = stones.find((s) => s.id === slug);
  const byName = stones.find((s) => slugify(s.name) === slug);
  const stone: Stone | undefined = byId ?? byName;

  if (!stone) {
    const title = titleFromSlug(slug);
    return (
      <div className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
        <section className="rounded-2xl border border-zinc-300/40 bg-black/35 p-6 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold text-zinc-100">{title}</h1>
          <p className="mb-4 text-zinc-100/85">Bu öğe için ayrıntılı veri bulunamadı. Sonra içerik ekleyebilirsiniz.</p>
          <div className="flex gap-3">
            <Link href={`/nature/stones/${params.category}`} className="rounded-lg border border-zinc-200/60 bg-zinc-100/10 px-4 py-2 font-medium text-zinc-100">
              Kategoriye dön
            </Link>
            <Link href="/nature/stones" className="rounded-lg border border-zinc-200/60 bg-zinc-100/10 px-4 py-2 font-medium text-zinc-100">
              Tüm taş kategorileri
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
      <article className="rounded-2xl border border-zinc-300/40 bg-black/35 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          <img src={stone.image} alt={stone.name} className="h-48 w-full rounded-lg object-cover md:w-56" />

          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-zinc-100">{stone.name}</h1>
            <p className="mb-4 text-zinc-100/85">{stone.description}</p>

            <dl className="grid grid-cols-2 gap-2 text-zinc-100/85">
              <div>
                <dt className="font-semibold">Tip</dt>
                <dd>{stone.type}</dd>
              </div>
              <div>
                <dt className="font-semibold">Sertlik</dt>
                <dd>{stone.hardness ?? '—'}</dd>
              </div>
              <div>
                <dt className="font-semibold">Renk</dt>
                <dd>{stone.color ?? '—'}</dd>
              </div>
              <div>
                <dt className="font-semibold">Bölge</dt>
                <dd>{stone.region.join(', ')}</dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-3">
              <Link href={`/nature/stones/${params.category}`} className="rounded-lg border border-zinc-200/60 bg-zinc-100/10 px-4 py-2 font-medium text-zinc-100">
                Kategoriye dön
              </Link>
              <Link href="/nature/stones" className="rounded-lg border border-zinc-200/60 bg-zinc-100/10 px-4 py-2 font-medium text-zinc-100">
                Tüm taş kategorileri
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
