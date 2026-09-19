"use client";

import {
  useState,
} from "react";

import type {
  MyUSettings as MyUSettingsData,
} from "@/lib/my-u/core-data";

type Props = {
  settings: MyUSettingsData;
};

export default function MyUSettings({
  settings,
}: Props) {
  const [
    currentSettings,
    setCurrentSettings,
  ] = useState(settings);

  const [
    saved,
    setSaved,
  ] = useState(false);

  function toggle(
    key:
      | "emailNotifications"
      | "projectNotifications"
      | "marketingNotifications",
  ) {
    setCurrentSettings(
      (previous) => ({
        ...previous,
        [key]:
          !previous[key],
      }),
    );

    setSaved(false);
  }

  function saveSettings() {
    setSaved(true);
  }

  return (
    <section className="my-u-core-panel">
      <div className="my-u-core-panel-header">
        <div>
          <span className="section-eyebrow">
            SETTINGS
          </span>

          <h2>
            تنظیمات حساب
          </h2>
        </div>
      </div>

      <div className="my-u-settings-section">
        <div className="my-u-settings-section-header">
          <h3>
            زبان و ظاهر
          </h3>

          <p>
            تنظیمات پایه پنل My U
          </p>
        </div>

        <div className="my-u-setting-row">
          <div>
            <strong>
              زبان
            </strong>

            <span>
              زبان فعلی پنل
            </span>
          </div>

          <select
            value={
              currentSettings.language
            }
            disabled
          >
            <option value="fa">
              فارسی
            </option>
          </select>
        </div>

        <div className="my-u-setting-row">
          <div>
            <strong>
              حالت نمایش
            </strong>

            <span>
              انتخاب حالت روشن، تاریک یا سیستم
            </span>
          </div>

          <select
            value={
              currentSettings.theme
            }
            onChange={(event) => {
              setCurrentSettings(
                (previous) => ({
                  ...previous,
                  theme:
                    event.target
                      .value as MyUSettingsData["theme"],
                }),
              );

              setSaved(false);
            }}
          >
            <option value="system">
              سیستم
            </option>

            <option value="light">
              روشن
            </option>

            <option value="dark">
              تاریک
            </option>
          </select>
        </div>
      </div>

      <div className="my-u-settings-section">
        <div className="my-u-settings-section-header">
          <h3>
            اعلان‌ها
          </h3>

          <p>
            مشخص کنید چه اعلان‌هایی دریافت کنید.
          </p>
        </div>

        <SettingToggle
          title="اعلان‌های ایمیلی"
          description="دریافت اعلان‌های مهم حساب از طریق ایمیل."
          enabled={
            currentSettings.emailNotifications
          }
          onToggle={() =>
            toggle(
              "emailNotifications",
            )
          }
        />

        <SettingToggle
          title="اعلان‌های پروژه"
          description="دریافت وضعیت پروژه‌ها، قراردادها و فعالیت‌ها."
          enabled={
            currentSettings.projectNotifications
          }
          onToggle={() =>
            toggle(
              "projectNotifications",
            )
          }
        />

        <SettingToggle
          title="اعلان‌های عمومی"
          description="دریافت اخبار و اطلاع‌رسانی‌های عمومی Uniqe."
          enabled={
            currentSettings.marketingNotifications
          }
          onToggle={() =>
            toggle(
              "marketingNotifications",
            )
          }
        />
      </div>

      <div className="my-u-settings-actions">
        <button
          type="button"
          onClick={saveSettings}
          className="my-u-settings-save"
        >
          ذخیره تنظیمات
        </button>

        {saved && (
          <span className="my-u-settings-saved">
            تنظیمات در حالت نمایشی ذخیره شد.
          </span>
        )}
      </div>
    </section>
  );
}

type ToggleProps = {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function SettingToggle({
  title,
  description,
  enabled,
  onToggle,
}: ToggleProps) {
  return (
    <div className="my-u-setting-row">
      <div>
        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        className={
          enabled
            ? "my-u-toggle my-u-toggle-active"
            : "my-u-toggle"
        }
      >
        <span />
      </button>
    </div>
  );
}