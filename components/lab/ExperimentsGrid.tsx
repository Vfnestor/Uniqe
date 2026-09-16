import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type { LabExperiment } from "./experiments";

type ExperimentsGridProps = {
  experiments: LabExperiment[];
};

function Status({
  status,
  label,
}: {
  status: LabExperiment["status"];
  label: string;
}) {
  return (
    <span
      className={`lab-status lab-status-${status}`}
    >
      <span className="lab-status-dot" />
      {label}
    </span>
  );
}

export default function ExperimentsGrid({
  experiments,
}: ExperimentsGridProps) {
  return (
    <section
      id="experiments"
      className="lab-experiments section"
    >
      <Container>
        <Reveal animation="up">
          <div className="lab-section-heading">
            <div>
              <span className="section-eyebrow">
                Experimental Work
              </span>

              <h2 className="section-title">
                Explore the
                <br />
                experiments.
              </h2>
            </div>

            <p className="section-description">
              Discover prototypes, research projects
              and experimental ideas being explored
              inside the Uniqe LAB.
            </p>
          </div>
        </Reveal>

        <div className="lab-grid">
          {experiments.map((experiment, index) => (
            <Reveal
              key={experiment.id}
              animation="up"
              delay={120 + index * 80}
            >
              <Card
                hover
                className="lab-card"
              >
                <a
                  href={experiment.href}
                  className="lab-card-link"
                >
                  <div className="lab-card-top">
                    <span className="lab-card-number">
                      {experiment.number}
                    </span>

                    <span className="lab-card-icon">
                      {experiment.icon}
                    </span>
                  </div>

                  <div className="lab-card-content">
                    <div className="lab-card-meta">
                      <span className="lab-card-category">
                        {experiment.categoryLabel}
                      </span>

                      <Status
                        status={experiment.status}
                        label={experiment.statusLabel}
                      />
                    </div>

                    <h3 className="lab-card-title">
                      {experiment.name}
                    </h3>

                    <p className="lab-card-description">
                      {experiment.description}
                    </p>
                  </div>

                  <div className="lab-card-bottom">
                    <span>
                      Explore experiment
                    </span>

                    <span className="lab-card-arrow">
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