import "server-only";

import type { Article, ArticlesResponse } from "@/types/api";
import { getApiHeaders, getApiUrl } from "@/server/api";

export async function getFeaturedArticles(limit = 6): Promise<Article[]> {
  try {
    const url = new URL(getApiUrl("articles"));

    url.searchParams.set("featured", "true");
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("page", "1");

    const response = await fetch(url, {
      headers: getApiHeaders(),
    });

    if (!response.ok) {
      console.error(`Failed to fetch featured articles: ${response.status} ${response.statusText}`);
      return [];
    }

    const payload = (await response.json()) as ArticlesResponse;

    if (!payload.success || !Array.isArray(payload.data)) {
      return [];
    }

    return payload.data;
  } catch (exception) {
    console.error("Failed to fetch featured articles.", exception);
    return [];
  }
}
