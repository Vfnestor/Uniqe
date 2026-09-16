import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ProfileHero() {
  return (
    <section className="profile-hero">
      <Container>
        <div className="profile-hero-grid">
          <div className="profile-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                My U / Profile
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="profile-hero-title">
                Your
                <br />
                <span>identity.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="profile-hero-description">
                Your Uniqe profile will become the
                central identity layer connecting your
                account, preferences and experiences
                across the ecosystem.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="profile-hero-actions">
                <Button href="#profile">
                  View Profile
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
            <div className="profile-hero-visual">
              <div className="profile-hero-grid-lines" />

              <div className="profile-hero-orbit orbit-one" />
              <div className="profile-hero-orbit orbit-two" />
              <div className="profile-hero-orbit orbit-three" />

              <div className="profile-hero-core">
                <span>U</span>
              </div>

              <div className="profile-hero-node node-one">
                ◈
              </div>

              <div className="profile-hero-node node-two">
                ◇
              </div>

              <div className="profile-hero-node node-three">
                ✦
              </div>

              <div className="profile-hero-label label-one">
                IDENTITY
              </div>

              <div className="profile-hero-label label-two">
                PROFILE
              </div>

              <div className="profile-hero-label label-three">
                PERSONAL
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}