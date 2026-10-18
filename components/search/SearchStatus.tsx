type SearchStatusProps = {
  isLoading: boolean;
  error: string | null;
};

export default function SearchStatus({
  isLoading,
  error,
}: SearchStatusProps) {
  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-blue-50 px-4 py-4 text-sm text-blue-800 dark:bg-blue-950 dark:text-blue-200"
      >
        <span
          aria-hidden="true"
          className="h-5 w-5 animate-spin rounded-full border-2 border-blue-300 border-t-blue-700 dark:border-blue-700 dark:border-t-blue-200"
        />
        در حال جست‌وجو...
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-center text-sm leading-6 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
      >
        {error}
      </div>
    );
  }

  return null;
}