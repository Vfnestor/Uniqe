import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function USchoolCTA() {
  return (
    <section className="uschool-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="uschool-cta-card">
            <div className="uschool-cta-mark">
              U
            </div>

            <div className="uschool-cta-content">
              <span className="section-eyebrow">
                Learn with Uniqe
              </span>

              <h2>
                More knowledge.
                <br />
                More possibilities.
              </h2>

              <p>
                USchool is designed to grow.
                Learning paths, educational resources
                and practical experiences can become
                part of the ecosystem over time.
              </p>

              <div className="uschool-cta-actions">
                <Button href="/lab">
                  Explore LAB
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