"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  clearStoredAuthSession,
} from "@/lib/auth/auth-storage";

import {
  useAuth,
} from "@/components/auth/AuthProvider";

import type {
  MyUNavigationItem,
} from "@/lib/my-u/types";

import {
  getStoredUserProfile,
} from "@/lib/my-u/profile";

type Props = {
  items: readonly MyUNavigationItem[];
};

export default function MyUNavigation({
  items,
}: Props) {
  const pathname =
    usePathname();

  const { state } =
    useAuth();

  const user =
    state.user;

  const profile =
    getStoredUserProfile();

  async function handleLogout() {
    clearStoredAuthSession();

    window.location.href =
      "/admin/login";
  }

  const displayName =
    profile.firstName ||
    profile.lastName
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : user?.name ||
        "کاربر Uniqe";

  const avatar =
    profile.avatar;

  return (
    <>
      <button
        type="button"
        className="my-u-mobile-menu-button"
        aria-label="باز کردن منوی حساب"
        onClick={() => {
          document.body.classList.add(
            "my-u-sidebar-open",
          );
        }}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className="my-u-sidebar-overlay"
        onClick={() => {
          document.body.classList.remove(
            "my-u-sidebar-open",
          );
        }}
      />

      <aside className="my-u-navigation">
        <div className="my-u-navigation-header">
          <Link
            href="/my/profile"
            className="my-u-user-card"
            onClick={() => {
              document.body.classList.remove(
                "my-u-sidebar-open",
              );
            }}
          >
            <div className="my-u-user-avatar">
              {avatar ? (
                <img
                  src={avatar}
                  alt="تصویر پروفایل"
                />
              ) : (
                displayName
                  .trim()
                  .charAt(0)
                  .toUpperCase() || "U"
              )}
            </div>

            <div className="my-u-user-info">
              <strong>
                {displayName}
              </strong>

              <span>
                {user?.email ||
                  profile.email ||
                  "حساب کاربری"}
              </span>
            </div>

            <span
              className="my-u-profile-link-arrow"
              aria-hidden="true"
            >
              ←
            </span>

            <button
              type="button"
              className="my-u-mobile-close"
              aria-label="بستن منو"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                document.body.classList.remove(
                  "my-u-sidebar-open",
                );
              }}
            >
              ×
            </button>
          </Link>

          <div className="my-u-account-status">
            <span className="my-u-status-dot" />
            حساب فعال
          </div>
        </div>

        <nav className="my-u-navigation-nav">
          <div className="my-u-navigation-label">
            فضای کاربری
          </div>

          {items.map(
            (item) => {
              const isActive =
                item.id ===
                "overview"
                  ? pathname ===
                    "/my"
                  : pathname ===
                      item.href ||
                    pathname.startsWith(
                      `${item.href}/`,
                    );

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={
                    isActive
                      ? "my-u-navigation-item my-u-navigation-item-active"
                      : "my-u-navigation-item"
                  }
                  onClick={() => {
                    document.body.classList.remove(
                      "my-u-sidebar-open",
                    );
                  }}
                >
                  <span className="my-u-navigation-icon">
                    {item.icon}
                  </span>

                  <span className="my-u-navigation-title">
                    {item.title}
                  </span>

                  {isActive && (
                    <span className="my-u-navigation-active-line" />
                  )}
                </Link>
              );
            },
          )}
        </nav>

        <div className="my-u-navigation-footer">
          <button
            type="button"
            className="my-u-logout-button"
            onClick={
              handleLogout
            }
          >
            <span>
              🚪
            </span>

            <span>
              خروج از حساب
            </span>
          </button>

          <div className="my-u-navigation-brand">
            <span>
              UNIQE
            </span>

            <small>
              My U Workspace
            </small>
          </div>
        </div>
      </aside>
    </>
  );
}