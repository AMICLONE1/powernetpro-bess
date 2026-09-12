/** Line icons matching the brand's technical illustration style. */
export function Icon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "home":
      return (<svg {...common}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>);
    case "building":
      return (<svg {...common}><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" /></svg>);
    case "office":
      return (<svg {...common}><rect x="3" y="8" width="18" height="13" rx="1" /><path d="M8 8V4h8v4M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" /></svg>);
    case "factory":
      return (<svg {...common}><path d="M3 21V10l6 4V10l6 4V7l6 3v11z" /><path d="M3 21h18" /></svg>);
    case "battery":
      return (<svg {...common}><rect x="3" y="8" width="16" height="8" rx="2" /><path d="M21 11v2" /><path d="M8 12l2-2-1 2 2-2" /></svg>);
    case "shield":
      return (<svg {...common}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>);
    case "sun":
      return (<svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" /></svg>);
    case "bolt":
      return (<svg {...common}><path d="M13 3L5 13h6l-1 8 8-10h-6z" /></svg>);
    case "info":
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></svg>);
    case "phone":
      return (<svg {...common}><path d="M4 5c0 8.5 6.5 15 15 15a1.5 1.5 0 001.5-1.5v-2.6a1 1 0 00-.8-1l-3-.6a1 1 0 00-1 .4l-.9 1.2a12 12 0 01-5.3-5.3l1.2-.9a1 1 0 00.4-1l-.6-3a1 1 0 00-1-.8H5.5A1.5 1.5 0 004 5z" /></svg>);
    case "calc":
      return (<svg {...common}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 7h6M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01" /></svg>);
    default:
      return (<svg {...common}><circle cx="12" cy="12" r="9" /></svg>);
  }
}
