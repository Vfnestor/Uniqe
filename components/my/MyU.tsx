import Link from "next/link";

import Container from "@/components/ui/Container";

import type {
  MyUProduct,
} from "@/lib/my-u/types";

import MyUNavigation from "./MyUNavigation";
import MyUProductGrid from "./MyUProductGrid";

type Props = {
  products: MyUProduct[];
};

const navigation = [
  {
    id: "overview",
    title: "نمای کلی",
    href: "/my",
    icon: "⌂",
  },
  {
    id: "uweb",
    title: "UWeb",
    href: "/my-uweb",
    icon: "🌐",
    area: "uweb",
  },
  {
    id: "projects",
    title: "پروژه‌های من",
    href: "/my/projects",
    icon: "▣",
  },
  {
    id: "contracts",
    title: "قراردادهای من",
    href: "/my/contracts",
    icon: "▤",
  },
  {
    id: "orders",
    title: "سفارش‌های من",
    href: "/my/orders",
    icon: "◫",
  },
  {
    id: "notifications",
    title: "اعلان‌ها",
    href: "/my/notifications",
    icon: "◉",
  },
  {
    id: "favorites",
    title: "علاقه‌مندی‌ها",
    href: "/my/favorites",
    icon: "♡",
  },
  {
    id: "settings",
    title: "تنظیمات",
    href: "/my/settings",
    icon: "⚙",
  },
] as const;

export default function MyU({
  products,
}: Props) {
  return (
    <main className="my-u-page">
      <Container>
        <div className="my-u-layout">
          <MyUNavigation
            items={
              navigation
            }
          />

          <div className="my-u-main">
            <section className="my-u-hero">
              <div>
                <span className="section-eyebrow">
                  MY U
                </span>

                <h1>
                  مرکز کنترل شما در Uniqe
                </h1>

                <p>
                  از اینجا می‌توانید تمام
                  سرویس‌ها، پروژه‌ها،
                  سفارش‌ها و فعالیت‌های
                  خود را مدیریت کنید.
                </p>
              </div>

              <Link
                href="/uweb/order"
                className="my-u-primary-action"
              >
                شروع یک پروژه جدید

                <span>
                  ←
                </span>
              </Link>
            </section>

            <MyUProductGrid
              products={products}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}