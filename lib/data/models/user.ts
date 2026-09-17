import type {
  ThemePreference,
  UserRole,
  UserStatus,
} from "../enums";

export type UserId = string;

export type User = {
  id: UserId;
  name: string;
  email: string;
  avatarUrl?: string;

  status: UserStatus;
  role: UserRole;

  createdAt: string;
  updatedAt: string;
};

export type UserPreferences = {
  theme: ThemePreference;
  language: string;
  notificationsEnabled: boolean;
};

export type UserAccount = {
  user: User;
  preferences: UserPreferences;
};