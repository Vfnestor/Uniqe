import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function UAppsCTA() {
  return (
    <section className="uapps-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="uapps-cta-card">
            <div className="uapps-cta-mark">
              U
            </div>

            <div className="uapps-cta-content">
              <span className="section-eyebrow">
                Build with Uniqe
              </span>

              <h2>
                More applications.
                <br />
                More possibilities.
              </h2>

              <p>
                UApps is designed to grow. New
                applications, tools and experiences
                can become part of the ecosystem over
                time.
              </p>

              <div className="uapps-cta-actions">
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
