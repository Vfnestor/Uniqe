"use client";

import Link from "next/link";

import type {
  NotificationItemData,
} from "./notifications";

type NotificationItemProps = {
  notification: NotificationItemData;
  onRead: (id: string) => void;
};

export default function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  return (
    <article
      className={`notification-item surface ${
        notification.read
          ? "is-read"
          : "is-unread"
      }`}
    >
      <div className="notification-item-icon">
        {notification.icon}
      </div>

      <div className="notification-item-content">
        <div className="notification-item-top">
          <span className="notification-item-category">
            {notification.categoryLabel}
          </span>

          {!notification.read && (
            <span
              className="notification-unread-dot"
              aria-label="Unread"
            />
          )}
        </div>

        <h3 className="notification-item-title">
          {notification.title}
        </h3>

        <p className="notification-item-description">
          {notification.description}
        </p>

        <span className="notification-item-time">
          {notification.time}
        </span>
      </div>

      <div className="notification-item-actions">
        {!notification.read && (
          <button
            type="button"
            className="notification-read-button"
            onClick={() => onRead(notification.id)}
          >
            Mark read
          </button>
        )}

        <Link
          href={notification.href}
          className="notification-open-button"
          aria-label={`Open ${notification.title}`}
        >
          ↗
        </Link>
      </div>
    </article>
  );
}