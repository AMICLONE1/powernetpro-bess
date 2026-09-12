/**
 * Single source of truth for all business details.
 * PLACEHOLDER VALUES — replace with real data before launch.
 * Every value marked TODO must be confirmed by PowerNetPro.
 */
export const siteConfig = {
  company: "PowerNetPro Pvt. Ltd.",
  shortName: "PowerNetPro",
  tagline: "Battery Energy Storage & Solar EPC",
  description:
    "PowerNetPro designs and installs battery energy storage systems and solar EPC for homes, housing societies, offices and industry across Pune and Maharashtra.",

  url: "https://www.powernetpro.com",

  phone: {
    display: "+91 88058 81601",
    tel: "+918805881601", // used in tel: links
    whatsapp: "918805881601", // used in wa.me/ links (no + or spaces)
  },

  email: {
    sales: "audit@powernetpro.com",
    info: "info@powernetpro.com",
    partner: "solarpartner@powernetpro.com", // solar EPC partnership enquiries
    privacy: "privacy@powernetpro.com", // deletion-request route (DPDP)
  },

  address: {
    street: "Plot No 88, Savkash Nagar, Sahkari Gruhrachna, Kondhwa BK",
    locality: "Pune",
    region: "Maharashtra",
    postalCode: "411048",
    country: "IN",
    serviceArea: "Pune & Maharashtra",
  },

  // Statutory registration (Companies Act, 2013 · Startup India / DPIIT).
  registration: {
    legalName: "PowerNetPro Private Limited",
    cin: "U35105PN2026PTC253285",
    dipp: "DIPP255899",
    founded: "2026",
  },

  social: {
    // TODO: add real handles when available
    linkedin: "",
    instagram: "",
  },

  // Response-time commitment shown on the audit confirmation screen
  responseCommitment: "We will respond within 2 working days.",
} as const;

export function whatsappLink(prefilled?: string) {
  const base = `https://wa.me/${siteConfig.phone.whatsapp}`;
  return prefilled ? `${base}?text=${encodeURIComponent(prefilled)}` : base;
}

export function telLink() {
  return `tel:${siteConfig.phone.tel}`;
}
