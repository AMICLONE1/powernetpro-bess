"use client";

import { siteConfig, whatsappLink, telLink } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 01-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 01-1.44-5.02c0-5.2 4.24-9.43 9.46-9.43a9.4 9.4 0 016.68 2.77 9.36 9.36 0 012.76 6.67c0 5.2-4.24 9.43-9.44 9.43zM20.13 3.9A11.36 11.36 0 0012.05 0C5.8 0 .72 5.06.72 11.28c0 1.99.52 3.93 1.51 5.64L.63 24l7.24-1.9a11.4 11.4 0 004.18.79h.01c6.25 0 11.33-5.06 11.33-11.28 0-3.01-1.18-5.84-3.26-7.71z" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("h-5 w-5", className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5c0-.55.45-1 1-1h2.3c.45 0 .84.3.96.73l.9 3.2c.1.37-.02.77-.32 1.02l-1.4 1.15a12.5 12.5 0 005.44 5.44l1.15-1.4c.25-.3.65-.42 1.02-.32l3.2.9c.43.12.73.51.73.96V19c0 .55-.45 1-1 1C10.5 20 4 13.5 4 5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const chip = "inline-flex h-11 items-center justify-center gap-2 rounded-pill px-5 font-semibold transition-all duration-200 ease-smooth";

export function WhatsAppButton({
  label = "Chat on WhatsApp",
  prefilled,
  className,
  variant = "solid",
}: {
  label?: string;
  prefilled?: string;
  className?: string;
  variant?: "solid" | "ghost";
}) {
  return (
    <a
      href={whatsappLink(prefilled)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click")}
      className={cn(chip, variant === "solid" ? "bg-[#25D366] text-white hover:brightness-95" : "border border-ink/15 bg-transparent text-ink hover:border-ink/40", className)}
    >
      <WhatsAppIcon /> {label}
    </a>
  );
}

export function CallButton({
  label = siteConfig.phone.display,
  className,
  variant = "ghost",
}: {
  label?: string;
  className?: string;
  variant?: "solid" | "ghost";
}) {
  return (
    <a
      href={telLink()}
      onClick={() => track("phone_click")}
      className={cn(chip, variant === "solid" ? "bg-ink text-white hover:bg-ink/85" : "border border-ink/15 bg-transparent text-ink hover:border-ink/40", className)}
    >
      <PhoneIcon /> {label}
    </a>
  );
}
