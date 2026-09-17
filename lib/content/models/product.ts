import type {
  ContentMetadata,
  ContentStatus,
} from "../content-types";

export type ContentProduct = {
  id: string;

  slug: string;

  name: string;
  description: string;

  category: string;

  status: ContentStatus;

  price?: number;
  currency?: string;

  href?: string;

  imageUrl?: string;

  featured?: boolean;

  tags?: string[];

  metadata?: ContentMetadata;

  createdAt: string;
  updatedAt: string;
};