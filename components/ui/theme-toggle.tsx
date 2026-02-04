"use client";

import { useEffect, useRef, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";

const STORAGE_KEY = "theme";

type ThemePreference = "light" | "dark";

const preferenceOrder: ThemePreference[] = ["light", "dark"];

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  root.classList.toggle("dark", preference === "dark");
  root.style.colorScheme = preference;
  root.dataset.theme = preference;
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference>("light");
  const preferenceRef = useRef<ThemePreference>("light");
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem(STORAGE_KEY);
    const isValidPreference = stored === "light" || stored === "dark";
    const initialPreference: ThemePreference = isValidPreference
      ? (stored as ThemePreference)
      : "light";
    if (!isValidPreference) {
      localStorage.setItem(STORAGE_KEY, initialPreference);
    }

    preferenceRef.current = initialPreference;
    setPreference(initialPreference);
    applyTheme(initialPreference);
  }, []);

  const activeLabel = preference === "dark" ? "Night" : "Light";
  const nextPreference =
    preferenceOrder[(preferenceOrder.indexOf(preference) + 1) % preferenceOrder.length];
  const nextLabel = nextPreference === "dark" ? "Night" : "Light";
  const buttonLabel = `Switch to ${nextLabel.toLowerCase()} mode`;
  const Icon = preference === "dark" ? IconSun : IconMoon;

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
