"use client";

import "client-only";

import type { Category } from "@/types/api";
import type { Route } from "next";
import type { SearchPageParams } from "@/app/search/searchParams";
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { appConfig } from "@/config/app";
import { Search } from "lucide-react";
import clsx from "clsx";

type SearchNavigationMode = "push" | "replace";

export function SearchControls({
  categories,
  params,
}: {
  categories: Category[];
  params: SearchPageParams;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const autoSearchTimeoutRef = useRef<number | null>(null);
  const [desktopShortcutModifier, setDesktopShortcutModifier] = useState<string | null>(null);
  const [query, setQuery] = useState<string>(params.search);
  const [category, setCategory] = useState<string>(params.category);
  const [isNavigating, startTransition] = useTransition();

  const focusSearchInputAtEnd = useCallback((preventScroll = false) => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    input.focus({ preventScroll });

    const cursorPosition = input.value.length;

    input.setSelectionRange(cursorPosition, cursorPosition);
  }, []);

  const submitSearch = useCallback(
    (nextQuery: string, nextCategory: string, mode: SearchNavigationMode = "push") => {
      const searchParams = new URLSearchParams();
      const normalizedQuery = nextQuery.trim();
      const normalizedCategory = nextCategory.trim();

      if (normalizedQuery) {
        searchParams.set("search", normalizedQuery);
      }

      if (normalizedCategory) {
        searchParams.set("category", normalizedCategory);
      }

      const queryString = searchParams.toString();
      const nextUrl = (queryString ? `/search?${queryString}` : "/search") as Route;

      startTransition(() => {
        if (mode === "replace") {
          router.replace(nextUrl, { scroll: true });
          return;
        }

        router.push(nextUrl, { scroll: true });
      });
    },
    [router],
  );

  useEffect(() => {
    setDesktopShortcutModifier(getDesktopShortcutModifier());
  }, []);

  useEffect(() => {
    setQuery(params.search);
    setCategory(params.category);
  }, [params.category, params.search]);

  useEffect(() => {
    function focusSearchInput(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) {
        return;
      }

      event.preventDefault();
      focusSearchInputAtEnd();
    }

    window.addEventListener("keydown", focusSearchInput);

    return () => {
      window.removeEventListener("keydown", focusSearchInput);
    };
  }, [focusSearchInputAtEnd]);

  useEffect(
    () => () => {
      if (autoSearchTimeoutRef.current !== null) {
        window.clearTimeout(autoSearchTimeoutRef.current);
      }
    },
    [],
  );

  function handleSubmit(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("search") ?? "");
    const category = String(formData.get("category") ?? "");

    submitSearch(query, category);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.currentTarget.value;
    const normalizedQuery = nextQuery.trim();

    setQuery(nextQuery);

    if (autoSearchTimeoutRef.current !== null) {
      window.clearTimeout(autoSearchTimeoutRef.current);
    }

    if (normalizedQuery.length > 0 && normalizedQuery.length < 3) {
      return;
    }

    autoSearchTimeoutRef.current = window.setTimeout(() => {
      submitSearch(nextQuery, category, "replace");
    }, appConfig.searchTypeDebounce);
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextCategory = event.currentTarget.value;

    setCategory(nextCategory);

    submitSearch(query, nextCategory);
  }

  return (
    <form
      action="/search"
      className="grid w-full grid-cols-1 gap-3 md:join md:grid-cols-[minmax(0,1fr)_minmax(0,10rem)_auto] md:gap-0"
      method="get"
      role="search"
      onSubmit={handleSubmit}
    >
      <label className="input flex w-full items-center gap-2 md:join-item md:rounded-l-field md:rounded-r-none">
        <Search aria-hidden="true" className="size-6 opacity-50" />
        <input
          ref={inputRef}
          type="text"
          name="search"
          className="grow"
          placeholder="Search articles"
          value={query}
          onChange={handleInputChange}
        />
        {desktopShortcutModifier ? (
          <span className="hidden items-center gap-1 md:flex" aria-hidden="true">
            <kbd className="kbd kbd-xs">{desktopShortcutModifier}</kbd>
            <kbd className="kbd kbd-xs">K</kbd>
          </span>
        ) : null}
      </label>
      <select
        ref={categorySelectRef}
        name="category"
        aria-label="Filter articles by category"
        aria-disabled={isNavigating}
        value={category}
        className="select w-full md:join-item md:max-w-56 md:rounded-none"
        onChange={handleCategoryChange}
      >
        <option value="">All categories</option>
        {categories.map((categoryOption) => (
          <option key={categoryOption.slug} value={categoryOption.slug}>
            {categoryOption.name} ({categoryOption.articleCount})
          </option>
        ))}
      </select>
      <button
        type="submit"
        aria-disabled={isNavigating}
        className={clsx(
          "btn btn-primary min-w-24 md:join-item md:rounded-l-none md:rounded-r-field",
          {
            "btn-disabled": isNavigating,
          },
        )}
      >
        Search
        {isNavigating ? (
          <span className="loading loading-spinner loading-xs" aria-hidden="true" />
        ) : (
          <Search className="size-4" />
        )}
      </button>
    </form>
  );
}

export function SearchControlsSkeleton() {
  return (
    <div
      className="grid w-full grid-cols-1 gap-3 md:join md:grid-cols-[minmax(0,1fr)_minmax(0,10rem)_auto] md:gap-0"
      aria-hidden="true"
    >
      <div className="input w-full md:join-item md:rounded-l-field md:rounded-r-none">
        <div className="size-4 skeleton" />
        <div className="w-24 h-4 skeleton" />
      </div>
      <div className="select w-full md:join-item md:max-w-56 md:rounded-none">
        <div className="w-32 h-4 skeleton" />
      </div>
      <div className="btn md:join-item md:rounded-l-none md:rounded-r-field">
        <div className="w-14 h-4 skeleton" />
        <div className="size-4 skeleton" />
      </div>
    </div>
  );
}

function getDesktopShortcutModifier() {
  if (typeof navigator === "undefined") {
    return null;
  }

  const userAgentData = (
    navigator as Navigator & {
      userAgentData?: {
        mobile?: boolean;
        platform?: string;
      };
    }
  ).userAgentData;
  const platform = (
    userAgentData?.platform ??
    navigator.platform ??
    navigator.userAgent
  ).toLowerCase();

  if (userAgentData?.mobile) {
    return null;
  }

  if (/android|iphone|ipad|ipod|mobile|tablet/.test(navigator.userAgent.toLowerCase())) {
    return null;
  }

  return /mac|iphone|ipad|ipod/.test(platform) ? "⌘" : "Ctrl";
}
