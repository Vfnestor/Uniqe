"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  readOrder,
  saveOrder,
  type UShopOrder,
} from "@/components/ushop/order";

import "@/components/ushop/payment.css";

export default function PaymentPage() {
  const { language } =
    useLanguage();

  const isPersian =
    language === "fa";

  const [order, setOrder] =
    useState<UShopOrder | null>(
      null,
    );

  const [loaded, setLoaded] =
    useState(false);

  const [processing, setProcessing] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    setOrder(readOrder());
    setLoaded(true);
  }, []);

  const formatPrice = (
    value: number,
    currency: string,
  ) => {
    const formatted =
      new Intl.NumberFormat(
        isPersian
          ? "fa-IR"
          : "en-US",
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      ).format(value);

    return currency === "USD"
      ? `$${formatted}`
      : `${formatted} ${currency}`;
  };

  const simulatePayment = () => {
    if (
      !order ||
      processing
    ) {
      return;
    }

    setProcessing(true);
    setMessage("");

    window.setTimeout(() => {
      const updatedOrder: UShopOrder =
        {
          ...order,
          orderStatus:
            "confirmed",
          paymentStatus:
            "pending",
        };

      saveOrder(
        updatedOrder,
      );

      setOrder(
        updatedOrder,
      );

      setProcessing(false);

      setMessage(
        isPersian
          ? "این صفحه در حال حاضر فقط شبیه‌ساز پرداخت است. درگاه واقعی در Phase 6 متصل خواهد شد."
          : "This is currently a payment placeholder. The real payment gateway will be connected in Phase 6.",
      );
    }, 900);
  };

  if (!loaded) {
    return (
      <main className="ushop-payment-page">
        <div className="ushop-payment-loading">
          <span />
          <span />
          <span />
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main
        className="ushop-payment-page"
        dir={
          isPersian
            ? "rtl"
            : "ltr"
        }
      >
        <div className="ushop-payment-container">
          <section className="ushop-payment-empty">
            <div className="ushop-payment-icon">
              !
            </div>

            <span>
              UShop /
              PAYMENT
            </span>

            <h1>
              {isPersian
                ? "سفارشی پیدا نشد."
                : "Order not found."}
            </h1>

            <p>
              {isPersian
                ? "برای ورود به مرحله پرداخت ابتدا باید یک سفارش ایجاد کنید."
                : "Create an order first before continuing to payment."}
            </p>

            <Link
              href="/ushop"
              className="ushop-payment-button"
            >
              {isPersian
                ? "بازگشت به UShop"
                : "Back to UShop"}
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      className="ushop-payment-page"
      dir={
        isPersian
          ? "rtl"
          : "ltr"
      }
    >
      <div className="ushop-payment-container">
        <header className="ushop-payment-header">
          <Link
            href="/ushop/checkout"
            className="ushop-payment-back"
          >
            <span>
              {isPersian
                ? "→"
                : "←"}
            </span>

            {isPersian
              ? "بازگشت به تسویه حساب"
              : "Back to Checkout"}
          </Link>

          <div>
            <span>
              UNIQE / USHOP
            </span>

            <h1>
              {isPersian
                ? "پرداخت سفارش"
                : "Order Payment"}
            </h1>

            <p>
              {isPersian
                ? "مرحله آماده‌سازی پرداخت"
                : "Payment preparation stage"}
            </p>
          </div>
        </header>

        <div className="ushop-payment-layout">
          <section className="ushop-payment-main">
            <div className="ushop-payment-placeholder">
              <div className="ushop-payment-placeholder-icon">
                $
              </div>

              <span>
                PAYMENT
                PLACEHOLDER
              </span>

              <h2>
                {isPersian
                  ? "درگاه پرداخت آماده اتصال است"
                  : "Payment Gateway Ready"}
              </h2>

              <p>
                {isPersian
                  ? "ساختار سفارش، وضعیت پرداخت و Order ID ایجاد شده‌اند. اتصال درگاه واقعی در Phase 6 انجام می‌شود."
                  : "The order structure, payment status and Order ID are ready. The real payment gateway will be connected in Phase 6."}
              </p>

              <div className="ushop-payment-status">
                <div>
                  <span>
                    {isPersian
                      ? "وضعیت سفارش"
                      : "Order Status"}
                  </span>

                  <strong>
                    {order.orderStatus}
                  </strong>
                </div>

                <div>
                  <span>
                    {isPersian
                      ? "وضعیت پرداخت"
                      : "Payment Status"}
                  </span>

                  <strong>
                    {order.paymentStatus}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="ushop-payment-action"
                onClick={
                  simulatePayment
                }
                disabled={
                  processing
                }
              >
                {processing
                  ? isPersian
                    ? "در حال آماده‌سازی..."
                    : "Preparing..."
                  : isPersian
                    ? "ادامه با Payment Placeholder"
                    : "Continue with Payment Placeholder"}
              </button>

              {message && (
                <div className="ushop-payment-message">
                  ✓{" "}
                  {message}
                </div>
              )}
            </div>
          </section>

          <aside className="ushop-payment-summary">
            <span>
              {isPersian
                ? "ORDER"
                : "ORDER"}
            </span>

            <div className="ushop-payment-order-id">
              <small>
                {isPersian
                  ? "شناسه سفارش"
                  : "Order ID"}
              </small>

              <strong>
                {order.id}
              </strong>
            </div>

            <div className="ushop-payment-customer">
              <small>
                {isPersian
                  ? "مشتری"
                  : "Customer"}
              </small>

              <strong>
                {
                  order
                    .customer
                    .firstName
                }{" "}
                {
                  order
                    .customer
                    .lastName
                }
              </strong>

              <span>
                {
                  order
                    .customer
                    .email
                }
              </span>
            </div>

            <div className="ushop-payment-products">
              {order.items.map(
                (item) => (
                  <div
                    key={
                      item.productId
                    }
                  >
                    <span>
                      {isPersian
                        ? item.nameFa
                        : item.name}
                      {" × "}
                      {item.quantity}
                    </span>

                    <strong>
                      {formatPrice(
                        item.unitPrice *
                          item.quantity,
                        item.currency,
                      )}
                    </strong>
                  </div>
                ),
              )}
            </div>

            <div className="ushop-payment-total">
              <span>
                {isPersian
                  ? "مبلغ نهایی"
                  : "Final Total"}
              </span>

              <strong>
                {formatPrice(
                  order.total,
                  order.currency,
                )}
              </strong>
            </div>

            <Link
              href="/ushop"
              className="ushop-payment-shop-link"
            >
              {isPersian
                ? "ادامه خرید"
                : "Continue Shopping"}
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}