import type {
  UWebApplicationStatus,
  UWebContractStatus,
  UWebProject,
  UWebProjectApplication,
  UWebProfessionalProfile,
  UWebSkill,
} from "./types";

import {
  demoProfessionals,
  demoProjects,
  demoSkills,
} from "./mock-data";

export type UWebAdminClient = {
  id: string;
  name: string;
  email: string;
  projectsCount: number;
  status: "active" | "inactive";
};

export type UWebAdminProject = {
  project: UWebProject;
  clientName: string;
  professionalName: string;
  applicationsCount: number;
};

export type UWebAdminApplication =
  UWebProjectApplication & {
    projectTitle: string;
    projectNumber: string;
    professionalName: string;
};

export type UWebAdminContract = {
  id: string;
  projectId: string;
  projectNumber: string;
  projectTitle: string;
  type: string;
  status: UWebContractStatus;
  clientName: string;
  professionalName: string;
};

export type UWebAdminStats = {
  projects: number;
  activeProjects: number;
  professionals: number;
  clients: number;
  applications: number;
  contracts: number;
  pendingContracts: number;
};

const clientMap: Record<
  string,
  UWebAdminClient
> = {
  "demo-client": {
    id: "demo-client",
    name: "Demo Client",
    email: "client@uniqe.demo",
    projectsCount: demoProjects.filter(
      (project) =>
        project.clientId === "demo-client",
    ).length,
    status: "active",
  },
};

const professionalMap: Record<
  string,
  string
> = {
  "professional-demo-01":
    "WordPress Professional",

  "professional-demo-02":
    "Next.js Professional",
};

function buildApplications(): UWebAdminApplication[] {
  const project =
    demoProjects[0];

  if (!project) {
    return [];
  }

  return [
    {
      id: "application-demo-01",
      projectId: project.id,
      professionalId:
        "professional-wordpress-01",
      message:
        "آماده اجرای پروژه مطابق نیازمندی‌های ثبت‌شده هستم.",
      proposedPrice: 1400,
      estimatedDurationDays: 28,
      status:
        "submitted" as UWebApplicationStatus,
      createdAt:
        "2026-09-20T10:00:00.000Z",
      updatedAt:
        "2026-09-20T10:00:00.000Z",
      projectTitle:
        project.title,
      projectNumber:
        project.projectNumber,
      professionalName:
        professionalMap[
          "professional-demo-01"
        ] ?? "Professional",
    },
  ];
}

function getProfessionalName(
  project: UWebProject,
) {
  if (
    project.status ===
      "professional_selected" ||
    project.status ===
      "contract_pending" ||
    project.status ===
      "contract_signed" ||
    project.status ===
      "in_progress"
  ) {
    return (
      professionalMap[
        "professional-demo-01"
      ] ?? "Professional"
    );
  }

  return "هنوز انتخاب نشده";
}

export function getUWebAdminProjects(): UWebAdminProject[] {
  const applications =
    buildApplications();

  return demoProjects.map(
    (project) => ({
      project,

      clientName:
        clientMap[
          project.clientId
        ]?.name ??
        "Client",

      professionalName:
        getProfessionalName(
          project,
        ),

      applicationsCount:
        applications.filter(
          (application) =>
            application.projectId ===
            project.id,
        ).length,
    }),
  );
}

export function getUWebAdminApplications() {
  return buildApplications();
}

export function getUWebAdminProfessionals(): UWebProfessionalProfile[] {
  return demoProfessionals;
}

export function getUWebAdminClients(): UWebAdminClient[] {
  return Object.values(
    clientMap,
  );
}

export function getUWebAdminContracts(): UWebAdminContract[] {
  return demoProjects
    .filter(
      (project) =>
        project.status ===
          "contract_pending" ||
        project.status ===
          "contract_signed" ||
        project.status ===
          "in_progress" ||
        project.status ===
          "completed",
    )
    .map(
      (project) => ({
        id:
          `${project.id}-contract`,

        projectId:
          project.id,

        projectNumber:
          project.projectNumber,

        projectTitle:
          project.title,

        type:
          "three_party_project_agreement",

        status:
          project.status ===
          "contract_pending"
            ? "pending_signatures"
            : "signed",

        clientName:
          clientMap[
            project.clientId
          ]?.name ??
          "Client",

        professionalName:
          getProfessionalName(
            project,
          ),
      }),
    );
}

export function getUWebAdminSkills(): UWebSkill[] {
  return demoSkills;
}

export function getUWebAdminPlatforms() {
  return [
    {
      id: "wordpress",
      name: "WordPress",
      status: "active",
      projects: demoProjects.filter(
        (project) =>
          project.platform ===
          "wordpress",
      ).length,
    },
    {
      id: "nextjs",
      name: "Next.js",
      status: "active",
      projects: demoProjects.filter(
        (project) =>
          project.platform ===
          "nextjs",
      ).length,
    },
    {
      id: "react",
      name: "React",
      status: "active",
      projects: 0,
    },
    {
      id: "laravel",
      name: "Laravel",
      status: "active",
      projects: 0,
    },
  ];
}

export function getUWebAdminTemplates() {
  return [
    {
      id: "template-ecommerce",
      name: "فروشگاه اینترنتی",
      type: "ecommerce",
      platform: "wordpress",
      status: "active",
    },
    {
      id: "template-corporate",
      name: "وب‌سایت شرکتی",
      type: "corporate",
      platform: "nextjs",
      status: "active",
    },
    {
      id: "template-portfolio",
      name: "Portfolio",
      type: "portfolio",
      platform: "nextjs",
      status: "active",
    },
  ];
}

export function getUWebAdminStats(): UWebAdminStats {
  const projects =
    getUWebAdminProjects();

  const applications =
    getUWebAdminApplications();

  const contracts =
    getUWebAdminContracts();

  return {
    projects:
      projects.length,

    activeProjects:
      projects.filter(
        ({ project }) =>
          project.status !==
            "completed" &&
          project.status !==
            "cancelled",
      ).length,

    professionals:
      demoProfessionals.length,

    clients:
      Object.keys(clientMap).length,

    applications:
      applications.length,

    contracts:
      contracts.length,

    pendingContracts:
      contracts.filter(
        (contract) =>
          contract.status ===
          "pending_signatures",
      ).length,
  };
}

export function getUWebAdminProject(
  id: string,
) {
  return getUWebAdminProjects().find(
    ({ project }) =>
      project.id === id,
  );
}