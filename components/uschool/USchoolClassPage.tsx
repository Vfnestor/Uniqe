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
  onSelect,
}: {
  item: USchoolSessionAccess;
  selected: boolean;
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
      ]
        .filter(Boolean)
        .join(" ")}
      disabled={!available}
      onClick={onSelect}
    >
      <span className="uschool-class-session-number">
        {String(
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
        {available
          ? "Available"
          : "Locked"}
      </span>

      <span className="uschool-class-session-icon">
        {available
          ? "→"
          : "🔒"}
      </span>
    </button>
  );
}

function LessonContent({
  item,
}: {
  item: USchoolSessionAccess;
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
            Available
          </strong>
        </div>

        <button
          type="button"
          className="uschool-complete-button"
          onClick={() => {
            alert(
              "Session completion will be connected to the user progress system in the next phase.",
            );
          }}
        >
          Mark as Completed
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
    ]);

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
                />
              ) : firstAvailable ? (
                <LessonContent
                  item={firstAvailable}
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
