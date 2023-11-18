import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { ThemeProvider } from "@components/ThemeProvider";

import { Separator } from "@components/ui/Separator";

import { cn } from "@lib/utils/tailwindUtils";

import "./layout.css";

import "@styles/globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "hamedfarag.dev",
  description: "Hamed Farag's Personal Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="main">{children}</main>
          <Separator />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
