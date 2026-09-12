"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { WhatsAppButton, CallButton } from "@/components/ui/ContactButtons";

/**
 * Sticky WhatsApp + Call + Audit bar on mobile (PRD F-09/F-10). Hidden on the
 * free-audit page to keep the conversion screen restrained.
 */
export function StickyMobileCTA() {
  const pathname = usePathname();
  if (pathname === "/free-audit") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-hairline-2 bg-bg/95 shadow-[0_-10px_30px_-12px_rgba(33,29,24,0.18)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 gap-2 px-3 py-2.5">
        <WhatsAppButton label="WhatsApp" className="h-11 px-0 text-caption" />
        <CallButton label="Call" className="h-11 px-0 text-caption" />
        <Link href="/free-audit" className="inline-flex h-11 items-center justify-center rounded-pill bg-accent px-0 text-caption font-semibold text-white">
          Free quote
        </Link>
      </div>
    </div>
  );
}
