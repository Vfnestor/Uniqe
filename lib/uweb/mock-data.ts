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
  },
  {
    id: "skill-woocommerce",
    name: "WooCommerce",
    slug: "woocommerce",
    category: "E-commerce",
    description: "WooCommerce stores and integrations.",
  },
  {
    id: "skill-ui-ux",
    name: "UI/UX",
    slug: "ui-ux",
    category: "Design",
    description: "User interface and user experience design.",
  },
  {
    id: "skill-seo",
    name: "SEO",
    slug: "seo",
    category: "Marketing",
    description: "Technical and on-page SEO.",
  },
  {
    id: "skill-nextjs",
    name: "Next.js",
    slug: "nextjs",
    category: "Development",
    description: "Modern web applications with Next.js.",
  },
];

export const demoProfessionals: UWebProfessionalProfile[] = [
  {
    id: "professional-wordpress-01",
    userId: "professional-demo-01",
    displayName: "WordPress & E-Commerce Developer",
    bio: "WordPress developer focused on e-commerce and scalable websites.",
    experienceLevel: "senior",
    skills: [
      {
        skillId: "skill-wordpress",
        level: "expert",
      },
      {
        skillId: "skill-woocommerce",
        level: "expert",
      },
      {
        skillId: "skill-seo",
        level: "mid",
      },
      {
        skillId: "skill-ui-ux",
        level: "mid",
      },
    ],
    supportedPlatforms: ["wordpress"],
    availability: "available",
    activeProjectCount: 1,
    maxActiveProjects: 3,
  },
  {
    id: "professional-nextjs-01",
    userId: "professional-demo-02",
    displayName: "Next.js Product Developer",
    bio: "Next.js developer focused on modern products and web applications.",
    experienceLevel: "expert",
    skills: [
      {
        skillId: "skill-nextjs",
        level: "expert",
      },
      {
        skillId: "skill-ui-ux",
        level: "senior",
      },
      {
        skillId: "skill-seo",
        level: "mid",
      },
    ],
    supportedPlatforms: ["nextjs", "custom"],
    availability: "available",
    activeProjectCount: 0,
    maxActiveProjects: 2,
  },
];

export const uwebDemoProject: UWebProject = {
  id: "uweb-project-demo-01",
  projectNumber: "UW-000001",
  clientId: "demo-client",
  title: "فروشگاه اینترنتی نمونه",
  description:
    "یک فروشگاه اینترنتی مدرن و Responsive برای فروش محصولات به‌صورت آنلاین.",
  projectType: "new_website",
  websiteType: "ecommerce",
  purpose: "فروش آنلاین",
  platform: "wordpress",

  features: [
    "WooCommerce",
    "درگاه پرداخت",
    "سبد خرید",
    "پنل کاربری",
    "SEO",
  ],

  design: [
    "مدرن",
    "Responsive",
    "UI/UX اختصاصی",
  ],

  content: {
    status: "آماده",
    language: "fa",
  },

  budget: {
    min: 1000,
    max: 1800,
    currency: "USD",
  },

  durationDays: 30,

  requiredSkills: [
    {
      skillId: "skill-wordpress",
      name: "WordPress",
      required: true,
      experienceLevel: "senior",
    },
    {
      skillId: "skill-woocommerce",
      name: "WooCommerce",
      required: true,
      experienceLevel: "senior",
    },
    {
      skillId: "skill-ui-ux",
      name: "UI/UX",
      required: false,
      experienceLevel: "mid",
    },
    {
      skillId: "skill-seo",
      name: "SEO",
      required: false,
      experienceLevel: "mid",
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
 * Later this will be replaced by the project repository/API layer.
 */
export const demoProjects: UWebProject[] = [
  uwebDemoProject,
];