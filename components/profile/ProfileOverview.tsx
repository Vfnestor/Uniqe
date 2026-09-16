import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import type { ProfileStat } from "./profile";

type ProfileOverviewProps = {
  stats: ProfileStat[];
};

export default function ProfileOverview({
  stats,
}: ProfileOverviewProps) {
  return (
    <section
      id="profile"
      className="profile-overview section"
    >
      <Container>
        <Reveal animation="up">
          <div className="profile-section-heading">
            <div>
              <span className="section-eyebrow">
                Profile Overview
              </span>

              <h2 className="section-title">
                Your profile.
              </h2>
            </div>

            <p className="section-description">
              A foundation for your identity inside
              Uniqe. Real account data will be connected
              when the user and database layers become
              active.
            </p>
          </div>
        </Reveal>

        <div className="profile-overview-grid">
          <Reveal animation="up" delay={100}>
            <Card className="profile-card">
              <div className="profile-avatar">
                U
              </div>

              <div className="profile-card-content">
                <span className="profile-card-eyebrow">
                  Uniqe Member
                </span>

                <h3>
                  Your Name
                </h3>

                <p>
                  your@email.com
                </p>
              </div>

              <div className="profile-card-status">
                <span className="profile-status-dot" />
                Profile foundation ready
              </div>
            </Card>
          </Reveal>

          <div className="profile-stats">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.id}
                animation="up"
                delay={140 + index * 70}
              >
                <Card className="profile-stat">
                  <span className="profile-stat-label">
                    {stat.label}
                  </span>

                  <strong className="profile-stat-value">
                    {stat.value}
                  </strong>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}