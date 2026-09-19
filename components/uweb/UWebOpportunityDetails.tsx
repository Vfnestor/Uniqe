import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type {
  UWebOpportunity,
} from "@/lib/uweb/opportunity-data";

import UWebApplyProject from "./UWebApplyProject";

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
  custom: "پروژه سفارشی",
};

const websiteTypeLabels: Record<
  UWebOpportunity["project"]["websiteType"],
  string
> = {
  corporate: "شرکتی",
  ecommerce: "فروشگاهی",
  education: "آموزشی",
  news: "خبری / مجله",
  personal: "شخصی",
  services: "خدماتی",
  portfolio: "نمونه‌کار",
  booking: "رزرو",
  dashboard: "داشبورد",
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

const experienceLabels: Record<
  "beginner" | "intermediate" | "professional" | "expert",
  string
> = {
  beginner: "مبتدی",
  intermediate: "متوسط",
  professional: "حرفه‌ای",
  expert: "Expert",
};

export default function UWebOpportunityDetails({
  opportunity,
}: {
  opportunity: UWebOpportunity;
}) {
  const { project } = opportunity;

  return (
    <section className="uweb-opportunity-details-page">
      <Container>
        <Reveal animation="fade">
          <Link
            href="/uweb/opportunities"
            className="uweb-opportunity-back"
          >
            ← بازگشت به فرصت‌ها
          </Link>
        </Reveal>

        <div className="uweb-opportunity-details-layout">
          <main>
            <Reveal animation="up">
              <header className="uweb-opportunity-details-header">
                <div className="uweb-opportunity-details-topline">
                  <span>
                    {project.projectNumber}
                  </span>

                  <span className="uweb-opportunity-match large">
                    {opportunity.matchScore}%
                    تطابق
                  </span>
                </div>

                <span className="uweb-opportunity-type">
                  {
                    projectTypeLabels[
                      project.projectType
                    ]
                  }
                </span>

                <h1>{project.title}</h1>

                <p>{project.description}</p>
              </header>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <section className="uweb-opportunity-panel">
                <div className="uweb-opportunity-panel-heading">
                  <span className="section-eyebrow">
                    Project
                  </span>

                  <h2>مشخصات پروژه</h2>
                </div>

                <div className="uweb-opportunity-summary">
                  <div>
                    <span>نوع پروژه</span>

                    <strong>
                      {
                        projectTypeLabels[
                          project.projectType
                        ]
                      }
                    </strong>
                  </div>

                  <div>
                    <span>نوع وب‌سایت</span>

                    <strong>
                      {
                        websiteTypeLabels[
                          project.websiteType
                        ]
                      }
                    </strong>
                  </div>

                  <div>
                    <span>پلتفرم</span>

                    <strong>
                      {
                        platformLabels[
                          project.platform
                        ]
                      }
                    </strong>
                  </div>

                  <div>
                    <span>هدف</span>

                    <strong>
                      {project.purpose.join(
                        "، ",
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>بودجه</span>

                    <strong>
                      {project.budget
                        ? `${project.budget.currency} ${project.budget.min?.toLocaleString() ?? "—"} — ${project.budget.max?.toLocaleString() ?? "—"}`
                        : "توافقی"}
                    </strong>
                  </div>

                  <div>
                    <span>مدت اجرا</span>

                    <strong>
                      {project.expectedDurationDays
                        ? `${project.expectedDurationDays} روز`
                        : "مشخص نشده"}
                    </strong>
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal animation="up" delay={150}>
              <section className="uweb-opportunity-panel">
                <div className="uweb-opportunity-panel-heading">
                  <span className="section-eyebrow">
                    Requirements
                  </span>

                  <h2>نیازمندی‌ها</h2>
                </div>

                <div className="uweb-opportunity-requirements">
                  <div>
                    <span>قابلیت‌ها</span>

                    <div className="uweb-opportunity-tags">
                      {project.features.map(
                        (feature) => (
                          <span key={feature}>
                            {feature}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <span>
                      نیازمندی‌های طراحی
                    </span>

                    <div className="uweb-opportunity-tags">
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
                    <span>
                      نیازمندی‌های محتوا
                    </span>

                    <div className="uweb-opportunity-tags">
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
              </section>
            </Reveal>

            <Reveal animation="up" delay={200}>
              <section className="uweb-opportunity-panel">
                <div className="uweb-opportunity-panel-heading">
                  <span className="section-eyebrow">
                    Skills
                  </span>

                  <h2>
                    مهارت‌های موردنیاز
                  </h2>
                </div>

                <div className="uweb-opportunity-skills">
                  {project.requiredSkills.map(
                    (skill) => (
                      <div
                        key={skill.skillId}
                        className="uweb-opportunity-skill"
                      >
                        <div>
                          <strong>
                            {skill.skillId}
                          </strong>

                          <span>
                            {skill.priority ===
                            "required"
                              ? "الزامی"
                              : "ترجیحی"}
                          </span>
                        </div>

                        <small>
                          {
                            experienceLabels[
                              skill.requiredLevel
                            ]
                          }
                        </small>
                      </div>
                    ),
                  )}
                </div>
              </section>
            </Reveal>

            <Reveal animation="up" delay={250}>
              <section className="uweb-opportunity-panel">
                <div className="uweb-opportunity-panel-heading">
                  <span className="section-eyebrow">
                    Matching
                  </span>

                  <h2>
                    میزان تطابق
                  </h2>
                </div>

                <div className="uweb-opportunity-match-box">
                  <div className="uweb-opportunity-match-score">
                    {opportunity.matchScore}%
                  </div>

                  <div>
                    <strong>
                      تطابق تخمینی شما با پروژه
                    </strong>

                    <p>
                      این مقدار فعلاً بر اساس
                      مهارت‌ها، پلتفرم و
                      وضعیت دسترسی متخصصان
                      نمونه محاسبه می‌شود.
                    </p>
                  </div>
                </div>

                <div className="uweb-opportunity-match-facts">
                  <div>
                    <span>مهارت‌های منطبق</span>

                    <strong>
                      {
                        opportunity.matchedSkills
                      }{" "}
                      از{" "}
                      {
                        opportunity.requiredSkills
                      }
                    </strong>
                  </div>

                  <div>
                    <span>پلتفرم</span>

                    <strong>
                      {opportunity.platformMatch
                        ? "منطبق"
                        : "نیازمند بررسی"}
                    </strong>
                  </div>

                  <div>
                    <span>دسترسی</span>

                    <strong>
                      {opportunity.availabilityMatch
                        ? "در دسترس"
                        : "نیازمند بررسی"}
                    </strong>
                  </div>
                </div>
              </section>
            </Reveal>
          </main>

          <aside className="uweb-opportunity-sidebar">
            <Reveal animation="scale">
              <UWebApplyProject
                opportunity={opportunity}
              />
            </Reveal>

            <Reveal animation="up" delay={100}>
              <div className="uweb-opportunity-side-card">
                <span>درخواست‌های فعلی</span>

                <strong>
                  {opportunity.applicantsCount}
                </strong>
              </div>
            </Reveal>

            <Reveal animation="up" delay={150}>
              <div className="uweb-opportunity-side-card">
                <span>آخرین مهلت درخواست</span>

                <strong>
                  {opportunity.applicationDeadline
                    ? new Date(
                        opportunity.applicationDeadline,
                      ).toLocaleDateString(
                        "fa-IR",
                      )
                    : "بدون مهلت"}
                </strong>
              </div>
            </Reveal>
          </aside>
        </div>
      </Container>
    </section>
  );
}