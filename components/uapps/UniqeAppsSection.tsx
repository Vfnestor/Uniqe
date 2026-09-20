"use client";

import { useMemo, useState } from "react";

import type {
  UniqeApp,
} from "@/lib/uapps/uniqe-apps";

import UniqeAppCard from "./UniqeAppCard";

type Props = {
  apps: UniqeApp[];
};

export default function UniqeAppsSection({
  apps,
}: Props) {
  const [startIndex, setStartIndex] =
    useState(0);

  const visibleApps = useMemo(() => {
    if (apps.length <= 3) {
      return apps;
    }

    return [0, 1, 2].map(
      (offset) =>
        apps[
          (startIndex + offset) %
            apps.length
        ],
    );
  }, [apps, startIndex]);

  const next = () => {
    if (apps.length <= 1) {
      return;
    }

    setStartIndex(
      (current) =>
        (current + 1) % apps.length,
    );
  };

  const previous = () => {
    if (apps.length <= 1) {
      return;
    }

    setStartIndex(
      (current) =>
        (current - 1 + apps.length) %
        apps.length,
    );
  };

  return (
    <section className="uapps-section uapps-uniqe-section">
      <div className="uapps-section-heading">
        <div>
          <span className="uapps-section-eyebrow">
            محصولات رسمی
          </span>

          <h2>
            نرم‌افزارهای Uniqe
          </h2>

          <p>
            محصولات و سرویس‌های رسمی ساخته‌شده توسط
            Uniqe.
          </p>
        </div>

        <div className="uapps-carousel-controls">
          <button
            type="button"
            onClick={previous}
            aria-label="قبلی"
            disabled={apps.length <= 1}
          >
            →
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="بعدی"
            disabled={apps.length <= 1}
          >
            ←
          </button>
        </div>
      </div>

      <div className="uapps-carousel">
        {visibleApps.map((app) => (
          <UniqeAppCard
            key={app.id}
            app={app}
          />
        ))}
      </div>

      <div className="uapps-uniqe-footer">
        <span>
          {apps.length} محصول رسمی
        </span>

        <span>
          اکوسیستم Uniqe
        </span>
      </div>
    </section>
  );
}