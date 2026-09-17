"use client";

type StateActionsProps = {
  primaryLabel?: string;
  primaryAction?: () => void;

  secondaryLabel?: string;
  secondaryAction?: () => void;
};

export default function StateActions({
  primaryLabel,
  primaryAction,
  secondaryLabel,
  secondaryAction,
}: StateActionsProps) {
  if (
    !primaryLabel &&
    !secondaryLabel
  ) {
    return null;
  }

  return (
    <div className="state-actions">
      {primaryLabel && primaryAction ? (
        <button
          type="button"
          className="button button-primary"
          onClick={primaryAction}
        >
          {primaryLabel}
        </button>
      ) : null}

      {secondaryLabel && secondaryAction ? (
        <button
          type="button"
          className="button button-secondary"
          onClick={secondaryAction}
        >
          {secondaryLabel}
        </button>
      ) : null}
    </div>
  );
}