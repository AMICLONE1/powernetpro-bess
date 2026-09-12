import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
// The Three.js 3D hero is preserved and NOT deleted. To bring it back, import
// { HeroScene } from "@/components/sections/HeroScene" and render <HeroScene />
// in place of <Hero /> below. See docs/hero-3d.md for the full teardown/rebuild
// notes (the scene lives in src/components/hero3d/).
import { AudienceSelector } from "@/components/sections/AudienceSelector";
import { Partners } from "@/components/sections/Partners";
import { ProjectsTable } from "@/components/sections/ProjectsTable";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FAQ } from "@/components/sections/FAQ";
import { CTABand } from "@/components/sections/CTABand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { Button, ArrowRight } from "@/components/ui/Button";
import { differentiators, solarPoints } from "@/lib/content";
import { media } from "@/lib/media";

export const metadata = buildMetadata({
  title: "PowerNetPro — Battery Storage & Solar EPC in Pune",
  description:
    "Silent, no-maintenance battery energy storage and solar EPC for homes, societies, offices and industry across Pune and Maharashtra. We supply both lithium and lead-acid. Get a free energy audit.",
  path: "/",
});

const heroStats = [
  { n: "0 dB", l: "Silent operation" },
  { n: "10 yr+", l: "LFP battery life" },
  { n: "< 20 ms", l: "Backup switchover" },
  { n: "2 days", l: "Audit response" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stat strip */}
      <section className="border-b border-hairline bg-surface">
        <div className="container-content grid grid-cols-2 divide-x divide-y divide-hairline sm:divide-y-0 lg:grid-cols-4">
          {heroStats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05} className="px-4 py-8 text-center lg:py-10">
              <div className="nums inline-block font-display text-h2 text-ink transition-transform duration-200 hover:scale-105">{s.n}</div>
              <div className="mt-1 text-caption uppercase tracking-wide text-ink-3">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Partners — looping wordmark marquee */}
      <Partners />

      {/* Audience selector */}
      <section className="py-12 lg:py-16">
        <div className="container-content">
          <SectionHeading kicker="Who it's for" title="One technology, four very different needs" lead="Tell us who you are — we'll show you what matters to you, nothing else." />
          <div className="mt-8 lg:mt-10"><AudienceSelector /></div>
        </div>
      </section>

      {/* How storage works — interactive stepper */}
      <HowItWorks />

      {/* Both chemistries */}
      <section className="section-y">
        <div className="container-content">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Media src={media.wiring} alt="Battery installation wiring detail" ratio="4/3" rounded="card-lg" />
            </Reveal>
            <Reveal delay={0.1}>
              <span className="kicker"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Lithium & lead-acid</span>
              <h2 className="mt-5 font-display text-h2 text-ink">We supply both — and tell you which fits</h2>
              <p className="mt-5 text-body-lg text-ink-2">
                Most jobs are best on lithium (LFP). But for a tight budget, low-cycling or backup-only duty,
                <span className="font-semibold text-ink"> we also supply lead-acid batteries</span> when they&apos;re genuinely the smarter buy. No overselling — the audit tells you honestly.
              </p>
              <Link href="/lithium-vs-lead-acid" className="group mt-7 inline-flex items-center gap-1.5 text-body-lg font-semibold text-accent hover:underline">
                Compare lithium vs lead-acid <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why PowerNetPro */}
      <section className="border-y border-hairline bg-surface">
        <div className="container-content section-y">
          <SectionHeading kicker="Why PowerNetPro" title="Engineering you can point at" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-card border border-hairline bg-bg p-6">
                  <p className="nums font-display text-[2rem] leading-none text-accent">{d.stat}</p>
                  <p className="mt-1 text-caption uppercase tracking-wide text-ink-3">{d.statLabel}</p>
                  <h3 className="mt-5 font-display text-h3 text-ink">{d.title}</h3>
                  <p className="mt-2 flex-1 text-body text-ink-2">{d.proof}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews — auto-scroll */}
      <Reviews />

      {/* Process — scroll-driven timeline */}
      <div className="border-y border-hairline bg-surface"><ProcessSteps /></div>

      {/* Projects — categories delivered */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="Track record" title="Systems we've delivered" lead="A snapshot of storage systems commissioned across homes and businesses — by type, size and configuration." />
          <div className="mt-10 lg:mt-12"><ProjectsTable /></div>
        </div>
      </section>

      {/* Solar teaser */}
      <section className="border-t border-hairline bg-surface">
        <div className="container-content section-y">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="kicker"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Solar EPC</span>
              <h2 className="mt-5 font-display text-h2 text-ink">Better with the sun on top</h2>
              <ul className="mt-6 space-y-3">
                {solarPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-body text-ink-2"><Check /> {point}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/solar" className="group inline-flex items-center gap-1.5 text-body-lg font-semibold text-accent hover:underline">
                  Explore Solar EPC <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/solar/partner" className="group inline-flex items-center gap-1.5 text-body-lg font-semibold text-ink hover:text-accent">
                  Solar installer? Partner with us <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Media src={media.rooftopSolar} alt="Rooftop solar array" ratio="4/3" rounded="card-lg" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ — conversion + SEO */}
      <div className="border-t border-hairline bg-surface"><FAQ /></div>

      <CTABand />
    </>
  );
}

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
