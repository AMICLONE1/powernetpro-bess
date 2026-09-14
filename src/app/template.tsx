"use client";

import { motion } from "framer-motion";

/**
 * Route template — re-mounts on every navigation (unlike layout.tsx), so it
 * gives each page a subtle fade-in transition. Kept gentle to suit the site's
 * restrained-motion tone; framer-motion respects reduced-motion automatically
 * for transforms when the user opts out.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
