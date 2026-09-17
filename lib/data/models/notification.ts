import type {
  NotificationCategory,
} from "../enums";

import type {
  UserId,
} from "./user";

export type NotificationMetadata =
  Record<string, unknown>;

export type Notification = {
  id: string;
  userId: UserId;

  category: NotificationCategory;

  title: string;
  message: string;

  read: boolean;

  href?: string;
  icon?: string;

  metadata?: NotificationMetadata;

  createdAt: string;
  readAt?: string;
};