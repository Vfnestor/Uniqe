import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function UWebHero() {
  return (
    <section className="uweb-hero">
      <Container>
        <div className="uweb-hero-grid">
          <div className="uweb-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                Uniqe / UWeb
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="uweb-hero-title">
                Web experiences
                <br />
                <span>without limits.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="uweb-hero-description">
                UWeb is the web layer of Uniqe —
                a connected environment for websites,
                platforms, services and digital
                experiences.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="uweb-hero-actions">
                <Button href="#web-projects">
                  Explore UWeb
                </Button>

                <Button href="/lab" variant="secondary">
                  Visit LAB
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal animation="scale" delay={180}>
            <div className="uweb-hero-visual">
              <div className="uweb-hero-grid-lines" />

              <div className="uweb-hero-orbit orbit-one" />
              <div className="uweb-hero-orbit orbit-two" />
              <div className="uweb-hero-orbit orbit-three" />

              <div className="uweb-hero-core">
                <span>U</span>
              </div>

              <div className="uweb-hero-node node-one">
                ◌
              </div>

              <div className="uweb-hero-node node-two">
                ◇
              </div>

              <div className="uweb-hero-node node-three">
                ✦
              </div>

              <div className="uweb-hero-label label-one">
                WEB
              </div>

              <div className="uweb-hero-label label-two">
                CONNECT
              </div>

              <div className="uweb-hero-label label-three">
                EXPLORE
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}