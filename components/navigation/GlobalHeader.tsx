"use client";

import Link from "next/link";
import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

import LanguageToggle from "@/components/i18n/LanguageToggle";
import ThemeToggle from "@/components/theme/ThemeToggle";

import {
  useAuth,
} from "@/components/auth/AuthProvider";

import {
  clearStoredAuthSession,
} from "@/lib/auth/auth-storage";

import {
  getStoredUserProfile,
  type UserProfile,
} from "@/lib/my-u/profile";

import "./global-header.css";

type AdminSession = {
  authenticated: boolean;
  role?: "owner" | "staff" | "customer";
};

const navigationItems = [
  {
    href: "/",
    key: "home",
  },
  {
    href: "/uapps",
    key: "uapps",
  },
  {
    href: "/uweb",
    key: "uweb",
  },
  {
    href: "/ushop",
    key: "ushop",
  },
  {
    href: "/uschool",
    key: "uschool",
  },
  {
    href: "/ucore",
    key: "ucore",
  },
  {
    href: "/lab",
    key: "lab",
  },
] as const;

export default function GlobalHeader() {
  const {
    t,
  } = useLanguage();

  const {
    state,
  } = useAuth();

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    adminSession,
    setAdminSession,
  ] = useState<AdminSession | null>(
    null,
  );

  const [
    loggingOut,
    setLoggingOut,
  ] = useState(false);

  const [
    profile,
    setProfile,
  ] = useState<UserProfile | null>(
    null,
  );

  const menuRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  useEffect(() => {
    let mounted = true;

    async function checkAdminSession() {
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
          if (mounted) {
            setAdminSession(null);
          }

          return;
        }

        const data =
          (await response.json()) as AdminSession;

        if (
          mounted &&
          data.authenticated
        ) {
          setAdminSession(
            data,
          );
        } else if (mounted) {
          setAdminSession(null);
        }
      } catch {
        if (mounted) {
          setAdminSession(null);
        }
      }
    }

    checkAdminSession();

    const interval =
      window.setInterval(
        checkAdminSession,
        30000,
      );

    return () => {
      mounted = false;

      window.clearInterval(
        interval,
      );
    };
  }, []);

  useEffect(() => {
    function loadProfile() {
      setProfile(
        getStoredUserProfile(),
      );
    }

    loadProfile();

    window.addEventListener(
      "uniqe-profile-updated",
      loadProfile,
    );

    window.addEventListener(
      "storage",
      loadProfile,
    );

    return () => {
      window.removeEventListener(
        "uniqe-profile-updated",
        loadProfile,
      );

      window.removeEventListener(
        "storage",
        loadProfile,
      );
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node,
        )
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const isOwner =
    adminSession?.authenticated &&
    adminSession.role ===
      "owner";

  const isUser =
    !isOwner &&
    state.status ===
      "authenticated" &&
    !!state.user;

  const user =
    isUser
      ? state.user
      : null;

  const fullName =
    profile
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : "";

  const displayName =
    fullName ||
    user?.name ||
    "کاربر Uniqe";

  const avatar =
    profile?.avatar ||
    user?.avatar;

  const username =
    profile?.username
      ? `@${profile.username}`
      : "نام کاربری ثبت نشده";

  const initials =
    displayName
      .trim()
      .charAt(0)
      .toUpperCase() ||
    "U";

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      if (isOwner) {
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
      } else {
        clearStoredAuthSession();
      }
    } catch {
    } finally {
      setAdminSession(null);
      setMenuOpen(false);

      window.location.href =
        "/admin/login";
    }
  }

  function renderProfileButton() {
    if (isOwner) {
      return (
        <button
          type="button"
          className="global-profile-button global-profile-owner-button"
          onClick={() =>
            setMenuOpen(
              (value) =>
                !value,
            )
          }
          aria-expanded={
            menuOpen
          }
          aria-haspopup="menu"
          aria-label="مالک"
        >
          <span className="global-profile-crown">
            ♛
          </span>
        </button>
      );
    }

    if (isUser) {
      return (
        <button
          type="button"
          className="global-profile-button"
          onClick={() =>
            setMenuOpen(
              (value) =>
                !value,
            )
          }
          aria-expanded={
            menuOpen
          }
          aria-haspopup="menu"
          aria-label={
            displayName
          }
        >
          {avatar ? (
            <Image
              src={avatar}
              alt={displayName}
              width={38}
              height={38}
              className="global-profile-avatar"
              unoptimized
            />
          ) : (
            <span className="global-profile-avatar global-profile-initial">
              {initials}
            </span>
          )}
        </button>
      );
    }

    return (
      <Link
        href="/admin/login"
        className="global-login-button"
      >
        <span>
          ورود
        </span>
      </Link>
    );
  }

  return (
    <header className="global-header">
      <div className="global-header-inner">
        <Link
          href="/"
          className="global-header-brand"
          aria-label="Uniqe"
        >
          <span className="global-header-brand-mark">
            U
          </span>

          <span className="global-header-brand-name">
            Uniqe
          </span>
        </Link>

        <nav
          className="global-header-nav"
          aria-label="Main navigation"
        >
          {navigationItems.map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                className="global-header-nav-link"
              >
                {
                  t.navigation[
                    item.key
                  ]
                }
              </Link>
            ),
          )}
        </nav>

        <div className="global-header-actions">
          <LanguageToggle />

          <ThemeToggle />

          <div
            className={`global-profile ${
              isOwner
                ? "global-profile-is-owner"
                : ""
            }`}
            ref={menuRef}
          >
            {renderProfileButton()}

            {menuOpen &&
            (isOwner ||
              isUser) ? (
              <div
                className={`global-profile-menu ${
                  isOwner
                    ? "global-profile-menu-owner"
                    : "global-profile-menu-user"
                }`}
                role="menu"
              >
                <div className="global-profile-user">
                  {isOwner ? (
                    <>
                      <div className="global-profile-owner-badge">
                        <span>
                          ♛
                        </span>

                        <strong>
                          مالک Uniqe
                        </strong>
                      </div>

                      <div className="global-profile-user-email">
                        پنل مدیریت و کنترل سیستم
                      </div>
                    </>
                  ) : (
                    <>
                      {avatar ? (
                        <Image
                          src={avatar}
                          alt={displayName}
                          width={48}
                          height={48}
                          className="global-profile-menu-avatar"
                          unoptimized
                        />
                      ) : (
                        <span className="global-profile-menu-avatar global-profile-menu-initial">
                          {initials}
                        </span>
                      )}

                      <div className="global-profile-user-name">
                        {displayName}
                      </div>

                      <div
                        className="global-profile-user-username"
                        dir="ltr"
                      >
                        {username}
                      </div>
                    </>
                  )}
                </div>

                <div className="global-profile-divider" />

                {isOwner ? (
                  <>
                    <Link
                      href="/admin"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      👑 پنل مالک
                    </Link>

                    <Link
                      href="/admin/users"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      👥 مدیریت کاربران
                    </Link>

                    <Link
                      href="/admin/content"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      📝 مدیریت محتوا
                    </Link>

                    <Link
                      href="/admin/notifications"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      🔔 اعلان‌ها
                    </Link>

                    <Link
                      href="/admin/settings"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      ⚙️ تنظیمات
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/my"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      🏠 My U
                    </Link>

                    <Link
                      href="/my/profile"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      👤 پروفایل من
                    </Link>

                    <Link
                      href="/my/orders"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      📦 سفارش‌ها
                    </Link>

                    <Link
                      href="/my/notifications"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      🔔 اعلان‌ها
                    </Link>

                    <Link
                      href="/my/favorites"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      ⭐ علاقه‌مندی‌ها
                    </Link>

                    <Link
                      href="/my/settings"
                      className="global-profile-menu-item"
                      role="menuitem"
                      onClick={() =>
                        setMenuOpen(
                          false,
                        )
                      }
                    >
                      ⚙️ تنظیمات
                    </Link>
                  </>
                )}

                <div className="global-profile-divider" />

                <button
                  type="button"
                  className="global-profile-menu-item global-profile-logout"
                  role="menuitem"
                  onClick={
                    handleLogout
                  }
                  disabled={
                    loggingOut
                  }
                >
                  🚪{" "}
                  {loggingOut
                    ? "در حال خروج..."
                    : "خروج"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}