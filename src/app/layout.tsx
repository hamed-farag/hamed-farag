import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { ThemeProvider } from "@components/ThemeProvider";
import { Toaster } from "@components/ui/sonner";
import { EasterEgg } from "@components/EasterEgg/EasterEgg";

import { generateSiteMetadata, siteMetadata } from "@configs/siteMetadata";

import "@styles/hljs-tokyo-night.css";
import "@styles/globals.css";
import "./layout.css";

export const metadata = generateSiteMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteMetadata.language} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="site-frame">
            <Header />
            <main className="main">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        <Toaster />
        <EasterEgg />
      </body>
    </html>
  );
}
