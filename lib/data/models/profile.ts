import type {
  ThemePreference,
} from "../enums";

import type {
  UserId,
} from "./user";

export type ProfileStat = {
  id: string;
  label: string;
  value: string;
};

export type ProfilePreference = {
  id: string;
  name: string;
  description: string;
  value: string;
  icon: string;
};

export type UserProfile = {
  id: string;
  userId: UserId;

  displayName: string;
  bio?: string;
  avatarUrl?: string;

  language: string;
  theme: ThemePreference;

  stats: ProfileStat[];
  preferences: ProfilePreference[];

  createdAt: string;
  updatedAt: string;
};