import { apiClient } from "./client";
import { apiEndpoints } from "./endpoints";

export type NotificationRecord = {
  id: string;
  userId: string;
  category: string;
  title: string;
  message: string;
  read: boolean;
  href?: string | null;
  icon?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  readAt?: string | null;
};

export type NotificationCategory =
  | "system"
  | "uapps"
  | "uweb"
  | "ushop"
  | "uschool"
  | "ucore"
  | "lab";

export type NotificationItemData = {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  categoryLabel: string;
  time: string;
  href: string;
  icon: string;
  read: boolean;
};

const CATEGORY_LABELS: Record<
  NotificationCategory,
  string
> = {
  system: "System",
  uapps: "UApps",
  uweb: "UWeb",
  ushop: "UShop",
  uschool: "USchool",
  ucore: "UCore",
  lab: "LAB",
};

function normalizeCategory(
  category: unknown,
): NotificationCategory {
  if (typeof category !== "string") {
    return "system";
  }

  const normalized = category.toLowerCase();

  if (
    Object.prototype.hasOwnProperty.call(
      CATEGORY_LABELS,
      normalized,
    )
  ) {
    return normalized as NotificationCategory;
  }

  return "system";
}

function formatTime(value: string): string {
  const timestamp = new Date(value).getTime();

  if (!Number.isFinite(timestamp)) {
    return "Recently";
  }

  const difference = Math.max(
    0,
    Date.now() - timestamp,
  );

  const minutes = Math.floor(
    difference / 60_000,
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days}d ago`;
  }

  return new Date(timestamp).toLocaleDateString();
}

function safeHref(value: unknown): string {
  if (typeof value !== "string") {
    return "/my-u";
  }

  const href = value.trim();

  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.includes("\\")
  ) {
    return "/my-u";
  }

  return href;
}

export function mapNotification(
  notification: NotificationRecord,
): NotificationItemData {
  const category = normalizeCategory(
    notification.category,
  );

  return {
    id: notification.id,
    title: notification.title,
    description: notification.message,
    category,
    categoryLabel: CATEGORY_LABELS[category],
    time: formatTime(notification.createdAt),
    href: safeHref(notification.href),
    icon: notification.icon || "◇",
    read: notification.read,
  };
}

export async function getNotifications(): Promise<
  NotificationItemData[]
> {
  const result = await apiClient.get<
    NotificationRecord[]
  >(apiEndpoints.notifications.list);

  if (!Array.isArray(result)) {
    throw new Error(
      "The notifications API returned an invalid response.",
    );
  }

  return result
    .filter(
      (item): item is NotificationRecord =>
        Boolean(
          item &&
          typeof item.id === "string" &&
          typeof item.title === "string" &&
          typeof item.message === "string",
        ),
    )
    .map(mapNotification);
}

export async function markNotificationAsRead(
  id: string,
): Promise<unknown> {
  if (!id.trim()) {
    throw new Error(
      "A notification ID is required.",
    );
  }

  return apiClient.patch<unknown>(
    apiEndpoints.notifications.readOne(id),
  );
}

export async function markAllNotificationsAsRead(): Promise<unknown> {
  return apiClient.patch<unknown>(
    apiEndpoints.notifications.read,
    {},
  );
}