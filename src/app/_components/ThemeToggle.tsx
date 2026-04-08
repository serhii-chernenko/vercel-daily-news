"use client";

import { SunMoon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const systemTheme = "system";
const lightTheme = "light";
const darkTheme = "dark";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedTheme = mounted ? theme : undefined;
  const nextTheme =
    selectedTheme === systemTheme
      ? lightTheme
      : selectedTheme === lightTheme
        ? darkTheme
        : systemTheme;

  const label = mounted ? `Switch to ${nextTheme} theme` : "Toggle theme";
  const Icon = selectedTheme === systemTheme ? SunMoon : selectedTheme === lightTheme ? Sun : Moon;

  return (
    <button
      type="button"
      className="tooltip tooltip-left btn btn-ghost btn-square btn-sm histlop"
      aria-label={label}
      data-tip={label}
      onClick={() => setTheme(nextTheme)}
    >
      <Icon className="icon" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
