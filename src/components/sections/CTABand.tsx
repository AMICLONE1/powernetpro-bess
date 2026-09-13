import { Button, ArrowRight } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/ContactButtons";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Closing CTA — a warm forest panel with a single clear action.
 */
export function CTABand({
  headline = "Ready to stop worrying about power cuts?",
  sub = "Get a free, no-obligation audit. We'll size the right system and show you the real numbers.",
}: {
  headline?: string;
  sub?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-content">
        <Reveal className="relative overflow-hidden rounded-card-lg bg-forest px-6 py-16 text-center lg:px-16 lg:py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-h1 text-white text-balance">{headline}</h2>
            <p className="mx-auto mt-5 max-w-xl text-body-lg text-white/70">{sub}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="relative">
                <span aria-hidden className="pointer-events-none absolute -inset-1.5 rounded-pill bg-accent/50 blur-lg motion-safe:animate-pulse-glow" />
                <Button href="/free-audit" size="lg" className="relative">Get your free quote <ArrowRight /></Button>
              </div>
              <WhatsAppButton
                label="Chat on WhatsApp"
                prefilled="Hi PowerNetPro Pvt. Ltd.! I'd like a free quote for battery backup / solar for my place. Can you help?"
                variant="ghost"
                className="border-white/25 text-white hover:border-white/50"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
