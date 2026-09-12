"use client";

import { useEffect, useRef, useState } from "react";
import { Button, ArrowRight } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { Scene3D } from "@/components/hero3d/Scene3D";

/**
 * Home hero — a Three.js diorama (bungalow + rooftop solar + highlighted BESS +
 * mountains + the PowerNetPro half-sun) behind a centered "PowerNetPro"
 * wordmark that flies up and BECOMES the header logo as you scroll.
 *
 * Load choreography (as briefed):
 *  1. Header logo is hidden and the hero copy is BLURRED until the 3D scene has
 *     drawn its first frame (`ready`).
 *  2. On ready: copy sharpens in; the giant wordmark is live.
 *  3. On scroll: the wordmark docks pixel-precisely onto the header logo and
 *     crossfades — only one logo visible at a time.
 *
 * Guardrails: reduced-motion / no-WebGL → static gradient + normal (unblurred)
 * copy + visible header logo, no pinning.
 */
export function HeroScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Hide the header logo immediately on mount (before paint) so it can't flash.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const root = document.documentElement;
    if (!mq.matches) {
      root.style.setProperty("--logo-mark-opacity", "0");
      root.style.setProperty("--header-ready", "0"); // header holds back until scene ready
      root.style.setProperty("--header-ready-pe", "none");
    }
    return () => {
      root.style.setProperty("--logo-mark-opacity", "1");
      root.style.setProperty("--header-ready", "1");
      root.style.setProperty("--header-ready-pe", "auto");
    };
  }, []);

  // Reveal the header once the scene has drawn.
  useEffect(() => {
    if (reduced) return;
    const root = document.documentElement;
    root.style.setProperty("--header-ready", ready ? "1" : "0");
    root.style.setProperty("--header-ready-pe", ready ? "auto" : "none");
  }, [ready, reduced]);

  // Scroll handoff — only once the scene is ready and motion is allowed.
  useEffect(() => {
    if (reduced || !ready || !rootRef.current) return;
    let cleanup: (() => void) | undefined;
    (async () => {
      try {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        const gsap = gsapMod.default ?? gsapMod;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const word = wordRef.current!;
          const root = document.documentElement;

          const target = { scale: 0.06, x: 0, y: 0 };
          const measure = () => {
            const logo = document.querySelector<HTMLElement>("[data-logo-mark]");
            gsap.set(word, { scale: 1, x: 0, y: 0 });
            const wr = word.getBoundingClientRect();
            if (!logo) {
              target.scale = 0.06; target.x = 24 - wr.left; target.y = 24 - wr.top; return;
            }
            const lr = logo.getBoundingClientRect();
            target.scale = lr.height / wr.height;
            target.x = lr.left - wr.left;
            target.y = lr.top - wr.top;
          };
          measure();
          root.style.setProperty("--logo-mark-opacity", "0");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "+=140%",
              scrub: 0.6,
              pin: true,
              pinSpacing: true,
              invalidateOnRefresh: true,
              onRefresh: measure,
              onUpdate: (self: { progress: number }) => {
                const p = self.progress;
                const logoIn = Math.max(0, Math.min(1, (p - 0.85) / 0.15));
                root.style.setProperty("--logo-mark-opacity", String(logoIn));
              },
            },
          });

          tl.to(copyRef.current, { yPercent: -30, opacity: 0, ease: "none" }, 0);
          tl.to(word, { color: "rgba(31,61,52,0.92)", ease: "none" }, 0);
          tl.to(word, {
            scale: () => target.scale,
            x: () => target.x,
            y: () => target.y,
            transformOrigin: "top left",
            ease: "power2.inOut",
          }, 0);
          tl.to(word, { autoAlpha: 0, ease: "none", duration: 0.15 }, 0.85);

          ScrollTrigger.refresh();
        }, rootRef);

        cleanup = () => {
          ctx.revert();
          document.documentElement.style.setProperty("--logo-mark-opacity", "1");
        };
      } catch {
        /* static fallback already visible */
      }
    })();
    return () => cleanup?.();
  }, [ready, reduced]);

  const showBlur = !reduced && !ready;

  return (
    <section
      ref={rootRef}
      className="relative h-[100svh] min-h-[600px] overflow-hidden border-b border-hairline bg-gradient-to-b from-[#F3E7D3] via-surface to-bg"
    >
      {/* 3D diorama background */}
      {!reduced && (
        <div className="absolute inset-0 z-0">
          <Scene3D onReady={() => setReady(true)} />
        </div>
      )}

      {/* Legibility scrim: a soft warm fade only behind the copy block up top,
          light enough to keep the scene's depth visible. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-[46%] bg-gradient-to-b from-[#F6F2EA]/80 via-[#F6F2EA]/35 to-transparent" />


      {/* Centered giant wordmark behind the scene (flies up to header logo). */}
      <div
        ref={wordRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[34%] z-[5] -translate-x-1/2 select-none whitespace-nowrap font-display font-semibold leading-none text-ink/[0.10]"
        style={{ fontSize: "clamp(3.2rem, 15vw, 14rem)" }}
      >
        PowerNetPro
      </div>

      {/* Copy — blurred until the scene is ready, then sharpens in. */}
      <div
        ref={copyRef}
        className={
          "container-content relative z-10 flex h-full flex-col items-center justify-start pt-24 text-center transition-all duration-700 lg:pt-28 " +
          (showBlur ? "opacity-60 blur-md" : "opacity-100 blur-0")
        }
      >
        <span className="kicker text-center">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Battery storage &amp; solar EPC · {siteConfig.address.serviceArea}
        </span>
        <h1 className="mt-6 max-w-4xl font-display text-display text-ink text-balance drop-shadow-[0_1px_12px_rgba(246,242,234,0.8)]">
          Power that never leaves you in the dark
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-body-lg text-ink-2">
          Silent, no-maintenance battery storage — engineered from the cell up for
          homes, societies, offices and industry across {siteConfig.address.serviceArea}.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/free-audit" size="lg">Get your free audit <ArrowRight /></Button>
          <Button href="/sizing-calculator" size="lg" variant="secondary">Size your system</Button>
        </div>
      </div>

      {/* Loading shimmer until ready (only in the animated path). */}
      {showBlur && (
        <div aria-hidden className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
        </div>
      )}

      {/* Scroll hint */}
      {!reduced && ready && (
        <div aria-hidden className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-caption uppercase tracking-[0.2em] text-ink-3">
          scroll
        </div>
      )}
    </section>
  );
}
