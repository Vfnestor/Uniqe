import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function UAppsHero() {
  return (
    <section className="uapps-hero">
      <Container>
        <div className="uapps-hero-grid">
          <div className="uapps-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                Uniqe / UApps
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="uapps-hero-title">
                Applications
                <br />
                for <span>possibility.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="uapps-hero-description">
                UApps is the application layer of
                Uniqe — a growing collection of
                digital tools, utilities and
                experiences designed to be useful,
                connected and simple.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="uapps-hero-actions">
                <Button href="#apps">
                  Explore Apps
                </Button>

                <Button href="/lab" variant="secondary">
                  Visit LAB
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal animation="scale" delay={180}>
            <div className="uapps-hero-visual">
              <div className="uapps-hero-orbit orbit-one" />
              <div className="uapps-hero-orbit orbit-two" />
              <div className="uapps-hero-orbit orbit-three" />

              <div className="uapps-hero-core">
                <span>U</span>
              </div>

              <div className="uapps-hero-node node-one">
                ◈
              </div>

              <div className="uapps-hero-node node-two">
                ◇
              </div>

              <div className="uapps-hero-node node-three">
                ✦
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}