"use client";

import { useRef, type ReactNode } from "react";

/**
 * TiltLogo — gives its children a subtle 3D tilt that follows the cursor
 * (perspective + rotateX/rotateY), returning smoothly to flat on leave. Paired
 * with an emboss drop-shadow on the logo image, it reads as a raised, three-
 * dimensional mark without any rendered 3D model.
 *
 * Pointer-driven only; on touch there's no hover so it simply stays flat. The
 * transition respects the OS via CSS (no JS animation loop) and the tilt is
 * gentle (max ~10°) to suit the site's restrained tone.
 */
export function TiltLogo({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // -0.5..0.5 across the element.
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const MAX = 10; // degrees
    // Tip toward the cursor: top edge tilts back when the pointer is high.
    el.style.transform = `perspective(600px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) scale(1.02)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
