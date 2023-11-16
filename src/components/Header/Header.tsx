"use client";

import Image from "next/image";
import Link from "next/link";

import { ChevronUpIcon } from "@radix-ui/react-icons";
import { useWindowScroll } from "@uidotdev/usehooks";

import { ThemeToggle } from "@components/ThemeToggle";

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
        className={`header ${yAxis > yPositionForHeader ? "h-12" : "h-24"}`}
      >
        <Link href="/" legacyBehavior>
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
          <ThemeToggle />
        </section>
      </header>
      {renderGoUp()}
    </>
  );
}
