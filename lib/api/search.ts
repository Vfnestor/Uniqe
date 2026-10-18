import {
  apiClient,
} from "./client";

import {
  apiEndpoints,
} from "./endpoints";

export type SearchResultType =
  | "uapp"
  | "course"
  | "category"
  | "knowledge";

export type SearchResult = {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  category?: string;
  href: string;
  icon?: string;
  updatedAt: string;
};

export type SearchResponse = {
  query: string;
  total: number;
  results: SearchResult[];
};

export type SearchOptions = {
  query: string;
  limit?: number;
};

export async function searchUniqe(
  options: SearchOptions,
): Promise<SearchResponse> {
  const query = options.query.trim();

  if (!query) {
    return {
      query: "",
      total: 0,
      results: [],
    };
  }

  const params = new URLSearchParams();

  params.set("q", query);

  if (options.limit !== undefined) {
    params.set(
      "limit",
      String(options.limit),
    );
  }

  const result =
    await apiClient.get<SearchResponse>(
      `${apiEndpoints.search.query}?${params.toString()}`,
    );

  return {
    query: result.query,
    total: result.total,
    results: Array.isArray(result.results)
      ? result.results
      : [],
  };
}