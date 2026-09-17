"use client";

type StateActionsProps = {
  primaryLabel?: string;
  primaryHref?: string;
  primaryReload?: boolean;

  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryReload?: boolean;
};

function handleAction(
  href?: string,
  reload?: boolean
) {
  if (reload) {
    window.location.reload();
    return;
  }

  if (href) {
    window.location.href = href;
  }
}

export default function StateActions({
  primaryLabel,
  primaryHref,
  primaryReload,
  secondaryLabel,
  secondaryHref,
  secondaryReload,
}: StateActionsProps) {
  if (
    !primaryLabel &&
    !secondaryLabel
  ) {
    return null;
  }

  return (
    <div className="state-actions">
      {primaryLabel ? (
        <button
          type="button"
          className="button button-primary"
          onClick={() =>
            handleAction(
              primaryHref,
              primaryReload
            )
          }
        >
          {primaryLabel}
        </button>
      ) : null}

      {secondaryLabel ? (
        <button
          type="button"
          className="button button-secondary"
          onClick={() =>
            handleAction(
              secondaryHref,
              secondaryReload
            )
          }
        >
          {secondaryLabel}
        </button>
      ) : null}
    </div>
  );
}
