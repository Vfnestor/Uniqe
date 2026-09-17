"use client";

import {
  useEffect,
} from "react";

import StateShell from "@/components/states/StateShell";

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
        <div className="state-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={reset}
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
