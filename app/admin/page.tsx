import Link from "next/link";

const stats = [
  {
    icon: "👥",
    label: "Users",
    value: "0",
    description: "Registered users",
    href: "/admin/users",
  },
  {
    icon: "🛍️",
    label: "UShop",
    value: "0",
    description: "Products",
    href: "/admin/ushop",
  },
  {
    icon: "🎓",
    label: "USchool",
    value: "0",
    description: "Courses",
    href: "/admin/uschool",
  },
  {
    icon: "🌐",
    label: "UWeb",
    value: "0",
    description: "Projects",
    href: "/admin/uweb",
  },
];

const modules = [
  {
    icon: "📱",
    title: "UApps",
    description: "Applications and app projects",
    status: "Ready",
    href: "/admin/uapps",
  },
  {
    icon: "🧠",
    title: "UCore",
    description: "Core services and infrastructure",
    status: "Ready",
    href: "/admin/ucore",
  },
  {
    icon: "🧪",
    title: "LAB",
    description: "Experiments and research",
    status: "Ready",
    href: "/admin/lab",
  },
];

const quickActions = [
  {
    icon: "➕",
    title: "Add Product",
    description: "Create a new UShop product",
    href: "/admin/ushop",
  },
  {
    icon: "📚",
    title: "Manage Courses",
    description: "Open USchool management",
    href: "/admin/uschool",
  },
  {
    icon: "👤",
    title: "Manage Users",
    description: "View and manage users",
    href: "/admin/users",
  },
  {
    icon: "⚙️",
    title: "Settings",
    description: "System configuration",
    href: "/admin/settings",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      <section className="admin-dashboard-header">
        <div>
          <span className="admin-dashboard-eyebrow">
            UNIQE CONTROL CENTER
          </span>

          <h1>Dashboard</h1>

          <p>
            Welcome to the central administration panel of Uniqe.
          </p>
        </div>

        <div className="admin-dashboard-status">
          <span className="admin-status-dot" />
          System Online
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
                ECOSYSTEM
              </span>

              <h2>Uniqe Modules</h2>
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
                QUICK ACCESS
              </span>

              <h2>Quick Actions</h2>
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
                  <span>{action.description}</span>
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
              SYSTEM ACTIVITY
            </span>

            <h2>Recent Activity</h2>
          </div>

          <span className="admin-live-label">
            LIVE
          </span>
        </div>

        <div className="admin-empty-activity">
          <div className="admin-empty-icon">
            ◌
          </div>

          <strong>No activity yet</strong>

          <span>
            System activity will appear here once users and
            modules start generating events.
          </span>
        </div>
      </section>
    </div>
  );
}