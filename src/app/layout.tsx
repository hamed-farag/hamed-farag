import { preload } from "react-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { ThemeProvider } from "@components/ThemeProvider";
import { Toaster } from "@components/ui/sonner";
import { EasterEgg } from "@components/EasterEgg/EasterEgg";

import { generateSiteMetadata, siteMetadata } from "@configs/siteMetadata";

import "@styles/fonts.css";
import "@styles/hljs-tokyo-night.css";
import "@styles/globals.css";

import "./layout.css";

// Self-hosted fonts (styles/fonts.css): preload the latin files, as next/font did
const PRELOADED_FONTS = [
  "/fonts/quicksand-latin.4a7551bc.woff2",
  "/fonts/nunito-latin.07454f8a.woff2",
];

export const metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  PRELOADED_FONTS.forEach((href) =>
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" })
  );

  return (
    <html
      lang={siteMetadata.language}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-background font-sans antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        <Toaster />
        <EasterEgg />
      </body>
    </html>
  );
}
