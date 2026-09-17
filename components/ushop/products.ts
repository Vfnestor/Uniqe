export type ProductCategory =
  | "digital"
  | "physical"
  | "service"
  | "experimental";

export type ProductStatus =
  | "available"
  | "development"
  | "coming-soon"
  | "out-of-stock";

export type ProductCurrency =
  | "USD"
  | "EUR"
  | "IRR";

export type ProductFulfillment =
  | "instant"
  | "shipping"
  | "service"
  | "experimental";

export type UShopProduct = {
  id: string;
  slug: string;

  name: string;
  nameFa: string;

  category: ProductCategory;
  categoryLabel: string;
  categoryLabelFa: string;

  shortDescription: string;
  shortDescriptionFa: string;

  description: string;
  descriptionFa: string;

  features: string[];
  featuresFa: string[];

  status: ProductStatus;
  statusLabel: string;
  statusLabelFa: string;

  price: number;
  currency: ProductCurrency;

  fulfillment: ProductFulfillment;

  stock?: number;
  sku?: string;

  href: string;

  number: string;
  icon: string;

  featured?: boolean;
  demo?: boolean;
};

export const ushopProducts: UShopProduct[] = [
  {
    id: "uniqe-digital-kit",
    slug: "uniqe-digital-kit",

    name: "Uniqe Digital Kit",
    nameFa: "کیت دیجیتال Uniqe",

    category: "digital",
    categoryLabel: "Digital",
    categoryLabelFa: "دیجیتال",

    shortDescription:
      "A curated digital toolkit for creators and builders inside the Uniqe ecosystem.",

    shortDescriptionFa:
      "یک مجموعه ابزار دیجیتال برای سازندگان و توسعه‌دهندگان اکوسیستم Uniqe.",

    description:
      "Uniqe Digital Kit is a demo digital product designed to demonstrate how downloadable products can be sold through UShop.",

    descriptionFa:
      "Uniqe Digital Kit یک محصول دیجیتال آزمایشی است که ساختار فروش محصولات قابل دانلود در UShop را نمایش می‌دهد.",

    features: [
      "Digital delivery",
      "Instant access",
      "Reusable resources",
      "Uniqe ecosystem compatible",
    ],

    featuresFa: [
      "تحویل دیجیتال",
      "دسترسی فوری",
      "منابع قابل استفاده مجدد",
      "سازگار با اکوسیستم Uniqe",
    ],

    status: "available",
    statusLabel: "Available",
    statusLabelFa: "موجود",

    price: 19,
    currency: "USD",

    fulfillment: "instant",

    sku: "U-DIGITAL-001",

    href: "/ushop",

    number: "01",
    icon: "◇",

    featured: true,
    demo: true,
  },

  {
    id: "uniqe-smart-device",
    slug: "uniqe-smart-device",

    name: "Uniqe Smart Device",
    nameFa: "دستگاه هوشمند Uniqe",

    category: "physical",
    categoryLabel: "Physical",
    categoryLabelFa: "فیزیکی",

    shortDescription:
      "A conceptual smart device representing the future physical product layer of Uniqe.",

    shortDescriptionFa:
      "یک محصول مفهومی برای نمایش بخش محصولات فیزیکی آینده Uniqe.",

    description:
      "Uniqe Smart Device is a demo physical product used to model inventory, shipping and physical commerce inside UShop.",

    descriptionFa:
      "Uniqe Smart Device یک محصول فیزیکی آزمایشی برای مدل‌سازی موجودی، ارسال و فروش محصولات فیزیکی در UShop است.",

    features: [
      "Physical product",
      "Inventory tracking",
      "Shipping supported",
      "Product SKU",
    ],

    featuresFa: [
      "محصول فیزیکی",
      "مدیریت موجودی",
      "قابل ارسال",
      "دارای SKU",
    ],

    status: "available",
    statusLabel: "Available",
    statusLabelFa: "موجود",

    price: 89,
    currency: "USD",

    fulfillment: "shipping",

    stock: 24,
    sku: "U-HARDWARE-001",

    href: "/ushop",

    number: "02",
    icon: "□",

    featured: true,
    demo: true,
  },

  {
    id: "uniqe-pro-service",
    slug: "uniqe-pro-service",

    name: "Uniqe Pro Service",
    nameFa: "سرویس حرفه‌ای Uniqe",

    category: "service",
    categoryLabel: "Services",
    categoryLabelFa: "خدمات",

    shortDescription:
      "A professional service package designed around the Uniqe digital ecosystem.",

    shortDescriptionFa:
      "یک بسته خدمات حرفه‌ای برای استفاده در اکوسیستم دیجیتال Uniqe.",

    description:
      "Uniqe Pro Service is a demo service product showing how non-physical services can be offered and purchased through UShop.",

    descriptionFa:
      "Uniqe Pro Service یک محصول خدماتی آزمایشی است که نحوه ارائه و خرید خدمات غیر فیزیکی را در UShop نمایش می‌دهد.",

    features: [
      "Professional service",
      "Scheduled delivery",
      "Customer support",
      "Service-based fulfillment",
    ],

    featuresFa: [
      "خدمات حرفه‌ای",
      "ارائه زمان‌بندی‌شده",
      "پشتیبانی مشتری",
      "تحویل مبتنی بر خدمات",
    ],

    status: "available",
    statusLabel: "Available",
    statusLabelFa: "موجود",

    price: 120,
    currency: "USD",

    fulfillment: "service",

    sku: "U-SERVICE-001",

    href: "/ushop",

    number: "03",
    icon: "↗",

    featured: true,
    demo: true,
  },

  {
    id: "uniqe-lab-x",
    slug: "uniqe-lab-x",

    name: "Uniqe LAB X",
    nameFa: "Uniqe LAB X",

    category: "experimental",
    categoryLabel: "Experimental",
    categoryLabelFa: "آزمایشی",

    shortDescription:
      "An experimental product concept exploring new commerce experiences.",

    shortDescriptionFa:
      "یک محصول آزمایشی برای بررسی تجربه‌های جدید در تجارت دیجیتال.",

    description:
      "Uniqe LAB X is an experimental product concept. It is included in the demo catalog to establish a foundation for future experimental products.",

    descriptionFa:
      "Uniqe LAB X یک محصول آزمایشی است که برای ایجاد زیرساخت محصولات تجربی آینده در کاتالوگ UShop قرار گرفته است.",

    features: [
      "Experimental product",
      "Limited availability",
      "Future-ready structure",
      "LAB ecosystem integration",
    ],

    featuresFa: [
      "محصول آزمایشی",
      "موجودی محدود",
      "ساختار آماده برای آینده",
      "اتصال به اکوسیستم LAB",
    ],

    status: "coming-soon",
    statusLabel: "Coming Soon",
    statusLabelFa: "به‌زودی",

    price: 29,
    currency: "USD",

    fulfillment: "experimental",

    stock: 10,
    sku: "U-LAB-001",

    href: "/ushop",

    number: "04",
    icon: "✦",

    featured: false,
    demo: true,
  },
];