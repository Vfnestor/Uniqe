"use client";

import { useTheme } from "./ThemeProvider";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

export default function ThemeToggle() {
  const {
    theme,
    setTheme,
  } = useTheme();

  const { t } =
    useLanguage();

  const isDark =
    theme === "dark";

  return (
    <button
      type="button"
      className="global-theme-toggle"
      onClick={() =>
        setTheme(
          isDark
            ? "light"
            : "dark",
        )
      }
      aria-label={
        isDark
          ? t.theme.light
          : t.theme.dark
      }
      title={
        isDark
          ? t.theme.light
          : t.theme.dark
      }
    >
      <span
        className="global-theme-icon"
        aria-hidden="true"
      >
        {isDark ? "☀" : "☾"}
      </span>

      <span className="global-theme-label">
        {isDark
          ? t.theme.light
          : t.theme.dark}
      </span>
    </button>
  );
}