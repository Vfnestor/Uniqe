import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

import MyUAccountCard from "./MyUAccountCard";

import type {
  AccountResponse,
} from "@/lib/api/account";

import type {
  MyUQuickAction,
  MyUService,
} from "./dashboard";

type MyUOverviewProps = {
  services: MyUService[];
  actions: MyUQuickAction[];
  account: AccountResponse | null;
  isAccountLoading: boolean;
  accountError: string | null;
  onRetryAccount: () => void;
};

function Status({
  status,
  label,
}: {
  status: MyUService["status"];
  label: string;
}) {
  return (
    <span
      className={`my-u-status my-u-status-${status}`}
    >
      <span className="my-u-status-dot" />
      {label}
    </span>
  );
}

export default function MyUOverview({
  services,
  actions,
  account,
  isAccountLoading,
  accountError,
  onRetryAccount,
}: MyUOverviewProps) {
  return (
    <section
      id="overview"
      className="my-u-overview section"
    >
      <Container>
        <Reveal animation="up">
          <div className="my-u-section-heading">
            <div>
              <span className="section-eyebrow">
                Personal Overview
              </span>

              <h2 className="section-title">
                Your Uniqe
                <br />
                space.
              </h2>
            </div>

            <p className="section-description">
              Your account information and shortcuts
              to the different layers of the Uniqe
              ecosystem, together in one place.
            </p>
          </div>
        </Reveal>

        <div className="my-u-overview-grid">
          <Reveal animation="up" delay={100}>
            <MyUAccountCard
              account={account}
              isLoading={isAccountLoading}
              error={accountError}
              onRetry={onRetryAccount}
            />
          </Reveal>

          <div className="my-u-services">
            {services.map((service, index) => (
              <Reveal
                key={service.id}
                animation="up"
                delay={140 + index * 70}
              >
                <Card
                  hover
                  className="my-u-service-card"
                >
                  <a
                    href={service.href}
                    className="my-u-service-link"
                  >
                    <div className="my-u-service-top">
                      <span className="my-u-service-icon">
                        {service.icon}
                      </span>

                      <Status
                        status={service.status}
                        label={service.statusLabel}
                      />
                    </div>

                    <div className="my-u-service-content">
                      <h3>{service.name}</h3>

                      <p>{service.description}</p>
                    </div>

                    <div className="my-u-service-bottom">
                      <span>Explore</span>

                      <span className="my-u-service-arrow">
                        ↗
                      </span>
                    </div>
                  </a>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal animation="up" delay={180}>
          <div className="my-u-actions-heading">
            <span className="section-eyebrow">
              Quick Actions
            </span>

            <h3>Go anywhere in Uniqe.</h3>
          </div>
        </Reveal>

        <div className="my-u-actions-grid">
          {actions.map((action, index) => (
            <Reveal
              key={action.id}
              animation="up"
              delay={220 + index * 70}
            >
              <a
                href={action.href}
                className="my-u-action"
              >
                <span className="my-u-action-icon">
                  {action.icon}
                </span>

                <span className="my-u-action-content">
                  <strong>{action.title}</strong>

                  <span>{action.description}</span>
                </span>

                <span className="my-u-action-arrow">
                  ↗
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}