import Link from "next/link";

import type {
  MyUFavorite,
} from "@/lib/my-u/core-data";

type Props = {
  favorites: MyUFavorite[];
};

export default function MyUFavorites({
  favorites,
}: Props) {
  return (
    <section className="my-u-core-panel">
      <div className="my-u-core-panel-header">
        <div>
          <span className="section-eyebrow">
            FAVORITES
          </span>

          <h2>
            علاقه‌مندی‌های من
          </h2>
        </div>

        <span className="my-u-core-count">
          {favorites.length}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="my-u-core-empty">
          هنوز موردی به علاقه‌مندی‌ها اضافه نشده است.
        </div>
      ) : (
        <div className="my-u-favorite-grid">
          {favorites.map(
            (favorite) => (
              <Link
                key={favorite.id}
                href={favorite.href}
                className="my-u-favorite-item"
              >
                <div className="my-u-favorite-icon">
                  ♡
                </div>

                <div>
                  <div className="my-u-favorite-meta">
                    <span>
                      {favorite.areaLabel}
                    </span>

                    <span>
                      {favorite.type}
                    </span>
                  </div>

                  <h3>
                    {favorite.title}
                  </h3>

                  <p>
                    {
                      favorite.description
                    }
                  </p>
                </div>

                <span className="my-u-core-link">
                  مشاهده
                  <span>←</span>
                </span>
              </Link>
            ),
          )}
        </div>
      )}
    </section>
  );
}