import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// AI / answer-engine crawlers we explicitly welcome, so generative engines
// (ChatGPT, Gemini, Perplexity, Claude, etc.) know they may crawl and cite us.
const aiCrawlers = [
  "GPTBot", // OpenAI / ChatGPT
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT live browsing
  "Google-Extended", // Gemini / Google AI
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "ClaudeBot", // Anthropic / Claude
  "Claude-Web",
  "anthropic-ai",
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "Bytespider", // TikTok / Doubao
  "CCBot", // Common Crawl (trains many models)
  "cohere-ai",
  "Meta-ExternalAgent",
];

/** Generated robots.txt (TRD 7.1) — open to all crawlers, incl. AI engines. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicit allow for AI crawlers (same access as everyone) — a clear
      // signal that PowerNetPro content may be used in AI answers.
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
