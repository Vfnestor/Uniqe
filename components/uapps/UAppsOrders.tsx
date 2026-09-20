"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  deleteUAppsOrder,
  getStoredUAppsOrders,
  type UAppsOrder,
} from "@/lib/uapps/order-storage";

function getStatusClass(
  status: UAppsOrder["status"],
) {
  if (
    status === "pending-review"
  ) {
    return "pending";
  }

  if (
    status === "reviewing"
  ) {
    return "reviewing";
  }

  if (
    status === "quoted"
  ) {
    return "quoted";
  }

  if (
    status === "approved"
  ) {
    return "approved";
  }

  if (
    status === "in-progress"
  ) {
    return "progress";
  }

  if (
    status === "completed"
  ) {
    return "completed";
  }

  return "cancelled";
}

export default function UAppsOrders() {
  const [
    orders,
    setOrders,
  ] = useState<UAppsOrder[]>([]);

  const [
    message,
    setMessage,
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

  function handleDelete(
    id: string,
  ) {
    const confirmed =
      window.confirm(
        "آیا از حذف این سفارش مطمئن هستید؟",
      );

    if (!confirmed) {
      return;
    }

    deleteUAppsOrder(id);

    setMessage(
      "سفارش حذف شد.",
    );

    loadOrders();
  }

  return (
    <main className="uapps-orders-page">
      <div className="uapps-orders-container">
        <div className="uapps-order-topbar">
          <Link
            href="/uapps"
            className="uapps-back-link"
          >
            ← بازگشت به UApps
          </Link>

          <Link
            href="/uapps/order"
            className="uapps-order-topbar-link"
          >
            ＋ سفارش جدید
          </Link>
        </div>

        <section className="uapps-orders-hero">
          <span className="uapps-eyebrow">
            MY ORDERS
          </span>

          <h1>
            سفارش‌های من
          </h1>

          <p>
            درخواست‌های ساخت نرم‌افزار و وضعیت
            فعلی هر سفارش را از اینجا پیگیری کنید.
          </p>
        </section>

        {message && (
          <div className="uapps-build-message uapps-build-message-success">
            {message}
          </div>
        )}

        {orders.length === 0 ? (
          <section className="uapps-orders-empty">
            <div>
              ◇
            </div>

            <h2>
              هنوز سفارشی ثبت نکرده‌ای
            </h2>

            <p>
              اگر برای کسب‌وکار یا پروژه خودت
              به یک نرم‌افزار اختصاصی نیاز داری،
              اولین سفارش خودت را ثبت کن.
            </p>

            <Link
              href="/uapps/order"
              className="uapps-order-primary-button"
            >
              ثبت سفارش جدید
              <span>
                ←
              </span>
            </Link>
          </section>
        ) : (
          <section className="uapps-orders-list">
            {orders.map(
              (order) => (
                <article
                  key={order.id}
                  className="uapps-order-item"
                >
                  <div className="uapps-order-item-top">
                    <div>
                      <span className="uapps-order-number-small">
                        {order.orderNumber}
                      </span>

                      <h2>
                        {order.title}
                      </h2>
                    </div>

                    <span
                      className={`uapps-order-status uapps-order-status-${getStatusClass(
                        order.status,
                      )}`}
                    >
                      {order.statusLabel}
                    </span>
                  </div>

                  <p>
                    {order.description}
                  </p>

                  <div className="uapps-order-meta">
                    <span>
                      {order.typeLabel}
                    </span>

                    <span>
                      {order.platformLabel}
                    </span>

                    <span>
                      {order.budget}
                    </span>

                    <span>
                      {order.timeline}
                    </span>
                  </div>

                  {order.features.length >
                    0 && (
                    <div className="uapps-order-features">
                      <strong>
                        امکانات
                      </strong>

                      <div>
                        {order.features.map(
                          (
                            feature,
                          ) => (
                            <span
                              key={
                                feature
                              }
                            >
                              {feature}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <div className="uapps-order-item-footer">
                    <span>
                      ثبت شده در{" "}
                      {new Date(
                        order.createdAt,
                      ).toLocaleDateString(
                        "fa-IR",
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          order.id,
                        )
                      }
                    >
                      حذف سفارش
                    </button>
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