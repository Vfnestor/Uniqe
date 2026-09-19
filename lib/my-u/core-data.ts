import type {
  MyUActivityItem,
  MyUProductArea,
} from "./types";

export type MyUOrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";

export type MyUOrder = {
  id: string;
  orderNumber: string;
  title: string;
  area: MyUProductArea;
  areaLabel: string;
  status: MyUOrderStatus;
  statusLabel: string;
  amount?: number;
  currency?: string;
  createdAt: string;
  href?: string;
};

export type MyUNotification = {
  id: string;
  title: string;
  description: string;
  area: MyUProductArea;
  areaLabel: string;
  read: boolean;
  createdAt: string;
  href?: string;
};

export type MyUFavorite = {
  id: string;
  title: string;
  description: string;
  area: MyUProductArea;
  areaLabel: string;
  type: string;
  href: string;
};

export type MyUSettings = {
  language: "fa";
  theme: "system" | "light" | "dark";
  emailNotifications: boolean;
  projectNotifications: boolean;
  marketingNotifications: boolean;
};

export const demoOrders: MyUOrder[] = [
  {
    id: "order-demo-01",
    orderNumber: "ORD-000001",
    title: "فروشگاه اینترنتی نمونه",
    area: "uweb",
    areaLabel: "UWeb",
    status: "processing",
    statusLabel: "در حال اجرا",
    amount: 1400,
    currency: "USD",
    createdAt: "2026-09-19T08:30:00.000Z",
    href: "/uweb/projects/uweb-project-demo-01",
  },
];

export const demoNotifications: MyUNotification[] = [
  {
    id: "notification-demo-01",
    title: "فرآیند تطبیق متخصص فعال است",
    description:
      "UWeb در حال بررسی متخصصان مناسب برای پروژه شماست.",
    area: "uweb",
    areaLabel: "UWeb",
    read: false,
    createdAt: "2026-09-19T09:00:00.000Z",
    href: "/uweb/opportunities/uweb-project-demo-01/matching",
  },
  {
    id: "notification-demo-02",
    title: "پروژه شما در My U ثبت شد",
    description:
      "پروژه فروشگاه اینترنتی نمونه با موفقیت ثبت شده است.",
    area: "uweb",
    areaLabel: "UWeb",
    read: true,
    createdAt: "2026-09-19T08:30:00.000Z",
    href: "/uweb/projects/uweb-project-demo-01",
  },
];

export const demoFavorites: MyUFavorite[] = [
  {
    id: "favorite-demo-01",
    title: "فروشگاه اینترنتی نمونه",
    description:
      "پروژه نمونه UWeb در لیست علاقه‌مندی‌ها.",
    area: "uweb",
    areaLabel: "UWeb",
    type: "پروژه",
    href: "/uweb/projects/uweb-project-demo-01",
  },
];

export const demoSettings: MyUSettings = {
  language: "fa",
  theme: "system",
  emailNotifications: true,
  projectNotifications: true,
  marketingNotifications: false,
};

export function getMyUOrders(): MyUOrder[] {
  return demoOrders;
}

export function getMyUNotifications(): MyUNotification[] {
  return demoNotifications;
}

export function getMyUFavorites(): MyUFavorite[] {
  return demoFavorites;
}

export function getMyUSettings(): MyUSettings {
  return demoSettings;
}

export function getMyUUnreadNotificationCount(): number {
  return demoNotifications.filter(
    (notification) => !notification.read,
  ).length;
}