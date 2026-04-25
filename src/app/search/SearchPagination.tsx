import "server-only";

import type { ReactNode } from "react";
import type { Route } from "next";
import type { ArticlesPagination } from "@/types/api";
import type { SearchPageParams } from "@/app/search/searchParams";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export function SearchPagination({
  params,
  pagination,
}: {
  params: SearchPageParams;
  pagination: ArticlesPagination;
}) {
  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;
  const pageItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav className="flex justify-center">
      <div className="join" aria-label="Article pages">
        {pagination.hasPreviousPage && (
          <PaginationLink
            ariaLabel="Previous page"
            href={getSearchPageHref(params, currentPage - 1)}
          >
            <ChevronLeft aria-hidden="true" className="size-4" />
          </PaginationLink>
        )}
        {pageItems.map((item) =>
          typeof item === "number" ? (
            <PaginationLink
              key={item}
              ariaCurrent={item === currentPage ? "page" : undefined}
              ariaLabel={`Page ${item}`}
              href={getSearchPageHref(params, item)}
            >
              {item}
            </PaginationLink>
          ) : (
            <button
              key={item}
              className="join-item btn btn-outline btn-square"
              disabled
              type="button"
            >
              ...
            </button>
          ),
        )}
        {pagination.hasNextPage && (
          <PaginationLink ariaLabel="Next page" href={getSearchPageHref(params, currentPage + 1)}>
            <ChevronRight aria-hidden="true" className="size-4" />
          </PaginationLink>
        )}
      </div>
    </nav>
  );
}

function PaginationLink({
  ariaCurrent,
  ariaLabel,
  children,
  href,
}: {
  ariaCurrent?: "page";
  ariaLabel: string;
  children: ReactNode;
  href: Route;
}) {
  const className = "join-item btn btn-square btn-sm btn-ghost hitslop";

  if (ariaCurrent === "page") {
    return (
      <span
        aria-current={ariaCurrent}
        aria-label={ariaLabel}
        className={clsx(className, "btn-disabled")}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
      className={className}
      href={href}
      prefetch
    >
      {children}
    </Link>
  );
}

function getPaginationItems(currentPage: number, totalPages: number) {
  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  const orderedPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
  const items: Array<number | string> = [];

  for (const page of orderedPages) {
    const previousItem = items.at(-1);

    if (typeof previousItem === "number" && page - previousItem > 1) {
      items.push(`ellipsis-${previousItem}-${page}`);
    }

    items.push(page);
  }

  return items;
}

function getSearchPageHref(params: SearchPageParams, page: number): Route {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();

  return (query ? `/search?${query}` : "/search") as Route;
}
