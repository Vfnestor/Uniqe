import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import "./ecosystem.css";

const ecosystemItems = [
  {
    name: "UApps",
    title: "Applications",
    description:
      "Digital tools and applications designed for everyday use.",
    href: "/uapps",
    number: "01",
  },
  {
    name: "UWeb",
    title: "Web",
    description:
      "Web experiences, platforms and services connected to the ecosystem.",
    href: "/uweb",
    number: "02",
  },
  {
    name: "UShop",
    title: "Commerce",
    description:
      "A foundation for products, services and digital commerce.",
    href: "/ushop",
    number: "03",
  },
  {
    name: "USchool",
    title: "Education",
    description:
      "Learning, knowledge and educational experiences.",
    href: "/uschool",
    number: "04",
  },
  {
    name: "UCore",
    title: "Technology",
    description:
      "The technological foundation connecting the ecosystem.",
    href: "/ucore",
    number: "05",
  },
  {
    name: "LAB",
    title: "Innovation",
    description:
      "A space for experiments, ideas, prototypes and new possibilities.",
    href: "/lab",
    number: "06",
  },
];

export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="home-ecosystem section"
    >
      <Container>
        <Reveal animation="up">
          <div className="section-header home-ecosystem-header">
            <span className="section-eyebrow">
              The Ecosystem
            </span>

            <h2 className="section-title">
              One system.
              <br />
              Many directions.
            </h2>

            <p className="section-description">
              Uniqe is structured as a collection of
              connected spaces. Each part has its own
              purpose while remaining part of one larger
              system.
            </p>
          </div>
        </Reveal>

        <div className="home-ecosystem-grid animation-group">
          {ecosystemItems.map((item) => (
            <Reveal
              key={item.name}
              animation="up"
            >
              <Card
                hover
                className="home-ecosystem-card"
              >
                <a
                  href={item.href}
                  className="home-ecosystem-card-link"
                >
                  <div className="home-ecosystem-card-top">
                    <span className="home-ecosystem-number">
                      {item.number}
                    </span>

                    <span className="home-ecosystem-arrow">
                      ↗
                    </span>
                  </div>

                  <div className="home-ecosystem-card-body">
                    <span className="home-ecosystem-name">
                      {item.name}
                    </span>

                    <h3 className="home-ecosystem-title">
                      {item.title}
                    </h3>

                    <p className="home-ecosystem-description">
                      {item.description}
                    </p>
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