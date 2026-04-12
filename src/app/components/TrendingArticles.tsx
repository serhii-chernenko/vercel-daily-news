import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { appConfig } from "@/config/app";
import { ArticleCard, ArticleCardSkeleton } from "@/app/components/ArticleCard";
import { getTrendingArticles } from "@/server/trendingArticlesApi";

export async function TrendingArticles({ currentArticleId }: { currentArticleId: string }) {
  "use cache";

  cacheLife("minutes");
  cacheTag("trending-articles");

  const articles = await getTrendingArticles({
    exclude: currentArticleId,
    limit: appConfig.articles.trendingLimit,
  });

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-8 py-16 sm:py-20 bg-base-200">
      <div className="container">
        <div className="max-w-2xl mx-auto space-y-3 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-base-content">Trending Articles</h2>
          <p className="text-base text-base-content/70">Stories readers are following right now.</p>
        </div>
      </div>
      <div className="carousel">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

export function TrendingArticlesSkeleton() {
  return (
    <section aria-hidden="true" className="flex flex-col gap-8 py-16 sm:py-20 bg-base-200">
      <div className="container">
        <div className="max-w-2xl mx-auto mt-3 space-y-4 text-center">
          <div className="mx-auto h-8 w-56 skeleton" />
          <div className="mx-auto h-4 w-72 skeleton" />
        </div>
      </div>
      <div className="carousel">
        {Array.from({ length: appConfig.articles.trendingLimit }, (_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
