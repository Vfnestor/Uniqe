import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type SearchEmptyProps = {
  query: string;
};

export default function SearchEmpty({
  query,
}: SearchEmptyProps) {
  return (
    <section className="search-empty-section section">
      <Container>
        <Reveal animation="scale">
          <div className="search-empty">
            <span className="search-empty-icon">
              ?
            </span>

            <span className="section-eyebrow">
              No Results
            </span>

            <h2>
              Nothing found for
              <br />
              <span>"{query}"</span>
            </h2>

            <p>
              Try another search term or explore
              the main areas of the Uniqe ecosystem.
            </p>

            <div className="search-empty-hints">
              <span>UApps</span>
              <span>UWeb</span>
              <span>UShop</span>
              <span>USchool</span>
              <span>UCore</span>
              <span>LAB</span>
              <span>My U</span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}