"use client";

import { useRef } from "react";

import type {
  UserApp,
} from "@/lib/uapps/user-apps";

import UserAppCard from "@/components/uapps/UserAppCard";

type Props = {
  apps: UserApp[];
};

export default function UserAppsSection({
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

    scrollRef.current.scrollBy({
      left:
        direction === "next"
          ? 350
          : -350,
      behavior: "smooth",
    });
  }

  return (
    <section className="uapps-section uapps-user-section">
      <div className="uapps-section-header">
        <div>
          <div className="uapps-section-title-row">
            <span className="uapps-section-icon">
              👥
            </span>

            <h2>
              ساخته‌شده توسط کاربران
            </h2>
          </div>

          <p>
            نرم‌افزارهایی که توسط اعضای
            اکوسیستم Uniqe ساخته و منتشر شده‌اند.
          </p>
        </div>

        <div className="uapps-carousel-controls">
          <button
            type="button"
            aria-label="قبلی"
            onClick={() =>
              scroll("prev")
            }
          >
            →
          </button>

          <button
            type="button"
            aria-label="بعدی"
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
        className="uapps-carousel uapps-user-carousel"
      >
        {apps.map((app) => (
          <UserAppCard
            key={app.id}
            app={app}
          />
        ))}
      </div>

      <div className="uapps-user-section-footer">
        <span>
          {apps.length} نرم‌افزار منتشرشده
        </span>

        <button
          type="button"
          className="uapps-user-view-all"
        >
          نمایش همه
          <span>←</span>
        </button>
      </div>
    </section>
  );
}