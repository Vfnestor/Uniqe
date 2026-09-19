import type {
  MyUNavigationItem,
  MyUProduct,
} from "./types";

export const myUProducts: MyUProduct[] = [
  {
    id: "uweb",
    name: "UWeb",
    title: "ساخت و مدیریت وب‌سایت",
    description:
      "ثبت پروژه، انتخاب متخصص، قرارداد و مدیریت اجرای پروژه.",
    status: "active",
    href: "/my-uweb",
    icon: "🌐",
  },

  {
    id: "ushop",
    name: "UShop",
    title: "فروشگاه و خرید",
    description:
      "مدیریت خریدها، سفارش‌ها، محصولات و فعالیت‌های فروشگاهی.",
    status: "coming_soon",
    href: "/my-ushop",
    icon: "🛍️",
  },

  {
    id: "uservice",
    name: "UService",
    title: "خدمات",
    description:
      "درخواست و مدیریت خدمات حرفه‌ای در اکوسیستم Uniqe.",
    status: "coming_soon",
    href: "/my-uservice",
    icon: "🛠️",
  },

  {
    id: "uschool",
    name: "USchool",
    title: "آموزش",
    description:
      "دوره‌ها، کلاس‌ها، پیشرفت یادگیری و نتایج آموزشی.",
    status: "coming_soon",
    href: "/my-uschool",
    icon: "🎓",
  },

  {
    id: "uapps",
    name: "UApps",
    title: "اپلیکیشن‌ها",
    description:
      "مدیریت اپلیکیشن‌ها و پروژه‌های نرم‌افزاری شما.",
    status: "coming_soon",
    href: "/my-uapps",
    icon: "📱",
  },
];

export const myUNavigation: MyUNavigationItem[] = [
  {
    id: "overview",
    title: "نمای کلی",
    href: "/my",
    icon: "⌂",
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
];

export function getMyUProduct(
  id: string,
) {
  return myUProducts.find(
    (product) =>
      product.id === id,
  );
}