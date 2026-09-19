import Link from "next/link";

import type {
  UWebAdminProject,
} from "@/lib/uweb/admin-data";

type Props = {
  projects: UWebAdminProject[];
};

export default function UWebAdminProjects({
  projects,
}: Props) {
  return (
    <section className="uweb-admin-panel">
      <div className="uweb-admin-panel-header">
        <div>
          <span className="section-eyebrow">
            Projects
          </span>

          <h2>
            پروژه‌ها
          </h2>
        </div>

        <Link
          href="/admin/uweb/projects"
          className="uweb-admin-text-link"
        >
          مشاهده همه
          <span>←</span>
        </Link>
      </div>

      <div className="uweb-admin-table-wrap">
        <table className="uweb-admin-table">
          <thead>
            <tr>
              <th>پروژه</th>
              <th>مشتری</th>
              <th>متخصص</th>
              <th>وضعیت</th>
              <th>درخواست</th>
            </tr>
          </thead>

          <tbody>
            {projects.map(
              ({
                project,
                clientName,
                professionalName,
                applicationsCount,
              }) => (
                <tr key={project.id}>
                  <td>
                    <Link
                      href={`/admin/uweb/projects/${project.id}`}
                    >
                      <strong>
                        {project.projectNumber}
                      </strong>

                      <span>
                        {project.title}
                      </span>
                    </Link>
                  </td>

                  <td>
                    {clientName}
                  </td>

                  <td>
                    {professionalName}
                  </td>

                  <td>
                    <span className="uweb-admin-badge">
                      {project.status}
                    </span>
                  </td>

                  <td>
                    {applicationsCount}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}