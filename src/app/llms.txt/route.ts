import { siteConfig } from "@/lib/site-config";
import { faqs } from "@/lib/content";

/**
 * /llms.txt — an emerging convention: a clean, AI-readable summary of the site
 * for LLMs and answer engines. Generated from site config + content so it stays
 * accurate. Served as plain text.
 */
export const dynamic = "force-static";

export function GET() {
  const u = siteConfig.url;
  const body = `# ${siteConfig.company}

> ${siteConfig.description}

PowerNetPro designs, supplies, installs and commissions battery energy storage
systems (BESS) and solar EPC for homes, housing societies, offices and industry
across ${siteConfig.address.serviceArea}. We supply both lithium (LFP) and
lead-acid batteries and advise honestly on which fits each customer's duty and
budget. Backup switchover is under 20 ms, systems run silently with no fuel,
and LFP storage is rated for 10+ years.

## Company
- Legal name: ${siteConfig.registration.legalName}
- CIN: ${siteConfig.registration.cin}
- GSTIN: ${siteConfig.registration.gst}
- DPIIT (Startup India): ${siteConfig.registration.dipp}
- Registered office: ${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}, India
- Service area: ${siteConfig.address.serviceArea}
- Phone: ${siteConfig.phone.display}
- Email: ${siteConfig.email.info}
- Website: ${u}

## Services
- Battery Energy Storage Systems (BESS) — lithium (LFP) and lead-acid, design to commissioning
- Solar EPC — rooftop solar and solar-plus-storage, with net-metering guidance
- Free energy audit — bill and load review, system sizing, honest proposal (no obligation)

## Key pages
- [Battery Storage (BESS)](${u}/battery-storage): How the storage system works — cells, BMS, inverter, safety.
- [Solar EPC](${u}/solar): Rooftop solar and solar-plus-storage, design/supply/install/commission.
- [Lithium vs Lead-Acid](${u}/lithium-vs-lead-acid): Honest comparison of the two battery chemistries.
- [Safety & Standards](${u}/safety): How safety is engineered into every system.
- [Sizing Calculator](${u}/sizing-calculator): Estimate the capacity and inverter rating you need.
- [Projects](${u}/projects): Systems delivered across Pune and Maharashtra.
- [Solutions for Homes](${u}/solutions/homes), [Societies](${u}/solutions/societies), [Offices & Commercial](${u}/solutions/commercial), [Industrial](${u}/solutions/industrial).
- [About](${u}/about): Company, mission and registration details.
- [Free Audit / Enquire](${u}/free-audit): Request a free, no-obligation quote.

## FAQ
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
