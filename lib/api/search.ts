import { apiClient } from "./client";
import { apiEndpoints } from "./endpoints";

export type SearchResultType =
  | "uapp"
  | "course"
  | "category"
  | "knowledge";

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: string;
  type: SearchResultType | "unknown";
  href: string;
  icon?: string | null;
  updatedAt?: string;
};

export type SearchResponse = {
  results: SearchResult[];
  total: number;
  query: string;
};

export type SearchOptions = {
  limit?: number;
};

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function readString(
  record: UnknownRecord,
  key: string,
  fallback = "",
): string {
  const value = record[key];

  return typeof value === "string"
    ? value
    : fallback;
}

function normalizeSearchType(
  value: unknown,
): SearchResultType | "unknown" {
  if (typeof value !== "string") {
    return "unknown";
  }

  switch (value.toLowerCase()) {
    case "uapp":
      return "uapp";
    case "course":
      return "course";
    case "category":
      return "category";
    case "knowledge":
      return "knowledge";
    default:
      return "unknown";
  }
}

function safeHref(value: unknown): string {
  if (typeof value !== "string") {
    return "/";
  }

  const href = value.trim();

  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.includes("\\")
  ) {
    return "/";
  }

  return href;
}

function normalizeSearchResult(
  value: unknown,
): SearchResult | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, "id");
  const title = readString(value, "title");

  if (!id || !title) {
    return null;
  }

  const type = normalizeSearchType(value.type);

  const category = readString(
    value,
    "category",
    type === "unknown" ? "عمومی" : type,
  );

  const iconValue = value.icon;

  return {
    id,
    title,
    description: readString(value, "description"),
    category,
    type,
    href: safeHref(value.href),
    icon:
      typeof iconValue === "string" ||
      iconValue === null
        ? iconValue
        : undefined,
    updatedAt:
      typeof value.updatedAt === "string"
        ? value.updatedAt
        : undefined,
  };
}

function normalizeSearchResponse(
  value: unknown,
  query: string,
): SearchResponse {
  let payload: unknown = value;

  if (isRecord(payload) && "data" in payload) {
    payload = payload.data;
  }

  if (Array.isArray(payload)) {
    const results = payload
      .map(normalizeSearchResult)
      .filter(
        (item): item is SearchResult =>
          item !== null,
      );

    return {
      results,
      total: results.length,
      query,
    };
  }

  if (!isRecord(payload)) {
    return {
      results: [],
      total: 0,
      query,
    };
  }

  const rawResults = Array.isArray(payload.results)
    ? payload.results
    : Array.isArray(payload.items)
      ? payload.items
      : [];

  const results = rawResults
    .map(normalizeSearchResult)
    .filter(
      (item): item is SearchResult =>
        item !== null,
    );

  return {
    results,
    total:
      typeof payload.total === "number" &&
      Number.isFinite(payload.total)
        ? Math.max(0, payload.total)
        : results.length,
    query: readString(payload, "query", query),
  };
}

export async function searchUniqe(
  query: string,
  options: SearchOptions = {},
): Promise<SearchResponse> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return {
      results: [],
      total: 0,
      query: "",
    };
  }

  if (normalizedQuery.length > 200) {
    throw new Error(
      "عبارت جست‌وجو نباید بیشتر از ۲۰۰ نویسه باشد.",
    );
  }

  const requestedLimit = Number(options.limit ?? 20);

  const limit = Number.isFinite(requestedLimit)
    ? Math.min(
        50,
        Math.max(1, Math.trunc(requestedLimit)),
      )
    : 20;

  const params = new URLSearchParams({
    q: normalizedQuery,
    limit: String(limit),
  });

  const response = await apiClient.get<unknown>(
    `${apiEndpoints.search.query}?${params.toString()}`,
  );

  return normalizeSearchResponse(
    response,
    normalizedQuery,
  );
}