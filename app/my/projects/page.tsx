import Link from "next/link";

import "@/components/my/my-uweb.css";

import Container from "@/components/ui/Container";

import {
  getMyUWebProjects,
} from "@/lib/my-u/my-uweb-data";

export default function MyProjectsPage() {
  const projects =
    getMyUWebProjects();

  return (
    <main className="my-uweb-page">
      <Container>
        <div className="my-uweb-breadcrumb">
          <Link href="/my-uweb">
            My U
          </Link>

          <span>←</span>

          <span>
            پروژه‌های من
          </span>
        </div>

        <section className="my-uweb-panel">
          <div className="my-uweb-panel-header">
            <div>
              <span className="section-eyebrow">
                My U / Projects
              </span>

              <h2>
                پروژه‌های من
              </h2>
            </div>

            <Link
              href="/uweb/order"
              className="my-uweb-primary-action"
            >
              پروژه جدید
              <span>←</span>
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="my-uweb-empty">
              هنوز پروژه‌ای ندارید.
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
                        بروزرسانی:{" "}
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
      </Container>
    </main>
  );
}