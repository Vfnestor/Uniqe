import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import type { UShopProduct } from "./products";

type ProductsGridProps = {
  products: UShopProduct[];
};

function Status({
  status,
  label,
}: {
  status: UShopProduct["status"];
  label: string;
}) {
  return (
    <span
      className={`ushop-status ushop-status-${status}`}
    >
      <span className="ushop-status-dot" />
      {label}
    </span>
  );
}

export default function ProductsGrid({
  products,
}: ProductsGridProps) {
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
              Discover products, services and
              commerce experiences being developed
              inside the UShop ecosystem.
            </p>
          </div>
        </Reveal>

        <div className="ushop-grid">
          {products.map((product, index) => (
            <Reveal
              key={product.id}
              animation="up"
              delay={120 + index * 80}
            >
              <Card
                hover
                className="ushop-card"
              >
                <a
                  href={product.href}
                  className="ushop-card-link"
                >
                  <div className="ushop-card-top">
                    <span className="ushop-card-number">
                      {product.number}
                    </span>

                    <span className="ushop-card-icon">
                      {product.icon}
                    </span>
                  </div>

                  <div className="ushop-card-content">
                    <div className="ushop-card-meta">
                      <span className="ushop-card-category">
                        {product.categoryLabel}
                      </span>

                      <Status
                        status={product.status}
                        label={product.statusLabel}
                      />
                    </div>

                    <h3 className="ushop-card-title">
                      {product.name}
                    </h3>

                    <p className="ushop-card-description">
                      {product.description}
                    </p>
                  </div>

                  <div className="ushop-card-bottom">
                    <span>
                      Explore product
                    </span>

                    <span className="ushop-card-arrow">
                      ↗
                    </span>
                  </div>
                </a>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}