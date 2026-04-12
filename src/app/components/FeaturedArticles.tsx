import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { appConfig } from "@/config/app";
import { ArticleCarousel, ArticleCarouselItem } from "@/app/components/ArticleCarousel";
import { getFeaturedArticles } from "@/server/featuredArticlesApi";
import { ArticleCard, ArticleCardSkeleton } from "@/app/components/ArticleCard";

export async function FeaturedArticles() {
  "use cache";

  cacheLife("minutes");
  cacheTag("featured-articles");

  const articles = await getFeaturedArticles(appConfig.articles.featuredLimit);

  if (articles.length === 0) {
    return null;
  }

  const headingId = "featured-articles-heading";

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-8 py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto space-y-3 text-center">
          <h2 id={headingId} className="text-4xl font-bold tracking-tight text-base-content">
            Featured
          </h2>
          <p className="text-base text-base-content/70">Handpicked stories from the team.</p>
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

export function FeaturedArticlesSkeleton() {
  return (
    <section aria-hidden="true" className="flex flex-col gap-8 py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto mt-3 space-y-4 text-center">
          <div className="w-48 h-8 mx-auto skeleton" />
          <div className="w-72 h-4 mx-auto skeleton" />
        </div>
      </div>
      <ArticleCarousel>
        {Array.from({ length: appConfig.articles.featuredLimit }, (_, index) => (
          <ArticleCarouselItem key={index}>
            <ArticleCardSkeleton />
          </ArticleCarouselItem>
        ))}
      </ArticleCarousel>
    </section>
  );
}
