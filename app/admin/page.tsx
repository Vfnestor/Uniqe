"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function AdminDashboardPage() {
  const { language, t } = useLanguage();

  const text = t.text as Record<string, string>;

  const tr = (key: string, fallback: string) =>
    language === "fa"
      ? text[key] || fallback
      : fallback;

  const stats = [
    {
      icon: "👥",
      label: tr("Users", "Users"),
      value: "0",
      description: tr(
        "Registered users",
        "Registered users",
      ),
      href: "/admin/users",
    },
    {
      icon: "🛍️",
      label: "UShop",
      value: "0",
      description: tr(
        "Products",
        "Products",
      ),
      href: "/admin/ushop",
    },
    {
      icon: "🎓",
      label: "USchool",
      value: "0",
      description: tr(
        "Courses",
        "Courses",
      ),
      href: "/admin/uschool",
    },
    {
      icon: "🌐",
      label: "UWeb",
      value: "0",
      description: tr(
        "Projects",
        "Projects",
      ),
      href: "/admin/uweb",
    },
  ];

  const modules = [
    {
      icon: "📱",
      title: "UApps",
      description: tr(
        "Applications and app projects",
        "Applications and app projects",
      ),
      status: tr("Ready", "Ready"),
      href: "/admin/uapps",
    },
    {
      icon: "🧠",
      title: "UCore",
      description: tr(
        "Core services and infrastructure",
        "Core services and infrastructure",
      ),
      status: tr("Ready", "Ready"),
      href: "/admin/ucore",
    },
    {
      icon: "🧪",
      title: "LAB",
      description: tr(
        "Experiments and research",
        "Experiments and research",
      ),
      status: tr("Ready", "Ready"),
      href: "/admin/lab",
    },
  ];

  const quickActions = [
    {
      icon: "➕",
      title: tr("Add Product", "Add Product"),
      description: tr(
        "Create a new UShop product",
        "Create a new UShop product",
      ),
      href: "/admin/ushop",
    },
    {
      icon: "📚",
      title: tr("Manage Courses", "Manage Courses"),
      description: tr(
        "Open USchool management",
        "Open USchool management",
      ),
      href: "/admin/uschool",
    },
    {
      icon: "👤",
      title: tr("Manage Users", "Manage Users"),
      description: tr(
        "View and manage users",
        "View and manage users",
      ),
      href: "/admin/users",
    },
    {
      icon: "⚙️",
      title: tr("Settings", "Settings"),
      description: tr(
        "System configuration",
        "System configuration",
      ),
      href: "/admin/settings",
    },
  ];

  return (
    <div className="admin-dashboard">
      <section className="admin-dashboard-header">
        <div>
          <span className="admin-dashboard-eyebrow">
            UNIQE CONTROL CENTER
          </span>

          <h1>
            {tr("Dashboard", "Dashboard")}
          </h1>

          <p>
            {tr(
              "Welcome to the central administration panel of Uniqe.",
              "Welcome to the central administration panel of Uniqe.",
            )}
          </p>
        </div>

        <div className="admin-dashboard-status">
          <span className="admin-status-dot" />
          {tr("System Online", "System Online")}
        </div>
      </section>

      <section className="admin-stat-grid">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="admin-stat-card"
          >
            <div className="admin-stat-icon">
              {stat.icon}
            </div>

            <div className="admin-stat-content">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.description}</small>
            </div>
          </Link>
        ))}
      </section>

      <section className="admin-dashboard-grid">
        <div className="admin-dashboard-panel">
          <div className="admin-panel-header">
            <div>
              <span className="admin-panel-eyebrow">
                {tr("ECOSYSTEM", "ECOSYSTEM")}
              </span>

              <h2>
                {tr("Uniqe Modules", "Uniqe Modules")}
              </h2>
            </div>
          </div>

          <div className="admin-module-list">
            {modules.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className="admin-module-item"
              >
                <div className="admin-module-icon">
                  {module.icon}
                </div>

                <div className="admin-module-info">
                  <strong>{module.title}</strong>

                  <span>
                    {module.description}
                  </span>
                </div>

                <span className="admin-module-status">
                  {module.status}
                </span>

                <span className="admin-module-arrow">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="admin-dashboard-panel">
          <div className="admin-panel-header">
            <div>
              <span className="admin-panel-eyebrow">
                {tr("QUICK ACCESS", "QUICK ACCESS")}
              </span>

              <h2>
                {tr("Quick Actions", "Quick Actions")}
              </h2>
            </div>
          </div>

          <div className="admin-quick-actions">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="admin-quick-action"
              >
                <div className="admin-quick-action-icon">
                  {action.icon}
                </div>

                <div>
                  <strong>{action.title}</strong>

                  <span>
                    {action.description}
                  </span>
                </div>

                <span className="admin-quick-action-arrow">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-dashboard-panel admin-activity-panel">
        <div className="admin-panel-header">
          <div>
            <span className="admin-panel-eyebrow">
              {tr(
                "SYSTEM ACTIVITY",
                "SYSTEM ACTIVITY",
              )}
            </span>

            <h2>
              {tr(
                "Recent Activity",
                "Recent Activity",
              )}
            </h2>
          </div>

          <span className="admin-live-label">
            {tr("LIVE", "LIVE")}
          </span>
        </div>

        <div className="admin-empty-activity">
          <div className="admin-empty-icon">
            ◌
          </div>

          <strong>
            {tr(
              "No activity yet",
              "No activity yet",
            )}
          </strong>

          <span>
            {tr(
              "System activity will appear here once users and modules start generating events.",
              "System activity will appear here once users and modules start generating events.",
            )}
          </span>
        </div>
      </section>
    </div>
  );
}