import { notFound } from "next/navigation";

import "@/components/ushop/product-detail.css";

import ProductDetail from "@/components/ushop/ProductDetail";
import { ushopProducts } from "@/components/ushop/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return ushopProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = ushopProducts.find(
    (item) => item.slug === slug,
  );

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}