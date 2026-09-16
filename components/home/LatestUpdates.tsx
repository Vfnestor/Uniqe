import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import "./latest-updates.css";

type UpdateType =
  | "product"
  | "platform"
  | "lab"
  | "system";

type Update = {
  date: string;
  type: UpdateType;
  typeLabel: string;
  title: string;
  description: string;
  href: string;
  number: string;
};

const updates: Update[] = [
  {
    date: "SEP 2026",
    type: "product",
    typeLabel: "Product",
    title: "UApps is taking shape.",
    description:
      "The foundation of the UApps ecosystem is being designed and developed as part of the larger Uniqe system.",
    href: "/uapps",
    number: "01",
  },
  {
    date: "SEP 2026",
    type: "platform",
    typeLabel: "Platform",
    title: "Uniqe ecosystem foundation.",
    description:
      "Core architecture and shared systems are being prepared to connect the different parts of Uniqe.",
    href: "/ucore",
    number: "02",
  },
  {
    date: "SEP 2026",
    type: "lab",
    typeLabel: "LAB",
    title: "Ideas enter the LAB.",
    description:
      "Experimental concepts, prototypes and new directions have a dedicated space inside the Uniqe ecosystem.",
    href: "/lab",
    number: "03",
  },
  {
    date: "SEP 2026",
    type: "system",
    typeLabel: "System",
    title: "The ecosystem keeps evolving.",
    description:
      "Uniqe is being built as a modular system where new products, services and experiences can grow over time.",
    href: "/",
    number: "04",
  },
];

function UpdateTypeBadge({
  type,
  label,
}: {
  type: UpdateType;
  label: string;
}) {
  return (
    <span
      className={`latest-update-type latest-update-type-${type}`}
    >
      <span className="latest-update-type-dot" />
      {label}
    </span>
  );
}

export default function LatestUpdates() {
  return (
    <section
      id="updates"
      className="latest-updates section"
    >
      <Container>
        <div className="latest-updates-heading">
          <Reveal animation="left">
            <div>
              <span className="section-eyebrow">
                Latest / Updates
              </span>

              <h2 className="section-title">
                What&apos;s
                <br />
                happening.
              </h2>
            </div>
          </Reveal>

          <Reveal
            animation="right"
            delay={120}
          >
            <p className="section-description latest-updates-intro">
              Follow the latest developments,
              experiments and milestones across
              the Uniqe ecosystem.
            </p>
          </Reveal>
        </div>

        <div className="latest-updates-list">
          {updates.map((update, index) => (
            <Reveal
              key={update.number}
              animation="up"
              delay={180 + index * 80}
            >
              <Card
                hover
                className="latest-update-card"
              >
                <a
                  href={update.href}
                  className="latest-update-link"
                >
                  <div className="latest-update-number">
                    {update.number}
                  </div>

                  <div className="latest-update-main">
                    <div className="latest-update-meta">
                      <span className="latest-update-date">
                        {update.date}
                      </span>

                      <UpdateTypeBadge
                        type={update.type}
                        label={update.typeLabel}
                      />
                    </div>

                    <h3 className="latest-update-title">
                      {update.title}
                    </h3>

                    <p className="latest-update-description">
                      {update.description}
                    </p>
                  </div>

                  <div className="latest-update-action">
                    <span>Read update</span>

                    <span className="latest-update-arrow">
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
          delay={520}
        >
          <div className="latest-updates-footer">
            <span className="latest-updates-footer-label">
              Latest from Uniqe
            </span>

            <span className="latest-updates-footer-line" />

            <span className="latest-updates-footer-count">
              {updates.length
                .toString()
                .padStart(2, "0")}{" "}
              updates
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}