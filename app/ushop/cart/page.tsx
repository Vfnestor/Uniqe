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

    return parsed.filter((item): item is CartItem => {
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
    });
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

  const [cart, setCart] = useState<CartItem[]>(
    [],
  );

  const [discountCode, setDiscountCode] =
    useState("");

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
              quantity,
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
        .toUpperCase();

    setDiscountError(false);

    if (
      normalizedCode ===
      DISCOUNT_CODE
    ) {
      setDiscountApplied(true);
      return;
    }

    setDiscountApplied(false);
    setDiscountError(true);
  };

  return (
    <main
      className="ushop-cart-page"
      dir={isPersian ? "rtl" : "ltr"}
    >
      <div className="ushop-cart-container">
        <div className="ushop-cart-header">
          <div>
            <span className="ushop-cart-kicker">
              {isPersian
                ? "فروشگاه Uniqe"
                : "UNIQE USHOP"}
            </span>

            <h1>
              {isPersian
                ? "سبد خرید"
                : "Shopping Cart"}
            </h1>

            <p>
              {isPersian
                ? `${itemCount} محصول در سبد خرید شما`
                : `${itemCount} item${
                    itemCount === 1
                      ? ""
                      : "s"
                  } in your cart`}
            </p>
          </div>

          {cartProducts.length > 0 && (
            <button
              type="button"
              className="ushop-cart-clear"
              onClick={clearCart}
            >
              {isPersian
                ? "پاک کردن سبد"
                : "Clear Cart"}
            </button>
          )}
        </div>

        {cartProducts.length === 0 ? (
          <section className="ushop-cart-empty">
            <div className="ushop-cart-empty-icon">
              🛒
            </div>

            <span>
              {isPersian
                ? "سبد خرید خالی است"
                : "YOUR CART IS EMPTY"}
            </span>

            <h2>
              {isPersian
                ? "هنوز محصولی انتخاب نکرده‌اید."
                : "Nothing has been added yet."}
            </h2>

            <p>
              {isPersian
                ? "محصولات UShop را بررسی کنید و موارد موردنظر خود را به سبد خرید اضافه کنید."
                : "Explore UShop and add the products you want to your cart."}
            </p>

            <Link
              href="/ushop"
              className="ushop-cart-primary-button"
            >
              {isPersian
                ? "مشاهده محصولات"
                : "Explore Products"}

              <span>
                {isPersian ? "←" : "→"}
              </span>
            </Link>
          </section>
        ) : (
          <div className="ushop-cart-layout">
            <section className="ushop-cart-items">
              {cartProducts.map(
                ({
                  product,
                  quantity,
                }) => {
                  const name = isPersian
                    ? product.nameFa
                    : product.name;

                  const category =
                    isPersian
                      ? product.categoryLabelFa
                      : product.categoryLabel;

                  return (
                    <article
                      className="ushop-cart-item"
                      key={product.id}
                    >
                      <div className="ushop-cart-product-visual">
                        <span>
                          {product.icon}
                        </span>
                      </div>

                      <div className="ushop-cart-product-main">
                        <div className="ushop-cart-product-meta">
                          <span>
                            {category}
                          </span>

                          {product.sku && (
                            <span>
                              {product.sku}
                            </span>
                          )}
                        </div>

                        <Link
                          href={`/ushop/products/${product.slug}`}
                          className="ushop-cart-product-name"
                        >
                          {name}
                        </Link>

                        <div className="ushop-cart-product-bottom">
                          <div className="ushop-cart-quantity">
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

                            <span>
                              {quantity}
                            </span>

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

                          <strong>
                            {formatPrice(
                              product.price *
                                quantity,
                              product.currency,
                              isPersian,
                            )}
                          </strong>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="ushop-cart-remove"
                        onClick={() =>
                          removeItem(
                            product.id,
                          )
                        }
                      >
                        {isPersian
                          ? "حذف"
                          : "Remove"}
                      </button>
                    </article>
                  );
                },
              )}
            </section>

            <aside className="ushop-cart-summary">
              <div className="ushop-cart-summary-header">
                <span>
                  {isPersian
                    ? "خلاصه سفارش"
                    : "ORDER SUMMARY"}
                </span>

                <strong>
                  {itemCount}
                </strong>
              </div>

              <div className="ushop-cart-summary-lines">
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

                <div className="ushop-cart-total">
                  <span>
                    {isPersian
                      ? "مبلغ نهایی"
                      : "Total"}
                  </span>

                  <strong>
                    {formatPrice(
                      total,
                      "USD",
                      isPersian,
                    )}
                  </strong>
                </div>
              </div>

              <div className="ushop-cart-discount">
                <label htmlFor="discount-code">
                  {isPersian
                    ? "کد تخفیف"
                    : "Discount Code"}
                </label>

                <div>
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
                    }}
                    placeholder={
                      isPersian
                        ? "مثلاً UNIQE10"
                        : "e.g. UNIQE10"
                    }
                    disabled={
                      discountApplied
                    }
                  />

                  <button
                    type="button"
                    onClick={
                      applyDiscount
                    }
                    disabled={
                      discountApplied ||
                      !discountCode.trim()
                    }
                  >
                    {discountApplied
                      ? isPersian
                        ? "اعمال شد"
                        : "Applied"
                      : isPersian
                        ? "اعمال"
                        : "Apply"}
                  </button>
                </div>

                {discountApplied && (
                  <p className="ushop-cart-discount-success">
                    ✓{" "}
                    {isPersian
                      ? "کد UNIQE10 با موفقیت اعمال شد — ۱۰٪ تخفیف"
                      : "UNIQE10 applied successfully — 10% off"}
                  </p>
                )}

                {discountError && (
                  <p className="ushop-cart-discount-error">
                    {isPersian
                      ? "کد تخفیف معتبر نیست."
                      : "Invalid discount code."}
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

                <span>
                  {isPersian ? "←" : "→"}
                </span>
              </Link>

              <Link
                href="/ushop"
                className="ushop-cart-continue"
              >
                {isPersian
                  ? "ادامه خرید"
                  : "Continue Shopping"}
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}