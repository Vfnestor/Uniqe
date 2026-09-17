"use client";

import NotificationItem from "./NotificationItem";

import type {
  NotificationItemData,
} from "./notifications";

type NotificationsListProps = {
  notifications: NotificationItemData[];
  onRead: (id: string) => void;
};

export default function NotificationsList({
  notifications,
  onRead,
}: NotificationsListProps) {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notifications-list">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRead={onRead}
        />
      ))}
    </div>
  );
}