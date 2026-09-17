import type {
  EcosystemLayer,
  EcosystemStatus,
} from "../enums";

export type EcosystemItem = {
  id: string;

  layer: EcosystemLayer;

  name: string;
  description: string;

  status: EcosystemStatus;

  href: string;
  icon?: string;

  featured?: boolean;

  metadata?: Record<string, unknown>;

  createdAt?: string;
  updatedAt?: string;
};

export type EcosystemModule = {
  layer: EcosystemLayer;

  name: string;
  description: string;

  href: string;
  icon?: string;

  status: EcosystemStatus;

  items: EcosystemItem[];
};