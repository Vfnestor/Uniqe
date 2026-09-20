import type {
  ReactNode,
} from "react";

import type {
  MyUProduct,
} from "@/lib/my-u/types";

import MyUProductCard from "./MyUProductCard";

type Props = {
  products: MyUProduct[];
  uappsPanel?: ReactNode;
};

export default function MyUProductGrid({
  products,
  uappsPanel,
}: Props) {
  return (
    <section className="my-u-products-section">
      <div className="my-u-section-header">
        <div>
          <span className="section-eyebrow">
            UNIQE PRODUCTS
          </span>

          <h2>
            سرویس‌های من
          </h2>

          <p>
            همه محصولات و سرویس‌های Uniqe
            از یک پنل مرکزی در دسترس شما هستند.
          </p>
        </div>
      </div>

      <div className="my-u-product-grid">
        {products.map(
          (product) => (
            <MyUProductCard
              key={product.id}
              product={product}
            />
          ),
        )}

        {uappsPanel}
      </div>
    </section>
  );
}