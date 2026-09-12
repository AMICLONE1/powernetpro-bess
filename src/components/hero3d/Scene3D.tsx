"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneHandles } from "./buildScene";

/**
 * Mounts the Three.js hero diorama. Loads three + the scene dynamically so it
 * never blocks first paint. Reports `onReady` once the first frame is drawn so
 * the parent can lift the blur and reveal the header. Pauses the render loop
 * when off-screen or on a hidden tab. Reduced-motion / no-WebGL → stays blank
 * (the parent shows a static fallback gradient underneath).
 */
export function Scene3D({ onReady }: { onReady?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFailed(true);
      onReady?.();
      return;
    }

    let handles: SceneHandles | null = null;
    let raf = 0;
    let running = true;
    let disposed = false;
    const start = performance.now();

    (async () => {
      try {
        const { buildScene } = await import("./buildScene");
        if (disposed || !hostRef.current) return;
        handles = buildScene(hostRef.current);

        // draw first frame, then tell the parent we're ready (lift blur)
        handles.render();
        requestAnimationFrame(() => onReady?.());

        const loop = () => {
          if (!running || !handles) return;
          const t = (performance.now() - start) / 1000;
          handles.tick(t);
          handles.render();
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      } catch {
        setFailed(true);
        onReady?.();
      }
    })();

    // pause when off-screen
    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting && !document.hidden;
        if (running && handles) raf = requestAnimationFrame(function l() {
          if (!running || !handles) return;
          const t = (performance.now() - start) / 1000;
          handles.tick(t); handles.render();
          raf = requestAnimationFrame(l);
        });
      },
      { threshold: 0.01 },
    );
    io.observe(host);

    const onResize = () => {
      if (handles && hostRef.current) handles.resize(hostRef.current.clientWidth, hostRef.current.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const onVis = () => { running = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      handles?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef} aria-hidden className="absolute inset-0 h-full w-full" data-scene-failed={failed ? "" : undefined} />;
}
