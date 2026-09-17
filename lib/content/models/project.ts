import type {
  ContentMetadata,
  ContentStatus,
} from "../content-types";

import type {
  EcosystemLayer,
} from "@/lib/data";

export type ContentProject = {
  id: string;

  slug: string;

  name: string;
  description: string;

  layer: EcosystemLayer;

  status: ContentStatus;

  href?: string;

  icon?: string;

  featured?: boolean;

  tags?: string[];

  metadata?: ContentMetadata;

  createdAt: string;
  updatedAt: string;
};