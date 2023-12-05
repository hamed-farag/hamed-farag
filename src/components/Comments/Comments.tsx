"use client";

import { useTheme } from "next-themes";
import Giscus from "@giscus/react";

import { postConfig } from "@configs/comments";

export function Comments() {
  const { theme } = useTheme();

  // 'light' | 'light_high_contrast' | 'light_protanopia' | 'light_tritanopia' | 'dark' | 'dark_high_contrast' | 'dark_protanopia' | 'dark_tritanopia' | 'dark_dimmed' | 'preferred_color_scheme' | 'transparent_dark' | 'noborder_light' | 'noborder_dark' | 'cobalt' | `https://${string}` | GenericString;
  const giscusTheme = theme === "dark" ? "transparent_dark" : "light";

  return (
    <Giscus
      lang="en"
      loading="lazy"
      reactionsEnabled="1"
      inputPosition="bottom"
      {...postConfig.giscus}
      theme={giscusTheme}
    />
  );
}
