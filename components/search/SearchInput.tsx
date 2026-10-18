"use client";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative">
      <label htmlFor="uniqe-search" className="sr-only">
        جست‌وجو در یونیک
      </label>

      <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:focus-within:ring-blue-950">
        <span aria-hidden="true" className="text-xl">
          🔎
        </span>

        <input
          id="uniqe-search"
          type="search"
          dir="auto"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={200}
          placeholder="دنبال چه چیزی می‌گردید؟"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-1 text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
        />

        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="پاک کردن عبارت جست‌وجو"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            ×
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        نام برنامه، خدمات یا بخش موردنظر خود را وارد کنید.
      </p>
    </div>
  );
}