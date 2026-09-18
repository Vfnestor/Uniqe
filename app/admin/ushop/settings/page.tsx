"use client";

import { useState } from "react";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function UShopSettingsPage() {
  const { language } =
    useLanguage();

  const fa = language === "fa";

  const [saved, setSaved] =
    useState(false);

  const [storeName, setStoreName] =
    useState("UShop");

  const [currency, setCurrency] =
    useState("USD");

  const [enabled, setEnabled] =
    useState(true);

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USHOP / SETTINGS"
        title={
          fa
            ? "تنظیمات UShop"
            : "UShop Settings"
        }
        description={
          fa
            ? "تنظیمات اصلی فروشگاه و سیستم تجارت UShop."
            : "Configure the core UShop store settings."
        }
      />

      <AdminPanel
        title={
          fa
            ? "تنظیمات فروشگاه"
            : "Store Settings"
        }
      >
        <div className="admin-form-fields">
          <label className="admin-form-field">
            <span>
              {fa
                ? "نام فروشگاه"
                : "Store Name"}
            </span>

            <input
              value={storeName}
              onChange={(event) => {
                setStoreName(
                  event.target.value,
                );
                setSaved(false);
              }}
            />
          </label>

          <label className="admin-form-field">
            <span>
              {fa
                ? "واحد پول پیش‌فرض"
                : "Default Currency"}
            </span>

            <select
              value={currency}
              onChange={(event) => {
                setCurrency(
                  event.target.value,
                );
                setSaved(false);
              }}
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

          <label className="admin-toggle-field">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => {
                setEnabled(
                  event.target.checked,
                );
                setSaved(false);
              }}
            />

            <span>
              <strong>
                {fa
                  ? "فروشگاه فعال باشد"
                  : "Store Enabled"}
              </strong>

              <small>
                {fa
                  ? "امکان نمایش و فروش محصولات فعال خواهد بود."
                  : "Allow the store and products to be publicly available."}
              </small>
            </span>
          </label>
        </div>
      </AdminPanel>

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-button admin-button-primary"
          onClick={() =>
            setSaved(true)
          }
        >
          {saved
            ? fa
              ? "ذخیره شد ✓"
              : "Saved ✓"
            : fa
              ? "ذخیره تنظیمات"
              : "Save Settings"}
        </button>
      </div>
    </div>
  );
}