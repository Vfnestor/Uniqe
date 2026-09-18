"use client";

import type { ReactNode } from "react";

type MotionDrawerProps = {
  children: ReactNode;
  open: boolean;
  side?: "left" | "right";
  className?: string;
  overlay?: boolean;
  onClose?: () => void;
};

export default function MotionDrawer({
  children,
  open,
  side = "right",
  className = "",
  overlay = true,
  onClose,
}: MotionDrawerProps) {
  return (
    <div
      className={`motion-drawer-root ${
        open ? "motion-drawer-open" : ""
      } ${className}`.trim()}
      aria-hidden={!open}
    >
      {overlay && (
        <button
          type="button"
          className="motion-drawer-overlay"
          aria-label="Close drawer"
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        />
      )}

      <aside
        className={`motion-drawer motion-drawer-${side}`}
        aria-hidden={!open}
      >
        {children}
      </aside>
    </div>
  );
}