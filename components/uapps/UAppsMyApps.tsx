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

  return "نیازمند اصلاح";
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
            نرم‌افزارهای ساخته‌شده توسط شما،
            وضعیت بررسی و وضعیت تأیید آن‌ها را
            مدیریت کنید.
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
              برای بررسی در UApps ارسال کن.
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

                      {app.verified && (
                        <span className="uapps-my-app-verified">
                          ✓ تأیید شده توسط Uniqe
                        </span>
                      )}
                    </div>

                    {app.rejectionReason && (
                      <div className="uapps-my-app-review-note">
                        <strong>
                          دلیل نیاز به اصلاح:
                        </strong>

                        <span>
                          {
                            app.rejectionReason
                          }
                        </span>
                      </div>
                    )}

                    {app.reviewNote && (
                      <div className="uapps-my-app-review-note">
                        <strong>
                          یادداشت بررسی:
                        </strong>

                        <span>
                          {
                            app.reviewNote
                          }
                        </span>
                      </div>
                    )}

                    <div className="uapps-my-app-actions">
                      {(app.reviewStatus ===
                        "draft" ||
                        app.reviewStatus ===
                          "rejected") && (
                        <button
                          type="button"
                          className="uapps-build-primary-button"
                          onClick={() =>
                            handleSubmit(
                              app.id,
                            )
                          }
                        >
                          {app.reviewStatus ===
                          "rejected"
                            ? "ارسال مجدد"
                            : "ارسال برای بررسی"}

                          <span>
                            →
                          </span>
                        </button>
                      )}

                      {app.reviewStatus ===
                        "pending-review" && (
                        <span className="uapps-my-app-pending-message">
                          درخواست شما در صف بررسی قرار دارد.
                        </span>
                      )}

                      {app.reviewStatus ===
                        "approved" && (
                        <span className="uapps-my-app-approved-message">
                          ✓ این نرم‌افزار تأیید شده است.
                        </span>
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