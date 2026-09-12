import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** Generated robots.txt (TRD 7.1). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
