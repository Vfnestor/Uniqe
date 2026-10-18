import { apiClient } from "./client";
import { apiEndpoints } from "./endpoints";

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  icon?: string | null;
};

export type SearchResponse = {
  results: SearchResult[];
  total: number;
  query: string;
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

  return typeof value === "string" ? value : fallback;
}

function normalizeSearchResult(value: unknown): SearchResult | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, "id");
  const title = readString(value, "title");

  if (!id || !title) {
    return null;
  }

  const iconValue = value.icon;

  return {
    id,
    title,
    description: readString(value, "description"),
    category: readString(value, "category", "عمومی"),
    href: readString(value, "href", "/"),
    icon:
      typeof iconValue === "string" || iconValue === null
        ? iconValue
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
      .filter((item): item is SearchResult => item !== null);

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
    .filter((item): item is SearchResult => item !== null);

  const rawTotal = payload.total;

  return {
    results,
    total:
      typeof rawTotal === "number" && Number.isFinite(rawTotal)
        ? rawTotal
        : results.length,
    query: readString(payload, "query", query),
  };
}

export async function searchUniqe(
  query: string,
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
    throw new Error("عبارت جست‌وجو نباید بیشتر از ۲۰۰ نویسه باشد.");
  }

  const response = await apiClient.get<unknown>(
    `${apiEndpoints.search.query}?q=${encodeURIComponent(normalizedQuery)}`,
  );

  return normalizeSearchResponse(response, normalizedQuery);
}