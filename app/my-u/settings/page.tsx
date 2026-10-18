"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import MyUSettingsForm from "@/components/my-u/MyUSettingsForm";
import {
  getAccount,
  type AccountResponse,
} from "@/lib/api/account";

import "@/components/my-u/my-u-settings.css";

export default function MyUSettingsPage() {
  const [account, setAccount] =
    useState<AccountResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadAccount = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAccount();
      setAccount(response);
    } catch {
      setAccount(null);

      setError(
        "دریافت اطلاعات حساب ناموفق بود. اتصال به سرور و وضعیت ورود را بررسی کنید.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAccount();
  }, [loadAccount]);

  return (
    <main className="my-u-settings-page">
      <section className="my-u-settings-hero">
        <div className="container">
          <span className="section-eyebrow">
            UNIQE / MY U / SETTINGS
          </span>

          <h1 className="my-u-settings-title">
            Your account.
            <br />
            <span>Your preferences.</span>
          </h1>

          <p className="my-u-settings-description">
            اطلاعات پروفایل و ترجیحات حساب خود را
            مدیریت کنید. تغییرات پس از ذخیره به سرور
            ارسال می‌شوند.
          </p>
        </div>
      </section>

      <section className="my-u-settings-content section">
        <div className="container">
          {loading && (
            <div
              className="my-u-settings-message"
              role="status"
              aria-live="polite"
            >
              در حال دریافت اطلاعات حساب...
            </div>
          )}

          {!loading && error && (
            <div
              className="my-u-settings-message my-u-settings-error"
              role="alert"
            >
              <p>{error}</p>

              <button
                type="button"
                className="my-u-settings-button"
                onClick={() => void loadAccount()}
              >
                تلاش دوباره
              </button>
            </div>
          )}

          {!loading && !error && account && (
            <MyUSettingsForm
              account={account}
              onAccountUpdated={setAccount}
            />
          )}
        </div>
      </section>
    </main>
  );
}