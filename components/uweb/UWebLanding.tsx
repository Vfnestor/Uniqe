import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const services = [
  ["01", "Project Design", "Turn a web idea into a structured project specification."],
  ["02", "Professional Matching", "Connect each project with professionals whose skills fit the requirements."],
  ["03", "Project Workspace", "Keep requirements, milestones, files, deliveries and revisions together."],
];

const projectTypes = [
  "Corporate website",
  "E-commerce",
  "Landing page",
  "Web application",
  "Portal / platform",
  "Custom digital experience",
];

const steps = [
  ["01", "Define", "Choose the project type, website, purpose, platform and requirements."],
  ["02", "Specify", "Describe design, content, features, budget and expected timeline."],
  ["03", "Match", "UWeb prepares the project for suitable professionals."],
  ["04", "Execute", "After agreements are completed, the project moves into its workspace."],
];

export default function UWebLanding() {
  return (
    <>
      <section className="uweb-hero">
        <Container>
          <div className="uweb-hero-grid">
            <div className="uweb-hero-content">
              <Reveal animation="fade">
                <span className="section-eyebrow">Uniqe / UWeb</span>
              </Reveal>

              <Reveal animation="up" delay={100}>
                <h1 className="uweb-hero-title">
                  Build the right
                  <br />
                  <span>web project.</span>
                </h1>
              </Reveal>

              <Reveal animation="up" delay={180}>
                <p className="uweb-hero-description">
                  UWeb is Uniqe&apos;s project layer for planning, ordering,
                  matching and executing professional websites and web
                  experiences.
                </p>
              </Reveal>

              <Reveal animation="up" delay={260}>
                <div className="uweb-hero-actions">
                  <Button href="/uweb/order">Start a project</Button>

                  <Button
                    href="/uweb/projects"
                    variant="secondary"
                  >
                    Explore projects
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal animation="scale" delay={180}>
              <div
                className="uweb-hero-visual"
                aria-hidden="true"
              >
                <div className="uweb-hero-grid-lines" />

                <div className="uweb-hero-orbit orbit-one" />
                <div className="uweb-hero-orbit orbit-two" />
                <div className="uweb-hero-orbit orbit-three" />

                <div className="uweb-hero-core">
                  <span>U</span>
                </div>

                <div className="uweb-hero-node node-one">
                  01
                </div>

                <div className="uweb-hero-node node-two">
                  02
                </div>

                <div className="uweb-hero-node node-three">
                  03
                </div>

                <div className="uweb-hero-label label-one">
                  DEFINE
                </div>

                <div className="uweb-hero-label label-two">
                  MATCH
                </div>

                <div className="uweb-hero-label label-three">
                  BUILD
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="uweb-section section">
        <Container>
          <Reveal animation="up">
            <div className="uweb-section-heading">
              <div>
                <span className="section-eyebrow">
                  What UWeb does
                </span>

                <h2 className="section-title">
                  From idea to execution.
                </h2>
              </div>

              <p className="section-description">
                UWeb turns an unstructured website request into a
                clear project that can be reviewed, matched and
                executed.
              </p>
            </div>
          </Reveal>

          <div className="uweb-service-grid">
            {services.map(
              ([number, title, description], index) => (
                <Reveal
                  key={number}
                  animation="up"
                  delay={index * 80}
                >
                  <article className="uweb-feature-card">
                    <span className="uweb-feature-number">
                      {number}
                    </span>

                    <h3>{title}</h3>

                    <p>{description}</p>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </Container>
      </section>

      <section className="uweb-section uweb-section-soft section">
        <Container>
          <div className="uweb-process-layout">
            <Reveal animation="up">
              <div>
                <span className="section-eyebrow">
                  How it works
                </span>

                <h2 className="section-title">
                  A structured path for every project.
                </h2>

                <p className="section-description">
                  The workflow is designed so the client knows
                  what is being requested and the professional
                  knows exactly what is expected.
                </p>
              </div>
            </Reveal>

            <div className="uweb-step-list">
              {steps.map(
                ([number, title, description], index) => (
                  <Reveal
                    key={number}
                    animation="up"
                    delay={index * 70}
                  >
                    <div className="uweb-step">
                      <span>{number}</span>

                      <div>
                        <h3>{title}</h3>

                        <p>{description}</p>
                      </div>
                    </div>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="uweb-section section">
        <Container>
          <Reveal animation="up">
            <div className="uweb-section-heading">
              <div>
                <span className="section-eyebrow">
                  Project types
                </span>

                <h2 className="section-title">
                  Start with the outcome.
                </h2>
              </div>

              <p className="section-description">
                Choose a starting point and describe the project
                in the order wizard. Custom requirements can be
                added later.
              </p>
            </div>
          </Reveal>

          <div className="uweb-type-grid">
            {projectTypes.map((type, index) => (
              <Reveal
                key={type}
                animation="up"
                delay={index * 50}
              >
                <div className="uweb-type-card">
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{type}</strong>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="uweb-professional section">
        <Container>
          <Reveal animation="scale">
            <div className="uweb-professional-card">
              <div>
                <span className="section-eyebrow">
                  For professionals
                </span>

                <h2>
                  Bring your skills to the right project.
                </h2>

                <p>
                  Professionals can discover relevant
                  opportunities, review requirements and apply
                  when their skills and availability fit.
                </p>
              </div>

              <Button
                href="/uweb/opportunities"
                variant="secondary"
              >
                View opportunities
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="uweb-section section">
        <Container>
          <div className="uweb-trust-grid">
            <Reveal animation="up">
              <div>
                <span className="section-eyebrow">
                  Built for clarity
                </span>

                <h2 className="section-title">
                  One project. One specification. One workspace.
                </h2>
              </div>
            </Reveal>

            <div className="uweb-trust-list">
              <Reveal animation="up" delay={80}>
                <p>
                  <strong>Clear scope</strong> — requirements are
                  captured before execution.
                </p>
              </Reveal>

              <Reveal animation="up" delay={140}>
                <p>
                  <strong>Skill-based matching</strong> — projects
                  can be routed toward suitable professionals.
                </p>
              </Reveal>

              <Reveal animation="up" delay={200}>
                <p>
                  <strong>Agreement-first execution</strong> —
                  professional participation is tied to the UWeb
                  agreement flow.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="uweb-section uweb-section-soft section">
        <Container>
          <Reveal animation="up">
            <div className="uweb-faq-heading">
              <span className="section-eyebrow">
                FAQ
              </span>

              <h2 className="section-title">
                Questions, before you start.
              </h2>
            </div>
          </Reveal>

          <div className="uweb-faq">
            <details>
              <summary>
                Can I request a completely custom website?
              </summary>

              <p>
                Yes. The order flow is designed to capture custom
                requirements in addition to predefined project types.
              </p>
            </details>

            <details>
              <summary>
                How are professionals connected to a project?
              </summary>

              <p>
                UWeb uses the project requirements and required
                skills as the foundation for professional matching.
              </p>
            </details>

            <details>
              <summary>
                When does execution begin?
              </summary>

              <p>
                After the project is selected and the required
                agreement flow is completed, the project can move
                into its workspace.
              </p>
            </details>

            <details>
              <summary>
                Where will the project be managed?
              </summary>

              <p>
                The planned UWeb workspace brings requirements,
                milestones, deliveries, revisions, files, messages
                and contract information together.
              </p>
            </details>
          </div>
        </Container>
      </section>

      <section className="uweb-cta section">
        <Container>
          <Reveal animation="scale">
            <div className="uweb-cta-card">
              <div className="uweb-cta-mark">
                U
              </div>

              <div className="uweb-cta-content">
                <span className="section-eyebrow">
                  Start with UWeb
                </span>

                <h2>
                  Have a web project in mind?
                </h2>

                <p>
                  Describe it once. UWeb turns the idea into a
                  structured project ready for the next step.
                </p>

                <div className="uweb-cta-actions">
                  <Button href="/uweb/order">
                    Create a project
                  </Button>

                  <Button
                    href="/uweb/help"
                    variant="secondary"
                  >
                    How UWeb works
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}