"use client";

import {
  ChangeEvent,
  useMemo,
  useState,
} from "react";

import "@/components/search/search.css";

import SearchHero from "@/components/search/SearchHero";
import SearchInput from "@/components/search/SearchInput";
import SearchResults from "@/components/search/SearchResults";
import SearchEmpty from "@/components/search/SearchEmpty";

import {
  searchResults,
} from "@/components/search/search-data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredResults = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    if (!normalizedQuery) {
      return searchResults;
    }

    return searchResults.filter((result) => {
      const searchableText = [
        result.title,
        result.description,
        result.category,
        ...result.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedQuery
      );
    });
  }, [query]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setQuery(event.target.value);
  };

  return (
    <main className="search-page">
      <SearchHero />

      <section className="search-controls">
        <div className="search-controls-inner">
          <SearchInput
            value={query}
            onChange={handleChange}
          />

          <span className="search-shortcut">
            Search across Uniqe
          </span>
        </div>
      </section>

      {filteredResults.length > 0 ? (
        <SearchResults
          results={filteredResults}
          query={query}
        />
      ) : (
        <SearchEmpty query={query} />
      )}
    </main>
  );
}