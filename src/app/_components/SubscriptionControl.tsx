import "server-only";

import { getCurrentSubscription } from "@/server/subscriptionSession";
import {
  activateSubscriptionAccess,
  deactivateSubscriptionAccess,
} from "@/server/subscriptionActions";
import {
  SubscriptionActionForm,
  SubscriptionSubmitButton,
} from "@/app/_components/SubscriptionActionForm";

interface SubscriptionToggleProps {
  formClassName?: string;
  iconOnly?: boolean;
  iconClassName?: string;
  subscribeButtonClassName: string;
  subscribedButtonClassName: string;
}

async function SubscriptionToggle({
  formClassName,
  iconOnly = false,
  iconClassName,
  subscribeButtonClassName,
  subscribedButtonClassName,
}: SubscriptionToggleProps) {
  const subscription = await getCurrentSubscription();

  if (subscription.isSubscribed) {
    return (
      <SubscriptionActionForm
        action={deactivateSubscriptionAccess}
        className={formClassName}
        intent="unsubscribe"
      >
        <SubscriptionSubmitButton
          className={subscribedButtonClassName}
          iconClassName={iconClassName}
          iconOnly={iconOnly}
        />
      </SubscriptionActionForm>
    );
  }

  return (
    <SubscriptionActionForm
      action={activateSubscriptionAccess}
      className={formClassName}
      intent="subscribe"
    >
      <SubscriptionSubmitButton
        className={subscribeButtonClassName}
        iconClassName={iconClassName}
        iconOnly={iconOnly}
      />
    </SubscriptionActionForm>
  );
}

export async function SubscriptionControl() {
  return (
    <SubscriptionToggle
      formClassName="max-sm:w-full"
      subscribeButtonClassName="btn btn-primary btn-outline max-sm:btn-block"
      subscribedButtonClassName="btn btn-success max-sm:btn-block"
      iconClassName="size-4"
    />
  );
}

export function SubscriptionControlSkeleton() {
  return <span aria-hidden="true" className="block w-full sm:w-34 h-12 rounded-field skeleton" />;
}

export async function HeaderDesktopSubscriptionControl() {
  return (
    <SubscriptionToggle
      formClassName="p-0 bg-transparent"
      subscribeButtonClassName="btn btn-ghost btn-sm hitslop"
      subscribedButtonClassName="btn btn-success btn-sm hitslop"
      iconClassName="size-4"
    />
  );
}

export function HeaderDesktopSubscriptionControlSkeleton() {
  return (
    <span
      aria-hidden="true"
      className="block w-28 h-[calc(var(--size-field,.25rem)_*_8)] rounded-field skeleton"
    />
  );
}

export async function HeaderMobileSubscriptionControl() {
  return (
    <SubscriptionToggle
      iconOnly
      formClassName="p-0 bg-transparent"
      subscribeButtonClassName="btn btn-ghost btn-sm btn-square hitslop"
      subscribedButtonClassName="btn btn-success btn-sm btn-square hitslop"
    />
  );
}

export function HeaderMobileSubscriptionControlSkeleton() {
  return (
    <span
      aria-hidden="true"
      className="block size-[calc(var(--size-field,.25rem)_*_8)] rounded-field skeleton"
    />
  );
}

export async function PaywallSubscriptionControl() {
  return (
    <SubscriptionToggle
      formClassName="w-full sm:w-auto"
      subscribeButtonClassName="btn btn-warning max-sm:btn-block"
      subscribedButtonClassName="btn btn-success max-sm:btn-block"
      iconClassName="size-4"
    />
  );
}

export function PaywallSubscriptionControlSkeleton() {
  return <span aria-hidden="true" className="block w-full sm:w-34 h-12 rounded-field skeleton" />;
}
