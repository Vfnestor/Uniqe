"use client";

import { useState } from "react";

import Reveal from "@/components/ui/Reveal";

import { activityFilters } from "./activity";

export default function ActivityFilters() {
  const [activeFilter, setActiveFilter] =
    useState("all");

  return (
    <Reveal animation="up">
      <div className="activity-filters">
        <div className="activity-filters-label">
          Filter activity
        </div>

        <div className="activity-filter-list">
          {activityFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`activity-filter ${
                activeFilter === filter.id
                  ? "is-active"
                  : ""
              }`}
              onClick={() =>
                setActiveFilter(filter.id)
              }
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </Reveal>
  );
}