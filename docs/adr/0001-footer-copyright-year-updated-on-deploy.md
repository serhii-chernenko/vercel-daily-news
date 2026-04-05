# 1. Footer copyright year updated on deploy

Date: 2026-04-05

## Status

Accepted

## Context

I want the footer year to stay simple.

I also want to keep the site static. In Next.js, adding request-time dynamic logic to shared layout code can make the layout, and the pages under it, dynamic. I don't want that for a small footer detail.

I could make the year update on the client, but that would add JS for something cosmetic.

## Decision

I will keep the footer server-rendered and let the year update on deploy.

## Consequences

The page stays static and the footer stays simple.

The year may be out of date for a short time after January 1 until the next deployment. I accept that tradeoff.
