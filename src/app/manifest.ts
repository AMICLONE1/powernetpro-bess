import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/** Web app manifest — mobile "add to home screen" + a small quality signal. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.company,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F2EA", // warm cream canvas
    theme_color: "#E4622E", // terracotta accent
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
