"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/DropdownMenu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="island-btn relative" aria-label="Toggle theme">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-700 dark:-rotate-180 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-4 w-4 rotate-180 scale-0 transition-all duration-700 dark:rotate-0 dark:scale-100 text-blue-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-strong rounded-xl mt-2">
        <DropdownMenuItem onClick={() => setTheme("light")} className="font-display font-semibold text-sm cursor-pointer rounded-lg gap-2">
          <Sun className="h-4 w-4 text-amber-500" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="font-display font-semibold text-sm cursor-pointer rounded-lg gap-2">
          <Moon className="h-4 w-4 text-blue-400" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="font-display font-semibold text-sm cursor-pointer rounded-lg gap-2">
          <Monitor className="h-4 w-4 text-muted-foreground" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
