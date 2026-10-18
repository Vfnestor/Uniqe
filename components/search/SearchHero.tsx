export default function SearchHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-blue-700 via-indigo-700 to-violet-800 px-6 py-10 text-white sm:px-10 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-1/3 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
          <span aria-hidden="true">✨</span>
          جست‌وجوی هوشمند در اکوسیستم یونیک
        </div>

        <h1 className="mb-4 text-3xl font-extrabold leading-tight sm:text-5xl">
          چه چیزی را جست‌وجو می‌کنید؟
        </h1>

        <p className="mx-auto max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
          برنامه‌ها، خدمات، ابزارها و بخش‌های مختلف یونیک را در یک مکان پیدا
          کنید.
        </p>
      </div>
    </section>
  );
}