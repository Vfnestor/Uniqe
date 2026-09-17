"use client";

import Link from "next/link";

import FavoriteButton from "./FavoriteButton";

import type {
  FavoriteItem,
} from "./favorites";

type FavoritesListProps = {
  items: FavoriteItem[];
  favoriteIds: string[];
  onToggle: (itemId: string) => void;
};

export default function FavoritesList({
  items,
  favoriteIds,
  onToggle,
}: FavoritesListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="favorites-list">
      {items.map((item) => {
        const active = favoriteIds.includes(item.id);

        return (
          <article
            key={item.id}
            className="favorite-card surface"
          >
            <div className="favorite-card-icon">
              {item.icon}
            </div>

            <div className="favorite-card-content">
              <div className="favorite-card-category">
                {item.category}
              </div>

              <h3 className="favorite-card-title">
                {item.title}
              </h3>

              <p className="favorite-card-description">
                {item.description}
              </p>

              <div className="favorite-card-keywords">
                {item.keywords.slice(0, 3).map((keyword) => (
                  <span key={keyword}>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="favorite-card-actions">
              <FavoriteButton
                itemId={item.id}
                active={active}
                onToggle={onToggle}
              />

              <Link
                href={item.href}
                className="favorite-open-button"
                aria-label={`Open ${item.title}`}
              >
                ↗
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}