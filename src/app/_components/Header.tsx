import "server-only";

import type { Route } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle, ThemeToggleSkeleton } from "@/app/_components/ThemeToggle";
import {
  BreakingNewsBanner,
  BreakingNewsBannerSkeleton,
} from "@/app/_components/BreakingNewsBanner";
import {
  HeaderDesktopSubscriptionControl,
  HeaderDesktopSubscriptionControlSkeleton,
  HeaderMobileSubscriptionControl,
  HeaderMobileSubscriptionControlSkeleton,
} from "@/app/_components/SubscriptionControl";
import { Home, Search } from "lucide-react";

export function Header() {
  return (
    <>
      <Suspense fallback={<BreakingNewsBannerSkeleton />}>
        <BreakingNewsBanner />
      </Suspense>
      <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-2xl relative">
        <div className="container navbar relative z-20">
          <div className="navbar-start flex items-center gap-3">
            <Link href="/" className="btn btn-link h-auto px-0 no-underline">
              <Image
                src="/vercel.svg"
                alt="Vercel logo"
                width={24}
                height={24}
                preload
                className="size-6 dark:invert"
              />
              <span className="max-sm:sr-only text-xl font-bold tracking-tight">Daily News</span>
            </Link>
            <ul className="menu menu-horizontal gap-1 p-0">
              <li>
                <Suspense fallback={<ThemeToggleSkeleton />}>
                  <ThemeToggle iconClassName="md:size-4" />
                </Suspense>
              </li>
            </ul>
          </div>
          <nav aria-label="Navigation" className="navbar-center">
            <ul className="menu menu-horizontal gap-1 p-0">
              <li>
                <Link
                  href="/"
                  aria-label="Home"
                  className="btn btn-ghost max-md:btn-square btn-sm hitslop"
                >
                  <Home aria-hidden="true" className="icon md:size-4" />
                  <span className="max-md:sr-only">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/search" as Route}
                  aria-label="Search"
                  className="btn btn-ghost max-md:btn-square btn-sm hitslop"
                >
                  <Search aria-hidden="true" className="icon md:size-4" />
                  <span className="max-md:sr-only">Search</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="max-md:hidden navbar-end">
            <Suspense fallback={<HeaderDesktopSubscriptionControlSkeleton />}>
              <HeaderDesktopSubscriptionControl />
            </Suspense>
          </div>
          <div className="md:hidden navbar-end">
            <Suspense fallback={<HeaderMobileSubscriptionControlSkeleton />}>
              <HeaderMobileSubscriptionControl />
            </Suspense>
          </div>
        </div>
      </header>
    </>
  );
}
