import "server-only";

import type { ArticlePageProps } from "@/app/articles/[param]/page";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/app/articles/[param]/ArticleHeader";
import {
  ArticleSubscriptionGate,
  ArticleSubscriptionGateSkeleton,
} from "@/app/articles/[param]/ArticleSubscriptionGate";
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
      <Suspense fallback={<ArticleSubscriptionGateSkeleton />}>
        <ArticleSubscriptionGate article={article} />
      </Suspense>
      <Suspense fallback={<TrendingArticlesSkeleton />}>
        <TrendingArticles currentArticleId={article.id} />
      </Suspense>
    </>
  );
}
