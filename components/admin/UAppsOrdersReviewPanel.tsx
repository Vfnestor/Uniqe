"use client";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  deleteUAppsOrder,
  getStoredUAppsOrders,
  updateUAppsOrder,
  type UAppsOrder,
  type UAppsOrderStatus,
} from "@/lib/uapps/order-storage";

type Filter =
  | "all"
  | "pending-review"
  | "reviewing"
  | "quoted"
  | "approved"
  | "in-progress"
  | "completed"
  | "cancelled";

const statusLabels: Record<
  UAppsOrderStatus,
  string
> = {
  "pending-review":
    "در انتظار بررسی",
  reviewing:
    "در حال بررسی",
  quoted:
    "قیمت‌گذاری شده",
  approved:
    "تأیید شده",
  "in-progress":
    "در حال انجام",
  completed:
    "تکمیل شده",
  cancelled:
    "لغو شده",
};

function getStatusClass(
  status: UAppsOrderStatus,
) {
  return `admin-uapps-order-status admin-uapps-order-status-${status}`;
}

function formatDate(
  value: string,
) {
  try {
    return new Intl.DateTimeFormat(
      "fa-IR",
      {
        dateStyle: "medium",
        timeStyle: "short",
      },
    ).format(
      new Date(value),
    );
  } catch {
    return value;
  }
}

export default function UAppsOrdersReviewPanel() {
  const [orders, setOrders] =
    useState<UAppsOrder[]>([]);

  const [filter, setFilter] =
    useState<Filter>("pending-review");

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [
    selectedStatus,
    setSelectedStatus,
  ] =
    useState<UAppsOrderStatus>(
      "pending-review",
    );

  const [
    reviewNote,
    setReviewNote,
  ] = useState("");

  function loadOrders() {
    setOrders(
      getStoredUAppsOrders(),
    );
  }

  useEffect(() => {
    loadOrders();

    function handleUpdate() {
      loadOrders();
    }

    window.addEventListener(
      "uniqe-uapps-orders-updated",
      handleUpdate,
    );

    window.addEventListener(
      "storage",
      handleUpdate,
    );

    return () => {
      window.removeEventListener(
        "uniqe-uapps-orders-updated",
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
      all: orders.length,
      pending:
        orders.filter(
          (order) =>
            order.status ===
            "pending-review",
        ).length,
      reviewing:
        orders.filter(
          (order) =>
            order.status ===
            "reviewing",
        ).length,
      active:
        orders.filter(
          (order) =>
            order.status ===
              "quoted" ||
            order.status ===
              "approved" ||
            order.status ===
              "in-progress",
        ).length,
      completed:
        orders.filter(
          (order) =>
            order.status ===
            "completed",
        ).length,
    }),
    [orders],
  );

  const filteredOrders =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return orders.filter(
        (order) => {
          const matchesFilter =
            filter === "all"
              ? true
              : order.status ===
                filter;

          if (!matchesFilter) {
            return false;
          }

          if (
            !normalizedSearch
          ) {
            return true;
          }

          return [
            order.orderNumber,
            order.title,
            order.description,
            order.typeLabel,
            order.platformLabel,
          ]
            .join(" ")
            .toLowerCase()
            .includes(
              normalizedSearch,
            );
        },
      );
    }, [
      orders,
      filter,
      search,
    ]);

  const selectedOrder =
    orders.find(
      (order) =>
        order.id ===
        selectedId,
    ) || null;

  useEffect(() => {
    if (!selectedOrder) {
      setSelectedStatus(
        "pending-review",
      );

      setReviewNote("");

      return;
    }

    setSelectedStatus(
      selectedOrder.status,
    );

    setReviewNote("");
  }, [selectedId]);

  function selectOrder(
    order: UAppsOrder,
  ) {
    setSelectedId(
      order.id,
    );

    setMessage("");
  }

  function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setSelectedStatus(
      event.target.value as UAppsOrderStatus,
    );
  }

  function handleSaveStatus() {
    if (!selectedOrder) {
      return;
    }

    updateUAppsOrder(
      selectedOrder.id,
      {
        status:
          selectedStatus,
        statusLabel:
          statusLabels[
            selectedStatus
          ],
      },
    );

    setMessage(
      "وضعیت سفارش با موفقیت به‌روزرسانی شد.",
    );

    loadOrders();
  }

  function handleDelete() {
    if (!selectedOrder) {
      return;
    }

    const confirmed =
      window.confirm(
        `آیا از حذف سفارش ${selectedOrder.orderNumber} مطمئن هستید؟`,
      );

    if (!confirmed) {
      return;
    }

    deleteUAppsOrder(
      selectedOrder.id,
    );

    setSelectedId(null);
    setMessage(
      "سفارش حذف شد.",
    );

    loadOrders();
  }

  function handleSaveNote() {
    if (!selectedOrder) {
      return;
    }

    updateUAppsOrder(
      selectedOrder.id,
      {
        reviewNote:
          reviewNote.trim(),
      } as Partial<UAppsOrder> & {
        reviewNote?: string;
      },
    );

    setMessage(
      "یادداشت سفارش ذخیره شد.",
    );

    loadOrders();
  }

  return (
    <main className="admin-uapps-orders-page">
      <div className="admin-uapps-orders-header">
        <div>
          <span className="admin-dashboard-eyebrow">
            UAPPS ORDER CENTER
          </span>

          <h1>
            مدیریت سفارش‌های نرم‌افزار
          </h1>

          <p>
            سفارش‌های ساخت و توسعه نرم‌افزار را
            بررسی و وضعیت اجرای آن‌ها را مدیریت کنید.
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

      <section className="admin-uapps-order-stats">
        <button
          type="button"
          className={
            filter === "all"
              ? "admin-uapps-order-stat is-active"
              : "admin-uapps-order-stat"
          }
          onClick={() =>
            setFilter("all")
          }
        >
          <strong>
            {counts.all}
          </strong>

          <span>
            همه سفارش‌ها
          </span>
        </button>

        <button
          type="button"
          className={
            filter ===
            "pending-review"
              ? "admin-uapps-order-stat is-active"
              : "admin-uapps-order-stat"
          }
          onClick={() =>
            setFilter(
              "pending-review",
            )
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
            filter ===
            "reviewing"
              ? "admin-uapps-order-stat is-active"
              : "admin-uapps-order-stat"
          }
          onClick={() =>
            setFilter(
              "reviewing",
            )
          }
        >
          <strong>
            {counts.reviewing}
          </strong>

          <span>
            در حال بررسی
          </span>
        </button>

        <button
          type="button"
          className={
            filter === "all"
              ? "admin-uapps-order-stat"
              : "admin-uapps-order-stat"
          }
          onClick={() =>
            setFilter("all")
          }
        >
          <strong>
            {counts.active}
          </strong>

          <span>
            سفارش‌های فعال
          </span>
        </button>

        <button
          type="button"
          className={
            filter === "completed"
              ? "admin-uapps-order-stat is-active"
              : "admin-uapps-order-stat"
          }
          onClick={() =>
            setFilter("completed")
          }
        >
          <strong>
            {counts.completed}
          </strong>

          <span>
            تکمیل شده
          </span>
        </button>
      </section>

      {message && (
        <div className="admin-uapps-orders-message">
          {message}
        </div>
      )}

      <section className="admin-uapps-orders-toolbar">
        <input
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value,
            )
          }
          placeholder="جستجوی شماره سفارش، عنوان یا نوع پروژه..."
        />

        <span>
          {filteredOrders.length} سفارش
        </span>
      </section>

      <section className="admin-uapps-orders-layout">
        <div className="admin-uapps-orders-list">
          {filteredOrders.length ===
          0 ? (
            <div className="admin-uapps-orders-empty">
              <div>
                ◇
              </div>

              <strong>
                سفارشی برای نمایش وجود ندارد
              </strong>

              <span>
                در وضعیت یا جستجوی فعلی سفارشی پیدا نشد.
              </span>
            </div>
          ) : (
            filteredOrders.map(
              (order) => (
                <button
                  key={order.id}
                  type="button"
                  className={
                    selectedId ===
                    order.id
                      ? "admin-uapps-order-item is-selected"
                      : "admin-uapps-order-item"
                  }
                  onClick={() =>
                    selectOrder(
                      order,
                    )
                  }
                >
                  <div className="admin-uapps-order-item-icon">
                    ◇
                  </div>

                  <div className="admin-uapps-order-item-content">
                    <strong>
                      {order.title}
                    </strong>

                    <span dir="ltr">
                      {order.orderNumber}
                    </span>
                  </div>

                  <span
                    className={getStatusClass(
                      order.status,
                    )}
                  >
                    {
                      statusLabels[
                        order.status
                      ]
                    }
                  </span>
                </button>
              ),
            )
          )}
        </div>

        <aside className="admin-uapps-orders-detail">
          {!selectedOrder ? (
            <div className="admin-uapps-orders-detail-empty">
              <div>
                ◫
              </div>

              <strong>
                یک سفارش را انتخاب کنید
              </strong>

              <span>
                جزئیات کامل سفارش در این قسمت نمایش داده می‌شود.
              </span>
            </div>
          ) : (
            <>
              <div className="admin-uapps-orders-detail-top">
                <div>
                  <span className="admin-uapps-order-eyebrow">
                    ORDER
                  </span>

                  <h2>
                    {selectedOrder.title}
                  </h2>

                  <span dir="ltr">
                    {
                      selectedOrder.orderNumber
                    }
                  </span>
                </div>

                <span
                  className={getStatusClass(
                    selectedOrder.status,
                  )}
                >
                  {
                    statusLabels[
                      selectedOrder.status
                    ]
                  }
                </span>
              </div>

              <div className="admin-uapps-orders-detail-section">
                <h3>
                  اطلاعات سفارش
                </h3>

                <div className="admin-uapps-orders-detail-grid">
                  <div>
                    <span>
                      نوع پروژه
                    </span>

                    <strong>
                      {
                        selectedOrder.typeLabel
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      پلتفرم
                    </span>

                    <strong>
                      {
                        selectedOrder.platformLabel
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      بودجه
                    </span>

                    <strong>
                      {
                        selectedOrder.budget
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      زمان‌بندی
                    </span>

                    <strong>
                      {
                        selectedOrder.timeline
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      تاریخ ثبت
                    </span>

                    <strong>
                      {formatDate(
                        selectedOrder.createdAt,
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>
                      آخرین بروزرسانی
                    </span>

                    <strong>
                      {formatDate(
                        selectedOrder.updatedAt,
                      )}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="admin-uapps-orders-detail-section">
                <h3>
                  توضیحات پروژه
                </h3>

                <p>
                  {
                    selectedOrder.description
                  }
                </p>
              </div>

              {selectedOrder.features.length >
                0 && (
                <div className="admin-uapps-orders-detail-section">
                  <h3>
                    امکانات موردنیاز
                  </h3>

                  <div className="admin-uapps-order-features">
                    {selectedOrder.features.map(
                      (
                        feature,
                        index,
                      ) => (
                        <span
                          key={`${selectedOrder.id}-${index}`}
                        >
                          {feature}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              )}

              <div className="admin-uapps-orders-detail-section">
                <h3>
                  تغییر وضعیت
                </h3>

                <select
                  value={
                    selectedStatus
                  }
                  onChange={
                    handleStatusChange
                  }
                  className="admin-uapps-order-status-select"
                >
                  {(
                    Object.entries(
                      statusLabels,
                    ) as [
                      UAppsOrderStatus,
                      string,
                    ][]
                  ).map(
                    ([
                      value,
                      label,
                    ]) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {label}
                      </option>
                    ),
                  )}
                </select>

                <button
                  type="button"
                  className="admin-uapps-order-save-button"
                  onClick={
                    handleSaveStatus
                  }
                >
                  ذخیره وضعیت
                </button>
              </div>

              <div className="admin-uapps-orders-detail-section">
                <h3>
                  یادداشت داخلی
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
                  rows={5}
                  placeholder="یادداشت مربوط به بررسی یا اجرای سفارش..."
                />

                <button
                  type="button"
                  className="admin-uapps-order-note-button"
                  onClick={
                    handleSaveNote
                  }
                >
                  ذخیره یادداشت
                </button>
              </div>

              <div className="admin-uapps-order-danger">
                <button
                  type="button"
                  onClick={
                    handleDelete
                  }
                >
                  حذف سفارش
                </button>
              </div>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}