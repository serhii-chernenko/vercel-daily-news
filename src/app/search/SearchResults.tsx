import "server-only";

import type { SearchPageParams } from "@/app/search/searchParams";
import { cacheLife, cacheTag } from "next/cache";
import { appConfig } from "@/config/app";
import { getArticleCacheTags, getArticles, normalizeArticleQuery } from "@/server/articlesApi";
import { hasSearchPageParams } from "@/app/search/searchParams";
import { ArticleCard, ArticleCardSkeleton } from "@/app/components/ArticleCard";
import { SearchPagination } from "@/app/search/SearchPagination";
import { SearchX } from "lucide-react";

const { searchPerPageLimit } = appConfig.articles;

export async function SearchResults({ params }: { params: SearchPageParams }) {
  "use cache";

  const articleQuery = normalizeArticleQuery({
    category: params.category,
    limit: searchPerPageLimit,
    page: params.page,
    search: params.search,
  });

  cacheLife("minutes");
  cacheTag("search-results", ...getArticleCacheTags(articleQuery));

  const hasSearch = hasSearchPageParams(params);
  const payload = await getArticles(articleQuery);
  const articles = payload.data.slice(0, searchPerPageLimit);
  const pagination = payload.meta?.pagination;
  const heading = hasSearch ? "Search results" : "Recent articles";
  const resultCount = pagination?.total ?? articles.length;

  if (!articles.length) {
    return (
      <section aria-labelledby="search-results-heading" className="space-y-6">
        <SearchResultsHeading
          heading={heading}
          limit={searchPerPageLimit}
          params={params}
          resultCount={resultCount}
          visibleCount={0}
        />
        <div className="rounded-box border border-base-300 bg-base-100 p-8 text-center sm:p-12">
          <SearchX aria-hidden="true" className="mx-auto size-10 opacity-50" />
          <h2 className="mt-4 text-xl font-semibold">No articles found</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-base-content/70">
            Try a different search term or broaden the category filter.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="search-results-heading" className="space-y-6">
      <SearchResultsHeading
        heading={heading}
        limit={searchPerPageLimit}
        params={params}
        resultCount={resultCount}
        visibleCount={articles.length}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <SearchPagination params={params} pagination={pagination} />
      )}
    </section>
  );
}

function SearchResultsHeading({
  heading,
  limit,
  params,
  resultCount,
  visibleCount,
}: {
  heading: string;
  limit: number;
  params: SearchPageParams;
  resultCount: number;
  visibleCount: number;
}) {
  const hasSearch = hasSearchPageParams(params);
  const resultLabel = hasSearch ? "matches" : "articles";
  const rangeStart = resultCount > 0 && visibleCount > 0 ? (params.page - 1) * limit + 1 : 0;
  const rangeEnd = Math.min((params.page - 1) * limit + visibleCount, resultCount);

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="space-y-2">
        <h2 id="search-results-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {heading}
        </h2>
        <p className="text-sm text-base-content/70">
          {resultCount > 0 && visibleCount > 0 ? (
            <>
              Showing {rangeStart}-{rangeEnd} of {resultCount} {resultLabel}
            </>
          ) : (
            <>Showing 0 {resultLabel}</>
          )}
          {params.search ? ` for "${params.search}"` : ""}
          {params.category ? ` in ${params.category}` : ""}.
        </p>
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <section aria-label="Loading articles" className="space-y-6">
      <div className="mx-auto max-w-2xl space-y-3">
        <div className="mx-auto w-48 h-8 skeleton" />
        <div className="mx-auto w-80 h-4 max-w-full skeleton" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: searchPerPageLimit }, (_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
