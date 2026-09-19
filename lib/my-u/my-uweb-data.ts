import type {
  UWebProject,
} from "@/lib/uweb/types";

import {
  demoProjects,
} from "@/lib/uweb/mock-data";

import type {
  MyUActivityItem,
  MyUContractSummary,
  MyUProjectSummary,
  MyUWebDashboardData,
} from "./types";

const projectStatusLabels: Record<
  UWebProject["status"],
  string
> = {
  draft: "پیش‌نویس",
  submitted: "ارسال شده",
  under_review: "در حال بررسی",
  matching: "در حال تطبیق متخصص",
  professional_selected: "متخصص انتخاب شده",
  contract_pending: "در انتظار قرارداد",
  contract_signed: "قرارداد امضا شده",
  in_progress: "در حال اجرا",
  submitted_for_review: "ارسال برای بررسی",
  revision: "در حال اصلاح",
  approved: "تأیید شده",
  completed: "تکمیل شده",
  cancelled: "لغو شده",
  disputed: "در حال اختلاف",
  suspended: "معلق",
};

function buildProjectSummary(
  project: UWebProject,
): MyUProjectSummary {
  return {
    id: project.id,

    projectNumber:
      project.projectNumber,

    title:
      project.title,

    area: "uweb",

    status:
      project.status,

    statusLabel:
      projectStatusLabels[
        project.status
      ],

    platform:
      project.platform,

    updatedAt:
      project.updatedAt,

    href:
      `/uweb/projects/${project.id}`,
  };
}

function buildContractSummary(
  project: UWebProject,
): MyUContractSummary {
  return {
    id:
      `${project.id}-contract`,

    projectId:
      project.id,

    projectNumber:
      project.projectNumber,

    title:
      project.title,

    type:
      "three_party_project_agreement",

    typeLabel:
      "قرارداد سه‌طرفه پروژه",

    status:
      "signed",

    statusLabel:
      "امضا شده",

    updatedAt:
      project.updatedAt,

    href:
      `/uweb/contracts/${project.id}`,
  };
}

function buildActivities(
  projects: UWebProject[],
): MyUActivityItem[] {
  const activities: MyUActivityItem[] = [];

  for (const project of projects) {
    activities.push({
      id:
        `${project.id}-activity-project`,

      area: "uweb",

      title:
        "پروژه در My U ثبت شد",

      description:
        `${project.projectNumber} — ${project.title}`,

      createdAt:
        project.createdAt,

      href:
        `/uweb/projects/${project.id}`,
    });

    if (
      project.status ===
      "matching"
    ) {
      activities.push({
        id:
          `${project.id}-activity-matching`,

        area: "uweb",

        title:
          "فرآیند تطبیق متخصص فعال است",

        description:
          "UWeb در حال بررسی متخصصان مناسب برای پروژه است.",

        createdAt:
          project.updatedAt,

        href:
          `/uweb/opportunities/${project.id}/matching`,
      });
    }

    if (
      project.status ===
      "contract_signed"
    ) {
      activities.push({
        id:
          `${project.id}-activity-contract`,

        area: "uweb",

        title:
          "قرارداد پروژه ثبت شد",

        description:
          "قرارداد پروژه در My U در دسترس است.",

        createdAt:
          project.updatedAt,

        href:
          `/uweb/contracts/${project.id}`,
      });
    }
  }

  return activities.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime(),
  );
}

export function getMyUWebDashboard(
  userId = "demo-client",
): MyUWebDashboardData {
  const userProjects =
    demoProjects.filter(
      (project) =>
        project.clientId === userId ||
        project.clientId === "demo-client",
    );

  const projects =
    userProjects.map(
      buildProjectSummary,
    );

  const contracts =
    userProjects
      .filter(
        (project) =>
          project.status ===
            "contract_pending" ||
          project.status ===
            "contract_signed" ||
          project.status ===
            "in_progress" ||
          project.status ===
            "submitted_for_review" ||
          project.status ===
            "revision" ||
          project.status ===
            "approved" ||
          project.status ===
            "completed",
      )
      .map(
        buildContractSummary,
      );

  const activities =
    buildActivities(
      userProjects,
    );

  const activeProjectsCount =
    userProjects.filter(
      (project) =>
        project.status !==
          "completed" &&
        project.status !==
          "cancelled",
    ).length;

  const completedProjectsCount =
    userProjects.filter(
      (project) =>
        project.status ===
        "completed",
    ).length;

  const pendingContractsCount =
    userProjects.filter(
      (project) =>
        project.status ===
        "contract_pending",
    ).length;

  return {
    projects,

    contracts,

    activities,

    activeProjectsCount,

    completedProjectsCount,

    pendingContractsCount,
  };
}

export function getMyUWebProjects(
  userId = "demo-client",
) {
  return getMyUWebDashboard(
    userId,
  ).projects;
}

export function getMyUWebContracts(
  userId = "demo-client",
) {
  return getMyUWebDashboard(
    userId,
  ).contracts;
}