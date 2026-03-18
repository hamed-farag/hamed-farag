"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { ChevronUp, Search, Home, BookOpen, Sparkles } from "lucide-react";
import { useWindowScroll } from "@uidotdev/usehooks";

import { ThemeToggle } from "@components/ThemeToggle";
import { SearchProvider, SearchButton } from "@components/Search";

import "./header.css";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [{ y }, scrollTo] = useWindowScroll();
  const yAxis = y || 0;
  const isScrolled = yAxis > 60;

  return (
    <>
      <header
        className={`header-island ${
          isScrolled ? "header-collapsed" : "header-expanded"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="island-btn group"
          title="Home"
        >
          <Image
            src="/hf-logo.svg"
            alt="logo"
            className="dark:invert transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
            width={20}
            height={16}
            priority
          />
        </Link>

        {isScrolled && <div className="island-dot" />}

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`nav-pill ${pathname === "/" ? "nav-pill-active" : ""}`}
          >
            {isScrolled ? (
              <Home className="h-4 w-4" />
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Home
              </span>
            )}
          </Link>
          <Link
            href="/posts"
            className={`nav-pill ${pathname.startsWith("/posts") ? "nav-pill-active" : ""}`}
          >
            {isScrolled ? (
              <BookOpen className="h-4 w-4" />
            ) : (
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                Blog
              </span>
            )}
          </Link>
        </nav>

        {isScrolled && <div className="island-dot" />}

        {/* Actions */}
        <div className="flex items-center gap-0.5">
          <SearchProvider
            searchConfig={{
              kbarConfig: {
                defaultActions: [
                  {
                    id: "homeAction",
                    name: "Home",
                    shortcut: ["h"],
                    keywords: "back",
                    section: "Navigation",
                    perform: () => router.push("/"),
                    icon: <Home className="h-4 w-4" />,
                  },
                ],
              },
            }}
          >
            <SearchButton>
              <span className="flex items-center">
                <Search className="h-4 w-4" />
                {!isScrolled && <span className="kbd-hint">⌘K</span>}
              </span>
            </SearchButton>
          </SearchProvider>
          <ThemeToggle />
        </div>
      </header>

      {/* Scroll to top */}
      {yAxis > 200 && (
        <button
          className="go-up-btn"
          onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
