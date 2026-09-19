import Link from "next/link";

import type {
  MyUActivityItem,
} from "@/lib/my-u/types";

type Props = {
  activities: MyUActivityItem[];
};

export default function MyUWebActivity({
  activities,
}: Props) {
  return (
    <section className="my-uweb-panel">
      <div className="my-uweb-panel-header">
        <div>
          <span className="section-eyebrow">
            Activity
          </span>

          <h2>
            فعالیت‌های اخیر
          </h2>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="my-uweb-empty">
          هنوز فعالیتی ثبت نشده است.
        </div>
      ) : (
        <div className="my-uweb-activity-list">
          {activities.map(
            (activity) => {
              const content = (
                <>
                  <div className="my-uweb-activity-dot" />

                  <div className="my-uweb-activity-content">
                    <strong>
                      {activity.title}
                    </strong>

                    <p>
                      {activity.description}
                    </p>

                    <small>
                      {new Date(
                        activity.createdAt,
                      ).toLocaleString(
                        "fa-IR",
                      )}
                    </small>
                  </div>
                </>
              );

              if (activity.href) {
                return (
                  <Link
                    key={activity.id}
                    href={activity.href}
                    className="my-uweb-activity-item"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={activity.id}
                  className="my-uweb-activity-item"
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