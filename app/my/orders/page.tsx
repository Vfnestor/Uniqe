import "@/components/my/my-u.css";
import "@/components/my/my-u-core.css";

import MyUCoreLayout from "@/components/my/MyUCoreLayout";
import MyUOrders from "@/components/my/MyUOrders";

import {
  getMyUOrders,
} from "@/lib/my-u/core-data";

export default function MyOrdersPage() {
  const orders =
    getMyUOrders();

  return (
    <MyUCoreLayout
      eyebrow="MY U / ORDERS"
      title="سفارش‌های من"
      description="تمام سفارش‌ها و درخواست‌های شما از محصولات مختلف Uniqe در این بخش قرار می‌گیرند."
      active="orders"
    >
      <MyUOrders
        orders={orders}
      />
    </MyUCoreLayout>
  );
}
