export const seoConfig = {
  siteName: "Uniqe",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://uniqe.onrender.com",

  defaultTitle:
    "Uniqe — A Connected Digital Ecosystem.",

  titleTemplate:
    "%s | Uniqe",

  defaultDescription:
    "Uniqe is a connected digital ecosystem for applications, websites, commerce, learning, infrastructure and experimentation.",

  defaultLocale: "en",

  keywords: [
    "Uniqe",
    "digital ecosystem",
    "UApps",
    "UWeb",
    "UShop",
    "USchool",
    "UCore",
    "LAB",
    "My U",
  ],

  social: {
    twitterHandle: "",
  },

  robots: {
    index: true,
    follow: true,
  },
} as const;