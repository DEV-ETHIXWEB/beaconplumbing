# Beacon Plumbing — Headless Website Rebuild

A modern, SEO-first rebuild of the Beacon Plumbing (Seattle, WA) marketing site, built with Astro, TypeScript, Tailwind CSS v4, and React islands.

## Stack

- **Astro** (static output) — pages, layouts, content
- **TypeScript** — strict mode
- **Tailwind CSS v4** — CSS-first theme in `src/styles/global.css`
- **React** — used only for genuinely interactive islands (mobile nav drawer, FAQ accordion, contact form)

## Project structure

```text
src/
├── data/          # Centralized business/content data — single source of truth
│   ├── business.ts       # NAP, license, trust badges (see file for locked values)
│   ├── services.ts       # Service taxonomy (categories + individual services)
│   ├── locations.ts      # 48 curated service-area cities, grouped by region
│   ├── navigation.ts      # Header/footer nav (derived from services.ts, not hand-typed)
│   ├── redirects.ts       # Legacy URL → new URL redirect map (see below)
│   ├── testimonials.ts, faqs.ts, offers.ts, site.ts
├── components/
│   ├── layout/     # Header, Footer, MobileNav, MobileActionBar
│   ├── sections/   # Homepage/page sections (Hero, CoreServices, PageHero, etc.)
│   ├── ui/         # Button, Container, SectionHeading, ServiceIcon
│   └── forms/      # ContactForm (React island)
├── pages/
│   ├── index.astro
│   ├── services/[category]/[service].astro   # Dynamic service pages
│   ├── service-areas/[location].astro         # Dynamic location pages
│   └── ...core pages (about, contact, reviews, offers, financing, etc.)
├── lib/seo.ts      # JSON-LD schema builders (LocalBusiness, Service, FAQPage, BreadcrumbList)
scripts/
├── validate-redirects.mjs   # Checks redirect map for chains/loops/dead targets
├── seo-audit.mjs            # Checks every built page for SEO issues
├── check-links.mjs          # Crawls all internal links, flags broken ones
└── snapshot-redirects.mjs   # Emits redirects.ts as JSON for the above scripts to read
```

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | TypeScript/Astro diagnostics |
| `npm run qa` | Full QA chain: build → check → redirects → SEO audit → link check |

## Data-driven architecture

Business information, services, and locations are defined once in `src/data/` and consumed everywhere (header, footer, schema, pages) — never hardcoded in components. See `src/data/business.ts` for the canonical NAP (phone, email, address) and notes on legacy data discrepancies that were resolved during the rebuild.

## SEO migration

The legacy WordPress site's ~8,700 crawled URLs were classified (KEEP / MERGE / REDIRECT / NOINDEX) and consolidated into this site's ~93-page architecture. `src/data/redirects.ts` maps legacy URL patterns to their new destinations; `npm run qa` validates there are no redirect chains, loops, or dead targets.

## Status

This is a local, in-progress project. See `TODO: VERIFY` and `TODO: INTEGRATION REQUIRED` comments throughout the codebase for items that need real business input (production domain, form backend, current financing terms, etc.) before launch.
