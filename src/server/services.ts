/**
 * Backend service interfaces + MOCK implementations.
 *
 * These are the seams where real infrastructure plugs in (TRD 1, 5, 6):
 *   - storeLead     -> database / spreadsheet / CRM
 *   - storeBills    -> S3-compatible object storage w/ pre-signed URLs, SSE,
 *                      12-month lifecycle deletion, virus scan, EXIF strip
 *   - notifySales   -> lead notification to sales email + WhatsApp
 *   - acknowledge   -> transactional email to the enquirer (Resend / SES)
 *
 * Nothing here writes personal data anywhere real. The mocks log and return
 * success so the full UX (validation → confirmation) can be exercised end to
 * end. DO NOT route real bill uploads through email — see DPDP note in TRD 5.
 */

import { AuditFormValues } from "@/lib/audit-schema";

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
  // TODO(prod): send to sales email + WhatsApp Business API (PRD F-11).
  console.info(
    `[mock notifySales] New audit lead ${record.reference} — ${record.propertyType} in ${record.location}`,
  );
}

export async function acknowledge(record: LeadRecord): Promise<void> {
  // TODO(prod): transactional acknowledgement email to enquirer (PRD F-12).
  if (record.email) {
    console.info(`[mock acknowledge] -> ${record.email} (ref ${record.reference})`);
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
