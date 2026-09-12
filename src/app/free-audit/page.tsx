import { buildMetadata } from "@/lib/seo";
import { AuditForm } from "@/components/audit/AuditForm";
import { WhatsAppButton, CallButton } from "@/components/ui/ContactButtons";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildMetadata({
  title: "Free Backup & Demand Cost Audit",
  description:
    "Request your free, no-obligation energy audit from PowerNetPro. Share your electricity bills and we will size the right battery storage and solar system for you.",
  path: "/free-audit",
});

const chips = ["100% free", "Reply in 2 working days", "Reviewed by an engineer", "Your data protected"];

const steps = [
  { n: "01", t: "Share your details", d: "Fill the short form and add a recent electricity bill or two — optional, but it sharpens the estimate." },
  { n: "02", t: "We review & size", d: "A real engineer studies your load and tariff, then sizes the right storage — and solar, if it fits." },
  { n: "03", t: "Get the real numbers", d: "A clear, honest proposal — capacity, backup time and payback. No cost, no obligation." },
];

const trustPoints = [
  { title: "No cost, no obligation", body: "The audit is genuinely free. You decide what happens next." },
  { title: siteConfig.responseCommitment, body: "A real engineer reviews your load and bills, not an auto-reply." },
  { title: "Your data is protected", body: "Bills are stored securely, used only for your audit, and deleted within 12 months. Request deletion any time." },
];

function TrustCheck() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function FreeAuditPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hairline bg-surface">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="container-content relative pb-10 pt-24 lg:pb-14 lg:pt-32">
          <div className="max-w-2xl">
            <span className="kicker"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Free audit</span>
            <h1 className="mt-5 font-display text-display text-ink text-balance">Your free backup &amp; cost audit</h1>
            <p className="mt-5 max-w-xl text-body-lg text-ink-2">
              Tell us about your property and share a recent electricity bill or two. We&apos;ll size the right system and
              show you the real numbers — no cost, no obligation.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-bg px-3 py-1.5 text-caption font-medium text-ink-2">
                  <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-hairline bg-bg-2">
        <div className="container-content py-10 lg:py-12">
          <p className="text-caption font-semibold uppercase tracking-[0.16em] text-accent">How it works</p>
          <div className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <span className="nums font-display text-h1 font-bold leading-none text-accent/25">{s.n}</span>
                <h3 className="mt-2 font-display text-h3 text-ink">{s.t}</h3>
                <p className="mt-1.5 text-body text-ink-2">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="section-y">
        <div className="container-content">
          <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
            {/* Form */}
            <div>
              <div className="rounded-card-lg border border-hairline bg-surface p-6 shadow-card lg:p-8">
                <h2 className="font-display text-h3 text-ink">Tell us about your property</h2>
                <p className="mt-1.5 text-body text-ink-2">Takes about a minute — fields marked optional can be skipped.</p>
                <div className="mt-7">
                  <AuditForm />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="rounded-card-lg border border-hairline bg-surface p-6 shadow-card">
                  <h2 className="font-display text-h3 text-ink">Prefer to talk?</h2>
                  <p className="mt-2 text-body text-ink-2">Send your bills straight to us on WhatsApp, or call and we&apos;ll take it from there.</p>
                  <div className="mt-5 flex flex-col gap-3">
                    <WhatsAppButton label="Send bills on WhatsApp" prefilled="Hi PowerNetPro, I'd like a free energy audit." className="w-full" />
                    <CallButton label={`Call ${siteConfig.phone.display}`} className="w-full" variant="ghost" />
                  </div>
                </div>

                <div className="rounded-card-lg border border-hairline bg-bg p-6">
                  <ul className="space-y-5">
                    {trustPoints.map((point) => (
                      <li key={point.title} className="flex gap-3">
                        <TrustCheck />
                        <div>
                          <p className="font-semibold text-ink">{point.title}</p>
                          <p className="mt-0.5 text-caption text-ink-3">{point.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
