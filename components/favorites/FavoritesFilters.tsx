"use client";

import {
  favoriteFilters,
} from "./favorites";

type FavoritesFiltersProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function FavoritesFilters({
  activeFilter,
  onFilterChange,
}: FavoritesFiltersProps) {
  return (
    <div className="favorites-filters">
      {favoriteFilters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={`favorites-filter ${
            activeFilter === filter.id
              ? "is-active"
              : ""
          }`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}