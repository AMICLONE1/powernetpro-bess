import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SOLUTIONS, type SolutionKey } from "@/lib/solutions";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/sections/CTABand";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { Button, ArrowRight } from "@/components/ui/Button";
import { processSteps } from "@/lib/content";
import { media } from "@/lib/media";

const KEYS = Object.keys(SOLUTIONS) as SolutionKey[];
const segMedia: Record<SolutionKey, string> = {
  homes: media.home,
  societies: media.society,
  commercial: media.commercial,
  industrial: media.industrial,
};

export function generateStaticParams() {
  return KEYS.map((segment) => ({ segment }));
}

export function generateMetadata({ params }: { params: { segment: string } }) {
  const sol = SOLUTIONS[params.segment as SolutionKey];
  if (!sol) return {};
  return buildMetadata({ title: `${sol.label} — Battery Storage`, description: sol.lead, path: `/solutions/${sol.key}` });
}

export default function SolutionPage({ params }: { params: { segment: string } }) {
  const sol = SOLUTIONS[params.segment as SolutionKey];
  if (!sol) notFound();

  return (
    <>
      <PageHero
        kicker={sol.kicker}
        title={sol.h1}
        lead={sol.lead}
        media={{ src: segMedia[sol.key], alt: `${sol.label} — PowerNetPro` }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/free-audit" size="lg">Get your free audit <ArrowRight /></Button>
          <Button href="/sizing-calculator" size="lg" variant="secondary">Size your system</Button>
        </div>
      </PageHero>

      {/* Proof stats */}
      <section className="border-b border-hairline bg-surface">
        <div className="container-content grid grid-cols-3 divide-x divide-hairline">
          {sol.proofStat.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="px-4 py-8 text-center">
              <div className="font-display text-h2 text-accent">{s.stat}</div>
              <div className="mt-1 text-caption uppercase tracking-wide text-ink-3">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="The problem" title="What you're up against" />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {sol.problem.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="h-full rounded-card border border-hairline bg-surface p-8">
                  <h3 className="font-display text-h3 text-ink">{p.title}</h3>
                  <p className="mt-3 text-body text-ink-2">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What it runs */}
      <section className="border-y border-hairline bg-surface">
        <div className="container-content section-y">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading kicker="What it runs" title="Built around your load, not a template" lead="We size the system to what you actually need to keep running — and tell you honestly what it will and won't cover." />
              <Link href="/sizing-calculator" className="group mt-6 inline-flex items-center gap-1.5 text-body-lg font-semibold text-accent hover:underline">
                Try the sizing calculator <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {sol.runs.map((run, i) => (
                <Reveal key={run} delay={i * 0.05} as="li">
                  <div className="flex items-center gap-3 rounded-card border border-hairline bg-bg px-4 py-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="text-body text-ink">{run}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="How we work" title="A defined process, start to finish" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.08}>
                <div>
                  <span className="font-display text-h3 text-accent">{step.n}</span>
                  <h3 className="mt-2 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-body text-ink-2">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline={sol.ctaHeadline} />
    </>
  );
}
