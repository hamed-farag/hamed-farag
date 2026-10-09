"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useKBar, VisualState, type Action } from "kbar";
import { Map as MapIcon } from "pixelarticons/react/Map.js";
import { Search } from "pixelarticons/react/Search.js";
import { Star } from "pixelarticons/react/Star.js";
import { Castle } from "pixelarticons/react/Castle.js";
import { Article } from "pixelarticons/react/Article.js";
import { Briefcase } from "pixelarticons/react/Briefcase.js";
import { Mail } from "pixelarticons/react/Mail.js";
import { Zap } from "pixelarticons/react/Zap.js";

import { SearchProvider } from "@components/Search";
import { PixelIcon } from "@components/pixel";
import { getLevelByPath } from "@configs/levels";
import { playSfx } from "@lib/sound";

import { DayNightSwitch } from "./DayNightSwitch";
import { SoundToggle } from "./SoundToggle";

const subscribeNoop = () => () => {};
const detectMac = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

export type THudStats = { articles: number; projects: number; years: number };

type THudProps = {
  stats: THudStats;
  /** server-rendered sprites (they read their sheet's JSON at build time) */
  coin: React.ReactNode;
  head: React.ReactNode;
};

export function Hud(props: THudProps) {
  const router = useRouter();

  // the pause menu lists these above the post search results
  const warps = useMemo<Array<Action>>(
    () => [
      { id: "warp-map", name: "Map", section: "Warp to", keywords: "home world start", icon: <PixelIcon icon={MapIcon} />, perform: () => router.push("/") },
      { id: "warp-articles", name: "Articles", section: "Warp to", keywords: "blog posts writing", icon: <PixelIcon icon={Article} />, perform: () => router.push("/posts") },
      { id: "warp-works", name: "My Works", section: "Warp to", keywords: "projects portfolio", icon: <PixelIcon icon={Briefcase} />, perform: () => router.push("/works") },
      { id: "warp-hire", name: "Hire Me", section: "Warp to", keywords: "contact services shop", icon: <PixelIcon icon={Mail} />, perform: () => router.push("/hire") },
      { id: "warp-cortex", name: "Cortex", section: "Warp to", keywords: "extension review ai", icon: <PixelIcon icon={Zap} />, perform: () => router.push("/cortex") },
    ],
    [router]
  );

  return (
    <SearchProvider searchConfig={{ kbarConfig: { defaultActions: warps } }}>
      <HudBar {...props} />
    </SearchProvider>
  );
}

function HudBar({ stats, coin, head }: THudProps) {
  const router = useRouter();
  const pathname = usePathname();
  const level = getLevelByPath(pathname);
  const isMac = useSyncExternalStore(subscribeNoop, detectMac, () => false);
  const { query, showing } = useKBar((state) => ({
    showing: state.visualState !== VisualState.hidden,
  }));

  // Esc goes back to the map, unless a menu, dialog or text field owns the key
  const searchOpen = useRef(showing);
  useEffect(() => {
    searchOpen.current = showing;
  }, [showing]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented || searchOpen.current) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true'], [role='dialog'], [role='menu']")) return;
      if (document.querySelector("[data-escape-owner]")) return;
      router.push("/");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <header className="lv-hud">
      <div className="mx-auto flex h-full w-full max-w-[90rem] items-center gap-3 px-4 lg:gap-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 no-underline" aria-label="Hamed Farag, back to the map">
          {head}
          <span className="px-hud-text hidden text-[12px] text-px-paper sm:inline">Hamed</span>
        </Link>

        {level && (
          <p className="px-hud-text m-0 hidden whitespace-nowrap text-[10px] text-px-stone lg:block">
            <span className="sr-only">Current level: </span>
            World {level.world} · {level.name}
          </p>
        )}

        <ul className="px-hud-text m-0 hidden list-none items-center gap-4 p-0 text-[12px] text-px-coin sm:flex" aria-label="Stats">
          <li className="flex items-center gap-1.5" title={`${stats.articles} articles`}>
            {coin}
            <span aria-hidden="true">×{stats.articles}</span>
            <span className="sr-only">{stats.articles} articles</span>
          </li>
          <li className="flex items-center gap-1.5" title={`${stats.projects} projects`}>
            <PixelIcon icon={Star} />
            <span aria-hidden="true">×{stats.projects}</span>
            <span className="sr-only">{stats.projects} projects</span>
          </li>
          <li className="flex items-center gap-1.5" title={`${stats.years} years of experience`}>
            <PixelIcon icon={Castle} />
            <span aria-hidden="true">×{stats.years}</span>
            <span className="sr-only">{stats.years} years of experience</span>
          </li>
        </ul>

        <nav aria-label="Game menu" className="ml-auto flex items-center gap-2.5">
          <Link
            href="/"
            aria-keyshortcuts="Escape"
            title="Back to the map (Esc)"
            onClick={() => playSfx("blip")}
            className="px-frame px-btn px-btn--hud"
          >
            <PixelIcon icon={MapIcon} />
            <span className="sr-only lg:not-sr-only">Map</span>
            <kbd className="px-kbd hidden xl:inline">Esc</kbd>
          </Link>
          <button
            type="button"
            aria-keyshortcuts="Control+K Meta+K"
            title="Search (Ctrl/⌘ K)"
            onClick={() => {
              playSfx("blip");
              query.toggle();
            }}
            className="px-frame px-btn px-btn--hud"
          >
            <PixelIcon icon={Search} />
            <span className="sr-only lg:not-sr-only">Search</span>
            <kbd className="px-kbd hidden xl:inline">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <DayNightSwitch />
          <SoundToggle />
        </nav>
      </div>
    </header>
  );
}
