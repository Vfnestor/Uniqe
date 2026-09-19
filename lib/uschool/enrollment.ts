export type EnrollmentStatus =
  | "pending"
  | "active"
  | "completed"
  | "cancelled";

export type USchoolEnrollment = {
  id: string;
  userId: string;
  classId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  startDate: string;
  paid: boolean;
  price: number;
  currency: "USD";
};

/*
 * Temporary demo enrollment store.
 *
 * This is intentionally kept separate from the course data.
 * Later this layer can be replaced by a real database
 * without changing the access engine.
 */
const demoEnrollments: USchoolEnrollment[] = [
  {
    id: "enrollment-demo-ai-foundations",
    userId: "demo-user",
    classId: "uschool-ai-foundations",
    status: "active",
    enrolledAt: "2026-09-17T00:00:00.000Z",
    startDate: "2026-09-17T00:00:00.000Z",
    paid: true,
    price: 1,
    currency: "USD",
  },
];

export function getEnrollment(
  userId: string,
  classId: string,
) {
  return demoEnrollments.find(
    (enrollment) =>
      enrollment.userId === userId &&
      enrollment.classId === classId,
  );
}

export function getUserEnrollments(
  userId: string,
) {
  return demoEnrollments.filter(
    (enrollment) =>
      enrollment.userId === userId,
  );
}

export function isUserEnrolled(
  userId: string,
  classId: string,
) {
  const enrollment = getEnrollment(
    userId,
    classId,
  );

  return (
    enrollment?.status === "active" ||
    enrollment?.status === "completed"
  );
}

export function createDemoEnrollment(
  userId: string,
  classId: string,
  price: number,
) {
  const existing = getEnrollment(
    userId,
    classId,
  );

  if (existing) {
    return existing;
  }

  const now = new Date();

  const enrollment: USchoolEnrollment = {
    id: `enrollment-${userId}-${classId}`,
    userId,
    classId,
    status: "active",
    enrolledAt: now.toISOString(),
    startDate: now.toISOString(),
    paid: true,
    price,
    currency: "USD",
  };

  demoEnrollments.push(enrollment);

  return enrollment;
}