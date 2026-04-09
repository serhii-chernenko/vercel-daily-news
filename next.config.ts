import type { NextConfig } from "next";

const year = 60 * 60 * 24 * 365; // 1 year

const nextConfig = {
  typedRoutes: true,
  cacheComponents: true,
  cacheLife: {
    years: {
      stale: year,
      revalidate: year,
      expire: year,
    },
  },
  images: {
    // https://nextjs.org/docs/app/api-reference/components/image#devicesizes
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2048, 3840],
    // https://nextjs.org/docs/app/api-reference/components/image#imagesizes
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 360, 384, 420, 480, 600],
  },
} satisfies NextConfig;

export default nextConfig;
