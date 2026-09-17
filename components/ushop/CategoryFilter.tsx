"use client";

import type { ProductCategory } from "./products";

export type ProductCategoryFilter =
  | "all"
  | ProductCategory;

type CategoryFilterProps = {
  value: ProductCategoryFilter;
  onChange: (
    value: ProductCategoryFilter,
  ) => void;

  counts: Record<
    ProductCategoryFilter,
    number
  >;
};

const categories: {
  value: ProductCategoryFilter;
  label: string;
  labelFa: string;
}[] = [
  {
    value: "all",
    label: "All",
    labelFa: "همه",
  },
  {
    value: "digital",
    label: "Digital",
    labelFa: "دیجیتال",
  },
  {
    value: "physical",
    label: "Physical",
    labelFa: "فیزیکی",
  },
  {
    value: "service",
    label: "Services",
    labelFa: "خدمات",
  },
  {
    value: "experimental",
    label: "Experimental",
    labelFa: "آزمایشی",
  },
];

export default function CategoryFilter({
  value,
  onChange,
  counts,
}: CategoryFilterProps) {
  return (
    <div
      className="ushop-filter-wrapper"
      aria-label="Product categories"
    >
      <div className="ushop-filter-list">
        {categories.map((category) => {
          const active =
            value === category.value;

          return (
            <button
              key={category.value}
              type="button"
              className={`ushop-filter-button ${
                active
                  ? "is-active"
                  : ""
              }`}
              aria-pressed={active}
              onClick={() =>
                onChange(category.value)
              }
            >
              <span className="ushop-filter-label">
                <span className="ushop-filter-en">
                  {category.label}
                </span>

                <span className="ushop-filter-fa">
                  {category.labelFa}
                </span>
              </span>

              <span className="ushop-filter-count">
                {counts[category.value]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}