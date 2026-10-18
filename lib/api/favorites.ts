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

export async function getFavorites(): Promise<FavoriteRecord[]> {
  const result = await apiClient.get<FavoriteRecord[]>(
    apiEndpoints.favorites.list,
  );

  return Array.isArray(result) ? result : [];
}

export async function createFavorite(
  favorite: CreateFavoriteInput,
): Promise<FavoriteRecord> {
  return apiClient.post<FavoriteRecord>(
    apiEndpoints.favorites.create,
    favorite,
  );
}

export async function deleteFavorite(
  targetId: string,
): Promise<{
  success: boolean;
  id: string;
  targetId: string;
}> {
  return apiClient.delete<{
    success: boolean;
    id: string;
    targetId: string;
  }>(apiEndpoints.favorites.remove(targetId));
}