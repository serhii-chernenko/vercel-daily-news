import { ArticleBodySkeleton } from "@/app/articles/[param]/ArticleBody";
import { ArticleHeaderSkeleton } from "@/app/articles/[param]/ArticleHeader";
import { TrendingArticlesSkeleton } from "@/app/components/TrendingArticles";

export default function Loading() {
  return (
    <>
      <ArticleHeaderSkeleton />
      <ArticleBodySkeleton />
      <TrendingArticlesSkeleton />
    </>
  );
}
