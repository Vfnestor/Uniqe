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

  const apps = [
    ...uniqeApps,
    ...publishedUserApps,
  ];

  const uniqueApps =
    new Map<string, UApp>();

  for (const app of apps) {
    if (!uniqueApps.has(app.id)) {
      uniqueApps.set(
        app.id,
        app,
      );
    }
  }

  return Array.from(
    uniqueApps.values(),
  );
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

function createCollection(
  id: string,
  title: string,
  description: string,
  icon: string,
  apps: UApp[],
): UAppCollection {
  return {
    id,
    title,
    description,
    icon,
    apps,
  };
}

export function getUAppCollections(): UAppCollection[] {
  const apps =
    getAvailableApps();

  return [
    createCollection(
      "finance",
      "مالی و مدیریت پول",
      "ابزارهای مدیریت مالی، حسابداری و امور اقتصادی.",
      "💰",
      filterByCategory(
        apps,
        [
          "مالی",
          "حسابداری",
          "اقتصاد",
        ],
      ),
    ),

    createCollection(
      "business",
      "کسب‌وکار",
      "ابزارهای مدیریت کسب‌وکار، پروژه و فعالیت‌های حرفه‌ای.",
      "💼",
      filterByCategory(
        apps,
        [
          "کسب‌وکار",
          "پروژه",
          "فروشگاه",
        ],
      ),
    ),

    createCollection(
      "design",
      "طراحی و خلاقیت",
      "ابزارهای طراحی، گرافیک و تولید محتوای خلاقانه.",
      "🎨",
      filterByCategory(
        apps,
        [
          "طراحی",
          "گرافیک",
          "خلاقیت",
        ],
      ),
    ),

    createCollection(
      "education",
      "آموزش",
      "اپلیکیشن‌ها و ابزارهای آموزشی و یادگیری.",
      "📚",
      filterByCategory(
        apps,
        [
          "آموزش",
          "یادگیری",
          "دانش",
        ],
      ),
    ),

    createCollection(
      "tools",
      "ابزارهای کاربردی",
      "ابزارهای عمومی برای انجام کارهای روزمره.",
      "🛠️",
      filterByCategory(
        apps,
        [
          "ابزار",
          "کاربردی",
          "utility",
        ],
      ),
    ),

    createCollection(
      "music",
      "موسیقی و سرگرمی",
      "اپلیکیشن‌های موسیقی، رسانه و سرگرمی.",
      "🎵",
      filterByCategory(
        apps,
        [
          "موسیقی",
          "سرگرمی",
          "رسانه",
        ],
      ),
    ),

    createCollection(
      "ai",
      "هوش مصنوعی",
      "اپلیکیشن‌ها و ابزارهای مرتبط با هوش مصنوعی.",
      "🤖",
      filterByCategory(
        apps,
        [
          "هوش مصنوعی",
          "AI",
        ],
      ),
    ),

    createCollection(
      "communication",
      "ارتباطات",
      "ابزارهای ارتباطی و اجتماعی.",
      "📱",
      filterByCategory(
        apps,
        [
          "ارتباطات",
          "اجتماعی",
        ],
      ),
    ),
  ];
}

export function getUAppCollection(
  id: string,
): UAppCollection | undefined {
  return getUAppCollections().find(
    (collection) =>
      collection.id === id,
  );
}