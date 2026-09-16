import Link from "next/link";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

import "./hero.css";

const orbitItems = [
  "UApps",
  "UWeb",
  "UShop",
  "USchool",
  "UCore",
  "LAB",
];

export default function Hero() {
  return (
    <section className="home-hero">
      <div className="home-hero-background" aria-hidden="true">
        <div className="home-hero-grid" />
        <div className="home-hero-glow home-hero-glow-one" />
        <div className="home-hero-glow home-hero-glow-two" />
      </div>

      <Container className="home-hero-container">
        <div className="home-hero-content">
          <Reveal animation="fade" delay={80}>
            <div className="home-hero-badge">
              <span className="home-hero-badge-dot" />
              Digital Ecosystem
            </div>
          </Reveal>

          <Reveal animation="up" delay={140}>
            <h1 className="home-hero-title">
              Build.
              <br />
              Connect.
              <br />
              <span>Explore.</span>
            </h1>
          </Reveal>

          <Reveal animation="up" delay={220}>
            <p className="home-hero-description">
              Uniqe is a digital ecosystem built to bring
              applications, web, commerce, education,
              technology and innovation together.
            </p>
          </Reveal>

          <Reveal animation="up" delay={300}>
            <div className="home-hero-actions">
              <Button
                href="/uapps"
                variant="primary"
              >
                Explore UApps
              </Button>

              <Button
                href="/lab"
                variant="secondary"
              >
                Enter LAB
              </Button>
            </div>
          </Reveal>

          <Reveal animation="up" delay={380}>
            <div className="home-hero-meta">
              <span>One ecosystem</span>
              <span className="home-hero-meta-separator">
                /
              </span>
              <span>Multiple possibilities</span>
            </div>
          </Reveal>
        </div>

        <Reveal
          animation="scale"
          delay={180}
          className="home-hero-visual-wrapper"
        >
          <div className="home-hero-visual">
            <div className="home-hero-orbit orbit-one" />
            <div className="home-hero-orbit orbit-two" />
            <div className="home-hero-orbit orbit-three" />

            <div className="home-hero-orbit-labels">
              {orbitItems.map((item, index) => (
                <span
                  key={item}
                  className={`orbit-label orbit-label-${index + 1}`}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="home-hero-core">
              <div className="home-hero-core-inner">
                <span>U</span>
              </div>
            </div>

            <div className="home-hero-signal signal-one" />
            <div className="home-hero-signal signal-two" />
            <div className="home-hero-signal signal-three" />
          </div>
        </Reveal>
      </Container>

      <div className="home-hero-scroll" aria-hidden="true">
        <span />
        <span>Scroll to explore</span>
      </div>

      <div className="home-hero-corner" aria-hidden="true">
        <Link href="/my-u">
          MY U
        </Link>
      </div>
    </section>
  );
}