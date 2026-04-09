import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { getBreakingNews } from "@/server/breakingNewsApi";
import Link from "next/link";
import { TriangleAlert, ArrowRight } from "lucide-react";

export async function BreakingNewsBanner() {
  "use cache";

  cacheLife("minutes");

  const banner = await getBreakingNews();

  if (!banner) {
    return null;
  }

  return (
    <aside
      aria-live="polite"
      className="relative z-50 bg-primary text-primary-content motion-safe:transition-transform duration-300 ring-primary ring-offset-2 has-focus-visible:ring-2"
    >
      <div className="container">
        <Link
          href={`/articles/${encodeURIComponent(banner.articleId)}`}
          className="group/cta flex items-center gap-3 min-h-12 py-2 focus:outline-none"
          aria-label="Read more about this news"
        >
          <span className="flex items-center justify-center grow min-w-0">
            <span className="flex items-center gap-2 min-w-0 max-w-full">
              {banner.urgent && (
                <span className="lg:badge badge-secondary badge-sm gap-1 lg:py-3 lg:px-2 uppercase font-bold">
                  <TriangleAlert className="size-4" />
                  <span className="max-lg:hidden">Urgent</span>
                </span>
              )}
              <span className="min-w-0 truncate text-sm font-medium">{banner.headline}</span>
              <ArrowRight className="cta-arrow" />
            </span>
          </span>
        </Link>
      </div>
    </aside>
  );
}
