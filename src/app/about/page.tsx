import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABand } from "@/components/sections/CTABand";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icons";
import { media } from "@/lib/media";

export const metadata = buildMetadata({
  title: "About",
  description:
    "PowerNetPro Private Limited — engineering-led battery energy storage for homes, societies and business across Pune & Maharashtra. Our mission, vision, values and company registration details.",
  path: "/about",
});

const facts = [
  { k: "Founded", v: siteConfig.registration.founded },
  { k: "Headquarters", v: "Pune · India" },
  { k: "Focus", v: "Battery Energy Storage" },
  { k: "Model", v: "Engineering-led EPC" },
];

const drivers = [
  { title: "Accessibility", body: "Engineered storage within reach of every home and society — not just heavy industry.", icon: "home" },
  { title: "Community", body: "Shared, society-scale systems that power entire buildings and neighbourhoods.", icon: "building" },
  { title: "Simplicity", body: "Silent, no-maintenance power — no fuel, no noise, no rituals.", icon: "battery" },
  { title: "Impact", body: "Every kWh stored cuts diesel, carbon and energy costs.", icon: "bolt" },
];

const registeredOffice = `${siteConfig.address.street}, Pune City, ${siteConfig.address.locality} – ${siteConfig.address.postalCode}, ${siteConfig.address.region}, India`;

const registration: { k: string; v: string; href?: string }[] = [
  { k: "Legal name", v: siteConfig.registration.legalName },
  { k: "Corporate Identification Number (CIN)", v: siteConfig.registration.cin },
  { k: "Startup India Recognition (DPIIT)", v: siteConfig.registration.dipp },
  { k: "Registered office", v: registeredOffice },
  { k: "Email", v: siteConfig.email.info, href: `mailto:${siteConfig.email.info}` },
  { k: "Phone", v: siteConfig.phone.display, href: `tel:${siteConfig.phone.tel}` },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About PowerNetPro"
        title="Making reliable, clean power accessible to every home and society"
        lead="No noise. No fuel. No maintenance rituals. Just silent, engineered battery energy storage — sized to your loads and backed by a team that shows up."
        media={{ src: media.team, alt: "PowerNetPro team on site" }}
      />

      {/* Quick facts */}
      <section className="border-b border-hairline bg-surface">
        <div className="container-content grid grid-cols-2 divide-x divide-y divide-hairline sm:divide-y-0 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.05} className="px-4 py-8 text-center lg:py-10">
              <div className="text-caption uppercase tracking-[0.14em] text-ink-3">{f.k}</div>
              <div className="mt-1.5 font-display text-h3 text-ink">{f.v}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="section-y">
        <div className="container-content">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading kicker="Our mission" title="Reliable power, within reach of everyone" className="lg:sticky lg:top-28 lg:self-start" />
            <Reveal>
              <p className="text-body-lg text-ink-2">
                To break the barrier between reliable, clean power and the people who need it most. Millions of urban
                Indian families and housing societies live with outages, diesel noise and rising tariffs — not because
                storage doesn&apos;t exist, but because dependable, well-engineered systems have felt out of reach. We
                exist to change that.
              </p>
              <p className="mt-4 text-body-lg text-ink-2">
                PowerNetPro designs and installs battery energy storage from the cell up — turning any home, society or
                business into its own power station. Silent backup through outages, cheaper energy in peak hours, and no
                compromises on safety or workmanship.
              </p>
              <blockquote className="mt-8 border-l-2 border-accent pl-6 font-display text-h3 text-ink">
                &ldquo;We believe reliable, clean power shouldn&apos;t depend on the kind of building you live in. One
                system at a time, we&apos;re making energy storage a basic utility — not a luxury.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="border-y border-hairline bg-surface">
        <div className="container-content section-y">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading kicker="Our vision" title="India's largest distributed storage network" className="lg:sticky lg:top-28 lg:self-start" />
            <Reveal>
              <p className="text-body-lg text-ink-2">
                A future where every home, society and business can depend on stored clean power as effortlessly as they
                recharge their phone. Thousands of buildings soaking up cheap and solar energy by day, carrying it
                through peak tariffs and outages, and sharing power across communities through a decentralized, digital
                energy layer.
              </p>
              <p className="mt-4 text-body-lg text-ink-2">
                PowerNetPro isn&apos;t just a battery company — we&apos;re building the infrastructure for how urban India
                will store, use and trade energy over the coming decade.
              </p>
              <blockquote className="mt-8 border-l-2 border-accent pl-6 font-display text-h3 text-ink">
                &ldquo;Our north star is simple: if you have an electricity bill, you should have access to clean,
                reliable backup. Period.&rdquo;
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What drives us */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading align="center" kicker="What drives us" title="The principles behind every install" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {drivers.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-card-lg border border-hairline bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon name={d.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-h3 text-ink">{d.title}</h3>
                  <p className="mt-2 text-body text-ink-2">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* On the ground / team */}
      <section className="border-t border-hairline bg-surface">
        <div className="container-content section-y">
          <SectionHeading kicker="On the ground" title="The people behind the systems" lead="A local team that surveys, installs and services every system across Pune and Maharashtra — and photographs the workmanship on every job." />
          <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2">
            <Reveal>
              <Media src={media.team} alt="PowerNetPro team on a rooftop project" ratio="4/3" rounded="card-lg" />
            </Reveal>
            <Reveal delay={0.1}>
              <Media src={media.solarInstall} alt="PowerNetPro installers fitting solar panels" ratio="4/3" rounded="card-lg" />
            </Reveal>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Certified", v: "Installation & electrical safety standards" },
              { k: "Documented", v: "Every install photographed — enclosure, cabling, earthing" },
              { k: "AMC-backed", v: "Monitoring and service that actually shows up" },
            ].map((c, i) => (
              <Reveal key={c.k} delay={i * 0.06}>
                <div className="h-full rounded-card border border-hairline bg-bg p-6">
                  <p className="font-display text-h3 text-accent">{c.k}</p>
                  <p className="mt-1.5 text-body text-ink-2">{c.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company registration */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading kicker="Corporate" title="Company registration details" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="rounded-card-lg border border-hairline bg-surface p-7 shadow-card lg:p-8">
              <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {registration.map((r) => (
                  <div key={r.k} className={r.k === "Registered office" ? "sm:col-span-2" : ""}>
                    <dt className="text-caption uppercase tracking-[0.12em] text-ink-3">{r.k}</dt>
                    <dd className="mt-1 text-body font-medium text-ink">
                      {r.href ? (
                        <a href={r.href} className="text-accent hover:underline">{r.v}</a>
                      ) : (
                        r.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-card-lg border border-hairline bg-bg p-7 lg:p-8">
              <span className="inline-flex items-center gap-2 rounded-pill bg-forest-soft px-3 py-1 text-caption font-semibold text-forest">
                <span className="h-1.5 w-1.5 rounded-full bg-forest" /> Startup India · DPIIT recognized
              </span>
              <p className="mt-4 text-body text-ink-2">
                {siteConfig.registration.legalName} is a company registered under the Companies Act, 2013, recognized by
                Startup India under the Department for Promotion of Industry and Internal Trade (DPIIT).
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
