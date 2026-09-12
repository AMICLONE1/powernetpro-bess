import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Bodoni_Moda } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { localBusinessJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { BackToTop } from "@/components/layout/BackToTop";
import { SmoothCursor } from "@/components/motion/SmoothCursor";

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

        {/* GA4 — activates only when NEXT_PUBLIC_GA_ID is set (TRD 7.2). */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
