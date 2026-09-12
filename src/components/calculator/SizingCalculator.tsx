"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  APPLIANCE_PRESETS,
  computeSizing,
  type PropertyType,
  type CustomLoad,
} from "@/lib/sizing";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const PROPERTY_TABS: { id: PropertyType; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "office", label: "Office", icon: "office" },
  { id: "industrial", label: "Industrial", icon: "factory" },
];

const DURATIONS = [
  { h: 2, label: "Short" },
  { h: 4, label: "Evening" },
  { h: 8, label: "Overnight" },
  { h: 12, label: "Long" },
  { h: 24, label: "Full day" },
];

// Matches the sizing engine's usable fraction (DoD × round-trip efficiency),
// used only to show a realistic runtime in the simulation.
const USABLE_FRACTION = 0.9 * 0.9;
const START_MIN = 20 * 60; // simulate an outage starting 8:00 PM
const SIM_MS = 7000; // real seconds the fast-forward drain takes to watch

let customIdSeq = 0;

function fmtDuration(hours: number) {
  if (hours <= 0) return "0m";
  let h = Math.floor(hours);
  let m = Math.round((hours - h) * 60);
  if (m === 60) { h += 1; m = 0; }
  return h ? `${h}h ${m}m` : `${m}m`;
}

function fmtClock(minutesFromMidnight: number) {
  const total = ((Math.round(minutesFromMidnight) % 1440) + 1440) % 1440;
  let h = Math.floor(total / 60);
  const m = total % 60;
  const ampm = h < 12 ? "AM" : "PM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

function goalPhrase(h: number) {
  if (h <= 2) return "A short outage";
  if (h <= 5) return "Through the evening";
  if (h <= 9) return "Overnight";
  if (h <= 16) return "A long outage";
  return "A full day and more";
}

export function SizingCalculator() {
  const [propertyType, setPropertyType] = useState<PropertyType>("home");
  const [quantities, setQuantities] = useState<Record<string, number>>(() => seedQuantities("home"));
  const [customLoads, setCustomLoads] = useState<CustomLoad[]>([]);
  const [backupHours, setBackupHours] = useState(4);
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  const presets = APPLIANCE_PRESETS[propertyType];
  const isCandI = propertyType !== "home";

  const result = useMemo(
    () => computeSizing({ propertyType, quantities, backupHours, customLoads }),
    [propertyType, quantities, backupHours, customLoads],
  );

  // Realistic runtime of the (rounded-up) sized battery under the chosen load.
  const runtimeH = result.runningWatts > 0 ? (result.usableKwh * USABLE_FRACTION) / (result.runningWatts / 1000) : 0;

  const activeCount =
    Object.values(quantities).filter((v) => v > 0).length +
    customLoads.filter((l) => (l.watts || 0) > 0 && (l.qty || 0) > 0).length;

  useEffect(() => {
    if (result.usableKwh > 0 && !completedRef.current) {
      completedRef.current = true;
      track("calculator_complete", { usable_kwh: result.usableKwh });
    }
  }, [result.usableKwh]);

  function markStart() {
    if (!startedRef.current) {
      startedRef.current = true;
      track("calculator_start");
    }
  }

  function switchProperty(next: PropertyType) {
    markStart();
    setPropertyType(next);
    setQuantities(seedQuantities(next));
    setCustomLoads([]);
  }

  function setQty(id: string, qty: number) {
    markStart();
    setQuantities((q) => ({ ...q, [id]: Math.max(0, qty) }));
  }

  function addCustom() {
    markStart();
    setCustomLoads((c) => [...c, { id: `c${customIdSeq++}`, label: "", watts: 0, qty: 1 }]);
  }
  function updateCustom(id: string, patch: Partial<CustomLoad>) {
    setCustomLoads((c) => c.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }
  function removeCustom(id: string) {
    setCustomLoads((c) => c.filter((l) => l.id !== id));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
      {/* Inputs */}
      <div>
        <fieldset>
          <StepLegend n={1} label="What are we powering?" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {PROPERTY_TABS.map((tab) => {
              const active = propertyType === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchProperty(tab.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-card border px-3 py-3.5 text-center transition-all",
                    active ? "border-accent bg-accent/[0.06] shadow-soft" : "border-hairline bg-white hover:border-accent/40",
                  )}
                >
                  <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition-colors", active ? "bg-accent text-white" : "bg-bg-2 text-ink-2")}>
                    <Icon name={tab.icon} className="h-5 w-5" />
                  </span>
                  <span className={cn("text-body font-semibold", active ? "text-accent-dark" : "text-ink")}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Appliances */}
        <fieldset className="mt-8">
          <StepLegend
            n={2}
            label="Choose your loads"
            right={activeCount > 0 ? <span className="rounded-pill bg-forest-soft px-2.5 py-1 text-caption font-semibold normal-case tracking-normal text-forest">{activeCount} selected</span> : null}
          />
          <p className="mt-2 text-body text-ink-2">Set how many of each to keep running during a cut.</p>
          <div className="mt-4 space-y-2">
            {presets.map((appliance) => {
              const qty = quantities[appliance.id] ?? 0;
              const active = qty > 0;
              return (
                <div
                  key={appliance.id}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-card border px-4 py-2.5 transition-colors",
                    active ? "border-accent/40 bg-accent/[0.05]" : "border-hairline bg-white",
                  )}
                >
                  <div>
                    <p className="text-body font-medium text-ink">{appliance.label}</p>
                    <p className="text-caption text-ink-3">{appliance.watts} W each</p>
                  </div>
                  <Stepper value={qty} onChange={(v) => setQty(appliance.id, v)} label={appliance.label} />
                </div>
              );
            })}
          </div>

          {isCandI && (
            <div className="mt-5 rounded-card border border-dashed border-hairline-2 bg-surface-2/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-body font-semibold text-ink">Add your own machinery</p>
                  <p className="text-caption text-ink-3">Don&apos;t see your equipment? Add it with its rating.</p>
                </div>
                <button type="button" onClick={addCustom} className="shrink-0 rounded-pill border border-accent/40 px-3 py-1.5 text-caption font-semibold text-accent transition-colors hover:bg-accent hover:text-white">
                  + Add load
                </button>
              </div>

              {customLoads.length > 0 && (
                <div className="mt-4 space-y-2">
                  {customLoads.map((l) => (
                    <div key={l.id} className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                      <input
                        value={l.label}
                        onChange={(e) => updateCustom(l.id, { label: e.target.value })}
                        placeholder="e.g. CNC lathe"
                        aria-label="Load name"
                        className="h-9 min-w-0 flex-1 basis-full rounded-lg border border-hairline bg-white px-3 text-body text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:basis-auto"
                      />
                      <div className="flex items-center rounded-lg border border-hairline bg-white">
                        <input
                          type="number"
                          min={0}
                          value={l.watts || ""}
                          onChange={(e) => updateCustom(l.id, { watts: Number(e.target.value) })}
                          placeholder="0"
                          aria-label="Watts per unit"
                          className="h-9 w-20 bg-transparent px-2 text-right text-body text-ink placeholder:text-ink-3 focus:outline-none"
                        />
                        <span className="pr-2 text-caption text-ink-3">W</span>
                      </div>
                      <div className="flex items-center rounded-lg border border-hairline bg-white">
                        <span className="pl-2 text-caption text-ink-3">×</span>
                        <input
                          type="number"
                          min={1}
                          value={l.qty}
                          onChange={(e) => updateCustom(l.id, { qty: Math.max(1, Number(e.target.value)) })}
                          aria-label="Quantity"
                          className="h-9 w-12 bg-transparent px-1 text-center text-body text-ink focus:outline-none"
                        />
                      </div>
                      <button type="button" onClick={() => removeCustom(l.id)} aria-label="Remove load" className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-3 hover:text-red-600">
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </fieldset>

        {/* Backup goal */}
        <fieldset className="mt-8">
          <StepLegend n={3} label="How long should it last?" />
          <div className="mt-3 flex flex-wrap gap-2">
            {DURATIONS.map((d) => {
              const active = backupHours === d.h;
              return (
                <button
                  key={d.h}
                  type="button"
                  onClick={() => { markStart(); setBackupHours(d.h); }}
                  aria-pressed={active}
                  className={cn(
                    "rounded-pill border px-3 py-1.5 text-caption font-semibold transition-all",
                    active ? "border-accent bg-accent text-white" : "border-hairline bg-white text-ink-2 hover:border-accent/40",
                  )}
                >
                  {d.label} · {d.h}h
                </button>
              );
            })}
          </div>
          <div className="mt-5">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-h3 text-ink">{backupHours} hours</span>
              <span className="text-caption font-medium text-ink-3">{goalPhrase(backupHours)}</span>
            </div>
            <input
              type="range"
              min={1}
              max={24}
              step={1}
              value={backupHours}
              onChange={(e) => { markStart(); setBackupHours(Number(e.target.value)); }}
              aria-label="Backup duration in hours"
              className="range mt-3 w-full"
              style={{ backgroundImage: `linear-gradient(to right, #e4622e 0%, #e4622e ${((backupHours - 1) / 23) * 100}%, #e4dccd ${((backupHours - 1) / 23) * 100}%, #e4dccd 100%)` }}
            />
            <div className="mt-1.5 flex justify-between text-caption text-ink-3">
              <span>1h</span>
              <span>12h</span>
              <span>24h</span>
            </div>
          </div>
        </fieldset>
      </div>

      {/* Simulator */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Simulator
          usableKwh={result.usableKwh}
          inverterKw={result.inverterKw}
          runtimeH={runtimeH}
          loads={result.supportedLoads}
        />
      </aside>
    </div>
  );
}

function Simulator({
  usableKwh,
  inverterKw,
  runtimeH,
  loads,
}: {
  usableKwh: number;
  inverterKw: number;
  runtimeH: number;
  loads: { label: string; watts: number }[];
}) {
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const ready = usableKwh > 0 && runtimeH > 0;

  // Reset the simulation whenever the sized system changes.
  useEffect(() => {
    setPhase("idle");
    setProgress(0);
  }, [usableKwh, runtimeH]);

  useEffect(() => {
    if (phase !== "playing") return;
    let raf = 0;
    let startTs = 0;
    const step = (t: number) => {
      if (!startTs) startTs = t;
      const p = Math.min(1, (t - startTs) / SIM_MS);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(step);
      else setPhase("done");
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const level = phase === "idle" ? 1 : 1 - progress;
  const elapsedH = runtimeH * progress;
  const remainingH = runtimeH * (1 - progress);
  const clockNow = fmtClock(START_MIN + elapsedH * 60);
  const clockEnd = fmtClock(START_MIN + runtimeH * 60);

  const fill =
    level > 0.4
      ? "linear-gradient(180deg,#2b5749,#1F3D34)"
      : level > 0.15
        ? "linear-gradient(180deg,#f7b33f,#e0951a)"
        : "linear-gradient(180deg,#ea6a37,#c24e20)";

  const shortLoads = loads.map((l) => l.label.split("(")[0].trim()).slice(0, 7);
  const off = phase === "done";

  const start = () => {
    // Respect reduced-motion: skip the drain, jump to the outcome.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      setPhase("done");
      return;
    }
    setProgress(0);
    setPhase("playing");
  };
  const reset = () => { setProgress(0); setPhase("idle"); };

  return (
    <div className="rounded-card-lg border border-hairline bg-surface p-5 shadow-soft lg:p-6">
      {/* Battery */}
      <div className="flex items-stretch gap-1.5">
        <div className="relative h-44 flex-1 overflow-hidden rounded-2xl rounded-r-lg border-[3px] border-ink/12 bg-bg-2">
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: `${Math.max(0, level) * 100}%`, background: fill, transition: phase === "idle" ? "width 0.4s ease" : "none" }}
          />
          {/* readout */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="rounded-xl bg-white/80 px-5 py-3 text-center shadow-card backdrop-blur-sm">
              {!ready ? (
                <>
                  <div className="font-display text-h3 text-ink">Add a few loads</div>
                  <div className="mt-0.5 text-caption text-ink-3">Pick what to keep running →</div>
                </>
              ) : phase === "idle" ? (
                <>
                  <div className="text-caption font-semibold uppercase tracking-wide text-ink-3">Your system</div>
                  <div className="nums font-display text-display leading-none text-ink">
                    {usableKwh}
                    <span className="ml-1 text-h3">kWh</span>
                  </div>
                  <div className="mt-1 text-caption text-ink-3">Charged · {inverterKw} kW inverter</div>
                </>
              ) : phase === "playing" ? (
                <>
                  <div className="text-caption font-semibold uppercase tracking-wide text-ink-3">Power cut · {clockNow}</div>
                  <div className="nums font-display text-display leading-none text-ink">{fmtDuration(remainingH)}</div>
                  <div className="mt-1 text-caption text-ink-3">of backup left</div>
                </>
              ) : (
                <>
                  <div className="text-caption font-semibold uppercase tracking-wide text-accent-dark">Backup delivered</div>
                  <div className="nums font-display text-h1 leading-none text-ink">{fmtDuration(runtimeH)}</div>
                  <div className="mt-1 text-caption text-ink-3">8:00 PM → {clockEnd}</div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* terminal */}
        <div className="my-auto h-16 w-2 rounded-r-md bg-ink/12" />
      </div>

      {/* Loads staying on */}
      {ready && shortLoads.length > 0 && (
        <div className="mt-4">
          <p className="text-caption text-ink-3">{off ? "These stayed on the whole time:" : "Keeping these running:"}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {shortLoads.map((l, i) => (
              <span
                key={i}
                className={cn(
                  "rounded-pill px-2.5 py-1 text-caption font-medium transition-colors",
                  off ? "bg-bg-2 text-ink-3" : "bg-forest-soft text-forest",
                )}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Screen-reader outcome — the battery drain is purely visual. Only the
          resolved result is announced (polite), never the per-frame updates. */}
      <p className="sr-only" role="status" aria-live="polite">
        {ready && off
          ? `This system runs your selection for about ${fmtDuration(runtimeH)} — from 8:00 PM to ${clockEnd}.`
          : ""}
      </p>

      {/* Control */}
      <div className="mt-5">
        {phase === "playing" ? (
          <button type="button" onClick={reset} className="flex w-full items-center justify-center gap-2 rounded-pill border border-hairline bg-surface py-3 text-body font-semibold text-ink-2 transition-colors hover:border-accent hover:text-accent">
            <span className="block h-3 w-3 rounded-[2px] bg-current" /> Stop
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            disabled={!ready}
            className="flex w-full items-center justify-center gap-2 rounded-pill bg-accent py-3 text-body font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
          >
            <PlayIcon /> {phase === "done" ? "Run it again" : "Start the power cut"}
          </button>
        )}
      </div>

      {/* Stats */}
      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-hairline pt-5">
        <Stat label="Usable capacity" value={usableKwh > 0 ? `${usableKwh} kWh` : "—"} />
        <Stat label="Inverter rating" value={inverterKw > 0 ? `${inverterKw} kW` : "—"} />
      </dl>

      <div className="mt-5">
        <Button href="/free-audit" className="w-full" onClick={() => track("calculator_to_audit")}>
          Get an exact quote — free audit <ArrowRight />
        </Button>
      </div>
      <p className="mt-3 text-center text-caption text-ink-3">A technical starting point. The free audit confirms the exact system and price.</p>
    </div>
  );
}

function StepLegend({ n, label, right }: { n: number; label: string; right?: React.ReactNode }) {
  return (
    <legend className="flex w-full items-center justify-between gap-3 text-caption font-semibold uppercase tracking-[0.14em] text-ink-3">
      <span className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/[0.12] font-display text-caption font-bold text-accent">{n}</span>
        {label}
      </span>
      {right}
    </legend>
  );
}

function PlayIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M4 3l9 5-9 5z" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-caption uppercase tracking-wide text-ink-3">{label}</dt>
      <dd className="mt-1 nums font-display text-h3 font-semibold text-ink">{value}</dd>
    </div>
  );
}

function Stepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="flex items-center gap-1 rounded-pill border border-hairline bg-surface">
      <button type="button" onClick={() => onChange(value - 1)} aria-label={`Decrease ${label}`} disabled={value <= 0} className="flex h-8 w-8 items-center justify-center rounded-full text-ink disabled:opacity-30">–</button>
      <span className="w-6 text-center text-body font-semibold text-ink" aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label={`Increase ${label}`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink">+</button>
    </div>
  );
}

function seedQuantities(type: PropertyType): Record<string, number> {
  const q: Record<string, number> = {};
  const essentials: Record<PropertyType, string[]> = {
    home: ["lights", "fans", "fridge", "wifi"],
    office: ["lights", "computers", "wifi"],
    industrial: ["controls", "office"],
  };
  for (const appliance of APPLIANCE_PRESETS[type]) {
    q[appliance.id] = essentials[type].includes(appliance.id) ? appliance.defaultQty : 0;
  }
  return q;
}
