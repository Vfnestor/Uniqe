"use client";

import {
  useEffect,
} from "react";

import StateShell from "@/components/states/StateShell";

import StateActions from "@/components/states/StateActions";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StateShell
      icon="!"
      eyebrow="Something went wrong"
      title="We couldn't load this experience"
      description="An unexpected error occurred. You can try again or return to the Uniqe home page."
      actions={
        <StateActions
          primaryLabel="Try again"
          primaryAction={reset}
          secondaryLabel="Go home"
          secondaryAction={() => {
            window.location.href = "/";
          }}
        />
      }
    />
  );
}