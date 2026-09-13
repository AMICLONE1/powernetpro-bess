/**
 * JsonLd — injects a structured-data object as an application/ld+json script.
 * Server-rendered, so it's in the initial HTML for crawlers. Pass any of the
 * schema builders from lib/seo (serviceJsonLd, breadcrumbJsonLd, …).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
