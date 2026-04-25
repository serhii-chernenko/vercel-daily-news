export interface BreakingNews {
  articleId: Article["id"];
  category: Article["category"];
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

export interface ApiError {
  code: string;
  details?: unknown;
  message: string;
}

export interface ArticleParagraphBlock {
  text: string;
  type: "paragraph";
}

export interface ArticleHeadingBlock {
  level: 2 | 3;
  text: string;
  type: "heading";
}

export interface ArticleBlockquoteBlock {
  text: string;
  type: "blockquote";
}

export interface ArticleUnorderedListBlock {
  items: string[];
  type: "unordered-list";
}

export interface ArticleOrderedListBlock {
  items: string[];
  type: "ordered-list";
}

export interface ArticleImageBlock {
  alt: string;
  caption?: string;
  src: string;
  type: "image";
}

export type ArticleContentBlock =
  | ArticleParagraphBlock
  | ArticleHeadingBlock
  | ArticleBlockquoteBlock
  | ArticleUnorderedListBlock
  | ArticleOrderedListBlock
  | ArticleImageBlock;

export interface ArticleAuthor {
  avatar?: string;
  name?: string;
}

export interface Article {
  author?: ArticleAuthor;
  category: string;
  content: ArticleContentBlock[];
  excerpt?: string;
  featured: boolean;
  id: string;
  image?: string;
  publishedAt: string;
  slug: string;
  tags?: string[];
  title: string;
}

export interface ArticlesPagination {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface ArticlesMeta {
  pagination?: ArticlesPagination;
}

export interface ArticlesResponse {
  data: Article[];
  meta?: ArticlesMeta;
  success: boolean;
}

export interface ArticleResponse {
  data: Article;
  success: true;
}

export interface ArticleErrorResponse {
  error: ApiError;
  success: false;
}

export type ArticleApiResponse = ArticleResponse | ArticleErrorResponse;

export interface Category {
  articleCount: number;
  name: string;
  slug: string;
}

export interface CategoriesResponse {
  data: Category[];
  success: boolean;
}
