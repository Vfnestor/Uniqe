import Link from "next/link";
import type { UWebProject } from "@/lib/uweb/types";

type UWebProjectCardProps = {
  project: UWebProject;
};

const statusLabels: Record<UWebProject["status"], string> = {
  draft: "پیش‌نویس",
  submitted: "ارسال شده",
  under_review: "در حال بررسی",
  matching: "در حال تطبیق",
  professional_selected: "متخصص انتخاب شده",
  contract_pending: "در انتظار قرارداد",
  contract_signed: "قرارداد امضا شده",
  in_progress: "در حال اجرا",
  submitted_for_review: "در انتظار بررسی",
  revision: "در حال اصلاح",
  approved: "تأیید شده",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
  disputed: "اختلاف",
  suspended: "معلق",
};

const projectTypeLabels: Record<UWebProject["projectType"], string> = {
  new_website: "وب‌سایت جدید",
  redesign: "بازطراحی",
  feature_development: "توسعه قابلیت",
  bug_fix: "رفع خطا",
  maintenance: "نگهداری",
  optimization: "بهینه‌سازی",
  custom: "سفارشی",
};

const platformLabels: Record<UWebProject["platform"], string> = {
  wordpress: "WordPress",
  nextjs: "Next.js",
  react: "React",
  laravel: "Laravel",
  custom: "Custom",
  unknown: "نامشخص",
};

export default function UWebProjectCard({
  project,
}: UWebProjectCardProps) {
  return (
    <Link
      href={`/uweb/projects/${project.id}`}
      className="uweb-project-card"
    >
      <div className="uweb-project-card-top">
        <span className="uweb-project-number">
          {project.projectNumber}
        </span>

        <span
          className={`uweb-project-status uweb-project-status-${project.status}`}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      <div className="uweb-project-card-content">
        <h2>{project.title}</h2>

        <p>{project.description}</p>
      </div>

      <div className="uweb-project-card-meta">
        <span>
          {projectTypeLabels[project.projectType]}
        </span>

        <span>
          {platformLabels[project.platform]}
        </span>

        {project.budget && (
          <span>
            {project.budget.currency}{" "}
            {project.budget.min?.toLocaleString() ?? "—"} —{" "}
            {project.budget.max?.toLocaleString() ?? "—"}
          </span>
        )}
      </div>

      <div className="uweb-project-card-arrow">
        →
      </div>
    </Link>
  );
}