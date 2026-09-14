import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { localBusinessJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { BackToTop } from "@/components/layout/BackToTop";
import { SmoothCursor } from "@/components/motion/SmoothCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CookieConsent } from "@/components/layout/CookieConsent";

// Body: Inter. Display headlines: Space Grotesk (modern geometric sans — clean,
// distinctive and highly legible at every size).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// High-contrast editorial serif — used for the hero headline.
const serif = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.company} — Battery Storage & Solar EPC in Pune`,
    template: `%s`,
  },
  description: siteConfig.description,
  keywords: [
    "battery storage Pune",
    "solar installation Pune",
    "BESS installer Maharashtra",
    "battery energy storage system",
    "solar EPC Pune",
  ],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F6F2EA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${serif.variable}`} suppressHydrationWarning>
      <body>
        <LoadingScreen />
        <a href="#main" className="sr-only sr-only-focusable">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <BackToTop />
        <SmoothCursor />

        {/* Cookie consent — GA4 loads here ONLY after the visitor accepts
            (DPDP/GDPR). Nothing tracks until then. */}
        <CookieConsent gaId={gaId} />
      </body>
    </html>
  );
}
