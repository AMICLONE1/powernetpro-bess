"use server";

import { partnerSchema, type PartnerSubmitResult } from "@/lib/partner-schema";
import { makeReference } from "@/server/services";
import { sendLeadNotification, sendAutoReply } from "@/server/email";
import { siteConfig } from "@/lib/site-config";

/**
 * Solar-EPC partner enquiry. Notifies the info inbox and sends the partner a
 * confirmation. Emails go through Resend (src/server/email.ts); if no API key
 * is configured they're logged instead so the flow never breaks.
 */
export async function submitPartner(values: unknown): Promise<PartnerSubmitResult> {
  const parsed = partnerSchema.safeParse(values);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  if (parsed.data.company_website) return { ok: true, reference: makeReference() };

  const reference = makeReference();
  const d = parsed.data;
  try {
    await Promise.allSettled([
      sendLeadNotification({
        to: siteConfig.email.partner,
        kind: "Solar EPC partner",
        reference,
        replyTo: d.email,
        rows: [
          { label: "Company", value: d.company },
          { label: "Contact", value: d.name },
          { label: "Phone", value: d.phone },
          { label: "Email", value: d.email },
          { label: "City / area", value: d.city },
          { label: "Volume", value: d.volume },
          { label: "Message", value: d.message || "—" },
        ],
      }),
      sendAutoReply({ to: d.email, name: d.name, reference }),
    ]);
    return { ok: true, reference };
  } catch {
    return { ok: false, error: "Something went wrong. Please try WhatsApp or call us." };
  }
}
