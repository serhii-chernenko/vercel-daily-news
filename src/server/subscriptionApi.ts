import "server-only";

import type { Subscription, SubscriptionApiResponse } from "@/types/api";
import { getApiHeaders, getApiUrl } from "@/server/api";

export class SubscriptionApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "SubscriptionApiError";
  }
}

function getSubscriptionHeaders(token?: string) {
  return token
    ? {
        ...getApiHeaders(),
        "x-subscription-token": token,
      }
    : getApiHeaders();
}

async function readSubscriptionResponse(response: Response): Promise<Subscription> {
  const text = await response.text();

  if (!text) {
    throw new SubscriptionApiError("Subscription response was empty.", response.status);
  }

  let payload: SubscriptionApiResponse;

  try {
    payload = JSON.parse(text) as SubscriptionApiResponse;
  } catch {
    throw new SubscriptionApiError("Subscription response was not valid JSON.", response.status);
  }

  if (!payload.success) {
    throw new SubscriptionApiError(payload.error.message, response.status, payload.error.code);
  }

  return payload.data;
}

async function requestSubscription(
  input: RequestInfo | URL,
  init: RequestInit,
): Promise<Subscription> {
  const response = await fetch(input, init);

  if (!response.ok) {
    try {
      return await readSubscriptionResponse(response);
    } catch (error) {
      if (error instanceof SubscriptionApiError) {
        throw error;
      }

      throw new SubscriptionApiError(
        `Subscription request failed: ${response.status} ${response.statusText}`,
        response.status,
      );
    }
  }

  return readSubscriptionResponse(response);
}

export function isRecoverableSubscriptionApiError(error: unknown) {
  return error instanceof SubscriptionApiError && (error.status === 400 || error.status === 404);
}

export async function getSubscription(token: string): Promise<Subscription | null> {
  try {
    return await requestSubscription(getApiUrl("subscription"), {
      headers: getSubscriptionHeaders(token),
    });
  } catch (error) {
    if (isRecoverableSubscriptionApiError(error)) {
      return null;
    }

    throw error;
  }
}

export async function createSubscription(): Promise<Subscription> {
  return requestSubscription(getApiUrl("subscriptionCreate"), {
    headers: getSubscriptionHeaders(),
    method: "POST",
  });
}

export async function activateSubscription(token: string): Promise<Subscription | null> {
  try {
    return await requestSubscription(getApiUrl("subscription"), {
      headers: getSubscriptionHeaders(token),
      method: "POST",
    });
  } catch (error) {
    if (isRecoverableSubscriptionApiError(error)) {
      return null;
    }

    throw error;
  }
}

export async function deactivateSubscription(token: string): Promise<void> {
  const response = await fetch(getApiUrl("subscription"), {
    headers: getSubscriptionHeaders(token),
    method: "DELETE",
  });

  if (response.ok) {
    return;
  }

  try {
    await readSubscriptionResponse(response);
  } catch (error) {
    if (isRecoverableSubscriptionApiError(error)) {
      return;
    }

    throw error;
  }
}
