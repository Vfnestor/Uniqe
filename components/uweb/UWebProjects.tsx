"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import UWebProjectCard from "@/components/uweb/UWebProjectCard";
import { demoProjects } from "@/lib/uweb/mock-data";

type FilterValue =
  | "all"
  | "draft"
  | "submitted"
  | "under_review"
  | "matching"
  | "in_progress"
  | "completed";

const filters: {
  value: FilterValue;
  label: string;
}[] = [
  {
    value: "all",
    label: "همه پروژه‌ها",
  },
  {
    value: "draft",
    label: "پیش‌نویس",
  },
  {
    value: "submitted",
    label: "ارسال شده",
  },
  {
    value: "under_review",
    label: "در حال بررسی",
  },
  {
    value: "matching",
    label: "در حال تطبیق",
  },
  {
    value: "in_progress",
    label: "در حال اجرا",
  },
  {
    value: "completed",
    label: "تکمیل شده",
  },
];

export default function UWebProjects() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const projects = useMemo(() => {
    if (filter === "all") {
      return demoProjects;
    }

    return demoProjects.filter(
      (project) => project.status === filter,
    );
  }, [filter]);

  return (
    <section className="uweb-projects-page">
      <Container>
        <Reveal animation="up">
          <header className="uweb-projects-header">
            <div>
              <span className="section-eyebrow">
                Uniqe / UWeb
              </span>

              <h1>پروژه‌های UWeb</h1>

              <p>
                پروژه‌های تعریف‌شده در UWeb را مشاهده و وضعیت
                آن‌ها را دنبال کنید.
              </p>
            </div>

            <Button href="/uweb/order">
              ایجاد پروژه جدید
            </Button>
          </header>
        </Reveal>

        <Reveal animation="up" delay={100}>
          <div className="uweb-project-filters">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={
                  filter === item.value
                    ? "active"
                    : ""
                }
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="uweb-projects-grid">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <Reveal
                key={project.id}
                animation="up"
                delay={index * 70}
              >
                <UWebProjectCard project={project} />
              </Reveal>
            ))
          ) : (
            <div className="uweb-projects-empty">
              <div className="uweb-projects-empty-mark">
                U
              </div>

              <h2>
                پروژه‌ای در این وضعیت وجود ندارد.
              </h2>

              <p>
                می‌توانید یک پروژه جدید در UWeb ایجاد کنید.
              </p>

              <Button href="/uweb/order">
                ایجاد پروژه
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
