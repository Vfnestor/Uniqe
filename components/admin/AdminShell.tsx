"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
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

  const isRtl = language === "fa";

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const activePath = useMemo(
    () => pathname || "/admin",
    [pathname],
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty(
        "overflow",
      );
    }

    return () => {
      document.body.style.removeProperty(
        "overflow",
      );
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [mobileOpen]);

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
          onClick={() =>
            setMobileOpen(false)
          }
          className={
            isActive
              ? "admin-nav-item admin-nav-item-active"
              : "admin-nav-item"
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

          {isActive && (
            <span className="admin-nav-active-dot" />
          )}
        </Link>
      );
    });
  };

  return (
    <div
      className={
        isRtl
          ? "admin-shell admin-shell-rtl"
          : "admin-shell admin-shell-ltr"
      }
      dir={isRtl ? "rtl" : "ltr"}
    >
      {mobileOpen && (
        <button
          type="button"
          className="admin-mobile-overlay"
          aria-label={
            isRtl
              ? "بستن منو"
              : "Close menu"
          }
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

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
              <strong>
                Uniqe
              </strong>

              <small>
                {isRtl
                  ? "پنل مدیریت"
                  : "Admin Panel"}
              </small>
            </span>
          </Link>

          <button
            type="button"
            className="admin-sidebar-close"
            aria-label={
              isRtl
                ? "بستن منو"
                : "Close menu"
            }
            onClick={() =>
              setMobileOpen(false)
            }
          >
            ×
          </button>
        </div>

        <div className="admin-sidebar-scroll">
          <section className="admin-nav-section">
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
          </section>

          <section className="admin-nav-section">
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
          </section>

          <section className="admin-nav-section">
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
          </section>
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

      <section className="admin-main">
        <header className="admin-topbar">

          {/* MOBILE RIGHT SIDE */}
          <div className="admin-mobile-header">
            <button
              type="button"
              className="admin-mobile-menu"
              aria-label={
                isRtl
                  ? "باز کردن منو"
                  : "Open menu"
              }
              aria-expanded={mobileOpen}
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

            <div className="admin-mobile-title">
              <strong>
                Uniqe
              </strong>

              <small>
                {isRtl
                  ? "پنل مدیریت"
                  : "Admin Panel"}
              </small>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="admin-topbar-start">
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
              <span>
                ↗
              </span>

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