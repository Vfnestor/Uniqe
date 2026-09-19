"use client";

import {
  useMemo,
  useState,
} from "react";

import Container from "@/components/ui/Container";

import {
  uschoolAdminClasses,
  type USchoolClass,
} from "./admin-courses";

import {
  getSessionAccess,
  type USchoolSessionAccess,
} from "@/lib/uschool/session-access";

import {
  getEnrollment,
} from "@/lib/uschool/enrollment";

import {
  calculateClassProgress,
  getSessionProgress,
} from "@/lib/uschool/progress";

type DemoUser = {
  id: string;
  name: string;
  age: number;
};

const demoUser: DemoUser = {
  id: "demo-user",
  name: "Demo Student",
  age: 20,
};

function formatDuration(
  minutes: number,
) {
  const hours = Math.floor(
    minutes / 60,
  );

  const remainingMinutes =
    minutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function getSessionLabel(
  item: USchoolSessionAccess,
  completed: boolean,
) {
  if (completed) {
    return "Completed";
  }

  if (item.status === "available") {
    return "Available";
  }

  return "Locked";
}

function getReleaseLabel(
  item: USchoolSessionAccess,
  completed: boolean,
) {
  if (completed) {
    return "Completed";
  }

  if (item.status === "available") {
    return "Available now";
  }

  const date = new Date(
    item.availableAt,
  );

  return `Available ${date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    },
  )}`;
}

function getContinueSession(
  sessions: USchoolSessionAccess[],
  userId: string,
  classId: string,
) {
  const incompleteAvailable =
    sessions.find(
      (item) =>
        item.status === "available" &&
        getSessionProgress(
          userId,
          classId,
          item.session.id,
        )?.status !== "completed",
    );

  return incompleteAvailable;
}

function ClassCard({
  course,
  onOpen,
}: {
  course: USchoolClass;
  onOpen: (
    course: USchoolClass,
  ) => void;
}) {
  const enrollment =
    getEnrollment(
      demoUser.id,
      course.id,
    );

  if (!enrollment) {
    return null;
  }

  const sessions =
    getSessionAccess(
      enrollment,
      course.sessions,
    );

  const progress =
    calculateClassProgress(
      demoUser.id,
      course.id,
      course.sessions,
    );

  const continueSession =
    getContinueSession(
      sessions,
      demoUser.id,
      course.id,
    );

  return (
    <article className="my-uschool-class-card">
      <div className="my-uschool-class-cover">
        <img
          src={course.imageUrl}
          alt={course.title}
        />

        <div className="my-uschool-class-cover-overlay" />

        <div className="my-uschool-class-cover-top">
          <span>
            {course.category}
          </span>

          {course.featured && (
            <span>
              Featured
            </span>
          )}
        </div>

        <div className="my-uschool-class-cover-bottom">
          <span>
            {course.sessionCount} Sessions
          </span>

          <span>
            {formatDuration(
              course.totalDurationMinutes,
            )}
          </span>
        </div>
      </div>

      <div className="my-uschool-class-body">
        <div className="my-uschool-class-heading">
          <div>
            <span className="my-uschool-eyebrow">
              Learning Path
            </span>

            <h2>
              {course.title}
            </h2>
          </div>

          <div className="my-uschool-progress-number">
            {progress.percentage}%
          </div>
        </div>

        <p className="my-uschool-class-description">
          {course.shortDescription}
        </p>

        <div className="my-uschool-progress">
          <div className="my-uschool-progress-track">
            <div
              className="my-uschool-progress-fill"
              style={{
                width: `${progress.percentage}%`,
              }}
            />
          </div>

          <div className="my-uschool-progress-meta">
            <span>
              {progress.completed} of{" "}
              {progress.total} sessions
              completed
            </span>

            <span>
              {progress.percentage}%
            </span>
          </div>
        </div>

        <div className="my-uschool-session-list">
          {sessions.map(
            (item) => {
              const completed =
                getSessionProgress(
                  demoUser.id,
                  course.id,
                  item.session.id,
                )?.status ===
                "completed";

              const available =
                item.status ===
                "available";

              const clickable =
                available;

              return (
                <button
                  key={item.session.id}
                  type="button"
                  className={[
                    "my-uschool-session",
                    available
                      ? "is-available"
                      : "is-locked",
                    completed
                      ? "is-completed"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={!clickable}
                  onClick={() =>
                    clickable &&
                    onOpen(course)
                  }
                >
                  <span className="my-uschool-session-number">
                    {completed
                      ? "✓"
                      : String(
                          item.dayNumber,
                        ).padStart(
                          2,
                          "0",
                        )}
                  </span>

                  <span className="my-uschool-session-main">
                    <strong>
                      {item.session.title}
                    </strong>

                    <small>
                      Day{" "}
                      {
                        item.dayNumber
                      }{" "}
                      ·{" "}
                      {
                        item.session
                          .durationMinutes
                      }{" "}
                      min
                    </small>
                  </span>

                  <span className="my-uschool-session-status">
                    <strong>
                      {getSessionLabel(
                        item,
                        completed,
                      )}
                    </strong>

                    <small>
                      {getReleaseLabel(
                        item,
                        completed,
                      )}
                    </small>
                  </span>

                  <span className="my-uschool-session-icon">
                    {completed
                      ? "✓"
                      : available
                        ? "↗"
                        : "🔒"}
                  </span>
                </button>
              );
            },
          )}
        </div>

        <div className="my-uschool-class-footer">
          <div>
            <span>
              Access
            </span>

            <strong>
              Active
            </strong>
          </div>

          <button
            type="button"
            className="my-uschool-continue-button"
            onClick={() =>
              onOpen(course)
            }
          >
            {continueSession
              ? "Continue Learning"
              : progress.percentage ===
                  100
                ? "Class Completed"
                : "View Class"}

            <span>→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MyUSchool() {
  const [
    selectedCourse,
    setSelectedCourse,
  ] = useState<USchoolClass | null>(
    null,
  );

  const enrolledCourses =
    useMemo(() => {
      return uschoolAdminClasses.filter(
        (course) =>
          Boolean(
            getEnrollment(
              demoUser.id,
              course.id,
            ),
          ),
      );
    }, []);

  const activeSessions =
    selectedCourse
      ? (() => {
          const enrollment =
            getEnrollment(
              demoUser.id,
              selectedCourse.id,
            );

          if (!enrollment) {
            return [];
          }

          return getSessionAccess(
            enrollment,
            selectedCourse.sessions,
          );
        })()
      : [];

  const nextSession =
    getContinueSession(
      activeSessions,
      demoUser.id,
      selectedCourse?.id ?? "",
    );

  return (
    <>
      <section className="my-uschool-hero">
        <Container>
          <div className="my-uschool-hero-grid">
            <div>
              <span className="my-uschool-hero-eyebrow">
                MY USCHOOL
              </span>

              <h1>
                Your learning
                <br />
                space.
              </h1>

              <p>
                Continue your learning
                journey, access released
                sessions and track your
                progress across USchool.
              </p>
            </div>

            <div className="my-uschool-user-card">
              <div className="my-uschool-user-avatar">
                {demoUser.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <span>
                  Student
                </span>

                <strong>
                  {demoUser.name}
                </strong>

                <small>
                  Age {demoUser.age}
                </small>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="my-uschool-content section">
        <Container>
          <div className="my-uschool-section-heading">
            <div>
              <span className="section-eyebrow">
                My Classes
              </span>

              <h2 className="section-title">
                Keep learning.
              </h2>
            </div>

            <p className="section-description">
              Your enrolled classes and
              real learning progress appear
              here.
            </p>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="my-uschool-class-list">
              {enrolledCourses.map(
                (course) => (
                  <ClassCard
                    key={course.id}
                    course={course}
                    onOpen={
                      setSelectedCourse
                    }
                  />
                ),
              )}
            </div>
          ) : (
            <div className="my-uschool-empty">
              <div>
                ◌
              </div>

              <h3>
                No classes yet
              </h3>

              <p>
                You have not joined any
                USchool classes yet.
              </p>

              <a href="/uschool">
                Explore USchool
                <span>→</span>
              </a>
            </div>
          )}
        </Container>
      </section>

      {selectedCourse && (
        <div
          className="my-uschool-modal-backdrop"
          onClick={() =>
            setSelectedCourse(null)
          }
        >
          <div
            className="my-uschool-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="my-uschool-modal-close"
              onClick={() =>
                setSelectedCourse(null)
              }
              aria-label="Close"
            >
              ×
            </button>

            <span className="my-uschool-eyebrow">
              NEXT SESSION
            </span>

            <h2>
              {nextSession
                ? nextSession.session.title
                : "Class Overview"}
            </h2>

            {nextSession ? (
              <>
                <p>
                  Day{" "}
                  {
                    nextSession.dayNumber
                  }{" "}
                  is currently available.
                  Continue your learning
                  from the class page.
                </p>

                <div className="my-uschool-modal-meta">
                  <span>
                    {
                      nextSession
                        .session
                        .durationMinutes
                    }{" "}
                    min
                  </span>

                  <span>
                    Session{" "}
                    {
                      nextSession.dayNumber
                    }
                  </span>
                </div>

                <a
                  href={`/uschool/class/${selectedCourse.id}`}
                  className="my-uschool-modal-action"
                >
                  Continue
                  <span>→</span>
                </a>
              </>
            ) : (
              <>
                <p>
                  All currently released
                  sessions have been
                  completed or no session is
                  available yet.
                </p>

                <a
                  href={`/uschool/class/${selectedCourse.id}`}
                  className="my-uschool-modal-action"
                >
                  Open Class
                  <span>→</span>
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}