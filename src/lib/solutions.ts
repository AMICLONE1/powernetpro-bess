/**
 * Per-solution content (PRD 4, Design Doc 4.3). Four pages share one template,
 * differentiated by content and lead angle:
 *   homes      -> reliability & silence
 *   societies  -> cost (common-area / generator displacement)
 *   commercial -> cost (tariff shifting, demand charges, equipment protection)
 *   industrial -> engineering depth
 * PLACEHOLDER copy — refine with PowerNetPro before launch.
 */

export type SolutionKey = "homes" | "societies" | "commercial" | "industrial";

export type Solution = {
  key: SolutionKey;
  label: string;
  kicker: string;
  h1: React.ReactNode;
  lead: string;
  problem: { title: string; body: string }[];
  runs: string[];
  proofStat: { stat: string; label: string }[];
  ctaHeadline: string;
  propertyPreset: "home" | "office" | "industrial";
};

export const SOLUTIONS: Record<SolutionKey, Solution> = {
  homes: {
    key: "homes",
    label: "Homes",
    kicker: "For homeowners",
    h1: "Silent backup that just works",
    lead: "No noise, no fuel, no maintenance ritual. When the power goes, your lights, fans, fridge and Wi-Fi simply stay on.",
    problem: [
      { title: "Cuts without warning", body: "Load-shedding and outages leave you in the dark at the worst moments." },
      { title: "Generators are a hassle", body: "Noisy, smelly, thirsty, and they need attention you don't have time for." },
    ],
    runs: ["Whole-home lights & fans", "Refrigerator", "Wi-Fi & TV", "Water pump", "Optionally, one AC"],
    proofStat: [
      { stat: "0 dB", label: "audible noise" },
      { stat: "8 hrs+", label: "typical backup" },
      { stat: "10 yr+", label: "battery life" },
    ],
    ctaHeadline: "See what a silent home backup would cost you",
    propertyPreset: "home",
  },
  societies: {
    key: "societies",
    label: "Housing Societies",
    kicker: "For housing societies",
    h1: "Cut the common-area generator bill",
    lead: "Lifts, lighting, pumps and security stay up during a cut — without the diesel bill or the 2 a.m. generator noise. Committee-ready proposals included.",
    problem: [
      { title: "Diesel is expensive", body: "Common-area DG running costs climb every year and eat into maintenance funds." },
      { title: "Decisions are hard", body: "Committees need clear payback numbers and a maintainable system, not a sales pitch." },
    ],
    runs: ["Lifts", "Common-area & stairwell lighting", "Water pumps", "Security & CCTV", "Intercom & gate"],
    proofStat: [
      { stat: "AMC", label: "maintenance covered" },
      { stat: "Payback", label: "on common load" },
      { stat: "Silent", label: "no 2 a.m. DG" },
    ],
    ctaHeadline: "Get a committee-ready proposal for your society",
    propertyPreset: "office",
  },
  commercial: {
    key: "commercial",
    label: "Offices & Commercial",
    kicker: "For offices & commercial",
    h1: "Shift tariffs. Cut demand charges.",
    lead: "Store cheap off-peak energy, use it at peak, and shave the demand charges quietly inflating your bill — while protecting sensitive equipment from every dip.",
    problem: [
      { title: "Peak tariffs & demand charges", body: "Time-of-day tariffs and demand charges make your bill far larger than the units alone." },
      { title: "Equipment at risk", body: "Servers, HVAC and machines don't like sags, spikes or hard cutovers." },
    ],
    runs: ["Servers & networking", "Lighting & workstations", "HVAC", "Access control & lifts", "POS / critical systems"],
    proofStat: [
      { stat: "Peak", label: "tariff shifting" },
      { stat: "Lower", label: "demand charges" },
      { stat: "Clean", label: "power to equipment" },
    ],
    ctaHeadline: "Find your demand-charge and tariff savings",
    propertyPreset: "office",
  },
  industrial: {
    key: "industrial",
    label: "Industrial",
    kicker: "For industry",
    h1: "Engineered for your scale",
    lead: "Peak shaving, process protection and documented engineering. Systems designed around your actual load profile — with the certifications and references to back it.",
    problem: [
      { title: "Demand penalties", body: "Contract-demand overshoots and power-factor penalties add up across the year." },
      { title: "Process interruptions", body: "A dip or a hard cutover can spoil a batch or trip a line. That's real money." },
    ],
    runs: ["Motors & machines", "Air compressors", "Process cooling / HVAC", "PLC & instrumentation", "Critical office/IT loads"],
    proofStat: [
      { stat: "Peak", label: "shaving" },
      { stat: "Docs", label: "full documentation" },
      { stat: "Refs", label: "site references" },
    ],
    ctaHeadline: "Talk engineering — request a site audit",
    propertyPreset: "industrial",
  },
};
