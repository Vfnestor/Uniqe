"use client";

import { useState } from "react";
import Link from "next/link";

import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";
import AdminSearch from "@/components/admin/AdminSearch";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const products = [
  {
    id: "1",
    name: "Uniqe Sample Product",
    sku: "UNQ-001",
    price: "$0",
    inventory: 0,
    status: "Draft",
    category: "Digital",
  },
];

export default function ProductsPage() {
  const { language } = useLanguage();

  const fa = language === "fa";

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("all");

  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          ) ||
        product.sku
          .toLowerCase()
          .includes(
            search.toLowerCase(),
          );

      const matchesStatus =
        status === "all" ||
        product.status.toLowerCase() ===
          status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USHOP / PRODUCTS"
        title={
          fa
            ? "محصولات"
            : "Products"
        }
        description={
          fa
            ? "محصولات فروشگاه را ایجاد، ویرایش و مدیریت کنید."
            : "Create, edit and manage your UShop products."
        }
        actions={
          <Link
            href="/admin/ushop/products/new"
            className="admin-button admin-button-primary"
          >
            ＋{" "}
            {fa
              ? "افزودن محصول"
              : "Add Product"}
          </Link>
        }
      />

      <AdminPanel>
        <div className="admin-list-toolbar">
          <AdminSearch
            value={search}
            onChange={setSearch}
            placeholder={
              fa
                ? "جستجوی محصول یا SKU..."
                : "Search product or SKU..."
            }
          />

          <select
            className="admin-list-filter"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value,
              )
            }
            aria-label={
              fa
                ? "فیلتر وضعیت"
                : "Status filter"
            }
          >
            <option value="all">
              {fa ? "همه" : "All"}
            </option>

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
        </div>

        {filteredProducts.length >
        0 ? (
          <div className="admin-data-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>
                    {fa
                      ? "محصول"
                      : "Product"}
                  </th>

                  <th>
                    SKU
                  </th>

                  <th>
                    {fa
                      ? "دسته‌بندی"
                      : "Category"}
                  </th>

                  <th>
                    {fa
                      ? "قیمت"
                      : "Price"}
                  </th>

                  <th>
                    {fa
                      ? "موجودی"
                      : "Inventory"}
                  </th>

                  <th>
                    {fa
                      ? "وضعیت"
                      : "Status"}
                  </th>

                  <th>
                    {fa
                      ? "عملیات"
                      : "Actions"}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map(
                  (product) => (
                    <tr key={product.id}>
                      <td>
                        <strong>
                          {product.name}
                        </strong>
                      </td>

                      <td>
                        {product.sku}
                      </td>

                      <td>
                        {product.category}
                      </td>

                      <td>
                        {product.price}
                      </td>

                      <td>
                        {product.inventory}
                      </td>

                      <td>
                        <span className="admin-status-badge">
                          {product.status}
                        </span>
                      </td>

                      <td>
                        <Link
                          href={`/admin/ushop/products/${product.id}`}
                          className="admin-table-action"
                        >
                          {fa
                            ? "ویرایش"
                            : "Edit"}
                        </Link>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <AdminEmptyState
            icon="📦"
            title={
              fa
                ? "محصولی پیدا نشد"
                : "No products found"
            }
            description={
              fa
                ? "برای فیلتر یا جستجوی فعلی محصولی وجود ندارد."
                : "No products match the current search or filter."
            }
          />
        )}
      </AdminPanel>
    </div>
  );
}