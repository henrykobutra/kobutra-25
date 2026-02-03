"use client";

import { useEffect, useRef, useState } from "react";
import { IconDeviceLaptop, IconMoon, IconSun } from "@tabler/icons-react";

const STORAGE_KEY = "theme";

type ThemePreference = "light" | "dark" | "system";

const preferenceOrder: ThemePreference[] = ["light", "dark", "system"];

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
        className="group inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/25 px-3 py-2 text-xs font-semibold tracking-wide text-gray-900 shadow-lg backdrop-blur-xl transition hover:scale-[1.02] hover:bg-white/40 focus-visible:outline-none dark:border-white/10 dark:bg-black/40 dark:text-white"
      >
        <Icon size={16} className="transition-transform group-hover:-rotate-12" />
        <span>{activeLabel}</span>
      </button>
    </div>
  );
}
