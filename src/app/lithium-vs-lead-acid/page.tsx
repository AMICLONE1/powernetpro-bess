import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/lib/media";
import { SpecTable } from "@/components/ui/SpecTable";
import { TCOCalculator } from "@/components/calculator/TCOCalculator";
import { CTABand } from "@/components/sections/CTABand";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: "Lithium vs Lead-Acid Batteries — Which to Choose",
  description:
    "An honest comparison of lithium (LFP) and lead-acid batteries. PowerNetPro supplies both — and tells you which is the sensible choice for your duty and budget.",
  path: "/lithium-vs-lead-acid",
});

const comparison: string[][] = [
  ["Usable life", "8–12 years", "2–4 years"],
  ["Cycle life", "~6,000 cycles", "~500–1,000 cycles"],
  ["Depth of discharge", "Up to 90%", "~50% recommended"],
  ["Maintenance", "None", "Periodic (water / checks)"],
  ["Space & weight", "Compact, light", "Bulky, heavy"],
  ["Cost per delivered unit", "Lower over life", "Higher over life"],
  ["Upfront cost", "Higher", "Lower"],
  ["Safety profile", "Very stable (LFP)", "Stable, needs ventilation"],
];

export default function LithiumVsLeadAcidPage() {
  return (
    <>
      <PageHero
        kicker="Honest comparison"
        title="Lithium vs lead-acid"
        lead="We supply both. So instead of a one-sided pitch, here's the real trade-off — including when lead-acid is genuinely the smarter buy."
      />

      {/* Cutaways */}
      <section className="border-b border-hairline bg-surface">
        <div className="container-content section-y">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { t: "Lead-Acid", h: "Lead plates suspended in electrolyte. Cheap upfront, heavy, and worn by every deep cycle.", cy: "~500 cycles", src: media.pack },
              { t: "Lithium (LFP)", h: "A stack of LFP cells with a BMS. Compact, maintenance-free, and rated for thousands of cycles.", cy: "~6,000 cycles", src: media.module },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08}>
                <div className="rounded-card-lg border border-hairline bg-bg p-2">
                  <Media src={c.src} alt={`${c.t} battery`} ratio="16/9" rounded="card" />
                  <div className="flex items-baseline justify-between gap-3 px-4 pt-4">
                    <h3 className="font-display text-h3 text-ink">{c.t}</h3>
                    <span className="text-body font-semibold text-accent">{c.cy}</span>
                  </div>
                  <p className="px-4 pb-4 pt-2 text-body text-ink-2">{c.h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="Side by side" title="The numbers that matter" />
          <div className="mt-10">
            <SpecTable caption="Lithium versus lead-acid" columns={["Property", "Lithium (LFP)", "Lead-Acid"]} rows={comparison} />
          </div>
        </div>
      </section>

      {/* Honest guidance */}
      <section className="border-y border-hairline bg-surface">
        <div className="container-content section-y">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-card-lg border border-forest/20 bg-forest-soft/40 p-8">
                <h3 className="font-display text-h3 text-ink">Choose lithium when…</h3>
                <ul className="mt-4 space-y-2 text-body text-ink-2">
                  <li>• You cycle daily (solar self-use, tariff shifting)</li>
                  <li>• Space, weight or maintenance-free operation matter</li>
                  <li>• You want the lowest cost per unit over 10 years</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-card-lg border border-hairline bg-bg p-8">
                <h3 className="font-display text-h3 text-ink">Lead-acid still makes sense when…</h3>
                <ul className="mt-4 space-y-2 text-body text-ink-2">
                  <li>• The budget is tight and upfront cost is the constraint</li>
                  <li>• Duty is backup-only with very low cycling</li>
                  <li>• The system is small and rarely discharged deeply</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Lifespan comparison */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="Over 10 years" title="How many batteries will you actually buy?" lead="Forget the sticker price for a second. What really costs you is how often the battery needs replacing. Pick how you'll use it and see the difference." />
          <div className="mt-10"><TCOCalculator /></div>
        </div>
      </section>

      <CTABand headline="Not sure which fits? That's what the audit is for." />
    </>
  );
}
