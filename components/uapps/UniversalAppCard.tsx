import Link from "next/link";

import type {
  UApp,
} from "@/lib/uapps/types";

type Props = {
  app: UApp;
};

export default function UniversalAppCard({
  app,
}: Props) {
  return (
    <article className="uapps-app-card">
      <div
        className={`uapps-app-cover uapps-accent-${app.accent}`}
      >
        <div className="uapps-cover-pattern" />

        <div className="uapps-app-icon">
          {app.icon}
        </div>

        <div className="uapps-card-source">
          {app.sourceLabel}
        </div>

        {app.official && (
          <span
            className="uapps-official-badge"
            title="محصول رسمی Uniqe"
          >
            رسمی
          </span>
        )}

        {app.verified && !app.official && (
          <span
            className="uapps-verified-badge"
            title="تأیید شده"
          >
            ✓
          </span>
        )}
      </div>

      <div className="uapps-app-card-body">
        <div className="uapps-card-meta">
          <span>
            {app.category}
          </span>

          <span>
            {app.platformLabel}
          </span>
        </div>

        <h3>{app.name}</h3>

        <p>{app.description}</p>

        {app.official && (
          <div className="uapps-official-meta">
            <span>
              {app.releaseLabel}
            </span>

            {app.version && (
              <span>
                v{app.version}
              </span>
            )}
          </div>
        )}

        <div className="uapps-card-footer">
          <span className="uapps-card-type">
            {app.typeLabel}
          </span>

          <Link
            href={app.href}
            className="uapps-continue-button"
          >
            ادامه
            <span>←</span>
          </Link>
        </div>
      </div>
    </article>
  );
}