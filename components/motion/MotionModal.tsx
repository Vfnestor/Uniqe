"use client";

import type { ReactNode } from "react";

type MotionModalProps = {
  children: ReactNode;
  open: boolean;
  className?: string;
  onClose?: () => void;
};

export default function MotionModal({
  children,
  open,
  className = "",
  onClose,
}: MotionModalProps) {
  return (
    <div
      className={`motion-modal-root ${
        open ? "motion-modal-open" : ""
      }`.trim()}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="motion-modal-overlay"
        aria-label="Close modal"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />

      <div className="motion-modal-positioner">
        <section
          className={`motion-modal ${className}`.trim()}
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
        >
          {children}
        </section>
      </div>
    </div>
  );
}