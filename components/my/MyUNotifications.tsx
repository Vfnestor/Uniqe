import Link from "next/link";

import type {
  MyUNotification,
} from "@/lib/my-u/core-data";

type Props = {
  notifications: MyUNotification[];
};

export default function MyUNotifications({
  notifications,
}: Props) {
  return (
    <section className="my-u-core-panel">
      <div className="my-u-core-panel-header">
        <div>
          <span className="section-eyebrow">
            NOTIFICATIONS
          </span>

          <h2>
            اعلان‌های من
          </h2>
        </div>

        <span className="my-u-core-count">
          {
            notifications.filter(
              (item) => !item.read,
            ).length
          }{" "}
          جدید
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="my-u-core-empty">
          اعلان جدیدی وجود ندارد.
        </div>
      ) : (
        <div className="my-u-notification-list">
          {notifications.map(
            (notification) => {
              const content = (
                <>
                  <div className="my-u-notification-icon">
                    {notification.read
                      ? "○"
                      : "●"}
                  </div>

                  <div className="my-u-notification-content">
                    <div className="my-u-notification-top">
                      <span>
                        {
                          notification.areaLabel
                        }
                      </span>

                      {!notification.read && (
                        <span className="my-u-notification-new">
                          جدید
                        </span>
                      )}
                    </div>

                    <h3>
                      {notification.title}
                    </h3>

                    <p>
                      {
                        notification.description
                      }
                    </p>

                    <time>
                      {new Date(
                        notification.createdAt,
                      ).toLocaleDateString(
                        "fa-IR",
                      )}
                    </time>
                  </div>
                </>
              );

              if (
                notification.href
              ) {
                return (
                  <Link
                    key={notification.id}
                    href={
                      notification.href
                    }
                    className={
                      notification.read
                        ? "my-u-notification-item"
                        : "my-u-notification-item my-u-notification-unread"
                    }
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={notification.id}
                  className={
                    notification.read
                      ? "my-u-notification-item"
                      : "my-u-notification-item my-u-notification-unread"
                  }
                >
                  {content}
                </div>
              );
            },
          )}
        </div>
      )}
    </section>
  );
}