import Link from "next/link";

import type {
  UApp,
} from "@/lib/uapps/types";

import {
  getUAppVerification,
  getVerifiedUApps,
  sortUAppsByVerification,
} from "@/lib/uapps/verification";

import UniversalAppCard from "./UniversalAppCard";

type Props = {
  apps: UApp[];
};

export default function UAppsVerifiedSection({
  apps,
}: Props) {
  const verifiedApps =
    sortUAppsByVerification(
      getVerifiedUApps(apps),
    ).slice(0, 6);

  if (
    verifiedApps.length === 0
  ) {
    return null;
  }

  const officialCount =
    verifiedApps.filter(
      (app) =>
        getUAppVerification(
          app,
        ).status === "official",
    ).length;

  const verifiedCount =
    verifiedApps.filter(
      (app) =>
        getUAppVerification(
          app,
        ).status === "verified",
    ).length;

  return (
    <section className="uapps-verified-section">
      <div className="uapps-section-header">
        <div>
          <div className="uapps-section-title-row">
            <span className="uapps-section-icon">
              ✓
            </span>

            <div>
              <span className="uapps-eyebrow">
                VERIFIED SYSTEM
              </span>

              <h2>
                نرم‌افزارهای تأییدشده
              </h2>
            </div>
          </div>

          <p>
            نرم‌افزارهایی که اصالت یا کیفیت آن‌ها
            توسط سیستم تأیید Uniqe مشخص شده است.
          </p>
        </div>

        <div className="uapps-verified-summary">
          {officialCount > 0 && (
            <span>
              {officialCount} رسمی
            </span>
          )}

          {verifiedCount > 0 && (
            <span>
              {verifiedCount} تأیید شده
            </span>
          )}

          <Link href="/uapps">
            مشاهده همه
          </Link>
        </div>
      </div>

      <div className="uapps-verified-grid">
        {verifiedApps.map(
          (app) => (
            <div
              key={app.id}
              className="uapps-verified-item"
            >
              <UniversalAppCard
                app={app}
              />
            </div>
          ),
        )}
      </div>
    </section>
  );
}