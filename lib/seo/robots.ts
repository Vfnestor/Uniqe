import {
  seoConfig,
} from "./config";

export function buildRobots() {
  return {
    rules: {
      userAgent: "*",

      allow: seoConfig.robots.index
        ? "/"
        : undefined,

      disallow:
        seoConfig.robots.index
          ? [
              "/api/",
              "/auth/",
              "/my-u/",
            ]
          : "/",
    },

    sitemap:
      `${seoConfig.siteUrl}/sitemap.xml`,
  };
}