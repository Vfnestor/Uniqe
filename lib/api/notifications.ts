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

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeCategory(
  category: unknown,
): NotificationCategory {
  if (typeof category !== "string") {
    return "system";
  }

  const normalized = category.toLowerCase();

  return Object.prototype.hasOwnProperty.call(
    CATEGORY_LABELS,
    normalized,
  )
    ? (normalized as NotificationCategory)
    : "system";
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

  const minutes = Math.floor(difference / 60_000);

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

function normalizeNotificationRecord(
  value: unknown,
): NotificationRecord | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    typeof value.message !== "string" ||
    typeof value.read !== "boolean" ||
    typeof value.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    userId:
      typeof value.userId === "string"
        ? value.userId
        : "",
    category:
      typeof value.category === "string"
        ? value.category
        : "system",
    title: value.title,
    message: value.message,
    read: value.read,
    href:
      typeof value.href === "string" ||
      value.href === null
        ? value.href
        : undefined,
    icon:
      typeof value.icon === "string" ||
      value.icon === null
        ? value.icon
        : undefined,
    metadata: isRecord(value.metadata)
      ? value.metadata
      : null,
    createdAt: value.createdAt,
    readAt:
      typeof value.readAt === "string" ||
      value.readAt === null
        ? value.readAt
        : undefined,
  };
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

function unwrapList(value: unknown): unknown {
  let payload = value;

  if (isRecord(payload) && "data" in payload) {
    payload = payload.data;
  }

  if (
    isRecord(payload) &&
    Array.isArray(payload.items)
  ) {
    payload = payload.items;
  }

  return payload;
}

export async function getNotifications(): Promise<
  NotificationItemData[]
> {
  const response = await apiClient.get<unknown>(
    apiEndpoints.notifications.list,
  );

  const payload = unwrapList(response);

  if (!Array.isArray(payload)) {
    throw new Error(
      "The notifications API returned an invalid response.",
    );
  }

  return payload
    .map(normalizeNotificationRecord)
    .filter(
      (item): item is NotificationRecord =>
        item !== null,
    )
    .map(mapNotification);
}

export async function markNotificationAsRead(
  id: string,
): Promise<unknown> {
  const normalizedId = id.trim();

  if (!normalizedId) {
    throw new Error(
      "A notification ID is required.",
    );
  }

  return apiClient.patch<unknown>(
    apiEndpoints.notifications.readOne(normalizedId),
  );
}

export async function markAllNotificationsAsRead(): Promise<unknown> {
  return apiClient.patch<unknown>(
    apiEndpoints.notifications.readAll,
    {},
  );
}