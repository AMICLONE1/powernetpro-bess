"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Media slot — a styled placeholder for images/video that will be supplied
 * later. Renders the real <img>/<video> when `src` is given, otherwise a warm
 * captioned placeholder describing the shot to capture. Every slot documents
 * what asset belongs there (see IMAGE_PROMPTS.md / the shot list).
 *
 * While a real image is still downloading, a soft pulsing skeleton fills the
 * slot so heavy shots (e.g. the 1.6 MB hero) never flash a blank rectangle.
 */
export function Media({
  src,
  alt = "",
  video = false,
  label,
  hint,
  ratio = "4/3",
  className,
  rounded = "card",
  overlay = false,
}: {
  src?: string;
  alt?: string;
  video?: boolean;
  label?: string;
  hint?: string;
  ratio?: string;
  className?: string;
  rounded?: "none" | "card" | "card-lg" | "pill";
  overlay?: boolean;
}) {
  const radius =
    rounded === "none" ? "" : rounded === "pill" ? "rounded-pill" : rounded === "card-lg" ? "rounded-card-lg" : "rounded-card";

  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // If the image was already cached/complete before React attached onLoad,
    // reflect that immediately so the skeleton doesn't linger.
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={cn("group/media relative overflow-hidden bg-bg-2", radius, className)}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out-expo motion-safe:group-hover/media:scale-[1.04]"
            />
            {!loaded && (
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-bg-2 via-hairline to-bg-2 motion-safe:animate-pulse" />
            )}
          </>
        )
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="absolute inset-0 dot-grid opacity-60" />
          <div className="relative flex max-w-[80%] flex-col items-center gap-2 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-accent">
              {video ? <PlayIcon /> : <ImageIcon />}
            </span>
            {label && <p className="text-body font-semibold text-ink">{label}</p>}
            {hint && <p className="text-caption text-ink-3">{hint}</p>}
          </div>
        </div>
      )}
      {overlay && src && (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      )}
    </div>
  );
}

function ImageIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M4 17l5-5 4 4 3-3 4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}
