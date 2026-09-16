export type CoreModuleCategory =
  | "platform"
  | "data"
  | "integration"
  | "infrastructure";

export type CoreModuleStatus =
  | "available"
  | "development"
  | "coming-soon";

export type UCoreModule = {
  id: string;
  name: string;
  category: CoreModuleCategory;
  categoryLabel: string;
  description: string;
  status: CoreModuleStatus;
  statusLabel: string;
  href: string;
  number: string;
  icon: string;
  featured?: boolean;
};

export const ucoreModules: UCoreModule[] = [
  {
    id: "core-platform",
    name: "Core Platform",
    category: "platform",
    categoryLabel: "Platform",
    description:
      "The central foundation that connects and coordinates the different layers of the Uniqe ecosystem.",
    status: "development",
    statusLabel: "In Development",
    href: "/ucore",
    number: "01",
    icon: "◈",
    featured: true,
  },
  {
    id: "data-layer",
    name: "Data Layer",
    category: "data",
    categoryLabel: "Data",
    description:
      "A future foundation for organizing, managing and connecting data across Uniqe products and services.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/ucore",
    number: "02",
    icon: "◇",
    featured: true,
  },
  {
    id: "integrations",
    name: "Integrations",
    category: "integration",
    categoryLabel: "Integration",
    description:
      "Infrastructure for connecting external services, applications and future components to Uniqe.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/ucore",
    number: "03",
    icon: "↗",
  },
  {
    id: "ucore-infrastructure",
    name: "Infrastructure",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    description:
      "The underlying technical foundation for reliable, scalable and connected Uniqe experiences.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/ucore",
    number: "04",
    icon: "□",
  },
];