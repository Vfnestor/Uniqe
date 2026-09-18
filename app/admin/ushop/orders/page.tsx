"use client";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function OrdersPage() {
  const { language } =
    useLanguage();

  const fa = language === "fa";

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USHOP / ORDERS"
        title={
          fa
            ? "سفارش‌ها"
            : "Orders"
        }
        description={
          fa
            ? "سفارش‌های مشتریان را مشاهده و مدیریت کنید."
            : "View and manage customer orders."
        }
      />

      <AdminPanel>
        <div className="admin-list-toolbar">
          <input
            className="admin-list-filter"
            placeholder={
              fa
                ? "جستجوی سفارش..."
                : "Search orders..."
            }
          />

          <select
            className="admin-list-filter"
            defaultValue="all"
          >
            <option value="all">
              {fa ? "همه" : "All"}
            </option>

            <option value="pending">
              {fa
                ? "در انتظار"
                : "Pending"}
            </option>

            <option value="paid">
              {fa ? "پرداخت‌شده" : "Paid"}
            </option>

            <option value="completed">
              {fa
                ? "تکمیل‌شده"
                : "Completed"}
            </option>

            <option value="cancelled">
              {fa
                ? "لغوشده"
                : "Cancelled"}
            </option>
          </select>
        </div>

        <AdminEmptyState
          icon="🛒"
          title={
            fa
              ? "هنوز سفارشی ثبت نشده"
              : "No orders yet"
          }
          description={
            fa
              ? "با ثبت اولین سفارش، اطلاعات آن در اینجا نمایش داده می‌شود."
              : "Orders will appear here when the first purchase is completed."
          }
        />
      </AdminPanel>
    </div>
  );
}