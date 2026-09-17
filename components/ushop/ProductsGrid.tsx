"use client";

import {
  useMemo,
  useState,
} from "react";

import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

import CategoryFilter, {
  type ProductCategoryFilter,
} from "./CategoryFilter";

import type {
  UShopProduct,
} from "./products";

type ProductsGridProps = {
  products: UShopProduct[];
};

function Status({
  product,
}: {
  product: UShopProduct;
}) {
  const { language } =
    useLanguage();

  const label =
    language === "fa"
      ? product.statusLabelFa
      : product.statusLabel;

  return (
    <span
      className={`ushop-status ushop-status-${product.status}`}
    >
      <span className="ushop-status-dot" />
      {label}
    </span>
  );
}

function formatPrice(
  price: number,
  currency: UShopProduct["currency"],
) {
  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    },
  ).format(price);
}

export default function ProductsGrid({
  products,
}: ProductsGridProps) {
  const { language } =
    useLanguage();

  const [
    activeCategory,
    setActiveCategory,
  ] = useState<ProductCategoryFilter>(
    "all",
  );

  const counts = useMemo(() => {
    return {
      all: products.length,

      digital:
        products.filter(
          (product) =>
            product.category ===
            "digital",
        ).length,

      physical:
        products.filter(
          (product) =>
            product.category ===
            "physical",
        ).length,

      service:
        products.filter(
          (product) =>
            product.category ===
            "service",
        ).length,

      experimental:
        products.filter(
          (product) =>
            product.category ===
            "experimental",
        ).length,
    };
  }, [products]);

  const filteredProducts =
    useMemo(() => {
      if (
        activeCategory ===
        "all"
      ) {
        return products;
      }

      return products.filter(
        (product) =>
          product.category ===
          activeCategory,
      );
    }, [
      activeCategory,
      products,
    ]);

  return (
    <section
      id="products"
      className="ushop-products section"
    >
      <Container>
        <Reveal animation="up">
          <div className="ushop-section-heading">
            <div>
              <span className="section-eyebrow">
                UShop Collection
              </span>

              <h2 className="section-title">
                Explore the
                <br />
                marketplace.
              </h2>
            </div>

            <p className="section-description">
              Discover products,
              services and commerce
              experiences being
              developed inside the
              UShop ecosystem.
            </p>
          </div>
        </Reveal>

        <Reveal animation="up">
          <div className="ushop-filter-row">
            <CategoryFilter
              value={activeCategory}
              onChange={
                setActiveCategory
              }
              counts={counts}
            />

            <div className="ushop-results-count">
              <span>
                {filteredProducts.length}
              </span>

              <span>
                {language === "fa"
                  ? " محصول"
                  : filteredProducts.length ===
                      1
                    ? " product"
                    : " products"}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="ushop-grid">
          {filteredProducts.map(
            (
              product,
              index,
            ) => {
              const name =
                language === "fa"
                  ? product.nameFa
                  : product.name;

              const description =
                language === "fa"
                  ? product.shortDescriptionFa
                  : product.shortDescription;

              const category =
                language === "fa"
                  ? product.categoryLabelFa
                  : product.categoryLabel;

              return (
                <Reveal
                  key={product.id}
                  animation="up"
                  delay={
                    120 +
                    index * 80
                  }
                >
                  <Card
                    hover
                    className="ushop-card"
                  >
                    <a
                      href={
                        product.href
                      }
                      className="ushop-card-link"
                    >
                      <div className="ushop-card-top">
                        <span className="ushop-card-number">
                          {
                            product.number
                          }
                        </span>

                        <span className="ushop-card-icon">
                          {product.icon}
                        </span>
                      </div>

                      <div className="ushop-card-content">
                        <div className="ushop-card-meta">
                          <span className="ushop-card-category">
                            {category}
                          </span>

                          <Status
                            product={
                              product
                            }
                          />
                        </div>

                        <h3 className="ushop-card-title">
                          {name}
                        </h3>

                        <p className="ushop-card-description">
                          {
                            description
                          }
                        </p>

                        <div className="ushop-card-price-row">
                          <span className="ushop-card-price">
                            {formatPrice(
                              product.price,
                              product.currency,
                            )}
                          </span>

                          {product.stock !==
                            undefined && (
                            <span className="ushop-card-stock">
                              {language ===
                              "fa"
                                ? `${product.stock} عدد`
                                : `${product.stock} in stock`}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="ushop-card-bottom">
                        <span>
                          {language ===
                          "fa"
                            ? "مشاهده محصول"
                            : "Explore product"}
                        </span>

                        <span className="ushop-card-arrow">
                          ↗
                        </span>
                      </div>
                    </a>
                  </Card>
                </Reveal>
              );
            },
          )}
        </div>

        {filteredProducts.length ===
          0 && (
          <div className="ushop-empty">
            <span>
              {language === "fa"
                ? "محصولی در این دسته وجود ندارد."
                : "No products found in this category."}
            </span>
          </div>
        )}
      </Container>
    </section>
  );
}