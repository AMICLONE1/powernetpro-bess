export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-content pb-16 pt-24 lg:pb-[120px] lg:pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-h1 text-ink">{title}</h1>
        <p className="mt-2 text-caption text-ink-3">Last updated: {updated}</p>

        {/* Prominent notice: this is a draft pending legal review. */}
        <div className="mt-6 rounded-card border border-amber/40 bg-amber/5 p-4 text-body text-ink">
          <strong>Draft — pending legal review.</strong> This document is a
          working draft written to reflect India&apos;s Digital Personal Data
          Protection Act. It must be reviewed and approved by a legal adviser
          before the bill-upload feature goes live.
        </div>

        <div className="prose-legal mt-10 space-y-8">{children}</div>
      </div>
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-h3 text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 text-body text-ink-2">{children}</div>
    </section>
  );
}
