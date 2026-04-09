import { cacheLife } from "next/cache";
import "server-only";

export async function CopyrightYear() {
  "use cache";

  cacheLife("days");

  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  const yearDisplay = startYear === currentYear ? `${startYear}` : `${startYear} - ${currentYear}`;

  return yearDisplay;
}

export function CopyrightYearSkeleton() {
  return (
    <span
      className="inline-block h-4 w-8 rounded bg-primary-content align-middle light:animate-pulse dark:animate-none"
      aria-hidden="true"
    />
  );
}
