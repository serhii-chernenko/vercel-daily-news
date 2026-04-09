import type { NextConfig } from "next";

const nextConfig = {
  typedRoutes: true,
  images: {
    // https://nextjs.org/docs/app/api-reference/components/image#devicesizes
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2048, 3840],
    // https://nextjs.org/docs/app/api-reference/components/image#imagesizes
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 360, 384, 420, 480, 600],
  },
} satisfies NextConfig;

export default nextConfig;
