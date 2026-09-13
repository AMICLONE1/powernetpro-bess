import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/sections/CTABand";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { media } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Battery Safety & Standards",
  description:
    "How PowerNetPro engineers safety into every battery storage system — LFP chemistry, multi-level protection, thermal management and certified installation.",
  path: "/safety",
});

const layers = [
  { title: "Cell level", body: "LFP chemistry with wide thermal margins and stable behaviour under stress." },
  { title: "Module level", body: "Per-module monitoring, balancing and fusing managed by the BMS." },
  { title: "Pack level", body: "Isolation, earth protection and thermal management so the system fails safe." },
  { title: "Installation", body: "Certified installation, correct earthing, ventilation and safe isolation points." },
];

export default function SafetyPage() {
  return (
    <>
      <PageHero
        kicker="Safety & standards"
        title="Safe by design, at every layer"
        lead="Safety isn't a feature we add at the end. It's engineered into the chemistry, the electronics and the installation — so the system protects itself and your building."
        media={{ src: media.safety, alt: "Battery protection hardware" }}
      />

      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="Defence in depth" title="Four layers of protection" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {layers.map((l, i) => (
              <Reveal key={l.title} delay={i * 0.06}>
                <div className="h-full rounded-card border border-hairline bg-surface p-6">
                  <span className="font-display text-h3 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 font-display text-h3 text-ink">{l.title}</h2>
                  <p className="mt-2 text-body text-ink-2">{l.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-surface">
        <div className="container-content section-y">
          <SectionHeading kicker="Certifications" title="Standards & documentation" lead="Certification documents and compliance details will be published here." />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {["Certification", "Standard", "Warranty"].map((c, i) => (
              <Reveal key={c} delay={i * 0.06}>
                <div className="flex h-28 items-center justify-center rounded-card border border-hairline bg-bg text-center text-ink-3">{c} document</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
