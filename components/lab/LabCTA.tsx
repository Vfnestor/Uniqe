import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function LabCTA() {
  return (
    <section className="lab-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="lab-cta-card">
            <div className="lab-cta-mark">
              LAB
            </div>

            <div className="lab-cta-content">
              <span className="section-eyebrow">
                Experiment with Uniqe
              </span>

              <h2>
                Ideas become
                <br />
                possibilities.
              </h2>

              <p>
                LAB is designed for experimentation.
                New concepts, technologies and
                prototypes can start here and evolve
                into future parts of the Uniqe
                ecosystem.
              </p>

              <div className="lab-cta-actions">
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