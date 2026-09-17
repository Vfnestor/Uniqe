import type {
  ContentMetadata,
  ContentStatus,
} from "../content-types";

export type ContentPage = {
  id: string;

  slug: string;

  title: string;
  description?: string;

  content?: string;

  status: ContentStatus;

  locale: string;

  featured?: boolean;

  metadata?: ContentMetadata;

  createdAt: string;
  updatedAt: string;
};