import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";

export function Hero() {
  return (
    <section className="hero bg-base-200 min-h-screen">
      <div className="hero-content container justify-start">
        <div className="sm:max-w-xl">
          <h2 className="mb-4 text-md font-bold uppercase text-base-content/50 tracking-widest">
            The Vercel Daily
          </h2>
          <h1 className="text-5xl font-bold">News and insights for modern web developers</h1>
          <p className="py-8">
            Changelogs, engineering deep-dives, customer stories, and community updates — all in one
            place.
          </p>
          <div className="flex max-sm:flex-col gap-4">
            <Link href="/" className="btn btn-primary">
              <span>Browse articles</span>
              <ArrowRight className="size-4" />
            </Link>
            <button type="button" className="btn btn-secondary btn-outline">
              <Rss className="size-4" />
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
