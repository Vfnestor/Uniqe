import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type { SearchResult } from "./search-data";

type SearchResultsProps = {
  results: SearchResult[];
  query: string;
};

export default function SearchResults({
  results,
  query,
}: SearchResultsProps) {
  return (
    <section className="search-results section">
      <Container>
        <div className="search-results-heading">
          <div>
            <span className="section-eyebrow">
              Search Results
            </span>

            <h2 className="section-title">
              {query
                ? `Results for "${query}"`
                : "Explore Uniqe"}
            </h2>
          </div>

          <span className="search-results-count">
            {results.length
              .toString()
              .padStart(2, "0")}{" "}
            results
          </span>
        </div>

        <div className="search-results-grid">
          {results.map((result, index) => (
            <Reveal
              key={result.id}
              animation="up"
              delay={80 + index * 60}
            >
              <Card
                hover
                className="search-result-card"
              >
                <a
                  href={result.href}
                  className="search-result-link"
                >
                  <div className="search-result-top">
                    <span className="search-result-icon">
                      {result.icon}
                    </span>

                    <span className="search-result-category">
                      {result.category}
                    </span>
                  </div>

                  <div className="search-result-content">
                    <h3>{result.title}</h3>

                    <p>
                      {result.description}
                    </p>
                  </div>

                  <div className="search-result-bottom">
                    <span>
                      Open
                    </span>

                    <span className="search-result-arrow">
                      ↗
                    </span>
                  </div>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}