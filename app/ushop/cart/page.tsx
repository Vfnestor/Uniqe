"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ushopProducts } from "@/components/ushop/products";

import "@/components/ushop/cart.css";

type CartItem = {
  productId: string;
  quantity: number;
};

type ResolvedCartItem = {
  product: (typeof ushopProducts)[number];
  quantity: number;
};

const CART_KEY = "uniqe-cart";
const DISCOUNT_CODE = "UNIQE10";

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is CartItem => {
        if (!item || typeof item !== "object") {
          return false;
        }

        const candidate = item as Record<string, unknown>;

        return (
          typeof candidate.productId === "string" &&
          typeof candidate.quantity === "number" &&
          Number.isFinite(candidate.quantity) &&
          candidate.quantity > 0
        );
      })
      .map((item) => ({
        productId: item.productId,
        quantity: Math.max(1, Math.floor(item.quantity)),
      }));
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart),
  );

  window.dispatchEvent(new Event("uniqe-cart-updated"));
}

function formatPrice(
  value: number,
  currency: string,
  isPersian: boolean,
) {
  const formatted = new Intl.NumberFormat(
    isPersian ? "fa-IR" : "en-US",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  ).format(value);

  if (currency === "USD") {
    return `$${formatted}`;
  }

  return `${formatted} ${currency}`;
}

export default function CartPage() {
  const { language } = useLanguage();

  const isPersian = language === "fa";

  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] =
    useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(readCart());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    saveCart(cart);
  }, [cart, mounted]);

  const resolvedItems = useMemo<ResolvedCartItem[]>(() => {
    return cart
      .map((item) => {
        const product = ushopProducts.find(
          (candidate) => candidate.id === item.productId,
        );

        if (!product) {
          return null;
        }

        return {
          product,
          quantity: item.quantity,
        };
      })
      .filter(
        (item): item is ResolvedCartItem =>
          item !== null,
      );
  }, [cart]);

  const currency =
    resolvedItems[0]?.product.currency ?? "USD";

  const subtotal = useMemo(() => {
    return resolvedItems.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0,
    );
  }, [resolvedItems]);

  const discount = discountApplied
    ? subtotal * 0.1
    : 0;

  const total = subtotal - discount;

  const itemCount = resolvedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const updateQuantity = (
    productId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      setCart((current) =>
        current.filter(
          (item) => item.productId !== productId,
        ),
      );

      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  };

  const removeItem = (productId: string) => {
    setCart((current) =>
      current.filter(
        (item) => item.productId !== productId,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountApplied(false);
    setDiscountCode("");
  };

  const applyDiscount = () => {
    const normalizedCode = discountCode
      .trim()
      .toUpperCase();

    setDiscountApplied(
      normalizedCode === DISCOUNT_CODE,
    );
  };

  if (!mounted) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="cart-loading">
            <span />
            <span />
            <span />
          </div>
        </div>
      </main>
    );
  }

  if (resolvedItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <header className="cart-header">
            <div>
              <span className="cart-eyebrow">
                {isPersian
                  ? "فروشگاه Uniqe"
                  : "Uniqe UShop"}
              </span>

              <h1>
                {isPersian
                  ? "سبد خرید"
                  : "Shopping Cart"}
              </h1>

              <p>
                {isPersian
                  ? "سبد خرید شما در حال حاضر خالی است."
                  : "Your shopping cart is currently empty."}
              </p>
            </div>
          </header>

          <section className="cart-empty">
            <div className="cart-empty-icon">
              🛒
            </div>

            <h2>
              {isPersian
                ? "هنوز محصولی انتخاب نکرده‌اید"
                : "Your cart is empty"}
            </h2>

            <p>
              {isPersian
                ? "محصولات موردنظرتان را از UShop انتخاب کنید و به سبد خرید اضافه کنید."
                : "Explore UShop and add the products you want to your cart."}
            </p>

            <Link
              href="/ushop"
              className="cart-primary-button"
            >
              {isPersian
                ? "مشاهده محصولات"
                : "Explore Products"}
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <header className="cart-header">
          <div>
            <span className="cart-eyebrow">
              {isPersian
                ? "فروشگاه Uniqe"
                : "Uniqe UShop"}
            </span>

            <h1>
              {isPersian
                ? "سبد خرید"
                : "Shopping Cart"}
            </h1>

            <p>
              {isPersian
                ? `${itemCount} آیتم در سبد خرید شما`
                : `${itemCount} item${
                    itemCount === 1 ? "" : "s"
                  } in your cart`}
            </p>
          </div>

          <button
            type="button"
            className="cart-clear-button"
            onClick={clearCart}
          >
            {isPersian
              ? "خالی کردن سبد"
              : "Clear Cart"}
          </button>
        </header>

        <div className="cart-layout">
          <section className="cart-items">
            {resolvedItems.map(
              ({ product, quantity }) => {
                const name = isPersian
                  ? product.nameFa
                  : product.name;

                const category = isPersian
                  ? product.categoryLabelFa
                  : product.categoryLabel;

                return (
                  <article
                    key={product.id}
                    className="cart-item"
                  >
                    <Link
                      href={product.href}
                      className="cart-item-visual"
                      aria-label={name}
                    >
                      <span>
                        {product.icon}
                      </span>
                    </Link>

                    <div className="cart-item-main">
                      <div className="cart-item-heading">
                        <div>
                          <span className="cart-item-category">
                            {category}
                          </span>

                          <Link
                            href={product.href}
                            className="cart-item-title"
                          >
                            {name}
                          </Link>
                        </div>

                        <button
                          type="button"
                          className="cart-remove-button"
                          onClick={() =>
                            removeItem(product.id)
                          }
                          aria-label={
                            isPersian
                              ? `حذف ${name}`
                              : `Remove ${name}`
                          }
                        >
                          ×
                        </button>
                      </div>

                      {product.sku && (
                        <span className="cart-item-sku">
                          SKU: {product.sku}
                        </span>
                      )}

                      <div className="cart-item-bottom">
                        <div className="cart-quantity">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                quantity - 1,
                              )
                            }
                            aria-label={
                              isPersian
                                ? "کاهش تعداد"
                                : "Decrease quantity"
                            }
                          >
                            −
                          </button>

                          <span>{quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                quantity + 1,
                              )
                            }
                            aria-label={
                              isPersian
                                ? "افزایش تعداد"
                                : "Increase quantity"
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className="cart-item-price">
                          {formatPrice(
                            product.price *
                              quantity,
                            product.currency,
                            isPersian,
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </section>

          <aside className="cart-summary">
            <div className="cart-summary-card">
              <div className="cart-summary-heading">
                <h2>
                  {isPersian
                    ? "خلاصه سفارش"
                    : "Order Summary"}
                </h2>
              </div>

              <div className="cart-summary-row">
                <span>
                  {isPersian
                    ? "جمع محصولات"
                    : "Subtotal"}
                </span>

                <strong>
                  {formatPrice(
                    subtotal,
                    currency,
                    isPersian,
                  )}
                </strong>
              </div>

              <div className="cart-discount">
                <label htmlFor="discount-code">
                  {isPersian
                    ? "کد تخفیف"
                    : "Discount Code"}
                </label>

                <div className="cart-discount-input">
                  <input
                    id="discount-code"
                    type="text"
                    value={discountCode}
                    onChange={(event) =>
                      setDiscountCode(
                        event.target.value,
                      )
                    }
                    placeholder={
                      isPersian
                        ? "کد تخفیف"
                        : "Discount code"
                    }
                  />

                  <button
                    type="button"
                    onClick={applyDiscount}
                  >
                    {isPersian
                      ? "اعمال"
                      : "Apply"}
                  </button>
                </div>

                {discountApplied && (
                  <span className="cart-discount-success">
                    {isPersian
                      ? "۱۰٪ تخفیف اعمال شد."
                      : "10% discount applied."}
                  </span>
                )}

                {!discountApplied &&
                  discountCode.trim().length > 0 && (
                    <span className="cart-discount-error">
                      {isPersian
                        ? "کد تخفیف معتبر نیست."
                        : "Invalid discount code."}
                    </span>
                  )}
              </div>

              {discountApplied && (
                <div className="cart-summary-row cart-discount-row">
                  <span>
                    {isPersian
                      ? "تخفیف"
                      : "Discount"}
                  </span>

                  <strong>
                    −
                    {formatPrice(
                      discount,
                      currency,
                      isPersian,
                    )}
                  </strong>
                </div>
              )}

              <div className="cart-summary-divider" />

              <div className="cart-summary-total">
                <span>
                  {isPersian
                    ? "مبلغ نهایی"
                    : "Total"}
                </span>

                <strong>
                  {formatPrice(
                    total,
                    currency,
                    isPersian,
                  )}
                </strong>
              </div>

              <Link
                href="/ushop/checkout"
                className="cart-checkout-button"
              >
                {isPersian
                  ? "ادامه و تسویه حساب"
                  : "Proceed to Checkout"}
              </Link>

              <Link
                href="/ushop"
                className="cart-continue-button"
              >
                {isPersian
                  ? "ادامه خرید"
                  : "Continue Shopping"}
              </Link>

              <p className="cart-payment-note">
                {isPersian
                  ? "پرداخت واقعی در فاز ۶ به درگاه پرداخت متصل خواهد شد."
                  : "Real payment gateway integration will be connected in Phase 6."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}