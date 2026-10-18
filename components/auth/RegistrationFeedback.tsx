"use client";

type RegistrationFeedbackProps = {
  message: string;
  type: "error" | "success" | "info";
};

export default function RegistrationFeedback({
  message,
  type,
}: RegistrationFeedbackProps) {
  if (!message.trim()) {
    return null;
  }

  const role =
    type === "error"
      ? "alert"
      : "status";

  return (
    <div
      className={`auth-form-feedback auth-form-feedback-${type}`}
      role={role}
      aria-live={
        type === "error"
          ? "assertive"
          : "polite"
      }
    >
      {message}
    </div>
  );
}