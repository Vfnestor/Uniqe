import Link from "next/link";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";

const stats = [
  {
    icon: "🎓",
    label: "Classes",
    value: "2",
    description: "Demo classes",
    href: "/admin/uschool/courses",
  },
  {
    icon: "👥",
    label: "Students",
    value: "0",
    description: "Registered students",
    href: "/admin/users",
  },
  {
    icon: "📚",
    label: "Categories",
    value: "3",
    description: "Learning categories",
    href: "/admin/uschool/categories",
  },
  {
    icon: "💳",
    label: "Revenue",
    value: "$0",
    description: "Demo revenue",
    href: "/admin/uschool/courses",
  },
];

const modules = [
  {
    icon: "🎓",
    title: "Classes",
    description: "Create and manage educational classes",
    href: "/admin/uschool/courses",
  },
  {
    icon: "➕",
    title: "Add Class",
    description: "Create a new paid or free class",
    href: "/admin/uschool/courses/new",
  },
  {
    icon: "🗂️",
    title: "Categories",
    description: "Organize classes by learning category",
    href: "/admin/uschool/categories",
  },
];

export default function USchoolAdminPage() {
  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USCHOOL"
        title="USchool"
        description="Manage classes, learning paths, sessions and educational content."
        actions={
          <Link
            href="/admin/uschool/courses/new"
            className="admin-button admin-button-primary"
          >
            + Add Class
          </Link>
        }
      />

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

      <section className="admin-dashboard-panel">
        <div className="admin-panel-header">
          <div>
            <span className="admin-panel-eyebrow">
              USCHOOL MANAGEMENT
            </span>

            <h2>Learning Center</h2>
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
                <span>{module.description}</span>
              </div>

              <span className="admin-module-arrow">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="admin-dashboard-panel">
        <div className="admin-panel-header">
          <div>
            <span className="admin-panel-eyebrow">
              PRODUCT MODEL
            </span>

            <h2>Class Architecture</h2>
          </div>
        </div>

        <div className="admin-uschool-architecture">
          <div>
            <span>01</span>
            <strong>Class</strong>
            <p>Main educational product</p>
          </div>

          <div>
            <span>02</span>
            <strong>Sessions</strong>
            <p>Daily learning units</p>
          </div>

          <div>
            <span>03</span>
            <strong>Access</strong>
            <p>Age and membership control</p>
          </div>

          <div>
            <span>04</span>
            <strong>Payment</strong>
            <p>Free or paid access</p>
          </div>
        </div>
      </section>
    </div>
  );
}