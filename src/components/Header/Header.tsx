"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ChevronUpIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import { useWindowScroll } from "@uidotdev/usehooks";

import { ThemeToggle } from "@components/ThemeToggle";
import { SearchProvider, SearchButton } from "@components/Search";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@components/ui/NavigationMenu";

import { Button } from "@components/ui/Button";

import "./header.css";

export function Header() {
  const router = useRouter();
  const [{ y }, scrollTo] = useWindowScroll();
  const yAxis = y || 0;
  const yPositionForHeader = 50;
  const yPositionForGoUpButton = 100;

  const renderGoUp = () => {
    if (yAxis > yPositionForGoUpButton) {
      return (
        <Button
          variant="outline"
          size="icon"
          className="fixed right-5 bottom-5"
          onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        >
          <ChevronUpIcon className="h-4 w-4" />
        </Button>
      );
    }

    return null;
  };

  return (
    <>
      <header
        className={`header bg-background ${
          yAxis > yPositionForHeader ? "h-12" : "h-24"
        }`}
      >
        <Link href="/">
          <Image
            src="/hf-logo.svg"
            alt="logo"
            className="dark:invert hover:cursor-pointer"
            width={30}
            height={24}
            priority
          />
        </Link>
        <section className="flex gap-3">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/posts" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
                    icon: <HomeIcon />,
                  },
                ],
              },
            }}
          >
            <SearchButton>
              <MagnifyingGlassIcon />
            </SearchButton>
          </SearchProvider>
          <ThemeToggle />
        </section>
      </header>
      {renderGoUp()}
    </>
  );
}
