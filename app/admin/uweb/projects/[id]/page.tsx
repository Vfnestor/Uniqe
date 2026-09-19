import Link from "next/link";
import { notFound } from "next/navigation";

import "@/components/admin/uweb/uweb-admin.css";

import {
  getUWebAdminProject,
} from "@/lib/uweb/admin-data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UWebAdminProjectPage({
  params,
}: PageProps) {
  const { id } =
    await params;

  const item =
    getUWebAdminProject(id);

  if (!item) {
    notFound();
  }

  const {
    project,
    clientName,
    professionalName,
    applicationsCount,
  } = item;

  return (
    <main className="uweb-admin-page">
      <section className="uweb-admin-panel">
        <div className="uweb-admin-panel-header">
          <div>
            <span className="section-eyebrow">
              Project Details
            </span>

            <h2>
              {project.title}
            </h2>
          </div>

          <span className="uweb-admin-badge">
            {project.status}
          </span>
        </div>

        <div className="uweb-admin-card-grid">
          <article className="uweb-admin-card">
            <span className="uweb-admin-muted">
              Project
            </span>

            <h3>
              {project.projectNumber}
            </h3>

            <p>
              {project.description}
            </p>
          </article>

          <article className="uweb-admin-card">
            <span className="uweb-admin-muted">
              Client
            </span>

            <h3>
              {clientName}
            </h3>

            <p>
              شناسه:{" "}
              {project.clientId}
            </p>
          </article>

          <article className="uweb-admin-card">
            <span className="uweb-admin-muted">
              Professional
            </span>

            <h3>
              {professionalName}
            </h3>

            <p>
              {applicationsCount} درخواست
            </p>
          </article>
        </div>
      </section>

      <section className="uweb-admin-panel">
        <div className="uweb-admin-panel-header">
          <div>
            <span className="section-eyebrow">
              Requirements
            </span>

            <h2>
              نیازمندی‌ها
            </h2>
          </div>
        </div>

        <div className="uweb-admin-card-grid">
          <article className="uweb-admin-card">
            <h3>
              Purpose
            </h3>

            <div className="uweb-admin-tags">
              {project.purpose.map(
                (item) => (
                  <span key={item}>
                    {item}
                  </span>
                ),
              )}
            </div>
          </article>

          <article className="uweb-admin-card">
            <h3>
              Features
            </h3>

            <div className="uweb-admin-tags">
              {project.features.map(
                (item) => (
                  <span key={item}>
                    {item}
                  </span>
                ),
              )}
            </div>
          </article>

          <article className="uweb-admin-card">
            <h3>
              Skills
            </h3>

            <div className="uweb-admin-tags">
              {project.requiredSkills.map(
                (skill) => (
                  <span key={skill.skillId}>
                    {skill.skillId}
                  </span>
                ),
              )}
            </div>
          </article>
        </div>
      </section>

      <div className="uweb-admin-list">
        <Link
          href={`/uweb/workspace/${project.id}`}
          className="uweb-admin-link-item uweb-admin-list-item"
        >
          <div>
            <h3>
              مشاهده Workspace
            </h3>

            <p>
              ورود به فضای اجرای پروژه
            </p>
          </div>

          <span>←</span>
        </Link>

        <Link
          href={`/uweb/contracts/${project.id}`}
          className="uweb-admin-link-item uweb-admin-list-item"
        >
          <div>
            <h3>
              مشاهده قرارداد
            </h3>

            <p>
              مشاهده قرارداد پروژه
            </p>
          </div>

          <span>←</span>
        </Link>
      </div>
    </main>
  );
}