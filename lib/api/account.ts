import {
  apiClient,
} from "./client";

import {
  apiEndpoints,
} from "./endpoints";

export type AccountUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  status: "active" | "inactive" | "suspended";
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type AccountProfile = {
  id: string;
  userId: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  language: string;
  theme: "system" | "light" | "dark";
  createdAt: string;
  updatedAt: string;
};

export type AccountPreferences = {
  id: string;
  userId: string;
  theme: "system" | "light" | "dark";
  language: string;
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AccountResponse = {
  user: AccountUser;
  profile: AccountProfile | null;
  preferences: AccountPreferences | null;
};

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function requiredString(
  value: unknown,
): value is string {
  return typeof value === "string";
}

function normalizeUser(
  value: unknown,
): AccountUser | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    !requiredString(value.id) ||
    !requiredString(value.name) ||
    !requiredString(value.email)
  ) {
    return null;
  }

  const validStatuses = [
    "active",
    "inactive",
    "suspended",
  ];

  const status =
    typeof value.status === "string" &&
    validStatuses.includes(value.status)
      ? value.status as AccountUser["status"]
      : "active";

  return {
    id: value.id,
    name: value.name,
    email: value.email,
    avatarUrl:
      typeof value.avatarUrl === "string"
        ? value.avatarUrl
        : null,
    status,
    role:
      typeof value.role === "string"
        ? value.role
        : "user",
    createdAt:
      typeof value.createdAt === "string"
        ? value.createdAt
        : "",
    updatedAt:
      typeof value.updatedAt === "string"
        ? value.updatedAt
        : "",
  };
}

function normalizeProfile(
  value: unknown,
): AccountProfile | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    !requiredString(value.id) ||
    !requiredString(value.userId) ||
    !requiredString(value.displayName)
  ) {
    return null;
  }

  const validThemes = [
    "system",
    "light",
    "dark",
  ];

  const theme =
    typeof value.theme === "string" &&
    validThemes.includes(value.theme)
      ? value.theme as AccountProfile["theme"]
      : "system";

  return {
    id: value.id,
    userId: value.userId,
    displayName: value.displayName,
    bio:
      typeof value.bio === "string"
        ? value.bio
        : null,
    avatarUrl:
      typeof value.avatarUrl === "string"
        ? value.avatarUrl
        : null,
    language:
      typeof value.language === "string"
        ? value.language
        : "en",
    theme,
    createdAt:
      typeof value.createdAt === "string"
        ? value.createdAt
        : "",
    updatedAt:
      typeof value.updatedAt === "string"
        ? value.updatedAt
        : "",
  };
}

function normalizePreferences(
  value: unknown,
): AccountPreferences | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    !requiredString(value.id) ||
    !requiredString(value.userId)
  ) {
    return null;
  }

  const validThemes = [
    "system",
    "light",
    "dark",
  ];

  const theme =
    typeof value.theme === "string" &&
    validThemes.includes(value.theme)
      ? value.theme as AccountPreferences["theme"]
      : "system";

  return {
    id: value.id,
    userId: value.userId,
    theme,
    language:
      typeof value.language === "string"
        ? value.language
        : "en",
    notificationsEnabled:
      typeof value.notificationsEnabled === "boolean"
        ? value.notificationsEnabled
        : true,
    createdAt:
      typeof value.createdAt === "string"
        ? value.createdAt
        : "",
    updatedAt:
      typeof value.updatedAt === "string"
        ? value.updatedAt
        : "",
  };
}

export async function getAccount(): Promise<AccountResponse> {
  const response = await apiClient.get<unknown>(
    apiEndpoints.user.me,
  );

  let payload: unknown = response;

  if (isRecord(payload) && "data" in payload) {
    payload = payload.data;
  }

  if (!isRecord(payload)) {
    throw new Error(
      "Invalid account response.",
    );
  }

  const user = normalizeUser(payload.user);

  if (!user) {
    throw new Error(
      "Account information is incomplete.",
    );
  }

  return {
    user,
    profile: normalizeProfile(payload.profile),
    preferences: normalizePreferences(
      payload.preferences,
    ),
  };
}