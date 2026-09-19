import type {
  UWebProject,
  UWebProjectStatus,
} from "./types";

import {
  uwebDemoProject,
  demoProjects,
  demoProfessionals,
} from "./mock-data";

import {
  rankProfessionals,
} from "./matching";

export type UWebOpportunity = {
  project: UWebProject;

  matchScore: number;

  matchedSkills: number;
  requiredSkills: number;

  platformMatch: boolean;
  availabilityMatch: boolean;

  applicantsCount: number;

  publishedAt: string;

  applicationDeadline?: string;
};

export type UWebOpportunityFilter =
  | "all"
  | "new_website"
  | "redesign"
  | "feature_development"
  | "bug_fix"
  | "maintenance"
  | "optimization"
  | "custom";

const allowedStatuses: UWebProjectStatus[] = [
  "matching",
  "professional_selected",
];

function buildOpportunity(
  project: UWebProject,
  applicantsCount: number,
  publishedAt: string,
  applicationDeadline?: string,
): UWebOpportunity {
  const ranked = rankProfessionals(
    project,
    demoProfessionals,
  );

  const bestMatch = ranked[0];

  return {
    project,

    matchScore: bestMatch?.score ?? 0,

    matchedSkills:
      bestMatch?.matchedSkills ?? 0,

    requiredSkills:
      project.requiredSkills.length,

    platformMatch:
      bestMatch?.platformMatch ?? false,

    availabilityMatch:
      bestMatch?.availabilityMatch ?? false,

    applicantsCount,

    publishedAt,

    applicationDeadline,
  };
}

const sourceProjects: UWebProject[] = [
  ...demoProjects,
  {
    ...uwebDemoProject,

    id: "uweb-project-demo-02",
    projectNumber: "UW-000002",

    title: "وب‌سایت شرکتی مدرن",

    projectType: "new_website",
    websiteType: "corporate",

    purpose: [
      "معرفی شرکت",
      "نمایش خدمات",
      "دریافت سرنخ فروش",
    ],

    platform: "nextjs",

    features: [
      "صفحات خدمات",
      "فرم تماس",
      "Blog",
      "SEO",
      "پنل مدیریت محتوا",
    ],

    designRequirements: [
      "طراحی مینیمال",
      "Responsive",
      "UI/UX اختصاصی",
    ],

    contentRequirements: [
      "محتوای فارسی",
      "صفحات معرفی خدمات",
    ],

    languages: [
      "fa",
      "en",
    ],

    requiredSkills: [
      {
        skillId: "skill-nextjs",
        requiredLevel: "professional",
        priority: "required",
      },
      {
        skillId: "skill-ui-ux",
        requiredLevel: "intermediate",
        priority: "required",
      },
      {
        skillId: "skill-seo",
        requiredLevel: "intermediate",
        priority: "preferred",
      },
    ],

    budget: {
      min: 1500,
      max: 2800,
      currency: "USD",
    },

    expectedDurationDays: 35,

    status: "matching",

    createdAt:
      "2026-09-18T10:00:00.000Z",

    updatedAt:
      "2026-09-19T08:00:00.000Z",
  },
];

export const uwebOpportunities: UWebOpportunity[] =
  sourceProjects
    .filter((project) =>
      allowedStatuses.includes(
        project.status,
      ),
    )
    .map((project, index) =>
      buildOpportunity(
        project,
        index === 0 ? 4 : 2,
        project.createdAt,
        "2026-09-25T23:59:59.000Z",
      ),
    );

export function getUWebOpportunity(
  id: string,
): UWebOpportunity | undefined {
  return uwebOpportunities.find(
    (opportunity) =>
      opportunity.project.id === id,
  );
}

export function filterUWebOpportunities(
  opportunities: UWebOpportunity[],
  filter: UWebOpportunityFilter,
): UWebOpportunity[] {
  if (filter === "all") {
    return opportunities;
  }

  return opportunities.filter(
    (opportunity) =>
      opportunity.project.projectType ===
      filter,
  );
}