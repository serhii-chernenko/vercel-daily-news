# 2. Images breakpoints aligned with Tailwind

Date: 2026-04-05

## Status

Accepted

## Context

By default next/image has [device size](https://nextjs.org/docs/app/api-reference/components/image#devicesizes) and [image size](https://nextjs.org/docs/app/api-reference/components/image#imagesizes) breakpoints in [`next.config.ts`](../../next.config.ts):

```ts
module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
};
```

But the values don't match [Tailwind breakpoints](https://tailwindcss.com/docs/responsive-design).

## Decision

`images.deviceSizes` was adjusted to follow the same major viewport breakpoints already used in the UI, and `images.imageSizes` was extended to cover fixed-width responsive assets such as the hero illustration:

```ts
module.exports = {
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 360, 384, 420, 480, 600],
  },
};
```

## Consequences

Responsive image widths now line up with the breakpoints already used in the UI, which makes sizing behavior easier to reason about and maintain.

The tradeoff is that we move away from Next.js defaults, so anyone changing breakpoints in the future should remember to keep both `images.deviceSizes` and `images.imageSizes` in sync as well.
