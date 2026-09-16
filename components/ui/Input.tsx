"use client";

import type {
  InputHTMLAttributes,
} from "react";

type InputProps =
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
  };

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId =
    id ??
    (label
      ? label
          .toLowerCase()
          .replace(/\s+/g, "-")
      : undefined);

  const classes = [
    "input",
    error ? "input-error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-group">
      {label && inputId && (
        <label
          htmlFor={inputId}
          className="input-label"
        >
          {label}
        </label>
      )}

      <input
        {...props}
        id={inputId}
        className={classes}
      />

      {error && (
        <span className="input-message input-message-error">
          {error}
        </span>
      )}
    </div>
  );
}