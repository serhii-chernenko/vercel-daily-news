interface AppConfig {
  articles: {
    maxCategorySlugLength: number;
    maxArticleLimit: number;
    maxSearchPage: number;
    maxSearchQueryLength: number;
    searchPerPageLimit: number;
    featuredLimit: number;
    trendingLimit: number;
  };
  searchTypeDebounce: number;
}

export const appConfig = {
  articles: {
    maxCategorySlugLength: 80,
    maxArticleLimit: 100,
    maxSearchPage: 100,
    maxSearchQueryLength: 120,
    searchPerPageLimit: 6, // requested 5 but 6 is better here for current grid
    featuredLimit: 10,
    trendingLimit: 4,
  },
  searchTypeDebounce: 300,
} as const satisfies AppConfig;
