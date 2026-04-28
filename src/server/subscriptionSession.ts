import "server-only";

import type { Subscription } from "@/types/api";
import { cookies, headers } from "next/headers";
import {
  subscriptionCookieName,
  subscriptionRequestHintHeader,
  subscriptionRequestHints,
} from "@/config/subscription";
import { getSubscription } from "@/server/subscriptionApi";

const subscriptionTokenPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface SubscriptionSnapshot {
  isSubscribed: boolean;
  status: Subscription["status"] | "none";
  subscribedAt: string | null;
  token: string | null;
}

export function isSubscriptionToken(value: string | undefined): value is string {
  return Boolean(value && subscriptionTokenPattern.test(value));
}

export function getSubscriptionCookieOptions() {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  } as const;
}

function inactiveSubscriptionSnapshot(token: string | null = null): SubscriptionSnapshot {
  return {
    isSubscribed: false,
    status: token ? "inactive" : "none",
    subscribedAt: null,
    token,
  };
}

function toSubscriptionSnapshot(subscription: Subscription | null): SubscriptionSnapshot {
  if (!subscription) {
    return inactiveSubscriptionSnapshot();
  }

  return {
    isSubscribed: subscription.status === "active",
    status: subscription.status,
    subscribedAt: subscription.subscribedAt,
    token: subscription.token,
  };
}

export async function getCurrentSubscription(
  useRequestHint = false,
): Promise<SubscriptionSnapshot> {
  const token = (await cookies()).get(subscriptionCookieName)?.value;

  if (isSubscriptionToken(token)) {
    const subscription = await getSubscription(token);

    return toSubscriptionSnapshot(subscription);
  }

  if (useRequestHint) {
    const requestHeaders = await headers();
    const hint = requestHeaders.get(subscriptionRequestHintHeader);

    if (hint === subscriptionRequestHints.anonymous) {
      return inactiveSubscriptionSnapshot();
    }
  }

  return inactiveSubscriptionSnapshot();
}
