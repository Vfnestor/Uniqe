import "@/components/ushop/ushop.css";

import UShopHero from "@/components/ushop/UShopHero";
import ProductsGrid from "@/components/ushop/ProductsGrid";
import UShopCTA from "@/components/ushop/UShopCTA";

import { ushopProducts } from "@/components/ushop/products";

export default function UShopPage() {
  return (
    <main className="ushop-page">
      <UShopHero />
      <ProductsGrid products={ushopProducts} />
      <UShopCTA />
    </main>
  );
}