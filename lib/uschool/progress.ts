import type { USchoolSession } from "@/components/uschool/admin-courses";

export type USchoolSessionProgressStatus =
  | "not_started"
  | "in_progress"
  | "completed";

export type USchoolSessionProgress = {
  userId: string;
  classId: string;
  sessionId: string;
  status: USchoolSessionProgressStatus;
  startedAt?: string;
  completedAt?: string;
};

/*
 * Temporary demo storage.
 *
 * Later this layer will be connected to
 * the central Uniqe database / UCore.
 */
const demoProgress: USchoolSessionProgress[] = [];

export function getSessionProgress(
  userId: string,
  classId: string,
  sessionId: string,
) {
  return demoProgress.find(
    (item) =>
      item.userId === userId &&
      item.classId === classId &&
      item.sessionId === sessionId,
  );
}

export function getClassProgress(
  userId: string,
  classId: string,
) {
  return demoProgress.filter(
    (item) =>
      item.userId === userId &&
      item.classId === classId,
  );
}

export function startSession(
  userId: string,
  classId: string,
  sessionId: string,
) {
  const existing = getSessionProgress(
    userId,
    classId,
    sessionId,
  );

  if (existing) {
    if (existing.status === "not_started") {
      existing.status = "in_progress";
      existing.startedAt =
        new Date().toISOString();
    }

    return existing;
  }

  const progress: USchoolSessionProgress = {
    userId,
    classId,
    sessionId,
    status: "in_progress",
    startedAt:
      new Date().toISOString(),
  };

  demoProgress.push(progress);

  return progress;
}

export function completeSession(
  userId: string,
  classId: string,
  sessionId: string,
) {
  const existing = getSessionProgress(
    userId,
    classId,
    sessionId,
  );

  if (existing) {
    existing.status = "completed";
    existing.completedAt =
      new Date().toISOString();

    return existing;
  }

  const progress: USchoolSessionProgress = {
    userId,
    classId,
    sessionId,
    status: "completed",
    startedAt:
      new Date().toISOString(),
    completedAt:
      new Date().toISOString(),
  };

  demoProgress.push(progress);

  return progress;
}

export function isSessionCompleted(
  userId: string,
  classId: string,
  sessionId: string,
) {
  return (
    getSessionProgress(
      userId,
      classId,
      sessionId,
    )?.status === "completed"
  );
}

export function getCompletedSessionCount(
  userId: string,
  classId: string,
) {
  return demoProgress.filter(
    (item) =>
      item.userId === userId &&
      item.classId === classId &&
      item.status === "completed",
  ).length;
}

export function calculateClassProgress(
  userId: string,
  classId: string,
  sessions: USchoolSession[],
) {
  const total = sessions.length;

  if (total === 0) {
    return {
      completed: 0,
      total: 0,
      percentage: 0,
    };
  }

  const completed =
    getCompletedSessionCount(
      userId,
      classId,
    );

  return {
    completed,
    total,
    percentage: Math.round(
      (completed / total) * 100,
    ),
  };
}

export function getSessionProgressMap(
  userId: string,
  classId: string,
  sessions: USchoolSession[],
) {
  return sessions.map((session) => ({
    session,
    progress:
      getSessionProgress(
        userId,
        classId,
        session.id,
      ) ?? {
        userId,
        classId,
        sessionId: session.id,
        status: "not_started" as const,
      },
  }));
}