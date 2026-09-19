export type MyUProductArea =
  | "uweb"
  | "ushop"
  | "uservice"
  | "uschool"
  | "uapps";

export type MyUProductStatus =
  | "active"
  | "coming_soon";

export type MyUProduct = {
  id: MyUProductArea;
  name: string;
  title: string;
  description: string;
  status: MyUProductStatus;
  href: string;
  icon: string;
};

export type MyUNavigationItem = {
  id: string;
  title: string;
  href: string;
  icon: string;
  area?: MyUProductArea;
};

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