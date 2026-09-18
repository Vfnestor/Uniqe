"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AdminPanel from "@/components/admin/AdminPanel";
import { useLanguage } from "@/components/i18n/LanguageProvider";

type ProductFormProps = {
  mode?: "create" | "edit";
};

export default function AdminProductForm({
  mode = "create",
}: ProductFormProps) {
  const router = useRouter();
  const { language } = useLanguage();

  const fa = language === "fa";
  const editing = mode === "edit";

  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: editing ? "Uniqe Sample Product" : "",
    slug: editing ? "uniqe-sample-product" : "",
    shortDescription: "",
    description: "",
    price: "",
    salePrice: "",
    currency: "USD",
    sku: "",
    inventory: "",
    category: "",
    tags: "",
    type: "physical",
    status: editing ? "active" : "draft",
    featuredImage: "",
  });

  function update(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaved(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="admin-product-form"
    >
      <div className="admin-form-grid">
        <AdminPanel
          title={
            fa
              ? "اطلاعات محصول"
              : "Product Information"
          }
          description={
            fa
              ? "اطلاعات اصلی محصول را وارد کنید."
              : "Enter the main information for this product."
          }
        >
          <div className="admin-form-fields">
            <label className="admin-form-field">
              <span>
                {fa ? "نام محصول" : "Product Name"}
              </span>

              <input
                required
                value={form.name}
                onChange={(event) =>
                  update(
                    "name",
                    event.target.value,
                  )
                }
                placeholder={
                  fa
                    ? "مثلاً محصول جدید"
                    : "e.g. New Product"
                }
              />
            </label>

            <label className="admin-form-field">
              <span>Slug</span>

              <input
                value={form.slug}
                onChange={(event) =>
                  update(
                    "slug",
                    event.target.value,
                  )
                }
                placeholder="product-slug"
              />
            </label>

            <label className="admin-form-field admin-form-field-full">
              <span>
                {fa
                  ? "توضیح کوتاه"
                  : "Short Description"}
              </span>

              <input
                value={form.shortDescription}
                onChange={(event) =>
                  update(
                    "shortDescription",
                    event.target.value,
                  )
                }
                placeholder={
                  fa
                    ? "توضیح کوتاه محصول..."
                    : "Short product description..."
                }
              />
            </label>

            <label className="admin-form-field admin-form-field-full">
              <span>
                {fa
                  ? "توضیحات کامل"
                  : "Description"}
              </span>

              <textarea
                rows={7}
                value={form.description}
                onChange={(event) =>
                  update(
                    "description",
                    event.target.value,
                  )
                }
                placeholder={
                  fa
                    ? "توضیحات کامل محصول..."
                    : "Full product description..."
                }
              />
            </label>
          </div>
        </AdminPanel>

        <AdminPanel
          title={
            fa
              ? "قیمت و موجودی"
              : "Pricing & Inventory"
          }
          description={
            fa
              ? "اطلاعات فروش و موجودی محصول."
              : "Configure pricing and inventory."
          }
        >
          <div className="admin-form-fields">
            <label className="admin-form-field">
              <span>
                {fa ? "قیمت" : "Price"}
              </span>

              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(event) =>
                  update(
                    "price",
                    event.target.value,
                  )
                }
                placeholder="0"
              />
            </label>

            <label className="admin-form-field">
              <span>
                {fa
                  ? "قیمت تخفیف"
                  : "Sale Price"}
              </span>

              <input
                type="number"
                min="0"
                value={form.salePrice}
                onChange={(event) =>
                  update(
                    "salePrice",
                    event.target.value,
                  )
                }
                placeholder="0"
              />
            </label>

            <label className="admin-form-field">
              <span>
                {fa ? "واحد پول" : "Currency"}
              </span>

              <select
                value={form.currency}
                onChange={(event) =>
                  update(
                    "currency",
                    event.target.value,
                  )
                }
              >
                <option value="USD">
                  USD
                </option>

                <option value="EUR">
                  EUR
                </option>

                <option value="IRR">
                  IRR
                </option>
              </select>
            </label>

            <label className="admin-form-field">
              <span>
                {fa ? "موجودی" : "Inventory"}
              </span>

              <input
                type="number"
                min="0"
                value={form.inventory}
                onChange={(event) =>
                  update(
                    "inventory",
                    event.target.value,
                  )
                }
                placeholder="0"
              />
            </label>

            <label className="admin-form-field admin-form-field-full">
              <span>SKU</span>

              <input
                value={form.sku}
                onChange={(event) =>
                  update(
                    "sku",
                    event.target.value,
                  )
                }
                placeholder="SKU-001"
              />
            </label>
          </div>
        </AdminPanel>
      </div>

      <div className="admin-form-grid">
        <AdminPanel
          title={
            fa
              ? "سازمان‌دهی"
              : "Organization"
          }
          description={
            fa
              ? "دسته‌بندی و نوع محصول را مشخص کنید."
              : "Configure category and product type."
          }
        >
          <div className="admin-form-fields">
            <label className="admin-form-field">
              <span>
                {fa
                  ? "دسته‌بندی"
                  : "Category"}
              </span>

              <select
                value={form.category}
                onChange={(event) =>
                  update(
                    "category",
                    event.target.value,
                  )
                }
              >
                <option value="">
                  {fa
                    ? "انتخاب دسته‌بندی"
                    : "Select category"}
                </option>

                <option value="digital">
                  {fa
                    ? "دیجیتال"
                    : "Digital"}
                </option>

                <option value="physical">
                  {fa
                    ? "فیزیکی"
                    : "Physical"}
                </option>

                <option value="service">
                  {fa
                    ? "خدمات"
                    : "Services"}
                </option>
              </select>
            </label>

            <label className="admin-form-field">
              <span>
                {fa
                  ? "نوع محصول"
                  : "Product Type"}
              </span>

              <select
                value={form.type}
                onChange={(event) =>
                  update(
                    "type",
                    event.target.value,
                  )
                }
              >
                <option value="physical">
                  {fa
                    ? "محصول فیزیکی"
                    : "Physical Product"}
                </option>

                <option value="digital">
                  {fa
                    ? "محصول دیجیتال"
                    : "Digital Product"}
                </option>

                <option value="service">
                  {fa
                    ? "خدمت"
                    : "Service"}
                </option>
              </select>
            </label>

            <label className="admin-form-field admin-form-field-full">
              <span>
                {fa
                  ? "برچسب‌ها"
                  : "Tags"}
              </span>

              <input
                value={form.tags}
                onChange={(event) =>
                  update(
                    "tags",
                    event.target.value,
                  )
                }
                placeholder={
                  fa
                    ? "مثلاً تکنولوژی، ابزار، دیجیتال"
                    : "technology, tools, digital"
                }
              />
            </label>
          </div>
        </AdminPanel>

        <AdminPanel
          title={
            fa
              ? "انتشار"
              : "Publishing"
          }
          description={
            fa
              ? "وضعیت نمایش محصول را مشخص کنید."
              : "Configure the publishing state."
          }
        >
          <div className="admin-form-fields">
            <label className="admin-form-field">
              <span>
                {fa
                  ? "وضعیت"
                  : "Status"}
              </span>

              <select
                value={form.status}
                onChange={(event) =>
                  update(
                    "status",
                    event.target.value,
                  )
                }
              >
                <option value="draft">
                  {fa
                    ? "پیش‌نویس"
                    : "Draft"}
                </option>

                <option value="active">
                  {fa
                    ? "فعال"
                    : "Active"}
                </option>

                <option value="inactive">
                  {fa
                    ? "غیرفعال"
                    : "Inactive"}
                </option>
              </select>
            </label>

            <div className="admin-form-info-box">
              <strong>
                {fa
                  ? "وضعیت فعلی"
                  : "Current State"}
              </strong>

              <span>
                {form.status === "active"
                  ? fa
                    ? "محصول فعال است."
                    : "Product is active."
                  : form.status ===
                      "inactive"
                    ? fa
                      ? "محصول غیرفعال است."
                      : "Product is inactive."
                    : fa
                      ? "محصول به صورت پیش‌نویس ذخیره می‌شود."
                      : "Product will be saved as a draft."}
              </span>
            </div>
          </div>
        </AdminPanel>
      </div>

      <AdminPanel
        title={
          fa
            ? "رسانه محصول"
            : "Product Media"
        }
        description={
          fa
            ? "تصویر اصلی محصول را مشخص کنید. سیستم Media در فاز بعدی به آپلود واقعی متصل می‌شود."
            : "Set the main product image. The Media system will provide real uploads in a later phase."
        }
      >
        <div className="admin-form-fields">
          <label className="admin-form-field">
            <span>
              {fa
                ? "آدرس تصویر اصلی"
                : "Featured Image URL"}
            </span>

            <input
              value={form.featuredImage}
              onChange={(event) =>
                update(
                  "featuredImage",
                  event.target.value,
                )
              }
              placeholder="https://..."
            />
          </label>
        </div>
      </AdminPanel>

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-button admin-button-secondary"
          onClick={() => router.back()}
        >
          {fa ? "لغو" : "Cancel"}
        </button>

        <button
          type="submit"
          className="admin-button admin-button-primary"
        >
          {saved
            ? fa
              ? "ذخیره شد ✓"
              : "Saved ✓"
            : editing
              ? fa
                ? "ذخیره تغییرات"
                : "Save Changes"
              : fa
                ? "ذخیره محصول"
                : "Save Product"}
        </button>
      </div>
    </form>
  );
}