"use client";

import "client-only";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function ArticleBackButton() {
  const router = useRouter();

  function handleClick() {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group/cta btn btn-ghost btn-xs w-fit hitslop"
    >
      <ArrowLeft className="cta-icon-left" />
      <span>Go back</span>
    </button>
  );
}
