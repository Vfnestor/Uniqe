import type {
  UAppAccent,
  UAppPlatform,
  UAppType,
} from "@/lib/uapps/types";

import {
  getStoredUserProfile,
} from "@/lib/my-u/profile";

export type StoredUserAppReviewStatus =
  | "draft"
  | "pending-review"
  | "approved"
  | "rejected";

export type StoredUserApp = {
  id: string;
  name: string;
  description: string;
  category: string;
  platform: UAppPlatform;
  platformLabel: string;
  type: UAppType;
  typeLabel: string;
  icon: string;
  cover?: string;
  accent: UAppAccent;
  href: string;
  status: "available" | "development";
  statusLabel: string;
  source: "user";
  sourceLabel: string;
  verified: boolean;
  official: false;
  version?: string;
  creator: {
    id: string;
    name: string;
    username: string;
  };
  reviewStatus: StoredUserAppReviewStatus;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  reviewedAt?: string;
  rejectionReason?: string;
};

export type CreateUserAppInput = {
  name: string;
  description: string;
  category: string;
  platform: UAppPlatform;
  platformLabel: string;
  type: UAppType;
  typeLabel: string;
  icon: string;
  cover?: string;
  accent: UAppAccent;
  href: string;
  version?: string;
};

export const USER_APPS_STORAGE_KEY =
  "uniqe-user-apps";

function isBrowser() {
  return (
    typeof window !== "undefined"
  );
}

function createId() {
  return `user-app-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function getCreator() {
  const profile =
    getStoredUserProfile();

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim();

  return {
    id:
      profile.username ||
      `local-user-${Date.now()}`,
    name:
      fullName ||
      "کاربر Uniqe",
    username:
      profile.username ||
      "uniqe_user",
  };
}

function isStoredUserApp(
  value: unknown,
): value is StoredUserApp {
  if (!value || typeof value !== "object") {
    return false;
  }

  const app =
    value as Partial<StoredUserApp>;

  return (
    typeof app.id === "string" &&
    typeof app.name === "string" &&
    typeof app.description === "string" &&
    typeof app.category === "string" &&
    typeof app.href === "string" &&
    typeof app.reviewStatus === "string"
  );
}

export function getStoredUserApps(): StoredUserApp[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(
        USER_APPS_STORAGE_KEY,
      );

    if (!raw) {
      return [];
    }

    const parsed =
      JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      isStoredUserApp,
    );
  } catch {
    return [];
  }
}

export function saveStoredUserApps(
  apps: StoredUserApp[],
) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    USER_APPS_STORAGE_KEY,
    JSON.stringify(apps),
  );

  window.dispatchEvent(
    new CustomEvent(
      "uniqe-user-apps-updated",
    ),
  );
}

export function createStoredUserApp(
  input: CreateUserAppInput,
): StoredUserApp {
  const now =
    new Date().toISOString();

  return {
    id: createId(),
    name: input.name.trim(),
    description:
      input.description.trim(),
    category:
      input.category.trim(),
    platform: input.platform,
    platformLabel:
      input.platformLabel,
    type: input.type,
    typeLabel: input.typeLabel,
    icon:
      input.icon.trim() || "◈",
    cover:
      input.cover?.trim() || undefined,
    accent: input.accent,
    href:
      input.href.trim(),
    status: "development",
    statusLabel: "در حال توسعه",
    source: "user",
    sourceLabel:
      "ساخته‌شده توسط کاربر",
    verified: false,
    official: false,
    version:
      input.version?.trim() || undefined,
    creator: getCreator(),
    reviewStatus: "draft",
    createdAt: now,
    updatedAt: now,
  };
}

export function addStoredUserApp(
  app: StoredUserApp,
) {
  const apps =
    getStoredUserApps();

  saveStoredUserApps([
    app,
    ...apps,
  ]);

  return app;
}

export function updateStoredUserApp(
  id: string,
  updates: Partial<StoredUserApp>,
) {
  const apps =
    getStoredUserApps();

  const updated =
    apps.map((app) => {
      if (app.id !== id) {
        return app;
      }

      return {
        ...app,
        ...updates,
        updatedAt:
          new Date().toISOString(),
      };
    });

  saveStoredUserApps(updated);

  return updated.find(
    (app) => app.id === id,
  );
}

export function submitStoredUserApp(
  id: string,
) {
  return updateStoredUserApp(
    id,
    {
      reviewStatus:
        "pending-review",
      status: "available",
      statusLabel: "در انتظار بررسی",
      submittedAt:
        new Date().toISOString(),
      rejectionReason:
        undefined,
    },
  );
}

export function deleteStoredUserApp(
  id: string,
) {
  const apps =
    getStoredUserApps();

  saveStoredUserApps(
    apps.filter(
      (app) => app.id !== id,
    ),
  );
}