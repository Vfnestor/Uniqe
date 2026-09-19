import type {
  UWebMilestone,
} from "@/lib/uweb/types";

type Props = {
  milestones: UWebMilestone[];
};

const statusLabels: Record<
  UWebMilestone["status"],
  string
> = {
  pending: "در انتظار",
  in_progress: "در حال اجرا",
  submitted: "ارسال شده",
  approved: "تأیید شده",
  revision: "در حال اصلاح",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
};

export default function UWebWorkspaceMilestones({
  milestones,
}: Props) {
  return (
    <section className="uweb-workspace-panel">
      <div className="uweb-workspace-panel-heading">
        <span className="section-eyebrow">
          Milestones
        </span>

        <h2>
          مراحل پروژه
        </h2>
      </div>

      <div className="uweb-workspace-milestones">
        {milestones.map(
          (milestone) => (
            <article
              key={milestone.id}
              className="uweb-workspace-milestone"
            >
              <div className="uweb-workspace-milestone-number">
                {milestone.order}
              </div>

              <div className="uweb-workspace-milestone-content">
                <div className="uweb-workspace-milestone-top">
                  <div>
                    <h3>
                      {milestone.title}
                    </h3>

                    <p>
                      {milestone.description}
                    </p>
                  </div>

                  <span
                    className={`uweb-workspace-milestone-status uweb-workspace-milestone-status-${milestone.status}`}
                  >
                    {
                      statusLabels[
                        milestone.status
                      ]
                    }
                  </span>
                </div>

                <div className="uweb-workspace-milestone-dates">
                  <span>
                    شروع:{" "}
                    {milestone.startAt
                      ? new Date(
                          milestone.startAt,
                        ).toLocaleDateString(
                          "fa-IR",
                        )
                      : "—"}
                  </span>

                  <span>
                    موعد:{" "}
                    {milestone.dueAt
                      ? new Date(
                          milestone.dueAt,
                        ).toLocaleDateString(
                          "fa-IR",
                        )
                      : "—"}
                  </span>
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}