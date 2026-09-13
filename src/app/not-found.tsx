import Link from "next/link";
import { Button, ArrowRight } from "@/components/ui/Button";
import { GlitchText } from "@/components/ui/GlitchText";

/**
 * 404 — clean, on-brand not-found page. The "404" and the heading do a subtle
 * warm glitch on hover; quick links give a lost visitor a way forward.
 */
const quickLinks = [
  { label: "Battery Storage", href: "/battery-storage" },
  { label: "Solar EPC", href: "/solar" },
  { label: "Sizing Calculator", href: "/sizing-calculator" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/free-audit" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      {/* soft warm glow, echoing the hero */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-content relative flex min-h-[72vh] flex-col items-center justify-center py-20 text-center">
        <span className="text-caption font-semibold uppercase tracking-[0.2em] text-accent">Error 404</span>

        <GlitchText
          as="p"
          className="mt-3 font-display text-[clamp(4.5rem,16vw,10rem)] font-bold leading-none text-ink"
        >
          404
        </GlitchText>

        <GlitchText
          as="h1"
          className="mt-4 font-display text-h1 text-ink"
        >
          This page has gone dark
        </GlitchText>

        <p className="mx-auto mt-4 max-w-md text-body-lg text-ink-2">
          The page you&apos;re looking for isn&apos;t here — it may have moved or never
          existed. But your power doesn&apos;t have to go anywhere.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">Back to home</Button>
          <Button href="/free-audit" size="lg" variant="secondary">
            Get your free quote <ArrowRight />
          </Button>
        </div>

        {/* Quick links so a lost visitor has somewhere useful to go */}
        <div className="mt-12 w-full max-w-lg border-t border-hairline pt-8">
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-3">Popular pages</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-pill border border-hairline bg-surface px-3.5 py-1.5 text-caption font-medium text-ink-2 transition-colors hover:border-accent hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
