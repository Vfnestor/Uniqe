"use client";

import Link from "next/link";
import { useState } from "react";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { UShopProduct } from "@/components/ushop/products";

type ProductDetailProps = {
  product: UShopProduct;
};

type CartItem = {
  productId: string;
  quantity: number;
};

const CART_KEY = "uniqe-cart";

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

    return parsed.filter((item): item is CartItem => {
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

export default function ProductDetail({
  product,
}: ProductDetailProps) {
  const { language } = useLanguage();

  const isPersian = language === "fa";

  const [addedToCart, setAddedToCart] =
    useState(false);

  const name = isPersian
    ? product.nameFa
    : product.name;

  const category = isPersian
    ? product.categoryLabelFa
    : product.categoryLabel;

  const description = isPersian
    ? product.descriptionFa
    : product.description;

  const status = isPersian
    ? product.statusLabelFa
    : product.statusLabel;

  const features = isPersian
    ? product.featuresFa
    : product.features;

  const fulfillmentLabel = {
    instant: isPersian
      ? "تحویل فوری"
      : "Instant Delivery",
    shipping: isPersian
      ? "ارسال فیزیکی"
      : "Physical Shipping",
    service: isPersian
      ? "ارائه خدمات"
      : "Professional Service",
    experimental: isPersian
      ? "تجربی"
      : "Experimental",
  }[product.fulfillment];

  const isAvailable =
    product.status === "available" &&
    (product.stock === undefined ||
      product.stock > 0);

  const formattedPrice =
    new Intl.NumberFormat(
      isPersian ? "fa-IR" : "en-US",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      },
    ).format(product.price);

  const priceLabel =
    product.currency === "USD"
      ? `$${formattedPrice}`
      : `${formattedPrice} ${product.currency}`;

  const addToCart = () => {
    if (!isAvailable) {
      return;
    }

    const currentCart = readCart();

    const existingItem = currentCart.find(
      (item) => item.productId === product.id,
    );

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          productId: product.id,
          quantity: 1,
        },
      ];
    }

    saveCart(updatedCart);
    setAddedToCart(true);
  };

  return (
    <main
      className="product-detail-page"
      dir={isPersian ? "rtl" : "ltr"}
    >
      <div className="product-detail-container">
        <Link
          href="/ushop"
          className="product-back-link"
        >
          <span aria-hidden="true">
            {isPersian ? "→" : "←"}
          </span>

          {isPersian
            ? "بازگشت به فروشگاه"
            : "Back to UShop"}
        </Link>

        <section className="product-hero">
          <div className="product-showcase">
            <div className="product-showcase-grid" />

            <div className="product-showcase-orbit product-showcase-orbit-one" />
            <div className="product-showcase-orbit product-showcase-orbit-two" />

            <div className="product-showcase-glow" />

            <div className="product-showcase-top">
              <span>
                {isPersian
                  ? "محصول"
                  : "PRODUCT"}
              </span>

              <strong>
                {product.number}
              </strong>
            </div>

            <div className="product-showcase-card">
              <div className="product-showcase-icon">
                {product.icon}
              </div>

              <div className="product-showcase-card-name">
                {name}
              </div>

              <div className="product-showcase-card-label">
                UNIQE / USHOP
              </div>
            </div>

            <div className="product-showcase-bottom">
              <span>{category}</span>

              <span
                className={`product-status-dot ${product.status}`}
              >
                <i />
                {status}
              </span>
            </div>
          </div>

          <div className="product-main-content">
            <div className="product-meta-row">
              <span className="product-category-pill">
                {category}
              </span>

              <span
                className={`product-status-pill ${product.status}`}
              >
                <i />

                {status}
              </span>
            </div>

            <div className="product-title-wrap">
              <span className="product-kicker">
                {isPersian
                  ? `محصول ${product.number}`
                  : `PRODUCT ${product.number}`}
              </span>

              <h1>{name}</h1>
            </div>

            <p className="product-description">
              {description}
            </p>

            <div className="product-purchase-card">
              <div className="product-price-block">
                <span>
                  {isPersian
                    ? "قیمت"
                    : "Price"}
                </span>

                <strong>
                  {priceLabel}
                </strong>
              </div>

              <div className="product-purchase-divider" />

              <div className="product-purchase-action">
                <button
                  type="button"
                  className="product-add-button"
                  disabled={!isAvailable}
                  onClick={addToCart}
                >
                  <span>
                    {!isAvailable
                      ? isPersian
                        ? "در حال حاضر قابل خرید نیست"
                        : "Currently Unavailable"
                      : addedToCart
                        ? isPersian
                          ? "✓ به سبد اضافه شد"
                          : "✓ Added to Cart"
                        : isPersian
                          ? "افزودن به سبد خرید"
                          : "Add to Cart"}
                  </span>

                  {isAvailable && (
                    <span className="product-button-arrow">
                      {isPersian ? "←" : "→"}
                    </span>
                  )}
                </button>

                {addedToCart && (
                  <Link
                    href="/ushop/cart"
                    className="product-view-cart"
                  >
                    {isPersian
                      ? "مشاهده سبد خرید"
                      : "View Cart"}
                  </Link>
                )}
              </div>
            </div>

            <div className="product-trust-row">
              <div>
                <span className="product-trust-icon">
                  ✓
                </span>

                <span>
                  {isPersian
                    ? "تجربه خرید امن"
                    : "Secure Experience"}
                </span>
              </div>

              <div>
                <span className="product-trust-icon">
                  ◇
                </span>

                <span>
                  {isPersian
                    ? "بخشی از اکوسیستم Uniqe"
                    : "Part of Uniqe Ecosystem"}
                </span>
              </div>

              <div>
                <span className="product-trust-icon">
                  ↗
                </span>

                <span>
                  {isPersian
                    ? "آماده توسعه"
                    : "Built to Evolve"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="product-information">
          <div className="product-section-intro">
            <span className="product-section-number">
              01
            </span>

            <div>
              <span className="product-section-label">
                {isPersian
                  ? "اطلاعات محصول"
                  : "PRODUCT INFORMATION"}
              </span>

              <h2>
                {isPersian
                  ? "جزئیات محصول"
                  : "Product Details"}
              </h2>
            </div>
          </div>

          <div className="product-info-grid">
            <div className="product-info-card">
              <span>
                {isPersian
                  ? "وضعیت"
                  : "STATUS"}
              </span>

              <strong>{status}</strong>

              <small>
                {isPersian
                  ? "وضعیت فعلی محصول"
                  : "Current product availability"}
              </small>
            </div>

            <div className="product-info-card">
              <span>
                {isPersian
                  ? "نوع ارائه"
                  : "FULFILLMENT"}
              </span>

              <strong>
                {fulfillmentLabel}
              </strong>

              <small>
                {isPersian
                  ? "روش دریافت محصول"
                  : "How the product is delivered"}
              </small>
            </div>

            <div className="product-info-card">
              <span>
                {isPersian
                  ? "موجودی"
                  : "STOCK"}
              </span>

              <strong>
                {product.stock !== undefined
                  ? product.stock
                  : "∞"}
              </strong>

              <small>
                {product.stock !== undefined
                  ? isPersian
                    ? "واحد موجود"
                    : "Units available"
                  : isPersian
                    ? "بدون محدودیت موجودی"
                    : "No stock limit"}
              </small>
            </div>

            <div className="product-info-card">
              <span>SKU</span>

              <strong>
                {product.sku ?? "—"}
              </strong>

              <small>
                {isPersian
                  ? "شناسه محصول"
                  : "Product identifier"}
              </small>
            </div>
          </div>
        </section>

        <section className="product-features-section">
          <div className="product-section-intro">
            <span className="product-section-number">
              02
            </span>

            <div>
              <span className="product-section-label">
                {isPersian
                  ? "ویژگی‌ها"
                  : "CAPABILITIES"}
              </span>

              <h2>
                {isPersian
                  ? "چه چیزی دریافت می‌کنید؟"
                  : "What you get"}
              </h2>
            </div>
          </div>

          <div className="product-features-grid">
            {features.map(
              (feature, index) => (
                <article
                  className="product-feature-card"
                  key={`${feature}-${index}`}
                >
                  <div className="product-feature-top">
                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span>✦</span>
                  </div>

                  <p>{feature}</p>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="product-bottom-cta">
          <div>
            <span>
              {isPersian
                ? "بخشی از دنیای Uniqe"
                : "PART OF THE UNIQE WORLD"}
            </span>

            <h2>
              {isPersian
                ? "محصولات بیشتری را کشف کنید."
                : "Discover more from Uniqe."}
            </h2>
          </div>

          <Link
            href="/ushop"
            className="product-bottom-cta-button"
          >
            <span>
              {isPersian
                ? "بازگشت به UShop"
                : "Explore UShop"}
            </span>

            <span>
              {isPersian ? "←" : "→"}
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}