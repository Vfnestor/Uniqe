import type {
  UWebProject,
} from "@/lib/uweb/types";

type Props = {
  project: UWebProject;
  milestonesCount: number;
  deliveriesCount: number;
  revisionsCount: number;
};

export default function UWebWorkspaceOverview({
  project,
  milestonesCount,
  deliveriesCount,
  revisionsCount,
}: Props) {
  return (
    <section className="uweb-workspace-overview">
      <div className="uweb-workspace-overview-header">
        <div>
          <span className="section-eyebrow">
            Project Workspace
          </span>

          <h1>
            {project.title}
          </h1>

          <p>
            فضای مرکزی اجرای پروژه، مدیریت
            مراحل، تحویل‌ها و فعالیت‌های
            پروژه.
          </p>
        </div>

        <div className="uweb-workspace-project-number">
          {project.projectNumber}
        </div>
      </div>

      <div className="uweb-workspace-stats">
        <div>
          <strong>
            {milestonesCount}
          </strong>

          <span>
            Milestone
          </span>
        </div>

        <div>
          <strong>
            {deliveriesCount}
          </strong>

          <span>
            تحویل
          </span>
        </div>

        <div>
          <strong>
            {revisionsCount}
          </strong>

          <span>
            اصلاح
          </span>
        </div>

        <div>
          <strong>
            {project.expectedDurationDays ??
              "—"}
          </strong>

          <span>
            روز پروژه
          </span>
        </div>
      </div>
    </section>
  );
}