export type ProductCategory =
  | "digital"
  | "physical"
  | "service"
  | "experimental";

export type ProductStatus =
  | "available"
  | "development"
  | "coming-soon";

export type UShopProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  status: ProductStatus;
  statusLabel: string;
  href: string;
  number: string;
  icon: string;
  featured?: boolean;
};

export const ushopProducts: UShopProduct[] = [
  {
    id: "uniqe-digital",
    name: "Uniqe Digital",
    category: "digital",
    categoryLabel: "Digital",
    description:
      "Digital products and resources designed to become useful parts of the wider Uniqe ecosystem.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/ushop",
    number: "01",
    icon: "◇",
    featured: true,
  },
  {
    id: "uniqe-services",
    name: "Uniqe Services",
    category: "service",
    categoryLabel: "Services",
    description:
      "A foundation for discovering services and solutions connected to the Uniqe ecosystem.",
    status: "development",
    statusLabel: "In Development",
    href: "/ushop",
    number: "02",
    icon: "↗",
    featured: true,
  },
  {
    id: "uniqe-products",
    name: "Uniqe Products",
    category: "physical",
    categoryLabel: "Products",
    description:
      "Physical products and curated items that can become part of the future Uniqe marketplace.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/ushop",
    number: "03",
    icon: "□",
  },
  {
    id: "ushop-lab",
    name: "UShop LAB",
    category: "experimental",
    categoryLabel: "Experimental",
    description:
      "Experimental commerce concepts exploring new ways to connect products, services and digital experiences.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/lab",
    number: "04",
    icon: "✦",
  },
];