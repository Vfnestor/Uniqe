import type {
  ContentMetadata,
  ContentStatus,
} from "../content-types";

export type ContentCourse = {
  id: string;

  slug: string;

  title: string;
  description: string;

  category: string;

  status: ContentStatus;

  instructorId?: string;

  duration?: string;

  level?: string;

  href?: string;

  imageUrl?: string;

  featured?: boolean;

  tags?: string[];

  metadata?: ContentMetadata;

  createdAt: string;
  updatedAt: string;
};