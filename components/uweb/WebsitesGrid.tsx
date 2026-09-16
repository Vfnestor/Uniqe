import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type { UWebProject } from "./websites";

type WebsitesGridProps = {
  projects: UWebProject[];
};

function Status({
  status,
  label,
}: {
  status: UWebProject["status"];
  label: string;
}) {
  return (
    <span
      className={`uweb-status uweb-status-${status}`}
    >
      <span className="uweb-status-dot" />
      {label}
    </span>
  );
}

export default function WebsitesGrid({
  projects,
}: WebsitesGridProps) {
  return (
    <section
      id="web-projects"
      className="uweb-projects section"
    >
      <Container>
        <Reveal animation="up">
          <div className="uweb-section-heading">
            <div>
              <span className="section-eyebrow">
                UWeb Collection
              </span>

              <h2 className="section-title">
                Explore the
                <br />
                web layer.
              </h2>
            </div>

            <p className="section-description">
              Discover websites, platforms and
              digital experiences being developed
              inside the UWeb ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="uweb-grid">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              animation="up"
              delay={120 + index * 80}
            >
              <Card
                hover
                className="uweb-card"
              >
                <a
                  href={project.href}
                  className="uweb-card-link"
                >
                  <div className="uweb-card-top">
                    <span className="uweb-card-number">
                      {project.number}
                    </span>

                    <span className="uweb-card-icon">
                      {project.icon}
                    </span>
                  </div>

                  <div className="uweb-card-content">
                    <div className="uweb-card-meta">
                      <span className="uweb-card-category">
                        {project.categoryLabel}
                      </span>

                      <Status
                        status={project.status}
                        label={project.statusLabel}
                      />
                    </div>

                    <h3 className="uweb-card-title">
                      {project.name}
                    </h3>

                    <p className="uweb-card-description">
                      {project.description}
                    </p>
                  </div>

                  <div className="uweb-card-bottom">
                    <span>
                      Explore project
                    </span>

                    <span className="uweb-card-arrow">
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