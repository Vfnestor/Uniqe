import type { UApp } from "@/lib/uapps/types";

export type UniqeAppReleaseStatus =
  | "stable"
  | "beta"
  | "development"
  | "coming-soon";

export type UniqeApp = UApp & {
  source: "uniqe";
  productCode: string;
  version: string;
  releaseStatus: UniqeAppReleaseStatus;
  official: true;
};

export const uniqeApps: UniqeApp[] = [
  {
    id: "uniqe-myu",
    name: "My U",
    description:
      "مرکز شخصی مدیریت حساب، محصولات، سفارش‌ها و فعالیت‌های کاربر در اکوسیستم Uniqe.",
    category: "اکوسیستم Uniqe",
    source: "uniqe",
    sourceLabel: "Uniqe",
    platform: "web",
    platformLabel: "Web",
    type: "web-app",
    typeLabel: "Web App",
    status: "available",
    statusLabel: "فعال",
    icon: "MY",
    accent: "blue",
    href: "/my",
    featured: true,
    verified: true,
    productCode: "MYU",
    version: "1.0.0",
    releaseStatus: "stable",
    official: true,
    releaseLabel: "نسخه پایدار",
  },
  {
    id: "uniqe-uapps",
    name: "UApps",
    description:
      "مرکز کشف، جستجو و دسترسی به نرم‌افزارها و اپلیکیشن‌های اکوسیستم Uniqe.",
    category: "نرم‌افزار",
    source: "uniqe",
    sourceLabel: "Uniqe",
    platform: "web",
    platformLabel: "Web",
    type: "web-app",
    typeLabel: "Web App",
    status: "available",
    statusLabel: "فعال",
    icon: "UA",
    accent: "purple",
    href: "/uapps",
    featured: true,
    verified: true,
    productCode: "UAPPS",
    version: "1.0.0",
    releaseStatus: "stable",
    official: true,
    releaseLabel: "نسخه پایدار",
  },
  {
    id: "uniqe-uweb",
    name: "UWeb",
    description:
      "محیط مدیریت پروژه‌ها، قراردادها، Workspace و فعالیت‌های حرفه‌ای در Uniqe.",
    category: "پروژه و کسب‌وکار",
    source: "uniqe",
    sourceLabel: "Uniqe",
    platform: "web",
    platformLabel: "Web",
    type: "web-app",
    typeLabel: "Web App",
    status: "development",
    statusLabel: "در حال توسعه",
    icon: "UW",
    accent: "green",
    href: "/my-uweb",
    featured: true,
    verified: true,
    productCode: "UWEB",
    version: "0.1.0",
    releaseStatus: "beta",
    official: true,
    releaseLabel: "نسخه بتا",
  },
  {
    id: "uniqe-uservice",
    name: "UService",
    description:
      "زیرساخت سفارش، مدیریت و ارائه خدمات حرفه‌ای در اکوسیستم Uniqe.",
    category: "خدمات",
    source: "uniqe",
    sourceLabel: "Uniqe",
    platform: "web",
    platformLabel: "Web",
    type: "web-app",
    typeLabel: "Web App",
    status: "coming-soon",
    statusLabel: "به‌زودی",
    icon: "US",
    accent: "orange",
    href: "/uapps",
    featured: true,
    verified: true,
    productCode: "USERVICE",
    version: "0.1.0",
    releaseStatus: "coming-soon",
    official: true,
    releaseLabel: "به‌زودی",
  },
  {
    id: "uniqe-ushop",
    name: "UShop",
    description:
      "بستر فروشگاه و محصولات دیجیتال و فیزیکی در اکوسیستم Uniqe.",
    category: "فروشگاه",
    source: "uniqe",
    sourceLabel: "Uniqe",
    platform: "web",
    platformLabel: "Web",
    type: "web-app",
    typeLabel: "Web App",
    status: "coming-soon",
    statusLabel: "به‌زودی",
    icon: "US",
    accent: "pink",
    href: "/uapps",
    verified: true,
    productCode: "USHOP",
    version: "0.1.0",
    releaseStatus: "coming-soon",
    official: true,
    releaseLabel: "به‌زودی",
  },
  {
    id: "uniqe-uschool",
    name: "USchool",
    description:
      "بستر آموزش، دوره‌ها و ارتباط میان مدرس و دانش‌آموز در اکوسیستم Uniqe.",
    category: "آموزش",
    source: "uniqe",
    sourceLabel: "Uniqe",
    platform: "web",
    platformLabel: "Web",
    type: "web-app",
    typeLabel: "Web App",
    status: "coming-soon",
    statusLabel: "به‌زودی",
    icon: "UC",
    accent: "red",
    href: "/uapps",
    verified: true,
    productCode: "USCHOOL",
    version: "0.1.0",
    releaseStatus: "coming-soon",
    official: true,
    releaseLabel: "به‌زودی",
  },
];

export function getPublishedUniqeApps(): UniqeApp[] {
  return uniqeApps.filter(
    (app) =>
      app.status !== "development" ||
      app.releaseStatus === "beta",
  );
}

export function getFeaturedUniqeApps(): UniqeApp[] {
  return getPublishedUniqeApps().filter(
    (app) => app.featured,
  );
}