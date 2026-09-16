import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function LabHero() {
  return (
    <section className="lab-hero">
      <Container>
        <div className="lab-hero-grid">
          <div className="lab-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                Uniqe / LAB
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="lab-hero-title">
                Explore
                <br />
                what <span>could be.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="lab-hero-description">
                LAB is the experimental layer of
                Uniqe — a space for prototypes,
                research, technology experiments and
                ideas that may become something more.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="lab-hero-actions">
                <Button href="#experiments">
                  Explore Experiments
                </Button>

                <Button
                  href="/"
                  variant="secondary"
                >
                  Back to Uniqe
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal animation="scale" delay={180}>
            <div className="lab-hero-visual">
              <div className="lab-hero-grid-lines" />

              <div className="lab-hero-orbit orbit-one" />
              <div className="lab-hero-orbit orbit-two" />
              <div className="lab-hero-orbit orbit-three" />

              <div className="lab-hero-core">
                <span>LAB</span>
              </div>

              <div className="lab-hero-node node-one">
                ◈
              </div>

              <div className="lab-hero-node node-two">
                ◇
              </div>

              <div className="lab-hero-node node-three">
                ✦
              </div>

              <div className="lab-hero-label label-one">
                TEST
              </div>

              <div className="lab-hero-label label-two">
                EXPLORE
              </div>

              <div className="lab-hero-label label-three">
                CREATE
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}