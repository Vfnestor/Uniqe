import Link from "next/link";

import type {
  MyUOrder,
} from "@/lib/my-u/core-data";

type Props = {
  orders: MyUOrder[];
};

function formatAmount(
  amount?: number,
  currency?: string,
) {
  if (
    amount === undefined ||
    !currency
  ) {
    return null;
  }

  return `${amount.toLocaleString("en-US")} ${currency}`;
}

export default function MyUOrders({
  orders,
}: Props) {
  return (
    <section className="my-u-core-panel">
      <div className="my-u-core-panel-header">
        <div>
          <span className="section-eyebrow">
            ORDERS
          </span>

          <h2>
            سفارش‌های من
          </h2>
        </div>

        <span className="my-u-core-count">
          {orders.length}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="my-u-core-empty">
          هنوز سفارشی ثبت نشده است.
        </div>
      ) : (
        <div className="my-u-order-list">
          {orders.map((order) => (
            <article
              key={order.id}
              className="my-u-order-item"
            >
              <div className="my-u-order-main">
                <div className="my-u-order-top">
                  <span className="my-u-order-number">
                    {order.orderNumber}
                  </span>

                  <span className="my-u-core-area">
                    {order.areaLabel}
                  </span>
                </div>

                <h3>
                  {order.title}
                </h3>

                <p>
                  {new Date(
                    order.createdAt,
                  ).toLocaleDateString(
                    "fa-IR",
                  )}
                </p>
              </div>

              <div className="my-u-order-side">
                <span className="my-u-order-status">
                  {order.statusLabel}
                </span>

                {formatAmount(
                  order.amount,
                  order.currency,
                ) && (
                  <strong>
                    {formatAmount(
                      order.amount,
                      order.currency,
                    )}
                  </strong>
                )}

                {order.href && (
                  <Link
                    href={order.href}
                    className="my-u-core-link"
                  >
                    مشاهده
                    <span>←</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}