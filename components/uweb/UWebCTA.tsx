import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function UWebCTA() {
  return (
    <section className="uweb-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="uweb-cta-card">
            <div className="uweb-cta-mark">
              U
            </div>

            <div className="uweb-cta-content">
              <span className="section-eyebrow">
                Build with Uniqe
              </span>

              <h2>
                The web keeps
                <br />
                evolving.
              </h2>

              <p>
                UWeb is designed to grow with
                the ecosystem. New websites,
                platforms and digital experiences
                can connect to Uniqe over time.
              </p>

              <div className="uweb-cta-actions">
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