import type {
  UWebProjectActivity,
} from "@/lib/uweb/types";

type Props = {
  activities: UWebProjectActivity[];
};

const actionLabels: Record<
  string,
  string
> = {
  workspace_created:
    "فضای کاری ایجاد شد",
  contract_signed:
    "قرارداد ثبت شد",
  milestone_started:
    "مرحله پروژه آغاز شد",
  delivery_submitted:
    "تحویل جدید ثبت شد",
  revision_requested:
    "درخواست اصلاح ثبت شد",
  project_approved:
    "پروژه تأیید شد",
};

export default function UWebWorkspaceActivity({
  activities,
}: Props) {
  return (
    <section className="uweb-workspace-panel">
      <div className="uweb-workspace-panel-heading">
        <span className="section-eyebrow">
          Activity
        </span>

        <h2>
          فعالیت‌های اخیر
        </h2>
      </div>

      <div className="uweb-workspace-activity">
        {activities.map(
          (activity) => (
            <div
              key={activity.id}
              className="uweb-workspace-activity-item"
            >
              <div className="uweb-workspace-activity-dot" />

              <div>
                <strong>
                  {actionLabels[
                    activity.action
                  ] ??
                    activity.action}
                </strong>

                <p>
                  {typeof activity.metadata
                    ?.message ===
                  "string"
                    ? activity
                        .metadata
                        .message
                    : ""}
                </p>

                <small>
                  {new Date(
                    activity.createdAt,
                  ).toLocaleString(
                    "fa-IR",
                  )}
                </small>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}