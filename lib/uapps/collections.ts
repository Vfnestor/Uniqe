import type {
  UApp,
} from "@/lib/uapps/types";

import {
  getPublishedUniqeApps,
} from "@/lib/uapps/uniqe-apps";

import {
  userApps,
} from "@/lib/uapps/user-apps";

export type UAppCollection = {
  id: string;
  title: string;
  description: string;
  icon: string;
  apps: UApp[];
};

function getAvailableApps(): UApp[] {
  const uniqeApps =
    getPublishedUniqeApps();

  const publishedUserApps =
    userApps.filter(
      (app) =>
        app.reviewStatus ===
          "approved" &&
        app.status !==
          "development",
    );

  return [
    ...uniqeApps,
    ...publishedUserApps,
  ];
}

function filterByCategory(
  apps: UApp[],
  categories: string[],
): UApp[] {
  return apps.filter(
    (app) =>
      categories.some(
        (category) =>
          app.category
            .toLowerCase()
            .includes(
              category.toLowerCase(),
            ),
      ),
  );
}

export function getUAppCollections(): UAppCollection[] {
  const apps =
    getAvailableApps();

  return [
    {
      id: "finance",
      title:
        "مالی و مدیریت پول",
      description:
        "ابزارهای مدیریت مالی، حسابداری و امور اقتصادی.",
      icon: "💰",
      apps:
        filterByCategory(
          apps,
          [
            "مالی",
            "حسابداری",
            "اقتصاد",
          ],
        ),
    },
    {
      id: "business",
      title:
        "کسب‌وکار",
      description:
        "ابزارهای مدیریت کسب‌وکار، پروژه و فعالیت‌های حرفه‌ای.",
      icon: "💼",
      apps:
        filterByCategory(
          apps,
          [
            "کسب‌وکار",
            "پروژه",
            "فروشگاه",
          ],
        ),
    },
    {
      id: "design",
      title:
        "طراحی و خلاقیت",
      description:
        "ابزارهای طراحی، گرافیک و تولید محتوای خلاقانه.",
      icon: "🎨",
      apps:
        filterByCategory(
          apps,
          [
            "طراحی",
            "گرافیک",
            "خلاقیت",
          ],
        ),
    },
    {
      id: "education",
      title:
        "آموزش",
      description:
        "اپلیکیشن‌ها و ابزارهای آموزشی و یادگیری.",
      icon: "📚",
      apps:
        filterByCategory(
          apps,
          [
            "آموزش",
            "یادگیری",
            "دانش",
          ],
        ),
    },
    {
      id: "tools",
      title:
        "ابزارهای کاربردی",
      description:
        "ابزارهای عمومی برای انجام کارهای روزمره.",
      icon: "🛠️",
      apps:
        filterByCategory(
          apps,
          [
            "ابزار",
            "کاربردی",
            "Utility",
          ],
        ),
    },
    {
      id: "music",
      title:
        "موسیقی و سرگرمی",
      description:
        "اپلیکیشن‌های موسیقی، رسانه و سرگرمی.",
      icon: "🎵",
      apps:
        filterByCategory(
          apps,
          [
            "موسیقی",
            "سرگرمی",
            "رسانه",
          ],
        ),
    },
    {
      id: "ai",
      title:
        "هوش مصنوعی",
      description:
        "اپلیکیشن‌ها و ابزارهای مرتبط با هوش مصنوعی.",
      icon: "🤖",
      apps:
        filterByCategory(
          apps,
          [
            "هوش مصنوعی",
            "AI",
          ],
        ),
    },
    {
      id: "communication",
      title:
        "ارتباطات",
      description:
        "ابزارهای ارتباطی و اجتماعی.",
      icon: "📱",
      apps:
        filterByCategory(
          apps,
          [
            "ارتباطات",
            "اجتماعی",
          ],
        ),
    },
  ];
}