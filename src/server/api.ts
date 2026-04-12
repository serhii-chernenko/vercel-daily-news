import "server-only";

const trailingSlashPattern = /\/+$/;

export const apiEndpoints = {
  articles: "/articles",
  breakingNews: "/breaking-news",
  trendingArticles: "/articles/trending",
} as const;

type ApiEndpoint = keyof typeof apiEndpoints;

function getRequiredEnvVariable(name: "NEWS_API_ENDPOINT" | "BYPASS_TOKEN") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export function getApiBaseUrl() {
  return getRequiredEnvVariable("NEWS_API_ENDPOINT").replace(trailingSlashPattern, "");
}

export function getApiUrl(endpoint: ApiEndpoint) {
  return `${getApiBaseUrl()}${apiEndpoints[endpoint]}`;
}

export function getApiHeaders() {
  return {
    "x-vercel-protection-bypass": getRequiredEnvVariable("BYPASS_TOKEN"),
  };
}
