"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ushopProducts } from "@/components/ushop/products";
import {
  createOrderId,
  saveOrder,
  type UShopOrder,
} from "@/components/ushop/order";

import "@/components/ushop/checkout.css";

type CartItem = {
  productId: string;
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

type CartProduct = {
  product: (typeof ushopProducts)[number];
  quantity: number;
};

const CART_KEY = "uniqe-cart";
const CHECKOUT_KEY = "uniqe-checkout-draft";

const DISCOUNT_CODE = "UNIQE10";
const DISCOUNT_RATE = 0.1;

const SHIPPING_FEE = 12;

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

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(
        CART_KEY,
      );

    if (!raw) {
      return [];
    }

    const parsed: unknown =
      JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is CartItem => {
        if (
          !item ||
          typeof item !== "object"
        ) {
          return false;
        }

        const candidate =
          item as Record<
            string,
            unknown
          >;

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

  if (currency === "USD") {
    return `$${formatted}`;
  }

  return `${formatted} ${currency}`;
}

export default function CheckoutPage() {
  const { language } =
    useLanguage();

  const isPersian =
    language === "fa";

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [form, setForm] =
    useState<CheckoutForm>(
      initialForm,
    );

  const [discountCode, setDiscountCode] =
    useState("");

  const [discountApplied, setDiscountApplied] =
    useState(false);

  const [discountError, setDiscountError] =
    useState(false);

  const [errors, setErrors] =
    useState<
      Partial<
        Record<
          keyof CheckoutForm,
          boolean
        >
      >
    >({});

  const [loaded, setLoaded] =
    useState(false);

  const [creatingOrder, setCreatingOrder] =
    useState(false);

  const cartProducts =
    useMemo<CartProduct[]>(
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
              quantity:
                item.quantity,
            };
          })
          .filter(
            (
              item,
            ): item is CartProduct =>
              item !== null,
          ),
      [cart],
    );

  const subtotal =
    useMemo(
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

  const requiresShipping =
    useMemo(
      () =>
        cartProducts.some(
          ({ product }) =>
            product.fulfillment ===
            "shipping",
        ),
      [cartProducts],
    );

  const shipping =
    requiresShipping
      ? SHIPPING_FEE
      : 0;

  const discount =
    discountApplied
      ? subtotal *
        DISCOUNT_RATE
      : 0;

  const total = Math.max(
    0,
    subtotal +
      shipping -
      discount,
  );

  useEffect(() => {
    setCart(readCart());

    try {
      const raw =
        window.localStorage.getItem(
          CHECKOUT_KEY,
        );

      if (raw) {
        const parsed =
          JSON.parse(raw);

        if (
          parsed &&
          typeof parsed ===
            "object"
        ) {
          if (
            parsed.form &&
            typeof parsed.form ===
              "object"
          ) {
            setForm(
              (current) => ({
                ...current,
                ...parsed.form,
              }),
            );
          }

          if (
            typeof parsed.discountCode ===
            "string"
          ) {
            setDiscountCode(
              parsed.discountCode,
            );

            if (
              parsed.discountCode
                .replace(/\s+/g, "")
                .toUpperCase() ===
              DISCOUNT_CODE
            ) {
              setDiscountApplied(
                true,
              );
            }
          }
        }
      }
    } catch {
      // Ignore malformed draft.
    }

    setLoaded(true);
  }, []);

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

    if (
      normalized ===
      DISCOUNT_CODE
    ) {
      setDiscountCode(
        DISCOUNT_CODE,
      );
      setDiscountApplied(
        true,
      );
      setDiscountError(
        false,
      );
      return;
    }

    setDiscountApplied(
      false,
    );
    setDiscountError(
      true,
    );
  };

  const validateForm =
    () => {
      const required: Array<
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
        Record<
          keyof CheckoutForm,
          boolean
        >
      > = {};

      for (const field of required) {
        if (
          !form[field].trim()
        ) {
          nextErrors[field] =
            true;
        }
      }

      if (
        form.email.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          form.email.trim(),
        )
      ) {
        nextErrors.email =
          true;
      }

      setErrors(
        nextErrors,
      );

      return (
        Object.keys(
          nextErrors,
        ).length === 0
      );
    };

  const createOrder =
    () => {
      if (creatingOrder) {
        return;
      }

      if (!validateForm()) {
        return;
      }

      setCreatingOrder(
        true,
      );

      const items =
        cartProducts.map(
          ({
            product,
            quantity,
          }) => ({
            productId:
              product.id,
            slug:
              product.slug,
            name:
              product.name,
            nameFa:
              product.nameFa,
            quantity,
            unitPrice:
              product.price,
            currency:
              product.currency,
            fulfillment:
              product.fulfillment,
          }),
        );

      const currency =
        cartProducts[0]
          ?.product.currency ??
        "USD";

      const order: UShopOrder =
        {
          id: createOrderId(),

          createdAt:
            new Date().toISOString(),

          customer: {
            firstName:
              form.firstName.trim(),
            lastName:
              form.lastName.trim(),
            email:
              form.email.trim(),
            phone:
              form.phone.trim(),
          },

          shipping: {
            country:
              form.country.trim(),
            city:
              form.city.trim(),
            address:
              form.address.trim(),
            postalCode:
              form.postalCode.trim(),
          },

          items,

          subtotal,

          discount,

          shippingFee:
            shipping,

          total,

          currency,

          orderStatus:
            "pending",

          paymentStatus:
            "unpaid",

          discountCode:
            discountApplied
              ? DISCOUNT_CODE
              : undefined,
        };

      saveOrder(order);

      window.localStorage.setItem(
        CHECKOUT_KEY,
        JSON.stringify({
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
        }),
      );

      window.localStorage.removeItem(
        CART_KEY,
      );

      window.location.href =
        `/ushop/payment?order=${encodeURIComponent(
          order.id,
        )}`;
    };

  if (!loaded) {
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

  if (
    cartProducts.length === 0
  ) {
    return (
      <main
        className="ushop-checkout-page"
        dir={
          isPersian
            ? "rtl"
            : "ltr"
        }
      >
        <div className="ushop-checkout-container">
          <section className="ushop-checkout-empty">
            <div className="ushop-checkout-empty-icon">
              🛒
            </div>

            <span>
              UShop /
              CHECKOUT
            </span>

            <h1>
              {isPersian
                ? "سبد خرید شما خالی است."
                : "Your cart is empty."}
            </h1>

            <p>
              {isPersian
                ? "برای ادامه ابتدا محصولی به سبد خرید اضافه کنید."
                : "Add a product to your cart before continuing."}
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
      dir={
        isPersian
          ? "rtl"
          : "ltr"
      }
    >
      <div className="ushop-checkout-container">
        <header className="ushop-checkout-header">
          <Link
            href="/ushop/cart"
            className="ushop-checkout-back"
          >
            <span>
              {isPersian
                ? "→"
                : "←"}
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
                ? "اطلاعات سفارش را تکمیل کنید."
                : "Complete your order details."}
            </p>
          </div>

          <div className="ushop-checkout-steps">
            <div className="active">
              <strong>
                01
              </strong>

              <span>
                {isPersian
                  ? "اطلاعات"
                  : "Details"}
              </span>
            </div>

            <i />

            <div>
              <strong>
                02
              </strong>

              <span>
                {isPersian
                  ? "پرداخت"
                  : "Payment"}
              </span>
            </div>

            <i />

            <div>
              <strong>
                03
              </strong>

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
                        ? "نام"
                        : "First name"
                    }
                  />
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
                        ? "نام خانوادگی"
                        : "Last name"
                    }
                  />
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
                      : "Email"}
                  </span>

                  <input
                    type="email"
                    dir="ltr"
                    value={
                      form.email
                    }
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value,
                      )
                    }
                    placeholder="you@example.com"
                  />
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
                      : "Phone"}
                  </span>

                  <input
                    type="tel"
                    dir="ltr"
                    value={
                      form.phone
                    }
                    onChange={(event) =>
                      updateField(
                        "phone",
                        event.target.value,
                      )
                    }
                    placeholder="+98 ..."
                  />
                </label>
              </div>
            </div>

            <div className="ushop-checkout-section-heading">
              <div className="ushop-checkout-section-number">
                02
              </div>

              <div>
                <span>
                  {isPersian
                    ? "اطلاعات ارسال"
                    : "SHIPPING INFORMATION"}
                </span>

                <h2>
                  {isPersian
                    ? "آدرس دریافت"
                    : "Delivery Address"}
                </h2>
              </div>
            </div>

            <div className="ushop-checkout-card">
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
                    value={
                      form.country
                    }
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
                    value={
                      form.city
                    }
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
                    dir="ltr"
                    value={
                      form.postalCode
                    }
                    onChange={(event) =>
                      updateField(
                        "postalCode",
                        event.target.value,
                      )
                    }
                    placeholder="0000000000"
                  />
                </label>

                <label
                  className="full"
                  style={{
                    gridColumn:
                      "1 / -1",
                  }}
                >
                  <span>
                    {isPersian
                      ? "آدرس کامل"
                      : "Full Address"}
                  </span>

                  <textarea
                    value={
                      form.address
                    }
                    onChange={(event) =>
                      updateField(
                        "address",
                        event.target.value,
                      )
                    }
                    placeholder={
                      isPersian
                        ? "آدرس کامل خود را وارد کنید..."
                        : "Enter your complete address..."
                    }
                    rows={5}
                  />
                </label>
              </div>
            </div>

            <div className="ushop-checkout-section-heading">
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
                    : "Discount Code"}
                </h2>
              </div>
            </div>

            <div className="ushop-checkout-card">
              <div className="ushop-checkout-discount">
                <input
                  value={
                    discountCode
                  }
                  onChange={(event) => {
                    setDiscountCode(
                      event.target.value,
                    );
                    setDiscountError(
                      false,
                    );
                  }}
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      event.preventDefault();
                      applyDiscount();
                    }
                  }}
                  placeholder={
                    isPersian
                      ? "کد تخفیف"
                      : "Discount code"
                  }
                  dir="ltr"
                />

                <button
                  type="button"
                  onClick={
                    applyDiscount
                  }
                >
                  {isPersian
                    ? "اعمال"
                    : "Apply"}
                </button>
              </div>

              {discountApplied && (
                <div className="ushop-checkout-discount-success">
                  ✓{" "}
                  {isPersian
                    ? "کد UNIQE10 اعمال شد — ۱۰٪ تخفیف"
                    : "UNIQE10 applied — 10% discount"}
                </div>
              )}

              {discountError && (
                <div className="ushop-checkout-discount-error">
                  {isPersian
                    ? "کد تخفیف معتبر نیست."
                    : "Invalid discount code."}
                </div>
              )}
            </div>

            <button
              type="button"
              className="ushop-checkout-submit"
              onClick={
                createOrder
              }
              disabled={
                creatingOrder
              }
            >
              <span>
                {creatingOrder
                  ? isPersian
                    ? "در حال ساخت سفارش..."
                    : "Creating order..."
                  : isPersian
                    ? "ثبت سفارش و ادامه پرداخت"
                    : "Create Order & Continue"}
              </span>

              <strong>
                →
              </strong>
            </button>
          </section>

          <aside className="ushop-checkout-summary">
            <div className="ushop-checkout-summary-inner">
              <div className="ushop-checkout-summary-top">
                <span>
                  {isPersian
                    ? "خلاصه سفارش"
                    : "ORDER SUMMARY"}
                </span>

                <strong>
                  {cartProducts.length}
                </strong>
              </div>

              <div className="ushop-checkout-items">
                {cartProducts.map(
                  ({
                    product,
                    quantity,
                  }) => (
                    <div
                      className="ushop-checkout-item"
                      key={
                        product.id
                      }
                    >
                      <div className="ushop-checkout-item-icon">
                        {product.icon}
                      </div>

                      <div className="ushop-checkout-item-info">
                        <strong>
                          {isPersian
                            ? product.nameFa
                            : product.name}
                        </strong>

                        <span>
                          ×{" "}
                          {quantity}
                        </span>
                      </div>

                      <b>
                        {formatPrice(
                          product.price *
                            quantity,
                          product.currency,
                          isPersian,
                        )}
                      </b>
                    </div>
                  ),
                )}
              </div>

              <div className="ushop-checkout-summary-lines">
                <div>
                  <span>
                    {isPersian
                      ? "جمع جزء"
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
                    {shipping === 0
                      ? isPersian
                        ? "رایگان"
                        : "Free"
                      : formatPrice(
                          shipping,
                          "USD",
                          isPersian,
                        )}
                  </strong>
                </div>

                {discount > 0 && (
                  <div className="discount">
                    <span>
                      {isPersian
                        ? "تخفیف"
                        : "Discount"}
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

              <div className="ushop-checkout-total">
                <span>
                  {isPersian
                    ? "مبلغ نهایی"
                    : "Final Total"}
                </span>

                <strong>
                  {formatPrice(
                    total,
                    "USD",
                    isPersian,
                  )}
                </strong>
              </div>

              <div className="ushop-checkout-secure">
                <span>
                  ✓
                </span>

                <p>
                  {isPersian
                    ? "اطلاعات سفارش شما در این مرحله فقط به‌صورت محلی ذخیره می‌شود."
                    : "Your order information is currently stored locally for this preparation phase."}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}