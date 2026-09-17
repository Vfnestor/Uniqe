import type {
  ContentType,
} from "./content-types";

export const contentConfig = {
  defaultLocale: "en",

  supportedLocales: [
    "en",
  ],

  defaultStatus: "published",

  types: [
    "page",
    "project",
    "update",
    "product",
    "course",
    "experiment",
    "navigation",
  ] as ContentType[],
} as const;