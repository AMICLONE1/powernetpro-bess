import { cn } from "@/lib/cn";

/**
 * GlitchText — wraps text so it does a subtle warm channel-split glitch on hover
 * (see the `.glitch` rules in globals.css). The visible text stays crisp; two
 * coloured copies (terracotta + gold, via data-text) flicker apart briefly then
 * settle. Requires plain string children so data-text matches exactly.
 *
 * Renders as a <span> by default; pass `as` to use a heading tag.
 */
export function GlitchText({
  children,
  className,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag data-text={children} className={cn("glitch", className)}>
      {children}
    </Tag>
  );
}
