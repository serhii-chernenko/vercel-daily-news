import Image from "next/image";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-base-100/90 backdrop-blur-2xl">
      <div className="navbar">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-link h-auto no-underline light:text-neutral dark:text-neutral-content"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logo"
              width={24}
              height={24}
              priority
              className="size-6 dark:invert"
            />
            <span className="max-sm:sr-only ml-2 text-xl font-bold tracking-tight">Daily News</span>
          </Link>
        </div>
        <nav aria-label="Primary">
          <ul className="menu menu-horizontal gap-1">
            <li>
              <Link
                href="/"
                aria-label="Home"
                data-tip="Home page"
                className="tooltip tooltip-bottom btn btn-ghost btn-square"
              >
                <Home className="icon" />
                <span className="sr-only">Home page</span>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                aria-label="Search"
                data-tip="Search page"
                className="tooltip tooltip-bottom btn btn-ghost btn-square"
              >
                <Search className="icon" />
                <span className="sr-only">Search</span>
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
