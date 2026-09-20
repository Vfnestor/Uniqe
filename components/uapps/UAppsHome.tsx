import {
  getFeaturedUniqeApps,
} from "@/lib/uapps/uniqe-apps";

import {
  userApps,
} from "@/lib/uapps/user-apps";

import {
  uappsDemoData,
} from "@/lib/uapps/demo-data";

import {
  getUAppCollections,
} from "@/lib/uapps/collections";

import {
  getVerifiedUApps,
} from "@/lib/uapps/verification";

import UserAppsSection from "./UserAppsSection";
import UAppsActionPanel from "./UAppsActionPanel";
import UAppsCollectionsSection from "./UAppsCollectionsSection";
import UAppsSearchPanel from "./UAppsSearchPanel";
import UAppsSection from "./UAppsSection";
import UAppsVerifiedSection from "./UAppsVerifiedSection";
import UniqeAppsSection from "./UniqeAppsSection";

export default function UAppsHome() {
  const publishedUserApps =
    userApps.filter(
      (app) =>
        app.reviewStatus ===
          "approved" &&
        app.status !==
          "development",
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

  const collections =
    getUAppCollections().filter(
      (collection) =>
        collection.apps.length >
        0,
    );

  const localApps = [
    ...uniqeApps,
    ...publishedUserApps,
  ];

  const verifiedApps =
    getVerifiedUApps(
      localApps,
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
          apps={
            publishedUserApps
          }
        />

        <UniqeAppsSection
          apps={
            uniqeApps
          }
        />

        <UAppsVerifiedSection
          apps={
            verifiedApps
          }
        />

        <UAppsCollectionsSection
          collections={
            collections
          }
        />

        <UAppsSection
          title="اپلیکیشن‌های خارجی"
          subtitle="محبوب‌ترین نرم‌افزارهای موجود در فروشگاه‌های خارجی."
          icon="🌐"
          apps={
            externalApps
          }
        />

        <UAppsSearchPanel />

        <UAppsActionPanel />
      </div>
    </main>
  );
}