"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

import type {
  AdminPermission,
  AdminRole,
} from "@/lib/auth/permissions";

type AdminSessionResponse = {
  authenticated: boolean;
  role?: AdminRole;
};

type AdminNavItem = {
  href: string;
  icon: string;
  label: string;
  permission?: AdminPermission;
};

const NAV_ITEMS: AdminNavItem[] = [
  {
    href: "/admin",
    icon: "⌂",
    label: "Dashboard",
    permission: "admin.access",
  },

  {
    href: "/admin/ushop",
    icon: "🛒",
    label: "UShop",
    permission: "ushop.view",
  },

  {
    href: "/admin/uschool",
    icon: "🎓",
    label: "USchool",
    permission: "uschool.view",
  },

  {
    href: "/admin/uweb",
    icon: "◉",
    label: "UWeb",
    permission: "uweb.view",
  },

  {
    href: "/admin/uapps",
    icon: "▣",
    label: "UApps",
    permission: "uapps.view",
  },

  {
    href: "/admin/ucore",
    icon: "◆",
    label: "UCore",
    permission: "ucore.view",
  },

  {
    href: "/admin/lab",
    icon: "⌬",
    label: "LAB",
    permission: "lab.view",
  },

  {
    href: "/admin/users",
    icon: "♙",
    label: "Users",
    permission: "users.view",
  },

  {
    href: "/admin/content",
    icon: "▤",
    label: "Content",
    permission: "content.view",
  },

  {
    href: "/admin/media",
    icon: "▧",
    label: "Media",
    permission: "media.view",
  },

  {
    href: "/admin/notifications",
    icon: "♢",
    label: "Notifications",
    permission:
      "notifications.view",
  },

  {
    href: "/admin/settings",
    icon: "⚙",
    label: "Settings",
    permission:
      "settings.view",
  },
];

const ROLE_LABELS: Record<
  AdminRole,
  {
    en: string;
    fa: string;
  }
> = {
  owner: {
    en: "Owner",
    fa: "مالک",
  },

  staff: {
    en: "Staff",
    fa: "کارمند",
  },

  customer: {
    en: "Customer",
    fa: "کاربر",
  },
};

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const { language } =
    useLanguage();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const [role, setRole] =
    useState<AdminRole | null>(null);

  const [loadingSession, setLoadingSession] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const response =
          await fetch(
            "/api/admin/session",
            {
              method: "GET",
              cache: "no-store",
            },
          );

        if (!response.ok) {
          throw new Error(
            "Session request failed.",
          );
        }

        const data =
          (await response.json()) as AdminSessionResponse;

        if (!mounted) {
          return;
        }

        if (
          !data.authenticated ||
          !data.role
        ) {
          router.replace(
            "/admin/login",
          );

          return;
        }

        setRole(data.role);
      } catch {
        if (!mounted) {
          return;
        }

        router.replace(
          "/admin/login",
        );
      } finally {
        if (mounted) {
          setLoadingSession(false);
        }
      }
    }

    loadSession();

    return () => {
      mounted = false;
    };
  }, [router]);

  useEffect(() => {
    document.body.style.overflow =
      mobileOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function handleEscape(
      event: KeyboardEvent,
    ) {
      if (
        event.key === "Escape"
      ) {
        setMobileOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function hasPermission(
    permission?: AdminPermission,
  ) {
    if (!permission) {
      return true;
    }

    if (!role) {
      return false;
    }

    /*
     * Owner currently has full access.
     * Staff permissions will be enforced
     * by the server authorization layer.
     *
     * The UI uses the same permission names
     * so it is ready for the next role phase.
     */

    if (role === "owner") {
      return true;
    }

    if (role === "customer") {
      return false;
    }

    const staffPermissions: AdminPermission[] =
      [
        "admin.access",

        "ushop.view",
        "ushop.manage",
        "ushop.orders",

        "uschool.view",
        "uschool.manage",

        "uweb.view",
        "uweb.manage",

        "uapps.view",
        "uapps.manage",

        "ucore.view",
        "ucore.manage",

        "lab.view",
        "lab.manage",

        "users.view",

        "content.view",
        "content.manage",

        "media.view",
        "media.manage",

        "notifications.view",
        "notifications.manage",

        "analytics.view",
      ];

    return staffPermissions.includes(
      permission,
    );
  }

  const visibleNavItems =
    NAV_ITEMS.filter(
      (item) =>
        hasPermission(
          item.permission,
        ),
    );

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await fetch(
        "/api/admin/logout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
        },
      );
    } catch {
      /*
       * Even if the request fails,
       * redirect to login.
       */
    } finally {
      setMobileOpen(false);

      router.replace(
        "/admin/login",
      );

      router.refresh();
    }
  }

  const roleLabel =
    role
      ? ROLE_LABELS[role][
          language === "fa"
            ? "fa"
            : "en"
        ]
      : "";

  if (loadingSession) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-loading-card">
          <div className="admin-loading-spinner" />

          <span>
            Loading Admin Panel...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside
        className={`admin-sidebar ${
          mobileOpen
            ? "is-open"
            : ""
        }`}
      >
        <div className="admin-sidebar-header">
          <div className="admin-brand">
            <div className="admin-brand-mark">
              U
            </div>

            <div className="admin-brand-copy">
              <strong>
                Uniqe
              </strong>

              <span>
                Admin Panel
              </span>
            </div>
          </div>

          <button
            type="button"
            className="admin-mobile-close"
            onClick={() =>
              setMobileOpen(false)
            }
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <div className="admin-sidebar-role">
          <span className="admin-sidebar-role-label">
            {language === "fa"
              ? "سطح دسترسی"
              : "Access Level"}
          </span>

          <strong>
            {roleLabel}
          </strong>
        </div>

        <nav className="admin-sidebar-nav">
          {visibleNavItems.map(
            (item) => {
              const active =
                item.href ===
                "/admin"
                  ? pathname ===
                    "/admin"
                  : pathname ===
                      item.href ||
                    pathname.startsWith(
                      `${item.href}/`,
                    );

              return (
                <button
                  key={item.href}
                  type="button"
                  className={`admin-nav-item ${
                    active
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() => {
                    router.push(
                      item.href,
                    );

                    setMobileOpen(
                      false,
                    );
                  }}
                >
                  <span className="admin-nav-icon">
                    {item.icon}
                  </span>

                  <span className="admin-nav-label">
                    {item.label}
                  </span>
                </button>
              );
            },
          )}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-footer-top">
            <span className="admin-owner-badge">
              {roleLabel}
            </span>
          </div>

          <button
            type="button"
            className="admin-logout-button"
            onClick={
              handleLogout
            }
            disabled={
              loggingOut
            }
          >
            <span className="admin-logout-icon">
              ↪
            </span>

            <span className="admin-logout-label">
              {loggingOut
                ? language ===
                  "fa"
                  ? "در حال خروج..."
                  : "Logging out..."
                : language ===
                    "fa"
                  ? "خروج"
                  : "Logout"}
            </span>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="admin-sidebar-overlay"
          onClick={() =>
            setMobileOpen(false)
          }
          aria-label="Close menu"
        />
      )}

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-mobile-menu"
              onClick={() =>
                setMobileOpen(true)
              }
              aria-label="Open menu"
            >
              ☰
            </button>

            <div>
              <span className="admin-topbar-eyebrow">
                UNIQE
              </span>

              <h1>
                Admin Panel
              </h1>
            </div>
          </div>

          <div className="admin-topbar-right">
            <span className="admin-topbar-role">
              {roleLabel}
            </span>

            <span className="admin-owner-badge">
              {role === "owner"
                ? "OWNER"
                : role === "staff"
                  ? "STAFF"
                  : "CUSTOMER"}
            </span>
          </div>
        </header>

        <section className="admin-content">
          {children}
        </section>
      </main>
    </div>
  );
}