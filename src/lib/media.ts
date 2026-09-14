/**
 * Central media map — real PowerNetPro imagery in /public/brand.
 * To swap any image, replace the file or point the key at a new path.
 */
export const media = {
  // Home hero — product lineup
  heroVideo: "",
  heroPoster: "/brand/hero-lineup.webp",

  // How it works (3 swapping steps)
  charge: "/brand/charge.webp", // living room dusk, solar charging
  discharge: "/brand/discharge.webp", // living room evening, lights on
  backup: "/brand/backup.webp", // neighbourhood at night, one lit home

  // Battery / product
  batteryProduct: "/brand/battery-product.webp", // wall unit product shot
  cell: "/brand/cell.webp", // prismatic LFP cells macro
  module: "/brand/module.webp", // pack internals: cells + BMS
  pack: "/brand/pack.webp", // floor-standing pack
  wiring: "/brand/wiring.webp", // clean wall install + conduit

  // Solar
  rooftopSolar: "/brand/rooftop-solar.webp",
  solarInstall: "/brand/solar-install.webp", // installers fitting panels

  // Audiences
  home: "/brand/home.webp",
  society: "/brand/society.webp",
  commercial: "/brand/commercial.webp",
  industrial: "/brand/industrial.webp",

  // Projects
  projectHome: "/brand/project-home.webp",
  projectSociety: "/brand/project-society.webp",
  projectIndustrial: "/brand/project-industrial.webp",

  // Team / partner / safety
  team: "/brand/team.webp",
  partner: "/brand/partner.webp",
  safety: "/brand/safety.webp",
} as const;
