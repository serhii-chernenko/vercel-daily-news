"use client";

import "client-only";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useSyncExternalStore } from "react";
import { useFormStatus } from "react-dom";
import { CircleCheck, Rss } from "lucide-react";
import clsx from "clsx";

type SubscriptionAction = (formData: FormData) => Promise<void> | void;
export type SubscriptionIntent = "subscribe" | "unsubscribe";

interface SubscriptionMutationSnapshot {
  intent: SubscriptionIntent | null;
  pending: boolean;
}

interface SubscriptionActionFormProps {
  action: SubscriptionAction;
  children: ReactNode;
  className?: string;
  intent: SubscriptionIntent;
}

type SubscriptionSubmitButtonProps = Omit<
  React.ComponentProps<"button">,
  "aria-label" | "children" | "type"
> & {
  className?: string;
  iconOnly?: boolean;
  iconClassName?: string;
};

const SUBSCRIPTION_SETTLE_MS = 2000;
const SubscriptionIntentContext = createContext<SubscriptionIntent>("subscribe");
const SUBSCRIPTION_BUTTON_COPY = {
  subscribe: {
    ariaLabel: "Subscribe to Vercel Daily",
    label: "Subscribe",
    pendingLabel: "Subscribing",
    icon: Rss,
  },
  unsubscribe: {
    ariaLabel: "Unsubscribe from Vercel Daily",
    label: "Subscribed",
    pendingLabel: "Unsubscribing",
    icon: CircleCheck,
  },
} satisfies Record<
  SubscriptionIntent,
  {
    ariaLabel: string;
    icon: LucideIcon;
    label: string;
    pendingLabel: string;
  }
>;
const pendingListeners = new Set<() => void>();
let actionPendingCount = 0;
let formPendingCount = 0;
let settleTimeout: ReturnType<typeof setTimeout> | undefined;
const idleMutationSnapshot: SubscriptionMutationSnapshot = {
  intent: null,
  pending: false,
};
let mutationSnapshot = idleMutationSnapshot;

function emitPendingChange() {
  for (const listener of pendingListeners) {
    listener();
  }
}

function subscribeToPendingChanges(listener: () => void) {
  pendingListeners.add(listener);

  return () => {
    pendingListeners.delete(listener);
  };
}

function getMutationSnapshot() {
  return mutationSnapshot;
}

function getServerMutationSnapshot(): SubscriptionMutationSnapshot {
  return idleMutationSnapshot;
}

function setMutationSnapshot(nextSnapshot: SubscriptionMutationSnapshot) {
  mutationSnapshot = nextSnapshot;
  emitPendingChange();
}

function setPendingMutation(intent: SubscriptionIntent | null = mutationSnapshot.intent) {
  setMutationSnapshot({
    intent,
    pending: true,
  });
}

function hasActivePendingWork() {
  return actionPendingCount > 0 || formPendingCount > 0;
}

function settleSubscriptionPending() {
  if (hasActivePendingWork()) {
    setPendingMutation();

    return;
  }

  setPendingMutation();

  settleTimeout = setTimeout(() => {
    settleTimeout = undefined;
    setMutationSnapshot(idleMutationSnapshot);
  }, SUBSCRIPTION_SETTLE_MS);
}

function startSubscriptionPending() {
  if (settleTimeout) {
    clearTimeout(settleTimeout);
    settleTimeout = undefined;
  }
}

function startSubscriptionActionPending(intent: SubscriptionIntent) {
  startSubscriptionPending();
  actionPendingCount += 1;
  setPendingMutation(intent);
}

function stopSubscriptionActionPending() {
  actionPendingCount = Math.max(0, actionPendingCount - 1);
  settleSubscriptionPending();
}

function startSubscriptionFormPending(intent: SubscriptionIntent) {
  startSubscriptionPending();
  formPendingCount += 1;
  setPendingMutation(intent);
}

function stopSubscriptionFormPending() {
  formPendingCount = Math.max(0, formPendingCount - 1);
  settleSubscriptionPending();
}

function useSyncFormPending(intent: SubscriptionIntent, formPending: boolean) {
  const reportedFormPending = useRef(false);

  useEffect(() => {
    if (formPending && !reportedFormPending.current) {
      reportedFormPending.current = true;
      startSubscriptionFormPending(intent);
    }

    if (!formPending && reportedFormPending.current) {
      reportedFormPending.current = false;
      stopSubscriptionFormPending();
    }
  }, [formPending, intent]);

  useEffect(() => {
    return () => {
      if (reportedFormPending.current) {
        reportedFormPending.current = false;
        stopSubscriptionFormPending();
      }
    };
  }, []);
}

function useSubscriptionMutation() {
  return useSyncExternalStore(
    subscribeToPendingChanges,
    getMutationSnapshot,
    getServerMutationSnapshot,
  );
}

export function SubscriptionActionForm({
  action,
  children,
  className,
  intent,
}: SubscriptionActionFormProps) {
  async function runAction(formData: FormData) {
    startSubscriptionActionPending(intent);

    try {
      await action(formData);
    } finally {
      stopSubscriptionActionPending();
    }
  }

  return (
    <SubscriptionIntentContext.Provider value={intent}>
      <form action={runAction} className={className}>
        {children}
      </form>
    </SubscriptionIntentContext.Provider>
  );
}

export function SubscriptionSubmitButton({
  className,
  disabled,
  iconOnly = false,
  iconClassName = "",
  ...props
}: SubscriptionSubmitButtonProps) {
  const intent = useContext(SubscriptionIntentContext);
  const { pending: formPending } = useFormStatus();

  useSyncFormPending(intent, formPending);

  const mutation = useSubscriptionMutation();
  const isPending = formPending || mutation.pending;
  const buttonCopy = SUBSCRIPTION_BUTTON_COPY[intent];
  const pendingCopy = mutation.intent ? SUBSCRIPTION_BUTTON_COPY[mutation.intent] : buttonCopy;
  const label = isPending ? pendingCopy.pendingLabel : buttonCopy.label;
  const Icon = buttonCopy.icon;

  return (
    <button
      type="submit"
      aria-busy={isPending}
      aria-label={buttonCopy.ariaLabel}
      className={className}
      disabled={disabled || isPending}
      {...props}
    >
      {isPending ? (
        <span aria-hidden="true" className="loading loading-spinner loading-xs" />
      ) : (
        <Icon aria-hidden="true" className={clsx("icon", iconClassName)} />
      )}
      <span className={clsx(iconOnly && "sr-only")}>{label}</span>
    </button>
  );
}
