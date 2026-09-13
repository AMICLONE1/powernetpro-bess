import { buildMetadata } from "@/lib/seo";
import { SizingCalculator } from "@/components/calculator/SizingCalculator";

export const metadata = buildMetadata({
  title: "Battery & Inverter Sizing Calculator",
  description:
    "Estimate the battery storage capacity and inverter rating your home, office or factory needs. A quick starting point before your free PowerNetPro audit.",
  path: "/sizing-calculator",
});

export default function SizingCalculatorPage() {
  return (
    <div className="container-content pb-16 pt-24 lg:pb-[120px] lg:pt-32">
      <div className="max-w-2xl">
        <span className="kicker"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Sizing calculator</span>
        <h1 className="mt-5 font-display text-h1 text-ink">Size your system in a minute</h1>
        <p className="mt-4 text-body-lg text-ink-2">
          Pick what you want to keep running and for how long — then press play and
          watch your sized system carry you through a power cut. The free audit
          confirms the exact system and price.
        </p>
      </div>

      <div className="mt-12">
        <SizingCalculator />
      </div>
    </div>
  );
}
