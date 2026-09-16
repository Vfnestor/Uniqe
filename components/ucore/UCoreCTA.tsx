import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function UCoreCTA() {
  return (
    <section className="ucore-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="ucore-cta-card">
            <div className="ucore-cta-mark">
              U
            </div>

            <div className="ucore-cta-content">
              <span className="section-eyebrow">
                The foundation of Uniqe
              </span>

              <h2>
                One core.
                <br />
                One ecosystem.
              </h2>

              <p>
                UCore is designed to become the
                connective foundation behind Uniqe,
                allowing different products, services
                and experiences to work together over
                time.
              </p>

              <div className="ucore-cta-actions">
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