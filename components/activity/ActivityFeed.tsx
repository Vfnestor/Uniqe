import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import type { ActivityItem } from "./activity";

type ActivityFeedProps = {
  activities: ActivityItem[];
};

export default function ActivityFeed({
  activities,
}: ActivityFeedProps) {
  return (
    <section
      id="activity"
      className="activity-feed section"
    >
      <Container>
        <Reveal animation="up">
          <div className="activity-section-heading">
            <div>
              <span className="section-eyebrow">
                Activity Timeline
              </span>

              <h2 className="section-title">
                Everything
                <br />
                you do.
              </h2>
            </div>

            <p className="section-description">
              Your future activity history will be
              collected from the different parts of the
              Uniqe ecosystem and displayed here.
            </p>
          </div>
        </Reveal>

        <div className="activity-feed-layout">
          <div className="activity-timeline">
            {activities.map((activity, index) => (
              <Reveal
                key={activity.id}
                animation="up"
                delay={100 + index * 70}
              >
                <div className="activity-item">
                  <div className="activity-item-marker">
                    <span>
                      {activity.icon}
                    </span>
                  </div>

                  <div className="activity-item-line" />

                  <Card
                    hover
                    className="activity-item-card"
                  >
                    <a
                      href={activity.href}
                      className="activity-item-link"
                    >
                      <div className="activity-item-top">
                        <div className="activity-item-meta">
                          <span className="activity-item-type">
                            {activity.typeLabel}
                          </span>

                          <span className="activity-item-source">
                            {activity.source}
                          </span>
                        </div>

                        <span className="activity-item-time">
                          {activity.time}
                        </span>
                      </div>

                      <div className="activity-item-content">
                        <h3>
                          {activity.title}
                        </h3>

                        <p>
                          {activity.description}
                        </p>
                      </div>

                      <div className="activity-item-bottom">
                        <span>
                          View source
                        </span>

                        <span className="activity-item-arrow">
                          ↗
                        </span>
                      </div>
                    </a>
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="activity-summary">
            <Reveal animation="scale" delay={180}>
              <Card className="activity-summary-card">
                <span className="section-eyebrow">
                  Activity Overview
                </span>

                <strong className="activity-summary-number">
                  {activities.length
                    .toString()
                    .padStart(2, "0")}
                </strong>

                <span className="activity-summary-label">
                  Recorded activities
                </span>

                <p>
                  This is currently demonstration data.
                  Real activity records will be connected
                  to the user account and central data
                  layer later.
                </p>
              </Card>
            </Reveal>
          </aside>
        </div>
      </Container>
    </section>
  );
}