export type UAppSource =
  | "user"
  | "uniqe"
  | "google-play"
  | "app-store";

export type UAppPlatform =
  | "web"
  | "android"
  | "ios"
  | "windows"
  | "macos"
  | "linux"
  | "multi";

export type UAppType =
  | "web-app"
  | "installable"
  | "hybrid";

export type UAppStatus =
  | "available"
  | "development"
  | "coming-soon"
  | "experimental";

export type UAppAccent =
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "black"
  | "pink"
  | "red";

export type UApp = {
  id: string;
  name: string;
  description: string;
  category: string;
  source: UAppSource;
  sourceLabel: string;
  platform: UAppPlatform;
  platformLabel: string;
  type: UAppType;
  typeLabel: string;
  status: UAppStatus;
  statusLabel: string;
  icon: string;
  cover?: string;
  accent: UAppAccent;
  href: string;
  featured?: boolean;
  verified?: boolean;
  version?: string;
  official?: boolean;
  releaseLabel?: string;
};