import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import type { MyUActivity } from "./dashboard";

type MyUActivityProps = {
  activities: MyUActivity[];
};

export default function MyUActivity({
  activities,
}: MyUActivityProps) {
  return (
    <section className="my-u-activity section">
      <Container>
        <Reveal animation="up">
          <div className="my-u-section-heading my-u-activity-heading">
            <div>
              <span className="section-eyebrow">
                Recent Activity
              </span>

              <h2 className="section-title">
                Your recent
                <br />
                activity.
              </h2>
            </div>

            <p className="section-description">
              This is a preview of the activity layer.
              Later, real user activity will be
              connected through My U and UCore.
            </p>
          </div>
        </Reveal>

        <div className="my-u-activity-list">
          {activities.map((activity, index) => (
            <Reveal
              key={activity.id}
              animation="up"
              delay={100 + index * 80}
            >
              <Card className="my-u-activity-card">
                <div className="my-u-activity-icon">
                  {activity.icon}
                </div>

                <div className="my-u-activity-content">
                  <h3>
                    {activity.title}
                  </h3>

                  <p>
                    {activity.description}
                  </p>
                </div>

                <span className="my-u-activity-time">
                  {activity.time}
                </span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}