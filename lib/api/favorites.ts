import { apiClient } from "./client";
import { apiEndpoints } from "./endpoints";

export type FavoriteCategory =
  | "UApps"
  | "UWeb"
  | "UShop"
  | "USchool"
  | "UCore"
  | "LAB";

export type FavoriteRecord = {
  id: string;
  userId: string;
  targetId: string;
  title: string;
  description: string;
  category: FavoriteCategory;
  href: string;
  icon?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateFavoriteInput = {
  targetId: string;
  title: string;
  description: string;
  category: FavoriteCategory;
  href: string;
  icon?: string;
  metadata?: Record<string, unknown>;
};

type UnknownRecord = Record<string, unknown>;

const FAVORITE_CATEGORIES: FavoriteCategory[] = [
  "UApps",
  "UWeb",
  "UShop",
  "USchool",
  "UCore",
  "LAB",
];

function isRecord(
  value: unknown,
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeFavorite(
  value: unknown,
): FavoriteRecord | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.targetId !== "string" ||
    typeof value.title !== "string" ||
    typeof value.description !== "string" ||
    typeof value.category !== "string" ||
    typeof value.href !== "string"
  ) {
    return null;
  }

  if (
    !FAVORITE_CATEGORIES.includes(
      value.category as FavoriteCategory,
    )
  ) {
    return null;
  }

  return {
    id: value.id,
    userId:
      typeof value.userId === "string"
        ? value.userId
        : "",
    targetId: value.targetId,
    title: value.title,
    description: value.description,
    category: value.category as FavoriteCategory,
    href: value.href,
    icon:
      typeof value.icon === "string" ||
      value.icon === null
        ? value.icon
        : undefined,
    metadata: isRecord(value.metadata)
      ? value.metadata
      : null,
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

export async function getFavorites(): Promise<
  FavoriteRecord[]
> {
  const response = await apiClient.get<unknown>(
    apiEndpoints.favorites.list,
  );

  let payload: unknown = response;

  if (
    isRecord(payload) &&
    "items" in payload &&
    Array.isArray(payload.items)
  ) {
    payload = payload.items;
  }

  if (!Array.isArray(payload)) {
    throw new Error(
      "The favorites API returned an invalid response.",
    );
  }

  return payload
    .map(normalizeFavorite)
    .filter(
      (
        item,
      ): item is FavoriteRecord =>
        item !== null,
    );
}

export async function createFavorite(
  favorite: CreateFavoriteInput,
): Promise<FavoriteRecord> {
  const targetId = favorite.targetId.trim();
  const title = favorite.title.trim();
  const href = favorite.href.trim();

  if (!targetId || !title || !href) {
    throw new Error(
      "Favorite target, title and URL are required.",
    );
  }

  const response = await apiClient.post<unknown>(
    apiEndpoints.favorites.create,
    {
      ...favorite,
      targetId,
      title,
      href,
      description: favorite.description.trim(),
    },
  );

  const normalized = normalizeFavorite(response);

  if (!normalized) {
    throw new Error(
      "The favorites API returned an invalid record.",
    );
  }

  return normalized;
}

export async function deleteFavorite(
  targetId: string,
): Promise<{
  success: boolean;
  id: string;
  targetId: string;
}> {
  const normalizedId = targetId.trim();

  if (!normalizedId) {
    throw new Error(
      "A favorite target ID is required.",
    );
  }

  const response = await apiClient.delete<unknown>(
    apiEndpoints.favorites.remove(
      normalizedId,
    ),
  );

  if (
    !isRecord(response) ||
    typeof response.id !== "string" ||
    typeof response.targetId !== "string"
  ) {
    throw new Error(
      "The favorites API returned an invalid delete response.",
    );
  }

  return {
    success:
      response.success === true,
    id: response.id,
    targetId: response.targetId,
  };
}