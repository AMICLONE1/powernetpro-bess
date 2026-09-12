import { projectRefs } from "@/lib/content";

/**
 * Delivered-systems table — categories of work done (type, size, configuration)
 * rather than named case studies. Horizontally scrollable on narrow screens.
 */
export function ProjectsTable() {
  return (
    <div className="overflow-x-auto rounded-card-lg border border-hairline bg-surface shadow-card">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-hairline bg-bg-2">
            {["Ref", "Type", "System (kWh)", "Configuration"].map((h) => (
              <th
                key={h}
                className="px-6 py-4 text-caption font-semibold uppercase tracking-[0.12em] text-ink-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projectRefs.map((p) => (
            <tr
              key={p.ref}
              className="border-b border-hairline transition-colors last:border-0 hover:bg-bg-2/60"
            >
              <td className="nums px-6 py-4 font-display text-body-lg font-bold text-accent">{p.ref}</td>
              <td className="px-6 py-4 text-body font-medium text-ink">{p.type}</td>
              <td className="nums px-6 py-4 text-body text-ink">{p.system}</td>
              <td className="px-6 py-4 text-body text-ink-2">{p.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
