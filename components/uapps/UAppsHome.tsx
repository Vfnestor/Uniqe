"use client";

import UAppsSection from "@/components/uapps/UAppsSection";
import UAppsSearchPanel from "@/components/uapps/UAppsSearchPanel";
import UAppsActionPanel from "@/components/uapps/UAppsActionPanel";

const userApps = [
  {
    id: "user-01",
    name: "Smart Finance",
    category: "مالی و مدیریت",
    description: "مدیریت ساده و هوشمند امور مالی شخصی.",
    icon: "₿",
    accent: "blue",
  },
  {
    id: "user-02",
    name: "Task Flow",
    category: "بهره‌وری",
    description: "مدیریت کارها و برنامه‌ریزی روزانه.",
    icon: "✓",
    accent: "purple",
  },
  {
    id: "user-03",
    name: "Quick Notes",
    category: "یادداشت",
    description: "ثبت سریع ایده‌ها و یادداشت‌های روزانه.",
    icon: "✎",
    accent: "green",
  },
  {
    id: "user-04",
    name: "Auto Desk",
    category: "اتوماسیون",
    description: "خودکارسازی فرایندهای تکراری.",
    icon: "↗",
    accent: "orange",
  },
];

const uniqeApps = [
  {
    id: "uniqe-01",
    name: "My U",
    category: "اکوسیستم Uniqe",
    description: "مرکز مدیریت هویت، سرویس‌ها و فعالیت‌های شما.",
    icon: "U",
    accent: "blue",
  },
  {
    id: "uniqe-02",
    name: "UApps",
    category: "نرم‌افزار",
    description: "مرکز کشف و دسترسی به نرم‌افزارهای دیجیتال.",
    icon: "◆",
    accent: "purple",
  },
  {
    id: "uniqe-03",
    name: "UWeb",
    category: "وب",
    description: "فضای مدیریت پروژه‌ها و خدمات وب.",
    icon: "W",
    accent: "green",
  },
  {
    id: "uniqe-04",
    name: "UService",
    category: "خدمات",
    description: "اتصال کاربران به خدمات تخصصی.",
    icon: "S",
    accent: "orange",
  },
];

const externalApps = [
  {
    id: "external-01",
    name: "Notion",
    category: "Productivity",
    description: "Workspace for notes, projects and knowledge.",
    icon: "N",
    accent: "black",
  },
  {
    id: "external-02",
    name: "Canva",
    category: "Design",
    description: "Create designs, presentations and visual content.",
    icon: "C",
    accent: "pink",
  },
  {
    id: "external-03",
    name: "Todoist",
    category: "Productivity",
    description: "Organize tasks and manage your daily work.",
    icon: "✓",
    accent: "red",
  },
  {
    id: "external-04",
    name: "Figma",
    category: "Design",
    description: "Collaborative interface design and prototyping.",
    icon: "F",
    accent: "purple",
  },
];

export default function UAppsHome() {
  return (
    <main className="uapps-page">
      <section className="uapps-hero">
        <div className="uapps-container">
          <div className="uapps-hero-content">
            <span className="uapps-eyebrow">
              UNIQE APPLICATION ECOSYSTEM
            </span>

            <h1>
              کشف، ساخت و انتشار
              <span> نرم‌افزار</span>
            </h1>

            <p>
              UApps مرکز کشف، دسترسی، ساخت و انتشار
              نرم‌افزارهای دیجیتال در اکوسیستم Uniqe است.
            </p>

            <div className="uapps-hero-meta">
              <span>نرم‌افزارهای کاربران</span>
              <span>نرم‌افزارهای Uniqe</span>
              <span>Google Play</span>
              <span>App Store</span>
            </div>
          </div>
        </div>
      </section>

      <div className="uapps-container uapps-main">
        <UAppsSection
          title="ساخته‌شده توسط کاربران"
          subtitle="نرم‌افزارهایی که توسط اعضای اکوسیستم Uniqe ساخته شده‌اند."
          icon="👥"
          apps={userApps}
        />

        <UAppsSection
          title="ساخته‌شده توسط Uniqe"
          subtitle="محصولات و نرم‌افزارهای رسمی اکوسیستم Uniqe."
          icon="◆"
          apps={uniqeApps}
        />

        <UAppsSection
          title="نرم‌افزارهای جدید"
          subtitle="نمایی از نرم‌افزارهای منتخب فروشگاه‌های خارجی."
          icon="🌍"
          apps={externalApps}
        />

        <UAppsSearchPanel />

        <UAppsActionPanel />
      </div>
    </main>
  );
}