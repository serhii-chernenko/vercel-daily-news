import "server-only";

import type { Article } from "@/types/api";
import { ArticleBody, ArticleBodySkeleton } from "@/app/articles/[param]/ArticleBody";
import { ArticlePaywall } from "@/app/articles/[param]/ArticlePaywall";
import { getCurrentSubscription } from "@/server/subscriptionSession";

export async function ArticleSubscriptionGate({ article }: { article: Article }) {
  const subscription = await getCurrentSubscription(true);

  if (subscription.isSubscribed) {
    return <ArticleBody article={article} />;
  }

  return <ArticlePaywall article={article} />;
}

export function ArticleSubscriptionGateSkeleton() {
  return <ArticleBodySkeleton />;
}
