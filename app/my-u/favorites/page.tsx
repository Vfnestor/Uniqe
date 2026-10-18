"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import FavoritesHero from "@/components/favorites/FavoritesHero";
import FavoritesSummary from "@/components/favorites/FavoritesSummary";
import FavoritesFilters from "@/components/favorites/FavoritesFilters";
import FavoritesList from "@/components/favorites/FavoritesList";
import FavoritesEmpty from "@/components/favorites/FavoritesEmpty";
import FavoritesCTA from "@/components/favorites/FavoritesCTA";

import {
  favoriteItems,
  type FavoriteItem,
} from "@/components/favorites/favorites";

import {
  createFavorite,
  deleteFavorite,
  getFavorites,
  type FavoriteRecord,
} from "@/lib/api/favorites";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] =
    useState<string[]>([]);

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [pendingIds, setPendingIds] =
    useState<string[]>([]);

  const [records, setRecords] =
    useState<FavoriteRecord[]>([]);

  useEffect(() => {
    let active = true;

    async function loadFavorites() {
      try {
        setLoading(true);
        setError(null);

        const result = await getFavorites();

        if (!active) {
          return;
        }

        setRecords(result);

        setFavoriteIds(
          result.map((favorite) => favorite.targetId),
        );
      } catch {
        if (active) {
          setError(
            "Unable to load favorites. Please sign in and try again.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadFavorites();

    return () => {
      active = false;
    };
  }, []);

  const savedItems = useMemo(() => {
    return records.map((record): FavoriteItem => {
      const existing = favoriteItems.find(
        (item) => item.id === record.targetId,
      );

      if (existing) {
        return {
          ...existing,
          title: record.title,
          description: record.description,
          category: record.category,
          href: record.href,
          icon: record.icon || existing.icon,
        };
      }

      const metadataKeywords =
        record.metadata?.keywords;

      const keywords = Array.isArray(metadataKeywords)
        ? metadataKeywords.filter(
            (keyword): keyword is string =>
              typeof keyword === "string",
          )
        : [];

      return {
        id: record.targetId,
        title: record.title,
        description: record.description,
        category: record.category,
        href: record.href,
        icon: record.icon || "◇",
        keywords,
      };
    });
  }, [records]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return savedItems;
    }

    return savedItems.filter(
      (item) => item.category === activeFilter,
    );
  }, [activeFilter, savedItems]);

  const toggleFavorite = useCallback(
    async (itemId: string) => {
      if (pendingIds.includes(itemId)) {
        return;
      }

      const existingRecord = records.find(
        (record) => record.targetId === itemId,
      );

      setPendingIds((current) => [
        ...current,
        itemId,
      ]);

      setError(null);

      try {
        if (existingRecord) {
          await deleteFavorite(itemId);

          setRecords((current) =>
            current.filter(
              (record) => record.targetId !== itemId,
            ),
          );

          setFavoriteIds((current) =>
            current.filter((id) => id !== itemId),
          );
        } else {
          const item = favoriteItems.find(
            (favorite) => favorite.id === itemId,
          );

          if (!item) {
            throw new Error(
              "Favorite item was not found.",
            );
          }

          const created = await createFavorite({
            targetId: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            href: item.href,
            icon: item.icon,
            metadata: {
              keywords: item.keywords,
            },
          });

          setRecords((current) => {
            const withoutDuplicate = current.filter(
              (record) =>
                record.targetId !== created.targetId,
            );

            return [
              created,
              ...withoutDuplicate,
            ];
          });

          setFavoriteIds((current) =>
            current.includes(created.targetId)
              ? current
              : [...current, created.targetId],
          );
        }
      } catch {
        setError(
          "The change could not be saved. Please try again.",
        );
      } finally {
        setPendingIds((current) =>
          current.filter((id) => id !== itemId),
        );
      }
    },
    [pendingIds, records],
  );

  return (
    <main className="favorites-page">
      <FavoritesHero />

      <FavoritesSummary
        total={savedItems.length}
        visible={filteredItems.length}
      />

      <section className="favorites-content section">
        <div className="container">
          <div className="favorites-content-header">
            <div>
              <span className="section-eyebrow">
                Bookmark System
              </span>

              <h2 className="favorites-content-title">
                Your collection
              </h2>
            </div>

            <FavoritesFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          {loading && (
            <p role="status">
              Loading your favorites...
            </p>
          )}

          {error && (
            <p role="alert">
              {error}
            </p>
          )}

          {!loading && (
            <>
              <FavoritesList
                items={filteredItems}
                favoriteIds={favoriteIds}
                onToggle={toggleFavorite}
              />

              {filteredItems.length === 0 && (
                <FavoritesEmpty
                  filter={activeFilter}
                />
              )}
            </>
          )}

          {pendingIds.length > 0 && (
            <p role="status">
              Saving changes...
            </p>
          )}
        </div>
      </section>

      <FavoritesCTA />
    </main>
  );
}