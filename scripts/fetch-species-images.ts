/**
 * Pulls one photograph per species from Wikipedia/Wikimedia Commons, stores it
 * locally, and records who took it under which licence.
 *
 * Hotlinking Commons would leave the handbook depending on someone else's
 * uptime, blocked from `next/image` optimisation, and — more importantly —
 * showing CC-BY-SA photographs with no attribution. Downloading at build time
 * fixes all three.
 *
 *   npx tsx scripts/fetch-species-images.ts [--force] [--only=mammals,birds]
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { sections } from '../src/lib/book';
import type { SpeciesEntry } from '../src/types';

// Wikimedia asks for a descriptive agent naming the tool and a contact.
const USER_AGENT =
  'NatureSportHandbook/0.1 (https://github.com/GurcanK/NatureSportHandbook; karadagurcan@gmail.com)';

const OUTPUT_ROOT = path.join(process.cwd(), 'public', 'images', 'species');
const CREDITS_FILE = path.join(process.cwd(), 'src', 'data', 'generated', 'image-credits.json');
const MISSING_FILE = path.join(process.cwd(), 'scripts', 'missing-images.json');

/**
 * Photographs are stored uncropped: the long edge is capped and the aspect
 * ratio is kept, so nothing is cut off the sides of a wide animal or the top
 * of a tall tree. The polaroid frame letterboxes whatever shape arrives.
 */
const MAX_LONG_EDGE = 1280;
const SOURCE_WIDTH = 1280;
/** Concurrent lookups. Kept low deliberately: this is someone else's free API. */
const CONCURRENCY = 2;
const REQUEST_SPACING_MS = 120;
const MAX_RETRIES = 4;

type Credit = {
  file: string;
  artist: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

type Failure = { id: string; scientificName: string; reason: string };

/**
 * Lookup keys for entries whose scientific name or English name does not match
 * a Wikipedia article — a mineral formula, a sport's title case, or a genus
 * where the species page carries no photograph.
 */
const IMAGE_QUERY_OVERRIDES: Record<string, string> = {
  'reptiles-sand-boa': 'Sand boa',
  'plants-flowering-kupe-cicegi': 'Fuchsia',
  'plants-flowering-cuha-cicegi': 'Primula vulgaris',
  'plants-flowering-gul': 'Rose',
  'plants-flowering-glayol': 'Gladiolus',
  'plants-flowering-yildiz-cicegi': 'Dahlia',
  'fungi-lichens-beard-lichen': 'Usnea',
  'stones-sedimentary-conglomerate': 'Conglomerate (geology)',
  'stones-sedimentary-fossiliferous-limestone': 'Coquina',
  'stones-minerals-muscovite': 'Muscovite',
  'stones-minerals-olivine': 'Olivine',
  'land-sports-trail-running': 'Trail running',
  'water-sports-paddleboarding': 'Standup paddleboarding',
  'air-sports-wingsuit-flying': 'Wingsuit flying',
  'air-sports-base-jumping': 'BASE jumping',
  'air-sports-ballooning': 'Hot air balloon',
  'air-sports-speed-flying': 'Speed flying',
};

const force = process.argv.includes('--force');
const onlyArg = process.argv.find((arg) => arg.startsWith('--only='));
const onlyCategories = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',')) : null;
const idsArg = process.argv.find((arg) => arg.startsWith('--ids='));
const onlyIds = idsArg ? new Set(idsArg.slice('--ids='.length).split(',')) : null;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wikimedia throttles bulk callers with 429s. Treating those as "this species
 * has no photograph" silently loses most of the catalogue, so back off and
 * retry instead, and let a genuine 404 through as null.
 */
async function fetchWithRetry(url: string): Promise<Response | null> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (response.ok) return response;

    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable) return null;

    const retryAfter = Number(response.headers.get('retry-after'));
    const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
      ? retryAfter * 1000
      : 700 * 2 ** attempt;
    await sleep(waitMs);
  }
  return null;
}

async function fetchJson(url: string): Promise<unknown | null> {
  const response = await fetchWithRetry(url);
  if (!response) return null;
  await sleep(REQUEST_SPACING_MS);
  return response.json();
}

/** Strips the HTML Commons puts in its metadata fields. */
function plainText(value: string): string {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

type Summary = { thumbnail?: { source?: string }; originalimage?: { source?: string } };

async function lookupImageUrl(title: string): Promise<string | null> {
  const summary = (await fetchJson(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}?redirect=true`,
  )) as Summary | null;

  // Prefer the thumbnail: it is always a /thumb/ URL, so the width can be
  // rewritten. `originalimage` can be a 20MB scan of the original plate.
  const source = summary?.thumbnail?.source ?? summary?.originalimage?.source;
  if (!source) return null;

  // Skip vector placeholders and the generic "no image" icons.
  if (/\.svg$/i.test(stripQuery(source))) return null;
  return source;
}

function stripQuery(url: string): string {
  const index = url.indexOf('?');
  return index === -1 ? url : url.slice(0, index);
}

/**
 * Rewrites an upload.wikimedia.org URL to a thumbnail of the width we want,
 * building the /thumb/ path when the URL points straight at the original.
 */
function atWidth(url: string, width: number): string {
  const clean = stripQuery(url);

  if (clean.includes('/thumb/')) {
    return clean.replace(/\/\d+px-([^/]+)$/, `/${width}px-$1`);
  }

  const direct = clean.match(/^(.*\/wikipedia\/[^/]+)\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/);
  if (!direct) return clean;
  const [, base, first, second, file] = direct;
  return `${base}/thumb/${first}/${second}/${file}/${width}px-${file}`;
}

function commonsFileName(url: string): string | null {
  const clean = stripQuery(url);
  const thumb = clean.match(/\/thumb\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)\//);
  if (thumb) return decodeURIComponent(thumb[1]);
  const direct = clean.match(/\/[0-9a-f]\/[0-9a-f]{2}\/([^/]+)$/);
  return direct ? decodeURIComponent(direct[1]) : null;
}

/** Files can live on Commons or locally on the English Wikipedia. */
function apiHostFor(url: string): string {
  return stripQuery(url).includes('/wikipedia/commons/')
    ? 'https://commons.wikimedia.org'
    : 'https://en.wikipedia.org';
}

type ImageInfoResponse = {
  query?: {
    pages?: Record<
      string,
      { imageinfo?: { descriptionurl?: string; extmetadata?: Record<string, { value?: string }> }[] }
    >;
  };
};

async function lookupCredit(imageUrl: string): Promise<Omit<Credit, 'file'> | null> {
  const fileName = commonsFileName(imageUrl);
  if (!fileName) return null;

  const api = `${apiHostFor(imageUrl)}/w/api.php?action=query&format=json&prop=imageinfo&iiprop=extmetadata%7Curl&titles=${encodeURIComponent(
    `File:${fileName}`,
  )}`;

  const data = (await fetchJson(api)) as ImageInfoResponse | null;
  const page = Object.values(data?.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  const meta = info?.extmetadata ?? {};

  return {
    artist: plainText(meta.Artist?.value ?? meta.Credit?.value ?? 'Unknown'),
    license: plainText(meta.LicenseShortName?.value ?? 'See source'),
    licenseUrl: meta.LicenseUrl?.value ?? '',
    sourceUrl: info?.descriptionurl ?? imageUrl,
  };
}

async function downloadAndConvert(url: string, destination: string): Promise<boolean> {
  const response = await fetchWithRetry(url);
  if (!response) return false;

  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(destination), { recursive: true });
  await sharp(buffer)
    .resize(MAX_LONG_EDGE, MAX_LONG_EDGE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(destination);
  return true;
}

async function processEntry(
  entry: SpeciesEntry,
  credits: Record<string, Credit>,
  failures: Failure[],
): Promise<void> {
  const relativeFile = `${entry.categoryId}/${entry.id}.webp`;
  const destination = path.join(OUTPUT_ROOT, relativeFile);

  if (!force && existsSync(destination) && credits[entry.id]) return;

  // The scientific name is the reliable key; the common name is the fallback
  // for entries whose taxon has no article of its own.
  const candidates = [
    IMAGE_QUERY_OVERRIDES[entry.id],
    entry.scientificName,
    entry.name.en,
  ].filter((value): value is string => Boolean(value && value.trim() !== ''));

  for (const candidate of candidates) {
    try {
      const imageUrl = await lookupImageUrl(candidate);
      if (!imageUrl) continue;

      const ok = await downloadAndConvert(atWidth(imageUrl, SOURCE_WIDTH), destination);
      if (!ok) continue;

      const credit = await lookupCredit(imageUrl);
      credits[entry.id] = {
        file: relativeFile,
        artist: credit?.artist ?? 'Unknown',
        license: credit?.license ?? 'See source',
        licenseUrl: credit?.licenseUrl ?? '',
        sourceUrl: credit?.sourceUrl ?? imageUrl,
      };
      return;
    } catch (error) {
      failures.push({
        id: entry.id,
        scientificName: entry.scientificName,
        reason: error instanceof Error ? error.message : String(error),
      });
      return;
    }
  }

  failures.push({ id: entry.id, scientificName: entry.scientificName, reason: 'no image found' });
}

async function main() {
  const entries = sections
    .flatMap((section) => (section.kind === 'entries' ? section.entries : []))
    .filter((entry) => !onlyCategories || onlyCategories.has(entry.categoryId))
    .filter((entry) => !onlyIds || onlyIds.has(entry.id));
  const credits: Record<string, Credit> = existsSync(CREDITS_FILE)
    ? JSON.parse(await readFile(CREDITS_FILE, 'utf8'))
    : {};
  const failures: Failure[] = [];

  console.log(`Fetching photographs for ${entries.length} entries...`);

  let cursor = 0;
  let done = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < entries.length) {
      const entry = entries[cursor];
      cursor += 1;
      await processEntry(entry, credits, failures);
      done += 1;
      if (done % 25 === 0) console.log(`  ${done}/${entries.length}`);
    }
  });

  await Promise.all(workers);

  await mkdir(path.dirname(CREDITS_FILE), { recursive: true });
  await writeFile(CREDITS_FILE, `${JSON.stringify(credits, null, 2)}\n`);
  await writeFile(MISSING_FILE, `${JSON.stringify(failures, null, 2)}\n`);

  console.log(`\nStored ${Object.keys(credits).length} photographs.`);
  console.log(`${failures.length} entries have no photograph; see ${MISSING_FILE}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
