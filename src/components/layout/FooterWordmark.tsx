"use client";

import { useEffect, useRef } from "react";

type Particle = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

// Dot colours on the dark forest footer.
const REST = "rgba(255,255,255,0.13)"; // settled name
const HOT = "rgba(245,166,35,0.62)"; // scattered dots glow gold (brand energy)

// Physics
const SPRING = 0.04;
const FRICTION = 0.86;

/**
 * Runs the particle field. Kept out of the component so `wrap`/`canvas`/`ctx`
 * are typed non-null throughout the closures. Returns a cleanup function.
 */
function runWordmark(
  wrap: HTMLDivElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  text: string,
): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let disposed = false;
  let raf = 0;
  let running = false;
  let particles: Particle[] = [];
  let W = 0;
  let H = 0;
  let dpr = 1;
  let dot = 2;
  const pointer = { x: -1e5, y: -1e5, active: false };

  function build() {
    if (disposed) return;
    const cssW = wrap.clientWidth;
    if (!cssW) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fam = getComputedStyle(wrap).fontFamily || "system-ui, sans-serif";

    // Fit the text to ~94% of the available width.
    ctx.font = `700 100px ${fam}`;
    const w100 = ctx.measureText(text).width || 100;
    const fontDev = ((cssW * 0.94) / w100) * 100 * dpr;

    ctx.font = `700 ${fontDev}px ${fam}`;
    const m = ctx.measureText(text);
    const ascent = m.actualBoundingBoxAscent || fontDev * 0.72;
    const descent = m.actualBoundingBoxDescent || fontDev * 0.2;
    const pad = fontDev * 0.14;
    H = Math.ceil(ascent + descent + pad * 2);
    W = Math.round(cssW * dpr);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = "100%";
    canvas.style.height = `${Math.round(H / dpr)}px`;

    const originX = (W - m.width) / 2;
    const baseY = pad + ascent;
    dot = Math.max(1, Math.round(1.7 * dpr));
    const step = Math.max(2, Math.round(5 * dpr));

    // Stamp the text and sample its opaque pixels into dot homes.
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "alphabetic";
    ctx.font = `700 ${fontDev}px ${fam}`;
    ctx.fillText(text, originX, baseY);
    const data = ctx.getImageData(0, 0, W, H).data;

    const next: Particle[] = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (data[(y * W + x) * 4 + 3] > 128) next.push({ hx: x, hy: y, x, y, vx: 0, vy: 0 });
      }
    }
    particles = next;
    ctx.clearRect(0, 0, W, H);

    if (reduce) drawHome();
    else start();
  }

  function drawHome() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = REST;
    for (const p of particles) ctx.fillRect(p.hx, p.hy, dot, dot);
  }

  function start() {
    if (reduce || running || disposed) return;
    running = true;
    raf = requestAnimationFrame(frame);
  }

  function frame() {
    const R = 72 * dpr;
    const R2 = R * R;
    const REPEL = 2.6 * dpr;
    const hotThresh = 5 * dpr * (5 * dpr);
    ctx.clearRect(0, 0, W, H);
    let moving = false;
    let hot = false;
    ctx.fillStyle = REST;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (pointer.active) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (R - d) / R;
          p.vx += (dx / d) * f * REPEL;
          p.vy += (dy / d) * f * REPEL;
        }
      }
      p.vx += (p.hx - p.x) * SPRING;
      p.vy += (p.hy - p.y) * SPRING;
      p.vx *= FRICTION;
      p.vy *= FRICTION;
      p.x += p.vx;
      p.y += p.vy;

      const ddx = p.x - p.hx;
      const ddy = p.y - p.hy;
      const disp = ddx * ddx + ddy * ddy;
      if (disp > 1 || p.vx * p.vx + p.vy * p.vy > 0.04) moving = true;
      const isHot = disp > hotThresh;
      if (isHot !== hot) {
        hot = isHot;
        ctx.fillStyle = hot ? HOT : REST;
      }
      ctx.fillRect(p.x, p.y, dot, dot);
    }

    if (moving || pointer.active) {
      raf = requestAnimationFrame(frame);
    } else {
      running = false;
      drawHome();
    }
  }

  function onMove(e: PointerEvent) {
    if (reduce) return;
    const r = canvas.getBoundingClientRect();
    pointer.x = (e.clientX - r.left) * (W / r.width);
    pointer.y = (e.clientY - r.top) * (H / r.height);
    pointer.active = true;
    start();
  }
  function onLeave() {
    pointer.active = false;
    start();
  }

  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("pointercancel", onLeave);

  let ro: ResizeObserver | null = null;
  let resizeRaf = 0;
  const onResize = () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(build);
  };

  const startAll = () => {
    if (disposed) return;
    build();
    ro = new ResizeObserver(onResize);
    ro.observe(wrap);
  };
  // Wait for the display font so metrics and sampling match the real glyphs.
  if (document.fonts?.ready) document.fonts.ready.then(startAll);
  else startAll();

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    cancelAnimationFrame(resizeRaf);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerleave", onLeave);
    canvas.removeEventListener("pointercancel", onLeave);
    ro?.disconnect();
  };
}

/**
 * Giant footer wordmark drawn as a grain of dots. Moving the cursor across it
 * repels the nearby dots so the name disintegrates, then they spring back and
 * it re-forms. Falls back to a static dotted name under reduced-motion.
 * Purely decorative (aria-hidden); the real brand name lives in the Logo above.
 */
export function FooterWordmark({ text = "PowerNetPro" }: { text?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;
    return runWordmark(wrap, canvas, ctx, text);
  }, [text]);

  return (
    <div ref={wrapRef} aria-hidden className="relative w-full select-none font-display font-semibold leading-none tracking-tight">
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}
