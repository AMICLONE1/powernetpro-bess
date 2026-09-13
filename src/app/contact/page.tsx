import { buildMetadata } from "@/lib/seo";
import { siteConfig, telLink } from "@/lib/site-config";
import { PageHero } from "@/components/sections/PageHero";
import { WhatsAppButton, CallButton } from "@/components/ui/ContactButtons";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: "Contact — Battery & Solar Enquiries, Pune",
  description:
    "Contact PowerNetPro for battery storage and solar EPC across Pune and Maharashtra. Call, WhatsApp or request a free audit.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Let's talk power"
        lead="The fastest way to get moving is a free audit — but you're welcome to call or message us first."
      />
      <section className="section-y">
        <div className="container-content">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-card-lg border border-hairline bg-surface p-8">
                <h2 className="font-display text-h3 text-ink">Reach us directly</h2>
                <dl className="mt-6 space-y-4 text-body">
                  <div>
                    <dt className="text-caption uppercase tracking-wide text-ink-3">Phone</dt>
                    <dd><a href={telLink()} className="text-ink hover:text-accent">{siteConfig.phone.display}</a></dd>
                  </div>
                  <div>
                    <dt className="text-caption uppercase tracking-wide text-ink-3">Email</dt>
                    <dd><a href={`mailto:${siteConfig.email.sales}`} className="text-ink hover:text-accent">{siteConfig.email.sales}</a></dd>
                  </div>
                  <div>
                    <dt className="text-caption uppercase tracking-wide text-ink-3">Service area</dt>
                    <dd className="text-ink">{siteConfig.address.serviceArea}</dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <WhatsAppButton label="Chat on WhatsApp" prefilled={`Hi ${siteConfig.company}! I have a question about your battery backup and solar systems.`} />
                  <CallButton label="Call now" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-center rounded-card-lg bg-forest p-8 text-white">
                <h2 className="font-display text-h3 text-white">Ready for the numbers?</h2>
                <p className="mt-3 text-body text-white/70">Request a free, no-obligation audit and we&apos;ll size the right system and show you the real costs and savings.</p>
                <div className="mt-6"><Button href="/free-audit" size="lg">Get your free quote <ArrowRight /></Button></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
