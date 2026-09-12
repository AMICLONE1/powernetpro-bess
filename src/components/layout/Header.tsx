"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button, ArrowRight } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { mainNav, solutionsNav } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  // Label of the nav item the cursor is over — drives the sliding pill. When
  // null, the pill rests on the active-route item.
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  // Which nav item the sliding pill currently sits under: the hovered one, or
  // (when nothing is hovered) the item matching the current route. The mega
  // item ("Solutions") matches any /solutions/* route.
  const routeLabel = mainNav.find((i) =>
    i.hasMega ? pathname.startsWith("/solutions") : i.href === pathname,
  )?.label ?? null;
  const activeLabel = hovered ?? routeLabel;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll while the full-screen mobile menu is open, and close it on
  // Escape. Restores the previous overflow on cleanup.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-opacity duration-700"
      // The home hero holds the header back (opacity 0, non-interactive) until
      // its 3D scene has drawn, then reveals it. Defaults to 1 on every other
      // page (var unset), so the header is always visible elsewhere.
      style={{
        opacity: "var(--header-ready, 1)",
        pointerEvents: "var(--header-ready-pe, auto)" as React.CSSProperties["pointerEvents"],
      }}
    >
      <div className="container-content pt-3 lg:pt-4">
        {/* Floating pill nav. The frosted background is a separate layer behind
            the content so the dropdown (a sibling of content) never renders
            inside a backdrop-filter — which is what softened/blurred it. */}
        <div className="relative flex items-center justify-between gap-4 rounded-pill px-4 py-2.5 lg:px-5">
          {/* Glass pill: a saturated backdrop-blur (colours glow through — the
              glass tell) with a soft border. A faint top-edge highlight sits
              above it to read as light catching the glass. Subtle. */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 rounded-pill border backdrop-blur-xl backdrop-saturate-150 transition-all duration-300",
              scrolled || menuOpen
                ? "border-white/40 bg-bg/70 shadow-soft ring-1 ring-inset ring-white/20"
                : "border-white/25 bg-bg/35 ring-1 ring-inset ring-white/10",
            )}
          />
          {/* Glass shine — a thin gradient highlight along the top edge. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-0 h-px rounded-pill bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
          <Logo className="relative z-10" />

          {/* A single accent pill (shared layoutId) slides between items to sit
              behind whichever is hovered — or the active route when idle. */}
          <nav
            className="relative z-10 hidden items-center gap-0.5 lg:flex"
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
          >
            {mainNav.map((item) => {
              const active = activeLabel === item.label;
              const isCurrent = item.hasMega ? pathname.startsWith("/solutions") : pathname === item.href;
              return item.hasMega ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => { setHovered(item.label); setSolutionsOpen(true); }}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <button
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-3.5 py-2 text-body font-medium transition-colors",
                      isCurrent || active ? "text-ink" : "text-ink-2",
                    )}
                    aria-expanded={solutionsOpen}
                  >
                    {active && <NavPill />}
                    <span className="relative z-10">{item.label}</span>
                    <svg className={cn("relative z-10 h-3.5 w-3.5 transition-transform", solutionsOpen && "rotate-180")} viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M3 4.5L6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {solutionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-3"
                      >
                        <div className="overflow-hidden rounded-card border border-hairline bg-white p-2 shadow-float">
                          {solutionsNav.map((s) => (
                            <Link key={s.href} href={s.href} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-bg-2">
                              <span className="block font-semibold text-ink">{s.label}</span>
                              <span className="block text-caption text-ink-3">{s.blurb}</span>
                            </Link>
                          ))}
                          <Link href="/solar/partner" className="mt-1 block rounded-lg bg-bg-2 px-3 py-2.5 transition-colors hover:bg-gold-soft">
                            <span className="block font-semibold text-ink">Solar EPC partners →</span>
                            <span className="block text-caption text-ink-3">Partner with us on BESS projects</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHovered(item.label)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-body font-medium transition-colors",
                    isCurrent || active ? "text-ink" : "text-ink-2",
                  )}
                >
                  {active && <NavPill />}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 hidden lg:block">
            <Button href="/free-audit" size="md">Enquire now <ArrowRight /></Button>
          </div>

          <button
            className="group relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden active:scale-90 transition-transform"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {/* Backing pill — scales + tints in when open, springy on press. */}
            <span
              aria-hidden
              className={cn(
                "absolute inset-0 rounded-full border transition-all duration-300 ease-out",
                menuOpen
                  ? "scale-100 border-accent/30 bg-accent/10"
                  : "scale-75 border-transparent bg-transparent group-hover:scale-100 group-hover:bg-ink/5",
              )}
            />
            <span className="relative block h-4 w-6">
              <span className={cn("absolute left-0 h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]", menuOpen ? "top-1.5 rotate-45 bg-accent" : "top-0")} />
              <span className={cn("absolute left-0 top-1.5 h-0.5 w-6 rounded-full bg-ink transition-all duration-200", menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100")} />
              <span className={cn("absolute left-0 h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]", menuOpen ? "top-1.5 -rotate-45 bg-accent" : "top-3")} />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <MobileMenu pathname={pathname} onClose={() => setMenuOpen(false)} />
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* The sliding accent pill. Every nav item renders the same layoutId, so
   framer-motion springs it between items as the active one changes. */
function NavPill() {
  return (
    <motion.span
      layoutId="nav-pill"
      aria-hidden
      className="absolute inset-0 rounded-full bg-accent/10"
      transition={{ type: "spring", stiffness: 480, damping: 36, mass: 0.8 }}
    />
  );
}

/* ---------------------------------------------------------------------------
   Mobile menu — a full-width animated sheet with a dimmed scrim, a staggered
   icon-tile reveal, an active-route highlight and a nested Solutions group.
--------------------------------------------------------------------------- */

const sheetVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 32, mass: 0.9, staggerChildren: 0.045, delayChildren: 0.08 },
  },
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.18, ease: "easeIn" } },
} as const;

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 500, damping: 34 } },
  exit: { opacity: 0 },
} as const;

const MotionLink = motion.create(Link);

function Chevron() {
  return (
    <svg className="h-4 w-4 shrink-0 text-ink-3 transition-transform group-active:translate-x-0.5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTile({ name, active }: { name?: string; active: boolean }) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
        active ? "bg-accent text-white" : "bg-bg-2 text-ink-2 group-hover:bg-accent/10 group-hover:text-accent",
      )}
    >
      <Icon name={name ?? "default"} className="h-5 w-5" />
    </span>
  );
}

function MobileMenu({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  return (
    <>
      {/* Scrim — dims the page behind the sheet and closes on tap. Sits below
          the sheet but above page content. */}
      <motion.button
        type="button"
        aria-label="Close menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 -z-[1] cursor-default bg-ink/40 backdrop-blur-[3px] lg:hidden"
      />

      <motion.div
        variants={sheetVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative mt-2 max-h-[calc(100dvh-6rem)] origin-top overflow-y-auto overscroll-contain rounded-card-lg border border-hairline bg-surface p-2.5 shadow-float lg:hidden"
      >
        <nav aria-label="Mobile">
          <motion.ul variants={sheetVariants} className="flex flex-col gap-1">
            {mainNav.map((item) =>
              item.hasMega ? (
                <motion.li key={item.label} variants={rowVariants}>
                  <div className="rounded-card bg-bg-2/60 p-2">
                    <div className="flex items-center gap-2 px-2 pb-1.5 pt-1 text-caption font-semibold uppercase tracking-[0.14em] text-ink-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {item.label}
                    </div>
                    <ul className="flex flex-col gap-0.5">
                      {solutionsNav.map((s) => {
                        const active = pathname === s.href;
                        return (
                          <li key={s.href}>
                            <Link
                              href={s.href}
                              onClick={onClose}
                              className={cn(
                                "group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors",
                                active ? "bg-surface shadow-card" : "hover:bg-surface/70",
                              )}
                            >
                              <IconTile name={s.icon} active={active} />
                              <span className="min-w-0 flex-1">
                                <span className={cn("block truncate font-medium leading-tight", active ? "text-accent-dark" : "text-ink")}>{s.label}</span>
                                <span className="mt-0.5 block text-caption leading-snug text-ink-3">{s.blurb}</span>
                              </span>
                              <Chevron />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </motion.li>
              ) : (
                <MobileRow key={item.href} href={item.href} label={item.label} icon={item.icon} active={pathname === item.href} onClose={onClose} />
              ),
            )}
            {/* Contact — utility link expected in the top-level mobile menu. */}
            <MobileRow href="/contact" label="Contact" icon="phone" active={pathname === "/contact"} onClose={onClose} />

            <motion.li variants={rowVariants} className="pt-1.5">
              <Button href="/free-audit" className="w-full" onClick={onClose}>
                Enquire now <ArrowRight />
              </Button>
            </motion.li>
          </motion.ul>
        </nav>
      </motion.div>
    </>
  );
}

function MobileRow({
  href, label, icon, active, onClose,
}: { href: string; label: string; icon?: string; active: boolean; onClose: () => void }) {
  return (
    <motion.li variants={rowVariants}>
      <MotionLink
        href={href}
        onClick={onClose}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "group relative flex items-center gap-3 overflow-hidden rounded-card px-2 py-2 transition-colors",
          active ? "bg-accent/[0.07]" : "hover:bg-bg-2",
        )}
      >
        {/* Left accent bar on the active row. */}
        <span className={cn("absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-accent transition-opacity", active ? "opacity-100" : "opacity-0")} />
        <IconTile name={icon} active={active} />
        <span className={cn("flex-1 font-medium", active ? "text-accent-dark" : "text-ink")}>{label}</span>
        <Chevron />
      </MotionLink>
    </motion.li>
  );
}
