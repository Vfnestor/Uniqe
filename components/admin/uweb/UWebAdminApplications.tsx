import Link from "next/link";

import type {
  UWebAdminApplication,
} from "@/lib/uweb/admin-data";

type Props = {
  applications: UWebAdminApplication[];
};

export default function UWebAdminApplications({
  applications,
}: Props) {
  return (
    <section className="uweb-admin-panel">
      <div className="uweb-admin-panel-header">
        <div>
          <span className="section-eyebrow">
            Applications
          </span>

          <h2>
            درخواست‌های متخصصان
          </h2>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="uweb-admin-empty">
          درخواست جدیدی وجود ندارد.
        </div>
      ) : (
        <div className="uweb-admin-list">
          {applications.map(
            (application) => (
              <div
                key={application.id}
                className="uweb-admin-list-item"
              >
                <div>
                  <span className="uweb-admin-muted">
                    {application.projectNumber}
                  </span>

                  <h3>
                    {application.professionalName}
                  </h3>

                  <p>
                    {application.message}
                  </p>
                </div>

                <div className="uweb-admin-list-side">
                  <strong>
                    {application.proposedPrice
                      ? `$${application.proposedPrice}`
                      : "—"}
                  </strong>

                  <span>
                    {application.status}
                  </span>

                  <Link
                    href={`/admin/uweb/projects/${application.projectId}`}
                  >
                    مشاهده پروژه
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </section>
  );
}