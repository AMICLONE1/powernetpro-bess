"use client";

import { useEffect, useRef, useState } from "react";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARD_W = 280;
const CARD_H = 380;

// Repeat the testimonials so the seamless loop has enough elements that a card's
// ~1s animation never overlaps its own reuse (needs > 1/spacing = 10 cards).
const loopCards = [...testimonials, ...testimonials, ...testimonials];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, s) => (
        <svg key={s} className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function CardBody({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <>
      <div>
        <Stars />
        <blockquote className="mt-5 line-clamp-6 text-body-lg text-ink">&ldquo;{quote}&rdquo;</blockquote>
      </div>
      <figcaption className="mt-6">
        <div className="font-semibold text-ink">{name}</div>
        <div className="text-caption text-ink-3">{role}</div>
      </figcaption>
    </>
  );
}

/**
 * Reviews — a seamless-loop coverflow of testimonial cards (GSAP + Draggable).
 * Cards stream across in an arc, scaling up as they pass centre. Driven by a
 * gentle autoplay plus drag and prev/next (no scroll-pinning). Falls back to a
 * static grid under reduced-motion / no-JS.
 */
export function Reviews() {
  const [enhanced, setEnhanced] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setEnhanced(true);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!enhanced || !stage) return;
    let killed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const gsapMod = await import("gsap");
      const dragMod = await import("gsap/Draggable");
      if (killed) return;
      const gsap: any = (gsapMod as any).default ?? gsapMod;
      const Draggable: any = (dragMod as any).Draggable ?? (dragMod as any).default;
      gsap.registerPlugin(Draggable);

      const cards = gsap.utils.toArray(stage.querySelectorAll(".rc-card")) as HTMLElement[];
      if (!cards.length) return;

      const spacing = 0.1;
      const snap = gsap.utils.snap(spacing);
      gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

      const animateFunc = (el: HTMLElement): any => {
        const tl = gsap.timeline();
        tl.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false })
          .fromTo(el, { xPercent: 400 }, { xPercent: -400, duration: 1, ease: "none", immediateRender: false }, 0);
        return tl;
      };

      function buildSeamlessLoop(items: HTMLElement[]): any {
        const overlap = Math.ceil(1 / spacing);
        const startTime = items.length * spacing + 0.5;
        const loopTime = (items.length + overlap) * spacing + 1;
        const rawSequence = gsap.timeline({ paused: true });
        const seamlessLoop = gsap.timeline({ paused: true, repeat: -1 });
        const l = items.length + overlap * 2;
        for (let i = 0; i < l; i++) {
          rawSequence.add(animateFunc(items[i % items.length]), i * spacing);
        }
        rawSequence.time(startTime);
        seamlessLoop
          .to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: "none" })
          .fromTo(rawSequence, { time: overlap * spacing + 1 }, { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: "none" });
        return seamlessLoop;
      }

      const seamlessLoop = buildSeamlessLoop(cards);
      const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
      const playhead = { offset: 0 };
      const render = () => seamlessLoop.time(wrapTime(playhead.offset));

      let hovering = false;
      let dragging = false;
      let scrubbing = false;
      let visible = true;

      const scrub = gsap.to(playhead, {
        offset: 0,
        onUpdate: render,
        duration: 0.4,
        ease: "power3",
        paused: true,
        onComplete: () => { scrubbing = false; },
      });

      const scrollToOffset = (offset: number) => {
        scrubbing = true;
        scrub.vars.offset = snap(offset);
        scrub.invalidate().restart();
      };

      // Gentle autoplay — advances one card roughly every ~2.5s.
      const AUTO = 0.00004;
      const tick = (_t: number, dt: number) => {
        if (!visible || hovering || dragging || scrubbing) return;
        playhead.offset += dt * AUTO;
        render();
      };
      gsap.ticker.add(tick);
      render();

      // Pause autoplay on mouse hover only — on touch, pointerleave can't be trusted.
      const onEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") hovering = true; };
      const onLeave = (e: PointerEvent) => { if (e.pointerType === "mouse") hovering = false; };
      stage.addEventListener("pointerenter", onEnter);
      stage.addEventListener("pointerleave", onLeave);

      // Only run the animation while the section is on screen.
      const io = new IntersectionObserver((entries) => { visible = entries[0]?.isIntersecting ?? true; });
      io.observe(stage);

      const nextBtn = stage.querySelector<HTMLButtonElement>(".rc-next");
      const prevBtn = stage.querySelector<HTMLButtonElement>(".rc-prev");
      const onNext = () => scrollToOffset(playhead.offset + spacing);
      const onPrev = () => scrollToOffset(playhead.offset - spacing);
      nextBtn?.addEventListener("click", onNext);
      prevBtn?.addEventListener("click", onPrev);

      const proxy = stage.querySelector<HTMLElement>(".rc-proxy");
      const cardsWrap = stage.querySelector<HTMLElement>(".rc-cards");
      let startOffset = 0;
      const drags = Draggable.create(proxy, {
        type: "x",
        trigger: cardsWrap,
        allowNativeTouchScrolling: true,
        onPress() { dragging = true; startOffset = playhead.offset; },
          onDrag(this: any) { playhead.offset = startOffset + (this.startX - this.x) * 0.0015; render(); },
        onDragEnd() { dragging = false; scrollToOffset(playhead.offset); },
      });

      cleanup = () => {
        gsap.ticker.remove(tick);
        io.disconnect();
        stage.removeEventListener("pointerenter", onEnter);
        stage.removeEventListener("pointerleave", onLeave);
        nextBtn?.removeEventListener("click", onNext);
        prevBtn?.removeEventListener("click", onPrev);
          drags?.forEach((d: any) => d.kill());
        scrub.kill();
        seamlessLoop.kill();
        gsap.killTweensOf(cards);
      };
    })();

    return () => {
      killed = true;
      cleanup?.();
    };
  }, [enhanced]);

  return (
    <section className="overflow-hidden bg-bg-2 py-10 lg:py-14">
      <div className="container-content">
        <SectionHeading
          align="center"
          kicker="What people say"
          title="Trusted where it matters"
          lead="Real words from homes, societies and plants we've powered across Pune & Maharashtra."
        />
      </div>

      {enhanced ? (
        <div ref={stageRef} className="mt-6 lg:mt-8">
          {/*
            The visual loop repeats each testimonial 3× for the seamless effect,
            so it's hidden from assistive tech; the unique quotes are exposed as
            an sr-only list below.
          */}
          <ul className="sr-only">
            {testimonials.map((t, i) => (
              <li key={i}>
                <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                <span>— {t.name}, {t.role}</span>
              </li>
            ))}
          </ul>
          <div className="relative mx-auto h-[400px] w-full overflow-hidden" style={{ touchAction: "pan-y" }} aria-hidden="true">
            <ul
              className="rc-cards absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: CARD_W, height: CARD_H }}
            >
              {loopCards.map((t, i) => (
                <li
                  key={i}
                  className="rc-card absolute inset-0 flex cursor-grab flex-col justify-between overflow-hidden rounded-card-lg border border-hairline bg-surface p-7 shadow-lift active:cursor-grabbing"
                  style={{ width: CARD_W, height: CARD_H }}
                >
                  <CardBody quote={t.quote} name={t.name} role={t.role} />
                </li>
              ))}
            </ul>
            <div className="rc-proxy invisible absolute" />
          </div>

          <div className="mt-2 flex items-center justify-center gap-4" aria-hidden="true">
            <button
              type="button"
              tabIndex={-1}
              className="rc-prev flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink-2 transition-all hover:border-accent hover:text-accent hover:shadow-soft"
              aria-label="Previous review"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="text-caption text-ink-3">Drag, or use the arrows</span>
            <button
              type="button"
              tabIndex={-1}
              className="rc-next flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink-2 transition-all hover:border-accent hover:text-accent hover:shadow-soft"
              aria-label="Next review"
            >
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="container-content mt-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure key={i} className="flex flex-col justify-between rounded-card-lg border border-hairline bg-surface p-7 shadow-card">
                <CardBody quote={t.quote} name={t.name} role={t.role} />
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
