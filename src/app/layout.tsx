import { Quicksand, Nunito, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ThemeProvider } from "@components/ThemeProvider";
import { Toaster } from "@components/ui/sonner";
import { EasterEgg } from "@components/EasterEgg/EasterEgg";

import { cn } from "@lib/utils/tailwindUtils";
import { generateSiteMetadata, siteMetadata } from "@configs/siteMetadata";

import "@styles/hljs-tokyo-night.css";
import "@styles/globals.css";
import "@styles/pixel.css";

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

// 16-bit level fonts: Pixelify Sans for titles, Press Start 2P for the HUD and labels
const fontPixel = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontHud = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
  weight: "400",
});

export const metadata = generateSiteMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteMetadata.language}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontDisplay.variable,
          fontBody.variable,
          fontPixel.variable,
          fontHud.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        <Toaster />
        <EasterEgg />
      </body>
    </html>
  );
}
