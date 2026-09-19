import Link from "next/link";

import type {
  MyUNavigationItem,
} from "@/lib/my-u/types";

type Props = {
  items: MyUNavigationItem[];
};

export default function MyUNavigation({
  items,
}: Props) {
  return (
    <aside className="my-u-navigation">
      <div className="my-u-navigation-header">
        <span className="section-eyebrow">
          MY U
        </span>

        <h2>
          حساب من
        </h2>
      </div>

      <nav>
        {items.map(
          (item) => (
            <Link
              key={item.id}
              href={item.href}
              className={
                item.id ===
                "overview"
                  ? "my-u-navigation-item my-u-navigation-item-active"
                  : "my-u-navigation-item"
              }
            >
              <span className="my-u-navigation-icon">
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>
            </Link>
          ),
        )}
      </nav>
    </aside>
  );
}