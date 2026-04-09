"use client";

import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { getBreakingNews } from "@/app/_actions/getBreakingNews";
import type { BreakingNews } from "@/types/api";

const TOP_SCROLL_THRESHOLD = 300;

export function BreakingNewsBanner() {
  const [banner, setBanner] = useState<BreakingNews | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isAtPageTop, setIsAtPageTop] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadBanner() {
      try {
        const nextBanner = await getBreakingNews();

        if (isCancelled || !nextBanner) {
          return;
        }

        startTransition(() => {
          setBanner(nextBanner);
        });
      } catch {}
    }

    loadBanner();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!banner) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [banner]);

  useEffect(() => {
    function syncBannerPosition() {
      const nextIsAtPageTop = window.scrollY <= TOP_SCROLL_THRESHOLD;

      setIsAtPageTop((currentIsAtPageTop) =>
        currentIsAtPageTop === nextIsAtPageTop ? currentIsAtPageTop : nextIsAtPageTop,
      );
    }

    syncBannerPosition();
    window.addEventListener("scroll", syncBannerPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncBannerPosition);
    };
  }, []);

  if (!banner) {
    return null;
  }

  const shouldShowBanner = isVisible && isAtPageTop;
  const articleHref = `/articles/${encodeURIComponent(banner.articleId)}` as Route;

  const content = (
    <>
      <span className="badge badge-secondary badge-sm gap-1 px-2 py-3 uppercase font-bold">
        <TriangleAlert className="size-4" />
        {banner.urgent ? "Urgent" : "Breaking"}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{banner.headline}</span>
      <span className="hidden text-xs uppercase tracking-[0.2em] sm:inline">{banner.category}</span>
    </>
  );

  return (
    <div
      className={clsx(
        "absolute inset-x-0 top-full z-10 bg-primary text-primary-content motion-safe:transition-transform duration-300 ring-primary ring-offset-2 has-focus-visible:ring-2",
        shouldShowBanner
          ? "scale-y-100 translate-y-0"
          : "scale-y-0 -translate-y-1/2 pointer-events-none",
      )}
    >
      <div className="container">
        <aside aria-live="polite">
          <Link
            href={articleHref}
            className="tooltip tooltip-bottom flex min-h-12 items-center gap-3 py-2 focus:outline-none"
            data-tip="Read more"
            aria-label="Read more about this news"
          >
            {content}
          </Link>
        </aside>
      </div>
    </div>
  );
}
