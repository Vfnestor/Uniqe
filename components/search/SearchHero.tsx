import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

export default function SearchHero() {
  return (
    <section className="search-hero">
      <Container>
        <div className="search-hero-content">
          <Reveal animation="fade">
            <span className="section-eyebrow">
              Uniqe / Search
            </span>
          </Reveal>

          <Reveal animation="up" delay={100}>
            <h1 className="search-hero-title">
              Find
              <br />
              <span>anything.</span>
            </h1>
          </Reveal>

          <Reveal animation="up" delay={180}>
            <p className="search-hero-description">
              Search across the Uniqe ecosystem and
              discover applications, projects, products,
              learning experiences and your personal space.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}