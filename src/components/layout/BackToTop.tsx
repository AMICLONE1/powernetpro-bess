"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Floating "back to top" control. Appears once the visitor has scrolled roughly
 * past the hero (~90% of the first viewport) and smooth-scrolls to the top.
 * Sits above the mobile sticky CTA bar so the two never overlap.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-20 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink-2 shadow-lift transition-all duration-300 hover:border-accent hover:text-accent lg:bottom-8 lg:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 15V5M6 9l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
