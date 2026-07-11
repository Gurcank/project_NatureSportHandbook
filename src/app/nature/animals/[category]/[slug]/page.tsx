import Link from 'next/link';
import { animals } from '@/data/animals';
import { Animal } from '@/types';

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

export default function AnimalDetailPage({ params }: { params: { category: string; slug: string } }) {
  const { slug } = params;

  const byId = animals.find((a) => a.id === slug);
  const byName = animals.find((a) => slugify(a.name) === slug);
  const animal: Animal | undefined = byId ?? byName;

  if (!animal) {
    const title = titleFromSlug(slug);
    return (
      <div className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
        <section className="rounded-2xl border border-amber-300/40 bg-black/35 p-6 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold text-amber-100">{title}</h1>
          <p className="mb-4 text-amber-50/85">Bu öğe için ayrıntılı veri bulunamadı. İsterseniz daha sonra içerik ekleyebilirsiniz.</p>
          <div className="flex gap-3">
            <Link href={`/nature/animals/${params.category}`} className="rounded-lg border border-amber-200/60 bg-amber-100/10 px-4 py-2 font-medium text-amber-100">
              Kategoriye dön
            </Link>
            <Link href="/nature/animals" className="rounded-lg border border-amber-200/60 bg-amber-100/10 px-4 py-2 font-medium text-amber-100">
              Tüm hayvan kategorileri
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
      <article className="rounded-2xl border border-sky-300/40 bg-black/35 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          <img src={animal.image} alt={animal.name} className="h-48 w-full rounded-lg object-cover md:w-56" />

          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-sky-100">{animal.name}</h1>
            <p className="mb-1 text-sm italic text-sky-200">{animal.scientificName}</p>
            <p className="mb-4 text-sky-50/85">{animal.description}</p>

            <dl className="grid grid-cols-2 gap-2 text-sky-100/85">
              <div>
                <dt className="font-semibold">Tip</dt>
                <dd>{animal.type}</dd>
              </div>
              <div>
                <dt className="font-semibold">Beslenme</dt>
                <dd>{animal.diet ?? '—'}</dd>
              </div>
              <div>
                <dt className="font-semibold">Habitat</dt>
                <dd>{animal.habitat ?? '—'}</dd>
              </div>
              <div>
                <dt className="font-semibold">Bölge</dt>
                <dd>{animal.region.join(', ')}</dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-3">
              <Link href={`/nature/animals/${params.category}`} className="rounded-lg border border-sky-200/60 bg-sky-100/10 px-4 py-2 font-medium text-sky-100">
                Kategoriye dön
              </Link>
              <Link href="/nature/animals" className="rounded-lg border border-sky-200/60 bg-sky-100/10 px-4 py-2 font-medium text-sky-100">
                Tüm hayvan kategorileri
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
