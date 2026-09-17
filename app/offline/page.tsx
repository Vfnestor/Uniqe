"use client";

import StateShell from "@/components/states/StateShell";

export default function OfflinePage() {
  return (
    <StateShell
      icon="⌁"
      eyebrow="Offline"
      title="You're currently offline"
      description="Check your internet connection and try again when you're back online."
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
