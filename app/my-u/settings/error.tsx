"use client";

import { useEffect } from "react";

type MyUSettingsErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function MyUSettingsError({
  error,
  reset,
}: MyUSettingsErrorProps) {
  useEffect(() => {
    console.error(
      "My U settings route error:",
      error,
    );
  }, [error]);

  return (
    <main className="my-u-settings-page">
      <section className="my-u-settings-content section">
        <div className="container">
          <div
            className="my-u-settings-panel"
            role="alert"
          >
            <span className="section-eyebrow">
              MY U / SETTINGS
            </span>

            <h1 className="my-u-settings-title">
              Something went wrong.
            </h1>

            <p className="my-u-settings-description">
              صفحه تنظیمات به‌درستی بارگذاری نشد.
              دوباره تلاش کنید.
            </p>

            <div className="my-u-settings-actions">
              <button
                type="button"
                className="my-u-settings-button"
                onClick={reset}
              >
                تلاش دوباره
              </button>

              <a
                href="/my-u"
                className="my-u-settings-back"
              >
                بازگشت به My U
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}