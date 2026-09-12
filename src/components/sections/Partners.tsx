import { partners } from "@/lib/content";

/**
 * Partners strip — a continuous, circling marquee of partner wordmarks that
 * sits between the hero/stat band and "Who it's for". Names live in
 * lib/content (`partners`); the row repeats to fill the width and loops
 * seamlessly. The animation is disabled under reduced-motion (motion-safe),
 * leaving a clean static row.
 */
export function Partners() {
  // Repeat enough to fill wide screens, then duplicate once so translateX(-50%)
  // wraps seamlessly (the second half mirrors the first).
  const unit = [...partners, ...partners, ...partners, ...partners];
  const row = [...unit, ...unit];

  return (
    <section className="border-b border-hairline bg-surface">
      <div className="container-content py-10 lg:py-12">
        <p className="text-center text-caption font-semibold uppercase tracking-[0.18em] text-ink-3">
          In good company — our partners
        </p>

        <div className="group relative mt-7 overflow-hidden edge-fade">
          <div className="flex w-max items-center motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
            {row.map((name, i) => (
              <span key={i} className="flex items-center whitespace-nowrap pr-10 lg:pr-16">
                <span className="font-display text-h3 font-semibold text-ink-2">{name}</span>
                <span aria-hidden className="ml-10 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40 lg:ml-16" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
