import type { USchoolSession } from "@/components/uschool/admin-courses";

import type { USchoolEnrollment } from "./enrollment";

export type SessionAccessStatus =
  | "available"
  | "locked"
  | "completed";

export type USchoolSessionAccess = {
  session: USchoolSession;
  status: SessionAccessStatus;
  availableAt: string;
  dayNumber: number;
};

function startOfDay(
  date: Date,
) {
  const result = new Date(date);

  result.setHours(
    0,
    0,
    0,
    0,
  );

  return result;
}

function differenceInDays(
  startDate: Date,
  currentDate: Date,
) {
  const start = startOfDay(startDate);
  const current = startOfDay(currentDate);

  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  return Math.floor(
    (current.getTime() -
      start.getTime()) /
      millisecondsPerDay,
  );
}

export function getSessionAvailableDate(
  enrollment: USchoolEnrollment,
  session: USchoolSession,
) {
  const startDate = new Date(
    enrollment.startDate,
  );

  const availableDate = new Date(
    startDate,
  );

  availableDate.setDate(
    availableDate.getDate() +
      (session.releaseDay - 1),
  );

  return availableDate;
}

export function isSessionAvailable(
  enrollment: USchoolEnrollment,
  session: USchoolSession,
  currentDate = new Date(),
) {
  if (
    enrollment.status !== "active" &&
    enrollment.status !== "completed"
  ) {
    return false;
  }

  const availableDate =
    getSessionAvailableDate(
      enrollment,
      session,
    );

  return (
    startOfDay(currentDate).getTime() >=
    startOfDay(availableDate).getTime()
  );
}

export function getSessionAccess(
  enrollment: USchoolEnrollment,
  sessions: USchoolSession[],
  currentDate = new Date(),
): USchoolSessionAccess[] {
  return sessions.map((session) => {
    const availableAt =
      getSessionAvailableDate(
        enrollment,
        session,
      );

    const available =
      isSessionAvailable(
        enrollment,
        session,
        currentDate,
      );

    const daysSinceStart =
      differenceInDays(
        new Date(
          enrollment.startDate,
        ),
        currentDate,
      );

    const status: SessionAccessStatus =
      available
        ? "available"
        : "locked";

    return {
      session,
      status,
      availableAt:
        availableAt.toISOString(),
      dayNumber:
        session.releaseDay,
    };
  });
}

export function getAvailableSessionCount(
  enrollment: USchoolEnrollment,
  sessions: USchoolSession[],
  currentDate = new Date(),
) {
  return getSessionAccess(
    enrollment,
    sessions,
    currentDate,
  ).filter(
    (item) =>
      item.status === "available",
  ).length;
}
