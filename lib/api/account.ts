import { apiClient } from "./client";
import { apiEndpoints } from "./endpoints";

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

export type UpdateProfileInput = {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  language?: string;
  theme?: "system" | "light" | "dark";
};

export type UpdatePreferencesInput = {
  theme?: "system" | "light" | "dark";
  language?: string;
  notificationsEnabled?: boolean;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function unwrapPayload(value: unknown): unknown {
  if (isRecord(value) && "data" in value) {
    return value.data;
  }

  return value;
}

function normalizeTheme(
  value: unknown,
): "system" | "light" | "dark" {
  if (typeof value !== "string") {
    return "system";
  }

  switch (value.toLowerCase()) {
    case "system":
      return "system";
    case "light":
      return "light";
    case "dark":
      return "dark";
    default:
      return "system";
  }
}

function normalizeUser(value: unknown): AccountUser | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    !isString(value.id) ||
    !isString(value.name) ||
    !isString(value.email)
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
    validStatuses.includes(value.status.toLowerCase())
      ? (value.status.toLowerCase() as AccountUser["status"])
      : "active";

  return {
    id: value.id,
    name: value.name,
    email: value.email,
    avatarUrl: isString(value.avatarUrl)
      ? value.avatarUrl
      : null,
    status,
    role: isString(value.role)
      ? value.role.toLowerCase()
      : "user",
    createdAt: isString(value.createdAt)
      ? value.createdAt
      : "",
    updatedAt: isString(value.updatedAt)
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
    !isString(value.id) ||
    !isString(value.userId) ||
    !isString(value.displayName)
  ) {
    return null;
  }

  return {
    id: value.id,
    userId: value.userId,
    displayName: value.displayName,
    bio: isString(value.bio)
      ? value.bio
      : null,
    avatarUrl: isString(value.avatarUrl)
      ? value.avatarUrl
      : null,
    language: isString(value.language)
      ? value.language
      : "en",
    theme: normalizeTheme(value.theme),
    createdAt: isString(value.createdAt)
      ? value.createdAt
      : "",
    updatedAt: isString(value.updatedAt)
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
    !isString(value.id) ||
    !isString(value.userId)
  ) {
    return null;
  }

  return {
    id: value.id,
    userId: value.userId,
    theme: normalizeTheme(value.theme),
    language: isString(value.language)
      ? value.language
      : "en",
    notificationsEnabled:
      typeof value.notificationsEnabled === "boolean"
        ? value.notificationsEnabled
        : true,
    createdAt: isString(value.createdAt)
      ? value.createdAt
      : "",
    updatedAt: isString(value.updatedAt)
      ? value.updatedAt
      : "",
  };
}

export async function getAccount(): Promise<AccountResponse> {
  const response = await apiClient.get<unknown>(
    apiEndpoints.user.me,
  );

  const payload = unwrapPayload(response);

  if (!isRecord(payload)) {
    throw new Error("Invalid account response.");
  }

  const user = normalizeUser(payload.user);

  if (!user) {
    throw new Error("Account information is incomplete.");
  }

  return {
    user,
    profile: normalizeProfile(payload.profile),
    preferences: normalizePreferences(payload.preferences),
  };
}

export async function updateProfile(
  input: UpdateProfileInput,
): Promise<AccountProfile> {
  const payload = {
    ...input,
    ...(input.theme
      ? { theme: input.theme.toUpperCase() }
      : {}),
  };

  const response = await apiClient.patch<unknown>(
    apiEndpoints.user.profile,
    payload,
  );

  const profile = normalizeProfile(
    unwrapPayload(response),
  );

  if (!profile) {
    throw new Error("Invalid profile response.");
  }

  return profile;
}

export async function updatePreferences(
  input: UpdatePreferencesInput,
): Promise<AccountPreferences> {
  const payload = {
    ...input,
    ...(input.theme
      ? { theme: input.theme.toUpperCase() }
      : {}),
  };

  const response = await apiClient.patch<unknown>(
    apiEndpoints.user.preferences,
    payload,
  );

  const preferences = normalizePreferences(
    unwrapPayload(response),
  );

  if (!preferences) {
    throw new Error("Invalid preferences response.");
  }

  return preferences;
}