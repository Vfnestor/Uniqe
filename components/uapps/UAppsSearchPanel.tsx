"use client";

import {
  useState,
} from "react";

import type {
  UApp,
} from "@/lib/uapps/types";

import {
  uappsDemoData,
} from "@/lib/uapps/demo-data";

import {
  userApps,
} from "@/lib/uapps/user-apps";

import {
  getFeaturedUniqeApps,
} from "@/lib/uapps/uniqe-apps";

type SearchScope =
  | "all"
  | "app-store";

type SearchResult = {
  id: string;
  name: string;
  category: string;
  icon: string;
  source: string;
  href?: string;
};

function normalizeLocalApps(): SearchResult[] {
  const uniqeApps =
    getFeaturedUniqeApps();

  const localUserApps =
    userApps.filter(
      (app) =>
        app.reviewStatus ===
          "approved" &&
        app.status !==
          "development",
    );

  return [
    ...uniqeApps,
    ...localUserApps,
    ...uappsDemoData,
  ].map((app) => ({
    id: app.id,
    name: app.name,
    category: app.category,
    icon: app.icon || "UA",
    source: app.sourceLabel,
    href: app.href,
  }));
}

export default function UAppsSearchPanel() {
  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    scope,
    setScope,
  ] = useState<SearchScope>("all");

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
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const localResults =
        normalizeLocalApps().filter(
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

      if (scope === "all") {
        try {
          const response =
            await fetch(
              `/api/uapps/app-store?q=${encodeURIComponent(
                value,
              )}`,
              {
                cache: "no-store",
              },
            );

          const data =
            await response.json();

          if (response.ok && data.success) {
            const appStoreResults =
              (data.results || []).map(
                (app: UApp) => ({
                  id: app.id,
                  name: app.name,
                  category:
                    app.category,
                  icon:
                    app.cover ||
                    app.icon ||
                    "AS",
                  source:
                    "App Store",
                  href:
                    app.href,
                }),
              );

            setResults([
              ...localResults,
              ...appStoreResults,
            ].slice(0, 20));

            return;
          }
        } catch {
          setResults(
            localResults.slice(0, 20),
          );
          return;
        }
      }

      if (scope === "app-store") {
        const response =
          await fetch(
            `/api/uapps/app-store?q=${encodeURIComponent(
              value,
            )}`,
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

        const appStoreResults =
          (data.results || []).map(
            (app: UApp) => ({
              id: app.id,
              name: app.name,
              category:
                app.category,
              icon:
                app.cover ||
                app.icon ||
                "AS",
              source:
                "App Store",
              href:
                app.href,
            }),
          );

        setResults(
          appStoreResults.slice(0, 20),
        );
      }
    } catch {
      setResults([]);
      setError(
        "دریافت نتایج جستجو انجام نشد.",
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
              جستجو در اکوسیستم Uniqe و App Store
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
                event.key ===
                "Enter"
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
              scope === "all"
                ? "active"
                : ""
            }
            onClick={() => {
              setScope("all");
              setResults([]);
              setError("");
            }}
          >
            <span>✦</span>
            همه
          </button>

          <button
            type="button"
            className={
              scope === "app-store"
                ? "active"
                : ""
            }
            onClick={() => {
              setScope("app-store");
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
              {scope === "all"
                ? "Uniqe + App Store"
                : "App Store"}
            </span>
          </div>

          <span className="uapps-search-count">
            {results.length} نتیجه
          </span>
        </div>

        {results.length > 0 ? (
          <div className="uapps-search-results">
            {results.map(
              (
                result,
              ) => (
                <a
                  key={result.id}
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
                      {" · "}
                      {result.source}
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
            برای شروع، نام یک نرم‌افزار یا دسته‌بندی را جستجو کنید.
          </div>
        )}
      </div>
    </section>
  );
}