"use client";

import { useState } from "react";

type Store = "google-play" | "app-store";

const results = [
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
  {
    name: "Trello",
    category: "Productivity",
    icon: "T",
  },
  {
    name: "Slack",
    category: "Communication",
    icon: "S",
  },
  {
    name: "Zoom",
    category: "Communication",
    icon: "Z",
  },
  {
    name: "Dropbox",
    category: "Storage",
    icon: "D",
  },
];

export default function UAppsSearchPanel() {
  const [store, setStore] =
    useState<Store>("google-play");

  const [query, setQuery] =
    useState("");

  return (
    <section
      id="uapps-search"
      className="uapps-search-panel"
    >
      <div className="uapps-search-header">
        <div>
          <span className="uapps-eyebrow">
            GLOBAL DISCOVERY
          </span>

          <h2>
            جستجوی نرم‌افزار
          </h2>

          <p>
            نرم‌افزار موردنظر خود را در منابع مختلف پیدا کنید.
          </p>
        </div>

        <div className="uapps-search-symbol">
          ⌕
        </div>
      </div>

      <div className="uapps-search-box">
        <span>⌕</span>

        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="نام نرم‌افزار، کاربرد یا دسته‌بندی..."
          type="search"
        />
      </div>

      <div className="uapps-store-switch">
        <button
          type="button"
          className={
            store === "google-play"
              ? "active"
              : ""
          }
          onClick={() =>
            setStore("google-play")
          }
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
          onClick={() =>
            setStore("app-store")
          }
        >
          <span>●</span>
          App Store
        </button>
      </div>

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

        <button
          type="button"
          className="uapps-view-all"
        >
          نمایش همه
          <span>←</span>
        </button>
      </div>

      <div className="uapps-search-results">
        {results.map((result) => (
          <article
            key={result.name}
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

            <button
              type="button"
              className="uapps-result-arrow"
              aria-label={`ادامه ${result.name}`}
            >
              ←
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}