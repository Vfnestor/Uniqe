"use client";

import StateShell from "@/components/states/StateShell";

import StateActions from "@/components/states/StateActions";

export default function OfflinePage() {
  return (
    <StateShell
      icon="⌁"
      eyebrow="Offline"
      title="You're currently offline"
      description="Check your internet connection and try again when you're back online."
      actions={
        <StateActions
          primaryLabel="Try again"
          primaryAction={() => {
            window.location.reload();
          }}
          secondaryLabel="Go home"
          secondaryAction={() => {
            window.location.href = "/";
          }}
        />
      }
    />
  );
}