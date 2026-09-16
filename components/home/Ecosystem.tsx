import Link from "next/link";

const ecosystem = [
  {
    number: "01",
    name: "UApps",
    description:
      "Applications and digital tools designed to solve real problems.",
    href: "/uapps",
  },
  {
    number: "02",
    name: "UWeb",
    description:
      "Modern web experiences, platforms and digital infrastructure.",
    href: "/uweb",
  },
  {
    number: "03",
    name: "UShop",
    description:
      "A future-ready commerce layer connecting products and people.",
    href: "/ushop",
  },
  {
    number: "04",
    name: "USchool",
    description:
      "Learning, skills and knowledge built around practical growth.",
    href: "/uschool",
  },
  {
    number: "05",
    name: "UCore",
    description:
      "The technological core connecting the UNIqe ecosystem.",
    href: "/ucore",
  },
  {
    number: "06",
    name: "LAB",
    description:
      "Experimental space for ideas, prototypes and new possibilities.",
    href: "/lab",
  },
];

export default function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className="section ecosystem-section"
    >
      <div className="container">
        <div className="section-header">
          <div className="section-eyebrow">
            Ecosystem
          </div>

          <h2 className="section-title">
            Six worlds.
            <br />
            One UNIqe system.
          </h2>

          <p className="section-description">
            Each part of UNIqe has a distinct purpose while
            remaining connected to the same underlying ecosystem.
          </p>
        </div>

        <div className="ecosystem-grid">
          {ecosystem.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="ecosystem-card"
            >
              <div className="ecosystem-card-top">
                <span className="ecosystem-number">
                  {item.number}
                </span>

                <span className="ecosystem-arrow">
                  ↗
                </span>
              </div>

              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}