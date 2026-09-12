import { z } from "zod";

/** Solar-EPC partner enquiry (routes to solarpartner@powernetpro.com). */
export const partnerSchema = z.object({
  company: z.string().min(2, "Enter your company name"),
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(10, "Enter a valid phone number").regex(/^[+\d][\d\s-]{8,15}$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  city: z.string().min(2, "Enter your city / area"),
  volume: z.enum(["1–5 / yr", "6–20 / yr", "20+ / yr", "Not sure"], {
    errorMap: () => ({ message: "Select an approximate volume" }),
  }),
  message: z.string().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please provide consent to proceed" }) }),
  company_website: z.string().max(0).optional(), // honeypot
});

export type PartnerFormValues = z.infer<typeof partnerSchema>;
export type PartnerSubmitResult = { ok: true; reference: string } | { ok: false; error: string };

export const PARTNER_VOLUMES = ["1–5 / yr", "6–20 / yr", "20+ / yr", "Not sure"] as const;
