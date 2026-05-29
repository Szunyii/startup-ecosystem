# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Public-facing portal for the Hungarian Innovation Agency (NIÜ) presenting the Hungarian startup ecosystem: startup directory, sector insights, funding programs, legal library, ecosystem partners, and event listings. Deployed at `startup.niu.hu`, content is primarily English; the HTML root locale is `hu-HU`.

## Commands

- `npm run dev` — start Next.js dev server (port 3000)
- `npm run build` — production build (`next build`)
- `npm run start` — run the built app
- `npm run lint` — Next.js ESLint check
- `npx prisma db pull` — refresh `prisma/schema.prisma` from the live MySQL DB (`DATABASE_URL` in `.env`)
- `npx prisma generate` — regenerate the Prisma client (also runs automatically via `postinstall`)

Notes:
- `next.config.mjs` sets `eslint.ignoreDuringBuilds: true`, so `next build` does not fail on lint errors — run `npm run lint` explicitly when validating changes.
- `package.json` defines `npm run seed` → `node script/seed.js`, but the `script/` directory does not exist in the repo. Don't rely on it without creating it.
- `.github/workflows/webpack.yml` runs `npx webpack` on push to `main`, which doesn't match this Next.js project. The workflow is stale; CI is effectively a no-op build check.

## Architecture

### Stack
- **Next.js 15 App Router** with **React 19** (RSC enabled, `rsc: true` in `components.json`)
- **TypeScript** with `@/*` → `./src/*` path alias
- **Prisma 5** ORM against **MySQL** — the schema is pulled from an existing database, not migration-driven
- **Tailwind CSS** + **shadcn/ui** components (Radix UI primitives) — base color `neutral`, CSS variables enabled
- **react-hook-form** + **zod** for forms and validation (`src/lib/validation.ts`)
- **nodemailer** for transactional mail, **react-email** for templates
- **recharts** for charts, **framer-motion** for animations, **embla-carousel-react** for carousels

### Routes (`src/app/`)
Each top-level folder is a route. Notable pages:
- `/` — home with `HeroConstellation` (sampling active startups from `startup_test`) and event listings
- `/startup` — startup directory (`StartupBrowser`), backed by `startup_year_data_test` joined to `startup_test`, filtered by `year` query param (default `2024`)
- `/ecosystem` — partner atlas, read from static `src/data/partner.json`
- `/funding-opportunities`, `/highlighted-sectors`, `/legal-library`, `/why-hungary`, `/startup-overview`, `/disclaimer` — content pages
- `/registry`, `/voucher` — registration forms that write to `startupRegistry` / `ecosystemRegistry` / `kkv_registry`
- `/newsletter`, `/mailer-test` — server actions wrapping `sendMail`

`src/app/sitemap.ts` and `src/app/robots.ts` define SEO surface; `src/lib/seo.ts` exposes `SITE_URL` (overridable via `NEXT_PUBLIC_SITE_URL`), `SITE_NAME`, and `DEFAULT_OG_IMAGE`. Per-route `metadata` exports set canonical URLs and OpenGraph.

### Data layer
- `src/lib/db/prisma.ts` exports a singleton `prisma` client (with a `globalThis` guard for hot-reload in dev). Always import from here — do not instantiate `PrismaClient` ad hoc.
- `prisma/schema.prisma` contains many historical iterations of startup tables. The **current canonical pair is `startup_test` + `startup_year_data_test`** (related by `taxnumber` FK). The older `startup_data`, `startup_data_new`, `startup_data_year`, `startup_data_final`, `startupOptenImport`, `scaleupOptenImport`, `deeptech_seged` models are kept for data lineage; prefer the `_test` tables for new reads.
- Server-side mutations live in `*-actions.ts` / `actions.ts` files (e.g. `src/lib/startup-actions.ts`, `src/app/voucher/actions.ts`, `src/app/newsletter/actions.ts`), all marked `"use server"`.
- Some content is shipped as static JSON in `src/data/` (`partner.json`, `events.json`, `startup_events.json`, `supportPrograms.json`, `sh_library.json`, `startupdata.json`).

### Components
- `src/components/ui/` — shadcn primitives (button, dialog, form, table, etc.). Treat these as generated; modify with care.
- `src/components/` — feature components. Naming is mixed (`StartupDataTable.tsx`, `EcosystemGrid.tsx`, `HeroConstellation.tsx`, `Fotter.tsx` (sic — keep the typo when importing)).
- Pattern: a page server component fetches via Prisma and renders a `*Client.tsx` companion for interactive parts (e.g. `ActiveStartupsList.tsx` + `ActiveStartupsListClient.tsx`, `FundingTrendChart.tsx` + `FundingTrendChartClient.tsx`, `SectorBarChart.tsx` + `SectorChartClient.tsx`).
- `src/components/email/WelcomeEmail.tsx` is a react-email template invoked from server actions via `src/lib/mailer.ts`.

### Email
`src/lib/mailer.ts` reads SMTP config from env (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, optional `SMTP_FROM`) and caches a single transporter. It calls `transporter.verify()` before every send and logs verbose output to stdout — don't strip those logs without checking why; debugging deliverability has historically depended on them.

### Validation
Form schemas (`startupFormSchema`, `ecosystemFormSchema`, `kkvRegistry`) live in `src/lib/validation.ts` and are shared between the client form and the server action. Each requires `acceptTerms === true`.

### Styling
- Theme variables defined as HSL CSS vars (`--background`, `--foreground`, `--primary`, …) in `src/app/globals.css` and consumed via Tailwind colors.
- Body has a hard-coded background `bg-[#120937]` and a `grainy` utility class — page content sits inside `MaxWidthWrapper`.
- `darkMode: ["class"]` is configured but the site renders in a single dark theme.

## Conventions

- Use the `@/` alias for all internal imports.
- Never instantiate `PrismaClient` directly — import the singleton from `@/lib/db/prisma`.
- Server actions go in `*-actions.ts` (or co-located `actions.ts`) and start with `"use server"`.
- When pulling new DB columns, run `npx prisma db pull` then `npx prisma generate`; the schema file is generated, edits to it will be overwritten.
- Hungarian numeric/currency formatting helpers live in `src/lib/utils.ts` (`formatHuf`, `formatPerc`, `toPercent`) — reuse rather than reformat inline.
- The `Fotter` component is intentionally misspelled in the filename; the import path is `@/components/Fotter`.

## Environment

Required env vars (see `.env`):
- `DATABASE_URL` — MySQL connection string used by Prisma
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — required by `getMailer()` whenever a mail-sending action runs
- `NEXT_PUBLIC_SITE_URL` — optional, falls back to `https://startup.niu.hu` for canonical URLs and sitemap entries

Google Analytics ID (`G-11RET9835Q`) is hard-coded in `src/app/layout.tsx`.
