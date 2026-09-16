import Link from "next/link";

const modules = [
  "UApps",
  "UWeb",
  "UShop",
  "USchool",
  "UCore",
  "LAB",
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            The UNIqe ecosystem
          </div>

          <h1 className="hero-title">
            One ecosystem.
            <br />
            <span>Many possibilities.</span>
          </h1>

          <p className="hero-description">
            UNIqe is a connected digital ecosystem built to bring
            applications, web, commerce, education, technology and
            experimentation into one experience.
          </p>

          <div className="hero-actions">
            <Link
              href="/uapps"
              className="primary-button"
            >
              Explore UNIqe
              <span>↗</span>
            </Link>

            <Link
              href="#ecosystem"
              className="secondary-button"
            >
              Discover the ecosystem
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-core">
            <div className="hero-core-inner">
              <span>U</span>
            </div>
          </div>

          <div className="hero-ring hero-ring-one" />
          <div className="hero-ring hero-ring-two" />

          {modules.map((module, index) => (
            <div
              key={module}
              className={`hero-module hero-module-${index + 1}`}
            >
              {module}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}