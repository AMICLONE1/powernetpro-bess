/** Primary navigation structure (mirrors TRD 2.2 route table). */
export const solutionsNav = [
  { label: "Homes", href: "/solutions/homes", blurb: "Silent backup that keeps the lights on", icon: "home" },
  { label: "Housing Societies", href: "/solutions/societies", blurb: "Cut the common-area generator bill", icon: "building" },
  { label: "Offices & Commercial", href: "/solutions/commercial", blurb: "Shift tariffs, cut demand charges", icon: "office" },
  { label: "Industrial", href: "/solutions/industrial", blurb: "Peak shaving and process protection", icon: "factory" },
] as const;

export type NavItem = { label: string; href: string; hasMega?: boolean; icon?: string };

// Left-to-right order: products first, then audiences, education, tools, and
// company (About) last before the CTA. The desktop and mobile menus both render
// from this single list, so their sequence can never drift apart.
export const mainNav: NavItem[] = [
  { label: "Battery Storage", href: "/battery-storage", icon: "battery" },
  { label: "Solar EPC", href: "/solar", icon: "sun" },
  { label: "Solutions", href: "/solutions/homes", hasMega: true, icon: "home" },
  { label: "Lithium vs Lead-Acid", href: "/lithium-vs-lead-acid", icon: "bolt" },
  { label: "Calculator", href: "/sizing-calculator", icon: "calc" },
  { label: "About", href: "/about", icon: "info" },
];

export const footerNav = {
  Solutions: solutionsNav.map((s) => ({ label: s.label, href: s.href })),
  Technology: [
    { label: "Battery Storage (BESS)", href: "/battery-storage" },
    { label: "Lithium vs Lead-Acid", href: "/lithium-vs-lead-acid" },
    { label: "Solar EPC", href: "/solar" },
    { label: "Solar EPC Partners", href: "/solar/partner" },
    { label: "Safety & Standards", href: "/safety" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    // Contact is consolidated into the Enquire (free-audit) page.
    { label: "Contact", href: "/free-audit" },
    { label: "Sizing Calculator", href: "/sizing-calculator" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;
