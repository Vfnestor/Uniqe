"use client";

import {
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
  FAVORITES_STORAGE_KEY,
  favoriteItems,
} from "@/components/favorites/favorites";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] =
    useState<string[]>([]);

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    try {
      const stored =
        window.localStorage.getItem(
          FAVORITES_STORAGE_KEY
        );

      if (stored) {
        const parsed: unknown =
          JSON.parse(stored);

        if (Array.isArray(parsed)) {
          const validIds = parsed.filter(
            (id): id is string =>
              typeof id === "string" &&
              favoriteItems.some(
                (item) => item.id === id
              )
          );

          setFavoriteIds(validIds);
        }
      }
    } catch {
      setFavoriteIds([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds, hydrated]);

  const savedItems = useMemo(() => {
    return favoriteItems.filter((item) =>
      favoriteIds.includes(item.id)
    );
  }, [favoriteIds]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") {
      return savedItems;
    }

    return savedItems.filter(
      (item) => item.category === activeFilter
    );
  }, [activeFilter, savedItems]);

  const toggleFavorite = (itemId: string) => {
    setFavoriteIds((current) => {
      if (current.includes(itemId)) {
        return current.filter(
          (id) => id !== itemId
        );
      }

      return [...current, itemId];
    });
  };

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
        </div>
      </section>

      <FavoritesCTA />
    </main>
  );
}