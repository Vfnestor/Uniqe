"use client";

import Link from "next/link";

export default function FavoritesCTA() {
  return (
    <section className="favorites-cta section">
      <div className="container">
        <div className="favorites-cta-card">
          <div>
            <span className="section-eyebrow">
              Explore
            </span>

            <h2>
              Discover something worth saving.
            </h2>

            <p>
              Explore the Uniqe ecosystem and add the
              experiences you want to keep close.
            </p>
          </div>

          <div className="favorites-cta-actions">
            <Link
              href="/search"
              className="button button-primary"
            >
              Explore Uniqe
            </Link>

            <Link
              href="/my-u"
              className="button button-secondary"
            >
              Back to My U
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}