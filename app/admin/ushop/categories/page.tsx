"use client";

import { useState } from "react";

import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function CategoriesPage() {
  const { language } = useLanguage();

  const fa = language === "fa";

  const [name, setName] =
    useState("");

  const [created, setCreated] =
    useState(false);

  function createCategory() {
    if (!name.trim()) {
      return;
    }

    setCreated(true);
  }

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USHOP / CATEGORIES"
        title={
          fa
            ? "دسته‌بندی‌ها"
            : "Categories"
        }
        description={
          fa
            ? "دسته‌بندی محصولات UShop را مدیریت کنید."
            : "Organize UShop products into categories."
        }
      />

      <AdminPanel
        title={
          fa
            ? "دسته‌بندی جدید"
            : "New Category"
        }
        description={
          fa
            ? "یک دسته‌بندی برای سازمان‌دهی محصولات ایجاد کنید."
            : "Create a category to organize your products."
        }
      >
        <div className="admin-inline-form">
          <input
            value={name}
            onChange={(event) => {
              setName(
                event.target.value,
              );
              setCreated(false);
            }}
            placeholder={
              fa
                ? "نام دسته‌بندی"
                : "Category name"
            }
          />

          <button
            type="button"
            className="admin-button admin-button-primary"
            onClick={createCategory}
          >
            {fa
              ? "افزودن"
              : "Add"}
          </button>
        </div>

        {created && (
          <div className="admin-form-success">
            {fa
              ? `دسته‌بندی «${name}» آماده ذخیره است.`
              : `Category "${name}" is ready to be saved.`}
          </div>
        )}
      </AdminPanel>

      <AdminPanel
        title={
          fa
            ? "دسته‌بندی‌های موجود"
            : "Existing Categories"
        }
      >
        <AdminEmptyState
          icon="🏷️"
          title={
            fa
              ? "هنوز دسته‌بندی‌ای وجود ندارد"
              : "No categories yet"
          }
          description={
            fa
              ? "دسته‌بندی‌های ایجادشده در اینجا نمایش داده می‌شوند."
              : "Created categories will appear here."
          }
        />
      </AdminPanel>
    </div>
  );
}