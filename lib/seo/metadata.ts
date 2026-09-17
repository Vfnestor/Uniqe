import type {
  Metadata,
} from "next";

import {
  seoConfig,
} from "./config";

import type {
  SeoMetadata,
} from "./types";

function normalizeUrl(
  path: string
): string {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  return `${seoConfig.siteUrl}${normalizedPath}`;
}

export function buildMetadata(
  seo: SeoMetadata = {}
): Metadata {
  const title =
    seo.title
      ? `${seo.title} | ${seoConfig.siteName}`
      : seoConfig.defaultTitle;

  const description =
    seo.description ||
    seoConfig.defaultDescription;

  const canonical =
    seo.canonical
      ? normalizeUrl(seo.canonical)
      : undefined;

  const imageUrl =
    seo.image?.url
      ? normalizeUrl(seo.image.url)
      : undefined;

  const robotsIndex =
    seo.noIndex
      ? false
      : seoConfig.robots.index;

  const robotsFollow =
    seo.noFollow
      ? false
      : seoConfig.robots.follow;

  const metadata: Metadata = {
    title,

    description,

    keywords:
      seo.keywords?.length
        ? seo.keywords
        : [...seoConfig.keywords],

    metadataBase:
      new URL(seoConfig.siteUrl),

    alternates: canonical
      ? {
          canonical,
        }
      : undefined,

    robots: {
      index: robotsIndex,
      follow: robotsFollow,
    },

    openGraph: {
      title,

      description,

      siteName:
        seoConfig.siteName,

      locale:
        seo.locale ||
        seoConfig.defaultLocale,

      type:
        seo.type || "website",

      url:
        canonical ||
        seoConfig.siteUrl,

      images: imageUrl
        ? [
            {
              url: imageUrl,

              width:
                seo.image?.width,

              height:
                seo.image?.height,

              alt:
                seo.image?.alt ||
                title,
            },
          ]
        : undefined,

      publishedTime:
        seo.publishedTime,

      modifiedTime:
        seo.modifiedTime,

      authors:
        seo.authors,
    },

    twitter: {
      card: imageUrl
        ? "summary_large_image"
        : "summary",

      title,

      description,

      creator:
        seoConfig.social
          .twitterHandle ||
        undefined,

      images:
        imageUrl
          ? [imageUrl]
          : undefined,
    },
  };

  return metadata;
}