"use client";

import UAppsSection from "@/components/uapps/UAppsSection";
import UAppsSearchPanel from "@/components/uapps/UAppsSearchPanel";
import UAppsActionPanel from "@/components/uapps/UAppsActionPanel";

import {
  uappsDemoData,
} from "@/lib/uapps/demo-data";

export default function UAppsHome() {
  const userApps =
    uappsDemoData.filter(
      (app) =>
        app.source === "user",
    );

  const uniqeApps =
    uappsDemoData.filter(
      (app) =>
        app.source === "uniqe",
    );

  const externalApps =
    uappsDemoData.filter(
      (app) =>
        app.source ===
          "google-play" ||
        app.source ===
          "app-store",
    );

  return (
    <main className="uapps-page">
      <section className="uapps-hero">
        <div className="uapps-container">
          <div className="uapps-hero-content">
            <span className="uapps-eyebrow">
              UNIQE APPLICATION ECOSYSTEM
            </span>

            <h1>
              کشف، ساخت و انتشار
              <span>
                {" "}
                نرم‌افزار
              </span>
            </h1>

            <p>
              UApps مرکز کشف، دسترسی، ساخت و
              انتشار نرم‌افزارهای دیجیتال در
              اکوسیستم Uniqe است.
            </p>

            <div className="uapps-hero-meta">
              <span>
                نرم‌افزارهای کاربران
              </span>

              <span>
                نرم‌افزارهای Uniqe
              </span>

              <span>
                Google Play
              </span>

              <span>
                App Store
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="uapps-container uapps-main">
        <UAppsSection
          title="ساخته‌شده توسط کاربران"
          subtitle="نرم‌افزارهایی که توسط اعضای اکوسیستم Uniqe ساخته شده‌اند."
          icon="👥"
          apps={userApps}
        />

        <UAppsSection
          title="ساخته‌شده توسط Uniqe"
          subtitle="محصولات و نرم‌افزارهای رسمی اکوسیستم Uniqe."
          icon="◆"
          apps={uniqeApps}
        />

        <UAppsSection
          title="نرم‌افزارهای جدید"
          subtitle="نرم‌افزارهای موجود در منابع خارجی."
          icon="🌍"
          apps={externalApps}
        />

        <UAppsSearchPanel />

        <UAppsActionPanel />
      </div>
    </main>
  );
}