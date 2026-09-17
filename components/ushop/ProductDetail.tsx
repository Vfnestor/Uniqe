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
    <main className="product-detail-page">
      <div className="product-detail-container">
        <Link
          href="/ushop"
          className="product-back-link"
        >
          {isPersian
            ? "← بازگشت به UShop"
            : "← Back to UShop"}
        </Link>

        <section className="product-detail">
          <div className="product-detail-visual">
            <div className="product-detail-icon">
              {product.icon}
            </div>

            <span className="product-detail-number">
              {product.number}
            </span>
          </div>

          <div className="product-detail-content">
            <div className="product-detail-meta">
              <span>{category}</span>

              <span
                className={`product-detail-status ${
                  product.status
                }`}
              >
                {status}
              </span>
            </div>

            <h1>{name}</h1>

            <p className="product-detail-description">
              {description}
            </p>

            <div className="product-detail-price">
              {priceLabel}
            </div>

            <div className="product-detail-info">
              <div>
                <span>
                  {isPersian
                    ? "وضعیت"
                    : "Status"}
                </span>

                <strong>{status}</strong>
              </div>

              <div>
                <span>
                  {isPersian
                    ? "نوع ارائه"
                    : "Fulfillment"}
                </span>

                <strong>
                  {product.fulfillment}
                </strong>
              </div>

              {product.stock !== undefined && (
                <div>
                  <span>
                    {isPersian
                      ? "موجودی"
                      : "Stock"}
                  </span>

                  <strong>
                    {product.stock}
                  </strong>
                </div>
              )}

              {product.sku && (
                <div>
                  <span>SKU</span>

                  <strong>{product.sku}</strong>
                </div>
              )}
            </div>

            <div className="product-detail-actions">
              <button
                type="button"
                className="product-add-button"
                disabled={!isAvailable}
                onClick={addToCart}
              >
                {!isAvailable
                  ? isPersian
                    ? "در حال حاضر قابل خرید نیست"
                    : "Currently unavailable"
                  : addedToCart
                    ? isPersian
                      ? "✓ به سبد اضافه شد"
                      : "✓ Added to Cart"
                    : isPersian
                      ? "افزودن به سبد خرید"
                      : "Add to Cart"}
              </button>

              {addedToCart && (
                <Link
                  href="/ushop/cart"
                  className="product-cart-link"
                >
                  {isPersian
                    ? "مشاهده سبد خرید"
                    : "View Cart"}
                </Link>
              )}

              <Link
                href="/ushop"
                className="product-explore-button"
              >
                {isPersian
                  ? "مشاهده محصولات"
                  : "Explore Products"}
              </Link>
            </div>

            {features.length > 0 && (
              <div className="product-features">
                <h2>
                  {isPersian
                    ? "ویژگی‌ها"
                    : "Features"}
                </h2>

                <ul>
                  {features.map(
                    (feature, index) => (
                      <li key={index}>
                        <span>✓</span>
                        <span>{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}