"use client";

import {
  notificationFilters,
} from "./notifications";

type NotificationsFiltersProps = {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  unreadCount?: number;
};

export default function NotificationsFilters({
  activeFilter,
  onFilterChange,
  unreadCount = 0,
}: NotificationsFiltersProps) {
  return (
    <div
      className="notifications-filters"
      role="group"
      aria-label="Filter notifications"
    >
      {notificationFilters.map((filter) => {
        const isUnreadFilter =
          filter.id === "unread";

        const label =
          isUnreadFilter
            ? `${filter.label} (${unreadCount})`
            : filter.label;

        return (
          <button
            key={filter.id}
            type="button"
            className={`notifications-filter ${
              activeFilter === filter.id
                ? "is-active"
                : ""
            }`}
            aria-pressed={
              activeFilter === filter.id
            }
            onClick={() =>
              onFilterChange(filter.id)
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}