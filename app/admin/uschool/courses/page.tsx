"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";
import AdminSearch from "@/components/admin/AdminSearch";
import { uschoolAdminClasses } from "@/components/uschool/admin-courses";

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

function getAgeLabel(minAge: number, maxAge: number | null) {
  if (!maxAge) {
    return `${minAge}+`;
  }

  return `${minAge}–${maxAge}`;
}

export default function USchoolCoursesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const classes = useMemo(() => {
    return uschoolAdminClasses.filter((item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        item.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USCHOOL / CLASSES"
        title="Classes"
        description="Create, organize and control access to USchool classes."
        actions={
          <Link
            href="/admin/uschool/courses/new"
            className="admin-button admin-button-primary"
          >
            + Add Class
          </Link>
        }
      />

      <AdminPanel>
        <div className="admin-list-toolbar">
          <AdminSearch
            value={search}
            onChange={setSearch}
            placeholder="Search classes..."
          />

          <select
            className="admin-list-filter"
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value)
            }
          >
            <option value="all">All classes</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </AdminPanel>

      <section className="admin-uschool-class-grid">
        {classes.map((course) => (
          <article
            key={course.id}
            className="admin-uschool-class-card"
          >
            <div
              className="admin-uschool-class-cover"
              style={{
                backgroundImage: `url("${course.imageUrl}")`,
              }}
            >
              <div className="admin-uschool-class-cover-overlay" />

              <div className="admin-uschool-class-top">
                <span className="admin-uschool-category-badge">
                  {course.category}
                </span>

                {course.featured && (
                  <span className="admin-uschool-featured-badge">
                    Featured
                  </span>
                )}
              </div>

              <div className="admin-uschool-price">
                <small>Price</small>
                <strong>${course.price}</strong>
              </div>
            </div>

            <div className="admin-uschool-class-body">
              <div className="admin-uschool-class-meta">
                <span>
                  👤 {getAgeLabel(
                    course.minAge,
                    course.maxAge,
                  )}
                </span>

                <span>
                  🎬 {course.sessionCount} sessions
                </span>

                <span>
                  ⏱ {formatDuration(
                    course.totalDurationMinutes,
                  )}
                </span>
              </div>

              <h2>{course.title}</h2>

              <p>{course.shortDescription}</p>

              <div className="admin-uschool-tags">
                {course.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="admin-uschool-class-footer">
                <span
                  className={`admin-status-badge admin-status-${course.status}`}
                >
                  {course.status}
                </span>

                <Link
                  href={`/admin/uschool/courses/${course.id}`}
                  className="admin-table-action"
                >
                  Edit class →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {classes.length === 0 && (
        <AdminPanel>
          <div className="admin-uschool-empty">
            <div>🎓</div>

            <h3>No classes found</h3>

            <p>
              Try changing your search or create a new
              USchool class.
            </p>

            <Link
              href="/admin/uschool/courses/new"
              className="admin-button admin-button-primary"
            >
              Create Class
            </Link>
          </div>
        </AdminPanel>
      )}
    </div>
  );
}