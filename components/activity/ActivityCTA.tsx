import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function ActivityCTA() {
  return (
    <section className="activity-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="activity-cta-card">
            <div className="activity-cta-mark">
              U
            </div>

            <div className="activity-cta-content">
              <span className="section-eyebrow">
                Your Journey
              </span>

              <h2>
                Every interaction
                <br />
                becomes part of your journey.
              </h2>

              <p>
                The Activity layer is designed to
                eventually connect your interactions
                across Uniqe and create a continuous
                personal history.
              </p>

              <div className="activity-cta-actions">
                <Button href="/my-u/profile">
                  View Profile
                </Button>

                <Button
                  href="/my-u"
                  variant="secondary"
                >
                  Back to My U
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}