import {
  seoConfig,
} from "./config";

export const publicRoutes = [
  "/",
  "/uapps",
  "/uweb",
  "/ushop",
  "/uschool",
  "/ucore",
  "/lab",
  "/search",
] as const;

export function buildSitemap() {
  return publicRoutes.map(
    (route) => ({
      url:
        route === "/"
          ? seoConfig.siteUrl
          : `${seoConfig.siteUrl}${route}`,

      lastModified:
        new Date(),

      changeFrequency:
        "weekly" as const,

      priority:
        route === "/"
          ? 1
          : 0.7,
    })
  );
}