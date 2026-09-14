import Link from "next/link";
import { cn } from "@/lib/cn";
import { TiltLogo } from "@/components/ui/TiltLogo";

/**
 * PowerNetPro logo lockup.
 *
 * DROP-IN: put your official files in `public/brand/`:
 *   - public/brand/logo.svg        (dark wordmark, for light backgrounds)
 *   - public/brand/logo-white.svg  (white wordmark, for the dark footer)
 * (PNG works too — just change the paths below to .png.)
 *
 * If the files are absent the browser shows the alt text; the inline
 * <Starburst/> below is still exported for use as a standalone mark (favicon,
 * the giant footer flourish, review cards, etc.).
 */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
  showText?: boolean;
}) {
  const src = onDark ? "/brand/logo-white.webp" : "/brand/logo-cropped.webp";
  // Emboss: a soft dark drop-shadow lifts the mark off the surface while a
  // subtle light highlight on the opposite side reads as a bevel — together
  // they give real depth. Tuned per background (light header vs. dark footer).
  const emboss = onDark
    ? "drop-shadow(0 1px 1px rgba(0,0,0,0.5)) drop-shadow(0 -0.5px 0.5px rgba(255,255,255,0.35))"
    : "drop-shadow(1px 2px 1.5px rgba(33,29,24,0.28)) drop-shadow(-0.5px -0.5px 0.5px rgba(255,255,255,0.85))";
  return (
    <Link href="/" aria-label="PowerNetPro — home" className={cn("inline-flex items-center", className)}>
      <TiltLogo className="inline-flex">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="PowerNetPro"
          // data-logo-mark lets the hero scene locate this exact box to dock the
          // giant wordmark onto, and the CSS var lets the scene fade it in only
          // once the word has arrived (defaults to 1 everywhere else).
          data-logo-mark={onDark ? undefined : ""}
          className="h-6 w-auto lg:h-7"
          style={{ filter: emboss, ...(onDark ? {} : { opacity: "var(--logo-mark-opacity, 1)" }) }}
        />
      </TiltLogo>
    </Link>
  );
}

/** The golden starburst sun mark (brand icon) — for standalone use. */
export function Starburst({ className, hole = "#F6F2EA" }: { className?: string; hole?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <g fill="#F5A623">
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x="22.5" y="1.5" width="3" height="10" rx="1" transform={`rotate(${(i * 360) / 16} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="11.5" fill="#F5A623" />
      <circle cx="24" cy="24" r="6.5" fill={hole} />
      <path d="M33 26 L47 24 L33 30 Z" fill="#F5A623" />
    </svg>
  );
}
