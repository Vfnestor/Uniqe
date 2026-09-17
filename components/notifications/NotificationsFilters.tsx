"use client";

import {
  notificationFilters,
} from "./notifications";

type NotificationsFiltersProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function NotificationsFilters({
  activeFilter,
  onFilterChange,
}: NotificationsFiltersProps) {
  return (
    <div className="notifications-filters">
      {notificationFilters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={`notifications-filter ${
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