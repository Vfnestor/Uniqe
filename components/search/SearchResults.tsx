import Link from "next/link";
import type { SearchResult } from "./search-data";

type SearchResultsProps = {
  results: SearchResult[];
  query: string;
};

export default function SearchResults({
  results,
  query,
}: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {query ? "نتایج جست‌وجو" : "بخش‌های پیشنهادی یونیک"}
        </h2>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {results.length} نتیجه
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <Link
            key={result.id}
            href={result.href}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:hover:border-blue-500"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl dark:bg-gray-800">
                {result.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-gray-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {result.title}
                  </h3>

                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {result.category}
                  </span>
                </div>

                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {result.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end text-sm font-medium text-blue-600 dark:text-blue-400">
              مشاهده بخش
              <span className="mr-2 transition-transform group-hover:-translate-x-1">
                ←
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}