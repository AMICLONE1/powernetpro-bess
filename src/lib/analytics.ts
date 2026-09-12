/**
 * Analytics event tracking (TRD 7.2).
 * Currently a mocked shim: logs to console in dev and pushes to a dataLayer /
 * gtag if present. Drop in the real GA4 script to activate — the event names
 * below match the TRD spec exactly.
 */

export type AnalyticsEvent =
  | "audit_form_view"
  | "audit_form_start"
  | "audit_form_submit"
  | "bills_uploaded"
  | "calculator_start"
  | "calculator_complete"
  | "calculator_to_audit"
  | "whatsapp_click"
  | "phone_click"
  | "segment_selected";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params?: EventParams) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info(`[analytics] ${event}`, params ?? {});
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params ?? {});
  } else {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...params });
  }
}
