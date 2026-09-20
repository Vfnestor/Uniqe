"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  deleteStoredUserApp,
  getStoredUserApps,
  submitStoredUserApp,
  type StoredUserApp,
} from "@/lib/uapps/user-app-storage";

function getStatusLabel(
  status: StoredUserApp["reviewStatus"],
) {
  if (status === "draft") {
    return "پیش‌نویس";
  }

  if (
    status === "pending-review"
  ) {
    return "در انتظار بررسی";
  }

  if (status === "approved") {
    return "تأیید شده";
  }

  return "رد شده";
}

function getStatusClass(
  status: StoredUserApp["reviewStatus"],
) {
  if (status === "draft") {
    return "draft";
  }

  if (
    status === "pending-review"
  ) {
    return "pending";
  }

  if (status === "approved") {
    return "approved";
  }

  return "rejected";
}

export default function UAppsMyApps() {
  const [apps, setApps] =
    useState<StoredUserApp[]>([]);

  const [message, setMessage] =
    useState("");

  function loadApps() {
    setApps(
      getStoredUserApps(),
    );
  }

  useEffect(() => {
    loadApps();

    function handleUpdate() {
      loadApps();
    }

    window.addEventListener(
      "uniqe-user-apps-updated",
      handleUpdate,
    );

    window.addEventListener(
      "storage",
      handleUpdate,
    );

    return () => {
      window.removeEventListener(
        "uniqe-user-apps-updated",
        handleUpdate,
      );

      window.removeEventListener(
        "storage",
        handleUpdate,
      );
    };
  }, []);

  function handleSubmit(
    id: string,
  ) {
    submitStoredUserApp(id);
    setMessage(
      "نرم‌افزار برای بررسی ارسال شد.",
    );
    loadApps();
  }

  function handleDelete(
    id: string,
  ) {
    const confirmed =
      window.confirm(
        "آیا از حذف این نرم‌افزار مطمئن هستید؟",
      );

    if (!confirmed) {
      return;
    }

    deleteStoredUserApp(id);

    setMessage(
      "نرم‌افزار حذف شد.",
    );

    loadApps();
  }

  return (
    <main className="uapps-my-apps-page">
      <div className="uapps-my-apps-container">
        <div className="uapps-build-topbar">
          <Link
            href="/uapps"
            className="uapps-back-link"
          >
            ← بازگشت به UApps
          </Link>

          <Link
            href="/uapps/build"
            className="uapps-build-my-apps-link"
          >
            ＋ ساخت نرم‌افزار
          </Link>
        </div>

        <section className="uapps-my-apps-hero">
          <span className="uapps-eyebrow">
            MY UAPPS
          </span>

          <h1>
            نرم‌افزارهای من
          </h1>

          <p>
            اینجا می‌توانی نرم‌افزارهایی که ساخته‌ای
            را مدیریت و برای بررسی Uniqe ارسال کنی.
          </p>
        </section>

        {message && (
          <div className="uapps-build-message uapps-build-message-success">
            {message}
          </div>
        )}

        {apps.length === 0 ? (
          <section className="uapps-my-apps-empty">
            <div>
              ＋
            </div>

            <h2>
              هنوز نرم‌افزاری نساخته‌ای
            </h2>

            <p>
              اولین نرم‌افزار خودت را بساز و آن را
              برای انتشار در UApps آماده کن.
            </p>

            <Link
              href="/uapps/build"
              className="uapps-build-primary-button"
            >
              ساخت اولین نرم‌افزار
              <span>
                →
              </span>
            </Link>
          </section>
        ) : (
          <section className="uapps-my-apps-list">
            {apps.map(
              (app) => (
                <article
                  key={app.id}
                  className="uapps-my-app-card"
                >
                  <div
                    className={`uapps-my-app-icon uapps-build-accent-${app.accent}`}
                  >
                    {app.icon}
                  </div>

                  <div className="uapps-my-app-content">
                    <div className="uapps-my-app-heading">
                      <div>
                        <h2>
                          {app.name}
                        </h2>

                        <span>
                          {app.category}
                          {" · "}
                          {app.platformLabel}
                        </span>
                      </div>

                      <span
                        className={`uapps-my-app-status uapps-my-app-status-${getStatusClass(
                          app.reviewStatus,
                        )}`}
                      >
                        {getStatusLabel(
                          app.reviewStatus,
                        )}
                      </span>
                    </div>

                    <p>
                      {app.description}
                    </p>

                    <div className="uapps-my-app-meta">
                      <span>
                        نسخه{" "}
                        {app.version ||
                          "ثبت نشده"}
                      </span>

                      <span>
                        {app.typeLabel}
                      </span>

                      <a
                        href={
                          app.href
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        مشاهده لینک
                      </a>
                    </div>

                    <div className="uapps-my-app-actions">
                      {app.reviewStatus ===
                        "draft" && (
                        <button
                          type="button"
                          className="uapps-build-primary-button"
                          onClick={() =>
                            handleSubmit(
                              app.id,
                            )
                          }
                        >
                          ارسال برای بررسی
                          <span>
                            →
                          </span>
                        </button>
                      )}

                      {app.reviewStatus ===
                        "rejected" && (
                        <button
                          type="button"
                          className="uapps-build-primary-button"
                          onClick={() =>
                            handleSubmit(
                              app.id,
                            )
                          }
                        >
                          ارسال مجدد
                          <span>
                            →
                          </span>
                        </button>
                      )}

                      <button
                        type="button"
                        className="uapps-my-app-delete"
                        onClick={() =>
                          handleDelete(
                            app.id,
                          )
                        }
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </article>
              ),
            )}
          </section>
        )}
      </div>
    </main>
  );
}