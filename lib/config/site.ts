export const siteConfig = {
  name: "Uniqe",

  shortName: "Uniqe",

  description:
    "Uniqe is a connected digital ecosystem for applications, websites, commerce, learning, infrastructure and experimentation.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000",

  locale: "en",

  themeColor: "#07080c",

  version:
    process.env.NEXT_PUBLIC_APP_VERSION ||
    "1.0.0",
} as const;