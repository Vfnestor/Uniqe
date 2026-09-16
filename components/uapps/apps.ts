export type AppCategory =
  | "productivity"
  | "utility"
  | "automation"
  | "experimental";

export type AppStatus =
  | "available"
  | "development"
  | "experimental";

export type UApp = {
  id: string;
  name: string;
  category: AppCategory;
  categoryLabel: string;
  description: string;
  status: AppStatus;
  statusLabel: string;
  href: string;
  number: string;
  icon: string;
  featured?: boolean;
};

export const uapps: UApp[] = [
  {
    id: "uapps-core",
    name: "UApps Core",
    category: "productivity",
    categoryLabel: "Productivity",
    description:
      "The central foundation for discovering and accessing applications across the UApps ecosystem.",
    status: "development",
    statusLabel: "In Development",
    href: "/uapps",
    number: "01",
    icon: "◈",
    featured: true,
  },
  {
    id: "smart-tools",
    name: "Smart Tools",
    category: "utility",
    categoryLabel: "Utility",
    description:
      "A collection of practical digital tools designed to make everyday tasks simpler.",
    status: "development",
    statusLabel: "In Development",
    href: "/uapps",
    number: "02",
    icon: "◇",
    featured: true,
  },
  {
    id: "automation",
    name: "Automation",
    category: "automation",
    categoryLabel: "Automation",
    description:
      "Tools and workflows designed to automate repetitive digital tasks and processes.",
    status: "development",
    statusLabel: "In Development",
    href: "/uapps",
    number: "03",
    icon: "↗",
  },
  {
    id: "uapps-lab",
    name: "UApps LAB",
    category: "experimental",
    categoryLabel: "Experimental",
    description:
      "Experimental applications and prototypes exploring new ideas inside the UApps ecosystem.",
    status: "experimental",
    statusLabel: "Experimental",
    href: "/lab",
    number: "04",
    icon: "✦",
  },
];
