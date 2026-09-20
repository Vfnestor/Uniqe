"use client";

import { useRef } from "react";
import Link from "next/link";

type AppItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  accent: string;
};

type Props = {
  title: string;
  subtitle: string;
  icon: string;
  apps: AppItem[];
};

export default function UAppsSection({
  title,
  subtitle,
  icon,
  apps,
}: Props) {
  const scrollRef =
    useRef<HTMLDivElement>(null);

  function scroll(direction: "next" | "prev") {
    if (!scrollRef.current) {
      return;
    }

    const amount =
      direction === "next"
        ? 360
        : -360;

    scrollRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="uapps-section">
      <div className="uapps-section-header">
        <div>
          <div className="uapps-section-title-row">
            <span className="uapps-section-icon">
              {icon}
            </span>

            <h2>{title}</h2>
          </div>

          <p>{subtitle}</p>
        </div>

        <div className="uapps-carousel-controls">
          <button
            type="button"
            aria-label="نرم‌افزارهای قبلی"
            onClick={() => scroll("prev")}
          >
            →
          </button>

          <button
            type="button"
            aria-label="نرم‌افزارهای بعدی"
            onClick={() => scroll("next")}
          >
            ←
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="uapps-carousel"
      >
        {apps.map((app) => (
          <article
            key={app.id}
            className="uapps-app-card"
          >
            <div
              className={`uapps-app-cover uapps-accent-${app.accent}`}
            >
              <div className="uapps-cover-pattern" />

              <div className="uapps-app-icon">
                {app.icon}
              </div>

              <span className="uapps-platform-label">
                APP
              </span>
            </div>

            <div className="uapps-app-card-body">
              <span className="uapps-app-category">
                {app.category}
              </span>

              <h3>{app.name}</h3>

              <p>{app.description}</p>

              <Link
                href="/uapps"
                className="uapps-continue-button"
              >
                ادامه
                <span>←</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}