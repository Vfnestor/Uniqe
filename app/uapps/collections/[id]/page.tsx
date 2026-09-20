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
        <section className="uapps-empty-state">
          <span className="uapps-empty-state-icon">
            📦
          </span>

          <h1>
            مجموعه پیدا نشد
          </h1>

          <p>
            این مجموعه وجود ندارد یا دیگر در دسترس نیست.
          </p>

          <Link
            href="/uapps"
            className="uapps-primary-button"
          >
            بازگشت به UApps
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="uapps-page">
      <section className="uapps-collection-hero">
        <Link
          href="/uapps"
          className="uapps-back-link"
        >
          → بازگشت به UApps
        </Link>

        <div className="uapps-collection-hero-icon">
          {collection.icon}
        </div>

        <span className="uapps-hero-eyebrow">
          COLLECTION
        </span>

        <h1>
          {collection.title}
        </h1>

        <p>
          {collection.description}
        </p>

        <span className="uapps-collection-meta">
          {collection.apps.length} نرم‌افزار در این مجموعه
        </span>
      </section>

      {collection.apps.length > 0 ? (
        <section className="uapps-collection-apps">
          <div className="uapps-collection-apps-header">
            <div>
              <span className="uapps-eyebrow">
                DISCOVER
              </span>

              <h2>
                نرم‌افزارهای این مجموعه
              </h2>
            </div>

            <span>
              {collection.apps.length} نتیجه
            </span>
          </div>

          <div className="uapps-collection-grid">
            {collection.apps.map(
              (app) => (
                <UniversalAppCard
                  key={app.id}
                  app={app}
                />
              ),
            )}
          </div>
        </section>
      ) : (
        <section className="uapps-empty-state">
          <span className="uapps-empty-state-icon">
            📦
          </span>

          <h2>
            هنوز نرم‌افزاری در این مجموعه نیست
          </h2>

          <p>
            با اضافه شدن نرم‌افزارهای جدید، این مجموعه به‌روزرسانی می‌شود.
          </p>
        </section>
      )}
    </main>
  );
}