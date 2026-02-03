"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem(STORAGE_KEY);
    const hasStoredPreference = stored === "light" || stored === "dark";
    const initialTheme: Theme = hasStoredPreference
      ? (stored as Theme)
      : root.classList.contains("dark")
        ? "dark"
        : "light";

    setTheme(initialTheme);
    applyTheme(initialTheme);

    if (!hasStoredPreference) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (event: MediaQueryListEvent) => {
        const nextTheme: Theme = event.matches ? "dark" : "light";
        setTheme(nextTheme);
        applyTheme(nextTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const isDark = theme === "dark";
  const nextLabel = isDark ? "Light" : "Night";
  const buttonLabel = isDark ? "Switch to light mode" : "Switch to night mode";
  const Icon = isDark ? IconSun : IconMoon;

  const toggleTheme = () => {
    const nextTheme: Theme = isDark ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        type="button"
        onClick={toggleTheme}
        aria-pressed={isDark}
        aria-label={buttonLabel}
        title={buttonLabel}
        className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/25 px-3 py-2 text-xs font-semibold tracking-wide text-gray-900 shadow-lg backdrop-blur-xl transition hover:scale-[1.02] hover:bg-white/40 focus-visible:outline-none dark:border-white/10 dark:bg-black/40 dark:text-white"
      >
        <Icon size={16} className="transition-transform group-hover:-rotate-12" />
        <span>{nextLabel}</span>
      </button>
    </div>
  );
}
