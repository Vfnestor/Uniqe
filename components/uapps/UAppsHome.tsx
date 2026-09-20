import {
  getFeaturedUniqeApps,
} from "@/lib/uapps/uniqe-apps";

import {
  userApps,
} from "@/lib/uapps/user-apps";

import {
  uappsDemoData,
} from "@/lib/uapps/demo-data";

import UserAppsSection from "./UserAppsSection";
import UAppsActionPanel from "./UAppsActionPanel";
import UAppsSearchPanel from "./UAppsSearchPanel";
import UAppsSection from "./UAppsSection";
import UniqeAppsSection from "./UniqeAppsSection";

export default function UAppsHome() {
  const publishedUserApps =
    userApps.filter(
      (app) =>
        app.reviewStatus ===
          "approved" &&
        app.status !== "development",
    );

  const uniqeApps =
    getFeaturedUniqeApps();

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
        <span className="uapps-hero-eyebrow">
          UApps
        </span>

        <h1>
          همه نرم‌افزارها، یکجا
        </h1>

        <p>
          کشف، جستجو و دسترسی به نرم‌افزارهای
          Uniqe، کاربران و فروشگاه‌های خارجی.
        </p>
      </section>

      <div className="uapps-sections-container">
        <UserAppsSection
          apps={publishedUserApps}
        />

        <UniqeAppsSection
          apps={uniqeApps}
        />

        <UAppsSection
          title="اپلیکیشن‌های خارجی"
          subtitle="محبوب‌ترین نرم‌افزارهای موجود در فروشگاه‌های خارجی."
          icon="🌐"
          apps={externalApps}
        />

        <UAppsSearchPanel />

        <UAppsActionPanel />
      </div>
    </main>
  );
}