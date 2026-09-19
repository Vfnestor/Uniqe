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

function getProgress(
  sessions: USchoolSessionAccess[],
) {
  if (sessions.length === 0) {
    return 0;
  }

  const available = sessions.filter(
    (item) =>
      item.status === "available",
  ).length;

  return Math.round(
    (available / sessions.length) *
      100,
  );
}

function getSessionLabel(
  item: USchoolSessionAccess,
) {
  if (item.status === "available") {
    return "Available";
  }

  return "Locked";
}

function getReleaseLabel(
  item: USchoolSessionAccess,
) {
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
) {
  return sessions.find(
    (item) =>
      item.status === "available",
  );
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
    getProgress(sessions);

  const continueSession =
    getContinueSession(
      sessions,
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
            {progress}%
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
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="my-uschool-progress-meta">
            <span>
              {
                sessions.filter(
                  (item) =>
                    item.status ===
                    "available",
                ).length
              }{" "}
              of {sessions.length} sessions
              available
            </span>

            <span>
              {progress}%
            </span>
          </div>
        </div>

        <div className="my-uschool-session-list">
          {sessions.map(
            (item) => {
              const available =
                item.status ===
                "available";

              return (
                <button
                  key={item.session.id}
                  type="button"
                  className={
                    available
                      ? "my-uschool-session is-available"
                      : "my-uschool-session is-locked"
                  }
                  disabled={!available}
                  onClick={() =>
                    available &&
                    onOpen(course)
                  }
                >
                  <span className="my-uschool-session-number">
                    {String(
                      item.dayNumber,
                    ).padStart(2, "0")}
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
                      )}
                    </strong>

                    <small>
                      {getReleaseLabel(
                        item,
                      )}
                    </small>
                  </span>

                  <span className="my-uschool-session-icon">
                    {available
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
            disabled={
              !continueSession
            }
          >
            {continueSession
              ? "Continue Learning"
              : "All Sessions Locked"}

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
    activeSessions.find(
      (item) =>
        item.status === "available",
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
                Continue your learning journey,
                access released sessions and
                track your progress across
                USchool.
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
              currently available learning
              sessions appear here.
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
                : "No session available"}
            </h2>

            {nextSession ? (
              <>
                <p>
                  Day{" "}
                  {
                    nextSession.dayNumber
                  }{" "}
                  is currently available.
                  The full learning experience
                  will be connected to the
                  class page in the next phase.
                </p>

                <div className="my-uschool-modal-meta">
                  <span>
                    {nextSession.session.durationMinutes}{" "}
                    min
                  </span>

                  <span>
                    Session{" "}
                    {
                      nextSession.dayNumber
                    }
                  </span>
                </div>

                <button
                  type="button"
                  className="my-uschool-modal-action"
                  onClick={() =>
                    setSelectedCourse(
                      null,
                    )
                  }
                >
                  Continue
                  <span>→</span>
                </button>
              </>
            ) : (
              <p>
                No session is available
                yet.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}