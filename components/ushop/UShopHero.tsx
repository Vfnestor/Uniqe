import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function UShopHero() {
  return (
    <section className="ushop-hero">
      <Container>
        <div className="ushop-hero-grid">
          <div className="ushop-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                Uniqe / UShop
              </span>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <h1 className="ushop-hero-title">
                Products
                <br />
                for <span>possibility.</span>
              </h1>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <p className="ushop-hero-description">
                UShop is the commerce layer of
                Uniqe — a growing foundation for
                discovering digital products,
                physical products, services and
                new commerce experiences.
              </p>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <div className="ushop-hero-actions">
                <Button href="#products">
                  Explore UShop
                </Button>

                <Button
                  href="/lab"
                  variant="secondary"
                >
                  Visit LAB
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal animation="scale" delay={180}>
            <div className="ushop-hero-visual">
              <div className="ushop-hero-grid-lines" />

              <div className="ushop-hero-orbit orbit-one" />
              <div className="ushop-hero-orbit orbit-two" />
              <div className="ushop-hero-orbit orbit-three" />

              <div className="ushop-hero-core">
                <span>U</span>
              </div>

              <div className="ushop-hero-node node-one">
                ◇
              </div>

              <div className="ushop-hero-node node-two">
                □
              </div>

              <div className="ushop-hero-node node-three">
                ✦
              </div>

              <div className="ushop-hero-label label-one">
                SHOP
              </div>

              <div className="ushop-hero-label label-two">
                DISCOVER
              </div>

              <div className="ushop-hero-label label-three">
                CONNECT
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}