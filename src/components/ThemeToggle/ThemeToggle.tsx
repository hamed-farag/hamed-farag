"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/DropdownMenu";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="theme-machine" aria-label="Choose color theme">
          <span aria-hidden="true"><i /><i /><i /></span>
          <b>{mounted ? (isDark ? "LIGHT" : "DARK") : "THEME"}</b>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="theme-menu">
        <DropdownMenuItem onClick={() => setTheme("light")}><Sun /> Light / editorial</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}><Moon /> Dark / workstation</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}><Monitor /> Follow system</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
