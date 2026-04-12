import "server-only";

import type { Article, ArticlesResponse } from "@/types/api";
import { appConfig } from "@/config/app";
import { getApiHeaders, getApiUrl } from "@/server/api";

interface GetTrendingArticlesOptions {
  exclude?: string | string[];
  limit?: number;
}

export async function getTrendingArticles({
  exclude,
  limit = appConfig.articles.trendingLimit,
}: GetTrendingArticlesOptions = {}): Promise<Article[]> {
  try {
    const url = new URL(getApiUrl("trendingArticles"));
    const excludedIds = Array.isArray(exclude) ? exclude.filter(Boolean) : exclude ? [exclude] : [];

    url.searchParams.set("exclude", excludedIds.join(","));

    const response = await fetch(url, {
      headers: getApiHeaders(),
    });

    if (!response.ok) {
      console.error(`Failed to fetch trending articles: ${response.status} ${response.statusText}`);
      return [];
    }

    const payload = (await response.json()) as ArticlesResponse;

    if (!payload.success || !Array.isArray(payload.data)) {
      return [];
    }

    return payload.data.slice(0, limit);
  } catch (exception) {
    console.error("Failed to fetch trending articles.", exception);
    return [];
  }
}
