export default function SearchLoading() {
  return (
    <main
      aria-label="در حال بارگذاری صفحه جست‌وجو"
      className="container mx-auto max-w-7xl animate-pulse px-4 py-8"
    >
      <div className="rounded-3xl bg-gray-200 px-6 py-14 dark:bg-gray-800">
        <div className="mx-auto h-8 max-w-sm rounded-lg bg-gray-300 dark:bg-gray-700" />
        <div className="mx-auto mt-5 h-4 max-w-xl rounded bg-gray-300 dark:bg-gray-700" />
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="h-16 rounded-2xl bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
              <div className="flex-1">
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-3 h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
            <div className="mt-6 h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        ))}
      </div>
    </main>
  );
}