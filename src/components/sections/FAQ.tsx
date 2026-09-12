import { SectionHeading } from "@/components/ui/SectionHeading";
import { Expandable } from "@/components/ui/Expandable";
import { Reveal } from "@/components/motion/Reveal";
import { Button, ArrowRight } from "@/components/ui/Button";
import { faqs } from "@/lib/content";
import { faqJsonLd } from "@/lib/seo";

/** FAQ section — objection-handling (conversion) + FAQPage schema (SEO). */
export function FAQ() {
  return (
    <section className="section-y">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              kicker="Questions"
              title="Everything you're wondering, answered"
              lead="Can't find it here? Talk to us — a real engineer will walk you through it, no sales script."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/free-audit">Get a free audit <ArrowRight /></Button>
              <Button href="/contact" variant="secondary">Contact us</Button>
            </div>
          </div>

          <div className="grid gap-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <Expandable title={f.q} defaultOpen={i === 0}>
                  <p>{f.a}</p>
                </Expandable>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs.map((f) => ({ q: f.q, a: f.a })))) }}
      />
    </section>
  );
}
