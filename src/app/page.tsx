import "server-only";

import { Suspense } from "react";
import { Hero } from "@/app/components/Hero";
import { FeaturedArticles, FeaturedArticlesSkeleton } from "@/app/components/FeaturedArticles";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<FeaturedArticlesSkeleton />}>
        <FeaturedArticles />
      </Suspense>
    </>
  );
}
