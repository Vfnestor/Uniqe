import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import "./manifesto.css";

export default function Manifesto() {
  return (
    <section className="home-manifesto section">
      <Container>
        <div className="home-manifesto-layout">
          <Reveal animation="left">
            <div className="home-manifesto-label">
              <span className="section-eyebrow">
                The Idea
              </span>

              <span className="home-manifesto-index">
                01 — 01
              </span>
            </div>
          </Reveal>

          <Reveal animation="up" delay={120}>
            <div className="home-manifesto-content">
              <p className="home-manifesto-lead">
                Technology becomes more meaningful
                when everything works together.
              </p>

              <div className="home-manifesto-line" />

              <p className="home-manifesto-text">
                Uniqe is being built as a connected
                digital environment where products,
                applications, knowledge and technology
                can evolve together.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}