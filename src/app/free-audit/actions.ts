"use server";

import { auditSchema, type AuditSubmitResult } from "@/lib/audit-schema";
import {
  storeLead,
  notifySales,
  acknowledge,
  registerBills,
  makeReference,
  type LeadRecord,
} from "@/server/services";

/**
 * Free Audit submission (TRD 2.1 — server action). Re-validates with Zod on
 * the server (never trust the client, TRD 6), records DPDP consent with a
 * server timestamp, then fans out to storage + notifications.
 *
 * File uploads are handled separately/direct-to-storage in production; here we
 * receive only the count so no personal data flows through this action.
 */
export async function submitAudit(
  values: unknown,
  fileCount = 0,
): Promise<AuditSubmitResult> {
  const parsed = auditSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  // Honeypot tripped -> silently accept to not tip off bots, but drop it.
  if (parsed.data.company_website) {
    return { ok: true, reference: makeReference() };
  }

  const now = new Date().toISOString();
  const record: LeadRecord = {
    ...parsed.data,
    reference: makeReference(),
    submittedAt: now,
    consentTimestamp: now, // DPDP: consent captured with timestamp (TRD 5)
    fileCount,
  };

  try {
    await registerBills(fileCount);
    await storeLead(record);
    // Fire notifications; failures here shouldn't fail the user's submission.
    await Promise.allSettled([notifySales(record), acknowledge(record)]);
    return { ok: true, reference: record.reference };
  } catch {
    return { ok: false, error: "Something went wrong. Please try WhatsApp or call us." };
  }
}
