import "server-only";

import type { Article } from "@/types/api";
import { Suspense } from "react";
import {
  PaywallSubscriptionControl,
  PaywallSubscriptionControlSkeleton,
} from "@/app/_components/SubscriptionControl";
import { ShieldAlert } from "lucide-react";

function getPaywallTeaser(article: Article) {
  return article.excerpt?.trim() || "Subscribe to continue reading this story.";
}

export function ArticlePaywall({ article }: { article: Article }) {
  const teaser = getPaywallTeaser(article);

  return (
    <section className="container py-10 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="prose prose-lg">
          <p>{teaser}</p>
        </div>
        <div role="alert" className="alert alert-warning alert-soft flex flex-col gap-6 p-6">
          <div className="flex flex-col items-center gap-2">
            <ShieldAlert aria-hidden="true" className="size-10 light:text-warning-content" />
            <h2 className="text-base font-semibold uppercase tracking-widest light:text-warning-content">
              Subscribers only
            </h2>
          </div>
          <p className="text-sm light:text-warning-content/80">
            Full article is available only for subscribed users
          </p>
          <Suspense fallback={<PaywallSubscriptionControlSkeleton />}>
            <PaywallSubscriptionControl />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
