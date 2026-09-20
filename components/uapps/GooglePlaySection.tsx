"use client";

import {
  useState,
} from "react";

import type {
  UApp,
} from "@/lib/uapps/types";

import UniversalAppCard from "./UniversalAppCard";

export default function GooglePlaySection() {
  const [
    query,
    setQuery,
  ] = useState("");

  const [
    apps,
    setApps,
  ] = useState<UApp[]>([]);

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

    try {
      const response =
        await fetch(
          `/api/uapps/google-play?q=${encodeURIComponent(value)}`,
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

      setApps(
        data.results || [],
      );
    } catch {
      setApps([]);
      setError(
        "دریافت نتایج Google Play انجام نشد.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="uapps-google-play-section">
      <div className="uapps-section-heading">
        <div>
          <span className="uapps-section-eyebrow">
            Google Play
          </span>

          <h2>
            جستجوی اپلیکیشن‌های اندروید
          </h2>

          <p>
            جستجوی مستقیم اپلیکیشن‌های موجود
            در Google Play.
          </p>
        </div>
      </div>

      <div className="uapps-google-play-search">
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
          placeholder="مثلاً WhatsApp، Telegram یا Canva"
          type="search"
        />

        <button
          type="button"
          onClick={search}
          disabled={loading}
        >
          {loading
            ? "در حال جستجو..."
            : "جستجو"}
        </button>
      </div>

      {error && (
        <div className="uapps-google-play-error">
          {error}
        </div>
      )}

      {apps.length > 0 && (
        <div className="uapps-google-play-grid">
          {apps.map((app) => (
            <UniversalAppCard
              key={app.id}
              app={app}
            />
          ))}
        </div>
      )}

      {!loading &&
        !error &&
        apps.length === 0 && (
          <div className="uapps-google-play-empty">
            نام یک اپلیکیشن را جستجو کنید.
          </div>
        )}
    </section>
  );
}