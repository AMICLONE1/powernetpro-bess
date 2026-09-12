import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doesn't know our custom fontSize scale (text-display / text-h1
 * … text-caption) or the semantic colors, so by default it mis-grouped them and
 * silently dropped e.g. `text-h2` when combined with `text-balance`/`text-ink`.
 * Registering them here keeps sizes and colors intact when classes are merged.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h1", "h2", "h3", "body-lg", "body", "caption"] },
      ],
    },
  },
});

/** Merge conditional class names, de-duping conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
