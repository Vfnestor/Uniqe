export default function MyULoading() {
  return (
    <main
      className="my-u-page"
      dir="rtl"
      aria-busy="true"
      aria-live="polite"
    >
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "48px 20px",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            marginBottom: "24px",
            border: "4px solid #e5e7eb",
            borderTopColor: "#52525b",
            borderRadius: "50%",
            animation: "myULoadingSpin 0.8s linear infinite",
          }}
          aria-hidden="true"
        />

        <h1>
          در حال آماده‌سازی فضای کاربری
        </h1>

        <p>
          لطفاً چند لحظه صبر کنید؛ اطلاعات
          حساب و فعالیت‌های شما در حال بارگذاری است.
        </p>

        <style>
          {`
            @keyframes myULoadingSpin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </section>
    </main>
  );
}