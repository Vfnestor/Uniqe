import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function UShopCTA() {
  return (
    <section className="ushop-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="ushop-cta-card">
            <div className="ushop-cta-mark">
              U
            </div>

            <div className="ushop-cta-content">
              <span className="section-eyebrow">
                Build with Uniqe
              </span>

              <h2>
                More products.
                <br />
                More possibilities.
              </h2>

              <p>
                UShop is designed to grow. Products,
                services and new commerce experiences
                can become part of the ecosystem over
                time.
              </p>

              <div className="ushop-cta-actions">
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