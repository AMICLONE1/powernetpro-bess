import type { Metadata } from "next";
import { siteConfig } from "./site-config";

/** Build per-page metadata with sensible PowerNetPro defaults (TRD 7.1). */
export function buildMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    path === "/" ? title : `${title} — ${siteConfig.shortName}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.company,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** LocalBusiness + Organization structured data (TRD 7.1, F-14). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.company,
    legalName: siteConfig.registration.legalName,
    foundingDate: siteConfig.registration.founded,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/icon.png`,
    image: `${siteConfig.url}/opengraph-image.png`,
    telephone: siteConfig.phone.tel,
    email: siteConfig.email.info,
    priceRange: "₹₹",
    identifier: [
      { "@type": "PropertyValue", propertyID: "CIN", value: siteConfig.registration.cin },
      { "@type": "PropertyValue", propertyID: "DPIIT", value: siteConfig.registration.dipp },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "State", name: "Maharashtra" },
    ],
    knowsAbout: [
      "Battery Energy Storage System",
      "BESS",
      "Solar EPC",
      "Lithium iron phosphate battery",
      "Lead-acid battery",
      "Solar plus storage",
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Battery Energy Storage (BESS) installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Solar EPC — design, supply, install, commission" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Free backup & demand cost audit" } },
    ],
    // Social profiles — ties the business entity to its social presence.
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram].filter(Boolean),
  };
}

/**
 * BreadcrumbList structured data — lets Google show a "Home › Battery Storage"
 * trail in the result instead of a raw URL. Pass the trail as {name, path}.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${siteConfig.url}${c.path}`,
    })),
  };
}

/**
 * Service structured data — declares a concrete service the business offers,
 * tied to the LocalBusiness and its service area. Used on the battery & solar
 * pages so Google understands exactly what's on offer, where.
 */
export function serviceJsonLd({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${siteConfig.url}${path}`,
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "State", name: "Maharashtra" },
    ],
  };
}

/** FAQPage structured data — rich results eligibility. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
