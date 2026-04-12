import "server-only";

import type { Article } from "@/types/api";
import Image from "next/image";
import { ArticleBackButton } from "@/app/articles/[param]/ArticleBackButton";
import { formatCategory } from "@/app/articles/[param]/articlePageData";
import { formatPublishedDate } from "@/utils/date";
import { Folder, CalendarDays, ImageOff, Tag, UserRound } from "lucide-react";

export function ArticleHeader({ article }: { article: Article }) {
  const authorName = article.author?.name?.trim() || "The Vercel Daily";

  return (
    <section className="bg-base-200">
      <div className="container flex flex-col gap-8 py-8 sm:py-10 lg:py-14">
        <ArticleBackButton />
        <div className="max-w-4xl space-y-6">
          <div className="space-y-4">
            <h1 className="max-w-5xl font-black tracking-tight text-balance text-4xl sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="max-w-3xl text-lg sm:text-xl leading-8 text-base-content/70">
                {article.excerpt}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary badge-outline badge-sm rounded-full">
              <UserRound className="size-3 shrink-0" />
              <span>{authorName}</span>
            </span>
            <time
              dateTime={article.publishedAt}
              className="badge badge-primary badge-outline badge-sm rounded-full"
            >
              <CalendarDays className="size-3 shrink-0" />
              <span>{formatPublishedDate(article.publishedAt)}</span>
            </time>
            <span className="badge badge-primary badge-outline badge-sm rounded-full">
              <Folder className="size-3 shrink-0" />
              {formatCategory(article.category)}
            </span>
            {article.tags?.map((tag) => (
              <span key={tag} className="badge badge-primary badge-outline badge-sm rounded-full">
                <Tag className="size-3 shrink-0" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
          {article.image ? (
            <div className="relative aspect-16/9 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                preload
                sizes="(min-width: 1536px) 1440px, (min-width: 1024px) calc(100vw - 4rem), 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-16/9 items-center justify-center gap-3 bg-base-300">
              <ImageOff className="size-12 opacity-50" />
              <span className="sr-only">Image coming soon</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ArticleHeaderSkeleton() {
  return (
    <section aria-hidden="true" className="bg-base-200">
      <div className="container flex flex-col gap-8 py-8 sm:py-10 lg:py-14">
        <div className="w-20 h-7 rounded-field skeleton" />
        <div className="max-w-4xl space-y-6">
          <div className="space-y-3">
            <div className="w-2/3 h-8 sm:h-12 md:h-14 rounded-field skeleton" />
            <div className="w-3/4 h-8 sm:h-12 md:h-14 rounded-field skeleton" />
            <div className="sm:hidden w-1/2 h-8 rounded-field skeleton" />
          </div>
          <div className="space-y-2">
            <div className="w-2/3 h-6 rounded-field skeleton" />
            <div className="w-3/4 h-6 rounded-field skeleton" />
            <div className="sm:hidden w-1/4 h-6 rounded-field skeleton" />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="w-24 h-5 rounded-full skeleton" />
            <div className="w-26 h-5 rounded-full skeleton" />
            <div className="w-32 h-5 rounded-full skeleton" />
            <div className="w-26 h-5 rounded-full skeleton" />
          </div>
        </div>
        <div className="aspect-16/9 w-full overflow-hidden rounded-box skeleton" />
      </div>
    </section>
  );
}
