import { cn } from "@/lib/cn";

/**
 * Specification table: dark header row, alternating row fill, generous cell
 * padding (Design Doc component library / 6). Scrolls horizontally on mobile
 * inside its own overflow container so the page body never scrolls sideways.
 */
export function SpecTable({
  columns,
  rows,
  caption,
  className,
}: {
  columns: string[];
  rows: (string | React.ReactNode)[][];
  caption?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto rounded-card border border-hairline", className)}>
      <table className="w-full min-w-[520px] border-collapse text-left text-body">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-surface-2 text-text-hi">
            {columns.map((col, j) => (
              <th
                key={col}
                scope="col"
                className={cn(
                  "px-5 py-4 text-caption font-semibold uppercase tracking-[0.12em]",
                  j === 0 ? "text-accent" : "text-text-mid",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={cn(i % 2 === 1 ? "bg-surface-2" : "bg-white", "border-t border-hairline")}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-5 py-4 align-top",
                    j === 0 ? "font-semibold text-text-hi" : "text-text-mid",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
