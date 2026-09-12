/**
 * Sizing calculator logic (PRD 4.5, Design Doc 4.5).
 *
 * Pure client-side computation (TRD 2.1). It outputs the technical sizing only —
 * usable capacity (kWh) and inverter rating (kW) — as a first-order starting
 * point before a proper site survey. No pricing is estimated here; the exact
 * quote comes from the free audit.
 *
 * The coefficients below are deliberately conservative placeholder engineering
 * assumptions — confirm against PowerNetPro's actual product range before launch.
 */

export type PropertyType = "home" | "office" | "industrial";

export type Appliance = {
  id: string;
  label: string;
  /** Running power draw per unit, watts. */
  watts: number;
  /** Default quantity when the appliance is enabled. */
  defaultQty: number;
  /** Fraction of the backup window this load is actually on (0–1). */
  dutyCycle: number;
};

/** Preset appliance lists per property type (PRD 4.5). */
export const APPLIANCE_PRESETS: Record<PropertyType, Appliance[]> = {
  home: [
    { id: "lights", label: "LED lights (whole home)", watts: 200, defaultQty: 1, dutyCycle: 0.8 },
    { id: "fans", label: "Ceiling fans", watts: 70, defaultQty: 4, dutyCycle: 0.8 },
    { id: "fridge", label: "Refrigerator", watts: 200, defaultQty: 1, dutyCycle: 0.4 },
    { id: "tv", label: "TV + set-top box", watts: 120, defaultQty: 1, dutyCycle: 0.5 },
    { id: "wifi", label: "Wi-Fi router", watts: 15, defaultQty: 1, dutyCycle: 1 },
    { id: "ac", label: "Air conditioner (1.5 ton)", watts: 1500, defaultQty: 1, dutyCycle: 0.6 },
    { id: "pump", label: "Water pump (0.5 HP)", watts: 400, defaultQty: 1, dutyCycle: 0.2 },
    { id: "kitchen", label: "Mixer / small kitchen", watts: 500, defaultQty: 1, dutyCycle: 0.15 },
  ],
  office: [
    { id: "lights", label: "Lighting (office floor)", watts: 800, defaultQty: 1, dutyCycle: 0.9 },
    { id: "computers", label: "Desktops + monitors", watts: 150, defaultQty: 8, dutyCycle: 0.8 },
    { id: "servers", label: "Server / network rack", watts: 600, defaultQty: 1, dutyCycle: 1 },
    { id: "ac", label: "Air conditioning (per 2 ton)", watts: 2200, defaultQty: 2, dutyCycle: 0.7 },
    { id: "printers", label: "Printers / peripherals", watts: 300, defaultQty: 1, dutyCycle: 0.3 },
    { id: "wifi", label: "Networking + Wi-Fi", watts: 100, defaultQty: 1, dutyCycle: 1 },
  ],
  industrial: [
    { id: "lighting", label: "Shop-floor lighting", watts: 3000, defaultQty: 1, dutyCycle: 0.9 },
    { id: "motors", label: "Motors / machines (per 5 HP)", watts: 3700, defaultQty: 2, dutyCycle: 0.7 },
    { id: "compressor", label: "Air compressor (per 10 HP)", watts: 7500, defaultQty: 1, dutyCycle: 0.5 },
    { id: "controls", label: "PLC / controls / instrumentation", watts: 1000, defaultQty: 1, dutyCycle: 1 },
    { id: "cooling", label: "Process cooling / HVAC", watts: 5000, defaultQty: 1, dutyCycle: 0.6 },
    { id: "office", label: "Office + IT loads", watts: 1500, defaultQty: 1, dutyCycle: 0.7 },
  ],
};

// Engineering assumptions (placeholder — confirm before launch).
const USABLE_DOD = 0.9; // LFP usable depth of discharge
const SYSTEM_EFFICIENCY = 0.9; // round-trip + inverter losses applied to energy
const INVERTER_SURGE_HEADROOM = 1.25; // peak sizing over continuous running load
const POWER_FACTOR = 0.8; // for kVA-ish inverter sizing

/** A user-defined C&I load (machinery we can't preset). */
export type CustomLoad = {
  id: string;
  label: string;
  watts: number; // per-unit running watts (or total if qty=1)
  qty: number;
};

export type SizingInput = {
  propertyType: PropertyType;
  quantities: Record<string, number>; // applianceId -> qty
  backupHours: number;
  customLoads?: CustomLoad[];
};

export type SizingResult = {
  runningWatts: number;
  peakWatts: number;
  inverterKw: number;
  usableKwh: number;
  supportedLoads: { label: string; watts: number }[];
};

/** Round up to a sensible product step so the number reads like a real system. */
function roundStep(value: number, step: number) {
  return Math.max(step, Math.ceil(value / step) * step);
}

export function computeSizing(input: SizingInput): SizingResult {
  const presets = APPLIANCE_PRESETS[input.propertyType];
  let runningWatts = 0;
  let peakWatts = 0;
  let energyWh = 0;
  const supportedLoads: { label: string; watts: number }[] = [];

  for (const appliance of presets) {
    const qty = input.quantities[appliance.id] ?? 0;
    if (qty <= 0) continue;
    const totalWatts = appliance.watts * qty;
    runningWatts += totalWatts * appliance.dutyCycle;
    peakWatts += totalWatts; // assume all could run at once for surge sizing
    energyWh += totalWatts * appliance.dutyCycle * input.backupHours;
    supportedLoads.push({ label: appliance.label, watts: totalWatts });
  }

  // Custom C&I loads — full duty (we don't know their pattern, so size safely).
  for (const load of input.customLoads ?? []) {
    const qty = Math.max(0, load.qty || 0);
    const w = Math.max(0, load.watts || 0);
    if (qty <= 0 || w <= 0) continue;
    const totalWatts = w * qty;
    runningWatts += totalWatts;
    peakWatts += totalWatts;
    energyWh += totalWatts * input.backupHours; // duty 1.0 (conservative)
    supportedLoads.push({ label: load.label || "Custom load", watts: totalWatts });
  }

  // Inverter sized on peak load with surge headroom, expressed in kW.
  const inverterKw =
    peakWatts > 0
      ? roundStep((peakWatts * INVERTER_SURGE_HEADROOM) / 1000 / POWER_FACTOR, 0.5)
      : 0;

  // Usable energy grossed up for losses, then to nameplate via DoD.
  const usableKwh =
    energyWh > 0
      ? roundStep(energyWh / 1000 / SYSTEM_EFFICIENCY / USABLE_DOD, 0.5)
      : 0;

  return {
    runningWatts: Math.round(runningWatts),
    peakWatts: Math.round(peakWatts),
    inverterKw,
    usableKwh,
    supportedLoads,
  };
}
