"use client";

import Link from "next/link";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

const stats = [
  {
    key: "users",
    icon: "◎",
    value: "—",
    en: "Users",
    fa: "کاربران",
    noteEn: "Ready for database",
    noteFa: "آماده اتصال به دیتابیس",
  },
  {
    key: "orders",
    icon: "◈",
    value: "—",
    en: "Orders",
    fa: "سفارش‌ها",
    noteEn: "UShop",
    noteFa: "UShop",
  },
  {
    key: "products",
    icon: "◇",
    value: "4",
    en: "Products",
    fa: "محصولات",
    noteEn: "Demo products",
    noteFa: "محصولات آزمایشی",
  },
  {
    key: "modules",
    icon: "◆",
    value: "7",
    en: "Modules",
    fa: "ماژول‌ها",
    noteEn: "Ecosystem",
    noteFa: "اکوسیستم",
  },
];

const quickActions = [
  {
    href: "/admin/ushop",
    icon: "◈",
    en: "Manage UShop",
    fa: "مدیریت UShop",
  },
  {
    href: "/admin/users",
    icon: "◎",
    en: "Manage Users",
    fa: "مدیریت کاربران",
  },
  {
    href: "/admin/content",
    icon: "≡",
    en: "Manage Content",
    fa: "مدیریت محتوا",
  },
  {
    href: "/admin/settings",
    icon: "⚙",
    en: "System Settings",
    fa: "تنظیمات سیستم",
  },
];

export default function AdminDashboard() {
  const {
    language,
  } = useLanguage();

  const isRtl = language === "fa";

  return (
    <div className="admin-dashboard">
      <section className="admin-hero">
        <div>
          <span className="admin-eyebrow">
            {isRtl
              ? "CENTRAL CONTROL"
              : "CENTRAL CONTROL"}
          </span>

          <h1>
            {isRtl
              ? "به پنل مدیریت Uniqe خوش آمدید"
              : "Welcome to Uniqe Admin"}
          </h1>

          <p>
            {isRtl
              ? "مرکز کنترل تمام بخش‌های اکوسیستم Uniqe."
              : "The central control center for the entire Uniqe ecosystem."}
          </p>
        </div>

        <div className="admin-hero-mark">
          U
        </div>
      </section>

      <section className="admin-stats-grid">
        {stats.map((stat) => (
          <article
            key={stat.key}
            className="admin-stat-card"
          >
            <div className="admin-stat-top">
              <span className="admin-stat-icon">
                {stat.icon}
              </span>

              <span className="admin-stat-live">
                {isRtl
                  ? "سیستم"
                  : "SYSTEM"}
              </span>
            </div>

            <div className="admin-stat-value">
              {stat.value}
            </div>

            <div className="admin-stat-label">
              {isRtl
                ? stat.fa
                : stat.en}
            </div>

            <div className="admin-stat-note">
              {isRtl
                ? stat.noteFa
                : stat.noteEn}
            </div>
          </article>
        ))}
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-panel admin-quick-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-panel-kicker">
                {isRtl
                  ? "دسترسی سریع"
                  : "QUICK ACCESS"}
              </span>

              <h2>
                {isRtl
                  ? "عملیات سریع"
                  : "Quick Actions"}
              </h2>
            </div>
          </div>

          <div className="admin-actions-grid">
            {quickActions.map(
              (action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="admin-action-card"
                >
                  <span className="admin-action-icon">
                    {action.icon}
                  </span>

                  <span>
                    {isRtl
                      ? action.fa
                      : action.en}
                  </span>

                  <span className="admin-action-arrow">
                    ↗
                  </span>
                </Link>
              ),
            )}
          </div>
        </article>

        <article className="admin-panel admin-activity-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-panel-kicker">
                {isRtl
                  ? "فعالیت"
                  : "ACTIVITY"}
              </span>

              <h2>
                {isRtl
                  ? "آخرین فعالیت‌ها"
                  : "Recent Activity"}
              </h2>
            </div>
          </div>

          <div className="admin-empty-activity">
            <span className="admin-empty-icon">
              ◌
            </span>

            <strong>
              {isRtl
                ? "هنوز فعالیتی ثبت نشده"
                : "No activity yet"}
            </strong>

            <p>
              {isRtl
                ? "با اتصال دیتابیس و سیستم احراز هویت، فعالیت‌ها اینجا نمایش داده می‌شوند."
                : "Activity will appear here once the database and authentication layer are connected."}
            </p>
          </div>
        </article>
      </section>

      <section className="admin-system-banner">
        <div className="admin-system-banner-icon">
          ✓
        </div>

        <div>
          <strong>
            {isRtl
              ? "Admin Foundation فعال است"
              : "Admin Foundation is active"}
          </strong>

          <p>
            {isRtl
              ? "این نسخه اسکلت اولیه پنل مدیریت است. Authentication، Permission و Database در فازهای بعدی اضافه خواهند شد."
              : "This is the initial administration foundation. Authentication, permissions and database integration will be added in later phases."}
          </p>
        </div>

        <span className="admin-system-badge">
          PHASE 1
        </span>
      </section>
    </div>
  );
}
