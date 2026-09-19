import type { USchoolClass } from "@/components/uschool/admin-courses";

import {
  getEnrollment,
  type USchoolEnrollment,
} from "./enrollment";

import {
  getSessionAccess,
  type USchoolSessionAccess,
} from "./session-access";

export type USchoolAccessReason =
  | "allowed"
  | "class-not-found"
  | "class-not-published"
  | "age-required"
  | "age-restricted"
  | "not-enrolled"
  | "enrollment-inactive";

export type USchoolAccessResult = {
  allowed: boolean;
  reason: USchoolAccessReason;
  class: USchoolClass | null;
  enrollment: USchoolEnrollment | null;
  sessions: USchoolSessionAccess[];
};

export function checkAgeAccess(
  age: number | null,
  minAge: number,
  maxAge: number | null,
) {
  if (age === null) {
    return {
      allowed: false,
      reason:
        "age-required" as const,
    };
  }

  if (age < minAge) {
    return {
      allowed: false,
      reason:
        "age-restricted" as const,
    };
  }

  if (
    maxAge !== null &&
    age > maxAge
  ) {
    return {
      allowed: false,
      reason:
        "age-restricted" as const,
    };
  }

  return {
    allowed: true,
    reason:
      "allowed" as const,
  };
}

export function checkClassAccess({
  userId,
  course,
  age,
  currentDate = new Date(),
}: {
  userId: string;
  course: USchoolClass | null;
  age: number | null;
  currentDate?: Date;
}): USchoolAccessResult {
  if (!course) {
    return {
      allowed: false,
      reason: "class-not-found",
      class: null,
      enrollment: null,
      sessions: [],
    };
  }

  if (course.status !== "published") {
    return {
      allowed: false,
      reason: "class-not-published",
      class: course,
      enrollment: null,
      sessions: [],
    };
  }

  const ageAccess = checkAgeAccess(
    age,
    course.minAge,
    course.maxAge,
  );

  if (!ageAccess.allowed) {
    return {
      allowed: false,
      reason: ageAccess.reason,
      class: course,
      enrollment: null,
      sessions: [],
    };
  }

  const enrollment =
    getEnrollment(
      userId,
      course.id,
    );

  if (!enrollment) {
    return {
      allowed: false,
      reason: "not-enrolled",
      class: course,
      enrollment: null,
      sessions: [],
    };
  }

  if (
    enrollment.status !== "active" &&
    enrollment.status !== "completed"
  ) {
    return {
      allowed: false,
      reason: "enrollment-inactive",
      class: course,
      enrollment,
      sessions: [],
    };
  }

  const sessions =
    getSessionAccess(
      enrollment,
      course.sessions,
      currentDate,
    );

  return {
    allowed: true,
    reason: "allowed",
    class: course,
    enrollment,
    sessions,
  };
}