"use server";

import { partnerSchema, type PartnerSubmitResult } from "@/lib/partner-schema";
import { makeReference } from "@/server/services";

/**
 * Solar-EPC partner enquiry (mocked). In production this notifies
 * solarpartner@powernetpro.com and stores the lead. No personal data is
 * persisted anywhere real here.
 */
export async function submitPartner(values: unknown): Promise<PartnerSubmitResult> {
  const parsed = partnerSchema.safeParse(values);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  if (parsed.data.company_website) return { ok: true, reference: makeReference() };

  const reference = makeReference();
  // TODO(prod): email solarpartner@powernetpro.com + store lead.
  console.info(`[mock partner] ${reference} — ${parsed.data.company} (${parsed.data.city}), ${parsed.data.volume}`);
  return { ok: true, reference };
}
