"use client";

type NotificationsSummaryProps = {
  total: number;
  unread: number;
  isMarkingAllRead?: boolean;
  onMarkAllRead?: () => void;
};

export default function NotificationsSummary({
  total,
  unread,
  isMarkingAllRead = false,
  onMarkAllRead,
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

          <div className="notification-summary-card surface notification-summary-action-card">
            <span className="notification-summary-icon">
              ✓
            </span>

            <div className="notification-summary-action-content">
              <span className="notification-summary-label">
                Notification actions
              </span>

              {onMarkAllRead && (
                <button
                  type="button"
                  className="notification-mark-all-button"
                  onClick={onMarkAllRead}
                  disabled={
                    unread === 0 ||
                    isMarkingAllRead
                  }
                >
                  {isMarkingAllRead
                    ? "Saving..."
                    : unread === 0
                      ? "All caught up"
                      : "Mark all as read"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}