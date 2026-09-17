"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
  const {
    language,
    setLanguage,
  } = useLanguage();

  return (
    <div
      className="language-toggle"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        className={
          language === "fa"
            ? "language-option active"
            : "language-option"
        }
        onClick={() =>
          setLanguage("fa")
        }
        aria-pressed={
          language === "fa"
        }
      >
        فارسی
      </button>

      <button
        type="button"
        className={
          language === "en"
            ? "language-option active"
            : "language-option"
        }
        onClick={() =>
          setLanguage("en")
        }
        aria-pressed={
          language === "en"
        }
      >
        EN
      </button>
    </div>
  );
}