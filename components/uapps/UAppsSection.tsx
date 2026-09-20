"use client";

import { useRef } from "react";

import type {
  UApp,
} from "@/lib/uapps/types";

import UniversalAppCard from "@/components/uapps/UniversalAppCard";

type Props = {
  title: string;
  subtitle: string;
  icon: string;
  apps: UApp[];
};

export default function UAppsSection({
  title,
  subtitle,
  icon,
  apps,
}: Props) {
  const scrollRef =
    useRef<HTMLDivElement>(null);

  function scroll(
    direction: "next" | "prev",
  ) {
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
            onClick={() =>
              scroll("prev")
            }
          >
            →
          </button>

          <button
            type="button"
            aria-label="نرم‌افزارهای بعدی"
            onClick={() =>
              scroll("next")
            }
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
          <UniversalAppCard
            key={app.id}
            app={app}
          />
        ))}
      </div>
    </section>
  );
}