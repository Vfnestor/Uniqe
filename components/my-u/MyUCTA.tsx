import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function MyUCTA() {
  return (
    <section className="my-u-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="my-u-cta-card">
            <div className="my-u-cta-mark">
              U
            </div>

            <div className="my-u-cta-content">
              <span className="section-eyebrow">
                The personal layer
              </span>

              <h2>
                One space.
                <br />
                Your Uniqe.
              </h2>

              <p>
                My U will eventually bring your
                identity, activity, preferences and
                connected experiences together in one
                personal space across the Uniqe
                ecosystem.
              </p>

              <div className="my-u-cta-actions">
                <Button href="/uapps">
                  Explore UApps
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