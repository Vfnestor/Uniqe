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

import { authConfig } from "@/lib/auth/config";

import "./global-header.css";

type StoredUser = {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
};

type StoredSession = {
  user?: StoredUser;
  expiresAt?: string;
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

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    session,
    setSession,
  ] = useState<StoredSession | null>(
    null,
  );

  const menuRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  useEffect(() => {
    const readSession = () => {
      try {
        const raw =
          window.localStorage.getItem(
            authConfig.sessionKey,
          );

        if (!raw) {
          setSession(null);
          return;
        }

        const parsed =
          JSON.parse(
            raw,
          ) as StoredSession;

        setSession(parsed);
      } catch {
        setSession(null);
      }
    };

    readSession();

    window.addEventListener(
      "storage",
      readSession,
    );

    return () => {
      window.removeEventListener(
        "storage",
        readSession,
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

  const user =
    session?.user;

  const displayName =
    user?.name ||
    t.user.guest;

  const initials =
    displayName
      .trim()
      .charAt(0)
      .toUpperCase() || "U";

  const handleLogout = () => {
    window.localStorage.removeItem(
      authConfig.sessionKey,
    );

    setSession(null);
    setMenuOpen(false);

    window.location.href =
      authConfig.loginPath;
  };

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
            className="global-profile"
            ref={menuRef}
          >
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
                t.user.account
              }
            >
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={displayName}
                  width={36}
                  height={36}
                  className="global-profile-avatar"
                />
              ) : (
                <span className="global-profile-avatar global-profile-initial">
                  {initials}
                </span>
              )}
            </button>

            {menuOpen ? (
              <div
                className="global-profile-menu"
                role="menu"
              >
                <div className="global-profile-user">
                  <div className="global-profile-user-name">
                    {displayName}
                  </div>

                  {user?.email ? (
                    <div className="global-profile-user-email">
                      {user.email}
                    </div>
                  ) : null}
                </div>

                <div className="global-profile-divider" />

                <Link
                  href="/my-u"
                  className="global-profile-menu-item"
                  role="menuitem"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {t.user.dashboard}
                </Link>

                <Link
                  href="/my-u/profile"
                  className="global-profile-menu-item"
                  role="menuitem"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {t.user.profile}
                </Link>

                <Link
                  href="/my-u/activity"
                  className="global-profile-menu-item"
                  role="menuitem"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {t.user.activity}
                </Link>

                <Link
                  href="/my-u/notifications"
                  className="global-profile-menu-item"
                  role="menuitem"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {t.user.notifications}
                </Link>

                <Link
                  href="/my-u/favorites"
                  className="global-profile-menu-item"
                  role="menuitem"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {t.user.favorites}
                </Link>

                <div className="global-profile-divider" />

                <button
                  type="button"
                  className="global-profile-menu-item global-profile-logout"
                  role="menuitem"
                  onClick={
                    handleLogout
                  }
                >
                  {t.user.logout}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}