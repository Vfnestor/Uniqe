"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  approveStoredUserApp,
  getStoredUserApps,
  rejectStoredUserApp,
  revokeStoredUserAppVerification,
  type StoredUserApp,
} from "@/lib/uapps/user-app-storage";

type Filter =
  | "all"
  | "pending"
  | "approved"
  | "rejected";

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

export default function UAppsReviewPanel() {
  const [apps, setApps] =
    useState<StoredUserApp[]>([]);

  const [filter, setFilter] =
    useState<Filter>("pending");

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [reviewNote, setReviewNote] =
    useState("");

  const [rejectionReason, setRejectionReason] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [search, setSearch] =
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

  const counts = useMemo(
    () => ({
      all: apps.length,
      pending:
        apps.filter(
          (app) =>
            app.reviewStatus ===
            "pending-review",
        ).length,
      approved:
        apps.filter(
          (app) =>
            app.reviewStatus ===
            "approved",
        ).length,
      rejected:
        apps.filter(
          (app) =>
            app.reviewStatus ===
            "rejected",
        ).length,
    }),
    [apps],
  );

  const filteredApps =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return apps.filter(
        (app) => {
          const matchesFilter =
            filter === "all"
              ? true
              : filter ===
                  "pending"
                ? app.reviewStatus ===
                  "pending-review"
                : filter ===
                    "approved"
                  ? app.reviewStatus ===
                    "approved"
                  : app.reviewStatus ===
                    "rejected";

          if (
            !matchesFilter
          ) {
            return false;
          }

          if (
            !normalizedSearch
          ) {
            return true;
          }

          return [
            app.name,
            app.category,
            app.creator.name,
            app.creator.username,
          ]
            .join(" ")
            .toLowerCase()
            .includes(
              normalizedSearch,
            );
        },
      );
    }, [
      apps,
      filter,
      search,
    ]);

  const selectedApp =
    apps.find(
      (app) =>
        app.id ===
        selectedId,
    ) || null;

  useEffect(() => {
    if (
      selectedApp &&
      selectedApp.reviewNote
    ) {
      setReviewNote(
        selectedApp.reviewNote,
      );
    } else {
      setReviewNote("");
    }

    if (
      selectedApp &&
      selectedApp.rejectionReason
    ) {
      setRejectionReason(
        selectedApp.rejectionReason,
      );
    } else {
      setRejectionReason("");
    }
  }, [selectedId]);

  function handleApprove() {
    if (!selectedApp) {
      return;
    }

    approveStoredUserApp(
      selectedApp.id,
      reviewNote,
    );

    setMessage(
      "نرم‌افزار تأیید شد و نشان Verified دریافت کرد.",
    );

    setSelectedId(null);
    setReviewNote("");
    setRejectionReason("");
    loadApps();
  }

  function handleReject() {
    if (!selectedApp) {
      return;
    }

    if (
      rejectionReason.trim()
        .length < 5
    ) {
      setMessage(
        "برای رد کردن نرم‌افزار، دلیل اصلاح را وارد کنید.",
      );

      return;
    }

    rejectStoredUserApp(
      selectedApp.id,
      rejectionReason,
      reviewNote,
    );

    setMessage(
      "نرم‌افزار رد شد و برای اصلاح به صاحب آن بازگشت.",
    );

    setSelectedId(null);
    setReviewNote("");
    setRejectionReason("");
    loadApps();
  }

  function handleRevoke() {
    if (!selectedApp) {
      return;
    }

    revokeStoredUserAppVerification(
      selectedApp.id,
      reviewNote,
    );

    setMessage(
      "وضعیت تأیید لغو شد و نرم‌افزار دوباره در انتظار بررسی قرار گرفت.",
    );

    setSelectedId(null);
    setReviewNote("");
    setRejectionReason("");
    loadApps();
  }

  return (
    <main className="admin-uapps-page">
      <div className="admin-uapps-header">
        <div>
          <span className="admin-dashboard-eyebrow">
            UAPPS REVIEW CENTER
          </span>

          <h1>
            بررسی نرم‌افزارها
          </h1>

          <p>
            نرم‌افزارهای ارسال‌شده توسط کاربران را
            بررسی و وضعیت انتشار و تأیید آن‌ها را
            مدیریت کنید.
          </p>
        </div>

        <Link
          href="/uapps"
          className="admin-uapps-public-link"
        >
          مشاهده UApps
          <span>
            ↗
          </span>
        </Link>
      </div>

      <section className="admin-uapps-stats">
        <button
          type="button"
          className={
            filter === "all"
              ? "admin-uapps-stat is-active"
              : "admin-uapps-stat"
          }
          onClick={() =>
            setFilter("all")
          }
        >
          <strong>
            {counts.all}
          </strong>

          <span>
            همه
          </span>
        </button>

        <button
          type="button"
          className={
            filter === "pending"
              ? "admin-uapps-stat is-active"
              : "admin-uapps-stat"
          }
          onClick={() =>
            setFilter("pending")
          }
        >
          <strong>
            {counts.pending}
          </strong>

          <span>
            در انتظار بررسی
          </span>
        </button>

        <button
          type="button"
          className={
            filter === "approved"
              ? "admin-uapps-stat is-active"
              : "admin-uapps-stat"
          }
          onClick={() =>
            setFilter("approved")
          }
        >
          <strong>
            {counts.approved}
          </strong>

          <span>
            تأیید شده
          </span>
        </button>

        <button
          type="button"
          className={
            filter === "rejected"
              ? "admin-uapps-stat is-active"
              : "admin-uapps-stat"
          }
          onClick={() =>
            setFilter("rejected")
          }
        >
          <strong>
            {counts.rejected}
          </strong>

          <span>
            نیازمند اصلاح
          </span>
        </button>
      </section>

      {message && (
        <div className="admin-uapps-message">
          {message}
        </div>
      )}

      <section className="admin-uapps-toolbar">
        <input
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value,
            )
          }
          placeholder="جستجوی نرم‌افزار یا سازنده..."
        />

        <span>
          {filteredApps.length} مورد
        </span>
      </section>

      <section className="admin-uapps-layout">
        <div className="admin-uapps-list">
          {filteredApps.length === 0 ? (
            <div className="admin-uapps-empty">
              <div>
                ✓
              </div>

              <strong>
                موردی برای نمایش وجود ندارد
              </strong>

              <span>
                در این وضعیت هنوز نرم‌افزاری ثبت نشده است.
              </span>
            </div>
          ) : (
            filteredApps.map(
              (app) => (
                <button
                  key={app.id}
                  type="button"
                  className={
                    selectedId ===
                    app.id
                      ? "admin-uapps-item is-selected"
                      : "admin-uapps-item"
                  }
                  onClick={() =>
                    setSelectedId(
                      app.id,
                    )
                  }
                >
                  <div
                    className={`admin-uapps-item-icon admin-uapps-accent-${app.accent}`}
                  >
                    {app.icon}
                  </div>

                  <div className="admin-uapps-item-content">
                    <strong>
                      {app.name}
                    </strong>

                    <span>
                      {app.creator.name}
                      {" · "}
                      {app.category}
                    </span>
                  </div>

                  <span
                    className={`admin-uapps-status admin-uapps-status-${app.reviewStatus}`}
                  >
                    {getStatusLabel(
                      app.reviewStatus,
                    )}
                  </span>
                </button>
              ),
            )
          )}
        </div>

        <aside className="admin-uapps-detail">
          {!selectedApp ? (
            <div className="admin-uapps-detail-empty">
              <div>
                ◇
              </div>

              <strong>
                یک نرم‌افزار را انتخاب کنید
              </strong>

              <span>
                جزئیات نرم‌افزار برای بررسی در این بخش
                نمایش داده می‌شود.
              </span>
            </div>
          ) : (
            <>
              <div className="admin-uapps-detail-top">
                <div
                  className={`admin-uapps-detail-icon admin-uapps-accent-${selectedApp.accent}`}
                >
                  {selectedApp.icon}
                </div>

                <div>
                  <span className="admin-uapps-detail-eyebrow">
                    APP REVIEW
                  </span>

                  <h2>
                    {selectedApp.name}
                  </h2>

                  <span>
                    {getStatusLabel(
                      selectedApp.reviewStatus,
                    )}
                  </span>
                </div>
              </div>

              <div className="admin-uapps-detail-section">
                <h3>
                  اطلاعات نرم‌افزار
                </h3>

                <div className="admin-uapps-detail-grid">
                  <div>
                    <span>
                      سازنده
                    </span>

                    <strong>
                      {
                        selectedApp
                          .creator
                          .name
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Username
                    </span>

                    <strong dir="ltr">
                      @
                      {
                        selectedApp
                          .creator
                          .username
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      دسته‌بندی
                    </span>

                    <strong>
                      {
                        selectedApp.category
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      پلتفرم
                    </span>

                    <strong>
                      {
                        selectedApp.platformLabel
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      نوع
                    </span>

                    <strong>
                      {
                        selectedApp.typeLabel
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      نسخه
                    </span>

                    <strong dir="ltr">
                      {
                        selectedApp.version ||
                        "-"
                      }
                    </strong>
                  </div>
                </div>
              </div>

              <div className="admin-uapps-detail-section">
                <h3>
                  توضیحات
                </h3>

                <p className="admin-uapps-description">
                  {
                    selectedApp.description
                  }
                </p>
              </div>

              <div className="admin-uapps-detail-section">
                <h3>
                  لینک
                </h3>

                <a
                  href={
                    selectedApp.href
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="admin-uapps-app-link"
                >
                  {selectedApp.href}
                  <span>
                    ↗
                  </span>
                </a>
              </div>

              {selectedApp.cover && (
                <div className="admin-uapps-detail-section">
                  <h3>
                    کاور
                  </h3>

                  <img
                    src={
                      selectedApp.cover
                    }
                    alt={
                      selectedApp.name
                    }
                    className="admin-uapps-cover-preview"
                  />
                </div>
              )}

              <div className="admin-uapps-detail-section">
                <h3>
                  یادداشت بررسی
                </h3>

                <textarea
                  value={
                    reviewNote
                  }
                  onChange={(event) =>
                    setReviewNote(
                      event.target.value,
                    )
                  }
                  placeholder="یادداشت اختیاری برای ثبت در نتیجه بررسی..."
                  rows={4}
                />
              </div>

              {selectedApp.reviewStatus !==
                "approved" && (
                <div className="admin-uapps-detail-section">
                  <h3>
                    دلیل اصلاح در صورت رد
                  </h3>

                  <textarea
                    value={
                      rejectionReason
                    }
                    onChange={(event) =>
                      setRejectionReason(
                        event.target.value,
                      )
                    }
                    placeholder="مثلاً لینک نرم‌افزار معتبر نیست یا توضیحات ناقص است..."
                    rows={4}
                  />
                </div>
              )}

              <div className="admin-uapps-review-actions">
                {selectedApp.reviewStatus !==
                  "approved" && (
                  <button
                    type="button"
                    className="admin-uapps-approve-button"
                    onClick={
                      handleApprove
                    }
                  >
                    ✓ تأیید و Verified کردن
                  </button>
                )}

                {selectedApp.reviewStatus !==
                  "approved" && (
                  <button
                    type="button"
                    className="admin-uapps-reject-button"
                    onClick={
                      handleReject
                    }
                  >
                    نیازمند اصلاح
                  </button>
                )}

                {selectedApp.reviewStatus ===
                  "approved" && (
                  <button
                    type="button"
                    className="admin-uapps-revoke-button"
                    onClick={
                      handleRevoke
                    }
                  >
                    لغو تأیید
                  </button>
                )}
              </div>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}