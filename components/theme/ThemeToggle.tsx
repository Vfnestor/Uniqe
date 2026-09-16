"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } =
    useTheme();

  return (
    <div
      className="theme-toggle"
      role="group"
      aria-label="Theme selection"
    >
      <button
        type="button"
        className={
          theme === "dark"
            ? "theme-option active"
            : "theme-option"
        }
        onClick={() =>
          setTheme("dark")
        }
        aria-pressed={
          theme === "dark"
        }
      >
        Dark
      </button>

      <button
        type="button"
        className={
          theme === "light"
            ? "theme-option active"
            : "theme-option"
        }
        onClick={() =>
          setTheme("light")
        }
        aria-pressed={
          theme === "light"
        }
      >
        Light
      </button>

      <button
        type="button"
        className={
          theme === "system"
            ? "theme-option active"
            : "theme-option"
        }
        onClick={() =>
          setTheme("system")
        }
        aria-pressed={
          theme === "system"
        }
      >
        System
      </button>
    </div>
  );
}