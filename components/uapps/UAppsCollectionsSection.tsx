import Link from "next/link";

import type {
  UAppCollection,
} from "@/lib/uapps/collections";

import UAppCollectionCard from "./UAppCollectionCard";

type Props = {
  collections: UAppCollection[];
};

export default function UAppsCollectionsSection({
  collections,
}: Props) {
  if (
    collections.length === 0
  ) {
    return null;
  }

  return (
    <section className="uapps-collections-section">
      <div className="uapps-section-header">
        <div>
          <div className="uapps-section-title-row">
            <span className="uapps-section-icon">
              ✦
            </span>

            <h2>
              مجموعه‌ها
            </h2>
          </div>

          <p>
            نرم‌افزارها را بر اساس کاربرد و موضوع کشف کنید.
          </p>
        </div>

        <Link
          href="/uapps"
          className="uapps-section-link"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="uapps-collections-grid">
        {collections.map(
          (collection) => (
            <UAppCollectionCard
              key={
                collection.id
              }
              collection={
                collection
              }
            />
          ),
        )}
      </div>
    </section>
  );
}