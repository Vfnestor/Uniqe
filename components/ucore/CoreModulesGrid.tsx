import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type { UCoreModule } from "./core-modules";

type CoreModulesGridProps = {
  modules: UCoreModule[];
};

function Status({
  status,
  label,
}: {
  status: UCoreModule["status"];
  label: string;
}) {
  return (
    <span
      className={`ucore-status ucore-status-${status}`}
    >
      <span className="ucore-status-dot" />
      {label}
    </span>
  );
}

export default function CoreModulesGrid({
  modules,
}: CoreModulesGridProps) {
  return (
    <section
      id="modules"
      className="ucore-modules section"
    >
      <Container>
        <Reveal animation="up">
          <div className="ucore-section-heading">
            <div>
              <span className="section-eyebrow">
                UCore Foundation
              </span>

              <h2 className="section-title">
                Explore the
                <br />
                core modules.
              </h2>
            </div>

            <p className="section-description">
              Discover the foundational layers that
              will connect and support the wider
              Uniqe ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="ucore-grid">
          {modules.map((module, index) => (
            <Reveal
              key={module.id}
              animation="up"
              delay={120 + index * 80}
            >
              <Card
                hover
                className="ucore-card"
              >
                <a
                  href={module.href}
                  className="ucore-card-link"
                >
                  <div className="ucore-card-top">
                    <span className="ucore-card-number">
                      {module.number}
                    </span>

                    <span className="ucore-card-icon">
                      {module.icon}
                    </span>
                  </div>

                  <div className="ucore-card-content">
                    <div className="ucore-card-meta">
                      <span className="ucore-card-category">
                        {module.categoryLabel}
                      </span>

                      <Status
                        status={module.status}
                        label={module.statusLabel}
                      />
                    </div>

                    <h3 className="ucore-card-title">
                      {module.name}
                    </h3>

                    <p className="ucore-card-description">
                      {module.description}
                    </p>
                  </div>

                  <div className="ucore-card-bottom">
                    <span>
                      Explore core module
                    </span>

                    <span className="ucore-card-arrow">
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