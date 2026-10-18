export default function NotificationsLoading() {
  return (
    <main
      className="notifications-page"
      aria-busy="true"
      aria-live="polite"
    >
      <section className="section">
        <div className="container">
          <p role="status">
            Loading your notifications...
          </p>
        </div>
      </section>
    </main>
  );
}