export type MyUServiceStatus =
  | "active"
  | "development"
  | "coming-soon";

export type MyUService = {
  id: string;
  name: string;
  description: string;
  status: MyUServiceStatus;
  statusLabel: string;
  href: string;
  icon: string;
};

export type MyUActivity = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
};

export type MyUQuickAction = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
};

export const myUServices: MyUService[] = [
  {
    id: "uapps",
    name: "UApps",
    description:
      "Applications and digital tools across the Uniqe ecosystem.",
    status: "active",
    statusLabel: "Available",
    href: "/uapps",
    icon: "◈",
  },
  {
    id: "uweb",
    name: "UWeb",
    description:
      "Web experiences and digital projects connected to Uniqe.",
    status: "active",
    statusLabel: "Available",
    href: "/uweb",
    icon: "◇",
  },
  {
    id: "ushop",
    name: "UShop",
    description:
      "Products, services and future commerce experiences.",
    status: "development",
    statusLabel: "In Development",
    href: "/ushop",
    icon: "□",
  },
  {
    id: "uschool",
    name: "USchool",
    description:
      "Learning paths, educational resources and knowledge.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/uschool",
    icon: "✦",
  },
];

export const myUActivity: MyUActivity[] = [
  {
    id: "activity-01",
    title: "Explored UApps",
    description:
      "Visited the UApps application hub.",
    time: "Recently",
    icon: "◈",
  },
  {
    id: "activity-02",
    title: "Explored UWeb",
    description:
      "Visited the UWeb project hub.",
    time: "Recently",
    icon: "◇",
  },
  {
    id: "activity-03",
    title: "Visited LAB",
    description:
      "Explored experimental Uniqe projects.",
    time: "Recently",
    icon: "✦",
  },
];

export const myUQuickActions: MyUQuickAction[] = [
  {
    id: "action-apps",
    title: "Explore UApps",
    description:
      "Discover applications and digital tools.",
    href: "/uapps",
    icon: "◈",
  },
  {
    id: "action-web",
    title: "Explore UWeb",
    description:
      "Discover websites and digital projects.",
    href: "/uweb",
    icon: "◇",
  },
  {
    id: "action-shop",
    title: "Visit UShop",
    description:
      "Explore products and services.",
    href: "/ushop",
    icon: "□",
  },
  {
    id: "action-lab",
    title: "Explore LAB",
    description:
      "See experiments and new ideas.",
    href: "/lab",
    icon: "✦",
  },
];