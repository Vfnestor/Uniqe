import Link from "next/link";

import type {
  UserApp,
} from "@/lib/uapps/user-apps";

type Props = {
  app: UserApp;
};

export default function UserAppCard({
  app,
}: Props) {
  return (
    <article className="uapps-user-app-card">
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

        {app.verified && (
          <span
            className="uapps-verified-badge"
            title="تأیید شده توسط Uniqe"
          >
            ✓
          </span>
        )}
      </div>

      <div className="uapps-user-app-body">
        <div className="uapps-user-app-category">
          {app.category}
        </div>

        <h3>{app.name}</h3>

        <p>{app.description}</p>

        <div className="uapps-user-app-creator">
          <div className="uapps-creator-avatar">
            {app.creator.name
              .trim()
              .charAt(0)}
          </div>

          <div>
            <strong>
              {app.creator.name}
            </strong>

            <span>
              @{app.creator.username}
            </span>
          </div>
        </div>

        <div className="uapps-user-app-info">
          <span>
            {app.platformLabel}
          </span>

          <span>
            {app.typeLabel}
          </span>
        </div>

        <Link
          href={app.href}
          className="uapps-user-app-button"
        >
          ادامه
          <span>←</span>
        </Link>
      </div>
    </article>
  );
}