"use client";

import StateShell from "@/components/states/StateShell";

import StateActions from "@/components/states/StateActions";

export default function MaintenancePage() {
  return (
    <StateShell
      icon="◫"
      eyebrow="Maintenance"
      title="Uniqe is being updated"
      description="We're working on the platform. Please check back soon."
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