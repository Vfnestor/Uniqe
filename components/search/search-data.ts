export type SearchCategory =
  | "UApps"
  | "UWeb"
  | "UShop"
  | "USchool"
  | "UCore"
  | "LAB"
  | "My U";

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  href: string;
  icon: string;
  keywords: string[];
};

export const searchResults: SearchResult[] = [
  {
    id: "search-uapps",
    title: "UApps",
    description:
      "Applications, digital tools and experiences inside the UApps ecosystem.",
    category: "UApps",
    href: "/uapps",
    icon: "◈",
    keywords: [
      "apps",
      "applications",
      "tools",
      "productivity",
      "automation",
    ],
  },
  {
    id: "search-uweb",
    title: "UWeb",
    description:
      "Websites and digital projects created within the Uniqe ecosystem.",
    category: "UWeb",
    href: "/uweb",
    icon: "◇",
    keywords: [
      "web",
      "websites",
      "projects",
      "digital",
      "internet",
    ],
  },
  {
    id: "search-ushop",
    title: "UShop",
    description:
      "The commerce layer for products, services and digital experiences.",
    category: "UShop",
    href: "/ushop",
    icon: "□",
    keywords: [
      "shop",
      "store",
      "products",
      "services",
      "commerce",
    ],
  },
  {
    id: "search-uschool",
    title: "USchool",
    description:
      "Learning paths, educational resources and future learning experiences.",
    category: "USchool",
    href: "/uschool",
    icon: "✦",
    keywords: [
      "school",
      "education",
      "learning",
      "courses",
      "knowledge",
    ],
  },
  {
    id: "search-ucore",
    title: "UCore",
    description:
      "The central technical foundation connecting the different layers of Uniqe.",
    category: "UCore",
    href: "/ucore",
    icon: "◈",
    keywords: [
      "core",
      "platform",
      "data",
      "integration",
      "infrastructure",
    ],
  },
  {
    id: "search-lab",
    title: "LAB",
    description:
      "Experimental ideas, prototypes, research and emerging technologies.",
    category: "LAB",
    href: "/lab",
    icon: "✧",
    keywords: [
      "lab",
      "research",
      "experiment",
      "prototype",
      "technology",
      "ai",
    ],
  },
  {
    id: "search-my-u",
    title: "My U",
    description:
      "Your personal space for profile, activity and future Uniqe services.",
    category: "My U",
    href: "/my-u",
    icon: "U",
    keywords: [
      "account",
      "profile",
      "activity",
      "personal",
      "dashboard",
    ],
  },
  {
    id: "search-profile",
    title: "Profile",
    description:
      "Manage your identity and personal preferences inside Uniqe.",
    category: "My U",
    href: "/my-u/profile",
    icon: "◎",
    keywords: [
      "profile",
      "identity",
      "preferences",
      "account",
      "settings",
    ],
  },
  {
    id: "search-activity",
    title: "Activity",
    description:
      "View your activity timeline across the Uniqe ecosystem.",
    category: "My U",
    href: "/my-u/activity",
    icon: "↗",
    keywords: [
      "activity",
      "timeline",
      "history",
      "tracking",
      "actions",
    ],
  },
];