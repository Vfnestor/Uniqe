"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useMemo,
  useState,
} from "react";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

type AdminNavItem = {
  href: string;
  icon: string;
  labelEn: string;
  labelFa: string;
};

const primaryNavigation: AdminNavItem[] = [
  {
    href: "/admin",
    icon: "⌂",
    labelEn: "Dashboard",
    labelFa: "داشبورد",
  },
  {
    href: "/admin/ushop",
    icon: "◈",
    labelEn: "UShop",
    labelFa: "فروشگاه",
  },
  {
    href: "/admin/uschool",
    icon: "▣",
    labelEn: "USchool",
    labelFa: "آموزش",
  },
  {
    href: "/admin/uweb",
    icon: "◉",
    labelEn: "UWeb",
    labelFa: "وب",
  },
  {
    href: "/admin/uapps",
    icon: "▦",
    labelEn: "UApps",
    labelFa: "اپلیکیشن‌ها",
  },
  {
    href: "/admin/ucore",
    icon: "◆",
    labelEn: "UCore",
    labelFa: "هسته",
  },
  {
    href: "/admin/lab",
    icon: "⌬",
    labelEn: "LAB",
    labelFa: "آزمایشگاه",
  },
];

const managementNavigation: AdminNavItem[] = [
  {
    href: "/admin/users",
    icon: "◎",
    labelEn: "Users",
    labelFa: "کاربران",
  },
  {
    href: "/admin/content",
    icon: "≡",
    labelEn: "Content",
    labelFa: "محتوا",
  },
  {
    href: "/admin/media",
    icon: "▧",
    labelEn: "Media",
    labelFa: "رسانه",
  },
  {
    href: "/admin/notifications",
    icon: "◌",
    labelEn: "Notifications",
    labelFa: "اعلان‌ها",
  },
  {
    href: "/admin/analytics",
    icon: "⌁",
    labelEn: "Analytics",
    labelFa: "آمار",
  },
];

const systemNavigation: AdminNavItem[] = [
  {
    href: "/admin/settings",
    icon: "⚙",
    labelEn: "Settings",
    labelFa: "تنظیمات",
  },
];

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({
  children,
}: AdminShellProps) {
  const pathname = usePathname();

  const {
    language,
  } = useLanguage();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const isRtl = language === "fa";

  const activePath = useMemo(() => {
    if (pathname === "/admin") {
      return "/admin";
    }

    return pathname;
  }, [pathname]);

  const renderNavigation = (
    items: AdminNavItem[],
  ) => {
    return items.map((item) => {
      const isActive =
        item.href === "/admin"
          ? activePath === "/admin"
          : activePath.startsWith(
              item.href,
            );

      return (
        <Link
          key={item.href}
          href={item.href}
          className={
            isActive
              ? "admin-nav-item admin-nav-item-active"
              : "admin-nav-item"
          }
          onClick={() =>
            setMobileOpen(false)
          }
        >
          <span className="admin-nav-icon">
            {item.icon}
          </span>

          <span className="admin-nav-label">
            {isRtl
              ? item.labelFa
              : item.labelEn}
          </span>

          {isActive ? (
            <span className="admin-nav-active-dot" />
          ) : null}
        </Link>
      );
    });
  };

  return (
    <div
      className="admin-shell"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <aside
        className={
          mobileOpen
            ? "admin-sidebar admin-sidebar-open"
            : "admin-sidebar"
        }
      >
        <div className="admin-sidebar-brand">
          <Link
            href="/admin"
            className="admin-brand"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <span className="admin-brand-mark">
              U
            </span>

            <span className="admin-brand-copy">
              <strong>Uniqe</strong>
              <small>
                {isRtl
                  ? "پنل مدیریت"
                  : "Admin Panel"}
              </small>
            </span>
          </Link>
        </div>

        <div className="admin-sidebar-scroll">
          <div className="admin-nav-section">
            <span className="admin-nav-heading">
              {isRtl
                ? "اکوسیستم"
                : "Ecosystem"}
            </span>

            <nav className="admin-nav">
              {renderNavigation(
                primaryNavigation,
              )}
            </nav>
          </div>

          <div className="admin-nav-section">
            <span className="admin-nav-heading">
              {isRtl
                ? "مدیریت"
                : "Management"}
            </span>

            <nav className="admin-nav">
              {renderNavigation(
                managementNavigation,
              )}
            </nav>
          </div>

          <div className="admin-nav-section">
            <span className="admin-nav-heading">
              {isRtl
                ? "سیستم"
                : "System"}
            </span>

            <nav className="admin-nav">
              {renderNavigation(
                systemNavigation,
              )}
            </nav>
          </div>
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-status">
            <span className="admin-status-dot" />

            <span>
              {isRtl
                ? "سیستم آنلاین"
                : "System Online"}
            </span>
          </div>

          <span className="admin-version">
            v0.1
          </span>
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          className="admin-sidebar-backdrop"
          aria-label={
            isRtl
              ? "بستن منو"
              : "Close menu"
          }
          onClick={() =>
            setMobileOpen(false)
          }
        />
      ) : null}

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-start">
            <button
              type="button"
              className="admin-mobile-menu"
              aria-label={
                isRtl
                  ? "باز کردن منو"
                  : "Open menu"
              }
              onClick={() =>
                setMobileOpen(
                  (value) => !value,
                )
              }
            >
              <span />
              <span />
              <span />
            </button>

            <div className="admin-breadcrumb">
              <span>
                Uniqe
              </span>

              <span className="admin-breadcrumb-separator">
                /
              </span>

              <strong>
                {isRtl
                  ? "پنل مدیریت"
                  : "Admin"}
              </strong>
            </div>
          </div>

          <div className="admin-topbar-actions">
            <Link
              href="/"
              className="admin-view-site"
            >
              <span>↗</span>

              {isRtl
                ? "مشاهده سایت"
                : "View Site"}
            </Link>

            <div className="admin-user">
              <span className="admin-user-avatar">
                U
              </span>

              <span className="admin-user-copy">
                <strong>
                  {isRtl
                    ? "مالک"
                    : "Owner"}
                </strong>

                <small>
                  {isRtl
                    ? "دسترسی کامل"
                    : "Full Access"}
                </small>
              </span>
            </div>
          </div>
        </header>

        <main className="admin-content">
          {children}
        </main>
      </section>
    </div>
  );
}