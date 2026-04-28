"use client";

import "client-only";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunMoon, Moon, Sun } from "lucide-react";
import clsx from "clsx";

const systemTheme = "system";
const lightTheme = "light";
const darkTheme = "dark";

export function ThemeToggle({ iconClassName }: { iconClassName?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ThemeToggleSkeleton />;
  }

  const selectedTheme = mounted ? theme : undefined;
  const nextTheme =
    selectedTheme === systemTheme
      ? lightTheme
      : selectedTheme === lightTheme
        ? darkTheme
        : systemTheme;

  const label = mounted ? `Switch from ${selectedTheme} to ${nextTheme} theme` : "Toggle theme";
  const Icon = selectedTheme === systemTheme ? SunMoon : selectedTheme === lightTheme ? Sun : Moon;

  return (
    <button
      type="button"
      className="tooltip tooltip-bottom btn btn-ghost btn-square btn-sm histlop max-md:before:hidden max-md:after:hidden"
      aria-label={label}
      data-tip={label}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon aria-hidden="true" className={clsx("icon", iconClassName)} />
      <span className="sr-only">{label}</span>
    </button>
  );
}

export function ThemeToggleSkeleton() {
  return (
    <span
      aria-hidden="true"
      className="block size-[calc(var(--size-field,.25rem)_*_8)] rounded-field skeleton"
    ></span>
  );
}
