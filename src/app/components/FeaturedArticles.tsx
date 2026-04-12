import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { appConfig } from "@/config/app";
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

  return (
    <section className="flex flex-col gap-8 py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto space-y-3 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-base-content">Featured</h2>
          <p className="text-base text-base-content/70">Handpicked stories from the team.</p>
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

export function FeaturedArticlesSkeleton() {
  return (
    <section aria-hidden="true" className="flex flex-col gap-8 py-16 sm:py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto mt-3 space-y-4 text-center">
          <div className="w-48 h-8 mx-auto skeleton" />
          <div className="w-72 h-4 mx-auto skeleton" />
        </div>
      </div>
      <div className="carousel">
        {Array.from({ length: appConfig.articles.featuredLimit }, (_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
