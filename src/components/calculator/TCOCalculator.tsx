"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Plain-language lithium vs lead-acid comparison. The visitor picks how they'll
 * use the battery (in everyday words), and sees how many battery banks each
 * chemistry needs over 10 years — shown as a row of battery icons. No jargon,
 * no pricing; the free audit gives the exact figure.
 */

const YEARS = 10;
const LFP = { label: "Lithium (LFP)", cyclesLife: 6000, tone: "#1F3D34" };
const LEAD = { label: "Lead-Acid", cyclesLife: 700, tone: "#8C8477" };

const USAGE = [
  { id: "backup", label: "Backup only", hint: "Just for power cuts", cyc: 30 },
  { id: "weekly", label: "A few times a week", hint: "Light use", cyc: 150 },
  { id: "daily", label: "Once a day", hint: "Typical home / office", cyc: 300 },
  { id: "heavy", label: "Twice a day", hint: "Heavy daily use", cyc: 600 },
];

function BatteryIcon({ tone }: { tone: string }) {
  return (
    <svg viewBox="0 0 40 22" className="h-6 w-11" fill="none" aria-hidden>
      <rect x="1" y="1" width="34" height="20" rx="4" fill={tone} fillOpacity="0.14" stroke={tone} strokeWidth="1.4" />
      <rect x="5" y="5" width="26" height="12" rx="2" fill={tone} />
      <rect x="36" y="7" width="3.4" height="8" rx="1.5" fill={tone} />
    </svg>
  );
}

function BatteryRow({ count, tone }: { count: number; tone: string }) {
  return (
    <div className="flex flex-wrap gap-1.5" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <BatteryIcon key={i} tone={tone} />
      ))}
    </div>
  );
}

export function TCOCalculator() {
  const [usageId, setUsageId] = useState("daily");
  const usage = USAGE.find((u) => u.id === usageId) ?? USAGE[2];

  const result = useMemo(() => {
    const total = usage.cyc * YEARS;
    const banks = (life: number) => Math.max(1, Math.ceil(total / life));
    return { lfp: banks(LFP.cyclesLife), lead: banks(LEAD.cyclesLife) };
  }, [usage.cyc]);

  const leadYears = LEAD.cyclesLife / usage.cyc;
  const tie = result.lfp === result.lead;

  const summary = tie
    ? `At this level of use, both last the full ${YEARS} years — so lead-acid can be the cheaper, sensible choice.`
    : `You'd buy lithium once, but replace lead-acid about ${result.lead} times over ${YEARS} years.`;

  return (
    <div className="rounded-card-lg border border-hairline bg-surface p-6 shadow-card lg:p-8">
      {/* Step 1 — how will you use it? */}
      <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-3">How will you use it?</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="How will you use the battery">
        {USAGE.map((u) => {
          const active = u.id === usageId;
          return (
            <button
              key={u.id}
              type="button"
              aria-pressed={active}
              onClick={() => setUsageId(u.id)}
              className={cn(
                "rounded-card border px-3 py-3 text-left transition-all",
                active ? "border-accent bg-accent/[0.06] shadow-soft" : "border-hairline bg-bg hover:border-accent/40",
              )}
            >
              <span className={cn("block text-body font-semibold", active ? "text-accent-dark" : "text-ink")}>{u.label}</span>
              <span className="mt-0.5 block text-caption text-ink-3">{u.hint}</span>
            </button>
          );
        })}
      </div>

      {/* Plain-language verdict */}
      <p className="mt-6 text-body-lg text-ink">
        Over {YEARS} years, <span className="font-semibold">{summary}</span>
      </p>

      {/* Step 2 — how many batteries you'd buy */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ResultCard
          label={LFP.label}
          tone={LFP.tone}
          count={result.lfp}
          badge={!tie ? "Fewer to buy" : undefined}
          headline={result.lfp === 1 ? "Buy it once" : `About ${result.lfp} banks`}
          sub={`Lasts the full ${YEARS} years at this usage.`}
          highlight={!tie}
        />
        <ResultCard
          label={LEAD.label}
          tone={LEAD.tone}
          count={result.lead}
          headline={result.lead === 1 ? "Buy it once" : `About ${result.lead} banks`}
          sub={
            result.lead === 1
              ? `Lasts the full ${YEARS} years at this usage.`
              : `Needs replacing roughly every ${leadYears.toFixed(1)} years.`
          }
          highlight={false}
        />
      </div>

      <p className="mt-5 text-caption text-ink-3">
        A rough guide, not a quote. Lead-acid can genuinely be the smarter buy for backup-only use — the free audit tells
        you honestly which fits, with the exact figure. We don&apos;t quote prices online.
      </p>
    </div>
  );
}

function ResultCard({
  label,
  tone,
  count,
  headline,
  sub,
  badge,
  highlight,
}: {
  label: string;
  tone: string;
  count: number;
  headline: string;
  sub: string;
  badge?: string;
  highlight: boolean;
}) {
  return (
    <div className={cn("rounded-card border p-5", highlight ? "border-accent bg-accent/[0.04]" : "border-hairline bg-bg")}>
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-display text-h3 text-ink">{label}</h4>
        {badge && <span className="rounded-pill bg-accent px-2.5 py-0.5 text-caption font-semibold text-white">{badge}</span>}
      </div>

      <div className="mt-4 min-h-[3.25rem]">
        <BatteryRow count={count} tone={tone} />
      </div>

      <p className="mt-4 font-display text-h2 text-ink">{headline}</p>
      <p className="mt-1 text-body text-ink-2">{sub}</p>
      <p className="mt-3 text-caption text-ink-3">
        {count === 1 ? "1 battery bank" : `${count} battery banks`} over {YEARS} years
      </p>
    </div>
  );
}
