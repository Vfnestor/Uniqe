export type SeoImage = {
  url: string;

  width?: number;
  height?: number;

  alt?: string;
};

export type SeoMetadata = {
  title?: string;

  description?: string;

  keywords?: string[];

  canonical?: string;

  noIndex?: boolean;
  noFollow?: boolean;

  image?: SeoImage;

  type?: "website" | "article";

  publishedTime?: string;
  modifiedTime?: string;

  authors?: string[];

  locale?: string;
};