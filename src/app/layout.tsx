import { Quicksand, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { ThemeProvider } from "@components/ThemeProvider";
import { Toaster } from "@components/ui/sonner";
import { EasterEgg } from "@components/EasterEgg/EasterEgg";

import { cn } from "@lib/utils/tailwindUtils";
import { generateSiteMetadata, siteMetadata } from "@configs/siteMetadata";

import "@styles/hljs-tokyo-night.css";
import "@styles/globals.css";

import "./layout.css";

const fontDisplay = Quicksand({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontBody = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteMetadata.language}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontDisplay.variable,
          fontBody.variable
        )}
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
