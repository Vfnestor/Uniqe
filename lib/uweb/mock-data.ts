import type {
  UWebProfessionalProfile,
  UWebProject,
  UWebSkill,
} from "./types";

export const demoSkills: UWebSkill[] = [
  {
    id: "skill-wordpress",
    name: "WordPress",
    slug: "wordpress",
    category: "Development",
    description: "WordPress development and customization.",
    status: "active",
  },
  {
    id: "skill-woocommerce",
    name: "WooCommerce",
    slug: "woocommerce",
    category: "E-commerce",
    description: "WooCommerce stores and integrations.",
    status: "active",
  },
  {
    id: "skill-ui-ux",
    name: "UI/UX",
    slug: "ui-ux",
    category: "Design",
    description: "User interface and user experience design.",
    status: "active",
  },
  {
    id: "skill-seo",
    name: "SEO",
    slug: "seo",
    category: "Marketing",
    description: "Technical and on-page SEO.",
    status: "active",
  },
  {
    id: "skill-nextjs",
    name: "Next.js",
    slug: "nextjs",
    category: "Development",
    description: "Modern web applications with Next.js.",
    status: "active",
  },
];

export const demoProfessionals: UWebProfessionalProfile[] = [
  {
    id: "professional-wordpress-01",
    userId: "professional-demo-01",
    headline: "WordPress & E-Commerce Developer",
    bio: "WordPress developer focused on e-commerce and scalable websites.",
    skillIds: [
      "skill-wordpress",
      "skill-woocommerce",
      "skill-seo",
      "skill-ui-ux",
    ],
    platforms: ["wordpress"],
    experienceLevel: "professional",
    availability: "available",
    status: "active",
  },
  {
    id: "professional-nextjs-01",
    userId: "professional-demo-02",
    headline: "Next.js Product Developer",
    bio: "Next.js developer focused on modern products and web applications.",
    skillIds: [
      "skill-nextjs",
      "skill-ui-ux",
      "skill-seo",
    ],
    platforms: ["nextjs", "custom"],
    experienceLevel: "expert",
    availability: "available",
    status: "active",
  },
];

export const uwebDemoProject: UWebProject = {
  id: "uweb-project-demo-01",
  projectNumber: "UW-000001",
  clientId: "demo-client",

  title: "فروشگاه اینترنتی نمونه",

  projectType: "new_website",
  websiteType: "ecommerce",

  purpose: [
    "فروش آنلاین",
    "افزایش فروش",
    "ارائه محصولات به‌صورت آنلاین",
  ],

  platform: "wordpress",

  features: [
    "WooCommerce",
    "درگاه پرداخت",
    "سبد خرید",
    "پنل کاربری",
    "SEO",
  ],

  designRequirements: [
    "طراحی مدرن",
    "Responsive",
    "UI/UX اختصاصی",
  ],

  contentRequirements: [
    "معرفی محصولات",
    "توضیحات محصولات",
    "محتوای فارسی",
  ],

  languages: [
    "fa",
  ],

  referenceLinks: [],

  description:
    "یک فروشگاه اینترنتی مدرن و Responsive برای فروش محصولات به‌صورت آنلاین.",

  attachments: [],

  budget: {
    min: 1000,
    max: 1800,
    currency: "USD",
  },

  expectedDurationDays: 30,

  requiredSkills: [
    {
      skillId: "skill-wordpress",
      requiredLevel: "professional",
      priority: "required",
    },
    {
      skillId: "skill-woocommerce",
      requiredLevel: "professional",
      priority: "required",
    },
    {
      skillId: "skill-ui-ux",
      requiredLevel: "intermediate",
      priority: "preferred",
    },
    {
      skillId: "skill-seo",
      requiredLevel: "intermediate",
      priority: "preferred",
    },
  ],

  status: "matching",

  createdAt: "2026-09-19T00:00:00.000Z",
  updatedAt: "2026-09-19T00:00:00.000Z",
};

/*
 * UWEB-04
 *
 * Temporary project collection.
 *
 * Later this will be replaced by the
 * project repository / API layer.
 */
export const demoProjects: UWebProject[] = [
  uwebDemoProject,
];