import "server-only";

import type { Article } from "@/types/api";
import { cacheLife, cacheTag } from "next/cache";
import { getArticle } from "@/server/articleApi";

export function formatCategory(category: string) {
  return category
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function getCachedArticle(param: string) {
  "use cache";

  cacheLife("hours");

  const article = await getArticle(param);

  if (!article) {
    return null;
  }

  cacheTag("articles", `article-id:${article.id}`, `article-slug:${article.slug}`);

  return article;
}

export function getArticleDescription(article: Article) {
  return article.excerpt ?? `Read "${article.title}" on The Vercel Daily.`;
}
