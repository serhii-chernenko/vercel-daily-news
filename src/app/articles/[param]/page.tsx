import "server-only";

import type { Metadata } from "next";
import { ArticlePageContent } from "@/app/articles/[param]/ArticlePageContent";
import { getArticleDescription, getCachedArticle } from "@/app/articles/[param]/articlePageData";
import { appConfig } from "@/config/app";
import { getFeaturedArticles } from "@/server/featuredArticlesApi";
import { getTrendingArticles } from "@/server/trendingArticlesApi";

// https://nextjs.im/docs/app/guides/instant-navigation/
export const unstable_instant = {
  prefetch: "static",
  samples: [
    {
      params: {
        param: "building-secure-ai-agents",
      },
    },
    {
      params: {
        param: "7n2g22iUu0N5xhrc7VVBSQ",
      },
    },
  ],
};

export type ArticlePageProps = PageProps<"/articles/[param]">;

export async function generateStaticParams() {
  const [featuredArticles, trendingArticles] = await Promise.all([
    getFeaturedArticles(appConfig.articles.featuredLimit),
    getTrendingArticles({ limit: appConfig.articles.trendingLimit }),
  ]);
  const articles = [...featuredArticles, ...trendingArticles];
  const uniqueSlugs = new Set<string>();

  return articles.flatMap((article) => {
    if (uniqueSlugs.has(article.slug)) {
      return [];
    }

    uniqueSlugs.add(article.slug);

    return {
      param: article.slug,
    };
  });
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { param } = await params;
  const article = await getCachedArticle(param);

  if (!article) {
    return {
      title: "Article not found | The Vercel Daily",
      robots: {
        follow: false,
        index: false,
      },
    };
  }

  const description = getArticleDescription(article);

  return {
    title: `${article.title} | The Vercel Daily`,
    description,
    alternates: {
      canonical: `/articles/${encodeURIComponent(article.slug)}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      publishedTime: article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
      tags: article.tags,
      images: article.image
        ? [
            {
              alt: article.title,
              url: article.image,
            },
          ]
        : undefined,
    },
    twitter: {
      card: article.image ? "summary_large_image" : "summary",
      title: article.title,
      description,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default function ArticlePage(props: ArticlePageProps) {
  return <ArticlePageContent {...props} />;
}
