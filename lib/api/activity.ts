import { apiClient } from "./client";
import { apiEndpoints } from "./endpoints";

export type ActivityRecord = {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
  createdAt: string;
};

export type ActivityResponse = {
  items: ActivityRecord[];
  total: number;
  limit: number;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(
  value: unknown,
): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeActivity(
  value: unknown,
): ActivityRecord | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    typeof value.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    type:
      typeof value.type === "string"
        ? value.type
        : "general",
    title: value.title,
    description:
      typeof value.description === "string"
        ? value.description
        : "",
    icon:
      typeof value.icon === "string"
        ? value.icon
        : "◈",
    href:
      typeof value.href === "string"
        ? value.href
        : undefined,
    createdAt: value.createdAt,
  };
}

export async function getActivity(
  limit = 20,
): Promise<ActivityResponse> {
  const requestedLimit = Number(limit);

  const safeLimit = Number.isFinite(
    requestedLimit,
  )
    ? Math.min(
        Math.max(
          Math.trunc(requestedLimit),
          1,
        ),
        50,
      )
    : 20;

  const params = new URLSearchParams({
    limit: String(safeLimit),
  });

  const response = await apiClient.get<unknown>(
    `${apiEndpoints.activity.list}?${params.toString()}`,
  );

  let payload: unknown = response;

  if (
    isRecord(payload) &&
    "data" in payload
  ) {
    payload = payload.data;
  }

  const rawItems = Array.isArray(payload)
    ? payload
    : isRecord(payload) &&
        Array.isArray(payload.items)
      ? payload.items
      : [];

  const items = rawItems
    .map(normalizeActivity)
    .filter(
      (
        item,
      ): item is ActivityRecord =>
        item !== null,
    );

  return {
    items,
    total:
      isRecord(payload) &&
      typeof payload.total === "number"
        ? payload.total
        : items.length,
    limit: safeLimit,
  };
}