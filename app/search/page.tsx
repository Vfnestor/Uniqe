"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import SearchHero from "@/components/search/SearchHero";
import SearchInput from "@/components/search/SearchInput";
import SearchResults from "@/components/search/SearchResults";
import SearchEmpty from "@/components/search/SearchEmpty";
import SearchStatus from "@/components/search/SearchStatus";

import {
  searchResults as initialResults,
  type SearchResult as UIResult,
} from "@/components/search/search-data";

import {
  searchUniqe,
  type SearchResult as APIResult,
} from "@/lib/api/search";

function mapAPIResult(
  item: APIResult,
): UIResult {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    href: item.href,
    icon: item.icon || "🔎",
    keywords: [
      item.title,
      item.description,
      item.category,
    ],
    sourceType: item.type,
    updatedAt: item.updatedAt,
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const [remoteResults, setRemoteResults] =
    useState<UIResult[]>([]);

  const [remoteTotal, setRemoteTotal] =
    useState(0);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [retryCount, setRetryCount] =
    useState(0);

  const normalizedQuery = query.trim();

  useEffect(() => {
    if (!normalizedQuery) {
      setRemoteResults([]);
      setRemoteTotal(0);
      setIsLoading(false);
      setError(null);
      return;
    }

    let active = true;

    setIsLoading(true);
    setError(null);

    const timeout = window.setTimeout(
      async () => {
        try {
          const response = await searchUniqe(
            normalizedQuery,
          );

          if (!active) {
            return;
          }

          setRemoteResults(
            response.results.map(mapAPIResult),
          );

          setRemoteTotal(response.total);
        } catch {
          if (!active) {
            return;
          }

          setRemoteResults([]);
          setRemoteTotal(0);

          setError(
            "در دریافت نتایج جست‌وجو مشکلی پیش آمد. اتصال به سرور را بررسی کنید و دوباره تلاش کنید.",
          );
        } finally {
          if (active) {
            setIsLoading(false);
          }
        }
      },
      300,
    );

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [normalizedQuery, retryCount]);

  const visibleResults = useMemo(() => {
    if (normalizedQuery) {
      return remoteResults;
    }

    return initialResults;
  }, [normalizedQuery, remoteResults]);

  function retrySearch() {
    setRetryCount((current) => current + 1);
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <SearchHero />

      <section className="mx-auto mt-8 max-w-3xl">
        <SearchInput
          value={query}
          onChange={setQuery}
        />
      </section>

      <SearchStatus
        isLoading={isLoading}
        error={error}
        onRetry={retrySearch}
      />

      {!isLoading && !error && (
        <section className="mt-8">
          {visibleResults.length > 0 ? (
            <SearchResults
              results={visibleResults}
              query={normalizedQuery}
              total={
                normalizedQuery
                  ? remoteTotal
                  : visibleResults.length
              }
            />
          ) : (
            <SearchEmpty query={normalizedQuery} />
          )}
        </section>
      )}
    </main>
  );
}