import { ArticleBodySkeleton } from "@/app/articles/[param]/ArticleBody";
import { ArticleHeaderSkeleton } from "@/app/articles/[param]/ArticleHeader";

export default function Loading() {
  return (
    <>
      <ArticleHeaderSkeleton />
      <ArticleBodySkeleton />
    </>
  );
}
