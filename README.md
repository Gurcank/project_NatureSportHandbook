# Nature & Sport Handbook

A bilingual (Turkish/English) field-notes handbook for nature explorers: browsable
entries for mammals, birds, reptiles, fish, amphibians, insects, plants, mushrooms,
and stones, plus notes on hiking, trekking, water sports, and air sports. Built with
Next.js (App Router) and static content — no backend or database.

## Requirements

- Node.js `>=20.9.0` (see `.nvmrc`; run `nvm use` if you use nvm)
- npm (the project uses `package-lock.json`)

## Setup

```bash
npm install
cp .env.example .env.local   # optional for local dev, see below
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable               | Required | Default                 | Description                                                                 |
| ----------------------- | -------- | ------------------------ | ----------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | No       | `http://localhost:3000` | Public site URL used for SEO metadata (Open Graph, `robots.txt`, `sitemap.xml`). Set to the real production URL when deploying. |

See `.env.example` for the canonical list.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run format` | Format `src/` with Prettier |
| `npm run test` | Run the Vitest suite |

## Docker

```bash
docker build -t nature-sport-handbook .
docker run -p 3000:3000 nature-sport-handbook
```

or with Compose:

```bash
docker compose up --build
```

The image is a multi-stage build using Next's `output: 'standalone'` mode and runs
as a non-root user. It exposes an HTTP health check at `/api/health`.

## Deployment notes

This is a standard Next.js App Router app with no server-side state, so it deploys
cleanly to most platforms:

- **Vercel**: zero-config, recommended for the simplest setup (native Next.js support).
- **Any Docker host** (Fly.io, Railway, a VPS, ECS, Cloud Run, etc.): use the included
  `Dockerfile`. Set `NEXT_PUBLIC_SITE_URL` to the deployed URL.
- **VPS without Docker**: `npm ci && npm run build && npm run start`, put a reverse
  proxy (e.g. nginx) in front for TLS.

Wherever you deploy, set `NEXT_PUBLIC_SITE_URL` to the real public URL so Open Graph
tags, `robots.txt`, and `sitemap.xml` point at the right place.

## Project structure

```
src/app/       Routes (App Router) — pages, layouts, API route(s), robots/sitemap
src/components/  Shared UI components
src/data/      Static content data (per-category arrays)
src/lib/       Pure helper modules (slugs, search matching, icons, translations)
src/context/   React context (language/theme settings)
scripts/       One-off data-generation scripts used while building the datasets
               (not part of the running app)
```
