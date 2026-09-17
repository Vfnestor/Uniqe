"use client";

import Link from "next/link";

export default function NotificationsCTA() {
  return (
    <section className="notifications-cta section">
      <div className="container">
        <div className="notifications-cta-card">
          <div>
            <span className="section-eyebrow">
              My U
            </span>

            <h2>
              One space. Your Uniqe.
            </h2>

            <p>
              Continue exploring your personal space
              and the connected Uniqe ecosystem.
            </p>
          </div>

          <div className="notifications-cta-actions">
            <Link
              href="/my-u"
              className="button button-primary"
            >
              Back to My U
            </Link>

            <Link
              href="/search"
              className="button button-secondary"
            >
              Explore Uniqe
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}