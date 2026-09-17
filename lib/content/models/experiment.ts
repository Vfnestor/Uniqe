import type {
  ContentMetadata,
  ContentStatus,
} from "../content-types";

export type ContentExperiment = {
  id: string;

  slug: string;

  name: string;
  description: string;

  category: string;

  status: ContentStatus;

  href?: string;

  icon?: string;

  featured?: boolean;

  tags?: string[];

  metadata?: ContentMetadata;

  createdAt: string;
  updatedAt: string;
};