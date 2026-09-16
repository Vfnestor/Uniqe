import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ActivityHero() {
  return (
    <section className="activity-hero">
      <Container>
        <div className="activity-hero-grid">
          <div className="activity-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                My U / Activity
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="activity-hero-title">
                Your
                <br />
                <span>activity.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="activity-hero-description">
                A central timeline for your interactions
                across the Uniqe ecosystem — from
                exploring applications to discovering
                projects and experiences.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="activity-hero-actions">
                <Button href="#activity">
                  View Activity
                </Button>

                <Button
                  href="/my-u"
                  variant="secondary"
                >
                  Back to My U
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal animation="scale" delay={180}>
            <div className="activity-hero-visual">
              <div className="activity-hero-grid-lines" />

              <div className="activity-hero-orbit orbit-one" />
              <div className="activity-hero-orbit orbit-two" />
              <div className="activity-hero-orbit orbit-three" />

              <div className="activity-hero-core">
                <span>U</span>
              </div>

              <div className="activity-hero-node node-one">
                ◈
              </div>

              <div className="activity-hero-node node-two">
                ◇
              </div>

              <div className="activity-hero-node node-three">
                ✦
              </div>

              <div className="activity-hero-label label-one">
                EXPLORE
              </div>

              <div className="activity-hero-label label-two">
                TRACK
              </div>

              <div className="activity-hero-label label-three">
                CONNECT
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}