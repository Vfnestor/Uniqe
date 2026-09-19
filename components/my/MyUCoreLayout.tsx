import Link from "next/link";

import Container from "@/components/ui/Container";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  active:
    | "orders"
    | "notifications"
    | "favorites"
    | "settings";
  children: React.ReactNode;
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

export default function MyUCoreLayout({
  eyebrow,
  title,
  description,
  active,
  children,
}: Props) {
  return (
    <main className="my-u-core-page">
      <Container>
        <div className="my-u-core-layout">
          <aside className="my-u-core-sidebar">
            <div className="my-u-core-sidebar-header">
              <span className="section-eyebrow">
                MY U
              </span>

              <h2>
                حساب من
              </h2>
            </div>

            <nav className="my-u-core-nav">
              {navigation.map((item) => {
                const isActive =
                  item.id === active;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={
                      isActive
                        ? "my-u-core-nav-item my-u-core-nav-item-active"
                        : "my-u-core-nav-item"
                    }
                  >
                    <span className="my-u-core-nav-icon">
                      {item.icon}
                    </span>

                    <span>
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <section className="my-u-core-main">
            <header className="my-u-core-header">
              <span className="section-eyebrow">
                {eyebrow}
              </span>

              <h1>
                {title}
              </h1>

              <p>
                {description}
              </p>
            </header>

            {children}
          </section>
        </div>
      </Container>
    </main>
  );
}