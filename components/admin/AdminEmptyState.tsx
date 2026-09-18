"use client";

import type { ReactNode } from "react";

type AdminEmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function AdminEmptyState({
  icon = "◌",
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <div className="admin-empty-state">
      <div className="admin-empty-state-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      {description && (
        <p>{description}</p>
      )}

      {action && (
        <div className="admin-empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
}