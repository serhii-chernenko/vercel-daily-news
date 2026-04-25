import "server-only";

import type { CategoriesResponse, Category } from "@/types/api";
import { cacheLife, cacheTag } from "next/cache";
import { getApiHeaders, getApiUrl } from "@/server/api";

export async function getCategories(): Promise<Category[]> {
  "use cache";

  cacheLife("hours");
  cacheTag("categories");

  const response = await fetch(getApiUrl("categories"), {
    headers: getApiHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as CategoriesResponse;

  if (!payload.success || !Array.isArray(payload.data)) {
    throw new Error("Failed to fetch categories: invalid API response.");
  }

  return payload.data;
}
