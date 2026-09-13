/**
 * Backend service seams (TRD 1, 5, 6):
 *   - notifySales   -> LIVE: emails the audit lead to audit@ via Resend
 *   - acknowledge   -> LIVE: emails the enquirer a confirmation via Resend
 *   - storeLead     -> STILL MOCK: persist to database / spreadsheet / CRM
 *   - registerBills -> STILL MOCK: S3 pre-signed uploads (SSE, 12-mo deletion)
 *
 * Email goes through src/server/email.ts (Resend). With no RESEND_API_KEY set,
 * emails are logged, not sent, so dev/preview still works end to end.
 * DO NOT route real bill uploads through email — see DPDP note in TRD 5.
 */

import { AuditFormValues } from "@/lib/audit-schema";
import { siteConfig } from "@/lib/site-config";
import { sendLeadNotification, sendAutoReply } from "@/server/email";

export type LeadRecord = AuditFormValues & {
  reference: string;
  submittedAt: string;
  consentTimestamp: string;
  // In production, capture IP server-side for the DPDP consent record (TRD 5).
  consentIp?: string;
  fileCount: number;
};

/** Generate a human-friendly reference like PNP-7F3K2. */
export function makeReference(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `PNP-${rand}`;
}

export async function storeLead(record: LeadRecord): Promise<void> {
  // TODO(prod): persist to database / CRM with encrypted PII at rest.
  console.info("[mock storeLead]", {
    reference: record.reference,
    propertyType: record.propertyType,
    location: record.location,
    fileCount: record.fileCount,
  });
}

export async function notifySales(record: LeadRecord): Promise<void> {
  // Audit leads go to the audit inbox (siteConfig.email.sales = audit@…).
  await sendLeadNotification({
    to: siteConfig.email.sales,
    kind: "Free audit",
    reference: record.reference,
    replyTo: record.email || undefined,
    rows: [
      { label: "Name", value: record.name },
      { label: "Phone", value: record.phone },
      { label: "Email", value: record.email || "—" },
      { label: "Property type", value: record.propertyType },
      { label: "Location", value: record.location },
      { label: "Current backup", value: record.currentBackup || "—" },
      { label: "Bills attached", value: record.fileCount },
      { label: "Submitted", value: record.submittedAt },
    ],
  });
}

export async function acknowledge(record: LeadRecord): Promise<void> {
  // Confirmation email to the enquirer — only if they gave one (PRD F-12).
  if (record.email) {
    await sendAutoReply({ to: record.email, name: record.name, reference: record.reference });
  }
}

/**
 * In production, files never touch this server: the browser uploads directly
 * to object storage via a short-lived pre-signed URL (TRD 5.1). This mock just
 * records how many files were attached for the confirmation + analytics.
 */
export async function registerBills(count: number): Promise<void> {
  if (count > 0) {
    console.info(`[mock registerBills] ${count} file(s) — would issue pre-signed URLs`);
  }
}
