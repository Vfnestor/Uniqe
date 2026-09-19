"use client";

import {
  useMemo,
  useState,
} from "react";

import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/i18n/LanguageProvider";

import type { USchoolCatalogClass } from "./courses";
import { uschoolCategories } from "./courses";

type CoursesGridProps = {
  courses: USchoolCatalogClass[];
};

function formatDuration(
  minutes: number,
  language: "en" | "fa",
) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (language === "fa") {
    if (hours === 0) {
      return `${minutes} دقیقه`;
    }

    if (remainingMinutes === 0) {
      return `${hours} ساعت`;
    }

    return `${hours} ساعت و ${remainingMinutes} دقیقه`;
  }

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

function getCategoryLabel(
  category: string,
  language: "en" | "fa",
) {
  if (language === "en") {
    return category;
  }

  const categories: Record<
    string,
    string
  > = {
    Technology: "فناوری",
    "Digital Skills": "مهارت‌های دیجیتال",
    Business: "کسب‌وکار",
    Creative: "خلاقیت",
    Foundation: "زیرساخت",
  };

  return categories[category] ?? category;
}

function getTagLabel(
  tag: string,
  language: "en" | "fa",
) {
  if (language === "en") {
    return tag;
  }

  const tags: Record<
    string,
    string
  > = {
    AI: "هوش مصنوعی",
    Technology: "فناوری",
    Beginner: "مقدماتی",
    Digital: "دیجیتال",
    Productivity: "بهره‌وری",
    Skills: "مهارت‌ها",
  };

  return tags[tag] ?? tag;
}

function getCourseTitle(
  title: string,
  language: "en" | "fa",
) {
  if (language === "en") {
    return title;
  }

  const titles: Record<
    string,
    string
  > = {
    "AI Foundations":
      "مبانی هوش مصنوعی",
    "Digital Skills for the Modern World":
      "مهارت‌های دیجیتال برای دنیای مدرن",
  };

  return titles[title] ?? title;
}

function getCourseDescription(
  description: string,
  language: "en" | "fa",
) {
  if (language === "en") {
    return description;
  }

  const descriptions: Record<
    string,
    string
  > = {
    "A practical introduction to artificial intelligence and modern AI concepts.":
      "مقدمه‌ای کاربردی بر هوش مصنوعی و مفاهیم مدرن این حوزه.",
    "Build essential digital skills for study, work and everyday life.":
      "مهارت‌های ضروری دیجیتال برای یادگیری، کار و زندگی روزمره را توسعه دهید.",
  };

  return descriptions[description] ?? description;
}

export default function CoursesGrid({
  courses,
}: CoursesGridProps) {
  const {
    language,
  } = useLanguage();

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [ageInput, setAgeInput] =
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

  const text =
    language === "fa"
      ? {
          collection: "مجموعه USchool",
          learn: "یاد بگیر.",
          build: "بساز.",
          grow: "رشد کن.",
          description:
            "تجربه‌های آموزشی ساختاریافته را در اکوسیستم USchool کشف کنید. هر کلاس به‌صورت یک مسیر یادگیری هدایت‌شده با جلسات روزانه، دسترسی متناسب با سن و قالب‌های آموزشی انعطاف‌پذیر طراحی شده است.",
          category: "دسته‌بندی",
          ageCheck: "بررسی دسترسی بر اساس سن",
          yourAge: "سن شما",
          ageRestricted: "محدودیت سنی",
          ageRestrictedDescription:
            "این کلاس برای سن انتخاب‌شده در دسترس نیست.",
          ageCheckRequired:
            "بررسی سن مورد نیاز است",
          availableFor:
            "مناسب برای سنین",
          eligible:
            "امکان عضویت وجود دارد",
          canContinue:
            "می‌توانید وارد مسیر عضویت شوید.",
          join: "عضویت در کلاس",
          age: "سن",
          sessions: "جلسات",
          duration: "مدت",
          noClasses: "کلاسی پیدا نشد",
          noClassesDescription:
            "هنوز کلاس منتشرشده‌ای در این دسته‌بندی وجود ندارد.",
          free: "رایگان",
          all: "همه",
          featured: "ویژه",
        }
      : {
          collection: "USchool Collection",
          learn: "Learn.",
          build: "Build.",
          grow: "Grow.",
          description:
            "Explore structured learning experiences inside the USchool ecosystem. Each class is designed as a guided learning path with daily sessions, age-aware access and flexible learning formats.",
          category: "Category",
          ageCheck: "Check age access",
          yourAge: "Your age",
          ageRestricted: "Age restricted",
          ageRestrictedDescription:
            "This class is not available for the selected age.",
          ageCheckRequired:
            "Age check required",
          availableFor:
            "Available for ages",
          eligible:
            "Eligible to join",
          canContinue:
            "You can continue to enrollment.",
          join: "Join Class",
          age: "Age",
          sessions: "Sessions",
          duration: "Duration",
          noClasses: "No classes found",
          noClassesDescription:
            "There are no published classes in this category yet.",
          free: "Free",
          all: "All",
          featured: "Featured",
        };

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
                {text.collection}
              </span>

              <h2 className="section-title">
                {text.learn}
                <br />
                {text.build}
                <br />
                {text.grow}
              </h2>
            </div>

            <p className="section-description">
              {text.description}
            </p>
          </div>
        </Reveal>

        <Reveal
          animation="up"
          delay={80}
        >
          <div className="uschool-catalog-toolbar">
            <div className="uschool-filter-group">
              <span className="uschool-filter-label">
                {text.category}
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
                  {text.all}
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
                      {getCategoryLabel(
                        category,
                        language,
                      )}
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
                {text.ageCheck}
              </label>

              <div className="uschool-age-input-wrap">
                <input
                  id="uschool-age"
                  type="number"
                  min="1"
                  max="100"
                  inputMode="numeric"
                  placeholder={
                    text.yourAge
                  }
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
                    aria-label={
                      language === "fa"
                        ? "پاک کردن سن"
                        : "Clear age"
                    }
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {filteredCourses.length > 0 ? (
          <div className="uschool-catalog-grid">
            {filteredCourses.map(
              (course, index) => {
                const allowed =
                  isAgeAllowed(
                    selectedAge,
                    course.minAge,
                    course.maxAge,
                  );

                const requiresAge =
                  selectedAge === null;

                const locked =
                  !allowed;

                const price =
                  Number(
                    course.price ?? 0,
                  );

                const isFree =
                  !Number.isFinite(
                    price,
                  ) ||
                  price <= 0;

                return (
                  <Reveal
                    key={course.id}
                    animation="up"
                    delay={
                      120 +
                      index * 80
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
                            src={
                              course.imageUrl
                            }
                            alt={getCourseTitle(
                              course.title,
                              language,
                            )}
                          />

                          <div className="uschool-class-banner-overlay" />

                          <div className="uschool-class-banner-top">
                            <span className="uschool-class-category-badge">
                              {getCategoryLabel(
                                course.category,
                                language,
                              )}
                            </span>

                            {course.featured && (
                              <span className="uschool-class-featured">
                                {text.featured}
                              </span>
                            )}
                          </div>

                          <div className="uschool-class-banner-bottom">
                            <span className="uschool-class-number">
                              {String(
                                index + 1,
                              ).padStart(
                                2,
                                "0",
                              )}
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
                                {getCourseTitle(
                                  course.title,
                                  language,
                                )}
                              </h3>

                              <p>
                                {getCourseDescription(
                                  course.shortDescription,
                                  language,
                                )}
                              </p>
                            </div>

                            <div className="uschool-class-price">
                              <strong>
                                {isFree
                                  ? text.free
                                  : `$${price}`}
                              </strong>

                              {!isFree && (
                                <span>
                                  {
                                    course.currency
                                  }
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="uschool-class-meta">
                            <div>
                              <span>
                                {text.age}
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
                                {text.sessions}
                              </span>

                              <strong>
                                {
                                  course.sessionCount
                                }
                              </strong>
                            </div>

                            <div>
                              <span>
                                {text.duration}
                              </span>

                              <strong>
                                {formatDuration(
                                  course.totalDurationMinutes,
                                  language,
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
                                  #
                                  {getTagLabel(
                                    tag,
                                    language,
                                  )}
                                </span>
                              ),
                            )}
                          </div>

                          {locked ? (
                            <div className="uschool-class-access locked">
                              <div>
                                <strong>
                                  {
                                    text.ageRestricted
                                  }
                                </strong>

                                <span>
                                  {
                                    text.ageRestrictedDescription
                                  }
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
                                    ? text.ageCheckRequired
                                    : text.eligible}
                                </strong>

                                <span>
                                  {requiresAge
                                    ? `${text.availableFor} ${getAgeLabel(
                                        course.minAge,
                                        course.maxAge,
                                      )}.`
                                    : text.canContinue}
                                </span>
                              </div>

                              <a
                                href={`/uschool/class/${course.id}`}
                                className="uschool-join-button"
                              >
                                {text.join}

                                <span>
                                  ↗
                                </span>
                              </a>
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
              {text.noClasses}
            </h3>

            <p>
              {text.noClassesDescription}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}