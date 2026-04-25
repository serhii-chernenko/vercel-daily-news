import "server-only";

import { SearchControlsSkeleton } from "@/app/search/SearchControls";
import { SearchResultsSkeleton } from "@/app/search/SearchResults";

export default function Loading() {
  return (
    <main className="container py-10 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="w-full max-w-lg mx-auto flex flex-col gap-4 items-center">
          <div className="w-3/4 h-12 max-w-xl skeleton" />
          <div className="w-full h-5 max-w-2xl skeleton" />
        </div>
        <SearchControlsSkeleton />
        <SearchResultsSkeleton />
      </div>
    </main>
  );
}
