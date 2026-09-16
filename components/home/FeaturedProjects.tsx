import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import "./featured-projects.css";

type ProjectStatus =
  | "active"
  | "development"
  | "experimental";

type Project = {
  name: string;
  category: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  href: string;
  number: string;
};

const projects: Project[] = [
  {
    name: "UApps",
    category: "Applications",
    description:
      "A growing collection of digital applications built around useful everyday experiences.",
    status: "active",
    statusLabel: "Active",
    href: "/uapps",
    number: "01",
  },
  {
    name: "UWeb",
    category: "Web Platform",
    description:
      "A foundation for connected websites, digital platforms and web experiences.",
    status: "development",
    statusLabel: "In Development",
    href: "/uweb",
    number: "02",
  },
  {
    name: "UCore",
    category: "Technology",
    description:
      "The technology layer designed to connect and support the Uniqe ecosystem.",
    status: "development",
    statusLabel: "In Development",
    href: "/ucore",
    number: "03",
  },
  {
    name: "LAB",
    category: "Innovation",
    description:
      "An experimental space for testing ideas, prototypes and new directions.",
    status: "experimental",
    statusLabel: "Experimental",
    href: "/lab",
    number: "04",
  },
];

function StatusIndicator({
  status,
  label,
}: {
  status: ProjectStatus;
  label: string;
}) {
  return (
    <span
      className={`featured-project-status status-${status}`}
    >
      <span className="featured-project-status-dot" />
      {label}
    </span>
  );
}

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="featured-projects section"
    >
      <Container>
        <Reveal animation="up">
          <div className="section-header featured-projects-header">
            <span className="section-eyebrow">
              Featured Projects
            </span>

            <h2 className="section-title">
              Ideas becoming
              <br />
              real things.
            </h2>

            <p className="section-description">
              A selection of projects and systems
              currently shaping the Uniqe ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="featured-projects-grid">
          {projects.map((project, index) => (
            <Reveal
              key={project.name}
              animation={
                index % 2 === 0
                  ? "up"
                  : "scale"
              }
              delay={120 + index * 80}
            >
              <Card
                hover
                className="featured-project-card"
              >
                <a
                  href={project.href}
                  className="featured-project-link"
                >
                  <div className="featured-project-top">
                    <span className="featured-project-number">
                      {project.number}
                    </span>

                    <StatusIndicator
                      status={project.status}
                      label={project.statusLabel}
                    />
                  </div>

                  <div className="featured-project-body">
                    <span className="featured-project-category">
                      {project.category}
                    </span>

                    <h3 className="featured-project-name">
                      {project.name}
                    </h3>

                    <p className="featured-project-description">
                      {project.description}
                    </p>
                  </div>

                  <div className="featured-project-bottom">
                    <span>
                      Explore project
                    </span>

                    <span className="featured-project-arrow">
                      ↗
                    </span>
                  </div>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal
          animation="up"
          delay={460}
        >
          <div className="featured-projects-footer">
            <span>
              More projects are being developed.
            </span>

            <span className="featured-projects-footer-line" />

            <span>
              Uniqe / Projects
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}