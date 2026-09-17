export type NotificationCategory =
  | "system"
  | "uapps"
  | "uweb"
  | "ushop"
  | "uschool"
  | "ucore";

export type NotificationItemData = {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  categoryLabel: string;
  time: string;
  href: string;
  icon: string;
  read: boolean;
};

export const notificationItems: NotificationItemData[] = [
  {
    id: "notification-01",
    title: "Welcome to Uniqe",
    description:
      "Your personal notification center is now available inside My U.",
    category: "system",
    categoryLabel: "System",
    time: "Recently",
    href: "/my-u",
    icon: "◇",
    read: false,
  },
  {
    id: "notification-02",
    title: "UApps is evolving",
    description:
      "New applications and digital tools are being prepared for the UApps ecosystem.",
    category: "uapps",
    categoryLabel: "UApps",
    time: "Recently",
    href: "/uapps",
    icon: "◈",
    read: false,
  },
  {
    id: "notification-03",
    title: "New UWeb projects",
    description:
      "The UWeb layer is being prepared for more websites and digital projects.",
    category: "uweb",
    categoryLabel: "UWeb",
    time: "Recently",
    href: "/uweb",
    icon: "◇",
    read: true,
  },
  {
    id: "notification-04",
    title: "UShop foundation",
    description:
      "The foundation for products, services and digital experiences is taking shape.",
    category: "ushop",
    categoryLabel: "UShop",
    time: "Recently",
    href: "/ushop",
    icon: "□",
    read: true,
  },
  {
    id: "notification-05",
    title: "USchool is coming",
    description:
      "Future learning paths and educational experiences are being prepared.",
    category: "uschool",
    categoryLabel: "USchool",
    time: "Recently",
    href: "/uschool",
    icon: "✦",
    read: true,
  },
  {
    id: "notification-06",
    title: "UCore infrastructure",
    description:
      "The central technical foundation of Uniqe continues to evolve.",
    category: "ucore",
    categoryLabel: "UCore",
    time: "Recently",
    href: "/ucore",
    icon: "◈",
    read: true,
  },
];

export const notificationFilters = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "system",
    label: "System",
  },
  {
    id: "uapps",
    label: "UApps",
  },
  {
    id: "uweb",
    label: "UWeb",
  },
  {
    id: "ushop",
    label: "UShop",
  },
  {
    id: "uschool",
    label: "USchool",
  },
  {
    id: "ucore",
    label: "UCore",
  },
] as const;