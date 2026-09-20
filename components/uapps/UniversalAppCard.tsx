import Link from "next/link";

import type {
  UApp,
} from "@/lib/uapps/types";

import {
  getUAppVerification,
} from "@/lib/uapps/verification";

type Props = {
  app: UApp;
};

export default function UniversalAppCard({
  app,
}: Props) {
  const verification =
    getUAppVerification(app);

  return (
    <article
      className={`uapps-app-card uapps-verification-${verification.status}`}
    >
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

        {verification.status ===
          "official" && (
          <span
            className="uapps-verification-badge uapps-verification-badge-official"
            title={
              verification.description
            }
          >
            <span>
              {verification.icon}
            </span>

            {verification.shortLabel}
          </span>
        )}

        {verification.status ===
          "verified" && (
          <span
            className="uapps-verification-badge uapps-verification-badge-verified"
            title={
              verification.description
            }
          >
            <span>
              {verification.icon}
            </span>

            {verification.shortLabel}
          </span>
        )}

        {verification.status ===
          "unverified" && (
          <span
            className="uapps-verification-badge uapps-verification-badge-unverified"
            title={
              verification.description
            }
          >
            <span>
              {verification.icon}
            </span>

            {verification.shortLabel}
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

        <h3>
          {app.name}
        </h3>

        <p>
          {app.description}
        </p>

        <div className="uapps-verification-meta">
          <span
            className={`uapps-verification-status uapps-verification-status-${verification.status}`}
          >
            <span>
              {verification.icon}
            </span>

            {verification.label}
          </span>
        </div>

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
            <span>
              ←
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}