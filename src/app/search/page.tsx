import "server-only";

import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategories } from "@/server/categoriesApi";
import { SearchControls, SearchControlsSkeleton } from "@/app/search/SearchControls";
import { SearchResults, SearchResultsSkeleton } from "@/app/search/SearchResults";
import { normalizeSearchPageParams } from "@/app/search/searchParams";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const unstable_instant = {
  prefetch: "runtime",
  samples: [
    {
      searchParams: {
        category: null,
        page: null,
        q: null,
        search: null,
      },
    },
  ],
};

export const metadata: Metadata = {
  description: "Search recent Vercel Daily News articles by keyword and category.",
  title: "Search | Vercel Daily News",
};

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="container py-10 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="max-w-3xl mx-auto space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Search the archive</h1>
          <p className="text-base text-base-content/70 sm:text-lg">
            Find recent Vercel stories by keyword, category, or both.
          </p>
        </header>

        <Suspense fallback={<SearchControlsSkeleton />}>
          <SearchControlsWithCategories searchParams={searchParams} />
        </Suspense>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResultsFromSearchParams searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function SearchControlsWithCategories({ searchParams }: { searchParams: SearchParams }) {
  const params = normalizeSearchPageParams(await searchParams);
  const categories = await getCategories();

  return <SearchControls categories={categories} params={params} />;
}

async function SearchResultsFromSearchParams({ searchParams }: { searchParams: SearchParams }) {
  const params = normalizeSearchPageParams(await searchParams);

  return <SearchResults params={params} />;
}
