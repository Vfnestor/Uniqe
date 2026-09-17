"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

import type { UShopProduct } from "./products";

type ProductDetailProps = {
  product: UShopProduct;
};

function formatPrice(
  price: number,
  currency: UShopProduct["currency"],
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductDetail({
  product,
}: ProductDetailProps) {
  const { language } = useLanguage();

  const isPersian = language === "fa";

  const productName = isPersian
    ? product.nameFa
    : product.name;

  const category = isPersian
    ? product.categoryLabelFa
    : product.categoryLabel;

  const description = isPersian
    ? product.descriptionFa
    : product.description;

  const features = isPersian
    ? product.featuresFa
    : product.features;

  const status = isPersian
    ? product.statusLabelFa
    : product.statusLabel;

  const isAvailable =
    product.status === "available" &&
    (product.stock === undefined || product.stock > 0);

  return (
    <main className="ushop-product-page">
      <section className="product-detail-shell">
        <Link
          href="/ushop"
          className="product-back-link"
        >
          ← {isPersian ? "بازگشت به UShop" : "Back to UShop"}
        </Link>

        <div className="product-detail-grid">
          <div className="product-detail-visual">
            <div className="product-visual-orbit orbit-one" />
            <div className="product-visual-orbit orbit-two" />

            <div className="product-visual-glow" />

            <div className="product-visual-card">
              <span className="product-visual-number">
                {product.number}
              </span>

              <span className="product-visual-icon">
                {product.icon}
              </span>

              <span className="product-visual-label">
                UNIQE / USHOP
              </span>
            </div>
          </div>

          <div className="product-detail-content">
            <div className="product-detail-meta">
              <span className="product-detail-category">
                {category}
              </span>

              <span
                className={`product-detail-status status-${product.status}`}
              >
                {status}
              </span>
            </div>

            <h1>{productName}</h1>

            <p className="product-detail-description">
              {description}
            </p>

            <div className="product-detail-price">
              {formatPrice(product.price, product.currency)}
            </div>

            <div className="product-detail-info">
              <div className="product-info-item">
                <span>
                  {isPersian ? "شناسه محصول" : "SKU"}
                </span>

                <strong>
                  {product.sku ?? "—"}
                </strong>
              </div>

              <div className="product-info-item">
                <span>
                  {isPersian ? "نوع محصول" : "Category"}
                </span>

                <strong>{category}</strong>
              </div>

              <div className="product-info-item">
                <span>
                  {isPersian ? "تحویل" : "Fulfillment"}
                </span>

                <strong>
                  {product.fulfillment === "instant"
                    ? isPersian
                      ? "فوری"
                      : "Instant"
                    : product.fulfillment === "shipping"
                      ? isPersian
                        ? "ارسال"
                        : "Shipping"
                      : product.fulfillment === "service"
                        ? isPersian
                          ? "خدمات"
                          : "Service"
                        : isPersian
                          ? "آزمایشی"
                          : "Experimental"}
                </strong>
              </div>

              {product.stock !== undefined && (
                <div className="product-info-item">
                  <span>
                    {isPersian ? "موجودی" : "Stock"}
                  </span>

                  <strong>
                    {product.stock}
                  </strong>
                </div>
              )}
            </div>

            <div className="product-detail-actions">
              <button
                type="button"
                className="product-add-button"
                disabled={!isAvailable}
              >
                {isAvailable
                  ? isPersian
                    ? "افزودن به سبد خرید"
                    : "Add to Cart"
                  : product.status === "coming-soon"
                    ? isPersian
                      ? "به‌زودی"
                      : "Coming Soon"
                    : isPersian
                      ? "ناموجود"
                      : "Unavailable"}
              </button>

              <Link
                href="/ushop"
                className="product-secondary-button"
              >
                {isPersian
                  ? "مشاهده محصولات"
                  : "Explore Products"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="product-features-section">
        <div className="product-section-heading">
          <span>
            {isPersian ? "ویژگی‌ها" : "Features"}
          </span>

          <h2>
            {isPersian
              ? "جزئیات محصول"
              : "Product Details"}
          </h2>
        </div>

        <div className="product-features-grid">
          {features.map((feature, index) => (
            <div
              className="product-feature-card"
              key={`${product.id}-feature-${index}`}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}