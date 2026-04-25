import "server-only";

import type { ArticlesResponse } from "@/types/api";
import { cacheLife, cacheTag } from "next/cache";
import { appConfig } from "@/config/app";
import { getApiHeaders, getApiUrl } from "@/server/api";

const { searchPerPageLimit: defaultArticleLimit, maxArticleLimit } = appConfig.articles;
const { maxCategorySlugLength, maxSearchPage, maxSearchQueryLength } = appConfig.articles;
const categorySlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface ArticleQuery {
  category?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  search?: string;
}

export interface NormalizedArticleQuery {
  category: string;
  featured?: boolean;
  limit: number;
  page: number;
  search: string;
}

function normalizePositiveInteger(value: number | undefined, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(1, Math.floor(value));
}

function normalizeBoundedText(value: string | undefined, maxLength: number) {
  return (value?.trim() ?? "").slice(0, maxLength);
}

function normalizeCategory(value: string | undefined) {
  const category = normalizeBoundedText(value, maxCategorySlugLength).toLowerCase();

  return category && categorySlugPattern.test(category) ? category : "";
}

export function normalizeArticleQuery(query: ArticleQuery = {}): NormalizedArticleQuery {
  return {
    category: normalizeCategory(query.category),
    featured: query.featured,
    limit: Math.min(normalizePositiveInteger(query.limit, defaultArticleLimit), maxArticleLimit),
    page: Math.min(normalizePositiveInteger(query.page, 1), maxSearchPage),
    search: normalizeBoundedText(query.search, maxSearchQueryLength),
  };
}

function getCacheTagSegment(value: string) {
  return encodeURIComponent(value || "all").slice(0, 120);
}

export function getArticleCacheTags(query: NormalizedArticleQuery) {
  return [
    "articles",
    `articles:page:${query.page}`,
    `articles:limit:${query.limit}`,
    `articles:category:${getCacheTagSegment(query.category)}`,
    `articles:search:${getCacheTagSegment(query.search)}`,
    `articles:featured:${query.featured ?? "all"}`,
  ];
}

export async function getArticles(query: ArticleQuery = {}): Promise<ArticlesResponse> {
  "use cache";

  const normalizedQuery = normalizeArticleQuery(query);
  const cacheTags = getArticleCacheTags(normalizedQuery);

  cacheLife("minutes");
  cacheTag(...cacheTags);

  const url = new URL(getApiUrl("articles"));

  url.searchParams.set("page", String(normalizedQuery.page));
  url.searchParams.set("limit", String(normalizedQuery.limit));

  if (normalizedQuery.category) {
    url.searchParams.set("category", normalizedQuery.category);
  }

  if (normalizedQuery.search) {
    url.searchParams.set("search", normalizedQuery.search);
  }

  if (typeof normalizedQuery.featured === "boolean") {
    url.searchParams.set("featured", String(normalizedQuery.featured));
  }

  const response = await fetch(url, {
    headers: getApiHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as ArticlesResponse;

  if (!payload.success || !Array.isArray(payload.data)) {
    throw new Error("Failed to fetch articles: invalid API response.");
  }

  return payload;
}
