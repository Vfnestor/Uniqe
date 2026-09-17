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
    id: "product-001",
    slug: "uniqe-digital-kit",

    name: "Uniqe Digital Kit",
    nameFa: "کیت دیجیتال Uniqe",

    category: "digital",
    categoryLabel: "Digital",
    categoryLabelFa: "دیجیتال",

    shortDescription:
      "A digital toolkit designed for modern creators and builders.",

    shortDescriptionFa:
      "یک مجموعه ابزار دیجیتال برای سازندگان و توسعه‌دهندگان مدرن.",

    description:
      "Uniqe Digital Kit is a practical digital package designed to help creators, developers, and digital builders start faster and organize their workflow inside the Uniqe ecosystem.",

    descriptionFa:
      "کیت دیجیتال Uniqe یک بسته کاربردی برای سازندگان، توسعه‌دهندگان و فعالان حوزه دیجیتال است که به شما کمک می‌کند سریع‌تر شروع کنید و فرآیند کاری خود را در اکوسیستم Uniqe سازمان‌دهی کنید.",

    features: [
      "Digital resources",
      "Creator-focused workflow",
      "Reusable components",
      "Uniqe ecosystem compatibility",
      "Instant digital delivery",
    ],

    featuresFa: [
      "منابع دیجیتال",
      "Workflow مخصوص سازندگان",
      "کامپوننت‌های قابل استفاده مجدد",
      "سازگار با اکوسیستم Uniqe",
      "تحویل فوری دیجیتال",
    ],

    status: "available",
    statusLabel: "Available",
    statusLabelFa: "موجود",

    price: 19,
    currency: "USD",

    fulfillment: "instant",

    sku: "U-DIG-001",

    href: "/ushop/products/uniqe-digital-kit",

    number: "01",
    icon: "✦",

    featured: true,
    demo: true,
  },

  {
    id: "product-002",
    slug: "uniqe-smart-device",

    name: "Uniqe Smart Device",
    nameFa: "دستگاه هوشمند Uniqe",

    category: "physical",
    categoryLabel: "Physical",
    categoryLabelFa: "فیزیکی",

    shortDescription:
      "A conceptual smart device designed around the Uniqe ecosystem.",

    shortDescriptionFa:
      "یک دستگاه هوشمند مفهومی که بر پایه اکوسیستم Uniqe طراحی شده است.",

    description:
      "Uniqe Smart Device is a physical product concept designed to connect the digital world of Uniqe with real-world interaction and smart experiences.",

    descriptionFa:
      "دستگاه هوشمند Uniqe یک محصول فیزیکی مفهومی است که برای ایجاد ارتباط میان دنیای دیجیتال Uniqe و تجربه‌های هوشمند در دنیای واقعی طراحی شده است.",

    features: [
      "Smart interaction",
      "Modern hardware concept",
      "Uniqe ecosystem integration",
      "Physical delivery",
      "Designed for future expansion",
    ],

    featuresFa: [
      "تعامل هوشمند",
      "طراحی سخت‌افزاری مدرن",
      "یکپارچگی با اکوسیستم Uniqe",
      "تحویل فیزیکی",
      "طراحی‌شده برای توسعه در آینده",
    ],

    status: "available",
    statusLabel: "Available",
    statusLabelFa: "موجود",

    price: 89,
    currency: "USD",

    fulfillment: "shipping",

    stock: 24,
    sku: "U-PHY-001",

    href: "/ushop/products/uniqe-smart-device",

    number: "02",
    icon: "◈",

    featured: true,
    demo: true,
  },

  {
    id: "product-003",
    slug: "uniqe-pro-service",

    name: "Uniqe Pro Service",
    nameFa: "سرویس حرفه‌ای Uniqe",

    category: "service",
    categoryLabel: "Service",
    categoryLabelFa: "خدمات",

    shortDescription:
      "Professional digital services for projects that need an expert layer.",

    shortDescriptionFa:
      "خدمات حرفه‌ای دیجیتال برای پروژه‌هایی که به یک لایه تخصصی نیاز دارند.",

    description:
      "Uniqe Pro Service provides professional support for digital projects, product development, automation, and selected technical workflows within the Uniqe ecosystem.",

    descriptionFa:
      "Uniqe Pro Service مجموعه‌ای از خدمات حرفه‌ای برای پروژه‌های دیجیتال، توسعه محصول، اتوماسیون و برخی فرآیندهای فنی در اکوسیستم Uniqe ارائه می‌کند.",

    features: [
      "Professional consultation",
      "Project support",
      "Technical workflow review",
      "Digital product assistance",
      "Flexible service delivery",
    ],

    featuresFa: [
      "مشاوره حرفه‌ای",
      "پشتیبانی پروژه",
      "بررسی فرآیندهای فنی",
      "کمک در توسعه محصول دیجیتال",
      "ارائه خدمات انعطاف‌پذیر",
    ],

    status: "available",
    statusLabel: "Available",
    statusLabelFa: "موجود",

    price: 120,
    currency: "USD",

    fulfillment: "service",

    sku: "U-SRV-001",

    href: "/ushop/products/uniqe-pro-service",

    number: "03",
    icon: "◎",

    demo: true,
  },

  {
    id: "product-004",
    slug: "uniqe-lab-x",

    name: "Uniqe LAB X",
    nameFa: "Uniqe LAB X",

    category: "experimental",
    categoryLabel: "Experimental",
    categoryLabelFa: "آزمایشی",

    shortDescription:
      "An experimental product from the Uniqe LAB.",

    shortDescriptionFa:
      "یک محصول آزمایشی از آزمایشگاه Uniqe.",

    description:
      "Uniqe LAB X represents an experimental product line where new concepts, technologies, and unconventional ideas can be explored before becoming part of the wider Uniqe ecosystem.",

    descriptionFa:
      "Uniqe LAB X نماینده یک خط محصول آزمایشی است که در آن ایده‌ها، فناوری‌ها و مفاهیم جدید پیش از ورود به اکوسیستم اصلی Uniqe مورد بررسی و آزمایش قرار می‌گیرند.",

    features: [
      "Experimental technology",
      "LAB research concept",
      "Early-stage product",
      "Future ecosystem integration",
      "Limited availability",
    ],

    featuresFa: [
      "فناوری آزمایشی",
      "مفهوم پژوهشی LAB",
      "محصول در مراحل اولیه",
      "امکان یکپارچه‌سازی با اکوسیستم آینده",
      "موجودی محدود",
    ],

    status: "coming-soon",
    statusLabel: "Coming Soon",
    statusLabelFa: "به‌زودی",

    price: 29,
    currency: "USD",

    fulfillment: "experimental",

    stock: 10,
    sku: "U-LAB-X01",

    href: "/ushop/products/uniqe-lab-x",

    number: "04",
    icon: "△",

    demo: true,
  },
];