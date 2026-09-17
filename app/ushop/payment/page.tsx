"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  readOrder,
  saveOrder,
  type PaymentStatus,
  type UShopOrder,
} from "@/components/ushop/order";

import "@/components/ushop/payment.css";

type CryptoCurrency =
  | "USDT"
  | "BTC"
  | "ETH"
  | "LTC"
  | "BNB";

type CryptoOption = {
  symbol: CryptoCurrency;
  name: string;
  network: string;
  rate: number;
  decimals: number;
};

const CRYPTO_OPTIONS: CryptoOption[] = [
  {
    symbol: "USDT",
    name: "Tether",
    network: "TRON / TRC-20",
    rate: 1,
    decimals: 2,
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    network: "Bitcoin",
    rate: 0.0000092,
    decimals: 8,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    network: "Ethereum",
    rate: 0.00038,
    decimals: 6,
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    network: "Litecoin",
    rate: 0.0072,
    decimals: 6,
  },
  {
    symbol: "BNB",
    name: "BNB",
    network: "BNB Smart Chain",
    rate: 0.00155,
    decimals: 6,
  },
];

const DEMO_ADDRESS: Record<
  CryptoCurrency,
  string
> = {
  USDT:
    "TDEMO7UNIQE4CRYPTO9PAYMENT2TEST",
  BTC:
    "bc1quniqe7demopayment8test",
  ETH:
    "0xUniqeDemoPaymentAddress000000",
  LTC:
    "LUniqeDemoPaymentAddress0000",
  BNB:
    "0xUniqeDemoBnbPaymentAddress000",
};

const DEMO_DURATION = 15 * 60;

function cryptoAmount(
  usdAmount: number,
  option: CryptoOption,
) {
  return (
    usdAmount * option.rate
  ).toFixed(option.decimals);
}

function shortAddress(
  address: string,
) {
  if (address.length <= 24) {
    return address;
  }

  return `${address.slice(
    0,
    12,
  )}...${address.slice(-10)}`;
}

function statusLabel(
  status: PaymentStatus,
  isPersian: boolean,
) {
  const labels: Record<
    PaymentStatus,
    {
      en: string;
      fa: string;
    }
  > = {
    waiting: {
      en: "Waiting for payment",
      fa: "در انتظار پرداخت",
    },
    confirming: {
      en: "Confirming payment",
      fa: "در حال تأیید پرداخت",
    },
    confirmed: {
      en: "Payment confirmed",
      fa: "پرداخت تأیید شد",
    },
    failed: {
      en: "Payment failed",
      fa: "پرداخت ناموفق",
    },
    expired: {
      en: "Payment expired",
      fa: "پرداخت منقضی شد",
    },
  };

  return isPersian
    ? labels[status].fa
    : labels[status].en;
}

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

  const [currency, setCurrency] =
    useState<CryptoCurrency>(
      "USDT",
    );

  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>(
      "waiting",
    );

  const [processing, setProcessing] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [secondsLeft, setSecondsLeft] =
    useState(DEMO_DURATION);

  const selectedCrypto =
    useMemo(
      () =>
        CRYPTO_OPTIONS.find(
          (item) =>
            item.symbol === currency,
        ) ??
        CRYPTO_OPTIONS[0],
      [currency],
    );

  const payAmount =
    useMemo(() => {
      if (!order) {
        return "0";
      }

      return cryptoAmount(
        order.total,
        selectedCrypto,
      );
    }, [
      order,
      selectedCrypto,
    ]);

  const paymentAddress =
    DEMO_ADDRESS[currency];

  useEffect(() => {
    const storedOrder =
      readOrder();

    setOrder(storedOrder);

    if (
      storedOrder?.paymentStatus ===
      "paid"
    ) {
      setPaymentStatus(
        "confirmed",
      );
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (
      paymentStatus !==
      "waiting"
    ) {
      return;
    }

    if (secondsLeft <= 0) {
      setPaymentStatus(
        "expired",
      );
      return;
    }

    const timer =
      window.setInterval(() => {
        setSecondsLeft(
          (current) =>
            Math.max(
              0,
              current - 1,
            ),
        );
      }, 1000);

    return () =>
      window.clearInterval(
        timer,
      );
  }, [
    paymentStatus,
    secondsLeft,
  ]);

  const formattedTime =
    `${Math.floor(
      secondsLeft / 60,
    )
      .toString()
      .padStart(2, "0")}:${(
      secondsLeft % 60
    )
      .toString()
      .padStart(2, "0")}`;

  const formatPrice = (
    value: number,
    currencyCode: string,
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

    return currencyCode ===
      "USD"
      ? `$${formatted}`
      : `${formatted} ${currencyCode}`;
  };

  const copyAddress =
    async () => {
      try {
        await navigator.clipboard.writeText(
          paymentAddress,
        );

        setCopied(true);

        window.setTimeout(
          () =>
            setCopied(false),
          1800,
        );
      } catch {
        setCopied(false);
      }
    };

  const simulatePayment =
    () => {
      if (
        !order ||
        processing ||
        paymentStatus ===
          "confirmed"
      ) {
        return;
      }

      if (
        paymentStatus ===
        "expired"
      ) {
        return;
      }

      setProcessing(true);

      setPaymentStatus(
        "confirming",
      );

      window.setTimeout(
        () => {
          const updatedOrder: UShopOrder =
            {
              ...order,
              orderStatus:
                "confirmed",
              paymentStatus:
                "paid",
            };

          saveOrder(
            updatedOrder,
          );

          setOrder(
            updatedOrder,
          );

          setPaymentStatus(
            "confirmed",
          );

          setProcessing(
            false,
          );
        },
        1800,
      );
    };

  const simulateFailure =
    () => {
      if (
        !order ||
        processing
      ) {
        return;
      }

      setProcessing(true);

      setPaymentStatus(
        "confirming",
      );

      window.setTimeout(
        () => {
          const updatedOrder: UShopOrder =
            {
              ...order,
              orderStatus:
                "pending",
              paymentStatus:
                "failed",
            };

          saveOrder(
            updatedOrder,
          );

          setOrder(
            updatedOrder,
          );

          setPaymentStatus(
            "failed",
          );

          setProcessing(
            false,
          );
        },
        1200,
      );
    };

  const resetDemo =
    () => {
      if (!order) {
        return;
      }

      const updatedOrder: UShopOrder =
        {
          ...order,
          orderStatus:
            "pending",
          paymentStatus:
            "unpaid",
        };

      saveOrder(
        updatedOrder,
      );

      setOrder(
        updatedOrder,
      );

      setPaymentStatus(
        "waiting",
      );

      setSecondsLeft(
        DEMO_DURATION,
      );

      setProcessing(
        false,
      );
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
              UNIQE / PAYMENT
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
              UNIQE / CRYPTO PAYMENT
            </span>

            <h1>
              {isPersian
                ? "پرداخت رمزارزی"
                : "Crypto Payment"}
            </h1>

            <p>
              {isPersian
                ? "محیط شبیه‌سازی پرداخت رمزارزی برای تست UShop"
                : "Crypto payment simulation environment for UShop testing"}
            </p>
          </div>
        </header>

        <div className="ushop-payment-demo-banner">
          <span className="ushop-payment-demo-dot" />

          <div>
            <strong>
              {isPersian
                ? "DEMO PAYMENT MODE"
                : "DEMO PAYMENT MODE"}
            </strong>

            <p>
              {isPersian
                ? "این پرداخت کاملاً آزمایشی است و هیچ تراکنش واقعی روی بلاکچین انجام نمی‌شود."
                : "This is a fully simulated payment. No real blockchain transaction is performed."}
            </p>
          </div>
        </div>

        <div className="ushop-payment-layout">
          <section className="ushop-payment-main">
            <div className="ushop-payment-placeholder">
              {paymentStatus ===
              "confirmed" ? (
                <div className="ushop-payment-success">
                  <div className="ushop-payment-success-icon">
                    ✓
                  </div>

                  <span>
                    PAYMENT
                    CONFIRMED
                  </span>

                  <h2>
                    {isPersian
                      ? "پرداخت با موفقیت تأیید شد"
                      : "Payment confirmed successfully"}
                  </h2>

                  <p>
                    {isPersian
                      ? "این تراکنش آزمایشی با موفقیت ثبت شد و وضعیت سفارش به Paid تغییر کرد."
                      : "This demo transaction was successfully recorded and the order is now marked as paid."}
                  </p>

                  <Link
                    href="/ushop"
                    className="ushop-payment-action-link"
                  >
                    {isPersian
                      ? "بازگشت به UShop"
                      : "Back to UShop"}
                  </Link>
                </div>
              ) : (
                <>
                  <div className="ushop-payment-placeholder-icon crypto">
                    ₿
                  </div>

                  <span>
                    CRYPTO
                    CHECKOUT
                  </span>

                  <h2>
                    {isPersian
                      ? "ارز پرداخت را انتخاب کنید"
                      : "Choose your payment currency"}
                  </h2>

                  <p>
                    {isPersian
                      ? "یک ارز را انتخاب کنید. مقدار پرداخت و آدرس آزمایشی به‌صورت خودکار ایجاد می‌شود."
                      : "Select a currency. The demo amount and payment address will be generated automatically."}
                  </p>

                  <div className="ushop-crypto-grid">
                    {CRYPTO_OPTIONS.map(
                      (
                        option,
                      ) => (
                        <button
                          type="button"
                          key={
                            option.symbol
                          }
                          className={
                            currency ===
                            option.symbol
                              ? "active"
                              : ""
                          }
                          onClick={() => {
                            setCurrency(
                              option.symbol,
                            );
                            setCopied(
                              false,
                            );
                          }}
                          disabled={
                            processing
                          }
                        >
                          <strong>
                            {option.symbol}
                          </strong>

                          <span>
                            {
                              option.name
                            }
                          </span>
                        </button>
                      ),
                    )}
                  </div>

                  <div className="ushop-payment-invoice">
                    <div className="ushop-payment-invoice-top">
                      <div>
                        <small>
                          {isPersian
                            ? "شبکه"
                            : "NETWORK"}
                        </small>

                        <strong>
                          {
                            selectedCrypto.network
                          }
                        </strong>
                      </div>

                      <div className="ushop-payment-countdown">
                        <small>
                          {isPersian
                            ? "زمان باقی‌مانده"
                            : "EXPIRES IN"}
                        </small>

                        <strong
                          className={
                            secondsLeft <=
                            60
                              ? "warning"
                              : ""
                          }
                        >
                          {
                            formattedTime
                          }
                        </strong>
                      </div>
                    </div>

                    <div className="ushop-payment-amount">
                      <small>
                        {isPersian
                          ? "مقدار پرداخت"
                          : "AMOUNT TO PAY"}
                      </small>

                      <strong>
                        {
                          payAmount
                        }{" "}
                        {
                          currency
                        }
                      </strong>

                      <span>
                        ≈{" "}
                        {formatPrice(
                          order.total,
                          order.currency,
                        )}
                      </span>
                    </div>

                    <div className="ushop-payment-address">
                      <div>
                        <small>
                          {isPersian
                            ? "آدرس پرداخت آزمایشی"
                            : "DEMO PAYMENT ADDRESS"}
                        </small>

                        <strong>
                          {
                            shortAddress(
                              paymentAddress,
                            )
                          }
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={
                          copyAddress
                        }
                      >
                        {copied
                          ? "✓"
                          : isPersian
                            ? "کپی"
                            : "COPY"}
                      </button>
                    </div>
                  </div>

                  <div className="ushop-payment-status crypto-status">
                    <div>
                      <span>
                        {isPersian
                          ? "وضعیت پرداخت"
                          : "Payment Status"}
                      </span>

                      <strong
                        className={`status-${paymentStatus}`}
                      >
                        {statusLabel(
                          paymentStatus,
                          isPersian,
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        {isPersian
                          ? "Order ID"
                          : "Order ID"}
                      </span>

                      <strong>
                        {
                          order.id
                        }
                      </strong>
                    </div>
                  </div>

                  {paymentStatus ===
                  "failed" ? (
                    <button
                      type="button"
                      className="ushop-payment-action"
                      onClick={
                        resetDemo
                      }
                      disabled={
                        processing
                      }
                    >
                      {isPersian
                        ? "تلاش دوباره"
                        : "Try Again"}
                    </button>
                  ) : paymentStatus ===
                    "expired" ? (
                    <button
                      type="button"
                      className="ushop-payment-action"
                      onClick={
                        resetDemo
                      }
                    >
                      {isPersian
                        ? "ایجاد پرداخت جدید"
                        : "Create New Payment"}
                    </button>
                  ) : (
                    <>
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
                            ? "در حال تأیید..."
                            : "Confirming..."
                          : isPersian
                            ? "شبیه‌سازی پرداخت موفق"
                            : "Simulate Successful Payment"}
                      </button>

                      <button
                        type="button"
                        className="ushop-payment-failure-action"
                        onClick={
                          simulateFailure
                        }
                        disabled={
                          processing
                        }
                      >
                        {isPersian
                          ? "شبیه‌سازی پرداخت ناموفق"
                          : "Simulate Failed Payment"}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </section>

          <aside className="ushop-payment-summary">
            <span>
              ORDER SUMMARY
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
                  order.customer
                    .firstName
                }{" "}
                {
                  order.customer
                    .lastName
                }
              </strong>

              <span>
                {
                  order.customer
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
                      {
                        item.quantity
                      }
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

            <div className="ushop-payment-demo-note">
              <span>◎</span>

              <p>
                {isPersian
                  ? "قیمت‌های رمزارزی در این مرحله صرفاً نمونه هستند و نرخ بازار واقعی نیستند."
                  : "Crypto rates in this demo are sample values and are not live market rates."}
              </p>
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