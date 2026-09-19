"use client";

import type {
  UWebOpportunityFilter,
} from "@/lib/uweb/opportunity-data";

type FilterItem = {
  id: UWebOpportunityFilter;
  label: string;
};

const filters: FilterItem[] = [
  {
    id: "all",
    label: "همه",
  },
  {
    id: "new_website",
    label: "وب‌سایت جدید",
  },
  {
    id: "redesign",
    label: "بازطراحی",
  },
  {
    id: "feature_development",
    label: "توسعه قابلیت",
  },
  {
    id: "bug_fix",
    label: "رفع خطا",
  },
  {
    id: "maintenance",
    label: "نگهداری",
  },
  {
    id: "optimization",
    label: "بهینه‌سازی",
  },
  {
    id: "custom",
    label: "سفارشی",
  },
];

type Props = {
  value: UWebOpportunityFilter;
  onChange: (
    value: UWebOpportunityFilter,
  ) => void;
};

export default function UWebOpportunityFilters({
  value,
  onChange,
}: Props) {
  return (
    <div className="uweb-opportunity-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={
            value === filter.id
              ? "active"
              : ""
          }
          onClick={() =>
            onChange(filter.id)
          }
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}