export const ecosystemLayers = [
  "UApps",
  "UWeb",
  "UShop",
  "USchool",
  "UCore",
  "LAB",
  "My U",
] as const;

export type EcosystemLayer =
  (typeof ecosystemLayers)[number];

export const userStatuses = [
  "active",
  "inactive",
  "suspended",
] as const;

export type UserStatus =
  (typeof userStatuses)[number];

export const userRoles = [
  "user",
  "admin",
] as const;

export type UserRole =
  (typeof userRoles)[number];

export const activityTypes = [
  "explore",
  "visit",
  "project",
  "system",
] as const;

export type ActivityType =
  (typeof activityTypes)[number];

export const notificationCategories = [
  "system",
  "UApps",
  "UWeb",
  "UShop",
  "USchool",
  "UCore",
  "LAB",
] as const;

export type NotificationCategory =
  (typeof notificationCategories)[number];

export const favoriteCategories = [
  "UApps",
  "UWeb",
  "UShop",
  "USchool",
  "UCore",
  "LAB",
] as const;

export type FavoriteCategory =
  (typeof favoriteCategories)[number];

export const ecosystemStatuses = [
  "available",
  "development",
  "coming-soon",
  "experimental",
] as const;

export type EcosystemStatus =
  (typeof ecosystemStatuses)[number];

export const themePreferences = [
  "system",
  "light",
  "dark",
] as const;

export type ThemePreference =
  (typeof themePreferences)[number];