"use server";

import { getApiHeaders, getApiUrl } from "@/server/api";
import type { BreakingNews, BreakingNewsResponse } from "@/types/api";

export async function getBreakingNews(): Promise<BreakingNews | null> {
  try {
    const breakingNewsUrl = getApiUrl("breakingNews");
    const response = await fetch(breakingNewsUrl, {
      cache: "no-store",
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
