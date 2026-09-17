import StateShell from "@/components/states/StateShell";

import StateActions from "@/components/states/StateActions";

export default function NotFound() {
  return (
    <StateShell
      icon="404"
      eyebrow="Not Found"
      title="This page doesn't exist"
      description="The page you are looking for may have moved, changed, or never existed."
      actions={
        <StateActions
          primaryLabel="Go home"
          primaryAction={() => {
            window.location.href = "/";
          }}
        />
      }
    />
  );
}