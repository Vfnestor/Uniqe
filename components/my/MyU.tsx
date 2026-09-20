"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";

import {
  getStoredUserProfile,
  type UserProfile,
} from "@/lib/my-u/profile";

import {
  getStoredUserApps,
  type StoredUserApp,
} from "@/lib/uapps/user-app-storage";

import type { MyUProduct } from "@/lib/my-u/types";

import MyUNavigation from "./MyUNavigation";
import MyUProductGrid from "./MyUProductGrid";

type Props = {
  products: MyUProduct[];
};

const PROFILE_COLLAPSED_STORAGE_KEY =
  "uniqe-my-profile-card-collapsed";

const navigation = [
  {
    id: "overview",
    title: "نمای کلی",
    href: "/my",
    icon: "⌂",
  },
  {
    id: "uapps",
    title: "نرم‌افزارهای من",
    href: "/uapps/my-apps",
    icon: "▣",
  },
  {
    id: "uweb",
    title: "UWeb",
    href: "/my-uweb",
    icon: "🌐",
    area: "uweb",
  },
  {
    id: "projects",
    title: "پروژه‌های من",
    href: "/my/projects",
    icon: "▣",
  },
  {
    id: "contracts",
    title: "قراردادهای من",
    href: "/my/contracts",
    icon: "▤",
  },
  {
    id: "orders",
    title: "سفارش‌های من",
    href: "/my/orders",
    icon: "◫",
  },
  {
    id: "notifications",
    title: "اعلان‌ها",
    href: "/my/notifications",
    icon: "◉",
  },
  {
    id: "favorites",
    title: "علاقه‌مندی‌ها",
    href: "/my/favorites",
    icon: "♡",
  },
  {
    id: "settings",
    title: "تنظیمات",
    href: "/my/settings",
    icon: "⚙",
  },
] as const;

function getGenderLabel(
  gender: UserProfile["gender"],
) {
  if (gender === "male") {
    return "مرد";
  }

  if (gender === "female") {
    return "زن";
  }

  return "نامشخص";
}

function getDeviceTypeLabel(
  type: UserProfile["deviceType"],
) {
  if (type === "mobile") {
    return "موبایل";
  }

  if (type === "laptop") {
    return "لپ‌تاپ";
  }

  if (type === "tablet") {
    return "تبلت";
  }

  if (type === "desktop") {
    return "کامپیوتر";
  }

  return "سایر";
}

export default function MyU({
  products,
}: Props) {
  const [
    profile,
    setProfile,
  ] = useState<UserProfile | null>(
    null,
  );

  const [
    profileCollapsed,
    setProfileCollapsed,
  ] = useState(false);

  const [
    userApps,
    setUserApps,
  ] = useState<StoredUserApp[]>([]);

  useEffect(() => {
    function loadProfile() {
      setProfile(
        getStoredUserProfile(),
      );
    }

    function loadApps() {
      setUserApps(
        getStoredUserApps(),
      );
    }

    loadProfile();
    loadApps();

    const storedCollapsed =
      window.localStorage.getItem(
        PROFILE_COLLAPSED_STORAGE_KEY,
      );

    setProfileCollapsed(
      storedCollapsed === "true",
    );

    window.addEventListener(
      "uniqe-profile-updated",
      loadProfile,
    );

    window.addEventListener(
      "uniqe-user-apps-updated",
      loadApps,
    );

    window.addEventListener(
      "storage",
      loadProfile,
    );

    window.addEventListener(
      "storage",
      loadApps,
    );

    return () => {
      window.removeEventListener(
        "uniqe-profile-updated",
        loadProfile,
      );

      window.removeEventListener(
        "uniqe-user-apps-updated",
        loadApps,
      );

      window.removeEventListener(
        "storage",
        loadProfile,
      );

      window.removeEventListener(
        "storage",
        loadApps,
      );
    };
  }, []);

  function toggleProfileCard() {
    setProfileCollapsed(
      (current) => {
        const next = !current;

        window.localStorage.setItem(
          PROFILE_COLLAPSED_STORAGE_KEY,
          String(next),
        );

        return next;
      },
    );
  }

  const fullName =
    profile
      ? `${profile.firstName} ${profile.lastName}`.trim()
      : "";

  const displayName =
    fullName ||
    "کاربر Uniqe";

  const username =
    profile?.username
      ? `@${profile.username}`
      : "نام کاربری ثبت نشده";

  const device =
    profile
      ? [
          getDeviceTypeLabel(
            profile.deviceType,
          ),
          profile.deviceBrand,
          profile.deviceModel,
        ]
          .filter(Boolean)
          .join(" · ")
      : "ثبت نشده";

  const draftCount =
    userApps.filter(
      (app) =>
        app.reviewStatus ===
        "draft",
    ).length;

  const pendingCount =
    userApps.filter(
      (app) =>
        app.reviewStatus ===
        "pending-review",
    ).length;

  return (
    <main className="my-u-page">
      <Container>
        <div className="my-u-layout">
          <MyUNavigation
            items={navigation}
          />

          <div className="my-u-main">
            <section className="my-u-hero">
              <div>
                <span className="section-eyebrow">
                  MY U
                </span>

                <h1>
                  مرکز کنترل شما در Uniqe
                </h1>

                <p>
                  از اینجا می‌توانید تمام
                  سرویس‌ها، پروژه‌ها،
                  سفارش‌ها و فعالیت‌های
                  خود را مدیریت کنید.
                </p>
              </div>

              <Link
                href="/uweb/order"
                className="my-u-primary-action"
              >
                شروع یک پروژه جدید

                <span>
                  ←
                </span>
              </Link>
            </section>

            <section
              className={
                profileCollapsed
                  ? "my-u-profile-summary my-u-profile-summary-collapsed"
                  : "my-u-profile-summary"
              }
            >
              <div className="my-u-profile-summary-header">
                <div className="my-u-profile-summary-identity">
                  <div className="my-u-profile-summary-avatar">
                    {profile?.avatar ? (
                      <img
                        src={profile.avatar}
                        alt="تصویر پروفایل"
                      />
                    ) : (
                      <span>
                        {displayName
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="my-u-profile-summary-title">
                    <strong>
                      {displayName}
                    </strong>

                    <span dir="ltr">
                      {username}
                    </span>
                  </div>
                </div>

                <div className="my-u-profile-summary-actions">
                  <Link
                    href="/my/profile"
                    className="my-u-profile-summary-edit"
                  >
                    ویرایش پروفایل
                  </Link>

                  <button
                    type="button"
                    className={
                      profileCollapsed
                        ? "my-u-profile-summary-toggle my-u-profile-summary-toggle-collapsed"
                        : "my-u-profile-summary-toggle"
                    }
                    onClick={
                      toggleProfileCard
                    }
                    aria-label={
                      profileCollapsed
                        ? "باز کردن اطلاعات پروفایل"
                        : "بستن اطلاعات پروفایل"
                    }
                    aria-expanded={
                      !profileCollapsed
                    }
                  >
                    <span>
                      ↓
                    </span>
                  </button>
                </div>
              </div>

              {!profileCollapsed && (
                <div className="my-u-profile-summary-body">
                  <div className="my-u-profile-summary-grid">
                    <div className="my-u-profile-summary-item">
                      <span>
                        نام
                      </span>

                      <strong>
                        {displayName}
                      </strong>
                    </div>

                    <div className="my-u-profile-summary-item">
                      <span>
                        نام کاربری
                      </span>

                      <strong dir="ltr">
                        {username}
                      </strong>
                    </div>

                    <div className="my-u-profile-summary-item">
                      <span>
                        جنسیت
                      </span>

                      <strong>
                        {getGenderLabel(
                          profile?.gender ||
                            "unspecified",
                        )}
                      </strong>
                    </div>

                    <div className="my-u-profile-summary-item">
                      <span>
                        شماره تلفن
                      </span>

                      <strong dir="ltr">
                        {profile?.phone ||
                          "ثبت نشده"}
                      </strong>
                    </div>

                    <div className="my-u-profile-summary-item">
                      <span>
                        ایمیل
                      </span>

                      <strong dir="ltr">
                        {profile?.email ||
                          "ثبت نشده"}
                      </strong>
                    </div>

                    <div className="my-u-profile-summary-item">
                      <span>
                        دستگاه
                      </span>

                      <strong>
                        {device}
                      </strong>
                    </div>

                    <div className="my-u-profile-summary-item my-u-profile-summary-item-wide">
                      <span>
                        شماره شبا
                      </span>

                      <strong dir="ltr">
                        {profile?.sheba ||
                          "ثبت نشده"}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="my-u-uapps-panel">
              <div>
                <span className="section-eyebrow">
                  UAPPS
                </span>

                <h2>
                  نرم‌افزارهای من
                </h2>

                <p>
                  ساخت، مدیریت و ارسال نرم‌افزارهای
                  شما برای بررسی Uniqe.
                </p>
              </div>

              <div className="my-u-uapps-stats">
                <div>
                  <strong>
                    {userApps.length}
                  </strong>

                  <span>
                    کل نرم‌افزارها
                  </span>
                </div>

                <div>
                  <strong>
                    {draftCount}
                  </strong>

                  <span>
                    پیش‌نویس
                  </span>
                </div>

                <div>
                  <strong>
                    {pendingCount}
                  </strong>

                  <span>
                    در انتظار بررسی
                  </span>
                </div>
              </div>

              <Link
                href="/uapps/my-apps"
                className="my-u-uapps-action"
              >
                مدیریت نرم‌افزارها
                <span>
                  ←
                </span>
              </Link>
            </section>

            <MyUProductGrid
              products={products}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}