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

const STAFF_PERMISSIONS: AdminPermission[] = [
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

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const router = useRouter();

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

  /*
   * =========================================================
   * SESSION
   * =========================================================
   */

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

  /*
   * =========================================================
   * MOBILE BODY LOCK
   * =========================================================
   */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileOpen]);

  /*
   * =========================================================
   * ESCAPE
   * =========================================================
   */

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

  /*
   * =========================================================
   * CLOSE DRAWER AFTER NAVIGATION
   * =========================================================
   */

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /*
   * =========================================================
   * PERMISSION
   * =========================================================
   */

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
     * Owner has complete access.
     */

    if (role === "owner") {
      return true;
    }

    /*
     * Customer has no admin access.
     */

    if (role === "customer") {
      return false;
    }

    /*
     * Staff permissions.
     */

    return STAFF_PERMISSIONS.includes(
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

  /*
   * =========================================================
   * ROLE LABEL
   * =========================================================
   */

  const roleLabel =
    role
      ? ROLE_LABELS[role][
          language === "fa"
            ? "fa"
            : "en"
        ]
      : "";

  /*
   * =========================================================
   * LOGOUT
   * =========================================================
   */

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
       * Redirect anyway.
       */
    } finally {
      setMobileOpen(false);

      router.replace(
        "/admin/login",
      );

      router.refresh();
    }
  }

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

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

  /*
   * =========================================================
   * SHELL
   * =========================================================
   */

  const shellDirection =
    language === "fa"
      ? "admin-shell-rtl"
      : "admin-shell-ltr";

  return (
    <div
      className={`admin-shell ${shellDirection}`}
      dir={
        language === "fa"
          ? "rtl"
          : "ltr"
      }
    >
      {/* ===================================================
          SIDEBAR
          =================================================== */}

      <aside
        className={`admin-sidebar ${
          mobileOpen
            ? "admin-sidebar-open"
            : ""
        }`}
      >
        {/* SIDEBAR BRAND */}

        <div className="admin-sidebar-brand">
          <div className="admin-brand">
            <div className="admin-brand-mark">
              U
            </div>

            <div className="admin-brand-copy">
              <strong>
                Uniqe
              </strong>

              <small>
                Admin Panel
              </small>
            </div>
          </div>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() =>
              setMobileOpen(false)
            }
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* ROLE */}

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

        {/* SIDEBAR SCROLL */}

        <div className="admin-sidebar-scroll">
          <nav className="admin-nav">
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
                        ? "admin-nav-item-active"
                        : ""
                    }`}
                    onClick={() => {
                      setMobileOpen(
                        false,
                      );

                      router.push(
                        item.href,
                      );
                    }}
                  >
                    <span className="admin-nav-icon">
                      {item.icon}
                    </span>

                    <span className="admin-nav-label">
                      {item.label}
                    </span>

                    {active && (
                      <span className="admin-nav-active-dot" />
                    )}
                  </button>
                );
              },
            )}
          </nav>
        </div>

        {/* FOOTER */}

        <div className="admin-sidebar-footer">
          <div>
            <div className="admin-status">
              <span className="admin-status-dot" />

              <span>
                {language === "fa"
                  ? "سیستم فعال"
                  : "System Online"}
              </span>
            </div>

            <div className="admin-version">
              {roleLabel}
            </div>
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

      {/* ===================================================
          MOBILE OVERLAY
          =================================================== */}

      {mobileOpen && (
        <button
          type="button"
          className="admin-mobile-overlay"
          onClick={() =>
            setMobileOpen(false)
          }
          aria-label="Close menu"
        />
      )}

      {/* ===================================================
          MAIN
          =================================================== */}

      <main className="admin-main">
        {/* TOPBAR */}

        <header className="admin-topbar">
          {/* MOBILE HEADER */}

          <div className="admin-mobile-header">
            <button
              type="button"
              className="admin-mobile-menu"
              onClick={() =>
                setMobileOpen(true)
              }
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>

            <div className="admin-mobile-title">
              <strong>
                Uniqe
              </strong>

              <small>
                Admin Panel
              </small>
            </div>
          </div>

          {/* DESKTOP START */}

          <div className="admin-topbar-start">
            <div className="admin-breadcrumb">
              <span>
                UNIQE
              </span>

              <span className="admin-breadcrumb-separator">
                /
              </span>

              <strong>
                Admin
              </strong>
            </div>
          </div>

          {/* TOPBAR ACTIONS */}

          <div className="admin-topbar-actions">
            <div className="admin-user">
              <div className="admin-user-avatar">
                U
              </div>

              <div className="admin-user-copy">
                <strong>
                  {roleLabel}
                </strong>

                <small>
                  Uniqe Admin
                </small>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <section className="admin-content">
          {children}
        </section>
      </main>
    </div>
  );
}