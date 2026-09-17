import type {
  ContentMetadata,
  ContentStatus,
} from "../content-types";

import type {
  EcosystemLayer,
} from "@/lib/data";

export type ContentUpdate = {
  id: string;

  slug: string;

  title: string;
  excerpt: string;

  content?: string;

  category: string;

  layer?: EcosystemLayer;

  status: ContentStatus;

  publishedAt?: string;

  authorId?: string;

  href?: string;

  featured?: boolean;

  tags?: string[];

  metadata?: ContentMetadata;

  createdAt: string;
  updatedAt: string;
};