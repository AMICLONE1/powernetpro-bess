import type { Config } from "tailwindcss";

/**
 * Design tokens — "Warm Field" system (v4), inspired by basepowercompany.com:
 * a warm cream canvas, near-black ink, a single terracotta/amber accent and a
 * deep-forest secondary. Photography-led, generous spacing, restrained motion.
 *
 * Legacy token names are kept and remapped so logic-heavy components keep
 * working; prefer the semantic names (bg / surface / ink / accent / …).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // --- Semantic (preferred) ---
        bg: "#F6F2EA", // warm cream canvas
        "bg-2": "#EFE9DE", // deeper cream band
        surface: "#FFFFFF", // cards / panels
        "surface-2": "#FBF8F2", // raised / hover surface
        hairline: "#E4DCCD", // warm borders / dividers
        "hairline-2": "#D6CBB6",

        // Accent — terracotta (primary)
        accent: "#E4622E", // primary accent, CTAs
        "accent-dark": "#C24E20", // hover / pressed
        "accent-soft": "#F3D9C6", // tints / chips

        // Gold — from the logo starburst sun (secondary detail accent)
        gold: "#F5A623",
        "gold-soft": "#FBE7C2",

        // Secondary — deep forest (trust / energy)
        forest: "#1F3D34",
        "forest-dark": "#16302A",
        "forest-soft": "#D8E2DC",

        // Ink text
        ink: "#211D18", // primary text (warm near-black)
        "ink-2": "#5A5349", // secondary text
        "ink-3": "#8C8477", // captions / muted

        // Aliases used across existing components (remapped) ---
        "text-hi": "#211D18",
        "text-mid": "#5A5349",
        "text-dim": "#8C8477",
        blue: "#E4622E", // accent
        green: "#1F3D34", // secondary → forest
        teal: "#1F3D34",
        amber: "#F5A623",
        cyan: "#E4622E",
        violet: "#E4622E",
        "accent-2": "#E4622E",
        "accent-3": "#1F3D34",
        grey: "#5A5349",
        panel: "#FBF8F2",
        line: "#E4DCCD",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Tighter, more editorial scale — smaller maxes read mature, not shouty.
        display: ["clamp(2rem, 4.4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "600" }],
        h1: ["clamp(1.75rem, 3.6vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.018em", fontWeight: "600" }],
        h2: ["clamp(1.4rem, 2.6vw, 2rem)", { lineHeight: "1.18", letterSpacing: "-0.012em", fontWeight: "600" }],
        h3: ["clamp(1.125rem, 1.5vw, 1.3rem)", { lineHeight: "1.3", letterSpacing: "-0.008em", fontWeight: "600" }],
        "body-lg": ["clamp(1rem, 1.1vw, 1.125rem)", { lineHeight: "1.62" }],
        body: ["0.9375rem", { lineHeight: "1.62" }],
        caption: ["0.78125rem", { lineHeight: "1.5" }],
      },
      spacing: {
        section: "120px",
        "section-mobile": "72px",
      },
      maxWidth: {
        content: "1400px",
      },
      borderRadius: {
        card: "14px",
        "card-lg": "24px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(33,29,24,0.04), 0 2px 6px rgba(33,29,24,0.05)",
        soft: "0 6px 20px -6px rgba(33,29,24,0.10)",
        lift: "0 22px 48px -20px rgba(33,29,24,0.22)",
        float: "0 40px 90px -34px rgba(33,29,24,0.28)",
        "card-hover": "0 24px 50px -22px rgba(33,29,24,0.24)",
        "glow-blue": "0 14px 36px -12px rgba(228,98,46,0.45)",
        "glow-green": "0 14px 36px -12px rgba(31,61,52,0.35)",
        "glow-cyan": "0 14px 36px -12px rgba(228,98,46,0.45)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "scroll-dot": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.3" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-glow": "pulse-glow 3.5s ease-in-out infinite",
        "scroll-dot": "scroll-dot 1.6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
