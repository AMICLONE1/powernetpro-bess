"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * SmoothCursor — a soft accent ring that trails the real mouse with spring
 * easing and grows when hovering interactive elements. It's layered ON TOP of
 * the normal OS cursor (which stays visible and marks the true position), so
 * there's no loss of precision — the ring is purely an accent.
 *
 * Fully opt-out: renders nothing on touch / coarse-pointer devices, and nothing
 * under prefers-reduced-motion. Decorative and pointer-events-none throughout.
 */
export function SmoothCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  // Raw pointer position; the spring lags behind it to create the trail.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springCfg = { stiffness: 380, damping: 30, mass: 0.6 };
  const ringX = useSpring(x, springCfg);
  const ringY = useSpring(y, springCfg);

  // Enable only for fine pointers (mouse) and when motion is allowed.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      // Grow the ring over anything clickable.
      const el = e.target as Element | null;
      setHovering(!!el?.closest?.('a, button, [role="button"], input, textarea, select, label, summary'));
    };
    const leave = () => setVisible(false);
    const downFn = () => setDown(true);
    const upFn = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", downFn, { passive: true });
    window.addEventListener("pointerup", upFn, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", downFn);
      window.removeEventListener("pointerup", upFn);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const scale = (hovering ? 1.9 : 1) * (down ? 0.85 : 1);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{ x: ringX, y: ringY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      <motion.span
        className="block rounded-full border border-accent/70"
        style={{ width: 30, height: 30, marginLeft: -15, marginTop: -15 }}
        animate={{
          scale,
          backgroundColor: hovering ? "rgba(228,98,46,0.10)" : "rgba(228,98,46,0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
      />
    </motion.div>
  );
}
