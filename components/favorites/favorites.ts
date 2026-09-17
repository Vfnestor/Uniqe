export type FavoriteCategory =
  | "UApps"
  | "UWeb"
  | "UShop"
  | "USchool"
  | "UCore"
  | "LAB";

export type FavoriteItem = {
  id: string;
  title: string;
  description: string;
  category: FavoriteCategory;
  href: string;
  icon: string;
  keywords: string[];
};

export const favoriteItems: FavoriteItem[] = [
  {
    id: "favorite-uapps",
    title: "UApps",
    description:
      "Applications, digital tools and experiences inside the UApps ecosystem.",
    category: "UApps",
    href: "/uapps",
    icon: "◈",
    keywords: ["apps", "applications", "tools"],
  },
  {
    id: "favorite-uweb",
    title: "UWeb",
    description:
      "Websites and digital projects created within the Uniqe ecosystem.",
    category: "UWeb",
    href: "/uweb",
    icon: "◇",
    keywords: ["web", "websites", "projects"],
  },
  {
    id: "favorite-ushop",
    title: "UShop",
    description:
      "The commerce layer for products, services and digital experiences.",
    category: "UShop",
    href: "/ushop",
    icon: "□",
    keywords: ["shop", "store", "products", "services"],
  },
  {
    id: "favorite-uschool",
    title: "USchool",
    description:
      "Learning paths, educational resources and future learning experiences.",
    category: "USchool",
    href: "/uschool",
    icon: "✦",
    keywords: ["school", "education", "learning", "courses"],
  },
  {
    id: "favorite-ucore",
    title: "UCore",
    description:
      "The central technical foundation connecting the different layers of Uniqe.",
    category: "UCore",
    href: "/ucore",
    icon: "◈",
    keywords: ["core", "platform", "data", "infrastructure"],
  },
  {
    id: "favorite-lab",
    title: "LAB",
    description:
      "Experimental ideas, prototypes, research and emerging technologies.",
    category: "LAB",
    href: "/lab",
    icon: "✧",
    keywords: ["lab", "research", "experiment", "prototype"],
  },
];

export const favoriteFilters = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "UApps",
    label: "UApps",
  },
  {
    id: "UWeb",
    label: "UWeb",
  },
  {
    id: "UShop",
    label: "UShop",
  },
  {
    id: "USchool",
    label: "USchool",
  },
  {
    id: "UCore",
    label: "UCore",
  },
  {
    id: "LAB",
    label: "LAB",
  },
] as const;

export const FAVORITES_STORAGE_KEY =
  "uniqe-favorites";