import type { UWebProjectStatus } from "./types";

const transitions: Record<
  UWebProjectStatus,
  UWebProjectStatus[]
> = {
  draft: [
    "submitted",
    "cancelled",
  ],

  submitted: [
    "under_review",
    "cancelled",
  ],

  under_review: [
    "matching",
    "cancelled",
    "suspended",
  ],

  matching: [
    "professional_selected",
    "cancelled",
    "suspended",
  ],

  professional_selected: [
    "contract_pending",
    "matching",
    "cancelled",
  ],

  contract_pending: [
    "contract_signed",
    "professional_selected",
    "cancelled",
  ],

  contract_signed: [
    "in_progress",
    "cancelled",
    "disputed",
  ],

  in_progress: [
    "submitted_for_review",
    "cancelled",
    "disputed",
    "suspended",
  ],

  submitted_for_review: [
    "approved",
    "revision",
    "disputed",
  ],

  revision: [
    "in_progress",
    "submitted_for_review",
    "cancelled",
    "disputed",
  ],

  approved: [
    "completed",
    "disputed",
  ],

  completed: [],

  cancelled: [],

  disputed: [
    "in_progress",
    "cancelled",
    "completed",
  ],

  suspended: [
    "under_review",
    "cancelled",
  ],
};

export function canTransitionProject(
  from: UWebProjectStatus,
  to: UWebProjectStatus,
): boolean {
  return transitions[from].includes(to);
}

export function getProjectTransitions(
  status: UWebProjectStatus,
): UWebProjectStatus[] {
  return [...transitions[status]];
}

export function assertProjectTransition(
  from: UWebProjectStatus,
  to: UWebProjectStatus,
): void {
  if (!canTransitionProject(from, to)) {
    throw new Error(
      `Invalid UWeb project transition: ${from} -> ${to}`,
    );
  }
}