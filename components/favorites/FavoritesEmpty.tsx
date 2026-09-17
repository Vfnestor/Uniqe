"use client";

type FavoritesEmptyProps = {
  filter: string;
};

export default function FavoritesEmpty({
  filter,
}: FavoritesEmptyProps) {
  return (
    <div className="favorites-empty surface">
      <div className="favorites-empty-icon">
        ☆
      </div>

      <span className="section-eyebrow">
        Favorites
      </span>

      <h2>
        Your collection is empty.
      </h2>

      <p>
        {filter === "all"
          ? "Save something you want to return to and it will appear here."
          : "There are no favorites in this category."}
      </p>
    </div>
  );
}