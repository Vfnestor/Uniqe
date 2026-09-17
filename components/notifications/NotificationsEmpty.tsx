"use client";

type NotificationsEmptyProps = {
  filter: string;
};

export default function NotificationsEmpty({
  filter,
}: NotificationsEmptyProps) {
  return (
    <div className="notifications-empty surface">
      <div className="notifications-empty-icon">
        ◇
      </div>

      <span className="section-eyebrow">
        Notifications
      </span>

      <h2>
        Nothing here yet.
      </h2>

      <p>
        {filter === "all"
          ? "You are all caught up. New notifications will appear here."
          : "There are no notifications in this category right now."}
      </p>
    </div>
  );
}