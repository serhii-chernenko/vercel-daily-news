import "server-only";

import type { Route } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { ThemeToggle, ThemeToggleSkeleton } from "@/app/_components/ThemeToggle";
import {
  BreakingNewsBanner,
  BreakingNewsBannerSkeleton,
} from "@/app/_components/BreakingNewsBanner";

export function Header() {
  return (
    <>
      <Suspense fallback={<BreakingNewsBannerSkeleton />}>
        <BreakingNewsBanner />
      </Suspense>
      <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur-2xl relative">
        <div className="container navbar relative z-20">
          <div className="flex-1">
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
          </div>
          <nav aria-label="Primary">
            <ul className="menu menu-horizontal gap-1 p-0">
              <li>
                <Link
                  href="/"
                  aria-label="Home"
                  className="btn btn-ghost btn-square btn-sm hitslop"
                >
                  <Home aria-hidden="true" className="icon" />
                  <span className="sr-only">Home page</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/search" as Route}
                  aria-label="Search"
                  className="btn btn-ghost btn-square btn-sm hitslop"
                >
                  <Search aria-hidden="true" className="icon" />
                  <span className="sr-only">Search</span>
                </Link>
              </li>
              <li>
                <Suspense fallback={<ThemeToggleSkeleton />}>
                  <ThemeToggle />
                </Suspense>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
