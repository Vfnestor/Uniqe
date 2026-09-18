"use client";

type AdminErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export default function AdminErrorState({
  title = "Something went wrong",
  description = "We could not load this section.",
  onRetry,
}: AdminErrorStateProps) {
  return (
    <div className="admin-error-state">
      <div className="admin-error-state-icon">
        !
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="admin-button admin-button-primary"
        >
          Try again
        </button>
      )}
    </div>
  );
}