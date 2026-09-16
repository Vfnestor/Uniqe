import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function MyUHero() {
  return (
    <section className="my-u-hero">
      <Container>
        <div className="my-u-hero-grid">
          <div className="my-u-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                Uniqe / My U
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="my-u-hero-title">
                Your space
                <br />
                inside <span>Uniqe.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="my-u-hero-description">
                My U is the personal layer of Uniqe —
                a future space for your profile,
                activity, applications, preferences
                and experiences across the ecosystem.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="my-u-hero-actions">
                <Button href="#overview">
                  Explore My U
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
            <div className="my-u-hero-visual">
              <div className="my-u-hero-grid-lines" />

              <div className="my-u-hero-orbit orbit-one" />
              <div className="my-u-hero-orbit orbit-two" />
              <div className="my-u-hero-orbit orbit-three" />

              <div className="my-u-hero-core">
                <span>U</span>
              </div>

              <div className="my-u-hero-node node-one">
                ◈
              </div>

              <div className="my-u-hero-node node-two">
                ◇
              </div>

              <div className="my-u-hero-node node-three">
                ✦
              </div>

              <div className="my-u-hero-label label-one">
                YOU
              </div>

              <div className="my-u-hero-label label-two">
                CONNECT
              </div>

              <div className="my-u-hero-label label-three">
                EXPERIENCE
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}