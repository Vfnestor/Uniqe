"use client";

import {
  useState,
} from "react";

import type {
  UApp,
} from "@/lib/uapps/types";

type Store =
  | "google-play"
  | "app-store";

type SearchResult = {
  name: string;
  category: string;
  icon: string;
  href?: string;
};

const appStoreResults: SearchResult[] = [
  {
    name: "Notion",
    category: "Productivity",
    icon: "N",
  },
  {
    name: "Canva",
    category: "Design",
    icon: "C",
  },
  {
    name: "Todoist",
    category: "Productivity",
    icon: "✓",
  },
  {
    name: "Figma",
    category: "Design",
    icon: "F",
  },
  {
    name: "Spotify",
    category: "Music",
    icon: "S",
  },
  {
    name: "Duolingo",
    category: "Education",
    icon: "D",
  },
];

export default function UAppsSearchPanel() {
  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    store,
    setStore,
  ] = useState<Store>(
    "google-play",
  );

  const [
    query,
    setQuery,
  ] = useState("");

  const [
    results,
    setResults,
  ] = useState<SearchResult[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function search() {
    const value =
      query.trim();

    if (!value) {
      return;
    }

    setLoading(true);
    setError("");

    if (store === "app-store") {
      const filtered =
        appStoreResults.filter(
          (item) =>
            item.name
              .toLowerCase()
              .includes(
                value.toLowerCase(),
              ) ||
            item.category
              .toLowerCase()
              .includes(
                value.toLowerCase(),
              ),
        );

      setResults(filtered);
      setLoading(false);
      return;
    }

    try {
      const response =
        await fetch(
          `/api/uapps/google-play?q=${encodeURIComponent(value)}`,
          {
            cache: "no-store",
          },
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "خطا در دریافت نتایج",
        );
      }

      const mapped =
        (data.results || []).map(
          (app: UApp) => ({
            name: app.name,
            category:
              app.category,
            icon:
              app.icon || "GP",
            href:
              app.href,
          }),
        );

      setResults(mapped);
    } catch {
      setResults([]);
      setError(
        "دریافت نتایج Google Play انجام نشد.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="uapps-search"
      className={`uapps-search-panel ${
        open
          ? "is-open"
          : "is-closed"
      }`}
    >
      <button
        type="button"
        className="uapps-search-panel-header"
        onClick={() =>
          setOpen(
            (current) =>
              !current,
          )
        }
        aria-expanded={open}
      >
        <div className="uapps-search-panel-title">
          <span className="uapps-search-panel-icon">
            ⌕
          </span>

          <div>
            <span className="uapps-eyebrow">
              GLOBAL DISCOVERY
            </span>

            <h2>
              جستجوی نرم‌افزار
            </h2>

            <p>
              جستجو در فروشگاه‌های نرم‌افزاری
            </p>
          </div>
        </div>

        <span
          className={`uapps-search-panel-chevron ${
            open ? "open" : ""
          }`}
        >
          ↓
        </span>
      </button>

      <div className="uapps-search-panel-content">
        <div className="uapps-search-box">
          <span>⌕</span>

          <input
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value,
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                search();
              }
            }}
            placeholder="نام نرم‌افزار، کاربرد یا دسته‌بندی..."
            type="search"
          />

          <button
            type="button"
            onClick={search}
            disabled={loading}
          >
            {loading
              ? "..."
              : "جستجو"}
          </button>
        </div>

        <div className="uapps-store-switch">
          <button
            type="button"
            className={
              store === "google-play"
                ? "active"
                : ""
            }
            onClick={() => {
              setStore(
                "google-play",
              );
              setResults([]);
              setError("");
            }}
          >
            <span>▶</span>
            Google Play
          </button>

          <button
            type="button"
            className={
              store === "app-store"
                ? "active"
                : ""
            }
            onClick={() => {
              setStore(
                "app-store",
              );
              setResults([]);
              setError("");
            }}
          >
            <span>●</span>
            App Store
          </button>
        </div>

        {error && (
          <div className="uapps-search-error">
            {error}
          </div>
        )}

        <div className="uapps-search-results-header">
          <div>
            <strong>
              نتایج جستجو
            </strong>

            <span>
              {store === "google-play"
                ? "Google Play"
                : "App Store"}
            </span>
          </div>

          <span className="uapps-search-count">
            {results.length} نتیجه
          </span>
        </div>

        {results.length > 0 ? (
          <div className="uapps-search-results">
            {results
              .slice(0, 10)
              .map(
                (
                  result,
                  index,
                ) => (
                  <a
                    key={`${result.name}-${index}`}
                    href={
                      result.href ||
                      "#"
                    }
                    target={
                      result.href
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      result.href
                        ? "noreferrer"
                        : undefined
                    }
                    className="uapps-search-result"
                  >
                    <div className="uapps-result-icon">
                      {result.icon}
                    </div>

                    <div className="uapps-result-info">
                      <strong>
                        {result.name}
                      </strong>

                      <span>
                        {result.category}
                      </span>
                    </div>

                    <span className="uapps-result-arrow">
                      ←
                    </span>
                  </a>
                ),
              )}
          </div>
        ) : (
          <div className="uapps-search-empty">
            نام یک نرم‌افزار را جستجو کنید.
          </div>
        )}
      </div>
    </section>
  );
}