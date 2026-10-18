"use client";

import { useEffect } from "react";

type SearchErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SearchError({
  error,
  reset,
}: SearchErrorProps) {
  useEffect(() => {
    console.error("Search page error:", error);
  }, [error]);

  return (
    <main className="container mx-auto flex min-h-[50vh] max-w-3xl items-center justify-center px-4 py-12">
      <section
        role="alert"
        className="w-full rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-gray-900"
      >
        <div className="mb-4 text-5xl" aria-hidden="true">
          ⚠️
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          بارگذاری جست‌وجو با مشکل مواجه شد
        </h1>

        <p className="mb-6 leading-7 text-gray-600 dark:text-gray-400">
          هنگام نمایش این صفحه مشکلی رخ داد. می‌توانید دوباره تلاش کنید.
        </p>

        {process.env.NODE_ENV !== "production" && error.message && (
          <pre className="mb-6 overflow-x-auto rounded-lg bg-gray-100 p-3 text-left text-xs text-red-700 dark:bg-gray-800 dark:text-red-300">
            {error.message}
          </pre>
        )}

        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          تلاش دوباره
        </button>
      </section>
    </main>
  );
}