import Link from "next/link";

import type {
  MyUProjectSummary,
} from "@/lib/my-u/types";

type Props = {
  projects: MyUProjectSummary[];
};

export default function MyUWebProjects({
  projects,
}: Props) {
  return (
    <section className="my-uweb-panel">
      <div className="my-uweb-panel-header">
        <div>
          <span className="section-eyebrow">
            Projects
          </span>

          <h2>
            پروژه‌های من
          </h2>
        </div>

        <Link
          href="/my/projects"
          className="my-uweb-panel-link"
        >
          مشاهده همه
          <span>←</span>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="my-uweb-empty">
          هنوز پروژه‌ای ایجاد نکرده‌اید.
        </div>
      ) : (
        <div className="my-uweb-project-list">
          {projects.map(
            (project) => (
              <Link
                key={project.id}
                href={project.href}
                className="my-uweb-project-item"
              >
                <div className="my-uweb-project-main">
                  <span className="my-uweb-project-number">
                    {project.projectNumber}
                  </span>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    پلتفرم:{" "}
                    {project.platform}
                  </p>
                </div>

                <div className="my-uweb-project-meta">
                  <span
                    className={`my-uweb-status my-uweb-status-${project.status}`}
                  >
                    {project.statusLabel}
                  </span>

                  <small>
                    {new Date(
                      project.updatedAt,
                    ).toLocaleDateString(
                      "fa-IR",
                    )}
                  </small>
                </div>
              </Link>
            ),
          )}
        </div>
      )}
    </section>
  );
}