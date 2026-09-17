import type {
  ReactNode,
} from "react";

import StateIcon from "./StateIcon";

type StateShellProps = {
  icon: string;

  eyebrow?: string;

  title: string;

  description?: string;

  actions?: ReactNode;
};

export default function StateShell({
  icon,
  eyebrow,
  title,
  description,
  actions,
}: StateShellProps) {
  return (
    <main className="state-page">
      <section className="state-section">
        <div className="state-container">
          <div className="state-card">
            <StateIcon icon={icon} />

            {eyebrow ? (
              <span className="state-eyebrow">
                {eyebrow}
              </span>
            ) : null}

            <h1 className="state-title">
              {title}
            </h1>

            {description ? (
              <p className="state-description">
                {description}
              </p>
            ) : null}

            {actions ? (
              <div className="state-actions-wrapper">
                {actions}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}