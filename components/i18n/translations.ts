export type Language = "en" | "fa";

export const translations = {
  en: {
    language: "English",
    languageShort: "EN",

    theme: {
      dark: "Dark",
      light: "Light",
    },

    user: {
      account: "Account",
      profile: "Profile",
      activity: "Activity",
      notifications: "Notifications",
      favorites: "Favorites",
      dashboard: "My U",
      logout: "Log out",
      login: "Log in",
      register: "Create account",
      guest: "Guest",
    },

    navigation: {
      home: "Home",
      uapps: "UApps",
      uweb: "UWeb",
      ushop: "UShop",
      uschool: "USchool",
      ucore: "UCore",
      lab: "LAB",
      myU: "My U",
      search: "Search",
    },

    home: {
      ecosystem: "Digital Ecosystem",
      build: "Build.",
      connect: "Connect.",
      explore: "Explore.",
      description:
        "Uniqe is a digital ecosystem built to bring applications, web, commerce, education, technology and innovation together.",
      exploreUApps: "Explore UApps",
      enterLab: "Enter LAB",
      oneEcosystem: "One ecosystem",
      multiplePossibilities:
        "Multiple possibilities",
      scroll: "Scroll to explore",
    },

    common: {
      comingSoon: "Coming Soon",
      inDevelopment: "In Development",
      available: "Available",
      experimental: "Experimental",
      active: "Active",
      concept: "Concept",
      explore: "Explore",
      learnMore: "Learn more",
      viewAll: "View all",
      goHome: "Go home",
      tryAgain: "Try again",
      restart: "Restart",
    },
  },

  fa: {
    language: "فارسی",
    languageShort: "FA",

    theme: {
      dark: "تیره",
      light: "روشن",
    },

    user: {
      account: "حساب کاربری",
      profile: "پروفایل",
      activity: "فعالیت‌ها",
      notifications: "اعلان‌ها",
      favorites: "علاقه‌مندی‌ها",
      dashboard: "My U",
      logout: "خروج از حساب",
      login: "ورود",
      register: "ساخت حساب",
      guest: "مهمان",
    },

    navigation: {
      home: "خانه",
      uapps: "UApps",
      uweb: "UWeb",
      ushop: "UShop",
      uschool: "USchool",
      ucore: "UCore",
      lab: "LAB",
      myU: "My U",
      search: "جستجو",
    },

    home: {
      ecosystem: "اکوسیستم دیجیتال",
      build: "بساز.",
      connect: "متصل کن.",
      explore: "کشف کن.",
      description:
        "Uniqe یک اکوسیستم دیجیتال است که اپلیکیشن‌ها، وب، تجارت، آموزش، فناوری و نوآوری را در یک مجموعه به هم متصل می‌کند.",
      exploreUApps: "مشاهده UApps",
      enterLab: "ورود به LAB",
      oneEcosystem: "یک اکوسیستم",
      multiplePossibilities:
        "امکانات بی‌نهایت",
      scroll: "برای کشف بیشتر اسکرول کنید",
    },

    common: {
      comingSoon: "به‌زودی",
      inDevelopment: "در حال توسعه",
      available: "در دسترس",
      experimental: "آزمایشی",
      active: "فعال",
      concept: "ایده",
      explore: "مشاهده",
      learnMore: "بیشتر بدانید",
      viewAll: "مشاهده همه",
      goHome: "بازگشت به خانه",
      tryAgain: "تلاش دوباره",
      restart: "راه‌اندازی مجدد",
    },
  },
} as const;

export type TranslationDictionary =
  (typeof translations)[Language];