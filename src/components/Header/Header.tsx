"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { ThemeToggle } from "@components/ThemeToggle";
import { SearchProvider, SearchButton } from "@components/Search";

import "./header.css";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    ["/", "Home"],
    ["/posts", "Writing"],
    ["/works", "Work"],
  ];

  return (
    <header className="editorial-header">
      <Link href="/" className="hf-wordmark" aria-label="Hamed Farag home">
        <span>HF</span><b>HAMED FARAG</b>
      </Link>

      <nav aria-label="Primary navigation">
        {links.map(([href, label]) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return <Link href={href} key={href} aria-current={active ? "page" : undefined}>{label}</Link>;
        })}
      </nav>

      <div className="header-tools">
        <SearchProvider
          searchConfig={{
            kbarConfig: {
              defaultActions: [{
                id: "homeAction",
                name: "Home",
                shortcut: ["h"],
                keywords: "back",
                section: "Navigation",
                perform: () => router.push("/"),
              }],
            },
          }}
        >
          <SearchButton>
            <span className="search-trigger"><Search aria-hidden="true" /><i>⌘K</i><span className="sr-only">Search</span></span>
          </SearchButton>
        </SearchProvider>
        <ThemeToggle />
        <Link href="/hire" className="header-hire">HIRE ME <span>↗</span></Link>
      </div>
    </header>
  );
}
