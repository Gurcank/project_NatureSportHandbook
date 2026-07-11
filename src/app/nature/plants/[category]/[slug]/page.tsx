import Link from 'next/link';
import { plants } from '@/data/plants';
import { Plant } from '@/types';

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

export default function PlantDetailPage({ params }: { params: { category: string; slug: string } }) {
  const { slug } = params;
  const byId = plants.find((p) => p.id === slug);
  const byName = plants.find((p) => slugify(p.name) === slug);
  const plant: Plant | undefined = byId ?? byName;

  if (!plant) {
    const title = titleFromSlug(slug);
    return (
      <div className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
        <section className="rounded-2xl border border-green-300/40 bg-black/35 p-6 backdrop-blur-sm">
          <h1 className="mb-4 text-3xl font-bold text-green-100">{title}</h1>
          <p className="mb-4 text-green-50/85">Bu öğe için ayrıntılı veri bulunamadı. Sonra içerik ekleyebilirsiniz.</p>
          <div className="flex gap-3">
            <Link href={`/nature/plants/${params.category}`} className="rounded-lg border border-green-200/60 bg-green-100/10 px-4 py-2 font-medium text-green-100">
              Kategoriye dön
            </Link>
            <Link href="/nature/plants" className="rounded-lg border border-green-200/60 bg-green-100/10 px-4 py-2 font-medium text-green-100">
              Tüm bitki kategorileri
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">
      <article className="rounded-2xl border border-emerald-300/40 bg-black/35 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-6 md:flex-row">
          <img src={plant.image} alt={plant.name} className="h-48 w-full rounded-lg object-cover md:w-56" />

          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-emerald-100">{plant.name}</h1>
            <p className="mb-1 text-sm italic text-emerald-200">{plant.scientificName}</p>
            <p className="mb-4 text-emerald-50/85">{plant.description}</p>

            <dl className="grid grid-cols-2 gap-2 text-emerald-100/85">
              <div>
                <dt className="font-semibold">Tip</dt>
                <dd>{plant.type}</dd>
              </div>
              <div>
                <dt className="font-semibold">Boy</dt>
                <dd>{plant.height ?? '—'}</dd>
              </div>
              <div>
                <dt className="font-semibold">Çiçeklenme</dt>
                <dd>{plant.blooming ?? '—'}</dd>
              </div>
              <div>
                <dt className="font-semibold">Bölge</dt>
                <dd>{plant.region.join(', ')}</dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-3">
              <Link href={`/nature/plants/${params.category}`} className="rounded-lg border border-emerald-200/60 bg-emerald-100/10 px-4 py-2 font-medium text-emerald-100">
                Kategoriye dön
              </Link>
              <Link href="/nature/plants" className="rounded-lg border border-emerald-200/60 bg-emerald-100/10 px-4 py-2 font-medium text-emerald-100">
                Tüm bitki kategorileri
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
