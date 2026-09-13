import "server-only";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

/**
 * Email sending via Resend (PRD F-11/F-12). All form leads and visitor
 * auto-replies go through here.
 *
 * Config comes from env:
 *   RESEND_API_KEY  — your Resend API key (required to actually send)
 *   EMAIL_FROM      — the verified "from" address, e.g. "PowerNetPro <noreply@powernetpro.com>"
 *
 * If RESEND_API_KEY is absent (local dev / preview without secrets) we DON'T
 * send — we log instead, so the full form UX still works end to end without
 * throwing. Destination inboxes come from siteConfig.email.
 */

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || `PowerNetPro <noreply@${hostFromUrl(siteConfig.url)}>`;

const resend = apiKey ? new Resend(apiKey) : null;

function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "powernetpro.com";
  }
}

/** Escape user-supplied text before embedding in an HTML email. */
function esc(s: string | undefined | null): string {
  if (!s) return "—";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  /** Set so a "Reply" in the inbox goes straight to the enquirer. */
  replyTo?: string;
};

/**
 * Low-level send. Returns true on success. Never throws — a failed email must
 * not fail the visitor's submission (they still get their reference + we log).
 */
export async function sendEmail({ to, subject, html, text, replyTo }: SendArgs): Promise<boolean> {
  if (!resend) {
    console.info("[email: no RESEND_API_KEY — not sent]", { to, subject });
    return false;
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
      text,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("[email: Resend error]", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[email: send threw]", e);
    return false;
  }
}

/** A labelled row for the lead-notification email body. */
type Row = { label: string; value: string | number | undefined | null };

function rowsToHtml(rows: Row[]): string {
  return rows
    .map(
      (r) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#8C8477;font-size:13px;white-space:nowrap;vertical-align:top">${esc(
          r.label,
        )}</td><td style="padding:6px 0;color:#211D18;font-size:14px;font-weight:500">${esc(
          String(r.value ?? "—"),
        )}</td></tr>`,
    )
    .join("");
}

function rowsToText(rows: Row[]): string {
  return rows.map((r) => `${r.label}: ${r.value ?? "—"}`).join("\n");
}

/**
 * Notify the team of a new lead. `to` picks the inbox (audit@ vs info@).
 * `replyTo` is set to the enquirer's email (if given) so replying is one click.
 */
export async function sendLeadNotification(opts: {
  to: string;
  kind: string; // e.g. "Free audit", "Solar EPC partner", "Contact"
  reference: string;
  rows: Row[];
  replyTo?: string;
}): Promise<boolean> {
  const { to, kind, reference, rows, replyTo } = opts;
  const html = `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;background:#F6F2EA;padding:24px;border-radius:12px">
    <p style="margin:0 0 4px;color:#E4622E;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">New ${esc(kind)} enquiry</p>
    <h1 style="margin:0 0 2px;color:#211D18;font-size:20px">Reference ${esc(reference)}</h1>
    <p style="margin:0 0 18px;color:#8C8477;font-size:13px">via powernetpro.com</p>
    <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;padding:8px">
      <tbody>${rowsToHtml(rows)}</tbody>
    </table>
    ${replyTo ? `<p style="margin:16px 0 0;color:#5A5349;font-size:13px">Reply to this email to respond directly to the enquirer.</p>` : ""}
  </div>`;
  const text = `New ${kind} enquiry — ${reference}\nvia powernetpro.com\n\n${rowsToText(rows)}`;
  return sendEmail({
    to,
    subject: `New ${kind} enquiry — ${reference}`,
    html,
    text,
    replyTo,
  });
}

/** Friendly confirmation to the visitor (only when they gave an email). */
export async function sendAutoReply(opts: {
  to: string;
  name?: string;
  reference: string;
}): Promise<boolean> {
  const { to, name, reference } = opts;
  const hello = name ? `Hi ${esc(name)},` : "Hi,";
  const html = `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;background:#F6F2EA;padding:28px;border-radius:12px">
    <h1 style="margin:0 0 12px;color:#211D18;font-size:22px">Thanks — we've got your request</h1>
    <p style="margin:0 0 12px;color:#5A5349;font-size:15px;line-height:1.6">${hello} thanks for reaching out to PowerNetPro. Our team will review your details and get back to you — ${esc(
      siteConfig.responseCommitment,
    )}</p>
    <p style="margin:0 0 12px;color:#5A5349;font-size:15px;line-height:1.6">Your reference is <strong style="color:#211D18">${esc(
      reference,
    )}</strong> — keep it handy if you'd like to follow up.</p>
    <p style="margin:0 0 20px;color:#5A5349;font-size:15px;line-height:1.6">In a hurry? Message us on WhatsApp at <a href="https://wa.me/${
      siteConfig.phone.whatsapp
    }" style="color:#E4622E">${esc(siteConfig.phone.display)}</a>.</p>
    <p style="margin:0;color:#8C8477;font-size:13px">— The PowerNetPro team<br>${esc(siteConfig.company)}</p>
  </div>`;
  const text = `${hello} thanks for reaching out to PowerNetPro. We'll get back to you — ${siteConfig.responseCommitment}\n\nYour reference is ${reference}.\n\nIn a hurry? WhatsApp us at ${siteConfig.phone.display} (https://wa.me/${siteConfig.phone.whatsapp}).\n\n— The PowerNetPro team\n${siteConfig.company}`;
  return sendEmail({ to, subject: `We received your request — ${reference}`, html, text });
}
