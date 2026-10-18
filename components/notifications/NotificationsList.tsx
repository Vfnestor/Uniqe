"use client";

import NotificationItem from "./NotificationItem";

import type {
  NotificationItemData,
} from "@/lib/api/notifications";

type NotificationsListProps = {
  notifications: NotificationItemData[];
  onRead: (id: string) => void;
  pendingIds?: string[];
};

export default function NotificationsList({
  notifications,
  onRead,
  pendingIds = [],
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div
      className="notifications-list"
      aria-label="Notifications"
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRead={onRead}
          isPending={pendingIds.includes(
            notification.id,
          )}
        />
      ))}
    </div>
  );
}