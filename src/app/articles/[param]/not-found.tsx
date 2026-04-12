import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex items-center min-h-[90svh] py-16 bg-base-200">
      <div className="container flex flex-col items-start justify-center grow gap-6">
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest opacity-50">
          <SearchX className="size-6" />
          Article not found
        </p>
        <div className="max-w-2xl space-y-4">
          <h1 className="max-w-5xl font-black tracking-tight text-balance text-4xl sm:text-5xl lg:text-6xl">
            This article is unavailable or no longer exists.
          </h1>
          <p className="text-lg sm:text-xl leading-8 text-base-content/70">
            Check the URL or head back to the homepage to continue browsing the latest stories.
          </p>
        </div>
        <Link href="/" className="group/cta btn btn-ghost btn-xs">
          <ArrowLeft className="cta-icon-left" />
          Go back to home page
        </Link>
      </div>
    </section>
  );
}
