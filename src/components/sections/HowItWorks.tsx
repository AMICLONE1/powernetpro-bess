import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { operatingModes } from "@/lib/content";
import { media } from "@/lib/media";

const stepImg = [media.charge, media.discharge, media.backup];

/**
 * "How storage works" — the three operating modes shown as a clean, reliable
 * 3-up row (stacks on mobile). No scroll-pinning: every card is always visible
 * and legible, with a light staggered reveal for life.
 */
export function HowItWorks() {
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="container-content section-y">
        <SectionHeading
          align="center"
          kicker="How storage works"
          title="Charge when it's cheap. Power when it's not."
          lead="One simple cycle: the battery fills on cheap or solar power, runs your building through peak-tariff hours, and takes over the instant the grid drops."
        />

        <ol className="mt-10 grid gap-6 md:grid-cols-3 lg:mt-12">
          {operatingModes.map((m, i) => (
            <Reveal
              as="li"
              key={m.title}
              delay={i * 0.08}
              className="group flex h-full flex-col overflow-hidden rounded-card-lg border border-hairline bg-bg shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative">
                <Media src={stepImg[i]} alt={`${m.title} — ${m.body}`} ratio="4/3" rounded="none" />
                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-body font-bold text-white shadow-card">
                  {i + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="w-fit rounded-full bg-gold-soft px-2.5 py-0.5 text-caption font-semibold text-accent-dark">
                  {m.accent}
                </span>
                <h3 className="mt-3 font-display text-h3 text-ink">{m.title}</h3>
                <p className="mt-2 text-body text-ink-2">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
