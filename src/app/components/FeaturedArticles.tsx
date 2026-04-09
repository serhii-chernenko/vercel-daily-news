import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { getFeaturedArticles } from "@/server/featuredArticlesApi";
import { ArticleCard } from "@/app/components/ArticleCard";

export async function FeaturedArticles() {
  "use cache";

  cacheLife("minutes");
  cacheTag("featured-articles");

  const articles = await getFeaturedArticles(6);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container flex flex-col gap-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-4xl font-bold tracking-tight text-base-content">Featured</h2>
          <p className="text-base text-base-content/70">Handpicked stories from the team.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedArticlesSkeleton() {
  return (
    <section aria-hidden="true" className="py-16 sm:py-20">
      <div className="container flex flex-col gap-8">
        <div className="max-w-2xl space-y-3">
          <div className="h-10 w-48 rounded bg-base-300 motion-safe:animate-pulse" />
          <div className="h-5 w-72 rounded bg-base-300 motion-safe:animate-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="card h-full overflow-hidden bg-base-100 shadow-sm ring-1 ring-base-300"
            >
              <div className="aspect-[16/10] bg-base-300 motion-safe:animate-pulse" />
              <div className="card-body gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-20 rounded bg-base-300 motion-safe:animate-pulse" />
                  <div className="h-3 w-3 rounded-full bg-base-300 motion-safe:animate-pulse" />
                  <div className="h-3 w-32 rounded bg-base-300 motion-safe:animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-7 w-full rounded bg-base-300 motion-safe:animate-pulse" />
                  <div className="h-7 w-4/5 rounded bg-base-300 motion-safe:animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-base-300 motion-safe:animate-pulse" />
                  <div className="h-4 w-full rounded bg-base-300 motion-safe:animate-pulse" />
                  <div className="h-4 w-3/4 rounded bg-base-300 motion-safe:animate-pulse" />
                </div>
                <div className="card-actions justify-end">
                  <div className="h-8 w-28 rounded bg-base-300 motion-safe:animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
