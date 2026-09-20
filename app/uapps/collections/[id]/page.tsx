import Link from "next/link";

import {
  getUAppCollection,
} from "@/lib/uapps/collections";

import UniversalAppCard from "@/components/uapps/UniversalAppCard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UAppCollectionPage({
  params,
}: Props) {
  const {
    id,
  } = await params;

  const collection =
    getUAppCollection(id);

  if (!collection) {
    return (
      <main className="uapps-page">
        <section className="uapps-collection-not-found">
          <div className="uapps-collection-not-found-icon">
            📦
          </div>

          <span className="uapps-eyebrow">
            UAPPS COLLECTION
          </span>

          <h1>
            مجموعه پیدا نشد
          </h1>

          <p>
            این مجموعه وجود ندارد یا در حال حاضر در دسترس نیست.
          </p>

          <Link
            href="/uapps"
            className="uapps-collection-back-button"
          >
            <span>→</span>
            بازگشت به UApps
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="uapps-page uapps-collection-page">
      <div className="uapps-collection-page-container">
        <nav className="uapps-collection-breadcrumb">
          <Link href="/uapps">
            UApps
          </Link>

          <span>
            /
          </span>

          <span>
            مجموعه‌ها
          </span>

          <span>
            /
          </span>

          <strong>
            {collection.title}
          </strong>
        </nav>

        <section className="uapps-collection-header">
          <div className="uapps-collection-header-main">
            <div className="uapps-collection-large-icon">
              {collection.icon}
            </div>

            <div className="uapps-collection-header-content">
              <span className="uapps-eyebrow">
                COLLECTION
              </span>

              <h1>
                {collection.title}
              </h1>

              <p>
                {collection.description}
              </p>

              <div className="uapps-collection-header-meta">
                <span>
                  {collection.apps.length}
                </span>

                <span>
                  نرم‌افزار
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/uapps"
            className="uapps-collection-back-button"
          >
            <span>
              →
            </span>

            بازگشت به UApps
          </Link>
        </section>

        <section className="uapps-collection-results">
          <div className="uapps-collection-results-header">
            <div>
              <span className="uapps-eyebrow">
                DISCOVER
              </span>

              <h2>
                نرم‌افزارهای این مجموعه
              </h2>
            </div>

            <div className="uapps-collection-results-count">
              {collection.apps.length}
              {" "}
              نرم‌افزار
            </div>
          </div>

          {collection.apps.length > 0 ? (
            <div className="uapps-collection-app-grid">
              {collection.apps.map(
                (app) => (
                  <UniversalAppCard
                    key={
                      app.id
                    }
                    app={
                      app
                    }
                  />
                ),
              )}
            </div>
          ) : (
            <div className="uapps-collection-empty">
              <div className="uapps-collection-empty-icon">
                📦
              </div>

              <h3>
                هنوز نرم‌افزاری در این مجموعه نیست
              </h3>

              <p>
                با اضافه شدن نرم‌افزارهای جدید، این مجموعه به‌صورت خودکار به‌روزرسانی می‌شود.
              </p>

              <Link
                href="/uapps"
                className="uapps-collection-back-button"
              >
                مشاهده همه نرم‌افزارها
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}