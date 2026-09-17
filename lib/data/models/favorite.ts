import type {
  FavoriteCategory,
} from "../enums";

import type {
  UserId,
} from "./user";

export type FavoriteMetadata =
  Record<string, unknown>;

export type FavoriteItem = {
  id: string;
  userId: UserId;

  targetId: string;
  title: string;
  description: string;

  category: FavoriteCategory;

  href: string;
  icon?: string;

  metadata?: FavoriteMetadata;

  createdAt: string;
  updatedAt: string;
};

export type FavoriteCollection = {
  userId: UserId;
  items: FavoriteItem[];
};