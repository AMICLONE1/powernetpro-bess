"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * LoadingScreen — a brief branded splash (the PowerNetPro wordmark) shown only
 * on the FIRST load of a session. It never blocks the real content (which
 * renders underneath) and is skipped on subsequent navigations/visits via
 * sessionStorage. Holds still / dismisses instantly under reduced-motion.
 */
const SESSION_KEY = "pnp-splash-seen";

export function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false; // private mode / blocked storage — just show once, harmless
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) return;

    setShow(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-cropped.webp"
              alt="PowerNetPro"
              width={240}
              className="h-9 w-auto sm:h-11"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
