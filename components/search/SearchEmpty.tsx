import Link from "next/link";

type SearchEmptyProps = {
  query: string;
};

export default function SearchEmpty({ query }: SearchEmptyProps) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700">
      <div className="mb-4 text-5xl" aria-hidden="true">
        🔍
      </div>

      <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
        {query
          ? "نتیجه‌ای پیدا نشد"
          : "عبارت موردنظر خود را جست‌وجو کنید"}
      </h2>

      <p className="mx-auto mb-6 max-w-md leading-7 text-gray-600 dark:text-gray-400">
        {query
          ? `برای عبارت «${query}» نتیجه‌ای پیدا نکردیم. املای عبارت را بررسی کنید یا با واژه‌های دیگری جست‌وجو کنید.`
          : "نام برنامه، خدمات یا بخش موردنظر خود را در کادر جست‌وجو وارد کنید."}
      </p>

      {query && (
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          بازگشت به صفحه اصلی
        </Link>
      )}
    </div>
  );
}