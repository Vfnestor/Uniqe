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
  | "app-store"
  | "google-play";

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

function isImageUrl(
  value: string,
): boolean {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://")
  );
}

async function searchAppStore(
  query: string,
): Promise<SearchResult[]> {
  try {
    const response =
      await fetch(
        `/api/uapps/app-store?q=${encodeURIComponent(
          query,
        )}`,
        {
          cache: "no-store",
        },
      );

    if (!response.ok) {
      return [];
    }

    const data =
      await response.json();

    if (
      !data.success ||
      !Array.isArray(
        data.results,
      )
    ) {
      return [];
    }

    return data.results.map(
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
  } catch {
    return [];
  }
}

async function searchGooglePlay(
  query: string,
): Promise<SearchResult[]> {
  try {
    const response =
      await fetch(
        `/api/uapps/google-play?q=${encodeURIComponent(
          query,
        )}`,
        {
          cache: "no-store",
        },
      );

    if (!response.ok) {
      return [];
    }

    const data =
      await response.json();

    if (
      !data.success ||
      !Array.isArray(
        data.results,
      )
    ) {
      return [];
    }

    return data.results.map(
      (app: UApp) => ({
        id: app.id,
        name: app.name,
        category:
          app.category,
        icon:
          app.cover ||
          app.icon ||
          "GP",
        source:
          "Google Play",
        href:
          app.href,
      }),
    );
  } catch {
    return [];
  }
}

export default function UAppsSearchPanel() {
  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    scope,
    setScope,
  ] = useState<SearchScope>(
    "app-store",
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

  async function search() {
    const value =
      query.trim();

    if (!value) {
      setResults([]);
      return;
    }

    setLoading(true);

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

      if (
        scope === "app-store"
      ) {
        const appStoreResults =
          await searchAppStore(
            value,
          );

        setResults(
          appStoreResults.slice(
            0,
            20,
          ),
        );

        return;
      }

      if (
        scope === "google-play"
      ) {
        const googlePlayResults =
          await searchGooglePlay(
            value,
          );

        setResults(
          googlePlayResults.slice(
            0,
            20,
          ),
        );

        return;
      }

      const [
        appStoreResults,
        googlePlayResults,
      ] = await Promise.all([
        searchAppStore(
          value,
        ),
        searchGooglePlay(
          value,
        ),
      ]);

      setResults(
        [
          ...localResults,
          ...appStoreResults,
          ...googlePlayResults,
        ].slice(0, 30),
      );
    } finally {
      setLoading(false);
    }
  }

  function changeScope(
    nextScope: SearchScope,
  ) {
    setScope(nextScope);
    setResults([]);
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
              جستجو در اکوسیستم Uniqe و فروشگاه‌های خارجی
            </p>
          </div>
        </div>

        <span
          className={`uapps-search-panel-chevron ${
            open
              ? "open"
              : ""
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
            onChange={(
              event,
            ) =>
              setQuery(
                event.target
                  .value,
              )
            }
            onKeyDown={(
              event,
            ) => {
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
            onClick={
              search
            }
            disabled={
              loading
            }
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
              scope ===
              "app-store"
                ? "active"
                : ""
            }
            onClick={() =>
              changeScope(
                "app-store",
              )
            }
          >
            <span>●</span>
            App Store
          </button>

          <button
            type="button"
            className={
              scope ===
              "google-play"
                ? "active"
                : ""
            }
            onClick={() =>
              changeScope(
                "google-play",
              )
            }
          >
            <span>▶</span>
            Google Play
          </button>

          <button
            type="button"
            className={
              scope === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              changeScope(
                "all",
              )
            }
          >
            <span>✦</span>
            همه
          </button>
        </div>

        <div className="uapps-search-results-header">
          <div>
            <strong>
              نتایج جستجو
            </strong>

            <span>
              {scope ===
                "app-store" &&
                "App Store"}

              {scope ===
                "google-play" &&
                "Google Play"}

              {scope ===
                "all" &&
                "Uniqe + App Store + Google Play"}
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
                  key={
                    result.id
                  }
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
                    {isImageUrl(
                      result.icon,
                    ) ? (
                      <img
                        src={
                          result.icon
                        }
                        alt={
                          result.name
                        }
                        loading="lazy"
                      />
                    ) : (
                      result.icon
                    )}
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