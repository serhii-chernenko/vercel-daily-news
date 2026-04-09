import "server-only";

const trailingSlashPattern = /\/+$/;

export const apiEndpoints = {
  breakingNews: "/breaking-news",
} as const;

type ApiEndpoint = keyof typeof apiEndpoints;

function getRequiredEnvVariable(
  name: "NEXT_VERCEL_NEWS_API_ENDPOINT" | "NEXT_VERCEL_BYPASS_TOKEN",
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

export function getApiBaseUrl() {
  return getRequiredEnvVariable("NEXT_VERCEL_NEWS_API_ENDPOINT").replace(trailingSlashPattern, "");
}

export function getApiUrl(endpoint: ApiEndpoint) {
  return `${getApiBaseUrl()}${apiEndpoints[endpoint]}`;
}

export function getApiHeaders() {
  return {
    "x-vercel-protection-bypass": getRequiredEnvVariable("NEXT_VERCEL_BYPASS_TOKEN"),
  };
}
