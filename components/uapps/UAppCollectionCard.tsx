import Link from "next/link";

import type {
  UAppCollection,
} from "@/lib/uapps/collections";

type Props = {
  collection: UAppCollection;
};

export default function UAppCollectionCard({
  collection,
}: Props) {
  return (
    <Link
      href={`/uapps/collections/${collection.id}`}
      className="uapps-collection-card"
    >
      <div className="uapps-collection-card-icon">
        {collection.icon}
      </div>

      <div className="uapps-collection-card-content">
        <span className="uapps-eyebrow">
          COLLECTION
        </span>

        <h3>
          {collection.title}
        </h3>

        <p>
          {collection.description}
        </p>

        <span className="uapps-collection-card-count">
          {collection.apps.length} نرم‌افزار
        </span>
      </div>

      <span className="uapps-collection-card-arrow">
        ←
      </span>
    </Link>
  );
}