"use client";

import type { ReactNode } from "react";

type AdminPanelProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export default function AdminPanel({
  children,
  title,
  description,
  actions,
  className = "",
}: AdminPanelProps) {
  return (
    <section
      className={`admin-panel ${className}`.trim()}
    >
      {(title || description || actions) && (
        <div className="admin-panel-header">
          <div>
            {title && <h2>{title}</h2>}

            {description && (
              <p>{description}</p>
            )}
          </div>

          {actions && (
            <div className="admin-panel-actions">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="admin-panel-body">
        {children}
      </div>
    </section>
  );
}