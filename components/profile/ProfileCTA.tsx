import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ProfileCTA() {
  return (
    <section className="profile-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="profile-cta-card">
            <div className="profile-cta-mark">
              U
            </div>

            <div className="profile-cta-content">
              <span className="section-eyebrow">
                Your Uniqe Identity
              </span>

              <h2>
                One identity.
                <br />
                Connected experiences.
              </h2>

              <p>
                Your profile is designed to become
                the identity layer connecting My U,
                UApps, UShop, USchool and the wider
                Uniqe ecosystem.
              </p>

              <div className="profile-cta-actions">
                <Button href="/my-u">
                  Back to My U
                </Button>

                <Button
                  href="/"
                  variant="secondary"
                >
                  Back to Uniqe
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}