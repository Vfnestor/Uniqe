export type UWebProjectType =
  | "new_website"
  | "redesign"
  | "feature_development"
  | "bug_fix"
  | "maintenance"
  | "optimization"
  | "custom";

export type UWebWebsiteType =
  | "corporate"
  | "ecommerce"
  | "education"
  | "news"
  | "personal"
  | "services"
  | "portfolio"
  | "booking"
  | "dashboard"
  | "custom";

export type UWebPlatform =
  | "wordpress"
  | "nextjs"
  | "react"
  | "laravel"
  | "custom"
  | "unknown";

export type UWebExperienceLevel =
  | "beginner"
  | "intermediate"
  | "professional"
  | "expert";

export type UWebProjectStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "matching"
  | "professional_selected"
  | "contract_pending"
  | "contract_signed"
  | "in_progress"
  | "submitted_for_review"
  | "revision"
  | "approved"
  | "completed"
  | "cancelled"
  | "disputed"
  | "suspended";

export type UWebApplicationStatus =
  | "submitted"
  | "reviewing"
  | "accepted"
  | "rejected"
  | "withdrawn";

export type UWebContractType =
  | "professional_agreement"
  | "three_party_project_agreement";

export type UWebContractStatus =
  | "draft"
  | "pending_signatures"
  | "partially_signed"
  | "signed"
  | "void";

export type UWebContractPartyRole =
  | "client"
  | "professional"
  | "owner";

export type UWebMilestoneStatus =
  | "pending"
  | "in_progress"
  | "submitted"
  | "approved"
  | "revision"
  | "completed"
  | "cancelled";

export type UWebDeliveryStatus =
  | "submitted"
  | "under_review"
  | "revision_requested"
  | "approved";

export type UWebRevisionStatus =
  | "requested"
  | "in_progress"
  | "submitted"
  | "approved"
  | "rejected";

export type UWebActorRole =
  | "client"
  | "professional"
  | "owner"
  | "system";

export type UWebProject = {
  id: string;
  projectNumber: string;
  clientId: string;
  title: string;

  projectType: UWebProjectType;
  websiteType: UWebWebsiteType;
  purpose: string[];

  platform: UWebPlatform;
  features: string[];

  designRequirements: string[];
  contentRequirements: string[];

  languages: string[];
  referenceLinks: string[];

  description: string;
  attachments: UWebAttachment[];

  budget?: UWebBudget;
  expectedDurationDays?: number;
  deadline?: string;

  requiredSkills: UWebProjectSkill[];

  status: UWebProjectStatus;

  createdAt: string;
  updatedAt: string;
};

export type UWebAttachment = {
  id: string;
  name: string;
  url: string;
  type: string;
  sizeBytes?: number;
};

export type UWebBudget = {
  min?: number;
  max?: number;
  currency: "USD" | "EUR" | "IRR";
};

export type UWebProjectSkill = {
  skillId: string;
  requiredLevel: UWebExperienceLevel;
  priority: "required" | "preferred";
};

export type UWebSkill = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  status: "active" | "inactive";
};

export type UWebProfessionalProfile = {
  id: string;
  userId: string;

  headline: string;
  bio: string;

  skillIds: string[];
  platforms: UWebPlatform[];

  experienceLevel: UWebExperienceLevel;

  availability:
    | "available"
    | "busy"
    | "unavailable";

  status:
    | "active"
    | "suspended";
};

export type UWebProjectApplication = {
  id: string;
  projectId: string;
  professionalId: string;

  message: string;

  proposedPrice?: number;
  estimatedDurationDays?: number;

  status: UWebApplicationStatus;

  createdAt: string;
  updatedAt: string;
};

export type UWebProjectAssignment = {
  id: string;
  projectId: string;
  professionalId: string;

  assignedBy: string;
  assignedAt: string;

  status: "active" | "ended";
};

export type UWebContract = {
  id: string;
  projectId: string;

  type: UWebContractType;
  version: string;

  title: string;
  content: string;

  status: UWebContractStatus;

  parties: UWebContractParty[];

  createdAt: string;
  updatedAt: string;
};

export type UWebContractParty = {
  id: string;
  contractId: string;

  userId: string;
  role: UWebContractPartyRole;

  signedAt?: string;

  status:
    | "pending"
    | "signed";
};

export type UWebMilestone = {
  id: string;
  projectId: string;

  title: string;
  description: string;

  order: number;

  status: UWebMilestoneStatus;

  startAt?: string;
  dueAt?: string;
  completedAt?: string;
};

export type UWebDelivery = {
  id: string;
  projectId: string;
  milestoneId: string;
  professionalId: string;

  version: string;
  description: string;

  files: UWebAttachment[];

  demoUrl?: string;

  status: UWebDeliveryStatus;

  createdAt: string;
};

export type UWebRevision = {
  id: string;
  projectId: string;
  deliveryId: string;

  requestedBy: string;

  description: string;

  attachments: UWebAttachment[];

  status: UWebRevisionStatus;

  createdAt: string;
  resolvedAt?: string;
};

export type UWebProjectActivity = {
  id: string;
  projectId: string;

  actorId: string;
  action: string;

  metadata?: Record<string, unknown>;

  createdAt: string;
};

export type UWebAuditLog = {
  id: string;

  actorId: string;

  projectId?: string;
  contractId?: string;

  action: string;

  entityType: string;
  entityId: string;

  previousState?: string;
  newState?: string;

  metadata?: Record<string, unknown>;

  createdAt: string;
};