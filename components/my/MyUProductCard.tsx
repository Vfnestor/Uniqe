import Link from "next/link";

import type {
  MyUProduct,
} from "@/lib/my-u/types";

type Props = {
  product: MyUProduct;
};

export default function MyUProductCard({
  product,
}: Props) {
  const isActive =
    product.status === "active";

  return (
    <article
      className={`my-u-product-card ${
        isActive
          ? "my-u-product-card-active"
          : "my-u-product-card-coming"
      }`}
    >
      <div className="my-u-product-card-top">
        <div className="my-u-product-icon">
          {product.icon}
        </div>

        {isActive ? (
          <span className="my-u-product-status my-u-product-status-active">
            فعال
          </span>
        ) : (
          <span className="my-u-product-status">
            به‌زودی
          </span>
        )}
      </div>

      <div className="my-u-product-card-content">
        <span className="my-u-product-name">
          {product.name}
        </span>

        <h3>
          {product.title}
        </h3>

        <p>
          {product.description}
        </p>
      </div>

      {isActive ? (
        <Link
          href={product.href}
          className="my-u-product-action"
        >
          ورود به {product.name}
          <span>←</span>
        </Link>
      ) : (
        <div className="my-u-product-action my-u-product-action-disabled">
          در حال توسعه
          <span>•••</span>
        </div>
      )}
    </article>
  );
}