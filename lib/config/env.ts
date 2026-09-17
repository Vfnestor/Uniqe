export const env = {
  nodeEnv:
    process.env.NODE_ENV || "development",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",

  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    "/api/v1",

  appName:
    process.env.NEXT_PUBLIC_APP_NAME ||
    "Uniqe",

  appVersion:
    process.env.NEXT_PUBLIC_APP_VERSION ||
    "1.0.0",
} as const;

export const isProduction =
  env.nodeEnv === "production";

export const isDevelopment =
  env.nodeEnv === "development";

export const isTest =
  env.nodeEnv === "test";