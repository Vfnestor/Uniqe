import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import EcosystemInteractive from "./EcosystemInteractive";

import "./ecosystem.css";

const ecosystemItems = [
  {
    name: "UApps",
    title: "Applications",
    description:
      "Digital tools and applications designed for everyday use, productivity and everyday digital experiences.",
    href: "/uapps",
    number: "01",
    icon: "◈",
  },
  {
    name: "UWeb",
    title: "Web",
    description:
      "Web experiences, platforms and services connected through the Uniqe ecosystem.",
    href: "/uweb",
    number: "02",
    icon: "◌",
  },
  {
    name: "UShop",
    title: "Commerce",
    description:
      "A foundation for products, services and digital commerce within the Uniqe environment.",
    href: "/ushop",
    number: "03",
    icon: "◇",
  },
  {
    name: "USchool",
    title: "Education",
    description:
      "Learning, knowledge and educational experiences designed to make information more accessible.",
    href: "/uschool",
    number: "04",
    icon: "△",
  },
  {
    name: "UCore",
    title: "Technology",
    description:
      "The technological foundation that connects and supports the different parts of the ecosystem.",
    href: "/ucore",
    number: "05",
    icon: "⬡",
  },
  {
    name: "LAB",
    title: "Innovation",
    description:
      "A space for experiments, ideas, prototypes and new possibilities.",
    href: "/lab",
    number: "06",
    icon: "✦",
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
              Explore the different parts of Uniqe.
              Each module has its own purpose while
              remaining connected to the larger
              ecosystem.
            </p>
          </div>
        </Reveal>

        <Reveal
          animation="up"
          delay={120}
        >
          <EcosystemInteractive
            items={ecosystemItems}
          />
        </Reveal>
      </Container>
    </section>
  );
}