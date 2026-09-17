import Link from "next/link";

import StateShell from "@/components/states/StateShell";

export default function NotFound() {
  return (
    <StateShell
      icon="404"
      eyebrow="Not Found"
      title="This page doesn't exist"
      description="The page you are looking for may have moved, changed, or never existed."
      actions={
        <div className="state-actions">
          <Link
            href="/"
            className="button button-primary"
          >
            Go home
          </Link>
        </div>
      }
    />
  );
}
