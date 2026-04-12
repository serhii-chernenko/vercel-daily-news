import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { appConfig } from "@/config/app";
import { ArticleCarousel, ArticleCarouselItem } from "@/app/components/ArticleCarousel";
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

  const headingId = "trending-articles-heading";

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-8 py-16 sm:py-20 bg-base-200">
      <div className="container">
        <div className="max-w-2xl mx-auto space-y-3 text-center">
          <h2 id={headingId} className="text-4xl font-bold tracking-tight text-base-content">
            Trending Articles
          </h2>
          <p className="text-base text-base-content/70">Stories readers are following right now.</p>
        </div>
      </div>
      <ArticleCarousel>
        {articles.map((article) => (
          <ArticleCarouselItem key={article.id}>
            <ArticleCard article={article} />
          </ArticleCarouselItem>
        ))}
      </ArticleCarousel>
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
      <ArticleCarousel>
        {Array.from({ length: appConfig.articles.trendingLimit }, (_, index) => (
          <ArticleCarouselItem key={index}>
            <ArticleCardSkeleton />
          </ArticleCarouselItem>
        ))}
      </ArticleCarousel>
    </section>
  );
}
