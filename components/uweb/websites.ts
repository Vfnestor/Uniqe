export type WebsiteCategory =
  | "platform"
  | "service"
  | "experience"
  | "experimental";

export type WebsiteStatus =
  | "available"
  | "development"
  | "experimental";

export type UWebProject = {
  id: string;
  name: string;
  category: WebsiteCategory;
  categoryLabel: string;
  description: string;
  status: WebsiteStatus;
  statusLabel: string;
  href: string;
  number: string;
  icon: string;
  featured?: boolean;
};

export const uwebProjects: UWebProject[] = [
  {
    id: "uniqe-web",
    name: "Uniqe Web",
    category: "platform",
    categoryLabel: "Platform",
    description:
      "The central web layer connecting websites, platforms and digital experiences across the Uniqe ecosystem.",
    status: "available",
    statusLabel: "Available",
    href: "/uweb",
    number: "01",
    icon: "◌",
    featured: true,
  },
  {
    id: "uweb-platforms",
    name: "Web Platforms",
    category: "platform",
    categoryLabel: "Platform",
    description:
      "Connected web platforms designed to provide useful digital experiences across different services.",
    status: "development",
    statusLabel: "In Development",
    href: "/uweb",
    number: "02",
    icon: "◇",
    featured: true,
  },
  {
    id: "digital-services",
    name: "Digital Services",
    category: "service",
    categoryLabel: "Services",
    description:
      "Web-based services built to make digital tasks, interactions and experiences more accessible.",
    status: "development",
    statusLabel: "In Development",
    href: "/uweb",
    number: "03",
    icon: "↗",
  },
  {
    id: "web-experiments",
    name: "Web Experiments",
    category: "experimental",
    categoryLabel: "Experimental",
    description:
      "Experimental websites and prototypes exploring new interfaces, ideas and possibilities.",
    status: "experimental",
    statusLabel: "Experimental",
    href: "/lab",
    number: "04",
    icon: "✦",
  },
];