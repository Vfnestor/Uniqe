"use client";

import { useState } from "react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";

const initialCategories = [
  {
    name: "Technology",
    description: "Technology, programming and AI",
    classes: 1,
    color: "blue",
  },
  {
    name: "Digital Skills",
    description: "Modern digital and productivity skills",
    classes: 1,
    color: "purple",
  },
  {
    name: "Personal Development",
    description: "Learning and personal growth",
    classes: 0,
    color: "green",
  },
];

export default function USchoolCategoriesPage() {
  const [categories, setCategories] =
    useState(initialCategories);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  function addCategory(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    setCategories((current) => [
      ...current,
      {
        name: name.trim(),
        description:
          description.trim() ||
          "USchool learning category",
        classes: 0,
        color: "gray",
      },
    ]);

    setName("");
    setDescription("");
  }

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USCHOOL / CATEGORIES"
        title="Categories"
        description="Organize classes into clear learning paths."
      />

      <div className="admin-uschool-category-layout">
        <AdminPanel
          title="Create category"
          description="Add a new learning category."
        >
          <form
            className="admin-inline-form"
            onSubmit={addCategory}
          >
            <label className="admin-form-field">
              <span>Name</span>

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Example: Programming"
              />
            </label>

            <label className="admin-form-field">
              <span>Description</span>

              <input
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value,
                  )
                }
                placeholder="Short category description"
              />
            </label>

            <button
              type="submit"
              className="admin-button admin-button-primary"
            >
              Add Category
            </button>
          </form>
        </AdminPanel>

        <section className="admin-uschool-category-grid">
          {categories.map((category) => (
            <article
              key={category.name}
              className="admin-uschool-category-card"
            >
              <div
                className={`admin-uschool-category-orb ${category.color}`}
              />

              <div>
                <span className="admin-uschool-category-count">
                  {category.classes} classes
                </span>

                <h2>{category.name}</h2>

                <p>{category.description}</p>
              </div>

              <button
                type="button"
                className="admin-table-action"
              >
                Manage →
              </button>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}