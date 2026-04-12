import "server-only";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Rss } from "lucide-react";

export function Hero() {
  return (
    <section className="hero bg-base-200 min-h-screen">
      <div className="hero-content container lg:justify-between flex-col lg:flex-row-reverse">
        <div className="relative mb-8">
          <Image
            src="/hero.png"
            alt=""
            width={600}
            height={600}
            preload
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 480px, (min-width: 768px) 420px, (min-width: 640px) 360px, 320px"
            className="h-auto w-80 sm:w-[360px] md:w-[420px] lg:w-[480px] xl:w-[600px] dark:invert light:grayscale-100"
          />
          <span aria-hidden="true" className="badge badge-xs absolute -bottom-2 right-0">
            Designed by{" "}
            <Link
              href="https://www.freepik.com/free-vector/business-teamwork-sketch-concept_9581242.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
              tabIndex={-1}
            >
              Freepik
            </Link>
          </span>
        </div>
        <div className="sm:max-w-xl">
          <h2 className="mb-4 text-md font-bold uppercase text-base-content/70 tracking-widest">
            The Vercel Daily
          </h2>
          <h1 className="text-5xl font-bold">News and insights for modern web developers</h1>
          <p className="py-8">
            Changelogs, engineering deep-dives, customer stories, and community updates — all in one
            place.
          </p>
          <div className="flex max-sm:flex-col gap-4">
            <Link href="/" className="group/cta btn btn-primary">
              <span>Browse articles</span>
              <ArrowRight className="cta-icon" />
            </Link>
            <button type="button" className="btn btn-primary btn-outline">
              <Rss className="size-4" />
              <span>Subscribe</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
