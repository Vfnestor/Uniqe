import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function USchoolHero() {
  return (
    <section className="uschool-hero">
      <Container>
        <div className="uschool-hero-grid">
          <div className="uschool-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                Uniqe / USchool
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="uschool-hero-title">
                Learn
                <br />
                for <span>possibility.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="uschool-hero-description">
                USchool is the learning layer of
                Uniqe — a growing educational
                foundation for knowledge, skills,
                practical learning and continuous
                discovery.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="uschool-hero-actions">
                <Button href="#courses">
                  Explore USchool
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
            <div className="uschool-hero-visual">
              <div className="uschool-hero-grid-lines" />

              <div className="uschool-hero-orbit orbit-one" />
              <div className="uschool-hero-orbit orbit-two" />
              <div className="uschool-hero-orbit orbit-three" />

              <div className="uschool-hero-core">
                <span>U</span>
              </div>

              <div className="uschool-hero-node node-one">
                ◇
              </div>

              <div className="uschool-hero-node node-two">
                □
              </div>

              <div className="uschool-hero-node node-three">
                ✦
              </div>

              <div className="uschool-hero-label label-one">
                LEARN
              </div>

              <div className="uschool-hero-label label-two">
                BUILD
              </div>

              <div className="uschool-hero-label label-three">
                GROW
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}