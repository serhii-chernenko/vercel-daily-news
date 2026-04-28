"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { subscriptionCookieName } from "@/config/subscription";
import { getSubscriptionCookieOptions, isSubscriptionToken } from "@/server/subscriptionSession";
import {
  activateSubscription,
  createSubscription,
  deactivateSubscription,
} from "@/server/subscriptionApi";

async function getActiveSubscription(existingToken: string | undefined) {
  const existingSubscription = isSubscriptionToken(existingToken)
    ? await activateSubscription(existingToken)
    : null;

  if (existingSubscription?.status === "active") {
    return existingSubscription;
  }

  const createdSubscription = await createSubscription();

  if (createdSubscription.status === "active") {
    return createdSubscription;
  }

  const activatedSubscription = await activateSubscription(createdSubscription.token);

  if (activatedSubscription?.status === "active") {
    return activatedSubscription;
  }

  throw new Error("Unable to activate subscription.");
}

export async function activateSubscriptionAccess() {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(subscriptionCookieName)?.value;
  const activeSubscription = await getActiveSubscription(existingToken);

  cookieStore.set(subscriptionCookieName, activeSubscription.token, getSubscriptionCookieOptions());
  refresh();
}

export async function deactivateSubscriptionAccess() {
  const cookieStore = await cookies();
  const token = cookieStore.get(subscriptionCookieName)?.value;

  if (isSubscriptionToken(token)) {
    await deactivateSubscription(token);
  }

  cookieStore.set(subscriptionCookieName, "", {
    ...getSubscriptionCookieOptions(),
    maxAge: 0,
  });
  refresh();
}
