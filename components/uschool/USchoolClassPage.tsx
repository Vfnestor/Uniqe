"use client";

import {
  useMemo,
  useState,
} from "react";

import Container from "@/components/ui/Container";

import {
  getUSchoolClass,
  type USchoolClass,
} from "./admin-courses";

import {
  getEnrollment,
} from "@/lib/uschool/enrollment";

import {
  getSessionAccess,
  type USchoolSessionAccess,
} from "@/lib/uschool/session-access";

import {
  calculateClassProgress,
  completeSession,
  getSessionProgress,
} from "@/lib/uschool/progress";

const DEMO_USER_ID =
  "demo-user";

function formatDuration(
  minutes: number,
) {
  const hours = Math.floor(
    minutes / 60,
  );

  const remaining =
    minutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (remaining === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remaining}m`;
}

function SessionItem({
  item,
  selected,
  completed,
  onSelect,
}: {
  item: USchoolSessionAccess;
  selected: boolean;
  completed: boolean;
  onSelect: () => void;
}) {
  const available =
    item.status === "available";

  return (
    <button
      type="button"
      className={[
        "uschool-class-session-item",
        available
          ? "is-available"
          : "is-locked",
        selected
          ? "is-selected"
          : "",
        completed
          ? "is-completed"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={!available}
      onClick={onSelect}
    >
      <span className="uschool-class-session-number">
        {completed
          ? "✓"
          : String(
              item.dayNumber,
            ).padStart(2, "0")}
      </span>

      <span className="uschool-class-session-info">
        <strong>
          {item.session.title}
        </strong>

        <small>
          Day {item.dayNumber}
          {" · "}
          {item.session.durationMinutes} min
        </small>
      </span>

      <span className="uschool-class-session-status">
        {completed
          ? "Completed"
          : available
            ? "Available"
            : "Locked"}
      </span>

      <span className="uschool-class-session-icon">
        {completed
          ? "✓"
          : available
            ? "→"
            : "🔒"}
      </span>
    </button>
  );
}

function LessonContent({
  item,
  completed,
  onComplete,
}: {
  item: USchoolSessionAccess;
  completed: boolean;
  onComplete: () => void;
}) {
  const {
    session,
  } = item;

  const [provider, setProvider] =
    useState<
      "youtube" | "aparat"
    >(
      session.youtubeUrl
        ? "youtube"
        : "aparat",
    );

  const videoUrl =
    provider === "youtube"
      ? session.youtubeUrl
      : session.aparatUrl;

  return (
    <section className="uschool-lesson">
      <div className="uschool-lesson-heading">
        <div>
          <span className="uschool-class-eyebrow">
            Day {item.dayNumber}
          </span>

          <h2>
            {session.title}
          </h2>
        </div>

        <span className="uschool-lesson-duration">
          {formatDuration(
            session.durationMinutes,
          )}
        </span>
      </div>

      <div className="uschool-video-area">
        <div className="uschool-video-placeholder">
          <div className="uschool-video-play">
            ▶
          </div>

          <strong>
            Video Lesson
          </strong>

          <span>
            {provider ===
            "youtube"
              ? "YouTube"
              : "Aparat"}
          </span>

          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="uschool-video-open"
            >
              Open Video
              <span>↗</span>
            </a>
          )}
        </div>
      </div>

      <div className="uschool-provider-switcher">
        <span>
          Video provider
        </span>

        <div>
          <button
            type="button"
            className={
              provider === "youtube"
                ? "is-active"
                : ""
            }
            disabled={
              !session.youtubeUrl
            }
            onClick={() =>
              setProvider(
                "youtube",
              )
            }
          >
            YouTube
          </button>

          <button
            type="button"
            className={
              provider === "aparat"
                ? "is-active"
                : ""
            }
            disabled={
              !session.aparatUrl
            }
            onClick={() =>
              setProvider(
                "aparat",
              )
            }
          >
            Aparat
          </button>
        </div>
      </div>

      <div className="uschool-lesson-text">
        <span className="uschool-class-eyebrow">
          Lesson Notes
        </span>

        <p>
          {session.text}
        </p>
      </div>

      {session.imageUrl && (
        <div className="uschool-lesson-image">
          <img
            src={session.imageUrl}
            alt={session.title}
          />
        </div>
      )}

      <div className="uschool-completion">
        <div>
          <span>
            Session status
          </span>

          <strong>
            {completed
              ? "Completed"
              : "Available"}
          </strong>
        </div>

        <button
          type="button"
          className="uschool-complete-button"
          disabled={completed}
          onClick={onComplete}
        >
          {completed
            ? "Completed"
            : "Mark as Completed"}

          <span>✓</span>
        </button>
      </div>
    </section>
  );
}

function LockedLesson({
  item,
}: {
  item: USchoolSessionAccess;
}) {
  const date =
    new Date(
      item.availableAt,
    );

  return (
    <section className="uschool-locked-lesson">
      <div className="uschool-locked-icon">
        🔒
      </div>

      <span className="uschool-class-eyebrow">
        Day {item.dayNumber}
      </span>

      <h2>
        {item.session.title}
      </h2>

      <p>
        This lesson is not available
        yet. It will be released
        according to your learning
        schedule.
      </p>

      <div className="uschool-release-card">
        <span>
          Release
        </span>

        <strong>
          {date.toLocaleDateString(
            "en-US",
            {
              weekday: "long",
              month: "long",
              day: "numeric",
            },
          )}
        </strong>
      </div>
    </section>
  );
}

function ClassProgress({
  completed,
  total,
  percentage,
}: {
  completed: number;
  total: number;
  percentage: number;
}) {
  return (
    <div
      style={{
        marginTop: "24px",
        padding: "16px 18px",
        border: "1px solid var(--color-border)",
        borderRadius: "14px",
        background:
          "var(--color-bg-soft)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: "12px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            color:
              "var(--color-text-secondary)",
            fontSize: "0.72rem",
            fontWeight: 700,
          }}
        >
          Course Progress
        </span>

        <strong
          style={{
            color:
              "var(--color-text-primary)",
            fontSize: "0.78rem",
          }}
        >
          {percentage}%
        </strong>
      </div>

      <div
        style={{
          height: "7px",
          overflow: "hidden",
          borderRadius: "999px",
          background:
            "var(--color-border)",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: "999px",
            background:
              "var(--color-brand)",
            transition:
              "width 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "8px",
          color:
            "var(--color-text-muted)",
          fontSize: "0.68rem",
        }}
      >
        {completed} of {total} sessions
        completed
      </div>
    </div>
  );
}

export default function USchoolClassPage({
  classId,
}: {
  classId: string;
}) {
  const course =
    getUSchoolClass(classId);

  const enrollment =
    course
      ? getEnrollment(
          DEMO_USER_ID,
          course.id,
        )
      : undefined;

  const [
    progressVersion,
    setProgressVersion,
  ] = useState(0);

  const sessionAccess =
    useMemo(() => {
      if (
        !course ||
        !enrollment
      ) {
        return [];
      }

      return getSessionAccess(
        enrollment,
        course.sessions,
      );
    }, [
      course,
      enrollment,
      progressVersion,
    ]);

  const progress =
    course
      ? calculateClassProgress(
          DEMO_USER_ID,
          course.id,
          course.sessions,
        )
      : {
          completed: 0,
          total: 0,
          percentage: 0,
        };

  const firstAvailable =
    sessionAccess.find(
      (item) =>
        item.status ===
        "available",
    );

  const [
    selectedSessionId,
    setSelectedSessionId,
  ] = useState(
    firstAvailable?.session.id ??
      "",
  );

  if (!course) {
    return (
      <section className="uschool-class-state">
        <Container>
          <div>
            <span>
              404
            </span>

            <h1>
              Class not found
            </h1>

            <p>
              This USchool class does
              not exist or has been
              removed.
            </p>

            <a href="/uschool">
              Back to USchool
              <span>→</span>
            </a>
          </div>
        </Container>
      </section>
    );
  }

  if (!enrollment) {
    return (
      <section className="uschool-class-state">
        <Container>
          <div>
            <span>
              ACCESS
            </span>

            <h1>
              Join this class first.
            </h1>

            <p>
              You need an active
              enrollment before you
              can access the learning
              sessions.
            </p>

            <a href="/uschool">
              Back to USchool
              <span>→</span>
            </a>
          </div>
        </Container>
      </section>
    );
  }

  const selectedSession =
    sessionAccess.find(
      (item) =>
        item.session.id ===
        selectedSessionId,
    );

  const selectedCompleted =
    selectedSession
      ? getSessionProgress(
          DEMO_USER_ID,
          course.id,
          selectedSession.session.id,
        )?.status ===
        "completed"
      : false;

  function handleComplete() {
    if (
      !course ||
      !selectedSession
    ) {
      return;
    }

    completeSession(
      DEMO_USER_ID,
      course.id,
      selectedSession.session.id,
    );

    setProgressVersion(
      (value) => value + 1,
    );
  }

  function handleFirstAvailableComplete() {
    if (
      !course ||
      !firstAvailable
    ) {
      return;
    }

    completeSession(
      DEMO_USER_ID,
      course.id,
      firstAvailable.session.id,
    );

    setProgressVersion(
      (value) => value + 1,
    );
  }

  return (
    <>
      <section className="uschool-class-hero">
        <div className="uschool-class-hero-image">
          <img
            src={course.imageUrl}
            alt={course.title}
          />

          <div />
        </div>

        <Container>
          <div className="uschool-class-hero-content">
            <a
              href="/uschool"
              className="uschool-class-back"
            >
              <span>←</span>
              USchool
            </a>

            <span className="uschool-class-eyebrow">
              {course.category}
            </span>

            <h1>
              {course.title}
            </h1>

            <p>
              {course.description}
            </p>

            <div className="uschool-class-hero-meta">
              <span>
                {course.sessionCount} Sessions
              </span>

              <span>
                {formatDuration(
                  course.totalDurationMinutes,
                )}
              </span>

              <span>
                Age {course.minAge}
                {course.maxAge
                  ? `–${course.maxAge}`
                  : "+"}
              </span>
            </div>

            <ClassProgress
              completed={
                progress.completed
              }
              total={progress.total}
              percentage={
                progress.percentage
              }
            />
          </div>
        </Container>
      </section>

      <section className="uschool-class-workspace section">
        <Container>
          <div className="uschool-class-layout">
            <aside className="uschool-class-sidebar">
              <div className="uschool-class-sidebar-header">
                <span className="uschool-class-eyebrow">
                  Learning Path
                </span>

                <h2>
                  Sessions
                </h2>
              </div>

              <div className="uschool-class-session-list">
                {sessionAccess.map(
                  (item) => (
                    <SessionItem
                      key={
                        item.session.id
                      }
                      item={item}
                      completed={
                        getSessionProgress(
                          DEMO_USER_ID,
                          course.id,
                          item.session.id,
                        )?.status ===
                        "completed"
                      }
                      selected={
                        item.session.id ===
                        selectedSessionId
                      }
                      onSelect={() =>
                        setSelectedSessionId(
                          item.session.id,
                        )
                      }
                    />
                  ),
                )}
              </div>
            </aside>

            <div className="uschool-class-main">
              {selectedSession &&
              selectedSession.status ===
                "available" ? (
                <LessonContent
                  item={
                    selectedSession
                  }
                  completed={
                    selectedCompleted
                  }
                  onComplete={
                    handleComplete
                  }
                />
              ) : firstAvailable ? (
                <LessonContent
                  item={firstAvailable}
                  completed={
                    getSessionProgress(
                      DEMO_USER_ID,
                      course.id,
                      firstAvailable.session.id,
                    )?.status ===
                    "completed"
                  }
                  onComplete={
                    handleFirstAvailableComplete
                  }
                />
              ) : (
                <LockedLesson
                  item={
                    sessionAccess[0]
                  }
                />
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}