"use client";

import StateShell from "@/components/states/StateShell";

export default function MaintenancePage() {
  return (
    <StateShell
      icon="◫"
      eyebrow="Maintenance"
      title="Uniqe is being updated"
      description="We're working on the platform. Please check back soon."
      actions={
        <div className="state-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            Try again
          </button>

          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Go home
          </button>
        </div>
      }
    />
  );
}