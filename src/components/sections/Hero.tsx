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

        {/* Hero media — glowing halo around the photo edges */}
        <Reveal delay={0.2} className="relative mt-14 lg:mt-16">
          {/* pulsing glow that bleeds out past all four edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-[30px] bg-gradient-to-br from-gold/55 via-accent/40 to-gold/45 blur-2xl motion-safe:animate-pulse-glow sm:-inset-3"
          />
          {/* warm bloom radiating upward from behind the top of the photo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[10%] -top-24 h-48 rounded-[100%] bg-gradient-to-b from-gold/60 via-accent/40 to-accent/25 blur-[70px] motion-safe:animate-pulse-glow"
          />
          <Media
            src={media.heroPoster}
            alt="PowerNetPro battery energy storage installation"
            ratio="16/7"
            rounded="card-lg"
            className="relative shadow-lift"
          />
        </Reveal>
      </div>
    </section>
  );
}
