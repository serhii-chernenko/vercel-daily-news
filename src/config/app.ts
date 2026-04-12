interface AppConfig {
  articles: {
    featuredLimit: number;
    trendingLimit: number;
  };
}

export const appConfig = {
  articles: {
    featuredLimit: 10,
    trendingLimit: 4,
  },
} as const satisfies AppConfig;
