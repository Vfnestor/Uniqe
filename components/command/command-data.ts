export type CommandCategory =
  | "Navigation"
  | "Personal"
  | "Ecosystem";

export type CommandItem = {
  id: string;
  title: string;
  description: string;
  category: CommandCategory;
  href: string;
  icon: string;
  keywords: string[];
};

export const commandItems: CommandItem[] = [
  {
    id: "home",
    title: "Home",
    description: "Return to the Uniqe home page.",
    category: "Navigation",
    href: "/",
    icon: "⌂",
    keywords: [
      "home",
      "main",
      "uniqe",
    ],
  },
  {
    id: "uapps",
    title: "UApps",
    description: "Explore applications and digital tools.",
    category: "Ecosystem",
    href: "/uapps",
    icon: "◈",
    keywords: [
      "uapps",
      "apps",
      "applications",
      "tools",
    ],
  },
  {
    id: "uweb",
    title: "UWeb",
    description: "Explore websites and digital projects.",
    category: "Ecosystem",
    href: "/uweb",
    icon: "◇",
    keywords: [
      "uweb",
      "web",
      "websites",
      "projects",
    ],
  },
  {
    id: "ushop",
    title: "UShop",
    description: "Explore products and services.",
    category: "Ecosystem",
    href: "/ushop",
    icon: "□",
    keywords: [
      "ushop",
      "shop",
      "store",
      "products",
      "services",
    ],
  },
  {
    id: "uschool",
    title: "USchool",
    description: "Explore learning and education.",
    category: "Ecosystem",
    href: "/uschool",
    icon: "✦",
    keywords: [
      "uschool",
      "school",
      "education",
      "learning",
      "courses",
    ],
  },
  {
    id: "ucore",
    title: "UCore",
    description: "Explore the core technical layer.",
    category: "Ecosystem",
    href: "/ucore",
    icon: "◈",
    keywords: [
      "ucore",
      "core",
      "platform",
      "data",
      "infrastructure",
    ],
  },
  {
    id: "lab",
    title: "LAB",
    description: "Explore experiments and new ideas.",
    category: "Ecosystem",
    href: "/lab",
    icon: "✧",
    keywords: [
      "lab",
      "experiments",
      "research",
      "prototype",
      "ai",
    ],
  },
  {
    id: "my-u",
    title: "My U",
    description: "Open your personal Uniqe space.",
    category: "Personal",
    href: "/my-u",
    icon: "U",
    keywords: [
      "my u",
      "account",
      "dashboard",
      "personal",
    ],
  },
  {
    id: "profile",
    title: "Profile",
    description: "Open your personal profile.",
    category: "Personal",
    href: "/my-u/profile",
    icon: "◎",
    keywords: [
      "profile",
      "identity",
      "account",
      "preferences",
    ],
  },
  {
    id: "activity",
    title: "Activity",
    description: "View your activity timeline.",
    category: "Personal",
    href: "/my-u/activity",
    icon: "↗",
    keywords: [
      "activity",
      "timeline",
      "history",
    ],
  },
  {
    id: "search",
    title: "Global Search",
    description: "Search across the Uniqe ecosystem.",
    category: "Navigation",
    href: "/search",
    icon: "/",
    keywords: [
      "search",
      "find",
      "discover",
    ],
  },
];

export const commandCategories: CommandCategory[] = [
  "Navigation",
  "Personal",
  "Ecosystem",
];