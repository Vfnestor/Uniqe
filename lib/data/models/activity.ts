import type {
  ActivityType,
  EcosystemLayer,
} from "../enums";

import type {
  UserId,
} from "./user";

export type ActivityMetadata =
  Record<string, unknown>;

export type Activity = {
  id: string;
  userId: UserId;

  type: ActivityType;

  title: string;
  description: string;

  source: string;
  sourceLayer?: EcosystemLayer;

  href?: string;
  icon?: string;

  metadata?: ActivityMetadata;

  createdAt: string;
};