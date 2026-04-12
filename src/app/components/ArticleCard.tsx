import "server-only";

import type { Route } from "next";
import type { Article } from "@/types/api";
import Image from "next/image";
import Link from "next/link";
import { formatPublishedDate } from "@/utils/date";
import { ArrowRight, ImageOff } from "lucide-react";
import { clsx } from "clsx";

function getArticleHref(slug: string): Route {
  return `/articles/${encodeURIComponent(slug)}` as Route;
}

const carouselItemBaseClassName =
  "carousel-item my-4 mb-10 w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 xl:w-[calc(25%-(var(--spacing)*5))] ml-4 scroll-ml-4 last:mr-4 last:scroll-mr-4";

export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  const href = getArticleHref(article.slug);
  const titleId = `article-card-title-${article.id}`;

  return (
    <article className={clsx(carouselItemBaseClassName, className)}>
      <Link
        href={href}
        aria-labelledby={titleId}
        className="group card flex size-full overflow-hidden bg-base-100 no-underline shadow-sm ring-1 ring-base-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100 focus-visible:motion-safe:shadow-xl focus-visible:motion-safe:-translate-y-1"
      >
        <figure className="relative aspect-video bg-base-300">
          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              loading="lazy"
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover motion-safe:transition-transform duration-300 group-hover:motion-safe:scale-102 group-focus-within:motion-safe:scale-102"
            />
          ) : (
            <div className="flex items-center justify-center size-full">
              <ImageOff className="size-12 opacity-50" />
              <span className="sr-only">Image coming soon</span>
            </div>
          )}
        </figure>
        <div className="card-body gap-4 grow">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-base-content/60">
            <span className="font-bold tracking-widest">{article.category}</span>
            <span>&middot;</span>
            <time dateTime={article.publishedAt}>{formatPublishedDate(article.publishedAt)}</time>
          </div>
          <h2 id={titleId} className="card-title text-2xl leading-tight">
            {article.title}
          </h2>
          {article.excerpt && <p className="text-sm text-base-content/70">{article.excerpt}</p>}
          <div className="card-actions justify-end">
            <span className="group/cta btn btn-primary btn-sm">
              Read article
              <ArrowRight className="cta-icon group-focus-visible:motion-safe:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ArticleCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "card size-full overflow-hidden bg-base-100 shadow-sm ring-1 ring-base-300",
        carouselItemBaseClassName,
        className,
      )}
    >
      <div className="aspect-video rounded-box skeleton" />
      <div className="card-body gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-20 skeleton" />
          <div className="size-1 skeleton" />
          <div className="h-3 w-32 skeleton" />
        </div>
        <div className="space-y-2">
          <div className="h-7 w-full skeleton" />
          <div className="h-7 w-4/5 skeleton" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full skeleton" />
          <div className="h-4 w-full skeleton" />
          <div className="h-4 w-3/4 skeleton" />
        </div>
        <div className="card-actions justify-end">
          <div className="h-8 w-28 rounded-field skeleton" />
        </div>
      </div>
    </div>
  );
}
