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

type CartProductItem = {
  product: (typeof ushopProducts)[number];
  quantity: number;
};

const CART_KEY = "uniqe-cart";

const DISCOUNT_CODE = "UNIQE10";
const DISCOUNT_RATE = 0.1;

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

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(
      CART_KEY,
    );

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

        const candidate =
          item as Record<string, unknown>;

        return (
          typeof candidate.productId === "string" &&
          typeof candidate.quantity === "number" &&
          Number.isFinite(candidate.quantity) &&
          candidate.quantity > 0
        );
      })
      .map((item) => ({
        productId: item.productId,
        quantity: Math.max(
          1,
          Math.floor(item.quantity),
        ),
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

  window.dispatchEvent(
    new Event("uniqe-cart-updated"),
  );
}

export default function CartPage() {
  const { language } = useLanguage();

  const isPersian = language === "fa";

  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] =
    useState(false);
  const [discountError, setDiscountError] =
    useState(false);
  const [isLoaded, setIsLoaded] =
    useState(false);

  useEffect(() => {
    const initialCart = readCart();

    setCart(initialCart);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    saveCart(cart);
  }, [cart, isLoaded]);

  const cartProducts = useMemo<CartProductItem[]>(
    () => {
      return cart
        .map((item) => {
          const product = ushopProducts.find(
            (candidate) =>
              candidate.id === item.productId,
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
          (
            item,
          ): item is CartProductItem =>
            item !== null,
        );
    },
    [cart],
  );

  const itemCount = useMemo(
    () =>
      cartProducts.reduce(
        (total, item) =>
          total + item.quantity,
        0,
      ),
    [cartProducts],
  );

  const subtotal = useMemo(
    () =>
      cartProducts.reduce(
        (total, item) =>
          total +
          item.product.price *
            item.quantity,
        0,
      ),
    [cartProducts],
  );

  const discount = discountApplied
    ? subtotal * DISCOUNT_RATE
    : 0;

  const total = Math.max(
    0,
    subtotal - discount,
  );

  const updateQuantity = (
    productId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      setCart((current) =>
        current.filter(
          (item) =>
            item.productId !== productId,
        ),
      );

      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.floor(quantity),
              ),
            }
          : item,
      ),
    );
  };

  const removeItem = (
    productId: string,
  ) => {
    setCart((current) =>
      current.filter(
        (item) =>
          item.productId !== productId,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountApplied(false);
    setDiscountCode("");
    setDiscountError(false);
  };

  const applyDiscount = () => {
    const normalizedCode =
      discountCode
        .trim()
        .replace(/\s+/g, "")
        .toUpperCase();

    setDiscountError(false);

    if (
      normalizedCode ===
      DISCOUNT_CODE
    ) {
      setDiscountCode(
        DISCOUNT_CODE,
      );

      setDiscountApplied(true);

      return;
    }

    setDiscountApplied(false);
    setDiscountError(true);
  };

  const handleDiscountKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (
        !discountApplied &&
        discountCode.trim()
      ) {
        applyDiscount();
      }
    }
  };

  if (!isLoaded) {
    return (
      <main className="ushop-cart-page">
        <div className="ushop-cart-loading">
          <span />
          <span />
          <span />
        </div>
      </main>
    );
  }

  return (
    <main
      className="ushop-cart-page"
      dir={isPersian ? "rtl" : "ltr"}
    >
      <div className="ushop-cart-container">
        <header className="ushop-cart-header">
          <div className="ushop-cart-heading-block">
            <span className="ushop-cart-kicker">
              {isPersian
                ? "UNIQE / USHOP"
                : "UNIQE / USHOP"}
            </span>

            <h1>
              {isPersian
                ? "سبد خرید"
                : "Shopping Cart"}
            </h1>

            <p>
              {isPersian
                ? `${itemCount} محصول در سبد خرید شما`
                : `${itemCount} ${
                    itemCount === 1
                      ? "item"
                      : "items"
                  } in your cart`}
            </p>
          </div>

          {cartProducts.length > 0 && (
            <button
              type="button"
              className="ushop-cart-clear"
              onClick={clearCart}
            >
              <span className="ushop-cart-clear-icon">
                ×
              </span>

              <span>
                {isPersian
                  ? "پاک کردن سبد"
                  : "Clear Cart"}
              </span>
            </button>
          )}
        </header>

        {cartProducts.length === 0 ? (
          <section className="ushop-cart-empty">
            <div className="ushop-cart-empty-orbit">
              <div className="ushop-cart-empty-icon">
                🛒
              </div>
            </div>

            <span className="ushop-cart-empty-label">
              {isPersian
                ? "سبد خرید خالی است"
                : "YOUR CART IS EMPTY"}
            </span>

            <h2>
              {isPersian
                ? "هنوز چیزی انتخاب نکرده‌اید."
                : "Nothing is here yet."}
            </h2>

            <p>
              {isPersian
                ? "محصولات UShop را بررسی کنید و تجربه بعدی خود را از اکوسیستم Uniqe انتخاب کنید."
                : "Explore UShop and discover your next experience from the Uniqe ecosystem."}
            </p>

            <Link
              href="/ushop"
              className="ushop-cart-primary-button"
            >
              <span>
                {isPersian
                  ? "مشاهده محصولات"
                  : "Explore Products"}
              </span>

              <span className="ushop-cart-button-arrow">
                {isPersian
                  ? "←"
                  : "→"}
              </span>
            </Link>
          </section>
        ) : (
          <>
            <div className="ushop-cart-layout">
              <section className="ushop-cart-items-section">
                <div className="ushop-cart-section-header">
                  <div>
                    <span>
                      {isPersian
                        ? "محصولات انتخاب‌شده"
                        : "SELECTED PRODUCTS"}
                    </span>

                    <h2>
                      {isPersian
                        ? "آماده برای مرحله بعد"
                        : "Ready for the next step"}
                    </h2>
                  </div>

                  <div className="ushop-cart-count-badge">
                    {String(itemCount).padStart(
                      2,
                      "0",
                    )}
                  </div>
                </div>

                <div className="ushop-cart-items">
                  {cartProducts.map(
                    ({
                      product,
                      quantity,
                    }) => {
                      const name =
                        isPersian
                          ? product.nameFa
                          : product.name;

                      const category =
                        isPersian
                          ? product.categoryLabelFa
                          : product.categoryLabel;

                      const unitPrice =
                        formatPrice(
                          product.price,
                          product.currency,
                          isPersian,
                        );

                      const lineTotal =
                        formatPrice(
                          product.price *
                            quantity,
                          product.currency,
                          isPersian,
                        );

                      return (
                        <article
                          className="ushop-cart-item"
                          key={product.id}
                        >
                          <Link
                            href={`/ushop/products/${product.slug}`}
                            className="ushop-cart-product-visual"
                            aria-label={name}
                          >
                            <div className="ushop-cart-product-grid" />

                            <span className="ushop-cart-product-icon">
                              {product.icon}
                            </span>

                            <span className="ushop-cart-product-number">
                              {product.number}
                            </span>
                          </Link>

                          <div className="ushop-cart-product-main">
                            <div className="ushop-cart-product-top">
                              <div className="ushop-cart-product-info">
                                <div className="ushop-cart-product-meta">
                                  <span>
                                    {category}
                                  </span>

                                  {product.sku && (
                                    <>
                                      <i />

                                      <span>
                                        {product.sku}
                                      </span>
                                    </>
                                  )}
                                </div>

                                <Link
                                  href={`/ushop/products/${product.slug}`}
                                  className="ushop-cart-product-name"
                                >
                                  {name}
                                </Link>

                                <span className="ushop-cart-product-unit-price">
                                  {isPersian
                                    ? `قیمت واحد: ${unitPrice}`
                                    : `Unit price: ${unitPrice}`}
                                </span>
                              </div>

                              <button
                                type="button"
                                className="ushop-cart-remove"
                                onClick={() =>
                                  removeItem(
                                    product.id,
                                  )
                                }
                                aria-label={
                                  isPersian
                                    ? `حذف ${name}`
                                    : `Remove ${name}`
                                }
                              >
                                <span>
                                  ×
                                </span>

                                <small>
                                  {isPersian
                                    ? "حذف"
                                    : "Remove"}
                                </small>
                              </button>
                            </div>

                            <div className="ushop-cart-product-bottom">
                              <div className="ushop-cart-quantity">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      product.id,
                                      quantity -
                                        1,
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

                                <span>
                                  {quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      product.id,
                                      quantity +
                                        1,
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

                              <div className="ushop-cart-line-total">
                                <small>
                                  {isPersian
                                    ? "جمع"
                                    : "Line total"}
                                </small>

                                <strong>
                                  {lineTotal}
                                </strong>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    },
                  )}
                </div>
              </section>

              <aside className="ushop-cart-summary">
                <div className="ushop-cart-summary-glow" />

                <div className="ushop-cart-summary-inner">
                  <div className="ushop-cart-summary-header">
                    <div>
                      <span>
                        {isPersian
                          ? "خلاصه سفارش"
                          : "ORDER SUMMARY"}
                      </span>

                      <h2>
                        {isPersian
                          ? "جزئیات پرداخت"
                          : "Payment Details"}
                      </h2>
                    </div>

                    <div className="ushop-cart-summary-mark">
                      U
                    </div>
                  </div>

                  <div className="ushop-cart-summary-lines">
                    <div>
                      <span>
                        {isPersian
                          ? "تعداد محصولات"
                          : "Items"}
                      </span>

                      <strong>
                        {itemCount}
                      </strong>
                    </div>

                    <div>
                      <span>
                        {isPersian
                          ? "جمع محصولات"
                          : "Subtotal"}
                      </span>

                      <strong>
                        {formatPrice(
                          subtotal,
                          "USD",
                          isPersian,
                        )}
                      </strong>
                    </div>

                    {discountApplied && (
                      <div className="ushop-cart-discount-line">
                        <span>
                          <i>−</i>

                          {isPersian
                            ? "تخفیف ۱۰٪"
                            : "10% Discount"}
                        </span>

                        <strong>
                          −
                          {formatPrice(
                            discount,
                            "USD",
                            isPersian,
                          )}
                        </strong>
                      </div>
                    )}
                  </div>

                  <div className="ushop-cart-divider" />

                  <div className="ushop-cart-total">
                    <div>
                      <span>
                        {isPersian
                          ? "مبلغ نهایی"
                          : "TOTAL"}
                      </span>

                      <small>
                        {isPersian
                          ? "قبل از پرداخت نهایی"
                          : "Before final payment"}
                      </small>
                    </div>

                    <strong>
                      {formatPrice(
                        total,
                        "USD",
                        isPersian,
                      )}
                    </strong>
                  </div>

                  <div className="ushop-cart-discount">
                    <label htmlFor="discount-code">
                      {isPersian
                        ? "کد تخفیف"
                        : "PROMO CODE"}
                    </label>

                    <div className="ushop-cart-discount-input">
                      <input
                        id="discount-code"
                        type="text"
                        value={discountCode}
                        onChange={(event) => {
                          setDiscountCode(
                            event.target.value,
                          );

                          setDiscountError(
                            false,
                          );

                          if (
                            discountApplied
                          ) {
                            setDiscountApplied(
                              false,
                            );
                          }
                        }}
                        onKeyDown={
                          handleDiscountKeyDown
                        }
                        placeholder={
                          isPersian
                            ? "UNIQE10"
                            : "UNIQE10"
                        }
                        autoComplete="off"
                        spellCheck={false}
                        disabled={
                          false
                        }
                      />

                      <button
                        type="button"
                        onClick={
                          applyDiscount
                        }
                        disabled={
                          !discountCode.trim()
                        }
                      >
                        {discountApplied
                          ? "✓"
                          : isPersian
                            ? "اعمال"
                            : "Apply"}
                      </button>
                    </div>

                    {discountApplied && (
                      <p className="ushop-cart-discount-success">
                        <span>✓</span>

                        {isPersian
                          ? "کد UNIQE10 اعمال شد — ۱۰٪ تخفیف"
                          : "UNIQE10 applied — 10% off"}
                      </p>
                    )}

                    {discountError && (
                      <p className="ushop-cart-discount-error">
                        <span>!</span>

                        {isPersian
                          ? "کد تخفیف معتبر نیست."
                          : "This promo code is not valid."}
                      </p>
                    )}
                  </div>

                  <Link
                    href="/ushop/checkout"
                    className="ushop-cart-checkout"
                  >
                    <span>
                      {isPersian
                        ? "ادامه و تسویه حساب"
                        : "Continue to Checkout"}
                    </span>

                    <span className="ushop-cart-button-arrow">
                      {isPersian
                        ? "←"
                        : "→"}
                    </span>
                  </Link>

                  <Link
                    href="/ushop"
                    className="ushop-cart-continue"
                  >
                    <span>
                      {isPersian
                        ? "ادامه خرید"
                        : "Continue Shopping"}
                    </span>

                    <span>
                      {isPersian
                        ? "↗"
                        : "↗"}
                    </span>
                  </Link>

                  <div className="ushop-cart-trust">
                    <span>✓</span>

                    <p>
                      {isPersian
                        ? "پرداخت امن • تجربه یکپارچه Uniqe"
                        : "Secure checkout • Uniqe experience"}
                    </p>
                  </div>
                </div>
              </aside>
            </div>

            <div className="ushop-cart-bottom-note">
              <span>UNIQE</span>

              <p>
                {isPersian
                  ? "سبد خرید شما بخشی از تجربه یکپارچه UShop است."
                  : "Your cart is part of the unified UShop experience."}
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}