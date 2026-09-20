import type { UApp } from "@/lib/uapps/types";

export type UserAppReviewStatus =
  | "draft"
  | "pending-review"
  | "approved"
  | "rejected";

export type UserApp = UApp & {
  source: "user";

  creator: {
    id: string;
    name: string;
    username: string;
  };

  reviewStatus: UserAppReviewStatus;

  submittedAt?: string;

  reviewedAt?: string;

  rejectionReason?: string;
};

export const userApps: UserApp[] = [
  {
    id: "user-smart-finance",
    name: "Smart Finance",
    description:
      "مدیریت ساده و هوشمند امور مالی شخصی.",
    category: "مالی و مدیریت",

    source: "user",
    sourceLabel: "ساخته‌شده توسط کاربر",

    platform: "web",
    platformLabel: "Web",

    type: "web-app",
    typeLabel: "نرم‌افزار تحت وب",

    status: "available",
    statusLabel: "فعال",

    icon: "₿",
    accent: "blue",

    href: "/uapps",

    featured: true,
    verified: true,

    creator: {
      id: "creator-demo-01",
      name: "کاربر نمونه",
      username: "demo_user",
    },

    reviewStatus: "approved",

    reviewedAt:
      "2026-09-01T10:00:00.000Z",
  },

  {
    id: "user-task-flow",
    name: "Task Flow",
    description:
      "مدیریت کارها و برنامه‌ریزی روزانه.",
    category: "بهره‌وری",

    source: "user",
    sourceLabel: "ساخته‌شده توسط کاربر",

    platform: "android",
    platformLabel: "Android",

    type: "installable",
    typeLabel: "قابل نصب",

    status: "available",
    statusLabel: "فعال",

    icon: "✓",
    accent: "purple",

    href: "/uapps",

    featured: true,
    verified: false,

    creator: {
      id: "creator-demo-02",
      name: "علی رضایی",
      username: "ali_dev",
    },

    reviewStatus: "approved",

    reviewedAt:
      "2026-09-03T14:30:00.000Z",
  },

  {
    id: "user-quick-notes",
    name: "Quick Notes",
    description:
      "ثبت سریع ایده‌ها و یادداشت‌های روزانه.",
    category: "یادداشت",

    source: "user",
    sourceLabel: "ساخته‌شده توسط کاربر",

    platform: "multi",
    platformLabel: "چند پلتفرمی",

    type: "hybrid",
    typeLabel: "چند پلتفرمی",

    status: "available",
    statusLabel: "فعال",

    icon: "✎",
    accent: "green",

    href: "/uapps",

    featured: true,
    verified: true,

    creator: {
      id: "creator-demo-03",
      name: "سارا احمدی",
      username: "sara_code",
    },

    reviewStatus: "approved",

    reviewedAt:
      "2026-09-05T09:20:00.000Z",
  },

  {
    id: "user-auto-desk",
    name: "Auto Desk",
    description:
      "خودکارسازی فرایندهای تکراری.",
    category: "اتوماسیون",

    source: "user",
    sourceLabel: "ساخته‌شده توسط کاربر",

    platform: "windows",
    platformLabel: "Windows",

    type: "installable",
    typeLabel: "قابل نصب",

    status: "development",
    statusLabel: "در حال توسعه",

    icon: "↗",
    accent: "orange",

    href: "/uapps",

    verified: false,

    creator: {
      id: "creator-demo-04",
      name: "محمد کریمی",
      username: "mkarimi",
    },

    reviewStatus: "approved",

    reviewedAt:
      "2026-09-07T16:00:00.000Z",
  },
];

export function getPublishedUserApps(): UserApp[] {
  return userApps.filter(
    (app) =>
      app.reviewStatus ===
        "approved" &&
      app.status !== "development",
  );
}

export function getFeaturedUserApps(): UserApp[] {
  return getPublishedUserApps().filter(
    (app) => app.featured,
  );
}