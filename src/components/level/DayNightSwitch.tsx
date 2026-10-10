"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun } from "pixelarticons/react/Sun.js";
import { Moon } from "pixelarticons/react/Moon.js";

import { PixelIcon } from "@components/pixel";
import { playSfx } from "@lib/sound";

const subscribeNoop = () => () => {};

/** Day/Night switch. The visible state comes from the .dark class, so it's right before hydration. */
export function DayNightSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const isNight = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mounted ? isNight : false}
      aria-label="Night world"
      title="Switch Day / Night"
      onClick={() => {
        playSfx("blip");
        setTheme(isNight ? "light" : "dark");
      }}
      className="px-frame px-btn px-btn--hud"
    >
      {/* icon-only: the switch's checked state is its value, the label stays "Night world" */}
      <PixelIcon icon={Sun} className="dark:hidden" />
      <PixelIcon icon={Moon} className="hidden dark:block" />
    </button>
  );
}
