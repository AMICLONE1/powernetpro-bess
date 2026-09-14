"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/**
 * CookieConsent — DPDP/GDPR-style consent banner. Analytics (GA4) load ONLY
 * after the visitor accepts; declining means no analytics scripts are injected
 * at all. The choice persists across sessions in localStorage. On return
 * visits, a prior "accepted" silently re-loads GA4 without showing the banner.
 *
 * GA4 is loaded here (not in layout) so consent truly gates it. Pass the GA id;
 * if absent, the component still renders the banner but loads nothing.
 */
const STORAGE_KEY = "pnp-cookie-consent"; // "accepted" | "declined"

function loadGA(gaId: string) {
  if (!gaId || document.getElementById("ga4-src")) return; // already loaded
  const s1 = document.createElement("script");
  s1.id = "ga4-src";
  s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s1);

  const s2 = document.createElement("script");
  s2.id = "ga4-init";
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`;
  document.head.appendChild(s2);
}

export function CookieConsent({ gaId }: { gaId?: string }) {
  const [decided, setDecided] = useState(true); // assume decided until we read storage (avoids flash)

  useEffect(() => {
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(STORAGE_KEY);
    } catch {
      choice = null;
    }
    if (choice === "accepted") {
      if (gaId) loadGA(gaId);
      setDecided(true);
    } else if (choice === "declined") {
      setDecided(true);
    } else {
      setDecided(false); // no choice yet -> show banner
    }
  }, [gaId]);

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore blocked storage */
    }
    if (value === "accepted" && gaId) loadGA(gaId);
    setDecided(true);
  }

  return (
    <AnimatePresence>
      {!decided && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-4"
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
        >
          <div className="container-content">
            <div className="flex flex-col gap-4 rounded-card-lg border border-hairline bg-surface/95 p-4 shadow-float backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <p className="text-body text-ink-2">
                We use cookies to understand how the site is used and improve it. You can accept analytics
                cookies or decline — essential cookies always stay on.{" "}
                <Link href="/privacy" className="font-medium text-accent underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
              </p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => decide("declined")}
                  className="rounded-pill border border-hairline bg-transparent px-4 py-2 text-body font-semibold text-ink-2 transition-colors hover:border-ink/40 hover:text-ink"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => decide("accepted")}
                  className="rounded-pill bg-accent px-5 py-2 text-body font-semibold text-white transition-colors hover:bg-accent-dark"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
