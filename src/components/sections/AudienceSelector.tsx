"use client";

import Link from "next/link";
import { audiences } from "@/lib/content";
import { Icon } from "@/components/ui/Icons";
import { ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { track } from "@/lib/analytics";
import { media } from "@/lib/media";

const audienceImg: Record<string, string> = {
  homes: media.home,
  societies: media.society,
  commercial: media.commercial,
  industrial: media.industrial,
};

/**
 * Four audience cards with imagery — reachable within one scroll (PRD 4.1).
 */
export function AudienceSelector() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {audiences.map((a, i) => (
        <Reveal key={a.id} delay={i * 0.06}>
          <Link
            href={a.href}
            onClick={() => track("segment_selected", { segment: a.id })}
            className="group flex h-full flex-col overflow-hidden rounded-card-lg border border-hairline bg-surface shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift"
          >
            {/* Card image with overlaid label */}
            <div className="relative aspect-[16/10] overflow-hidden bg-bg-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={audienceImg[a.id]}
                alt={a.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out-expo group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
              <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-accent shadow-card backdrop-blur-sm transition-colors duration-200 group-hover:bg-white">
                <Icon name={a.icon} className="h-5 w-5" />
              </span>
              <h3 className="absolute inset-x-5 bottom-4 font-display text-h3 text-white">{a.label}</h3>
            </div>
            {/* Card content */}
            <div className="flex flex-1 flex-col p-6">
              <p className="flex-1 text-body text-ink-2">{a.blurb}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-body font-semibold text-accent">
                Explore <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
