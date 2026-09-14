"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Route template — re-mounts on every navigation, giving each page a cinematic
 * "focus-in" transition: the incoming page resolves from a soft blur + fade
 * (with a whisper of scale) into sharp focus. Clearly noticeable but calm and
 * mature, not flashy. Under prefers-reduced-motion it does a plain quick fade
 * with no blur/scale.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduce) {
    return (
      <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, filter: "blur(10px)", scale: 1.01 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "opacity, filter, transform" }}
    >
      {children}
    </motion.div>
  );
}
