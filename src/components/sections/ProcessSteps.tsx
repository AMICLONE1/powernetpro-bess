"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/lib/content";

/**
 * "How we work" — a horizontal 5-step timeline. The connecting accent line
 * draws itself once on scroll-in via framer-motion (SSR-safe, no GSAP); the
 * static hairline sits behind it so the line is always visible. Steps fade in
 * with a light stagger.
 */
export function ProcessSteps() {
  const reduce = useReducedMotion();

  return (
    <section className="section-y">
      <div className="container-content">
        <SectionHeading
          kicker="How we work"
          title="A defined process, start to finish"
          lead="No surprises, no black boxes — five clear steps from first call to long-term service."
        />

        <div className="relative mt-12 lg:mt-14">
          {/* connecting line (desktop) */}
          <div className="pointer-events-none absolute inset-x-0 top-[24px] hidden lg:block">
            <div className="mx-[10%] h-0.5 rounded-full bg-hairline-2" />
            {reduce ? (
              <div className="mx-[10%] -mt-0.5 h-0.5 rounded-full bg-accent" />
            ) : (
              <motion.div
                className="mx-[10%] -mt-0.5 h-0.5 origin-left rounded-full bg-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </div>

          <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} as="li" delay={i * 0.08} className="group relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-surface font-display text-h3 font-bold text-accent shadow-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:shadow-soft">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-h3 text-ink">{step.title}</h3>
                <p className="mt-2 text-body text-ink-2">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
