import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  subscriptionCookieName,
  subscriptionRequestHintHeader,
  subscriptionRequestHints,
} from "@/config/subscription";

export function proxy(request: NextRequest) {
  const subscriptionToken = request.cookies.get(subscriptionCookieName)?.value;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(
    subscriptionRequestHintHeader,
    subscriptionToken ? subscriptionRequestHints.candidate : subscriptionRequestHints.anonymous,
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/articles/:path*",
};
