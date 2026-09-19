import type {
  UWebDelivery,
  UWebMilestone,
  UWebProjectActivity,
  UWebRevision,
  UWebProject,
} from "./types";

import {
  getUWebOpportunity,
} from "./opportunity-data";

export type UWebWorkspaceData = {
  project: UWebProject;

  milestones: UWebMilestone[];

  deliveries: UWebDelivery[];

  revisions: UWebRevision[];

  activities: UWebProjectActivity[];

  filesCount: number;

  messagesCount: number;
};

function buildMilestones(
  project: UWebProject,
): UWebMilestone[] {
  return [
    {
      id: `${project.id}-milestone-01`,
      projectId: project.id,

      title: "تحلیل و طراحی",
      description:
        "بررسی نیازمندی‌ها و آماده‌سازی ساختار اولیه پروژه.",

      order: 1,

      status: "completed",

      startAt:
        "2026-09-20T08:00:00.000Z",

      dueAt:
        "2026-09-25T23:59:59.000Z",

      completedAt:
        "2026-09-24T15:00:00.000Z",
    },

    {
      id: `${project.id}-milestone-02`,
      projectId: project.id,

      title: "توسعه اصلی",
      description:
        "پیاده‌سازی بخش‌های اصلی پروژه مطابق نیازمندی‌ها.",

      order: 2,

      status: "in_progress",

      startAt:
        "2026-09-25T08:00:00.000Z",

      dueAt:
        "2026-10-05T23:59:59.000Z",
    },

    {
      id: `${project.id}-milestone-03`,
      projectId: project.id,

      title: "تست و تحویل",
      description:
        "تست نهایی، رفع مشکلات و تحویل پروژه.",

      order: 3,

      status: "pending",

      startAt:
        "2026-10-06T08:00:00.000Z",

      dueAt:
        "2026-10-10T23:59:59.000Z",
    },
  ];
}

function buildDeliveries(
  project: UWebProject,
  milestones: UWebMilestone[],
): UWebDelivery[] {
  const firstMilestone =
    milestones[0];

  if (!firstMilestone) {
    return [];
  }

  return [
    {
      id: `${project.id}-delivery-01`,

      projectId: project.id,

      milestoneId:
        firstMilestone.id,

      professionalId:
        "professional-demo-01",

      version: "v1.0",

      description:
        "نسخه اولیه خروجی طراحی و ساختار پروژه برای بررسی.",

      files: [],

      demoUrl:
        "https://example.com",

      status: "approved",

      createdAt:
        "2026-09-24T15:00:00.000Z",
    },
  ];
}

function buildRevisions(
  project: UWebProject,
  deliveries: UWebDelivery[],
): UWebRevision[] {
  const delivery =
    deliveries[0];

  if (!delivery) {
    return [];
  }

  return [
    {
      id: `${project.id}-revision-01`,

      projectId: project.id,

      deliveryId:
        delivery.id,

      requestedBy:
        "demo-client",

      description:
        "تغییر جزئی در بخش طراحی صفحه اصلی.",

      attachments: [],

      status: "approved",

      createdAt:
        "2026-09-23T10:00:00.000Z",

      resolvedAt:
        "2026-09-24T14:00:00.000Z",
    },
  ];
}

function buildActivities(
  project: UWebProject,
): UWebProjectActivity[] {
  return [
    {
      id: `${project.id}-activity-01`,

      projectId: project.id,

      actorId:
        "system",

      action:
        "workspace_created",

      metadata: {
        message:
          "فضای کاری پروژه ایجاد شد.",
      },

      createdAt:
        "2026-09-19T10:00:00.000Z",
    },

    {
      id: `${project.id}-activity-02`,

      projectId: project.id,

      actorId:
        "uniqe-owner",

      action:
        "contract_signed",

      metadata: {
        message:
          "قرارداد پروژه ثبت شد.",
      },

      createdAt:
        "2026-09-20T08:00:00.000Z",
    },

    {
      id: `${project.id}-activity-03`,

      projectId: project.id,

      actorId:
        "professional-demo-01",

      action:
        "milestone_started",

      metadata: {
        message:
          "متخصص اجرای Milestone دوم را آغاز کرد.",
      },

      createdAt:
        "2026-09-25T08:00:00.000Z",
    },
  ];
}

export function getUWebWorkspace(
  id: string,
): UWebWorkspaceData | undefined {
  const opportunity =
    getUWebOpportunity(id);

  if (!opportunity) {
    return undefined;
  }

  const project =
    opportunity.project;

  const milestones =
    buildMilestones(project);

  const deliveries =
    buildDeliveries(
      project,
      milestones,
    );

  const revisions =
    buildRevisions(
      project,
      deliveries,
    );

  const activities =
    buildActivities(project);

  return {
    project,

    milestones,

    deliveries,

    revisions,

    activities,

    filesCount:
      project.attachments.length,

    messagesCount: 0,
  };
}