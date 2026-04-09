export interface BreakingNews {
  articleId: string;
  category: string;
  headline: string;
  id: string;
  publishedAt: string;
  summary: string;
  urgent: boolean;
}

export interface BreakingNewsResponse {
  data: BreakingNews;
  success: boolean;
}
