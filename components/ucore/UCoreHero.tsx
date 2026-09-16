import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function UCoreHero() {
  return (
    <section className="ucore-hero">
      <Container>
        <div className="ucore-hero-grid">
          <div className="ucore-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                Uniqe / UCore
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="ucore-hero-title">
                The core
                <br />
                of <span>Uniqe.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="ucore-hero-description">
                UCore is the central technical layer
                of Uniqe — designed to connect
                applications, data, services and
                infrastructure into one coherent
                ecosystem.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="ucore-hero-actions">
                <Button href="#modules">
                  Explore UCore
                </Button>

                <Button
                  href="/lab"
                  variant="secondary"
                >
                  Visit LAB
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal animation="scale" delay={180}>
            <div className="ucore-hero-visual">
              <div className="ucore-hero-grid-lines" />

              <div className="ucore-hero-orbit orbit-one" />
              <div className="ucore-hero-orbit orbit-two" />
              <div className="ucore-hero-orbit orbit-three" />

              <div className="ucore-hero-core">
                <span>U</span>
              </div>

              <div className="ucore-hero-node node-one">
                ◈
              </div>

              <div className="ucore-hero-node node-two">
                ◇
              </div>

              <div className="ucore-hero-node node-three">
                ✦
              </div>

              <div className="ucore-hero-label label-one">
                CORE
              </div>

              <div className="ucore-hero-label label-two">
                CONNECT
              </div>

              <div className="ucore-hero-label label-three">
                POWER
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}