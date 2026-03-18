"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Giscus from "@giscus/react";
import { MessageSquare } from "lucide-react";

import { giscusConfig } from "@configs/comments";

export function Comments() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const giscusTheme = resolvedTheme === "dark" ? "transparent_dark" : "light";

  return (
    <section className="mt-8">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl"
          style={{ background: "var(--gradient-card)" }}
        >
          <MessageSquare className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg my-0">Discussion</h3>
          <p className="text-xs text-muted-foreground my-0">
            Sign in with GitHub to leave a comment
          </p>
        </div>
      </div>

      {/* Giscus — key forces remount on route change to fix SPA navigation issues */}
      <div className="rounded-2xl border border-border/40 p-4 md:p-6 bg-card/50">
        <Giscus
          key={pathname}
          {...giscusConfig}
          theme={giscusTheme}
        />
      </div>
    </section>
  );
}
