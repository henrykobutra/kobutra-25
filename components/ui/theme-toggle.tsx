"use client";

import { useEffect, useRef, useState } from "react";
import { IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react";

const STORAGE_KEY = "theme";

type ThemePreference = "light" | "dark" | "system";

const preferenceOrder: ThemePreference[] = ["system", "light", "dark"];

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const resolvedTheme = preference === "system" ? getSystemTheme() : preference;
  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = resolvedTheme;
  root.dataset.theme = preference;
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("system");
  const preferenceRef = useRef<ThemePreference>("system");
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem(STORAGE_KEY);
    const isValidPreference =
      stored === "light" || stored === "dark" || stored === "system";
    const initialPreference: ThemePreference = isValidPreference
      ? (stored as ThemePreference)
      : "system";

    preferenceRef.current = initialPreference;
    setPreference(initialPreference);
    applyTheme(initialPreference);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (preferenceRef.current === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const activeLabel =
    preference === "dark" ? "Night" : preference === "light" ? "Light" : "System";
  const nextPreference =
    preferenceOrder[(preferenceOrder.indexOf(preference) + 1) % preferenceOrder.length];
  const nextLabel =
    nextPreference === "dark" ? "Night" : nextPreference === "light" ? "Light" : "System";
  const buttonLabel = `Switch to ${nextLabel.toLowerCase()} mode`;
  const Icon =
    preference === "dark"
      ? IconSun
      : preference === "light"
        ? IconMoon
        : IconDeviceLaptop;

  const toggleTheme = () => {
    const root = document.documentElement;
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
    root.classList.add("theme-transition");
    transitionTimerRef.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
      transitionTimerRef.current = null;
    }, 350);

    const nextPreference =
      preferenceOrder[(preferenceOrder.indexOf(preferenceRef.current) + 1) % preferenceOrder.length];
    localStorage.setItem(STORAGE_KEY, nextPreference);
    preferenceRef.current = nextPreference;
    setPreference(nextPreference);
    applyTheme(nextPreference);
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={buttonLabel}
        title={buttonLabel}
        className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-gray-900 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition hover:scale-[1.03] hover:bg-white/20 focus-visible:outline-none dark:border-white/10 dark:bg-black/40 dark:text-white"
      >
        <Icon size={16} className="transition-transform group-hover:-rotate-12" />
        <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-full border border-black/10 bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-800 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 dark:border-white/10 dark:bg-black/80 dark:text-white">
          {activeLabel}
        </span>
      </button>
    </div>
  );
}
