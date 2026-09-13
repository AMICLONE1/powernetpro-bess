import { z } from "zod";

/**
 * Free Audit form schema (PRD 4.4). Shared between client (React Hook Form)
 * and server (server action) — never trust client validation alone (TRD 6).
 */

export const PROPERTY_TYPES = [
  "Home",
  "Society",
  "Office",
  "Commercial",
  "Industrial",
] as const;

export const BACKUP_TYPES = ["None", "Inverter", "DG", "Both"] as const;

// Upload constraints (PRD 4.4 / TRD 5.1)
export const MAX_FILES = 12;
export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_MIME = ["application/pdf", "image/jpeg", "image/png"] as const;
export const ACCEPTED_EXT = ".pdf,.jpg,.jpeg,.png";

export const auditSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  // Indian mobile-friendly: 10–14 digits allowing +, spaces, hyphens
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[+\d][\d\s-]{8,15}$/, "Enter a valid phone number"),
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  propertyType: z.enum(PROPERTY_TYPES, {
    errorMap: () => ({ message: "Select a property type" }),
  }),
  location: z.string().min(2, "Enter your area within Pune / Maharashtra"),
  // Optional select: the <select> submits "" when nothing is picked, so accept
  // that alongside the enum values (mirrors how `email` handles empty).
  currentBackup: z.enum(BACKUP_TYPES).optional().or(z.literal("")),
  // Consent MUST be explicitly ticked (DPDP — PRD 4.4, TRD 5).
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please provide consent to proceed" }),
  }),
  // Honeypot: must be empty (spam protection, TRD 6). Bots fill it.
  company_website: z.string().max(0).optional(),
});

export type AuditFormValues = z.infer<typeof auditSchema>;

export type AuditSubmitResult =
  | { ok: true; reference: string }
  | { ok: false; error: string };
