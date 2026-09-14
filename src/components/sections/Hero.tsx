import { Button, ArrowRight } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site-config";
import { media } from "@/lib/media";

/**
 * Home hero — warm, editorial, photography-led (Base style).
 * Big serif headline + subline + dual CTA over the cream canvas, then a wide
 * hero media slot (installation photo / short loop) below it.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline">
      {/* soft warm glow top-right */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-content relative pt-24 lg:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="kicker text-center">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Battery storage &amp; solar EPC · {siteConfig.address.serviceArea}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-serif text-display text-ink text-balance">
              Power that never leaves you in the dark
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-ink-2">
              Silent, no-maintenance battery storage — engineered from the cell up
              for homes, societies, offices and industry across {siteConfig.address.serviceArea}.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/free-audit" size="lg">Get your free quote <ArrowRight /></Button>
              <Button href="/sizing-calculator" size="lg" variant="secondary">Size your system</Button>
            </div>
          </Reveal>
        </div>

        {/* Hero media — a warm ember gradient panel glows out behind the photo */}
        <Reveal delay={0.2} className="relative mt-14 lg:mt-16">
          {/* Molten-metal gradient: deep ember → terracotta → gold, softly
              blurred so it bleeds past the photo edges as an energy field.
              Static — a designed glow, not a lamp. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[40px] opacity-80 blur-[56px] sm:-inset-10"
            style={{
              background:
                "radial-gradient(120% 120% at 18% 12%, #F5A623 0%, #E4622E 34%, #C24E20 60%, rgba(194,78,32,0) 82%)",
            }}
          />
          {/* Second ember from the opposite corner deepens the molten feel. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-60 blur-[64px] sm:-inset-8"
            style={{
              background:
                "radial-gradient(110% 110% at 88% 92%, #E4622E 0%, #C24E20 40%, rgba(31,61,52,0.35) 72%, rgba(31,61,52,0) 88%)",
            }}
          />
          <Media
            src={media.heroPoster}
            alt="PowerNetPro battery energy storage installation"
            ratio="16/7"
            rounded="card-lg"
            className="relative shadow-lift"
            priority
          />
        </Reveal>
      </div>
    </section>
  );
}
