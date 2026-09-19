import type {
  UWebProject,
} from "@/lib/uweb/types";

type Props = {
  project: UWebProject;
};

export default function UWebWorkspaceRequirements({
  project,
}: Props) {
  return (
    <section className="uweb-workspace-panel">
      <div className="uweb-workspace-panel-heading">
        <span className="section-eyebrow">
          Requirements
        </span>

        <h2>
          نیازمندی‌های پروژه
        </h2>
      </div>

      <div className="uweb-workspace-requirements">
        <div>
          <strong>
            هدف پروژه
          </strong>

          <div className="uweb-workspace-tags">
            {project.purpose.map(
              (item) => (
                <span key={item}>
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <strong>
            قابلیت‌ها
          </strong>

          <div className="uweb-workspace-tags">
            {project.features.map(
              (item) => (
                <span key={item}>
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <strong>
            طراحی
          </strong>

          <div className="uweb-workspace-tags">
            {project.designRequirements.map(
              (item) => (
                <span key={item}>
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div>
          <strong>
            محتوا
          </strong>

          <div className="uweb-workspace-tags">
            {project.contentRequirements.map(
              (item) => (
                <span key={item}>
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="uweb-workspace-description">
        <strong>
          توضیحات پروژه
        </strong>

        <p>
          {project.description}
        </p>
      </div>
    </section>
  );
}