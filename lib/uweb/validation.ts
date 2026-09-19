import type { UWebProject } from "./types";

export type UWebValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateUWebProject(
  project: Partial<UWebProject>,
): UWebValidationResult {
  const errors: string[] = [];

  if (!project.clientId) {
    errors.push(
      "clientId is required.",
    );
  }

  if (!project.title?.trim()) {
    errors.push(
      "title is required.",
    );
  }

  if (!project.projectType) {
    errors.push(
      "projectType is required.",
    );
  }

  if (!project.websiteType) {
    errors.push(
      "websiteType is required.",
    );
  }

  if (!project.platform) {
    errors.push(
      "platform is required.",
    );
  }

  if (!project.description?.trim()) {
    errors.push(
      "description is required.",
    );
  }

  if (project.budget) {
    const {
      min,
      max,
    } = project.budget;

    if (
      min !== undefined &&
      min < 0
    ) {
      errors.push(
        "budget.min cannot be negative.",
      );
    }

    if (
      max !== undefined &&
      max < 0
    ) {
      errors.push(
        "budget.max cannot be negative.",
      );
    }

    if (
      min !== undefined &&
      max !== undefined &&
      min > max
    ) {
      errors.push(
        "budget.min cannot exceed budget.max.",
      );
    }
  }

  if (
    project.expectedDurationDays !==
      undefined &&
    project.expectedDurationDays <= 0
  ) {
    errors.push(
      "expectedDurationDays must be greater than zero.",
    );
  }

  return {
    valid:
      errors.length === 0,

    errors,
  };
}