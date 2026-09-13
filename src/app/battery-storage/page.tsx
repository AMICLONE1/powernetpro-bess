import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecTable } from "@/components/ui/SpecTable";
import { CTABand } from "@/components/sections/CTABand";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icons";
import { operatingModes } from "@/lib/content";
import { media } from "@/lib/media";

export const metadata = buildMetadata({
  title: "Battery Energy Storage (BESS) in Pune",
  description:
    "How PowerNetPro battery energy storage works — LFP cells, BMS, hybrid inverter, EMS and safety architecture. Engineered hardware, explained plainly.",
  path: "/battery-storage",
});

const heroChips = ["LFP chemistry", "10 yr+ design life", "< 20 ms backup", "Silent · 0 dB", "Modular & scalable"];

const buildSteps = [
  {
    t: "Cell",
    src: media.cell,
    h: "A single lithium iron phosphate (LFP) cell — the safest, longest-life chemistry in the industry. It stays stable under heat, tolerates deep cycling, and is rated for thousands of full charge/discharge cycles.",
  },
  {
    t: "Module",
    src: media.module,
    h: "Cells are matched, arranged and wired into a module, then wrapped with sensing so voltage and temperature are tracked at the cell level — not just across the whole pack.",
  },
  {
    t: "Pack",
    src: media.pack,
    h: "Modules, the BMS and thermal management are sealed into a rated enclosure — a finished, protected product built for your wall, floor or rack.",
  },
];

const components = [
  {
    n: "01",
    name: "LFP cells",
    plain: "The safe, long-life chemistry we build on.",
    detail:
      "Lithium iron phosphate cells give high cycle life, a wide safety margin and stable thermal behaviour. They're rated for thousands of full cycles at high depth of discharge, so the pack keeps its usable capacity for a decade or more.",
  },
  {
    n: "02",
    name: "BMS — Battery Management System",
    plain: "The brain that keeps every cell healthy.",
    detail:
      "The BMS monitors voltage, current and temperature on every module, balances the cells and enforces hard protection limits. It's the difference between a loose bank of batteries and a finished, dependable product.",
  },
  {
    n: "03",
    name: "PCS / hybrid inverter",
    plain: "Converts and directs the power.",
    detail:
      "The power conversion system manages charge and discharge, grid interaction and backup switchover — transferring your loads to the battery fast enough that connected equipment never sees the gap.",
  },
  {
    n: "04",
    name: "EMS — Energy Management System",
    plain: "Decides when to charge and discharge.",
    detail:
      "The EMS runs the strategy: charging on cheap or solar hours, discharging at peak tariff, and always reserving capacity for backup — tuned to your tariff plan and the priorities you set.",
  },
  {
    n: "05",
    name: "Protection & monitoring",
    plain: "Safety and visibility, built in.",
    detail:
      "Fusing, isolation, earth protection and thermal management are engineered into every layer, with remote monitoring so drift and faults are caught early — before they become a problem.",
  },
];

const modeIcon = ["sun", "bolt", "shield"];
const modeDetail = [
  "During cheap off-peak hours — or when your solar is producing more than you're using — the system quietly charges, storing energy at its lowest possible cost.",
  "As tariffs climb into peak hours, the battery powers your building instead of the grid, shaving both your energy bill and demand charges.",
  "The instant the grid fails, the inverter transfers your loads to the battery in under 20 ms — fast enough that lights, fans and equipment never flicker.",
];

const safetyLayers = [
  { t: "Safe chemistry", icon: "battery", d: "LFP is intrinsically stable — it doesn't head into thermal runaway the way other lithium chemistries can. Safety starts at the cell." },
  { t: "Cell-level BMS", icon: "shield", d: "Continuous monitoring of voltage, current and temperature per module, with active balancing and hard protection cut-offs." },
  { t: "Electrical protection", icon: "bolt", d: "Fusing, isolation and proper earthing on every install — sized, wired and documented to standard." },
  { t: "Thermal management", icon: "sun", d: "Airflow and thermal design keep cells in their optimal band, in Indian heat and enclosed cabinets alike." },
  { t: "Fail-safe by design", icon: "shield", d: "If anything moves out of range, the system shuts down safely rather than pushing on. Fault, not fire." },
  { t: "Monitoring & alerts", icon: "bolt", d: "Remote monitoring surfaces early warnings, so service is planned ahead — never an emergency." },
];

const tiers = [
  ["Home", "5 – 15 kWh", "3 – 8 kW", "LFP", "Wall / floor cabinet"],
  ["Society / Commercial", "15 – 60 kWh", "10 – 30 kW", "LFP", "Floor / rack"],
  ["Industrial", "60 kWh+", "50 kW+", "LFP", "Rack / containerised"],
];

export default function BatteryStoragePage() {
  return (
    <>
      <JsonLd data={serviceJsonLd({
        name: "Battery Energy Storage System (BESS) installation",
        description: "Design, supply, installation and commissioning of lithium (LFP) and lead-acid battery energy storage for homes, housing societies, offices and industry.",
        path: "/battery-storage",
        serviceType: "Battery energy storage installation",
      })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Battery Storage", path: "/battery-storage" },
      ])} />
      <PageHero
        kicker="Battery storage"
        title="Engineered hardware, not a commodity box"
        lead="A PowerNetPro system is designed from the cell up. Here's exactly how it goes together — in plain language, with the technical detail right alongside for anyone who wants it."
        media={{ src: media.batteryProduct, alt: "PowerNetPro battery pack" }}
      >
        <div className="flex flex-wrap gap-2">
          {heroChips.map((chip) => (
            <span key={chip} className="rounded-pill border border-hairline bg-surface px-3 py-1.5 text-caption font-medium text-ink-2">
              {chip}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Cell → module → pack */}
      <section className="border-b border-hairline bg-surface">
        <div className="container-content section-y">
          <SectionHeading
            align="center"
            kicker="How it's built"
            title="From a single cell to a finished pack"
            lead="Three stages take raw chemistry to a sealed, protected product. Nothing is left as a loose assembly of parts."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-12">
            {buildSteps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="group flex h-full flex-col overflow-hidden rounded-card-lg border border-hairline bg-bg shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative">
                  <Media src={s.src} alt={s.t} ratio="4/3" rounded="none" />
                  <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-caption font-bold text-white shadow-card">
                    {i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-h3 text-ink">{s.t}</h3>
                  <p className="mt-2 text-body text-ink-2">{s.h}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Component breakdown */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading
            kicker="Inside the system"
            title="What every system is made of"
            lead="Five parts, each doing one job well. Here's what they are and why they matter — no jargon left unexplained."
          />
          <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-2">
            {components.map((c, i) => (
              <Reveal key={c.name} delay={(i % 2) * 0.06} className={i === components.length - 1 ? "lg:col-span-2" : ""}>
                <div className="flex h-full gap-5 rounded-card-lg border border-hairline bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft lg:p-7">
                  <span className="nums shrink-0 font-display text-h1 font-bold leading-none text-accent/30">{c.n}</span>
                  <div>
                    <h3 className="font-display text-h3 text-ink">{c.name}</h3>
                    <p className="mt-1.5 text-body font-medium text-ink">{c.plain}</p>
                    <p className="mt-2 text-body text-ink-2">{c.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operating modes */}
      <section className="border-y border-hairline bg-forest text-white">
        <div className="container-content section-y">
          <SectionHeading
            align="center"
            onDark
            kicker="Operating modes"
            title="Charge, discharge, backup"
            lead="The same three behaviours, running automatically around your tariff and priorities — no buttons to press."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-12">
            {operatingModes.map((m, i) => (
              <Reveal as="div" key={m.title} delay={i * 0.08} className="flex h-full flex-col rounded-card-lg border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon name={modeIcon[i]} className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-accent/20 px-2.5 py-1 text-caption font-semibold text-accent">{m.accent}</span>
                </div>
                <h3 className="mt-4 font-display text-h3 text-white">{m.title}</h3>
                <p className="mt-2 text-body text-white/75">{m.body}</p>
                <p className="mt-3 text-body text-white/55">{modeDetail[i]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Spec tables */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading
            kicker="Specifications"
            title="System tiers at a glance"
            lead="Indicative ranges by building type. Your exact configuration — capacity, inverter and layout — comes from the free audit."
          />
          <div className="mt-10">
            <SpecTable caption="Battery storage system tiers" columns={["Tier", "Usable capacity", "Inverter", "Chemistry", "Enclosure"]} rows={tiers} />
          </div>
          <p className="mt-4 text-caption text-ink-3">
            Systems are modular — capacity and power are configured to your loads and site, then scaled later if your needs grow.
          </p>
        </div>
      </section>

      {/* Safety */}
      <section className="border-t border-hairline bg-surface">
        <div className="container-content section-y">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              kicker="Safety architecture"
              title="Safe by design, not by luck"
              lead="Safety isn't a single feature — it's engineered in at every layer, from the chemistry of the cell to the earthing of the final install. Here's what that means in practice."
            />
            <Reveal delay={0.1}>
              <Media src={media.safety} alt="Battery safety and protection detail" ratio="4/3" rounded="card-lg" className="shadow-lift" />
            </Reveal>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {safetyLayers.map((l, i) => (
              <Reveal key={l.t} delay={i * 0.05}>
                <div className="h-full rounded-card-lg border border-hairline bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-soft text-forest">
                    <Icon name={l.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-h3 text-ink">{l.t}</h3>
                  <p className="mt-1.5 text-body text-ink-2">{l.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand headline="Want this sized for your building?" />
    </>
  );
}
