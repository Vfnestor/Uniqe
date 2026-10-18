"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getAccount,
  updatePreferences,
  updateProfile,
  type AccountResponse,
} from "@/lib/api/account";

type MyUSettingsFormProps = {
  account: AccountResponse;
  onAccountUpdated: (
    account: AccountResponse,
  ) => void;
};

type SettingsFormState = {
  displayName: string;
  bio: string;
  avatarUrl: string;
  language: string;
  theme: "system" | "light" | "dark";
  notificationsEnabled: boolean;
};

function createFormState(
  account: AccountResponse,
): SettingsFormState {
  const profile = account.profile;
  const preferences = account.preferences;

  const theme =
    preferences?.theme ||
    profile?.theme ||
    "system";

  return {
    displayName:
      profile?.displayName || account.user.name,
    bio: profile?.bio || "",
    avatarUrl:
      profile?.avatarUrl ||
      account.user.avatarUrl ||
      "",
    language:
      preferences?.language ||
      profile?.language ||
      "en",
    theme,
    notificationsEnabled:
      preferences?.notificationsEnabled ?? true,
  };
}

export default function MyUSettingsForm({
  account,
  onAccountUpdated,
}: MyUSettingsFormProps) {
  const [form, setForm] =
    useState<SettingsFormState>(
      () => createFormState(account),
    );

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    setForm(createFormState(account));
  }, [account]);

  function updateField<
    K extends keyof SettingsFormState,
  >(
    key: K,
    value: SettingsFormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const displayName =
        form.displayName.trim();

      if (displayName.length < 2) {
        setError(
          "نام نمایشی باید حداقل ۲ نویسه داشته باشد.",
        );
        return;
      }

      if (form.language.trim().length < 2) {
        setError(
          "کد زبان باید حداقل ۲ نویسه داشته باشد.",
        );
        return;
      }

      const avatarUrl =
        form.avatarUrl.trim();

      if (avatarUrl) {
        try {
          const parsedUrl = new URL(avatarUrl);

          if (
            parsedUrl.protocol !== "https:" &&
            parsedUrl.protocol !== "http:"
          ) {
            throw new Error("Invalid URL protocol.");
          }
        } catch {
          setError(
            "نشانی تصویر باید یک URL معتبر با http یا https باشد.",
          );
          return;
        }
      }

      await updateProfile({
        displayName,
        bio: form.bio.trim(),
        avatarUrl,
        language: form.language.trim(),
        theme: form.theme,
      });

      await updatePreferences({
        theme: form.theme,
        language: form.language.trim(),
        notificationsEnabled:
          form.notificationsEnabled,
      });

      const updatedAccount = await getAccount();

      onAccountUpdated(updatedAccount);

      setMessage(
        "تنظیمات با موفقیت در حساب شما ذخیره شد.",
      );
    } catch {
      setError(
        "ذخیره تنظیمات ناموفق بود. اتصال به سرور را بررسی کنید و دوباره تلاش کنید.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="my-u-settings-form"
      onSubmit={handleSubmit}
    >
      <section className="my-u-settings-panel">
        <div className="my-u-settings-panel-heading">
          <span className="section-eyebrow">
            PROFILE
          </span>

          <h2>اطلاعات پروفایل</h2>

          <p>
            این اطلاعات برای نمایش هویت شما در
            فضای کاربری استفاده می‌شوند.
          </p>
        </div>

        <div className="my-u-settings-field">
          <label htmlFor="settings-name">
            نام نمایشی
          </label>

          <input
            id="settings-name"
            name="displayName"
            type="text"
            minLength={2}
            maxLength={100}
            autoComplete="name"
            value={form.displayName}
            onChange={(event) =>
              updateField(
                "displayName",
                event.target.value,
              )
            }
            required
          />
        </div>

        <div className="my-u-settings-field">
          <label htmlFor="settings-email">
            ایمیل حساب
          </label>

          <input
            id="settings-email"
            type="email"
            value={account.user.email}
            readOnly
            disabled
          />

          <small>
            تغییر ایمیل از این صفحه پشتیبانی نمی‌شود.
          </small>
        </div>

        <div className="my-u-settings-field">
          <label htmlFor="settings-bio">
            درباره من
          </label>

          <textarea
            id="settings-bio"
            name="bio"
            rows={4}
            maxLength={1000}
            value={form.bio}
            onChange={(event) =>
              updateField(
                "bio",
                event.target.value,
              )
            }
            placeholder="کمی درباره خودتان بنویسید..."
          />

          <small>
            حداکثر ۱۰۰۰ نویسه
          </small>
        </div>

        <div className="my-u-settings-field">
          <label htmlFor="settings-avatar">
            نشانی تصویر پروفایل
          </label>

          <input
            id="settings-avatar"
            name="avatarUrl"
            type="url"
            maxLength={500}
            value={form.avatarUrl}
            onChange={(event) =>
              updateField(
                "avatarUrl",
                event.target.value,
              )
            }
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
      </section>

      <section className="my-u-settings-panel">
        <div className="my-u-settings-panel-heading">
          <span className="section-eyebrow">
            PREFERENCES
          </span>

          <h2>ترجیحات حساب</h2>

          <p>
            زبان، ظاهر و ترجیحات دریافت اعلان‌ها
            را انتخاب کنید.
          </p>
        </div>

        <div className="my-u-settings-field">
          <label htmlFor="settings-language">
            زبان
          </label>

          <select
            id="settings-language"
            value={form.language}
            onChange={(event) =>
              updateField(
                "language",
                event.target.value,
              )
            }
          >
            <option value="en">
              English
            </option>

            <option value="fa">
              فارسی
            </option>

            <option value="fr">
              Français
            </option>
          </select>
        </div>

        <div className="my-u-settings-field">
          <label htmlFor="settings-theme">
            پوسته
          </label>

          <select
            id="settings-theme"
            value={form.theme}
            onChange={(event) =>
              updateField(
                "theme",
                event.target.value as
                  | "system"
                  | "light"
                  | "dark",
              )
            }
          >
            <option value="system">
              هماهنگ با سیستم
            </option>

            <option value="light">
              روشن
            </option>

            <option value="dark">
              تیره
            </option>
          </select>

          <small>
            انتخاب پوسته در حساب ذخیره می‌شود؛
            اعمال سراسری آن به رابط کاربری به
            پشتیبانی پوسته در بخش نمایش نیاز دارد.
          </small>
        </div>

        <label className="my-u-settings-toggle">
          <span className="my-u-settings-toggle-copy">
            <strong>ترجیحات اعلان‌ها</strong>

            <small>
              فعال‌بودن دریافت اعلان‌ها در تنظیمات
              حساب
            </small>
          </span>

          <input
            type="checkbox"
            checked={form.notificationsEnabled}
            onChange={(event) =>
              updateField(
                "notificationsEnabled",
                event.target.checked,
              )
            }
          />

          <span
            className="my-u-settings-toggle-track"
            aria-hidden="true"
          />
        </label>
      </section>

      {message && (
        <div
          className="my-u-settings-feedback my-u-settings-success"
          role="status"
        >
          {message}
        </div>
      )}

      {error && (
        <div
          className="my-u-settings-feedback my-u-settings-error"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="my-u-settings-actions">
        <button
          type="submit"
          className="my-u-settings-button"
          disabled={saving}
        >
          {saving
            ? "در حال ذخیره..."
            : "ذخیره تنظیمات"}
        </button>

        <a
          href="/my-u"
          className="my-u-settings-back"
        >
          بازگشت به My U
        </a>
      </div>
    </form>
  );
}