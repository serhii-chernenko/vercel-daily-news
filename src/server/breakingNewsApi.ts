import "server-only";

import type { BreakingNews, BreakingNewsResponse } from "@/types/api";
import { getApiHeaders, getApiUrl } from "@/server/api";

export async function getBreakingNews(): Promise<BreakingNews | null> {
  try {
    const response = await fetch(getApiUrl("breakingNews"), {
      headers: getApiHeaders(),
    });

    if (!response.ok) {
      console.error(`Failed to fetch breaking news: ${response.status} ${response.statusText}`);
      return null;
    }

    const payload = (await response.json()) as BreakingNewsResponse;

    if (!payload.success) {
      return null;
    }

    return payload.data;
  } catch (exception) {
    console.error("Failed to fetch breaking news.", exception);
    return null;
  }
}
