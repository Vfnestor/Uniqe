export default function MyUSettingsLoading() {
  return (
    <main
      className="my-u-settings-page"
      aria-busy="true"
      aria-label="Loading settings"
    >
      <section className="my-u-settings-hero">
        <div className="container">
          <span className="section-eyebrow">
            UNIQE / MY U / SETTINGS
          </span>

          <h1 className="my-u-settings-title">
            Your account.
            <br />
            <span>Your preferences.</span>
          </h1>

          <p className="my-u-settings-description">
            در حال آماده‌سازی تنظیمات حساب...
          </p>
        </div>
      </section>

      <section className="my-u-settings-content section">
        <div className="container">
          <div className="my-u-settings-form">
            <div className="my-u-settings-panel">
              <p role="status">
                در حال بارگذاری اطلاعات حساب...
              </p>
            </div>

            <div className="my-u-settings-panel">
              <div
                aria-hidden="true"
                style={{
                  height: 180,
                  borderRadius: 12,
                  background:
                    "var(--surface-hover)",
                  opacity: 0.55,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}