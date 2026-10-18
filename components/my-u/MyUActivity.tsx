import Link from "next/link";

import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import type { MyUActivity as MyUActivityItem } from "./dashboard";

type MyUActivityProps = {
  activities: MyUActivityItem[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
};

export default function MyUActivity({
  activities,
  isLoading = false,
  error = null,
  onRetry,
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
              A timeline of activity recorded by your
              Uniqe account.
            </p>
          </div>
        </Reveal>

        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="my-u-activity-state"
          >
            <span aria-hidden="true">◌</span>
            Loading your recent activity...
          </div>
        )}

        {!isLoading && error && (
          <div
            role="alert"
            className="my-u-activity-state my-u-activity-error"
          >
            <p>{error}</p>

            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="my-u-activity-retry"
              >
                Try again
              </button>
            )}
          </div>
        )}

        {!isLoading && !error && activities.length === 0 && (
          <div className="my-u-activity-state">
            <span
              aria-hidden="true"
              className="my-u-activity-empty-icon"
            >
              ◈
            </span>

            <h3>No activity yet</h3>

            <p>
              Your saved items, notifications and
              account transactions will appear here
              when activity is recorded.
            </p>
          </div>
        )}

        {!isLoading && !error && activities.length > 0 && (
          <div className="my-u-activity-list">
            {activities.map((activity, index) => {
              const content = (
                <Card className="my-u-activity-card">
                  <div className="my-u-activity-icon">
                    {activity.icon}
                  </div>

                  <div className="my-u-activity-content">
                    <h3>{activity.title}</h3>

                    <p>{activity.description}</p>
                  </div>

                  <span className="my-u-activity-time">
                    {activity.time}
                  </span>
                </Card>
              );

              return (
                <Reveal
                  key={activity.id}
                  animation="up"
                  delay={100 + index * 50}
                >
                  {activity.href ? (
                    <Link
                      href={activity.href}
                      className="my-u-activity-link"
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </Reveal>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}