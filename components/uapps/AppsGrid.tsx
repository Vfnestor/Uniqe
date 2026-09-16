import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type { UApp } from "./apps";

type AppsGridProps = {
  apps: UApp[];
};

function Status({
  status,
  label,
}: {
  status: UApp["status"];
  label: string;
}) {
  return (
    <span
      className={`uapps-status uapps-status-${status}`}
    >
      <span className="uapps-status-dot" />
      {label}
    </span>
  );
}

export default function AppsGrid({
  apps,
}: AppsGridProps) {
  return (
    <section
      id="apps"
      className="uapps-apps section"
    >
      <Container>
        <Reveal animation="up">
          <div className="uapps-section-heading">
            <div>
              <span className="section-eyebrow">
                UApps Collection
              </span>

              <h2 className="section-title">
                Explore the
                <br />
                applications.
              </h2>
            </div>

            <p className="section-description">
              Discover applications and digital
              tools being built inside the UApps
              ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="uapps-grid">
          {apps.map((app, index) => (
            <Reveal
              key={app.id}
              animation="up"
              delay={120 + index * 80}
            >
              <Card
                hover
                className="uapps-card"
              >
                <a
                  href={app.href}
                  className="uapps-card-link"
                >
                  <div className="uapps-card-top">
                    <span className="uapps-card-number">
                      {app.number}
                    </span>

                    <span className="uapps-card-icon">
                      {app.icon}
                    </span>
                  </div>

                  <div className="uapps-card-content">
                    <div className="uapps-card-meta">
                      <span className="uapps-card-category">
                        {app.categoryLabel}
                      </span>

                      <Status
                        status={app.status}
                        label={app.statusLabel}
                      />
                    </div>

                    <h3 className="uapps-card-title">
                      {app.name}
                    </h3>

                    <p className="uapps-card-description">
                      {app.description}
                    </p>
                  </div>

                  <div className="uapps-card-bottom">
                    <span>
                      Explore application
                    </span>

                    <span className="uapps-card-arrow">
                      ↗
                    </span>
                  </div>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}