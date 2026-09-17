"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  readOrder,
  saveOrder,
  type UShopOrder,
} from "@/components/ushop/order";

import "@/components/ushop/payment.css";

type CryptoCode =
  | "USDT"
  | "BTC"
  | "ETH"
  | "LTC"
  | "BNB";

type CryptoPaymentStatus =
  | "waiting"
  | "confirming"
  | "confirmed"
  | "failed"
  | "expired";

type CryptoOption = {
  code: CryptoCode;
  name: string;
  network: string;
  rate: number;
  decimals: number;
  address: string;
};

const CRYPTO_OPTIONS: CryptoOption[] = [
  {
    code: "USDT",
    name: "Tether",
    network: "TRON / TRC-20",
    rate: 1,
    decimals: 2,
    address: "TQdemo7UniqeUSDT8x2P9Example",
  },
  {
    code: "BTC",
    name: "Bitcoin",
    network: "Bitcoin",
    rate: 0.0000092,
    decimals: 8,
    address: "bc1quniqedemo8x2p9example",
  },
  {
    code: "ETH",
    name: "Ethereum",
    network: "Ethereum",
    rate: 0.00038,
    decimals: 6,
    address: "0xUniqeDemoPaymentAddress2026",
  },
  {
    code: "LTC",
    name: "Litecoin",
    network: "Litecoin",
    rate: 0.0072,
    decimals: 6,
    address: "LUniqeDemoPaymentAddress2026",
  },
  {
    code: "BNB",
    name: "BNB",
    network: "BNB Smart Chain",
    rate: 0.00155,
    decimals: 6,
    address: "0xUniqeBNBDemoPayment2026",
  },
];

const DEMO_DURATION_SECONDS = 15 * 60;

function cryptoAmount(
  usdAmount: number,
  option: CryptoOption,
) {
  return usdAmount * option.rate;
}

function shortAddress(address: string) {
  if (address.length <= 18) {
    return address;
  }

  return `${address.slice(0, 9)}...${address.slice(-7)}`;
}

function statusLabel(
  status: CryptoPaymentStatus,
  isPersian: boolean,
) {
  const labels: Record<
    CryptoPaymentStatus,
    { en: string; fa: string }
  > = {
    waiting: {
      en: "Waiting for payment",
      fa: "در انتظار پرداخت",
    },
    confirming: {
      en: "Confirming transaction",
      fa: "در حال تأیید تراکنش",
    },
    confirmed: {
      en: "Payment confirmed",
      fa: "پرداخت تأیید شد",
    },
    failed: {
      en: "Payment failed",
      fa: "پرداخت ناموفق بود",
    },
    expired: {
      en: "Payment expired",
      fa: "مهلت پرداخت تمام شد",
    },
  };

  return isPersian
    ? labels[status].fa
    : labels[status].en;
}

export default function PaymentPage() {
  const { language } = useLanguage();

  const isPersian = language === "fa";

  const [order, setOrder] =
    useState<UShopOrder | null>(null);

  const [loaded, setLoaded] =
    useState(false);

  const [selectedCrypto, setSelectedCrypto] =
    useState<CryptoCode>("USDT");

  const [paymentStatus, setPaymentStatus] =
    useState<CryptoPaymentStatus>("waiting");

  const [secondsLeft, setSecondsLeft] =
    useState(DEMO_DURATION_SECONDS);

  const [copied, setCopied] =
    useState(false);

  const selectedOption = useMemo(
    () =>
      CRYPTO_OPTIONS.find(
        (item) =>
          item.code === selectedCrypto,
      ) ?? CRYPTO_OPTIONS[0],
    [selectedCrypto],
  );

  useEffect(() => {
    const storedOrder = readOrder();

    setOrder(storedOrder);

    if (storedOrder?.paymentStatus === "paid") {
      setPaymentStatus("confirmed");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (
      paymentStatus !== "waiting" ||
      secondsLeft <= 0
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setPaymentStatus("expired");
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [paymentStatus, secondsLeft]);

  const formatPrice = (
    value: number,
    currency: string,
  ) => {
    const formatted =
      new Intl.NumberFormat(
        isPersian ? "fa-IR" : "en-US",
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      ).format(value);

    return currency === "USD"
      ? `$${formatted}`
      : `${formatted} ${currency}`;
  };

  const formatCryptoAmount = (
    value: number,
  ) => {
    return value.toFixed(
      selectedOption.decimals,
    );
  };

  const minutes = Math.floor(
    secondsLeft / 60,
  );

  const seconds = secondsLeft % 60;

  const timerText =
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}`;

  const cryptoPayAmount = order
    ? cryptoAmount(
        order.total,
        selectedOption,
      )
    : 0;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(
        selectedOption.address,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  };

  const simulatePayment = () => {
    if (!order) {
      return;
    }

    if (
      paymentStatus !== "waiting"
    ) {
      return;
    }

    setPaymentStatus("confirming");

    window.setTimeout(() => {
      const updatedOrder: UShopOrder = {
        ...order,
        orderStatus: "confirmed",
        paymentStatus: "paid",
      };

      saveOrder(updatedOrder);
      setOrder(updatedOrder);
      setPaymentStatus("confirmed");
    }, 1800);
  };

  const simulateFailure = () => {
    if (!order) {
      return;
    }

    if (
      paymentStatus !== "waiting"
    ) {
      return;
    }

    setPaymentStatus("confirming");

    window.setTimeout(() => {
      const updatedOrder: UShopOrder = {
        ...order,
        orderStatus: "pending",
        paymentStatus: "failed",
      };

      saveOrder(updatedOrder);
      setOrder(updatedOrder);
      setPaymentStatus("failed");
    }, 1200);
  };

  const resetDemo = () => {
    if (!order) {
      return;
    }

    const updatedOrder: UShopOrder = {
      ...order,
      orderStatus: "pending",
      paymentStatus: "unpaid",
    };

    saveOrder(updatedOrder);
    setOrder(updatedOrder);
    setPaymentStatus("waiting");
    setSecondsLeft(
      DEMO_DURATION_SECONDS,
    );
  };

  if (!loaded) {
    return (
      <main className="ushop-payment-page">
        <div className="ushop-payment-loading">
          {isPersian
            ? "در حال بارگذاری..."
            : "Loading..."}
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main
        className="ushop-payment-page"
        dir={isPersian ? "rtl" : "ltr"}
      >
        <div className="ushop-payment-container">
          <section className="ushop-payment-empty">
            <span>UNIQE / PAYMENT</span>

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
      dir={isPersian ? "rtl" : "ltr"}
    >
      <div className="ushop-payment-container">

        <header className="ushop-payment-header">
          <div className="ushop-payment-demo-banner">
            <span>●</span>

            {isPersian
              ? "حالت پرداخت آزمایشی"
              : "DEMO PAYMENT MODE"}
          </div>

          <span>UNIQE / PAYMENT</span>

          <h1>
            {isPersian
              ? "پرداخت رمزارزی"
              : "Crypto Payment"}
          </h1>

          <p>
            {isPersian
              ? "این صفحه یک شبیه‌ساز پرداخت است و هیچ تراکنش واقعی روی شبکه بلاکچین انجام نمی‌دهد."
              : "This page is a payment simulator. No real blockchain transaction is performed."}
          </p>
        </header>

        <div className="ushop-payment-layout">

          <section className="ushop-payment-main">

            <div className="ushop-payment-placeholder">

              <div className="ushop-payment-placeholder-icon">
                ₿
              </div>

              <span>
                CRYPTO PAYMENT SIMULATOR
              </span>

              <h2>
                {isPersian
                  ? "ارز دیجیتال خود را انتخاب کنید"
                  : "Choose your cryptocurrency"}
              </h2>

              <p>
                {isPersian
                  ? "نرخ‌های زیر نمونه هستند و به بازار واقعی متصل نیستند."
                  : "The rates below are demo rates and are not connected to live markets."}
              </p>

              <div className="ushop-crypto-grid">
                {CRYPTO_OPTIONS.map(
                  (option) => {
                    const active =
                      option.code ===
                      selectedCrypto;

                    return (
                      <button
                        key={option.code}
                        type="button"
                        className={
                          active
                            ? "ushop-crypto-card is-active"
                            : "ushop-crypto-card"
                        }
                        onClick={() => {
                          if (
                            paymentStatus ===
                            "waiting"
                          ) {
                            setSelectedCrypto(
                              option.code,
                            );
                          }
                        }}
                      >
                        <strong>
                          {option.code}
                        </strong>

                        <span>
                          {option.name}
                        </span>

                        <small>
                          {option.network}
                        </small>
                      </button>
                    );
                  },
                )}
              </div>

              {paymentStatus ===
                "waiting" && (
                <>
                  <div className="ushop-payment-invoice">

                    <div>
                      <span>
                        {isPersian
                          ? "مبلغ سفارش"
                          : "Order Amount"}
                      </span>

                      <strong>
                        {formatPrice(
                          order.total,
                          order.currency,
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        {isPersian
                          ? "مبلغ پرداخت"
                          : "Pay Amount"}
                      </span>

                      <strong>
                        {formatCryptoAmount(
                          cryptoPayAmount,
                        )}{" "}
                        {selectedOption.code}
                      </strong>
                    </div>

                  </div>

                  <div className="ushop-payment-amount">

                    <span>
                      {isPersian
                        ? "مبلغ رمزارزی"
                        : "Crypto Amount"}
                    </span>

                    <strong>
                      {formatCryptoAmount(
                        cryptoPayAmount,
                      )}{" "}
                      {selectedOption.code}
                    </strong>

                    <small>
                      Demo rate • 1 USD ≈{" "}
                      {selectedOption.rate}{" "}
                      {selectedOption.code}
                    </small>

                  </div>

                  <div className="ushop-payment-address">

                    <div>
                      <span>
                        {isPersian
                          ? "آدرس پرداخت آزمایشی"
                          : "Demo Payment Address"}
                      </span>

                      <strong>
                        {shortAddress(
                          selectedOption.address,
                        )}
                      </strong