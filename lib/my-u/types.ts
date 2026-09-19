export type MyUProductArea =
  | "uweb"
  | "ushop"
  | "uschool"
  | "uapps"
  | "uservice";

export type MyUProjectSummary = {
  id: string;
  projectNumber: string;
  title: string;
  area: MyUProductArea;
  status: string;
  statusLabel: string;
  platform: string;
  updatedAt: string;
  href: string;
};

export type MyUContractSummary = {
  id: string;
  projectId: string;
  projectNumber: string;
  title: string;
  type: string;
  typeLabel: string;
  status: string;
  statusLabel: string;
  updatedAt: string;
  href: string;
};

export type MyUActivityItem = {
  id: string;
  area: MyUProductArea;
  title: string;
  description: string;
  createdAt: string;
  href?: string;
};

export type MyUWebDashboardData = {
  projects: MyUProjectSummary[];
  contracts: MyUContractSummary[];
  activities: MyUActivityItem[];
  activeProjectsCount: number;
  completedProjectsCount: number;
  pendingContractsCount: number;
};