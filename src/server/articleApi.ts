import "server-only";

import type { Article, ArticleApiResponse } from "@/types/api";
import { getApiHeaders, getApiUrl } from "@/server/api";

export async function getArticle(param: string): Promise<Article | null> {
  try {
    const response = await fetch(`${getApiUrl("articles")}/${encodeURIComponent(param)}`, {
      headers: getApiHeaders(),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      console.error(
        `Failed to fetch article "${param}": ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const payload = (await response.json()) as ArticleApiResponse;

    if (!payload.success) {
      if (payload.error.code === "NOT_FOUND") {
        return null;
      }

      console.error(`Failed to fetch article "${param}": ${payload.error.message}`);
      return null;
    }

    return payload.data;
  } catch (exception) {
    console.error(`Failed to fetch article "${param}".`, exception);
    return null;
  }
}
