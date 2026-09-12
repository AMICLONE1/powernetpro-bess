import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal } from "@/components/motion/Reveal";
import { Button, ArrowRight } from "@/components/ui/Button";
import { media } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Solar EPC",
  description:
    "Rooftop solar EPC and solar-plus-storage from PowerNetPro. Design, supply, install and commission — sized to your roof and load, with net-metering guidance.",
  path: "/solar",
});

const epcSteps = [
  { title: "Design", body: "Roof and load assessment, shadow analysis, and a system sized to your actual consumption." },
  { title: "Supply", body: "Tier-1 panels, reliable inverters and proper mounting — specified, not substituted." },
  { title: "Install", body: "Certified installation with clean cabling, proper earthing and safe isolation." },
  { title: "Commission", body: "Testing, net-metering paperwork guidance, and handover with monitoring." },
];

export default function SolarPage() {
  return (
    <>
      <PageHero
        kicker="Solar EPC"
        title="Solar that pays, storage that protects"
        lead="Rooftop solar sized to your roof and load — and when you pair it with storage, you use your own cheap daytime power after dark."
        media={{ src: media.rooftopSolar, alt: "Rooftop solar array" }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/free-audit" size="lg">Get your free audit <ArrowRight /></Button>
          <Button href="/battery-storage" size="lg" variant="secondary">See storage</Button>
        </div>
      </PageHero>

      {/* Solar + storage */}
      <section className="border-b border-hairline bg-forest text-white">
        <div className="container-content section-y">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading kicker="Solar-plus-storage" title="Generate by day, use it by night" lead="Solar alone stops at sunset — right when your bill is most expensive. Add storage and your cheapest power carries you through the evening peak and every outage." onDark align="center" />
          </div>
        </div>
      </section>

      {/* EPC process */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="Full EPC" title="Design, supply, install, commission" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {epcSteps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="h-full rounded-card border border-hairline bg-surface p-6">
                  <span className="font-display text-h3 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-h3 text-ink">{s.title}</h3>
                  <p className="mt-2 text-body text-ink-2">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner band */}
      <section className="section-y">
        <div className="container-content">
          <Reveal className="grid items-center gap-8 rounded-card-lg border border-hairline bg-gold-soft/50 p-8 lg:grid-cols-[1.4fr_1fr] lg:p-12">
            <div>
              <span className="kicker"><span className="h-1.5 w-1.5 rounded-full bg-accent" />For solar installers</span>
              <h2 className="mt-4 font-display text-h2 text-ink">Already do solar EPC? Add storage with us.</h2>
              <p className="mt-4 max-w-xl text-body-lg text-ink-2">Partner with PowerNetPro to bring battery storage (BESS) to your projects — we handle storage design, supply and commissioning under your job.</p>
            </div>
            <div className="lg:justify-self-end">
              <Button href="/solar/partner" size="lg">Become a partner <ArrowRight /></Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand headline="See what solar-plus-storage could save you" />
    </>
  );
}
