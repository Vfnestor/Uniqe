"use client";

export default function NotificationsHero() {
  return (
    <section className="notifications-hero section">
      <div className="container">
        <div className="notifications-hero-grid">
          <div className="notifications-hero-content">
            <span className="section-eyebrow">
              My U / Notifications
            </span>

            <h1 className="notifications-hero-title">
              Stay connected.
            </h1>

            <p className="notifications-hero-description">
              Keep track of important updates, activity and
              new possibilities across the Uniqe ecosystem.
            </p>
          </div>

          <div className="notifications-hero-visual">
            <div className="notifications-orbit">
              <span className="notifications-orbit-ring notifications-orbit-ring-one" />
              <span className="notifications-orbit-ring notifications-orbit-ring-two" />
              <div className="notifications-orbit-core">
                <span>◇</span>
              </div>
              <span className="notifications-orbit-dot notifications-orbit-dot-one" />
              <span className="notifications-orbit-dot notifications-orbit-dot-two" />
              <span className="notifications-orbit-dot notifications-orbit-dot-three" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}