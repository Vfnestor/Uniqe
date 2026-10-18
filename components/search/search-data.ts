export type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  icon: string;
  keywords: string[];
};

export const searchResults: SearchResult[] = [
  {
    id: "uapps",
    title: "UApps",
    description: "کشف و استفاده از برنامه‌ها و ابزارهای کاربردی.",
    category: "برنامه‌ها",
    href: "/uapps",
    icon: "📱",
    keywords: ["اپلیکیشن", "برنامه", "ابزار", "uapps"],
  },
  {
    id: "uweb",
    title: "UWeb",
    description: "ابزارها و امکانات مرتبط با وب‌سایت‌ها.",
    category: "وب",
    href: "/uweb",
    icon: "🌐",
    keywords: ["وب", "سایت", "وب‌سایت", "uweb"],
  },
  {
    id: "ushop",
    title: "UShop",
    description: "بخش خریدوفروش و امکانات فروشگاهی یونیک.",
    category: "فروشگاه",
    href: "/ushop",
    icon: "🛍️",
    keywords: ["فروشگاه", "خرید", "فروش", "محصول", "ushop"],
  },
  {
    id: "uschool",
    title: "USchool",
    description: "فضایی برای آموزش و یادگیری.",
    category: "آموزش",
    href: "/uschool",
    icon: "🎓",
    keywords: ["مدرسه", "آموزش", "یادگیری", "دوره", "uschool"],
  },
  {
    id: "ucore",
    title: "UCore",
    description: "بخش مرکزی خدمات و امکانات اکوسیستم یونیک.",
    category: "خدمات",
    href: "/ucore",
    icon: "⚙️",
    keywords: ["هسته", "خدمات", "امکانات", "ucore"],
  },
  {
    id: "lab",
    title: "U-LAB",
    description: "محیط ایده‌ها، آزمایش‌ها و تجربه‌های جدید.",
    category: "نوآوری",
    href: "/lab",
    icon: "🧪",
    keywords: ["آزمایشگاه", "نوآوری", "ایده", "lab"],
  },
  {
    id: "favorites",
    title: "علاقه‌مندی‌های من",
    description: "دسترسی سریع به مواردی که ذخیره کرده‌اید.",
    category: "حساب کاربری",
    href: "/my-u/favorites",
    icon: "⭐",
    keywords: ["علاقه‌مندی", "ذخیره", "نشان‌شده"],
  },
  {
    id: "notifications",
    title: "اعلان‌های من",
    description: "مشاهده اعلان‌ها و پیام‌های حساب کاربری.",
    category: "حساب کاربری",
    href: "/my-u/notifications",
    icon: "🔔",
    keywords: ["اعلان", "پیام", "اطلاع‌رسانی"],
  },
  {
    id: "profile",
    title: "حساب کاربری من",
    description: "مدیریت اطلاعات و تنظیمات حساب کاربری.",
    category: "حساب کاربری",
    href: "/my-u",
    icon: "👤",
    keywords: ["حساب", "پروفایل", "تنظیمات", "کاربر"],
  },
];