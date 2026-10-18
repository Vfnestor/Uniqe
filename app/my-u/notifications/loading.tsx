export default function NotificationsLoading() {
  return (
    <main
      className="notifications-page"
      aria-busy="true"
      aria-live="polite"
    >
      <section className="notifications-hero section">
        <div className="container">
          <span className="section-eyebrow">
            My U / Notifications
          </span>

          <h1 className="notifications-hero-title">
            Stay connected.
          </h1>

          <p
            className="notifications-hero-description"
            role="status"
          >
            Loading your notifications...
          </p>
        </div>
      </section>

      <section className="notifications-content section">
        <div className="container">
          <div className="notifications-list">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="notification-item surface"
                aria-hidden="true"
              >
                <div className="notification-item-icon">
                  ◇
                </div>

                <div className="notification-item-content">
                  <div
                    style={{
                      width: "35%",
                      height: 12,
                      marginBottom: 12,
                      borderRadius: 6,
                      background: "var(--surface-strong)",
                    }}
                  />

                  <div
                    style={{
                      width: "75%",
                      height: 18,
                      marginBottom: 12,
                      borderRadius: 6,
                      background: "var(--surface-strong)",
                    }}
                  />

                  <div
                    style={{
                      width: "90%",
                      height: 12,
                      borderRadius: 6,
                      background: "var(--surface-strong)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}