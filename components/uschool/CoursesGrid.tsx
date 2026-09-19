"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type { USchoolCatalogClass } from "./courses";
import { uschoolCategories } from "./courses";

type CoursesGridProps = {
  courses: USchoolCatalogClass[];
};

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

function getAgeLabel(
  minAge: number,
  maxAge: number | null,
) {
  if (maxAge === null) {
    return `${minAge}+`;
  }

  return `${minAge}–${maxAge}`;
}

function isAgeAllowed(
  age: number | null,
  minAge: number,
  maxAge: number | null,
) {
  if (age === null) {
    return true;
  }

  if (age < minAge) {
    return false;
  }

  if (
    maxAge !== null &&
    age > maxAge
  ) {
    return false;
  }

  return true;
}

export default function CoursesGrid({
  courses,
}: CoursesGridProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [ageInput, setAgeInput] =
    useState("");

  const [joinMessage, setJoinMessage] =
    useState("");

  const selectedAge = useMemo(() => {
    if (!ageInput) {
      return null;
    }

    const parsed = Number(ageInput);

    if (
      Number.isNaN(parsed) ||
      parsed < 1 ||
      parsed > 100
    ) {
      return null;
    }

    return parsed;
  }, [ageInput]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (
        selectedCategory !== "All" &&
        course.category !== selectedCategory
      ) {
        return false;
      }

      return true;
    });
  }, [
    courses,
    selectedCategory,
  ]);

  function handleJoin(course: USchoolCatalogClass) {
    setJoinMessage(
      `"${course.title}" is ready for enrollment. Account, payment and class access will be connected in the next USchool phase.`,
    );
  }

  return (
    <section
      id="courses"
      className="uschool-courses section"
    >
      <Container>
        <Reveal animation="up">
          <div className="uschool-section-heading">
            <div>
              <span className="section-eyebrow">
                USchool Collection
              </span>

              <h2 className="section-title">
                Learn.
                <br />
                Build.
                <br />
                Grow.
              </h2>
            </div>

            <p className="section-description">
              Explore structured learning experiences
              inside the USchool ecosystem. Each class
              is designed as a guided learning path with
              daily sessions, age-aware access and
              flexible learning formats.
            </p>
          </div>
        </Reveal>

        <Reveal animation="up" delay={80}>
          <div className="uschool-catalog-toolbar">
            <div className="uschool-filter-group">
              <span className="uschool-filter-label">
                Category
              </span>

              <div className="uschool-filter-list">
                <button
                  type="button"
                  className={
                    selectedCategory === "All"
                      ? "uschool-filter-button is-active"
                      : "uschool-filter-button"
                  }
                  onClick={() =>
                    setSelectedCategory("All")
                  }
                >
                  All
                </button>

                {uschoolCategories.map(
                  (category) => (
                    <button
                      key={category}
                      type="button"
                      className={
                        selectedCategory === category
                          ? "uschool-filter-button is-active"
                          : "uschool-filter-button"
                      }
                      onClick={() =>
                        setSelectedCategory(
                          category,
                        )
                      }
                    >
                      {category}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="uschool-age-filter">
              <label
                htmlFor="uschool-age"
                className="uschool-filter-label"
              >
                Check age access
              </label>

              <div className="uschool-age-input-wrap">
                <input
                  id="uschool-age"
                  type="number"
                  min="1"
                  max="100"
                  inputMode="numeric"
                  placeholder="Your age"
                  value={ageInput}
                  onChange={(event) =>
                    setAgeInput(
                      event.target.value,
                    )
                  }
                />

                {ageInput && (
                  <button
                    type="button"
                    className="uschool-age-clear"
                    onClick={() =>
                      setAgeInput("")
                    }
                    aria-label="Clear age"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {joinMessage && (
          <Reveal animation="up">
            <div className="uschool-join-message">
              <span>i</span>

              <p>{joinMessage}</p>

              <button
                type="button"
                onClick={() =>
                  setJoinMessage("")
                }
                aria-label="Close message"
              >
                ×
              </button>
            </div>
          </Reveal>
        )}

        {filteredCourses.length > 0 ? (
          <div className="uschool-catalog-grid">
            {filteredCourses.map(
              (course, index) => {
                const allowed = isAgeAllowed(
                  selectedAge,
                  course.minAge,
                  course.maxAge,
                );

                const requiresAge =
                  selectedAge === null;

                const locked =
                  !allowed;

                return (
                  <Reveal
                    key={course.id}
                    animation="up"
                    delay={
                      120 + index * 80
                    }
                  >
                    <Card
                      hover={!locked}
                      className={
                        locked
                          ? "uschool-class-card is-locked"
                          : "uschool-class-card"
                      }
                    >
                      <article>
                        <div className="uschool-class-banner">
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                          />

                          <div className="uschool-class-banner-overlay" />

                          <div className="uschool-class-banner-top">
                            <span className="uschool-class-category-badge">
                              {course.category}
                            </span>

                            {course.featured && (
                              <span className="uschool-class-featured">
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="uschool-class-banner-bottom">
                            <span className="uschool-class-number">
                              {String(
                                index + 1,
                              ).padStart(2, "0")}
                            </span>

                            {locked && (
                              <span className="uschool-class-lock">
                                🔒
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="uschool-class-content">
                          <div className="uschool-class-heading">
                            <div>
                              <h3>
                                {course.title}
                              </h3>

                              <p>
                                {
                                  course.shortDescription
                                }
                              </p>
                            </div>

                            <div className="uschool-class-price">
                              <strong>
                                $
                                {course.price}
                              </strong>

                              <span>
                                {course.currency}
                              </span>
                            </div>
                          </div>

                          <div className="uschool-class-meta">
                            <div>
                              <span>
                                Age
                              </span>

                              <strong>
                                {getAgeLabel(
                                  course.minAge,
                                  course.maxAge,
                                )}
                              </strong>
                            </div>

                            <div>
                              <span>
                                Sessions
                              </span>

                              <strong>
                                {
                                  course.sessionCount
                                }
                              </strong>
                            </div>

                            <div>
                              <span>
                                Duration
                              </span>

                              <strong>
                                {formatDuration(
                                  course.totalDurationMinutes,
                                )}
                              </strong>
                            </div>
                          </div>

                          <div className="uschool-class-tags">
                            {course.tags.map(
                              (tag) => (
                                <span
                                  key={tag}
                                >
                                  #{tag}
                                </span>
                              ),
                            )}
                          </div>

                          {locked ? (
                            <div className="uschool-class-access locked">
                              <div>
                                <strong>
                                  Age restricted
                                </strong>

                                <span>
                                  This class is not
                                  available for the
                                  selected age.
                                </span>
                              </div>

                              <span className="uschool-class-access-icon">
                                🔒
                              </span>
                            </div>
                          ) : (
                            <div className="uschool-class-access">
                              <div>
                                <strong>
                                  {requiresAge
                                    ? "Age check required"
                                    : "Eligible to join"}
                                </strong>

                                <span>
                                  {requiresAge
                                    ? `Available for ages ${getAgeLabel(
                                        course.minAge,
                                        course.maxAge,
                                      )}.`
                                    : "You can continue to enrollment."}
                                </span>
                              </div>

                              <button
                                type="button"
                                className="uschool-join-button"
                                onClick={() =>
                                  handleJoin(
                                    course,
                                  )
                                }
                              >
                                Join Class
                                <span>
                                  ↗
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      </article>
                    </Card>
                  </Reveal>
                );
              },
            )}
          </div>
        ) : (
          <div className="uschool-catalog-empty">
            <span>◌</span>

            <h3>
              No classes found
            </h3>

            <p>
              There are no published classes in
              this category yet.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
