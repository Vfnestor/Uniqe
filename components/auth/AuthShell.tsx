import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

type AuthShellProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className="auth-page">
      <section className="auth-section">
        <Container>
          <div className="auth-layout">
            <Reveal animation="fade">
              <div className="auth-intro">
                <span className="section-eyebrow">
                  {eyebrow}
                </span>

                <h1 className="auth-title">
                  {title}
                </h1>

                <p className="auth-description">
                  {description}
                </p>
              </div>
            </Reveal>

            <Reveal animation="scale" delay={120}>
              <div className="auth-panel">
                {children}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}