import type {
  UWebProfessionalProfile,
  UWebProject,
  UWebSkill,
} from "./types";

export const uwebSkills: UWebSkill[] = [
  {
    id: "skill-wordpress",
    name: "WordPress",
    slug: "wordpress",
    category: "CMS",
    description:
      "WordPress website development and configuration.",
    status: "active",
  },
  {
    id: "skill-woocommerce",
    name: "WooCommerce",
    slug: "woocommerce",
    category: "E-Commerce",
    description:
      "WooCommerce storefront and commerce features.",
    status: "active",
  },
  {
    id: "skill-ui-ux",
    name: "UI/UX",
    slug: "ui-ux",
    category: "Design",
    description:
      "Interface and user-experience design.",
    status: "active",
  },
  {
    id: "skill-seo",
    name: "SEO",
    slug: "seo",
    category: "Marketing",
    description:
      "Technical and on-page search optimization.",
    status: "active",
  },
  {
    id: "skill-nextjs",
    name: "Next.js",
    slug: "nextjs",
    category: "Development",
    description:
      "Next.js application development.",
    status: "active",
  },
];

export const uwebProfessionals: UWebProfessionalProfile[] =
  [
    {
      id: "professional-demo-01",

      userId:
        "demo-professional-01",

      headline:
        "WordPress & E-Commerce Developer",

      bio:
        "Demo professional profile for UWeb Foundation.",

      skillIds: [
        "skill-wordpress",
        "skill-woocommerce",
        "skill-ui-ux",
        "skill-seo",
      ],

      platforms: [
        "wordpress",
      ],

      experienceLevel:
        "professional",

      availability:
        "available",

      status:
        "active",
    },

    {
      id: "professional-demo-02",

      userId:
        "demo-professional-02",

      headline:
        "Next.js Product Developer",

      bio:
        "Demo professional profile for UWeb Foundation.",

      skillIds: [
        "skill-nextjs",
        "skill-ui-ux",
      ],

      platforms: [
        "nextjs",
        "react",
      ],

      experienceLevel:
        "expert",

      availability:
        "available",

      status:
        "active",
    },
  ];

export const uwebDemoProject: UWebProject =
  {
    id:
      "uweb-project-demo-01",

    projectNumber:
      "UW-000001",

    clientId:
      "demo-client",

    title:
      "فروشگاه اینترنتی نمونه",

    projectType:
      "new_website",

    websiteType:
      "ecommerce",

    purpose: [
      "فروش محصول",
      "عضویت کاربران",
    ],

    platform:
      "wordpress",

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
      "متن آماده",
      "تصاویر آماده",
    ],

    languages: [
      "fa",
    ],

    referenceLinks: [],

    description:
      "پروژه نمونه برای نمایش Foundation سیستم سفارش و تطبیق UWeb.",

    attachments: [],

    budget: {
      min: 1000,
      max: 1800,
      currency: "USD",
    },

    expectedDurationDays:
      30,

    requiredSkills: [
      {
        skillId:
          "skill-wordpress",

        requiredLevel:
          "professional",

        priority:
          "required",
      },

      {
        skillId:
          "skill-woocommerce",

        requiredLevel:
          "professional",

        priority:
          "required",
      },

      {
        skillId:
          "skill-ui-ux",

        requiredLevel:
          "intermediate",

        priority:
          "preferred",
      },

      {
        skillId:
          "skill-seo",

        requiredLevel:
          "intermediate",

        priority:
          "preferred",
      },
    ],

    status:
      "matching",

    createdAt:
      "2026-09-19T00:00:00.000Z",

    updatedAt:
      "2026-09-19T00:00:00.000Z",
  };