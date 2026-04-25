import { appConfig } from "@/config/app";

export interface SearchPageParams {
  category: string;
  page: number;
  search: string;
}

type RawSearchParams = Record<string, string | string[] | undefined>;

const { maxCategorySlugLength, maxSearchPage, maxSearchQueryLength } = appConfig.articles;
const categorySlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeBoundedText(value: string | undefined, maxLength: number) {
  return (value?.trim() ?? "").slice(0, maxLength);
}

function normalizeCategory(value: string | undefined) {
  const category = normalizeBoundedText(value, maxCategorySlugLength).toLowerCase();

  return category && categorySlugPattern.test(category) ? category : "";
}

export function normalizeSearchPageParams(searchParams: RawSearchParams): SearchPageParams {
  const category = normalizeCategory(getStringParam(searchParams.category));
  const rawPage = Number(getStringParam(searchParams.page));
  const search = normalizeBoundedText(
    getStringParam(searchParams.search) ?? getStringParam(searchParams.q),
    maxSearchQueryLength,
  );

  return {
    category,
    page: Number.isFinite(rawPage) ? Math.min(maxSearchPage, Math.max(1, Math.floor(rawPage))) : 1,
    search,
  };
}

export function hasSearchPageParams(params: SearchPageParams) {
  return Boolean(params.search || params.category);
}
