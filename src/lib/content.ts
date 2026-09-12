/**
 * Shared marketing content. PLACEHOLDER copy and data — replace project data,
 * numbers and testimonials with real, consented content before launch
 * (PRD section 6, launch criteria).
 */

export const audiences = [
  {
    id: "homes",
    label: "Homes",
    href: "/solutions/homes",
    blurb: "Silent backup that keeps the lights, fans and Wi-Fi on.",
    icon: "home",
  },
  {
    id: "societies",
    label: "Housing Societies",
    href: "/solutions/societies",
    blurb: "Cut the common-area generator bill. Committee-ready proposals.",
    icon: "building",
  },
  {
    id: "commercial",
    label: "Offices & Commercial",
    href: "/solutions/commercial",
    blurb: "Shift tariffs, cut demand charges, protect equipment.",
    icon: "office",
  },
  {
    id: "industrial",
    label: "Industrial",
    href: "/solutions/industrial",
    blurb: "Peak shaving and process protection, engineered at scale.",
    icon: "factory",
  },
] as const;

export const differentiators = [
  {
    title: "Engineered, not assembled",
    proof: "LFP cells, real BMS, proper protection — every system is designed for your load.",
    stat: "4k+",
    statLabel: "cell cycles rated",
  },
  {
    title: "Honest about chemistry",
    proof: "We supply both lithium and lead-acid, and tell you when the cheaper option is the right one.",
    stat: "2",
    statLabel: "technologies supplied",
  },
  {
    title: "Documented workmanship",
    proof: "Enclosure, cabling and earthing photographed on every job. It's the argument a competitor can't copy.",
    stat: "100%",
    statLabel: "installs documented",
  },
  {
    title: "Local to Pune & Maharashtra",
    proof: "Fast site surveys, fast service, and an AMC that actually shows up.",
    stat: "2 days",
    statLabel: "audit response",
  },
] as const;

/**
 * Delivered systems, listed by category (replaces per-project case studies).
 * Add a row as each job completes — Ref / Type / System size (kWh) / config.
 */
export const projectRefs = [
  { ref: "01", type: "Commercial", system: "15", outcome: "Lithium-ion bank with inverter" },
  { ref: "02", type: "Residential", system: "2.5", outcome: "Lead-acid bank with inverter" },
  { ref: "03", type: "Residential", system: "1.5", outcome: "Lithium-ion bank with inverter" },
] as const;

export const solarPoints = [
  "Rooftop solar sized to your roof and load, not a generic template.",
  "Solar-plus-storage: use your own cheap daytime power after dark.",
  "Net-metering guidance and full EPC — design, supply, install, commission.",
] as const;

/** Five-step install journey (PRD/Design Doc sequence 5). */
export const processSteps = [
  { n: "01", title: "Enquiry", body: "Tell us the property and what you want to keep running." },
  { n: "02", title: "Free audit", body: "We review your bills and load, then size the right system." },
  { n: "03", title: "Proposal", body: "A clear proposal with capacity, price and payback — no surprises." },
  { n: "04", title: "Installation", body: "Certified install with clean cabling and proper earthing." },
  { n: "05", title: "Service", body: "Monitoring and an AMC that keeps it performing for years." },
] as const;

/** Home operating-mode explainer (charge / discharge / backup). */
export const operatingModes = [
  { title: "Charge", body: "During cheap or solar hours, the battery quietly fills up.", accent: "Cheap hours" },
  { title: "Discharge", body: "At peak tariff, it powers your building instead of the grid.", accent: "Peak hours" },
  { title: "Backup", body: "The moment the grid drops, it takes over — under 20 ms.", accent: "Grid fails" },
] as const;

/** Placeholder testimonials (replace with real, consented quotes). */
// Real, consented quotes go here before launch. Attributions are kept
// anonymised (role + area) — natural for customer testimonials.
export const testimonials = [
  { quote: "The lights never even flickered during the last outage. No noise, no diesel, nothing to think about. It just works.", name: "Villa owner", role: "Kothrud, Pune" },
  { quote: "Our common-area diesel bill dropped sharply and the 2 a.m. generator noise is gone. The committee proposal made the decision easy.", name: "Society secretary", role: "Baner, Pune" },
  { quote: "Peak demand charges came down and a voltage dip no longer trips our line. Clean documentation on the whole install.", name: "Plant manager", role: "Chakan MIDC" },
  { quote: "They were honest that lead-acid fit our small backup-only need better. No overselling — that earned our trust.", name: "Shop owner", role: "Pune" },
  { quote: "Fast site survey, clear price band, tidy cabling and earthing. The AMC actually shows up.", name: "Office admin", role: "Hinjewadi, Pune" },
] as const;

/** Kept for any single-quote references. */
export const testimonial = testimonials[0];

/**
 * Channel & supply partners — shown as a looping wordmark marquee under the
 * hero. Add new partners here; the strip fills and loops automatically.
 */
export const partners = [
  "Sunpower Renewables",
  "Murphy Batteries",
] as const;

/** Homepage FAQ — answers objections (conversion) + FAQ rich results (SEO). */
export const faqs = [
  {
    q: "How much does a battery storage system cost?",
    a: "It depends on how much you want to back up and for how long. Our sizing calculator gives an indicative price band in a minute, and the free audit confirms an exact figure after a quick site survey — no obligation.",
  },
  {
    q: "How long does the backup last during a power cut?",
    a: "A typical home system runs lights, fans, fridge and Wi-Fi for 8+ hours. We size the battery to the exact loads you want to keep running, so you decide the duration.",
  },
  {
    q: "Do you supply lead-acid batteries too, or only lithium?",
    a: "Both. Most jobs are best on lithium (LFP), but for a tight budget, low-cycling or backup-only duty we also supply lead-acid when it's genuinely the smarter buy. The audit tells you honestly which fits.",
  },
  {
    q: "Is it noisy or does it need maintenance like a generator?",
    a: "No. The system is completely silent, has no fuel, and needs no routine maintenance ritual. An optional AMC keeps it monitored and performing for years.",
  },
  {
    q: "Which areas do you serve?",
    a: "We design and install across Pune and Maharashtra — for homes, housing societies, offices and industry.",
  },
  {
    q: "Can I add battery storage to my existing solar?",
    a: "Yes. Solar-plus-storage lets you use your own cheap daytime power after dark and through outages. We handle the full EPC and the storage retrofit.",
  },
] as const;
