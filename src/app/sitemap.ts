import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** Generated sitemap (TRD 7.1, F-14). */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/battery-storage",
    "/solutions/homes",
    "/solutions/societies",
    "/solutions/commercial",
    "/solutions/industrial",
    "/lithium-vs-lead-acid",
    "/solar",
    "/solar/partner",
    "/free-audit",
    "/sizing-calculator",
    "/projects",
    "/safety",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "/free-audit" ? 1 : route === "" ? 0.9 : 0.7,
  }));
}
