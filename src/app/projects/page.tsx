import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { ProjectsTable } from "@/components/sections/ProjectsTable";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Battery storage systems delivered by PowerNetPro across Pune and Maharashtra — listed by type, size and configuration.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Track record"
        title="Systems we've delivered"
        lead="Storage systems commissioned across homes and businesses in Pune & Maharashtra — listed by type, size and configuration. New rows are added as jobs complete."
      />
      <section className="section-y">
        <div className="container-content">
          <ProjectsTable />
        </div>
      </section>
      <CTABand headline="Your project could be next" />
    </>
  );
}
