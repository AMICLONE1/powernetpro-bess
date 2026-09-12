/**
 * Central media map — real PowerNetPro imagery in /public/brand.
 * To swap any image, replace the file or point the key at a new path.
 */
export const media = {
  // Home hero — product lineup
  heroVideo: "",
  heroPoster: "/brand/hero-lineup.png",

  // How it works (3 swapping steps)
  charge: "/brand/charge.png", // living room dusk, solar charging
  discharge: "/brand/discharge.png", // living room evening, lights on
  backup: "/brand/backup.png", // neighbourhood at night, one lit home

  // Battery / product
  batteryProduct: "/brand/battery-product.png", // wall unit product shot
  cell: "/brand/cell.png", // prismatic LFP cells macro
  module: "/brand/module.png", // pack internals: cells + BMS
  pack: "/brand/pack.png", // floor-standing pack
  wiring: "/brand/wiring.png", // clean wall install + conduit

  // Solar
  rooftopSolar: "/brand/rooftop-solar.png",
  solarInstall: "/brand/solar-install.png", // installers fitting panels

  // Audiences
  home: "/brand/home.png",
  society: "/brand/society.png",
  commercial: "/brand/commercial.png",
  industrial: "/brand/industrial.png",

  // Projects
  projectHome: "/brand/project-home.png",
  projectSociety: "/brand/project-society.png",
  projectIndustrial: "/brand/project-industrial.png",

  // Team / partner / safety
  team: "/brand/team.png",
  partner: "/brand/partner.png",
  safety: "/brand/safety.png",
} as const;
