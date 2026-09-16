"use client";

import {
  useState,
  type ReactNode,
} from "react";

type EcosystemItem = {
  name: string;
  title: string;
  description: string;
  href: string;
  number: string;
  icon: ReactNode;
};

type EcosystemInteractiveProps = {
  items: EcosystemItem[];
};

export default function EcosystemInteractive({
  items,
}: EcosystemInteractiveProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeItem =
    items[activeIndex];

  return (
    <div className="home-ecosystem-interactive">
      <div
        className="home-ecosystem-tabs"
        role="tablist"
        aria-label="Uniqe ecosystem"
      >
        {items.map((item, index) => {
          const isActive =
            index === activeIndex;

          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`ecosystem-panel-${index}`}
              className={
                isActive
                  ? "home-ecosystem-tab active"
                  : "home-ecosystem-tab"
              }
              onClick={() =>
                setActiveIndex(index)
              }
              onMouseEnter={() =>
                setActiveIndex(index)
              }
            >
              <span className="home-ecosystem-tab-number">
                {item.number}
              </span>

              <span className="home-ecosystem-tab-icon">
                {item.icon}
              </span>

              <span className="home-ecosystem-tab-name">
                {item.name}
              </span>

              <span className="home-ecosystem-tab-arrow">
                ↗
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`ecosystem-panel-${activeIndex}`}
        className="home-ecosystem-panel"
        role="tabpanel"
      >
        <div className="home-ecosystem-panel-glow" />

        <div className="home-ecosystem-panel-content">
          <div className="home-ecosystem-panel-icon">
            {activeItem.icon}
          </div>

          <div className="home-ecosystem-panel-number">
            {activeItem.number}
          </div>

          <span className="home-ecosystem-panel-label">
            {activeItem.name}
          </span>

          <h3 className="home-ecosystem-panel-title">
            {activeItem.title}
          </h3>

          <p className="home-ecosystem-panel-description">
            {activeItem.description}
          </p>

          <a
            href={activeItem.href}
            className="home-ecosystem-panel-action"
          >
            Explore {activeItem.name}
            <span>↗</span>
          </a>
        </div>

        <div className="home-ecosystem-panel-mark">
          {activeItem.name.charAt(0)}
        </div>
      </div>
    </div>
  );
}