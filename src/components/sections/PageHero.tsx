import { Reveal } from "@/components/motion/Reveal";
import { Media } from "@/components/ui/Media";

/**
 * Content-page header: eyebrow + serif headline + lead on the warm canvas,
 * with an optional media slot on the right.
 */
export function PageHero({
  kicker,
  title,
  lead,
  children,
  media,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  media?: { label?: string; hint?: string; video?: boolean; src?: string; alt?: string };
}) {
  return (
    <section className="border-b border-hairline">
      <div className="container-content pb-14 pt-28 lg:pb-20 lg:pt-36">
        <div className={media ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-14" : ""}>
          <Reveal className="max-w-2xl">
            <span className="kicker"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{kicker}</span>
            <h1 className="mt-5 font-display text-h1 text-ink text-balance">{title}</h1>
            {lead && <p className="mt-5 max-w-xl text-body-lg text-ink-2">{lead}</p>}
            {children && <div className="mt-8">{children}</div>}
          </Reveal>
          {media && (
            <Reveal delay={0.1}>
              <Media src={media.src} alt={media.alt} label={media.label} hint={media.hint} video={media.video} ratio="4/3" rounded="card-lg" className="shadow-lift" />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
