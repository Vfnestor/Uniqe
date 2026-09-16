import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import "./vision.css";

const visionPoints = [
  {
    number: "01",
    title: "Connect",
    description:
      "Bring different digital experiences together inside one connected ecosystem.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Turn ideas into useful products, applications, services and experiences.",
  },
  {
    number: "03",
    title: "Evolve",
    description:
      "Keep improving the system as technology, people and possibilities change.",
  },
];

export default function Vision() {
  return (
    <section
      id="vision"
      className="home-vision section"
    >
      <Container>
        <div className="home-vision-heading">
          <Reveal animation="fade">
            <span className="section-eyebrow">
              Uniqe Vision
            </span>
          </Reveal>

          <Reveal
            animation="up"
            delay={100}
          >
            <h2 className="home-vision-title">
              A digital ecosystem
              <br />
              built to <span>evolve.</span>
            </h2>
          </Reveal>
        </div>

        <div className="home-vision-layout">
          <Reveal
            animation="left"
            delay={160}
          >
            <div className="home-vision-statement">
              <div className="home-vision-mark">
                U
              </div>

              <p>
                Uniqe is not a single product.
                It is a growing digital environment
                where ideas, technology and
                experiences can exist together.
              </p>
            </div>
          </Reveal>

          <div className="home-vision-points">
            {visionPoints.map(
              (point, index) => (
                <Reveal
                  key={point.number}
                  animation="up"
                  delay={220 + index * 100}
                >
                  <article className="home-vision-point">
                    <div className="home-vision-point-number">
                      {point.number}
                    </div>

                    <div className="home-vision-point-content">
                      <h3>
                        {point.title}
                      </h3>

                      <p>
                        {point.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </div>

        <Reveal
          animation="up"
          delay={520}
        >
          <div className="home-vision-bottom">
            <span>
              Uniqe
            </span>

            <span className="home-vision-bottom-line" />

            <span>
              One ecosystem. Continuous evolution.
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}