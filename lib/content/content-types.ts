export const contentTypes = [
  "page",
  "project",
  "update",
  "product",
  "course",
  "experiment",
  "navigation",
] as const;

export type ContentType =
  (typeof contentTypes)[number];

export type ContentStatus =
  | "draft"
  | "published"
  | "archived";

export type ContentMetadata =
  Record<string, unknown>;