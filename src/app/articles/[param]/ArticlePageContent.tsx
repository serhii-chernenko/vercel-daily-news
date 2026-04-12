import "server-only";

import type { ArticlePageProps } from "@/app/articles/[param]/page";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/app/articles/[param]/ArticleBody";
import { ArticleHeader } from "@/app/articles/[param]/ArticleHeader";
import { TrendingArticles, TrendingArticlesSkeleton } from "@/app/components/TrendingArticles";
import { getCachedArticle } from "@/app/articles/[param]/articlePageData";

export async function ArticlePageContent({ params }: ArticlePageProps) {
  const { param } = await params;
  const article = await getCachedArticle(param);

  if (!article) {
    notFound();
  }

  return (
    <>
      <ArticleHeader article={article} />
      <ArticleBody article={article} />
      <Suspense fallback={<TrendingArticlesSkeleton />}>
        <TrendingArticles currentArticleId={article.id} />
      </Suspense>
    </>
  );
}
