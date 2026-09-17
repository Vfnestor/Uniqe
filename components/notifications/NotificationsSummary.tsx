"use client";

type NotificationsSummaryProps = {
  total: number;
  unread: number;
};

export default function NotificationsSummary({
  total,
  unread,
}: NotificationsSummaryProps) {
  return (
    <section className="notifications-summary section">
      <div className="container">
        <div className="notifications-summary-grid">
          <div className="notification-summary-card surface">
            <span className="notification-summary-icon">
              ◇
            </span>

            <div>
              <span className="notification-summary-label">
                Total notifications
              </span>

              <strong className="notification-summary-value">
                {total.toString().padStart(2, "0")}
              </strong>
            </div>
          </div>

          <div className="notification-summary-card surface">
            <span className="notification-summary-icon">
              ●
            </span>

            <div>
              <span className="notification-summary-label">
                Unread
              </span>

              <strong className="notification-summary-value">
                {unread.toString().padStart(2, "0")}
              </strong>
            </div>
          </div>

          <div className="notification-summary-card surface">
            <span className="notification-summary-icon">
              ✓
            </span>

            <div>
              <span className="notification-summary-label">
                Status
              </span>

              <strong className="notification-summary-status">
                Connected
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}