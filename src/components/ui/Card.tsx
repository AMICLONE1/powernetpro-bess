import { cn } from "@/lib/cn";

/**
 * Card: 8px radius, 1px #E3E9EB border, white fill.
 * Shadow only when interactive (Design Doc 2.3 / component library).
 */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-hairline bg-surface p-6",
        interactive &&
          "shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-cyan/30 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
