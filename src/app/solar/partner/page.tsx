import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnerForm } from "@/components/partner/PartnerForm";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";
import { media } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Solar EPC Partners",
  description:
    "Solar EPC installers: partner with PowerNetPro to add battery energy storage (BESS) to your projects. We handle design, supply and commissioning of storage so you win bigger jobs.",
  path: "/solar/partner",
});

const heroChips = ["Lithium & lead-acid", "We size, supply & commission", "Documented workmanship", "Pune & Maharashtra"];

const benefits = [
  { icon: "battery", title: "Storage on every quote", body: "Offer BESS alongside your solar without building or funding an in-house battery team." },
  { icon: "bolt", title: "We carry the engineering", body: "Sizing, supply, install support and commissioning — delivered under your project, to your timeline." },
  { icon: "shield", title: "Honest by default", body: "LFP or lead-acid chosen on merit, documented workmanship, and an AMC that actually shows up." },
  { icon: "office", title: "Local & responsive", body: "Pune & Maharashtra coverage, fast site surveys, and clear, honest proposals for your clients." },
];

const yours = [
  "The solar design and installation",
  "The client relationship, start to finish",
  "The roof, structure and DC side",
  "The overall proposal to your client",
];
const ours = [
  "Battery sizing to the load and tariff",
  "Supply — lithium (LFP) or lead-acid",
  "Install support and safe integration",
  "Commissioning, monitoring and AMC",
];

const steps = [
  { n: "01", t: "Introduce the project", d: "Send us the site and the client's backup or savings goal — a short call is enough to get started." },
  { n: "02", t: "We survey & size", d: "We confirm loads and tariff, size the right storage, and share a clean proposal you can put your name on." },
  { n: "03", t: "Joint install", d: "You fit the solar; we integrate the battery and inverter with documented cabling and proper earthing." },
  { n: "04", t: "Commission & service", d: "We commission, hand over monitoring, and back it with an AMC — so the job keeps performing for years." },
];

const assurances = ["No cost to join", "We respond within 2 working days", "Your client relationship stays yours"];

function Check({ tone = "accent" }: { tone?: "accent" | "forest" }) {
  return (
    <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", tone === "accent" ? "bg-accent-soft text-accent" : "bg-forest-soft text-forest")}>
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function PartnerPage() {
  return (
    <>
      <PageHero
        kicker="Solar EPC partners"
        title="Add battery storage to every solar job"
        lead="You install solar. We engineer, supply and commission the battery — delivered under your project. Win bigger, stickier jobs without building an in-house storage team."
        media={{ src: media.partner, alt: "PowerNetPro and solar-EPC partner on a rooftop install" }}
      >
        <div className="flex flex-wrap gap-2">
          {heroChips.map((chip) => (
            <span key={chip} className="rounded-pill border border-hairline bg-surface px-3 py-1.5 text-caption font-medium text-ink-2">
              {chip}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Why partner */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading
            kicker="Why partner"
            title="Storage expertise, none of the overhead"
            lead="Solar wins the roof; storage wins the decade. Bolt a battery onto every proposal and let us carry the engineering, supply and long-term service."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-card-lg border border-hairline bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon name={b.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-h3 text-ink">{b.title}</h3>
                  <p className="mt-2 text-body text-ink-2">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibility split */}
      <section className="border-y border-hairline bg-surface">
        <div className="container-content section-y">
          <SectionHeading
            kicker="How the work splits"
            title="You own the client. We own the battery."
            lead="A clean division of responsibility, agreed up front — so nothing falls between the cracks on site."
          />
          <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-card-lg border border-hairline bg-bg p-7 lg:p-8">
                <span className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-3">You handle</span>
                <ul className="mt-5 space-y-3.5">
                  {yours.map((y) => (
                    <li key={y} className="flex gap-3 text-body text-ink"><Check tone="forest" /> {y}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-card-lg border border-accent/25 bg-accent-soft/25 p-7 lg:p-8">
                <span className="text-caption font-semibold uppercase tracking-[0.14em] text-accent-dark">We handle</span>
                <ul className="mt-5 space-y-3.5">
                  {ours.map((o) => (
                    <li key={o} className="flex gap-3 text-body text-ink"><Check /> {o}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="How it works" title="From referral to commissioning" lead="Four steps, no black boxes — your name stays on the project throughout." />
          <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.08} className="relative">
                <span className="font-display text-h1 font-bold leading-none text-accent/25">{s.n}</span>
                <h3 className="mt-3 font-display text-h3 text-ink">{s.t}</h3>
                <p className="mt-2 text-body text-ink-2">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-hairline bg-surface">
        <div className="container-content section-y">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading kicker="Become a partner" title="Tell us about your business" lead="Fill this in and our partnerships team will reach out. Prefer email? Reach us directly." />
              <a href={`mailto:${siteConfig.email.partner}`} className="mt-4 inline-block text-body-lg font-semibold text-accent hover:underline">
                {siteConfig.email.partner}
              </a>
              <ul className="mt-7 space-y-3">
                {assurances.map((a) => (
                  <li key={a} className="flex gap-3 text-body text-ink-2"><Check /> {a}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-card-lg border border-hairline bg-bg p-6 shadow-card lg:p-8">
              <PartnerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
