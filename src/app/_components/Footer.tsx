import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  const yearDisplay = startYear === currentYear ? `${startYear}` : `${startYear} - ${currentYear}`;

  return (
    <footer className="footer sm:footer-horizontal items-center max-sm:justify-center max-sm:gap-4 p-4 light:bg-base-content light:text-base-100 dark:bg-base-100 dark:text-base-content">
      <aside className="flex items-center">
        <Link href="/" className="btn btn-link h-auto px-0 no-underline">
          <Image
            src="/vercel.svg"
            alt="Vercel logo"
            width={24}
            height={24}
            loading="lazy"
            className="size-6 invert dark:opacity-80"
          />
          <span className="sr-only">Daily News</span>
        </Link>
        <p>Copyright © {yearDisplay} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 place-self-center sm:justify-self-end">
        <Link
          href="https://github.com/serhii-chernenko/vercel-daily-news"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-link btn-square"
        >
          <Image
            src="/github.svg"
            alt="GitHub"
            width={24}
            height={24}
            loading="lazy"
            className="w-auto invert dark:opacity-80"
          />
        </Link>
      </nav>
    </footer>
  );
}
