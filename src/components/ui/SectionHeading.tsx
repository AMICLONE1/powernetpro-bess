import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Section heading: eyebrow kicker → serif display H2 → optional lead.
 */
export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  onDark = false,
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && (
        <span className={cn("kicker", onDark && "text-accent")}>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {kicker}
        </span>
      )}
      <h2 className={cn("font-display text-h2 text-balance", onDark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "max-w-2xl text-body-lg",
            align === "center" && "mx-auto",
            onDark ? "text-white/70" : "text-ink-2",
          )}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
