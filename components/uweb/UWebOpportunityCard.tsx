import Link from "next/link";

import type {
  UWebOpportunity,
} from "@/lib/uweb/opportunity-data";

const projectTypeLabels: Record<
  UWebOpportunity["project"]["projectType"],
  string
> = {
  new_website: "وب‌سایت جدید",
  redesign: "بازطراحی",
  feature_development: "توسعه قابلیت",
  bug_fix: "رفع خطا",
  maintenance: "نگهداری",
  optimization: "بهینه‌سازی",
  custom: "سفارشی",
};

const platformLabels: Record<
  UWebOpportunity["project"]["platform"],
  string
> = {
  wordpress: "WordPress",
  nextjs: "Next.js",
  react: "React",
  laravel: "Laravel",
  custom: "Custom",
  unknown: "نامشخص",
};

export default function UWebOpportunityCard({
  opportunity,
}: {
  opportunity: UWebOpportunity;
}) {
  const {
    project,
    matchScore,
    matchedSkills,
    requiredSkills,
    applicantsCount,
  } = opportunity;

  return (
    <Link
      href={`/uweb/opportunities/${project.id}`}
      className="uweb-opportunity-card"
    >
      <div className="uweb-opportunity-card-top">
        <span className="uweb-opportunity-number">
          {project.projectNumber}
        </span>

        <span className="uweb-opportunity-match">
          {matchScore}% تطابق
        </span>
      </div>

      <div className="uweb-opportunity-card-main">
        <span className="uweb-opportunity-type">
          {projectTypeLabels[
            project.projectType
          ]}
        </span>

        <h2>{project.title}</h2>

        <p>{project.description}</p>
      </div>

      <div className="uweb-opportunity-meta">
        <span>
          {platformLabels[project.platform]}
        </span>

        <span>
          {matchedSkills}/{requiredSkills} مهارت
        </span>

        <span>
          {applicantsCount} درخواست
        </span>

        <span>
          {project.expectedDurationDays
            ? `${project.expectedDurationDays} روز`
            : "زمان مشخص نشده"}
        </span>
      </div>

      <div className="uweb-opportunity-footer">
        <span>
          {project.budget
            ? `${project.budget.currency} ${project.budget.min?.toLocaleString() ?? "—"} — ${project.budget.max?.toLocaleString() ?? "—"}`
            : "بودجه توافقی"}
        </span>

        <strong>مشاهده فرصت ←</strong>
      </div>
    </Link>
  );
}