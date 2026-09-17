"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ushopProducts } from "@/components/ushop/products";

import "@/components/ushop/checkout.css";

type CartItem = {
  productId: string;
  quantity: number;
};

type CartProductItem = {
  product: (typeof ushopProducts)[number];
  quantity: number;
};

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
};

const CART_KEY = "uniqe-cart";
const CHECKOUT_KEY = "uniqe-checkout-draft";

const DISCOUNT_CODE = "UNIQE10";
const DISCOUNT_RATE = 0.1;

const SHIPPING_FEE = 12;

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
          typeof candidate.productId ===
            "string" &&
          typeof candidate.quantity ===
            "number" &&
          Number.isFinite(
            candidate.quantity,
          ) &&
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

const initialForm: CheckoutForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  postalCode: "",
};

export default function CheckoutPage() {
  const { language } = useLanguage();

  const isPersian = language === "fa";

  const [cart, setCart] = useState<CartItem[]>(
    [],
  );

  const [form, setForm] =
    useState<CheckoutForm>(initialForm);

  const [discountCode, setDiscountCode] =
    useState("");

  const [discountApplied, setDiscountApplied] =
    useState(false);

  const [discountError, setDiscountError] =
    useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutForm, boolean>>
  >({});

  const [submitted, setSubmitted] =
    useState(false);

  const [isLoaded, setIsLoaded] =
    useState(false);

  useEffect(() => {
    setCart(readCart());

    try {
      const raw =
        window.localStorage.getItem(
          CHECKOUT_KEY,
        );

      if (raw) {
        const parsed = JSON.parse(raw);

        if (
          parsed &&
          typeof parsed === "object"
        ) {
          setForm((current) => ({
            ...current,
            ...(parsed.form ?? {}),
          }));

          if (
            typeof parsed.discountCode ===
            "string"
          ) {
            setDiscountCode(
              parsed.discountCode,
            );

            if (
              parsed.discountCode
                .trim()
                .toUpperCase() ===
              DISCOUNT_CODE
            ) {
              setDiscountApplied(true);
            }
          }
        }
      }
    } catch {
      // Ignore malformed checkout drafts.
    }

    setIsLoaded(true);
  }, []);

  const cartProducts =
    useMemo<CartProductItem[]>(
      () =>
        cart
          .map((item) => {
            const product =
              ushopProducts.find(
                (candidate) =>
                  candidate.id ===
                  item.productId,
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
          ),
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

  const requiresShipping = useMemo(
    () =>
      cartProducts.some(
        ({ product }) =>
          product.fulfillment ===
          "shipping",
      ),
    [cartProducts],
  );

  const shipping = requiresShipping
    ? SHIPPING_FEE
    : 0;

  const discount = discountApplied
    ? subtotal * DISCOUNT_RATE
    : 0;

  const total = Math.max(
    0,
    subtotal +
      shipping -
      discount,
  );

  const updateField = (
    field: keyof CheckoutForm,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: false,
    }));
  };

  const applyDiscount = () => {
    const normalized =
      discountCode
        .trim()
        .replace(/\s+/g, "")
        .toUpperCase();

    setDiscountError(false);

    if (
      normalized ===
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

  const validateForm = () => {
    const requiredFields: Array<
      keyof CheckoutForm
    > = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "country",
      "city",
      "address",
      "postalCode",
    ];

    const nextErrors: Partial<
      Record<keyof CheckoutForm, boolean>
    > = {};

    for (const field of requiredFields) {
      if (!form[field].trim()) {
        nextErrors[field] = true;
      }
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim(),
      )
    ) {
      nextErrors.email = true;
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const saveCheckoutDraft = () => {
    if (!validateForm()) {
      return;
    }

    const draft = {
      form,
      discountCode:
        discountApplied
          ? DISCOUNT_CODE
          : "",
      cart,
      subtotal,
      shipping,
      discount,
      total,
      savedAt:
        new Date().toISOString(),
    };

    window.localStorage.setItem(
      CHECKOUT_KEY,
      JSON.stringify(draft),
    );

    setSubmitted(true);

    window.setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  if (!isLoaded) {
    return (
      <main className="ushop-checkout-page">
        <div className="ushop-checkout-loading">
          <span />
          <span />
          <span />
        </div>
      </main>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <main
        className="ushop-checkout-page"
        dir={isPersian ? "rtl" : "ltr"}
      >
        <div className="ushop-checkout-container">
          <section className="ushop-checkout-empty">
            <div className="ushop-checkout-empty-icon">
              🛒
            </div>

            <span>
              {isPersian
                ? "CHECKOUT"
                : "CHECKOUT"}
            </span>

            <h1>
              {isPersian
                ? "سبد خرید شما خالی است."
                : "Your cart is empty."}
            </h1>

            <p>
              {isPersian
                ? "برای ادامه تسویه حساب ابتدا محصولی به سبد خرید اضافه کنید."
                : "Add a product to your cart before continuing to checkout."}
            </p>

            <Link
              href="/ushop"
              className="ushop-checkout-empty-button"
            >
              <span>
                {isPersian
                  ? "بازگشت به UShop"
                  : "Back to UShop"}
              </span>

              <span>→</span>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main
      className="ushop-checkout-page"
      dir={isPersian ? "rtl" : "ltr"}
    >
      <div className="ushop-checkout-container">
        <header className="ushop-checkout-header">
          <Link
            href="/ushop/cart"
            className="ushop-checkout-back"
          >
            <span>
              {isPersian ? "→" : "←"}
            </span>

            {isPersian
              ? "بازگشت به سبد خرید"
              : "Back to Cart"}
          </Link>

          <div className="ushop-checkout-heading">
            <span>
              UNIQE / USHOP
            </span>

            <h1>
              {isPersian
                ? "تسویه حساب"
                : "Checkout"}
            </h1>

            <p>
              {isPersian
                ? "اطلاعات سفارش خود را تکمیل کنید تا آماده مرحله بعد شویم."
                : "Complete your order details and prepare for the next step."}
            </p>
          </div>

          <div className="ushop-checkout-steps">
            <div className="active">
              <strong>01</strong>

              <span>
                {isPersian
                  ? "اطلاعات"
                  : "Details"}
              </span>
            </div>

            <i />

            <div>
              <strong>02</strong>

              <span>
                {isPersian
                  ? "پرداخت"
                  : "Payment"}
              </span>
            </div>

            <i />

            <div>
              <strong>03</strong>

              <span>
                {isPersian
                  ? "تکمیل"
                  : "Complete"}
              </span>
            </div>
          </div>
        </header>

        <div className="ushop-checkout-layout">
          <section className="ushop-checkout-form-area">
            <div className="ushop-checkout-section-heading">
              <div className="ushop-checkout-section-number">
                01
              </div>

              <div>
                <span>
                  {isPersian
                    ? "اطلاعات مشتری"
                    : "CUSTOMER INFORMATION"}
                </span>

                <h2>
                  {isPersian
                    ? "اطلاعات تماس"
                    : "Contact Details"}
                </h2>
              </div>
            </div>

            <div className="ushop-checkout-card">
              <div className="ushop-checkout-form-grid two">
                <label
                  className={
                    errors.firstName
                      ? "has-error"
                      : ""
                  }
                >
                  <span>
                    {isPersian
                      ? "نام"
                      : "First Name"}
                  </span>

                  <input
                    type="text"
                    value={
                      form.firstName
                    }
                    onChange={(event) =>
                      updateField(
                        "firstName",
                        event.target.value,
                      )
                    }
                    placeholder={
                      isPersian
                        ? "نام شما"
                        : "Your first name"
                    }
                  />

                  {errors.firstName && (
                    <small>
                      {isPersian
                        ? "این فیلد الزامی است."
                        : "This field is required."}
                    </small>
                  )}
                </label>

                <label
                  className={
                    errors.lastName
                      ? "has-error"
                      : ""
                  }
                >
                  <span>
                    {isPersian
                      ? "نام خانوادگی"
                      : "Last Name"}
                  </span>

                  <input
                    type="text"
                    value={
                      form.lastName
                    }
                    onChange={(event) =>
                      updateField(
                        "lastName",
                        event.target.value,
                      )
                    }
                    placeholder={
                      isPersian
                        ? "نام خانوادگی شما"
                        : "Your last name"
                    }
                  />

                  {errors.lastName && (
                    <small>
                      {isPersian
                        ? "این فیلد الزامی است."
                        : "This field is required."}
                    </small>
                  )}
                </label>

                <label
                  className={
                    errors.email
                      ? "has-error"
                      : ""
                  }
                >
                  <span>
                    {isPersian
                      ? "ایمیل"
                      : "Email Address"}
                  </span>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value,
                      )
                    }
                    placeholder="you@example.com"
                    dir="ltr"
                  />

                  {errors.email && (
                    <small>
                      {isPersian
                        ? "ایمیل معتبر وارد کنید."
                        : "Enter a valid email address."}
                    </small>
                  )}
                </label>

                <label
                  className={
                    errors.phone
                      ? "has-error"
                      : ""
                  }
                >
                  <span>
                    {isPersian
                      ? "شماره تماس"
                      : "Phone Number"}
                  </span>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value,
                      )
                    }
                    placeholder="+98 ..."
                    dir="ltr"
                  />

                  {errors.phone && (
                    <small>
                      {isPersian
                        ? "این فیلد الزامی است."
                        : "This field is required."}
                    </small>
                  )}
                </label>
              </div>
            </div>

            <div className="ushop-checkout-section-heading shipping-heading">
              <div className="ushop-checkout-section-number">
                02
              </div>

              <div>
                <span>
                  {isPersian
                    ? "اطلاعات دریافت"
                    : "DELIVERY INFORMATION"}
                </span>

                <h2>
                  {isPersian
                    ? "آدرس و ارسال"
                    : "Address & Delivery"}
                </h2>
              </div>
            </div>

            <div className="ushop-checkout-card">
              <div className="ushop-checkout-delivery-banner">
                <div className="ushop-checkout-delivery-icon">
                  {requiresShipping
                    ? "◇"
                    : "✦"}
                </div>

                <div>
                  <strong>
                    {requiresShipping
                      ? isPersian
                        ? "ارسال فیزیکی"
                        : "Physical Shipping"
                      : isPersian
                        ? "تحویل دیجیتال / سرویس"
                        : "Digital / Service Delivery"}
                  </strong>

                  <p>
                    {requiresShipping
                      ? isPersian
                        ? "این سفارش شامل محصولی است که نیاز به ارسال فیزیکی دارد."
                        : "Your order contains a product that requires physical shipping."
                      : isPersian
                        ? "این سفارش به ارسال فیزیکی نیاز ندارد."
                        : "This order does not require physical shipping."}
                  </p>
                </div>

                <strong className="ushop-checkout-delivery-price">
                  {requiresShipping
                    ? `$${SHIPPING_FEE}`
                    : isPersian
                      ? "رایگان"
                      : "FREE"}
                </strong>
              </div>

              <div className="ushop-checkout-form-grid two">
                <label
                  className={
                    errors.country
                      ? "has-error"
                      : ""
                  }
                >
                  <span>
                    {isPersian
                      ? "کشور"
                      : "Country"}
                  </span>

                  <input
                    type="text"
                    value={form.country}
                    onChange={(event) =>
                      updateField(
                        "country",
                        event.target.value,
                      )
                    }
                    placeholder={
                      isPersian
                        ? "کشور"
                        : "Country"
                    }
                  />

                  {errors.country && (
                    <small>
                      {isPersian
                        ? "این فیلد الزامی است."
                        : "This field is required."}
                    </small>
                  )}
                </label>

                <label
                  className={
                    errors.city
                      ? "has-error"
                      : ""
                  }
                >
                  <span>
                    {isPersian
                      ? "شهر"
                      : "City"}
                  </span>

                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) =>
                      updateField(
                        "city",
                        event.target.value,
                      )
                    }
                    placeholder={
                      isPersian
                        ? "شهر"
                        : "City"
                    }
                  />

                  {errors.city && (
                    <small>
                      {isPersian
                        ? "این فیلد الزامی است."
                        : "This field is required."}
                    </small>
                  )}
                </label>

                <label
                  className={
                    errors.postalCode
                      ? "has-error"
                      : ""
                  }
                >
                  <span>
                    {isPersian
                      ? "کد پستی"
                      : "Postal Code"}
                  </span>

                  <input
                    type="text"
                    value={
                      form.postalCode
                    }
                    onChange={(event) =>
                      updateField(
                        "postalCode",
                        event.target.value,
                      )
                    }
                    placeholder={
                      isPersian
                        ? "کد پستی"
                        : "Postal Code"
                    }
                    dir="ltr"
                  />

                  {errors.postalCode && (
                    <small>
                      {isPersian
                        ? "این فیلد الزامی است."
                        : "This field is required."}
                    </small>
                  )}
                </label>

                <label
                  className={
                    errors.address
                      ? "has-error full"
                      : "full"
                  }
                >
                  <span>
                    {isPersian
                      ? "آدرس کامل"
                      : "Full Address"}
                  </span>

                  <textarea
                    value={form.address}
                    onChange={(event) =>
                      updateField(
                        "address",
                        event.target.value,
                      )
                    }
                    placeholder={
                      isPersian
                        ? "آدرس کامل خود را وارد کنید..."
                        : "Enter your full address..."
                    }
                    rows={4}
                  />

                  {errors.address && (
                    <small>
                      {isPersian
                        ? "این فیلد الزامی است."
                        : "This field is required."}
                    </small>
                  )}
                </label>
              </div>
            </div>

            <div className="ushop-checkout-section-heading discount-heading">
              <div className="ushop-checkout-section-number">
                03
              </div>

              <div>
                <span>
                  {isPersian
                    ? "تخفیف"
                    : "DISCOUNT"}
                </span>

                <h2>
                  {isPersian
                    ? "کد تخفیف"
                    : "Promo Code"}
                </h2>
              </div>
            </div>

            <div className="ushop-checkout-card">
              <div className="ushop-checkout-promo">
                <div>
                  <strong>
                    {isPersian
                      ? "کد تخفیف دارید؟"
                      : "Have a promo code?"}
                  </strong>

                  <p>
                    {isPersian
                      ? "کد خود را وارد کنید تا تخفیف روی سفارش اعمال شود."
                      : "Enter your code to apply a discount to your order."}
                  </p>
                </div>

                <div className="ushop-checkout-promo-input">
                  <input
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
                    placeholder="UNIQE10"
                    dir="ltr"
                    spellCheck={false}
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
              </div>

              {discountApplied && (
                <p className="ushop-checkout-promo-success">
                  ✓{" "}
                  {isPersian
                    ? "کد UNIQE10 با موفقیت اعمال شد — ۱۰٪ تخفیف"
                    : "UNIQE10 applied successfully — 10% off"}
                </p>
              )}

              {discountError && (
                <p className="ushop-checkout-promo-error">
                  !{" "}
                  {isPersian
                    ? "کد تخفیف معتبر نیست."
                    : "This promo code is not valid."}
                </p>
              )}
            </div>
          </section>

          <aside className="ushop-checkout-summary">
            <div className="ushop-checkout-summary-glow" />

            <div className="ushop-checkout-summary-inner">
              <div className="ushop-checkout-summary-heading">
                <div>
                  <span>
                    {isPersian
                      ? "خلاصه سفارش"
                      : "ORDER SUMMARY"}
                  </span>

                  <h2>
                    {isPersian
                      ? "جزئیات سفارش"
                      : "Order Details"}
                  </h2>
                </div>

                <div className="ushop-checkout-summary-logo">
                  U
                </div>
              </div>

              <div className="ushop-checkout-summary-products">
                {cartProducts.map(
                  ({
                    product,
                    quantity,
                  }) => {
                    const name =
                      isPersian
                        ? product.nameFa
                        : product.name;

                    return (
                      <div
                        className="ushop-checkout-summary-product"
                        key={product.id}
                      >
                        <div className="ushop-checkout-summary-product-icon">
                          {product.icon}
                        </div>

                        <div className="ushop-checkout-summary-product-info">
                          <strong>
                            {name}
                          </strong>

                          <span>
                            × {quantity}
                          </span>
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
                    );
                  },
                )}
              </div>

              <div className="ushop-checkout-summary-divider" />

              <div className="ushop-checkout-summary-lines">
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

                <div>
                  <span>
                    {isPersian
                      ? "ارسال"
                      : "Shipping"}
                  </span>

                  <strong>
                    {shipping > 0
                      ? formatPrice(
                          shipping,
                          "USD",
                          isPersian,
                        )
                      : isPersian
                        ? "رایگان"
                        : "FREE"}
                  </strong>
                </div>

                {discountApplied && (
                  <div className="discount">
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
              </div>

              <div className="ushop-checkout-summary-divider" />

              <div className="ushop-checkout-summary-total">
                <div>
                  <span>
                    {isPersian
                      ? "مبلغ نهایی"
                      : "TOTAL"}
                  </span>

                  <small>
                    {isPersian
                      ? "قبل از پرداخت"
                      : "Before payment"}
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

              <button
                type="button"
                className="ushop-checkout-submit"
                onClick={
                  saveCheckoutDraft
                }
              >
                <span>
                  {submitted
                    ? isPersian
                      ? "✓ اطلاعات ذخیره شد"
                      : "✓ Details Saved"
                    : isPersian
                      ? "ذخیره و ادامه"
                      : "Save & Continue"}
                </span>

                {!submitted && (
                  <span className="ushop-checkout-submit-arrow">
                    {isPersian
                      ? "←"
                      : "→"}
                  </span>
                )}
              </button>

              <Link
                href="/ushop/cart"
                className="ushop-checkout-edit-cart"
              >
                <span>
                  {isPersian
                    ? "ویرایش سبد خرید"
                    : "Edit Cart"}
                </span>

                <span>↗</span>
              </Link>

              <div className="ushop-checkout-security">
                <span>✓</span>

                <p>
                  {isPersian
                    ? "اطلاعات شما در این مرحله فقط به‌صورت محلی ذخیره می‌شود."
                    : "Your information is currently saved locally on this device."}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <footer className="ushop-checkout-footer">
          <span>UNIQE / USHOP</span>

          <p>
            {isPersian
              ? "مرحله اول فرآیند سفارش"
              : "Step one of the ordering experience"}
          </p>
        </footer>
      </div>
    </main>
  );
}