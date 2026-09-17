"use client";

import {
  useEffect,
} from "react";

import StateShell from "@/components/states/StateShell";

import StateActions from "@/components/states/StateActions";

type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <StateShell
          icon="!"
          eyebrow="Critical Error"
          title="Uniqe needs a restart"
          description="A critical application error occurred. Please try again."
          actions={
            <StateActions
              primaryLabel="Restart"
              primaryAction={reset}
            />
          }
        />
      </body>
    </html>
  );
}