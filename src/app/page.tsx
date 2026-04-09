import "server-only";

import { Hero } from "@/app/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="min-h-screen"></div>
    </>
  );
}
