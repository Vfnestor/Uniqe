import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type { UWebProject } from "@/lib/uweb/types";

type UWebProjectDetailsProps = {
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
  web_app: "وب‌اپلیکیشن",
  landing_page: "Landing Page",
  custom: "پروژه سفارشی",
};

const websiteTypeLabels: Record<UWebProject["websiteType"], string> = {
  corporate: "شرکتی",
  ecommerce: "فروشگاهی",
  blog: "وبلاگ / مجله",
  portfolio: "Portfolio",
  portal: "پرتال / پلتفرم",
  custom: "سفارشی",
};

const platformLabels: Record<UWebProject["platform"], string> = {
  wordpress: "WordPress",
  nextjs: "Next.js",
  custom: "Custom",
};

const experienceLabels: Record<
  "junior" | "mid" | "senior" | "expert",
  string
> = {
  junior: "Junior",
  mid: "Mid-level",
  senior: "Senior",
  expert: "Expert",
};

export default function UWebProjectDetails({
  project,
}: UWebProjectDetailsProps) {
  return (
    <section className="uweb-project-details-page">
      <Container>
        <Reveal animation="fade">
          <Link
            href="/uweb/projects"
            className="uweb-project-back"
          >
            ← بازگشت به پروژه‌ها
          </Link>
        </Reveal>

        <div className="uweb-project-details-layout">
          <main>
            <Reveal animation="up">
              <header className="uweb-project-details-header">
                <div className="uweb-project-details-topline">
                  <span>
                    {project.projectNumber}
                  </span>

                  <span
                    className={`uweb-project-status uweb-project-status-${project.status}`}
                  >
                    {statusLabels[project.status]}
                  </span>
                </div>

                <h1>{project.title}</h1>

                <p>{project.description}</p>
              </header>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <section className="uweb-project-panel">
                <div className="uweb-project-panel-heading">
                  <span className="section-eyebrow">
                    Project summary
                  </span>

                  <h2>خلاصه پروژه</h2>
                </div>

                <div className="uweb-project-summary-grid">
                  <div>
                    <span>نوع پروژه</span>
                    <strong>
                      {projectTypeLabels[
                        project.projectType
                      ]}
                    </strong>
                  </div>

                  <div>
                    <span>نوع وب‌سایت</span>
                    <strong>
                      {websiteTypeLabels[
                        project.websiteType
                      ]}
                    </strong>
                  </div>

                  <div>
                    <span>پلتفرم</span>
                    <strong>
                      {platformLabels[
                        project.platform
                      ]}
                    </strong>
                  </div>

                  <div>
                    <span>هدف</span>
                    <strong>{project.purpose}</strong>
                  </div>

                  <div>
                    <span>بودجه</span>
                    <strong>
                      {project.budget.currency}{" "}
                      {project.budget.min.toLocaleString()}{" "}
                      —{" "}
                      {project.budget.max.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>مدت زمان</span>
                    <strong>
                      {project.durationDays} روز
                    </strong>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal animation="up" delay={150}>
              <section className="uweb-project-panel">
                <div className="uweb-project-panel-heading">
                  <span className="section-eyebrow">
                    Requirements
                  </span>

                  <h2>نیازمندی‌های پروژه</h2>
                </div>

                <div className="uweb-project-requirements">
                  <div>
                    <span>قابلیت‌ها</span>

                    <div className="uweb-project-tags">
                      {project.features.map((feature) => (
                        <span key={feature}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span>طراحی</span>

                    <div className="uweb-project-tags">
                      {project.design.map((item) => (
                        <span key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span>محتوا</span>
                    <p>
                      {project.content.status}
                    </p>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal animation="up" delay={200}>
              <section className="uweb-project-panel">
                <div className="uweb-project-panel-heading">
                  <span className="section-eyebrow">
                    Required skills
                  </span>

                  <h2>مهارت‌های موردنیاز</h2>
                </div>

                <div className="uweb-required-skills">
                  {project.requiredSkills.map((skill) => (
                    <div
                      key={skill.skillId}
                      className="uweb-required-skill"
                    >
                      <div>
                        <strong>
                          {skill.name}
                        </strong>

                        <span>
                          {skill.required
                            ? "الزامی"
                            : "ترجیحی"}
                        </span>
                      </div>

                      <small>
                        {experienceLabels[
                          skill.experienceLevel
                        ]}
                      </small>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal animation="up" delay={250}>
              <section className="uweb-project-panel">
                <div className="uweb-project-panel-heading">
                  <span className="section-eyebrow">
                    Timeline
                  </span>

                  <h2>زمان‌بندی</h2>
                </div>

                <div className="uweb-project-timeline">
                  <div className="uweb-project-timeline-line" />

                  <div className="uweb-project-timeline-item">
                    <span>01</span>

                    <div>
                      <strong>تعریف پروژه</strong>
                      <p>
                        نیازمندی‌های اولیه پروژه مشخص شده است.
                      </p>
                    </div>
                  </div>

                  <div className="uweb-project-timeline-item">
                    <span>02</span>

                    <div>
                      <strong>تطبیق متخصص</strong>
                      <p>
                        پروژه آماده بررسی توسط متخصصان
                        مناسب است.
                      </p>
                    </div>
                  </div>

                  <div className="uweb-project-timeline-item">
                    <span>03</span>

                    <div>
                      <strong>اجرای پروژه</strong>
                      <p>
                        پس از انتخاب متخصص و تکمیل قرارداد،
                        پروژه وارد Workspace خواهد شد.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>
          </main>

          <aside className="uweb-project-details-sidebar">
            <Reveal animation="scale">
              <div className="uweb-project-action-card">
                <span className="section-eyebrow">
                  Project status
                </span>

                <strong>
                  {statusLabels[project.status]}
                </strong>

                <p>
                  این پروژه در مرحله فعلی UWeb قرار دارد.
                </p>

                <Button href="/uweb/opportunities">
                  مشاهده فرصت‌های مرتبط
                </Button>
              </div>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <div className="uweb-project-side-card">
                <span>Project ID</span>
                <strong>{project.id}</strong>
              </div>
            </Reveal>

            <Reveal animation="up" delay={150}>
              <div className="uweb-project-side-card">
                <span>Client</span>
                <strong>{project.clientId}</strong>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>
    </section>
  );
}