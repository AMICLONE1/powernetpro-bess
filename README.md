# PowerNetPro Website

Marketing and lead-generation website for **PowerNetPro Pvt. Ltd.** — battery
energy storage (BESS) and solar EPC, serving Pune and Maharashtra.

Built to the three source documents in the parent folder (PRD, TRD, Design
Document). The whole site is a funnel toward one action: **free-audit requests**.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router), TypeScript |
| Styling | Tailwind CSS (design tokens in `tailwind.config.ts`) |
| UI motion | Framer Motion |
| Scroll sequences | GSAP + ScrollTrigger (lazy-loaded) |
| 3D | React Three Fiber / three.js (lazy-loaded) |
| Forms | React Hook Form + Zod |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in when wiring real services
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`, `npm run lint`.

## Project structure

```
src/
  app/                 App Router pages (all P0/P1 routes) + sitemap/robots
    free-audit/        Conversion page + server action (actions.ts)
  components/
    audit/             Audit form + bill upload
    calculator/        Sizing + 10-year TCO calculators
    layout/            Header, Footer, sticky mobile CTA
    motion/            Reveal / stagger (respects reduced-motion)
    sections/          Hero, AudienceSelector, CTABand
    sequences/         Flagship animations 3, 4, 5 (SVG / Framer)
    three/             Flagship animations 1, 2 (R3F) + static fallbacks
    ui/                Buttons, cards, fields, tables, expandable, icons, logo
  lib/                 site-config, sizing, solutions, seo, analytics, schemas
  server/              Mocked backend services (the seams for real infra)
```

## What is real vs. mocked

This build is a **complete frontend with a mocked backend**. Everything the
visitor sees and does works end to end; the parts that need real accounts are
stubbed behind clean interfaces so they drop in without touching the UI.

- **Mocked** (`src/server/services.ts`): lead storage, sales notification,
  acknowledgement email, bill registration. They log and return success.
- **Placeholder** (`src/lib/site-config.ts`): phone, WhatsApp, email, domain,
  address. **Search for `TODO` before launch.**
- **Placeholder content** (`src/lib/content.ts`, `solutions.ts`): copy, project
  case studies, stats, TCO/pricing coefficients. Replace with real, consented
  data (PRD §6).
- **Procedural 3D**: battery pack/cell geometry is generated in R3F as a
  stand-in for polished `.glb` models. Swap the models in
  `components/three/BatteryPackModel.tsx` / `AssemblyScene.tsx` — the animation
  code does not change.

## The five flagship animations (Design Doc §3)

Each has a **tested static fallback** and honours `prefers-reduced-motion`
(PRD F-08). 3D + GSAP are lazy-loaded and gated on a device-capability check
(`lib/use-capability.ts`): reduced-motion, no-WebGL and low-end devices get the
static version and never download the heavy chunks.

1. **Hero — pack revealed** (R3F, scroll-scrubbed) → `three/HeroSequence.tsx`
2. **Cell → module → pack** (R3F staged assembly) → `three/AssemblySequence.tsx`
3. **Charge / discharge / backup** (SVG) → `sequences/EnergyFlow.tsx`
4. **Lithium vs lead-acid cutaway** (SVG) → `sequences/BatteryCutaway.tsx`
5. **Installation flow** (Framer Motion) → `sequences/InstallationFlow.tsx`

## Before launch — critical checklist

- [ ] Replace all `TODO` placeholders in `site-config.ts` with real details.
- [ ] Replace placeholder copy, projects, stats and pricing coefficients.
- [ ] **DPDP (mandatory):** wire real encrypted S3 storage with pre-signed
      uploads, SSE, 12-month lifecycle deletion, virus scan and EXIF strip
      (`services.ts` / `actions.ts`). Bills must never route to a personal inbox.
- [ ] Have the Privacy Policy and Terms reviewed and approved by a legal adviser
      (currently marked **draft**). They are linked from the audit form.
- [ ] Add server-side spam protection (Turnstile) + rate limiting.
- [ ] Tighten the CSP in `next.config.mjs` (dev CSP is permissive for R3F/HMR).
- [ ] Add the GA4 script and verify events fire (event names in
      `lib/analytics.ts` match TRD §7.2).
- [ ] Swap procedural 3D for artist `.glb` models.
- [ ] Run Lighthouse (target ≥90 mobile), screen-reader and cross-browser QA.

## Ownership (TRD §11)

Register the domain, hosting and analytics accounts in PowerNetPro's name from
day one, and keep the repository under PowerNetPro ownership.
